
import React from 'react';
import { Visita, Promotor, Loja, Rota } from '../../types/types';
import FormField from '../FormField';

interface DadosGeraisSectionProps {
  form: Omit<Visita, 'id'>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  promotores: Promotor[];
  lojas: Loja[];
  rotas: Rota[];
}

const DadosGeraisSection: React.FC<DadosGeraisSectionProps> = ({ 
  form, handleChange, promotores, lojas, rotas 
}) => {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        label="Promotor"
        name="promotorId"
        type="select"
        value={form.promotorId}
        onChange={handleChange}
        required
        options={promotores.map(promotor => ({ 
          value: promotor.id, 
          label: `${promotor.nome} (${promotor.codigo})` 
        }))}
      />
      
      <FormField
        label="Loja"
        name="lojaId"
        type="select"
        value={form.lojaId}
        onChange={handleChange}
        required
        options={lojas.map(loja => ({ 
          value: loja.id, 
          label: loja.fantasia 
        }))}
      />
      
      <FormField
        label="Rota"
        name="rotaId"
        type="select"
        value={form.rotaId}
        onChange={handleChange}
        required
        options={rotas.map(rota => ({ 
          value: rota.id, 
          label: rota.nome
        }))}
      />
      
      <FormField
        label="Tipo de Atendimento"
        name="tipoAtendimento"
        type="select"
        value={form.tipoAtendimento}
        onChange={handleChange}
        required
        options={[
          { value: 'PRÓPRIO', label: 'PRÓPRIO' },
          { value: 'TERCEIRO', label: 'TERCEIRO' },
          { value: 'MISTO', label: 'MISTO' }
        ]}
      />

      <FormField
        label="Período"
        name="periodo"
        value={form.periodo}
        onChange={handleChange}
      />
      
      <FormField
        label="Quantidade de Visitas"
        name="quantVisitas"
        type="number"
        value={form.quantVisitas}
        onChange={handleChange}
      />
      
      <FormField
        label="Total de Horas"
        name="horasTotais"
        type="number"
        value={form.horasTotais}
        onChange={handleChange}
      />
      
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Dias de Visita
        </label>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {Object.keys(form.diasVisita).map((dia) => (
            <div key={dia} className="flex items-center">
              <input
                type="checkbox"
                id={`diasVisita.${dia}`}
                name={`diasVisita.${dia}`}
                checked={form.diasVisita[dia as keyof typeof form.diasVisita]}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={`diasVisita.${dia}`} className="ml-2 text-sm text-gray-700 capitalize">
                {dia}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DadosGeraisSection;
