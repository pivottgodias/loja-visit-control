
import * as XLSX from 'xlsx';
import { Promotor, Loja, Rota, Visita, Agencia } from '../types/types';
import * as storageService from './storageService';

// Export functions
export const exportPromotores = () => {
  const promotores = storageService.getPromotores();
  const worksheet = XLSX.utils.json_to_sheet(promotores);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Promotores");
  XLSX.writeFile(workbook, "promotores.xlsx");
};

export const exportLojas = () => {
  const lojas = storageService.getLojas();
  const worksheet = XLSX.utils.json_to_sheet(lojas);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Lojas");
  XLSX.writeFile(workbook, "lojas.xlsx");
};

export const exportRotas = () => {
  const rotas = storageService.getRotas();
  const worksheet = XLSX.utils.json_to_sheet(rotas);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Rotas");
  XLSX.writeFile(workbook, "rotas.xlsx");
};

export const exportAgencias = () => {
  const agencias = storageService.getAgencias();
  const worksheet = XLSX.utils.json_to_sheet(agencias);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Agencias");
  XLSX.writeFile(workbook, "agencias.xlsx");
};

export const exportFinanceiroMensal = () => {
  const visitas = storageService.getVisitas();
  const lojas = storageService.getLojas();
  
  // Prepare data for export
  const financeiroData = visitas.map(visita => {
    const loja = lojas.find(l => l.id === visita.lojaId) || { cnpj: 'N/A', codigo: 'N/A', fantasia: 'N/A' };
    return {
      codigoLoja: loja.codigo,
      cnpjLoja: loja.cnpj,
      nomeLoja: loja.fantasia,
      janeiro: visita.faturamentoMensal.janeiro,
      fevereiro: visita.faturamentoMensal.fevereiro,
      marco: visita.faturamentoMensal.marco,
      abril: visita.faturamentoMensal.abril,
      maio: visita.faturamentoMensal.maio,
      junho: visita.faturamentoMensal.junho,
      julho: visita.faturamentoMensal.julho,
      agosto: visita.faturamentoMensal.agosto,
      setembro: visita.faturamentoMensal.setembro,
      outubro: visita.faturamentoMensal.outubro,
      novembro: visita.faturamentoMensal.novembro,
      dezembro: visita.faturamentoMensal.dezembro,
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(financeiroData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "FinanceiroMensal");
  XLSX.writeFile(workbook, "financeiro_mensal.xlsx");
};

// Import functions
export const importPromotores = async (file: File): Promise<string> => {
  try {
    const data = await readExcelFile(file);
    if (data.length === 0) {
      throw new Error("Arquivo vazio ou formato inválido.");
    }
    
    data.forEach((row: any) => {
      const promotor: Promotor = {
        id: row.id || crypto.randomUUID(),
        tipo: row.tipo || "PRÓPRIO",
        codigo: row.codigo || "",
        nome: row.nome || "",
        agencia: row.agencia || "",
        supervisor: row.supervisor || "",
        gerencia: row.gerencia || ""
      };
      
      if (storageService.getPromotorById(promotor.id)) {
        storageService.updatePromotor(promotor);
      } else {
        storageService.addPromotor(promotor);
      }
    });
    
    return `Importados ${data.length} promotores com sucesso.`;
  } catch (error) {
    console.error("Erro na importação de promotores:", error);
    throw error;
  }
};

export const importLojas = async (file: File): Promise<string> => {
  try {
    const data = await readExcelFile(file);
    if (data.length === 0) {
      throw new Error("Arquivo vazio ou formato inválido.");
    }
    
    data.forEach((row: any) => {
      const loja: Loja = {
        id: row.id || crypto.randomUUID(),
        codigo: row.codigo || "",
        cnpj: row.cnpj || "",
        fantasia: row.fantasia || "",
        regional: row.regional || "",
        rede: row.rede || "",
        status: row.status || "",
        estado: row.estado || "",
        tamanho: (row.tamanho as "P" | "M" | "G" | "CASH") || "M"
      };
      
      if (storageService.getLojaById(loja.id)) {
        storageService.updateLoja(loja);
      } else {
        storageService.addLoja(loja);
      }
    });
    
    return `Importadas ${data.length} lojas com sucesso.`;
  } catch (error) {
    console.error("Erro na importação de lojas:", error);
    throw error;
  }
};

export const importRotas = async (file: File): Promise<string> => {
  try {
    const data = await readExcelFile(file);
    if (data.length === 0) {
      throw new Error("Arquivo vazio ou formato inválido.");
    }
    
    data.forEach((row: any) => {
      const rota: Rota = {
        id: row.id || crypto.randomUUID(),
        codigo: row.codigo || "",
        nome: row.nome || "",
        qtdeCodigo: Number(row.qtdeCodigo) || 0,
        qtdeLojas: Number(row.qtdeLojas) || 0,
        responsavel: row.responsavel || "",
        supervisor: row.supervisor || "",
        gerente: row.gerente || ""
      };
      
      if (storageService.getRotaById(rota.id)) {
        storageService.updateRota(rota);
      } else {
        storageService.addRota(rota);
      }
    });
    
    return `Importadas ${data.length} rotas com sucesso.`;
  } catch (error) {
    console.error("Erro na importação de rotas:", error);
    throw error;
  }
};

export const importAgencias = async (file: File): Promise<string> => {
  try {
    const data = await readExcelFile(file);
    if (data.length === 0) {
      throw new Error("Arquivo vazio ou formato inválido.");
    }
    
    data.forEach((row: any) => {
      const agencia: Agencia = {
        id: row.id || crypto.randomUUID(),
        nome: row.nome || "",
        contato: row.contato || "",
        telefone: row.telefone || "",
      };
      
      if (storageService.getAgenciaById(agencia.id)) {
        storageService.updateAgencia(agencia);
      } else {
        storageService.addAgencia(agencia);
      }
    });
    
    return `Importadas ${data.length} agências com sucesso.`;
  } catch (error) {
    console.error("Erro na importação de agências:", error);
    throw error;
  }
};

export const importFinanceiroMensal = async (file: File): Promise<string> => {
  try {
    const data = await readExcelFile(file);
    if (data.length === 0) {
      throw new Error("Arquivo vazio ou formato inválido.");
    }
    
    const visitas = storageService.getVisitas();
    const lojas = storageService.getLojas();
    let atualizadas = 0;
    
    data.forEach((row: any) => {
      // Encontra a loja pelo código ou CNPJ
      const loja = lojas.find(l => l.codigo === row.codigoLoja || l.cnpj === row.cnpjLoja);
      
      if (loja) {
        // Encontra visitas relacionadas a esta loja
        const visitasLoja = visitas.filter(v => v.lojaId === loja.id);
        
        visitasLoja.forEach(visita => {
          const visitaAtualizada: Visita = {
            ...visita,
            faturamentoMensal: {
              janeiro: Number(row.janeiro) || 0,
              fevereiro: Number(row.fevereiro) || 0,
              marco: Number(row.marco) || 0,
              abril: Number(row.abril) || 0,
              maio: Number(row.maio) || 0,
              junho: Number(row.junho) || 0,
              julho: Number(row.julho) || 0,
              agosto: Number(row.agosto) || 0,
              setembro: Number(row.setembro) || 0,
              outubro: Number(row.outubro) || 0,
              novembro: Number(row.novembro) || 0,
              dezembro: Number(row.dezembro) || 0
            }
          };
          
          storageService.updateVisita(visitaAtualizada);
          atualizadas++;
        });
      }
    });
    
    return `Atualizadas informações financeiras de ${atualizadas} visitas.`;
  } catch (error) {
    console.error("Erro na importação de dados financeiros:", error);
    throw error;
  }
};

// Helper function to read Excel file
const readExcelFile = async (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        resolve(json);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
};
