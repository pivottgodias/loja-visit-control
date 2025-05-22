
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
  responsavel?: string;
  supervisor?: string;
  gerente?: string;
}

export interface Loja {
  id: string;
  codigo: string;
  cnpj: string;
  fantasia: string;
  regional: string;
  rede: string;
  status: string;
  estado: string;
  tamanho: "P" | "M" | "G" | "CASH";
  pontos?: number;
  mixIdealClassificacao?: "ACIMA" | "MÉDIO" | "ABAIXO";
  mixIdealPontos?: number;
  bonusPontos?: number;
  pontuacaoFinal?: number;
  horasFrequencia?: number;
  diasVisitaSugeridos?: {
    segunda: boolean;
    terca: boolean;
    quarta: boolean;
    quinta: boolean;
    sexta: boolean;
    sabado: boolean;
  };
}

export interface Agencia {
  id: string;
  nome: string;
  contato: string;
  telefone: string;
}

export interface Visita {
  id: string;
  promotorId: string;
  agenciaId?: string;
  lojaId: string;
  rotaId: string;
  tipoAtendimento: "PRÓPRIO" | "TERCEIRO" | "MISTO";
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
  diasVisitaTerceiro?: {
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

// Definições para a lógica de classificação de lojas
export interface MixIdealConfig {
  tamanho: "P" | "M" | "G" | "CASH";
  basePoints: number;
  classificacoes: {
    ACIMA: { pontos: number; soma: number };
    MÉDIO: { pontos: number; soma: number };
    ABAIXO: { pontos: number; soma: number };
  };
}

export interface BonusConfig {
  nome: string;
  pontos: number;
}

export interface PontuacaoFinalConfig {
  min: number;
  max: number;
  label: string;
}

export interface FrequenciaVisitaConfig {
  tamanho: "P" | "M" | "G" | "CASH";
  pontos: number;
  horasFrequencia: number;
  diasSemana: {
    segunda: boolean;
    terca: boolean;
    quarta: boolean;
    quinta: boolean;
    sexta: boolean;
    sabado: boolean;
  };
}
