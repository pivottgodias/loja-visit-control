
import React from 'react';
import { Visita, Promotor, Loja, Rota, Agencia, DiasSemana } from '../../types/types';
import FormField from '../FormField';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface DadosGeraisSectionProps {
  form: Omit<Visita, 'id'>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  promotores: Promotor[];
  lojas: Loja[];
  rotas: Rota[];
  agencias: Agencia[];
  handleTipoAtendimentoChange: (tipo: "PRÓPRIO" | "TERCEIRO" | "MISTO") => void;
}

const diasSemanaIniciais: Record<DiasSemana, string> = {
  segunda: 'S',
  terca: 'T',
  quarta: 'Q',
  quinta: 'Q',
  sexta: 'S',
  sabado: 'S',
};

const DadosGeraisSection: React.FC<DadosGeraisSectionProps> = ({ 
  form, handleChange, promotores, lojas, rotas, agencias, handleTipoAtendimentoChange
}) => {
  return (
    <div className="mt-4 space-y-6">
      {/* Tipo de Atendimento Selection */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-gray-700 mb-2 block">Tipo de Atendimento</Label>
        <RadioGroup 
          value={form.tipoAtendimento} 
          className="flex gap-6" 
          onValueChange={(value) => handleTipoAtendimentoChange(value as "PRÓPRIO" | "TERCEIRO" | "MISTO")}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="PRÓPRIO" id="proprio" />
            <Label htmlFor="proprio">PRÓPRIO</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="TERCEIRO" id="terceiro" />
            <Label htmlFor="terceiro">TERCEIRO</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="MISTO" id="misto" />
            <Label htmlFor="misto">MISTO</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Show Promotor/Agência based on selection */}
        {form.tipoAtendimento === "PRÓPRIO" && (
          <FormField
            label="Promotor"
            name="promotorId"
            type="select"
            value={form.promotorId}
            onChange={handleChange}
            required
            options={promotores
              .filter(promotor => promotor.tipo === "PRÓPRIO") // Filter only PRÓPRIO promoters
              .map(promotor => ({ 
                value: promotor.id, 
                label: `${promotor.nome} (${promotor.codigo})` 
              }))}
          />
        )}
        
        {form.tipoAtendimento === "TERCEIRO" && (
          <FormField
            label="Agência"
            name="agenciaId"
            type="select"
            value={form.agenciaId || ''}
            onChange={handleChange}
            required
            options={agencias.map(agencia => ({ 
              value: agencia.id, 
              label: agencia.nome
            }))}
          />
        )}
        
        {form.tipoAtendimento === "MISTO" && (
          <>
            <FormField
              label="Promotor"
              name="promotorId"
              type="select"
              value={form.promotorId}
              onChange={handleChange}
              required
              options={promotores
                .filter(promotor => promotor.tipo === "PRÓPRIO") // Filter only PRÓPRIO promoters
                .map(promotor => ({ 
                  value: promotor.id, 
                  label: `${promotor.nome} (${promotor.codigo})` 
                }))}
            />
            
            <FormField
              label="Agência"
              name="agenciaId"
              type="select"
              value={form.agenciaId || ''}
              onChange={handleChange}
              required
              options={agencias.map(agencia => ({ 
                value: agencia.id, 
                label: agencia.nome
              }))}
            />
          </>
        )}
        
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
          label="Quantidade de Visitas"
          name="quantVisitas"
          type="number"
          min={0}
          max={7}
          value={form.quantVisitas}
          onChange={handleChange}
        />
        
        <FormField
          label="Total de Horas"
          name="horasTotais"
          type="number"
          value={form.horasTotais}
          onChange={handleChange}
          readOnly
        />
      </div>
      
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
      
      {/* Show separate days for third party when MISTO */}
      {form.tipoAtendimento === "MISTO" && (
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dias de Visita (Terceirizado)
          </label>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {Object.keys(form.diasVisitaTerceiro || {}).map((dia) => (
              <div key={dia} className="flex items-center">
                <input
                  type="checkbox"
                  id={`diasVisitaTerceiro.${dia}`}
                  name={`diasVisitaTerceiro.${dia}`}
                  checked={form.diasVisitaTerceiro?.[dia as keyof typeof form.diasVisita] || false}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={`diasVisitaTerceiro.${dia}`} className="ml-2 text-sm text-gray-700 capitalize">
                  {dia}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DadosGeraisSection;
