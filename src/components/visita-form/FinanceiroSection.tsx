
import React from 'react';
import FormField from '../FormField';
import { MesesAno } from '@/types/types';

interface FinanceiroSectionProps {
  form: {
    custoPorPromotor: number;
    custoPorPromotorHora: number;
    custoPorLoja: number;
    faturamentoMensal: Record<MesesAno, number>;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const mesesLabels: Record<MesesAno, string> = {
  janeiro: 'Janeiro',
  fevereiro: 'Fevereiro',
  marco: 'Março',
  abril: 'Abril',
  maio: 'Maio',
  junho: 'Junho',
  julho: 'Julho',
  agosto: 'Agosto',
  setembro: 'Setembro',
  outubro: 'Outubro',
  novembro: 'Novembro',
  dezembro: 'Dezembro',
};

const FinanceiroSection: React.FC<FinanceiroSectionProps> = ({
  form,
  handleChange
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <FormField
          label="Custo por Promotor"
          name="custoPorPromotor"
          type="number"
          value={form.custoPorPromotor}
          onChange={handleChange}
        />
        
        <FormField
          label="Custo por Promotor/Hora"
          name="custoPorPromotorHora"
          type="number"
          value={form.custoPorPromotorHora}
          onChange={handleChange}
        />
        
        <FormField
          label="Custo por Loja"
          name="custoPorLoja"
          type="number"
          value={form.custoPorLoja}
          onChange={handleChange}
        />
      </div>
      
      <h3 className="font-medium mb-2">Faturamento Mensal</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(mesesLabels).map(([mes, label]) => (
          <FormField
            key={mes}
            label={label}
            name={`faturamentoMensal.${mes}`}
            type="number"
            value={form.faturamentoMensal[mes as MesesAno]}
            onChange={handleChange}
          />
        ))}
      </div>
    </div>
  );
};

export default FinanceiroSection;
