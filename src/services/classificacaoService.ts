
import { Loja, MixIdealConfig, BonusConfig, PontuacaoFinalConfig, FrequenciaVisitaConfig, DiasSemana } from "../types/types";

// Configurações baseadas nas tabelas fornecidas
const mixIdealConfigs: MixIdealConfig[] = [
  {
    tamanho: "G",
    basePoints: 5,
    classificacoes: {
      ACIMA: { pontos: 5, soma: 10 },
      MÉDIO: { pontos: 3, soma: 8 },
      ABAIXO: { pontos: 1, soma: 6 },
    },
  },
  {
    tamanho: "M",
    basePoints: 3,
    classificacoes: {
      ACIMA: { pontos: 5, soma: 8 },
      MÉDIO: { pontos: 3, soma: 6 },
      ABAIXO: { pontos: 1, soma: 4 },
    },
  },
  {
    tamanho: "P",
    basePoints: 1,
    classificacoes: {
      ACIMA: { pontos: 5, soma: 6 },
      MÉDIO: { pontos: 3, soma: 4 },
      ABAIXO: { pontos: 1, soma: 2 },
    },
  },
  {
    tamanho: "CASH",
    basePoints: 5,
    classificacoes: {
      ACIMA: { pontos: 5, soma: 10 },
      MÉDIO: { pontos: 3, soma: 8 },
      ABAIXO: { pontos: 1, soma: 6 },
    },
  },
];

const bonusConfigs: BonusConfig[] = [
  { nome: "Furioso (2)", pontos: 2 },
  { nome: "Refriko", pontos: 1 },
  { nome: "Moema", pontos: 1 },
  { nome: "Bella Roma", pontos: 1 },
  { nome: "Mínimo", pontos: 0 },
  { nome: "Máximo", pontos: 5 },
];

const pontuacoesFinalConfigs: Record<string, PontuacaoFinalConfig[]> = {
  G: [
    { min: 10, max: 15, label: "10 a 15" },
    { min: 8, max: 13, label: "8 a 13" },
    { min: 6, max: 11, label: "6 a 11" },
  ],
  M: [
    { min: 8, max: 13, label: "8 a 13" },
    { min: 6, max: 11, label: "6 a 11" },
    { min: 4, max: 9, label: "4 a 9" },
  ],
  P: [
    { min: 6, max: 11, label: "6 a 11" },
    { min: 4, max: 9, label: "4 a 9" },
    { min: 2, max: 7, label: "2 a 7" },
  ],
  CASH: [
    { min: 10, max: 15, label: "10 a 15" },
    { min: 8, max: 13, label: "8 a 13" },
    { min: 6, max: 11, label: "6 a 11" },
  ],
};

// Configurações de frequência de visita
const frequenciaVisitaConfigs: FrequenciaVisitaConfig[] = [
  // CASH
  {
    tamanho: "CASH",
    pontos: 15,
    horasFrequencia: 2.0,
    diasSemana: { segunda: true, terca: true, quarta: true, quinta: true, sexta: true, sabado: true },
  },
  {
    tamanho: "CASH",
    pontos: 12,
    horasFrequencia: 2.0,
    diasSemana: { segunda: true, terca: false, quarta: true, quinta: false, sexta: true, sabado: true },
  },
  {
    tamanho: "CASH",
    pontos: 9,
    horasFrequencia: 2.0,
    diasSemana: { segunda: true, terca: false, quarta: true, quinta: false, sexta: true, sabado: false },
  },
  {
    tamanho: "CASH",
    pontos: 7,
    horasFrequencia: 2.0,
    diasSemana: { segunda: false, terca: true, quarta: false, quinta: false, sexta: true, sabado: false },
  },
  {
    tamanho: "CASH",
    pontos: 5,
    horasFrequencia: 2.0,
    diasSemana: { segunda: false, terca: false, quarta: false, quinta: false, sexta: true, sabado: false },
  },
  // G
  {
    tamanho: "G",
    pontos: 15,
    horasFrequencia: 1.5,
    diasSemana: { segunda: true, terca: true, quarta: true, quinta: true, sexta: true, sabado: true },
  },
  {
    tamanho: "G",
    pontos: 12,
    horasFrequencia: 1.5,
    diasSemana: { segunda: true, terca: false, quarta: true, quinta: false, sexta: true, sabado: true },
  },
  {
    tamanho: "G",
    pontos: 9,
    horasFrequencia: 1.5,
    diasSemana: { segunda: true, terca: false, quarta: true, quinta: false, sexta: true, sabado: false },
  },
  {
    tamanho: "G",
    pontos: 7,
    horasFrequencia: 1.5,
    diasSemana: { segunda: false, terca: true, quarta: false, quinta: false, sexta: true, sabado: false },
  },
  {
    tamanho: "G",
    pontos: 5,
    horasFrequencia: 1.5,
    diasSemana: { segunda: false, terca: false, quarta: false, quinta: false, sexta: true, sabado: false },
  },
  // M
  {
    tamanho: "M",
    pontos: 13,
    horasFrequencia: 1.0,
    diasSemana: { segunda: true, terca: true, quarta: true, quinta: true, sexta: true, sabado: true },
  },
  {
    tamanho: "M",
    pontos: 11,
    horasFrequencia: 1.0,
    diasSemana: { segunda: true, terca: false, quarta: true, quinta: false, sexta: true, sabado: true },
  },
  {
    tamanho: "M",
    pontos: 8,
    horasFrequencia: 1.0,
    diasSemana: { segunda: true, terca: false, quarta: true, quinta: false, sexta: true, sabado: false },
  },
  {
    tamanho: "M",
    pontos: 6,
    horasFrequencia: 1.0,
    diasSemana: { segunda: false, terca: true, quarta: false, quinta: false, sexta: true, sabado: false },
  },
  {
    tamanho: "M",
    pontos: 4,
    horasFrequencia: 1.0,
    diasSemana: { segunda: false, terca: false, quarta: false, quinta: false, sexta: true, sabado: false },
  },
  // P
  {
    tamanho: "P",
    pontos: 11,
    horasFrequencia: 1.0,
    diasSemana: { segunda: true, terca: true, quarta: true, quinta: true, sexta: true, sabado: true },
  },
  {
    tamanho: "P",
    pontos: 9,
    horasFrequencia: 1.0,
    diasSemana: { segunda: true, terca: false, quarta: true, quinta: false, sexta: true, sabado: true },
  },
  {
    tamanho: "P",
    pontos: 6,
    horasFrequencia: 1.0,
    diasSemana: { segunda: true, terca: false, quarta: true, quinta: false, sexta: true, sabado: false },
  },
  {
    tamanho: "P",
    pontos: 4,
    horasFrequencia: 1.0,
    diasSemana: { segunda: false, terca: true, quarta: false, quinta: false, sexta: true, sabado: false },
  },
  {
    tamanho: "P",
    pontos: 2,
    horasFrequencia: 1.0,
    diasSemana: { segunda: false, terca: false, quarta: false, quinta: false, sexta: true, sabado: false },
  },
];

// Função para calcular a pontuação base baseada no tamanho da loja
export const calcularPontuacaoBase = (tamanho: "P" | "M" | "G" | "CASH"): number => {
  const config = mixIdealConfigs.find(config => config.tamanho === tamanho);
  return config?.basePoints || 0;
};

// Função para calcular a pontuação do MIX Ideal
export const calcularPontuacaoMixIdeal = (
  tamanho: "P" | "M" | "G" | "CASH",
  classificacao: "ACIMA" | "MÉDIO" | "ABAIXO"
): { pontos: number; soma: number } => {
  const config = mixIdealConfigs.find(config => config.tamanho === tamanho);
  if (!config) return { pontos: 0, soma: 0 };
  
  return config.classificacoes[classificacao];
};

// Função para calcular a pontuação de bônus
export const calcularPontuacaoBonus = (bonusNames: string[]): number => {
  return bonusNames.reduce((total, bonusName) => {
    const bonus = bonusConfigs.find(b => b.nome === bonusName);
    return total + (bonus?.pontos || 0);
  }, 0);
};

// Função para obter a classificação de pontuação final
export const obterPontuacaoFinalLabel = (tamanho: "P" | "M" | "G" | "CASH", pontuacaoTotal: number): string => {
  const configs = pontuacoesFinalConfigs[tamanho];
  if (!configs) return "";
  
  // Encontra a faixa de pontuação adequada
  const config = configs.find(c => pontuacaoTotal >= c.min && pontuacaoTotal <= c.max);
  return config?.label || "";
};

// Função para obter a configuração de frequência de visita recomendada
export const obterFrequenciaVisita = (tamanho: "P" | "M" | "G" | "CASH", pontuacaoTotal: number): FrequenciaVisitaConfig | null => {
  // Encontra a configuração mais próxima baseada nos pontos (para baixo)
  const configs = frequenciaVisitaConfigs
    .filter(config => config.tamanho === tamanho && config.pontos <= pontuacaoTotal)
    .sort((a, b) => b.pontos - a.pontos);
  
  return configs.length > 0 ? configs[0] : null;
};

// Função principal para classificar uma loja
export const classificarLoja = (
  loja: Loja, 
  mixIdealClassificacao: "ACIMA" | "MÉDIO" | "ABAIXO", 
  bonusNomes: string[]
): Loja => {
  // Calcula a pontuação base pelo tamanho
  const pontuacaoBase = calcularPontuacaoBase(loja.tamanho);
  
  // Calcula a pontuação do MIX Ideal
  const { pontos: mixIdealPontos, soma } = calcularPontuacaoMixIdeal(loja.tamanho, mixIdealClassificacao);
  
  // Calcula a pontuação de bônus
  const bonusPontos = calcularPontuacaoBonus(bonusNomes);
  
  // Calcula a pontuação total
  const pontuacaoTotal = soma + bonusPontos;
  
  // Obtém a recomendação de frequência
  const frequenciaConfig = obterFrequenciaVisita(loja.tamanho, pontuacaoTotal);
  
  // Atualiza a loja com as informações calculadas
  return {
    ...loja,
    pontos: pontuacaoBase,
    mixIdealClassificacao,
    mixIdealPontos,
    bonusPontos,
    pontuacaoFinal: pontuacaoTotal,
    horasFrequencia: frequenciaConfig?.horasFrequencia || 0,
    diasVisitaSugeridos: frequenciaConfig?.diasSemana || {
      segunda: false,
      terca: false,
      quarta: false,
      quinta: false,
      sexta: false,
      sabado: false
    }
  };
};
