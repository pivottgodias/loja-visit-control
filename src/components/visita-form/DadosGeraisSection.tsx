
import React from 'react';
import FormField from '../FormField';
import { DiasSemana } from '@/types/types';

interface DadosGeraisSectionProps {
  form: {
    promotorId: string;
    lojaId: string;
    rotaId: string;
    periodo: string;
    quantVisitas: number;
    horasTotais: number;
    diasVisita: Record<DiasSemana, boolean>;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  promotores: { id: string; nome: string; tipo: string; codigo: string }[];
  lojas: { id: string; fantasia: string; regional: string }[];
  rotas: { id: string; nome: string; codigo: string }[];
}

const diasSemanaLabels: Record<DiasSemana, string> = {
  segunda: 'Segunda-Feira',
  terca: 'Terça-Feira',
  quarta: 'Quarta-Feira',
  quinta: 'Quinta-Feira',
  sexta: 'Sexta-Feira',
  sabado: 'Sábado',
};

const DadosGeraisSection: React.FC<DadosGeraisSectionProps> = ({
  form,
  handleChange,
  promotores,
  lojas,
  rotas
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Promotor"
          name="promotorId"
          type="select"
          value={form.promotorId}
          onChange={handleChange}
          options={promotores.map(promotor => ({
            value: promotor.id,
            label: `${promotor.nome} (${promotor.tipo}: ${promotor.codigo})`
          }))}
          required
        />
        
        <FormField
          label="Loja"
          name="lojaId"
          type="select"
          value={form.lojaId}
          onChange={handleChange}
          options={lojas.map(loja => ({
            value: loja.id,
            label: `${loja.fantasia} (${loja.regional})`
          }))}
          required
        />
        
        <FormField
          label="Rota"
          name="rotaId"
          type="select"
          value={form.rotaId}
          onChange={handleChange}
          options={rotas.map(rota => ({
            value: rota.id,
            label: `${rota.nome} (${rota.codigo})`
          }))}
          required
        />
        
        <FormField
          label="Período"
          name="periodo"
          type="select"
          value={form.periodo}
          onChange={handleChange}
          options={[
            { value: 'Diário', label: 'Diário' },
            { value: 'Semanal', label: 'Semanal' },
            { value: 'Quinzenal', label: 'Quinzenal' },
            { value: 'Mensal', label: 'Mensal' }
          ]}
        />
        
        <FormField
          label="Quantidade de Visitas"
          name="quantVisitas"
          type="number"
          value={form.quantVisitas}
          onChange={handleChange}
        />
        
        <FormField
          label="Horas Totais"
          name="horasTotais"
          type="number"
          value={form.horasTotais}
          onChange={handleChange}
        />
      </div>
      
      <div className="mt-4">
        <h3 className="font-medium mb-2">Dias de Visita</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(diasSemanaLabels).map(([dia, label]) => (
            <div key={dia} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`diasVisita.${dia}`}
                name={`diasVisita.${dia}`}
                checked={form.diasVisita[dia as DiasSemana]}
                onChange={handleChange}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={`diasVisita.${dia}`} className="text-sm text-gray-700">
                {label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DadosGeraisSection;
