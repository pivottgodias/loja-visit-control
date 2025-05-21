
import React from 'react';
import FormField from '../FormField';

interface PlanejamentoSectionProps {
  form: {
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
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const PlanejamentoSection: React.FC<PlanejamentoSectionProps> = ({
  form,
  handleChange
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          label="MIX Ideal"
          name="mixIdeal"
          type="number"
          value={form.mixIdeal}
          onChange={handleChange}
        />
        
        <FormField
          label="MIX Ideal - Pontos"
          name="mixIdealPontos"
          type="number"
          value={form.mixIdealPontos}
          onChange={handleChange}
        />
        
        <FormField
          label="Produtos Bônus"
          name="produtoBonus"
          type="number"
          value={form.produtoBonus}
          onChange={handleChange}
        />
        
        <FormField
          label="Sugestão Visitas"
          name="sugestaoVisitas"
          type="number"
          value={form.sugestaoVisitas}
          onChange={handleChange}
        />
        
        <FormField
          label="Quantidade de Horas"
          name="quantHoras"
          type="number"
          value={form.quantHoras}
          onChange={handleChange}
        />
        
        <FormField
          label="Frequência Negociada"
          name="frequenciaNegociada"
          type="number"
          value={form.frequenciaNegociada}
          onChange={handleChange}
        />
      </div>
      
      <FormField
        label="Frequência Solicitada"
        name="frequenciaSolicitada"
        value={form.frequenciaSolicitada}
        onChange={handleChange}
      />
      
      <FormField
        label="Justificativa"
        name="justificativa"
        value={form.justificativa}
        onChange={handleChange}
      />
      
      <FormField
        label="Decisão Final"
        name="decisaoFinal"
        value={form.decisaoFinal}
        onChange={handleChange}
      />
      
      <FormField
        label="Plano de Ação"
        name="planoDeAcao"
        value={form.planoDeAcao}
        onChange={handleChange}
      />
      
      <FormField
        label="Prazo"
        name="prazo"
        value={form.prazo}
        onChange={handleChange}
      />
    </div>
  );
};

export default PlanejamentoSection;
