
import { useState, useEffect } from 'react';
import { Visita, DiasSemana } from '../types/types';
import { useAppContext } from '../contexts/AppContext';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/sonner';

// Define initial state directly as an object
export const initialVisita: Omit<Visita, 'id'> = {
  promotorId: '',
  agenciaId: '',
  lojaId: '',
  rotaId: '',
  tipoAtendimento: 'PRÓPRIO',
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
  diasVisitaTerceiro: {
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

interface UseVisitaFormProps {
  visita?: Visita;
  onClose: () => void;
}

export function useVisitaForm({ visita, onClose }: UseVisitaFormProps) {
  const { promotores, lojas, rotas, agencias, addVisita, updateVisita } = useAppContext();
  
  // Initialize form with a deep copy of initialVisita
  const [form, setForm] = useState<Omit<Visita, 'id'>>({ ...initialVisita });
  const [activeTab, setActiveTab] = useState<'geral' | 'financeiro' | 'planejamento'>('geral');
  
  // Update form when visita prop changes
  useEffect(() => {
    if (visita) {
      // Explicitly create a new object with properties copied from visita
      setForm({
        promotorId: visita.promotorId || '',
        agenciaId: visita.agenciaId || '',
        lojaId: visita.lojaId,
        rotaId: visita.rotaId,
        tipoAtendimento: visita.tipoAtendimento,
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
        diasVisitaTerceiro: visita.diasVisitaTerceiro || {
          segunda: false,
          terca: false,
          quarta: false,
          quinta: false,
          sexta: false,
          sabado: false,
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

  // Apply store classification and hours based on size when loja changes
  useEffect(() => {
    if (form.lojaId) {
      const loja = lojas.find(l => l.id === form.lojaId);
      
      if (loja) {
        let horasPorVisita = 1; // Default for P or M
        
        if (loja.tamanho === 'G') {
          horasPorVisita = 1.5;
        } else if (loja.tamanho === 'CASH') {
          horasPorVisita = 2;
        }
        
        setForm(prev => ({
          ...prev,
          // Apply recommended visit days if available
          diasVisita: loja.diasVisitaSugeridos || prev.diasVisita,
          // Apply hours based on store size
          quantHoras: horasPorVisita,
          // Calculate total hours
          horasTotais: horasPorVisita * prev.quantVisitas,
        }));
      }
    }
  }, [form.lojaId, lojas]);

  // Handle changing the tipo de atendimento
  const handleTipoAtendimentoChange = (tipo: "PRÓPRIO" | "TERCEIRO" | "MISTO") => {
    setForm(prev => {
      // Reset IDs based on new type
      const newForm = {
        ...prev,
        tipoAtendimento: tipo,
      };
      
      if (tipo === "PRÓPRIO") {
        newForm.agenciaId = '';
      } else if (tipo === "TERCEIRO") {
        newForm.promotorId = '';
      }
      
      return newForm;
    });
  };
  
  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Handle nested properties in form state
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      
      if (parent === 'diasVisita' || parent === 'diasVisitaTerceiro') {
        setForm(prev => {
          // Update the specific days object
          const updatedDays = {
            ...prev[parent as 'diasVisita' | 'diasVisitaTerceiro'],
            [child]: (e.target as HTMLInputElement).checked
          };
          
          // Count total checked days across both sets of days
          const totalVisitDays = Object.values(parent === 'diasVisita' ? updatedDays : prev.diasVisita).filter(Boolean).length +
                                Object.values(parent === 'diasVisitaTerceiro' ? updatedDays : (prev.diasVisitaTerceiro || {})).filter(Boolean).length;
          
          // Calculate new total hours based on visit count and hours per visit
          const horasTotais = prev.quantHoras * Math.min(totalVisitDays, 7);
          
          return {
            ...prev,
            [parent]: updatedDays,
            quantVisitas: Math.min(totalVisitDays, 7), // Limit to 7
            horasTotais
          };
        });
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
        if (name === 'quantHoras') {
          // Make sure to stay within limits (0-7 days)
          const totalDays = Object.values(prev.diasVisita).filter(Boolean).length + 
                          Object.values(prev.diasVisitaTerceiro || {}).filter(Boolean).length;
          const limitedVisitas = Math.min(totalDays, 7);
          newState.horasTotais = Number(value) * limitedVisitas;
        }
        
        if (name === 'quantVisitas') {
          // Limit to 0-7
          const limitedValue = Math.max(0, Math.min(7, Number(value)));
          newState.quantVisitas = limitedValue;
          newState.horasTotais = prev.quantHoras * limitedValue;
        }
        
        return newState;
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate required fields based on tipoAtendimento
      if (!form.lojaId || !form.rotaId) {
        toast.error('Por favor, preencha todos os campos obrigatórios');
        return;
      }
      
      if (form.tipoAtendimento === 'PRÓPRIO' && !form.promotorId) {
        toast.error('Por favor, selecione um promotor');
        return;
      }
      
      if (form.tipoAtendimento === 'TERCEIRO' && !form.agenciaId) {
        toast.error('Por favor, selecione uma agência');
        return;
      }
      
      if (form.tipoAtendimento === 'MISTO' && (!form.promotorId || !form.agenciaId)) {
        toast.error('Por favor, selecione um promotor e uma agência');
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

  return {
    form,
    activeTab,
    setActiveTab,
    handleChange,
    handleTipoAtendimentoChange,
    handleSubmit,
    promotores,
    lojas,
    rotas,
    agencias,
    isEditing: !!visita
  };
}
