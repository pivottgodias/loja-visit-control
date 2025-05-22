
import React, { useState, useEffect } from 'react';
import { Visita } from '../types/types';
import { useAppContext } from '../contexts/AppContext';
import { toast } from '@/components/ui/sonner';
import { v4 as uuidv4 } from 'uuid';
import { obterFrequenciaVisita } from '../services/classificacaoService';

// Import the form components
import FormHeader from './visita-form/FormHeader';
import TabNav from './visita-form/TabNav';
import DadosGeraisSection from './visita-form/DadosGeraisSection';
import FinanceiroSection from './visita-form/FinanceiroSection';
import PlanejamentoSection from './visita-form/PlanejamentoSection';
import FormFooter from './visita-form/FormFooter';

interface VisitaFormProps {
  visita?: Visita;
  onClose: () => void;
}

// Define initial state directly as an object
const initialVisita: Omit<Visita, 'id'> = {
  promotorId: '',
  lojaId: '',
  rotaId: '',
  tipoAtendimento: 'PRÓPRIO',
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

const VisitaForm: React.FC<VisitaFormProps> = ({ visita, onClose }) => {
  const { promotores, lojas, rotas, addVisita, updateVisita } = useAppContext();
  
  // Initialize form with a deep copy of initialVisita
  const [form, setForm] = useState<Omit<Visita, 'id'>>(() => {
    // Return a new object with all properties explicitly copied
    return { ...initialVisita };
  });
  
  const [activeTab, setActiveTab] = useState<'geral' | 'financeiro' | 'planejamento'>('geral');
  
  // Update form when visita prop changes
  useEffect(() => {
    if (visita) {
      // Explicitly create a new object with properties copied from visita
      setForm({
        promotorId: visita.promotorId,
        lojaId: visita.lojaId,
        rotaId: visita.rotaId,
        tipoAtendimento: visita.tipoAtendimento,
        periodo: visita.periodo,
        quantVisitas: visita.quantVisitas,
        horasTotais: visita.horasTotais,
        diasVisita: {
          segunda: visita.diasVisita.segunda,
          terca: visita.diasVisita.terca,
          quarta: visita.diasVisita.quarta,
          quinta: visita.diasVisita.quinta,
          sexta: visita.diasVisita.sexta,
          sabado: visita.diasVisita.sabado,
        },
        faturamentoMensal: {
          janeiro: visita.faturamentoMensal.janeiro,
          fevereiro: visita.faturamentoMensal.fevereiro,
          marco: visita.faturamentoMensal.marco,
          abril: visita.faturamentoMensal.abril,
          maio: visita.faturamentoMensal.maio,
          junho: visita.faturamentoMensal.junho,
          julho: visita.faturamentoMensal.julho,
          agosto: visita.faturamentoMensal.agosto,
          setembro: visita.faturamentoMensal.setembro,
          outubro: visita.faturamentoMensal.outubro,
          novembro: visita.faturamentoMensal.novembro,
          dezembro: visita.faturamentoMensal.dezembro,
        },
        custoPorPromotor: visita.custoPorPromotor,
        custoPorPromotorHora: visita.custoPorPromotorHora,
        custoPorLoja: visita.custoPorLoja,
        mixIdeal: visita.mixIdeal,
        mixIdealPontos: visita.mixIdealPontos,
        produtoBonus: visita.produtoBonus,
        sugestaoVisitas: visita.sugestaoVisitas,
        quantHoras: visita.quantHoras,
        frequenciaNegociada: visita.frequenciaNegociada,
        frequenciaSolicitada: visita.frequenciaSolicitada,
        justificativa: visita.justificativa,
        decisaoFinal: visita.decisaoFinal,
        planoDeAcao: visita.planoDeAcao,
        prazo: visita.prazo
      });
    }
  }, [visita]);

  // Apply store classification when loja changes
  useEffect(() => {
    if (form.lojaId) {
      const loja = lojas.find(l => l.id === form.lojaId);
      
      if (loja && loja.pontuacaoFinal && loja.diasVisitaSugeridos) {
        setForm(prev => ({
          ...prev,
          // Apply recommended visit days if available
          diasVisita: loja.diasVisitaSugeridos || prev.diasVisita,
          // Apply recommended hours if available
          quantHoras: loja.horasFrequencia || prev.quantHoras,
          // Calculate how many visits per week based on selected days
          quantVisitas: Object.values(loja.diasVisitaSugeridos).filter(Boolean).length,
          // Update the total hours
          horasTotais: (loja.horasFrequencia || 0) * Object.values(loja.diasVisitaSugeridos).filter(Boolean).length,
        }));
      }
    }
  }, [form.lojaId, lojas]);
  
  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Handle nested properties in form state
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      
      if (parent === 'diasVisita') {
        setForm(prev => ({
          ...prev,
          diasVisita: {
            ...prev.diasVisita,
            [child]: (e.target as HTMLInputElement).checked
          },
          // Update quantVisitas when changing days
          quantVisitas: Object.values({
            ...prev.diasVisita,
            [child]: (e.target as HTMLInputElement).checked
          }).filter(Boolean).length
        }));
        
        // Update horasTotais when changing dias
        setForm(prev => ({
          ...prev,
          horasTotais: prev.quantHoras * prev.quantVisitas
        }));
      } else if (parent === 'faturamentoMensal') {
        setForm(prev => ({
          ...prev,
          faturamentoMensal: {
            ...prev.faturamentoMensal,
            [child]: type === 'number' ? Number(value) : value
          }
        }));
      } else {
        // For other nested objects we might add in the future
        setForm(prev => {
          const newState = { ...prev };
          if (parent in newState) {
            const parentObj = { ...(prev as any)[parent] };
            parentObj[child] = type === 'checkbox' 
              ? (e.target as HTMLInputElement).checked
              : type === 'number' ? Number(value) : value;
            (newState as any)[parent] = parentObj;
          }
          return newState;
        });
      }
    } else {
      setForm(prev => {
        const newState = { ...prev };
        (newState as any)[name] = type === 'checkbox' 
          ? (e.target as HTMLInputElement).checked 
          : type === 'number' ? Number(value) : value;
          
        // Update horasTotais when changing quantHoras or quantVisitas
        if (name === 'quantHoras' || name === 'quantVisitas') {
          newState.horasTotais = (name === 'quantHoras' ? Number(value) : prev.quantHoras) * 
                               (name === 'quantVisitas' ? Number(value) : prev.quantVisitas);
        }
        
        return newState;
      });
    }
  };

  // Handle form submission
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
      <FormHeader isEditing={!!visita} onClose={onClose} />
      
      {/* Tabs Navigation */}
      <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Render the active tab content */}
      {activeTab === 'geral' && (
        <DadosGeraisSection 
          form={form}
          handleChange={handleChange}
          promotores={promotores}
          lojas={lojas}
          rotas={rotas}
        />
      )}
      
      {activeTab === 'financeiro' && (
        <FinanceiroSection 
          form={form}
          handleChange={handleChange}
        />
      )}
      
      {activeTab === 'planejamento' && (
        <PlanejamentoSection 
          form={form}
          handleChange={handleChange}
        />
      )}
      
      <FormFooter isEditing={!!visita} onClose={onClose} />
    </form>
  );
};

export default VisitaForm;
