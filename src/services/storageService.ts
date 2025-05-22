import { Promotor, Rota, Loja, Visita, Agencia } from '../types/types';

// Promotores
export const getPromotores = (): Promotor[] => {
  const promotores = localStorage.getItem('promotores');
  return promotores ? JSON.parse(promotores) : [];
};

export const getPromotorById = (id: string): Promotor | undefined => {
  return getPromotores().find(promotor => promotor.id === id);
};

export const addPromotor = (promotor: Promotor): void => {
  const promotores = getPromotores();
  localStorage.setItem('promotores', JSON.stringify([...promotores, promotor]));
};

export const updatePromotor = (promotor: Promotor): void => {
  const promotores = getPromotores();
  const index = promotores.findIndex(p => p.id === promotor.id);
  if (index !== -1) {
    promotores[index] = promotor;
    localStorage.setItem('promotores', JSON.stringify(promotores));
  }
};

export const deletePromotor = (id: string): void => {
  const promotores = getPromotores().filter(promotor => promotor.id !== id);
  localStorage.setItem('promotores', JSON.stringify(promotores));
};

// Rotas
export const getRotas = (): Rota[] => {
  const rotas = localStorage.getItem('rotas');
  return rotas ? JSON.parse(rotas) : [];
};

export const getRotaById = (id: string): Rota | undefined => {
  return getRotas().find(rota => rota.id === id);
};

export const addRota = (rota: Rota): void => {
  const rotas = getRotas();
  localStorage.setItem('rotas', JSON.stringify([...rotas, rota]));
};

export const updateRota = (rota: Rota): void => {
  const rotas = getRotas();
  const index = rotas.findIndex(r => r.id === rota.id);
  if (index !== -1) {
    rotas[index] = rota;
    localStorage.setItem('rotas', JSON.stringify(rotas));
  }
};

export const deleteRota = (id: string): void => {
  const rotas = getRotas().filter(rota => rota.id !== id);
  localStorage.setItem('rotas', JSON.stringify(rotas));
};

// Lojas
export const getLojas = (): Loja[] => {
  const lojas = localStorage.getItem('lojas');
  return lojas ? JSON.parse(lojas) : [];
};

export const getLojaById = (id: string): Loja | undefined => {
  return getLojas().find(loja => loja.id === id);
};

export const addLoja = (loja: Loja): void => {
  const lojas = getLojas();
  localStorage.setItem('lojas', JSON.stringify([...lojas, loja]));
};

export const updateLoja = (loja: Loja): void => {
  const lojas = getLojas();
  const index = lojas.findIndex(l => l.id === loja.id);
  if (index !== -1) {
    lojas[index] = loja;
    localStorage.setItem('lojas', JSON.stringify(lojas));
  }
};

export const deleteLoja = (id: string): void => {
  const lojas = getLojas().filter(loja => loja.id !== id);
  localStorage.setItem('lojas', JSON.stringify(lojas));
};

// Visitas
export const getVisitas = (): Visita[] => {
  const visitas = localStorage.getItem('visitas');
  return visitas ? JSON.parse(visitas) : [];
};

export const getVisitaById = (id: string): Visita | undefined => {
  return getVisitas().find(visita => visita.id === id);
};

export const addVisita = (visita: Visita): void => {
  const visitas = getVisitas();
  localStorage.setItem('visitas', JSON.stringify([...visitas, visita]));
};

export const updateVisita = (visita: Visita): void => {
  const visitas = getVisitas();
  const index = visitas.findIndex(v => v.id === visita.id);
  if (index !== -1) {
    visitas[index] = visita;
    localStorage.setItem('visitas', JSON.stringify(visitas));
  }
};

export const deleteVisita = (id: string): void => {
  const visitas = getVisitas().filter(visita => visita.id !== id);
  localStorage.setItem('visitas', JSON.stringify(visitas));
};

// Agencias
export const getAgencias = (): Agencia[] => {
  const agencias = localStorage.getItem('agencias');
  return agencias ? JSON.parse(agencias) : [];
};

export const getAgenciaById = (id: string): Agencia | undefined => {
  return getAgencias().find(agencia => agencia.id === id);
};

export const addAgencia = (agencia: Agencia): void => {
  const agencias = getAgencias();
  localStorage.setItem('agencias', JSON.stringify([...agencias, agencia]));
};

export const updateAgencia = (agencia: Agencia): void => {
  const agencias = getAgencias();
  const index = agencias.findIndex(a => a.id === agencia.id);
  if (index !== -1) {
    agencias[index] = agencia;
    localStorage.setItem('agencias', JSON.stringify(agencias));
  }
};

export const deleteAgencia = (id: string): void => {
  const agencias = getAgencias().filter(agencia => agencia.id !== id);
  localStorage.setItem('agencias', JSON.stringify(agencias));
};

// Dados de exemplo
export const importarDadosExemplo = (): void => {
  // Exemplo de promotores
  const promotoresExemplo: Promotor[] = [
    { id: "1", tipo: "PRÓPRIO", codigo: "P001", nome: "João Silva", supervisor: "Carlos Mendes", gerencia: "Norte" },
    { id: "2", tipo: "TERCEIRO", codigo: "T001", nome: "Maria Oliveira", agencia: "ABC Promoções", supervisor: "Ana Santos", gerencia: "Sul" }
  ];

  // Exemplo de rotas
  const rotasExemplo: Rota[] = [
    { id: "1", codigo: "R001", nome: "Rota Centro", qtdeCodigo: 5, qtdeLojas: 10, responsavel: "Carlos Mendes", supervisor: "Ana Santos", gerente: "Roberto Silva" },
    { id: "2", codigo: "R002", nome: "Rota Norte", qtdeCodigo: 3, qtdeLojas: 7, responsavel: "Maria Oliveira", supervisor: "João Silva", gerente: "Paulo Santos" }
  ];

  // Exemplo de lojas
  const lojasExemplo: Loja[] = [
    { id: "1", codigo: "L001", cnpj: "12345678000190", fantasia: "Supermercado A", regional: "Centro", rede: "Rede X", status: "Ativo", estado: "SP", tamanho: "G" },
    { id: "2", codigo: "L002", cnpj: "98765432000121", fantasia: "Supermercado B", regional: "Norte", rede: "Rede Y", status: "Ativo", estado: "RJ", tamanho: "M" }
  ];

  // Exemplo de agências
  const agenciasExemplo: Agencia[] = [
    { id: "1", nome: "ABC Promoções", contato: "Maria Silva", telefone: "(11) 98765-4321" },
    { id: "2", nome: "XYZ Marketing", contato: "João Santos", telefone: "(21) 91234-5678" }
  ];

  // Exemplo de visitas
  const visitasExemplo: Visita[] = [
    { 
      id: "1", 
      promotorId: "1", 
      lojaId: "1", 
      rotaId: "1", 
      tipoAtendimento: "PRÓPRIO",
      periodo: "Manhã", 
      quantVisitas: 4, 
      horasTotais: 16,
      diasVisita: { 
        segunda: true, 
        terca: false, 
        quarta: true, 
        quinta: false, 
        sexta: true,
        sabado: false 
      },
      faturamentoMensal: {
        janeiro: 5000,
        fevereiro: 5200,
        marco: 4800,
        abril: 5100,
        maio: 5300,
        junho: 5500,
        julho: 5600,
        agosto: 5400,
        setembro: 5700,
        outubro: 5800,
        novembro: 6000,
        dezembro: 6500
      },
      custoPorPromotor: 1500,
      custoPorPromotorHora: 50,
      custoPorLoja: 200,
      mixIdeal: 80,
      mixIdealPontos: 75,
      produtoBonus: 5,
      sugestaoVisitas: 4,
      quantHoras: 4,
      frequenciaNegociada: 4,
      frequenciaSolicitada: "3 visitas",
      justificativa: "Alta demanda",
      decisaoFinal: "Aprovado",
      planoDeAcao: "Implementar displays",
      prazo: "30/10/2023"
    }
  ];

  // Salvar no localStorage
  localStorage.setItem('promotores', JSON.stringify(promotoresExemplo));
  localStorage.setItem('rotas', JSON.stringify(rotasExemplo));
  localStorage.setItem('lojas', JSON.stringify(lojasExemplo));
  localStorage.setItem('visitas', JSON.stringify(visitasExemplo));
  localStorage.setItem('agencias', JSON.stringify(agenciasExemplo));
};
