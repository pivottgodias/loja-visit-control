
import * as XLSX from 'xlsx';
import { Promotor, Rota, Loja, Visita, MesesAno } from '../types/types';
import * as storageService from './storageService';

// Generic function to export data to Excel
export const exportToExcel = (data: any[], fileName: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

// Export Functions for each entity
export const exportPromotores = () => {
  const promotores = storageService.getPromotores();
  exportToExcel(promotores, 'promotores');
};

export const exportRotas = () => {
  const rotas = storageService.getRotas();
  exportToExcel(rotas, 'rotas');
};

export const exportLojas = () => {
  const lojas = storageService.getLojas();
  exportToExcel(lojas, 'lojas');
};

// Export financial data
export const exportFinanceiroMensal = () => {
  const visitas = storageService.getVisitas();
  const lojas = storageService.getLojas();
  
  // Transform the data to the expected format
  const financialData = visitas.flatMap(visita => {
    const loja = lojas.find(l => l.id === visita.lojaId);
    if (!loja) return [];
    
    return Object.entries(visita.faturamentoMensal).map(([mes, valor]) => ({
      cnpj: loja.cnpj,
      codigo: loja.id,
      fantasia: loja.fantasia,
      mes,
      valor
    }));
  });
  
  exportToExcel(financialData, 'financeiro_mensal');
};

// Import Functions
// Generic import function
const importFromExcel = async (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
};

// Import promotores from Excel
export const importPromotores = async (file: File): Promise<string> => {
  try {
    const data = await importFromExcel(file);
    const promotores = data.map(item => {
      // Validate data
      if (!item.nome || !item.codigo) {
        throw new Error('Dados inválidos: nome e código são obrigatórios');
      }
      
      return {
        id: item.id || String(Date.now()),
        tipo: item.tipo || "PRÓPRIO",
        codigo: String(item.codigo),
        nome: String(item.nome),
        agencia: item.agencia || undefined,
        supervisor: String(item.supervisor || ''),
        gerencia: String(item.gerencia || '')
      };
    }) as Promotor[];
    
    // Replace existing promotores
    storageService.savePromotores(promotores);
    return `${promotores.length} promotores importados com sucesso.`;
  } catch (error) {
    console.error('Erro ao importar promotores:', error);
    throw error;
  }
};

// Import rotas from Excel
export const importRotas = async (file: File): Promise<string> => {
  try {
    const data = await importFromExcel(file);
    const rotas = data.map(item => {
      // Validate data
      if (!item.nome || !item.codigo) {
        throw new Error('Dados inválidos: nome e código são obrigatórios');
      }
      
      return {
        id: item.id || String(Date.now()),
        codigo: String(item.codigo),
        nome: String(item.nome),
        qtdeCodigo: Number(item.qtdeCodigo || 0),
        qtdeLojas: Number(item.qtdeLojas || 0)
      };
    }) as Rota[];
    
    // Replace existing rotas
    storageService.saveRotas(rotas);
    return `${rotas.length} rotas importadas com sucesso.`;
  } catch (error) {
    console.error('Erro ao importar rotas:', error);
    throw error;
  }
};

// Import lojas from Excel
export const importLojas = async (file: File): Promise<string> => {
  try {
    const data = await importFromExcel(file);
    const lojas = data.map(item => {
      // Validate data
      if (!item.fantasia || !item.cnpj) {
        throw new Error('Dados inválidos: fantasia e CNPJ são obrigatórios');
      }
      
      return {
        id: item.id || String(Date.now()),
        cnpj: String(item.cnpj),
        fantasia: String(item.fantasia),
        regional: String(item.regional || ''),
        rede: String(item.rede || ''),
        status: String(item.status || ''),
        estado: String(item.estado || ''),
        tamanho: (item.tamanho as "P" | "M" | "G") || "M"
      };
    }) as Loja[];
    
    // Replace existing lojas
    storageService.saveLojas(lojas);
    return `${lojas.length} lojas importadas com sucesso.`;
  } catch (error) {
    console.error('Erro ao importar lojas:', error);
    throw error;
  }
};

// Import financial data
export const importFinanceiroMensal = async (file: File): Promise<string> => {
  try {
    const data = await importFromExcel(file);
    const visitas = storageService.getVisitas();
    const lojas = storageService.getLojas();
    let updatedCount = 0;
    
    // Process each row from the Excel file
    data.forEach(item => {
      // Validar dados
      if (!item.cnpj || !item.mes || item.valor === undefined) {
        console.warn('Dados financeiros inválidos, pulando linha:', item);
        return;
      }
      
      // Find the loja by CNPJ
      const loja = lojas.find(l => l.cnpj === item.cnpj);
      if (!loja) {
        console.warn(`Loja com CNPJ ${item.cnpj} não encontrada, pulando linha`);
        return;
      }
      
      // Find visits associated with this loja
      const lojasVisitas = visitas.filter(v => v.lojaId === loja.id);
      if (lojasVisitas.length === 0) {
        console.warn(`Nenhuma visita encontrada para a loja ${loja.fantasia}, pulando linha`);
        return;
      }
      
      // Update each visit with the new financial data
      lojasVisitas.forEach(visita => {
        // Make sure the month is valid
        const mes = item.mes.toLowerCase() as MesesAno;
        if (!Object.keys(visita.faturamentoMensal).includes(mes)) {
          console.warn(`Mês inválido: ${item.mes}, pulando linha`);
          return;
        }
        
        // Update the financial data for this month
        const updatedVisita = {
          ...visita,
          faturamentoMensal: {
            ...visita.faturamentoMensal,
            [mes]: Number(item.valor)
          }
        };
        
        storageService.updateVisita(updatedVisita);
        updatedCount++;
      });
    });
    
    return `Dados financeiros atualizados para ${updatedCount} visitas.`;
  } catch (error) {
    console.error('Erro ao importar dados financeiros:', error);
    throw error;
  }
};
