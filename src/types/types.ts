
export interface Promotor {
  id: string;
  tipo: "PRÓPRIO" | "TERCEIRO";
  codigo: string;
  nome: string;
  agencia?: string;
  supervisor: string;
  gerencia: string;
}

export interface Rota {
  id: string;
  codigo: string;
  nome: string;
  qtdeCodigo: number;
  qtdeLojas: number;
}

export interface Loja {
  id: string;
  cnpj: string;
  fantasia: string;
  regional: string;
  rede: string;
  status: string;
  estado: string;
  tamanho: "P" | "M" | "G";
}

export interface Visita {
  id: string;
  promotorId: string;
  lojaId: string;
  rotaId: string;
  periodo: string;
  quantVisitas: number;
  horasTotais: number;
  diasVisita: {
    segunda: boolean;
    terca: boolean;
    quarta: boolean;
    quinta: boolean;
    sexta: boolean;
    sabado: boolean;
  };
  faturamentoMensal: {
    janeiro: number;
    fevereiro: number;
    marco: number;
    abril: number;
    maio: number;
    junho: number;
    julho: number;
    agosto: number;
    setembro: number;
    outubro: number;
    novembro: number;
    dezembro: number;
  };
  custoPorPromotor: number;
  custoPorPromotorHora: number;
  custoPorLoja: number;
  mixIdeal: number;
  mixIdealPontos: number;
  produtoBonus: number;
  sugestaoVisitas: number;
  quantHoras: number;
  frequenciaNegociada: number;
  frequenciaSolicitada: string;
  justificativa: string;
  decisaoFinal: string;
  planoDeAcao: string;
  prazo: string;
}

export type DiasSemana = "segunda" | "terca" | "quarta" | "quinta" | "sexta" | "sabado";
export type MesesAno = "janeiro" | "fevereiro" | "marco" | "abril" | "maio" | "junho" | "julho" | "agosto" | "setembro" | "outubro" | "novembro" | "dezembro";
