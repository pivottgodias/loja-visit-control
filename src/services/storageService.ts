
import { Promotor, Rota, Loja, Visita } from '../types/types';

const STORAGE_KEYS = {
  PROMOTORES: 'visitcontrol_promotores',
  ROTAS: 'visitcontrol_rotas',
  LOJAS: 'visitcontrol_lojas',
  VISITAS: 'visitcontrol_visitas',
};

// Função genérica para salvar e recuperar dados
const saveData = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getData = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// Serviços específicos
export const getPromotores = (): Promotor[] => getData<Promotor>(STORAGE_KEYS.PROMOTORES);
export const savePromotores = (promotores: Promotor[]): void => saveData(STORAGE_KEYS.PROMOTORES, promotores);
export const addPromotor = (promotor: Promotor): void => {
  const promotores = getPromotores();
  savePromotores([...promotores, promotor]);
};
export const updatePromotor = (promotor: Promotor): void => {
  const promotores = getPromotores();
  const index = promotores.findIndex(p => p.id === promotor.id);
  if (index !== -1) {
    promotores[index] = promotor;
    savePromotores(promotores);
  }
};
export const deletePromotor = (id: string): void => {
  const promotores = getPromotores();
  savePromotores(promotores.filter(p => p.id !== id));
};

export const getRotas = (): Rota[] => getData<Rota>(STORAGE_KEYS.ROTAS);
export const saveRotas = (rotas: Rota[]): void => saveData(STORAGE_KEYS.ROTAS, rotas);
export const addRota = (rota: Rota): void => {
  const rotas = getRotas();
  saveRotas([...rotas, rota]);
};
export const updateRota = (rota: Rota): void => {
  const rotas = getRotas();
  const index = rotas.findIndex(r => r.id === rota.id);
  if (index !== -1) {
    rotas[index] = rota;
    saveRotas(rotas);
  }
};
export const deleteRota = (id: string): void => {
  const rotas = getRotas();
  saveRotas(rotas.filter(r => r.id !== id));
};

export const getLojas = (): Loja[] => getData<Loja>(STORAGE_KEYS.LOJAS);
export const saveLojas = (lojas: Loja[]): void => saveData(STORAGE_KEYS.LOJAS, lojas);
export const addLoja = (loja: Loja): void => {
  const lojas = getLojas();
  saveLojas([...lojas, loja]);
};
export const updateLoja = (loja: Loja): void => {
  const lojas = getLojas();
  const index = lojas.findIndex(l => l.id === loja.id);
  if (index !== -1) {
    lojas[index] = loja;
    saveLojas(lojas);
  }
};
export const deleteLoja = (id: string): void => {
  const lojas = getLojas();
  saveLojas(lojas.filter(l => l.id !== id));
};

export const getVisitas = (): Visita[] => getData<Visita>(STORAGE_KEYS.VISITAS);
export const saveVisitas = (visitas: Visita[]): void => saveData(STORAGE_KEYS.VISITAS, visitas);
export const addVisita = (visita: Visita): void => {
  const visitas = getVisitas();
  saveVisitas([...visitas, visita]);
};
export const updateVisita = (visita: Visita): void => {
  const visitas = getVisitas();
  const index = visitas.findIndex(v => v.id === visita.id);
  if (index !== -1) {
    visitas[index] = visita;
    saveVisitas(visitas);
  }
};
export const deleteVisita = (id: string): void => {
  const visitas = getVisitas();
  saveVisitas(visitas.filter(v => v.id !== id));
};

// Função para importar dados iniciais do exemplo
export const importarDadosExemplo = () => {
  // Exemplo de dados baseados no Excel fornecido
  const promotorExemplo: Promotor = {
    id: "1",
    tipo: "PRÓPRIO",
    codigo: "43-25997",
    nome: "Adriano Alves Valencio",
    supervisor: "Ewerton Sales dos Santos",
    gerencia: "TBA"
  };

  const rotaExemplo: Rota = {
    id: "1",
    codigo: "410",
    nome: "PAULA RIBEIRO",
    qtdeCodigo: 1,
    qtdeLojas: 1
  };

  const lojaExemplo: Loja = {
    id: "1",
    cnpj: "07.295.756/0002-35",
    fantasia: "SUPERMERCADO CHAMA",
    regional: "DOURADOS MS",
    rede: "GERAL",
    status: "",
    estado: "MS",
    tamanho: "M"
  };

  const visitaExemplo: Visita = {
    id: "1",
    promotorId: "1",
    lojaId: "1",
    rotaId: "1",
    periodo: "Semanal",
    quantVisitas: 3,
    horasTotais: 0,
    diasVisita: {
      segunda: true,
      terca: false,
      quarta: true,
      quinta: false,
      sexta: true,
      sabado: false
    },
    faturamentoMensal: {
      janeiro: 835.60,
      fevereiro: 0,
      marco: 0,
      abril: 0,
      maio: 0,
      junho: 0,
      julho: 0,
      agosto: 0,
      setembro: 0,
      outubro: 0,
      novembro: 0,
      dezembro: 0
    },
    custoPorPromotor: 4500.00,
    custoPorPromotorHora: 25.57,
    custoPorLoja: 306.82,
    mixIdeal: 14,
    mixIdealPontos: 1,
    produtoBonus: 3,
    sugestaoVisitas: 1,
    quantHoras: 1,
    frequenciaNegociada: 1,
    frequenciaSolicitada: "OK",
    justificativa: "SEGUE SUGESTÃO",
    decisaoFinal: "",
    planoDeAcao: "",
    prazo: ""
  };

  // Apenas adiciona se não existe ainda
  if (getPromotores().length === 0) addPromotor(promotorExemplo);
  if (getRotas().length === 0) addRota(rotaExemplo);
  if (getLojas().length === 0) addLoja(lojaExemplo);
  if (getVisitas().length === 0) addVisita(visitaExemplo);
};
