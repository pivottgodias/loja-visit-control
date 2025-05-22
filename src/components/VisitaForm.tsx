
import React from 'react';
import { Visita } from '../types/types';
import { useVisitaForm } from '../hooks/useVisitaForm';

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

const VisitaForm: React.FC<VisitaFormProps> = ({ visita, onClose }) => {
  const {
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
    isEditing
  } = useVisitaForm({ visita, onClose });

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6">
      <FormHeader isEditing={isEditing} onClose={onClose} />
      
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
          agencias={agencias}
          handleTipoAtendimentoChange={handleTipoAtendimentoChange}
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
      
      <FormFooter isEditing={isEditing} onClose={onClose} />
    </form>
  );
};

export default VisitaForm;
