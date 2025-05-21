
import React, { useState, useEffect } from 'react';
import { Visita, Promotor, Loja, Rota, DiasSemana } from '../types/types';
import { useAppContext } from '../contexts/AppContext';
import FormField from './FormField';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { v4 as uuidv4 } from 'uuid';

interface VisitaFormProps {
  visita?: Visita;
  onClose: () => void;
}

const initialVisita: Omit<Visita, 'id'> = {
  promotorId: '',
  lojaId: '',
  rotaId: '',
  periodo: '',
  quantVisitas: 0,
  horasTotais: 0,
  diasVisita: {
    segunda: false,
    terca: false,
    quarta: false,
    quinta: false,
    sexta: false,
    sabado: false,
  },
  faturamentoMensal: {
    janeiro: 0,
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
    dezembro: 0,
  },
  custoPorPromotor: 0,
  custoPorPromotorHora: 0,
  custoPorLoja: 0,
  mixIdeal: 0,
  mixIdealPontos: 0,
  produtoBonus: 0,
  sugestaoVisitas: 0,
  quantHoras: 0,
  frequenciaNegociada: 0,
  frequenciaSolicitada: '',
  justificativa: '',
  decisaoFinal: '',
  planoDeAcao: '',
  prazo: '',
};

const diasSemanaLabels: Record<DiasSemana, string> = {
  segunda: 'Segunda-Feira',
  terca: 'Terça-Feira',
  quarta: 'Quarta-Feira',
  quinta: 'Quinta-Feira',
  sexta: 'Sexta-Feira',
  sabado: 'Sábado',
};

const mesesLabels = {
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

const VisitaForm: React.FC<VisitaFormProps> = ({ visita, onClose }) => {
  const { promotores, lojas, rotas, addVisita, updateVisita } = useAppContext();
  const [form, setForm] = useState<Omit<Visita, 'id'>>({...initialVisita});
  const [activeTab, setActiveTab] = useState<'geral' | 'financeiro' | 'planejamento'>('geral');
  
  // Inicializar form com visita existente, se houver
  useEffect(() => {
    if (visita) {
      // Use spread on object with explicit type to avoid TypeScript errors
      const { id, ...visitaData } = visita;
      setForm(visitaData);
    }
  }, [visita]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Lidar com os diferentes tipos de campos
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: type === 'checkbox' 
            ? (e.target as HTMLInputElement).checked
            : type === 'number' ? Number(value) : value
        }
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: type === 'checkbox' 
          ? (e.target as HTMLInputElement).checked 
          : type === 'number' ? Number(value) : value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!form.promotorId || !form.lojaId || !form.rotaId) {
        toast.error('Por favor, preencha todos os campos obrigatórios');
        return;
      }
      
      if (visita) {
        updateVisita({ ...form, id: visita.id });
        toast.success('Visita atualizada com sucesso!');
      } else {
        addVisita({ ...form, id: uuidv4() });
        toast.success('Visita cadastrada com sucesso!');
      }
      onClose();
    } catch (error) {
      console.error('Erro ao salvar visita:', error);
      toast.error('Erro ao salvar visita');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{visita ? 'Editar Visita' : 'Nova Visita'}</h2>
        <button 
          type="button" 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>
      
      {/* Tabs */}
      <div className="border-b mb-4">
        <nav className="flex -mb-px">
          <button 
            type="button"
            className={`py-2 px-4 font-medium ${activeTab === 'geral' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('geral')}
          >
            Dados Gerais
          </button>
          <button 
            type="button"
            className={`py-2 px-4 font-medium ${activeTab === 'financeiro' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('financeiro')}
          >
            Financeiro
          </button>
          <button 
            type="button"
            className={`py-2 px-4 font-medium ${activeTab === 'planejamento' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('planejamento')}
          >
            Planejamento
          </button>
        </nav>
      </div>
      
      {/* Dados Gerais */}
      {activeTab === 'geral' && (
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
      )}
      
      {/* Financeiro */}
      {activeTab === 'financeiro' && (
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
                value={form.faturamentoMensal[mes as keyof typeof form.faturamentoMensal]}
                onChange={handleChange}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Planejamento */}
      {activeTab === 'planejamento' && (
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
      )}
      
      <div className="flex justify-end mt-6 space-x-2">
        <Button variant="outline" type="button" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">
          {visita ? 'Atualizar' : 'Cadastrar'}
        </Button>
      </div>
    </form>
  );
};

export default VisitaForm;
