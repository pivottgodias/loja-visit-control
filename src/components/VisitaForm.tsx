import React, { useState, useEffect } from 'react';
import { Visita } from '../types/types';
import { useAppContext } from '../contexts/AppContext';
import { toast } from '@/components/ui/sonner';
import { v4 as uuidv4 } from 'uuid';

// Import the new components
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

const VisitaForm: React.FC<VisitaFormProps> = ({ visita, onClose }) => {
  const { promotores, lojas, rotas, addVisita, updateVisita } = useAppContext();
  const [form, setForm] = useState<Omit<Visita, 'id'>>({...initialVisita});
  const [activeTab, setActiveTab] = useState<'geral' | 'financeiro' | 'planejamento'>('geral');
  
  // Inicializar form com visita existente, se houver
  useEffect(() => {
    if (visita) {
      // Fix: Use explicit destructuring to avoid TypeScript errors
      const { 
        promotorId, lojaId, rotaId, periodo, quantVisitas, horasTotais, 
        diasVisita, faturamentoMensal, custoPorPromotor, custoPorPromotorHora, 
        custoPorLoja, mixIdeal, mixIdealPontos, produtoBonus, sugestaoVisitas, 
        quantHoras, frequenciaNegociada, frequenciaSolicitada, justificativa, 
        decisaoFinal, planoDeAcao, prazo 
      } = visita;
      
      setForm({
        promotorId, lojaId, rotaId, periodo, quantVisitas, horasTotais, 
        diasVisita, faturamentoMensal, custoPorPromotor, custoPorPromotorHora, 
        custoPorLoja, mixIdeal, mixIdealPontos, produtoBonus, sugestaoVisitas, 
        quantHoras, frequenciaNegociada, frequenciaSolicitada, justificativa, 
        decisaoFinal, planoDeAcao, prazo
      });
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
