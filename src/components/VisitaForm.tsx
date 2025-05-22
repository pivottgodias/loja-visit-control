
import React, { useState, useEffect } from 'react';
import { Visita } from '../types/types';
import { useAppContext } from '../contexts/AppContext';
import { toast } from '@/components/ui/sonner';
import { v4 as uuidv4 } from 'uuid';

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

// Define initial state directly as an object without spreading
const initialVisita = {
  promotorId: '',
  lojaId: '',
  rotaId: '',
  tipoAtendimento: 'PRÓPRIO' as 'PRÓPRIO' | 'TERCEIRO' | 'MISTO',
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
    return {
      promotorId: initialVisita.promotorId,
      lojaId: initialVisita.lojaId,
      rotaId: initialVisita.rotaId,
      tipoAtendimento: initialVisita.tipoAtendimento,
      periodo: initialVisita.periodo,
      quantVisitas: initialVisita.quantVisitas,
      horasTotais: initialVisita.horasTotais,
      diasVisita: {
        segunda: initialVisita.diasVisita.segunda,
        terca: initialVisita.diasVisita.terca,
        quarta: initialVisita.diasVisita.quarta,
        quinta: initialVisita.diasVisita.quinta,
        sexta: initialVisita.diasVisita.sexta,
        sabado: initialVisita.diasVisita.sabado,
      },
      faturamentoMensal: {
        janeiro: initialVisita.faturamentoMensal.janeiro,
        fevereiro: initialVisita.faturamentoMensal.fevereiro,
        marco: initialVisita.faturamentoMensal.marco,
        abril: initialVisita.faturamentoMensal.abril,
        maio: initialVisita.faturamentoMensal.maio,
        junho: initialVisita.faturamentoMensal.junho,
        julho: initialVisita.faturamentoMensal.julho,
        agosto: initialVisita.faturamentoMensal.agosto,
        setembro: initialVisita.faturamentoMensal.setembro,
        outubro: initialVisita.faturamentoMensal.outubro,
        novembro: initialVisita.faturamentoMensal.novembro,
        dezembro: initialVisita.faturamentoMensal.dezembro,
      },
      custoPorPromotor: initialVisita.custoPorPromotor,
      custoPorPromotorHora: initialVisita.custoPorPromotorHora,
      custoPorLoja: initialVisita.custoPorLoja,
      mixIdeal: initialVisita.mixIdeal,
      mixIdealPontos: initialVisita.mixIdealPontos,
      produtoBonus: initialVisita.produtoBonus,
      sugestaoVisitas: initialVisita.sugestaoVisitas,
      quantHoras: initialVisita.quantHoras,
      frequenciaNegociada: initialVisita.frequenciaNegociada,
      frequenciaSolicitada: initialVisita.frequenciaSolicitada,
      justificativa: initialVisita.justificativa,
      decisaoFinal: initialVisita.decisaoFinal,
      planoDeAcao: initialVisita.planoDeAcao,
      prazo: initialVisita.prazo
    };
  });
  
  const [activeTab, setActiveTab] = useState<'geral' | 'financeiro' | 'planejamento'>('geral');
  
  // Update form when visita prop changes
  useEffect(() => {
    if (visita) {
      // Explicitly copy all properties to avoid spread operator issues
      setForm({
        promotorId: visita.promotorId,
        lojaId: visita.lojaId,
        rotaId: visita.rotaId,
        tipoAtendimento: visita.tipoAtendimento || 'PRÓPRIO',
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
          }
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
        setForm(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent as keyof typeof prev],
            [child]: type === 'checkbox' 
              ? (e.target as HTMLInputElement).checked
              : type === 'number' ? Number(value) : value
          }
        }));
      }
    } else {
      setForm(prev => ({
        ...prev,
        [name]: type === 'checkbox' 
          ? (e.target as HTMLInputElement).checked 
          : type === 'number' ? Number(value) : value
      }));
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
