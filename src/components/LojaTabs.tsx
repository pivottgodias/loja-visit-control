
import React, { useState } from 'react';
import { Loja } from '../types/types';
import { cn } from '@/lib/utils';
import LojaClassificacaoTab from './LojaClassificacaoTab';

interface LojaTabsProps {
  loja: Loja;
  children: React.ReactNode;
  onUpdateLoja: (loja: Loja) => void;
}

const LojaTabs: React.FC<LojaTabsProps> = ({ loja, children, onUpdateLoja }) => {
  const [activeTab, setActiveTab] = useState<'dados' | 'classificacao'>('dados');
  
  return (
    <div>
      <div className="mb-4 border-b">
        <div className="flex">
          <button
            type="button"
            className={cn(
              "py-2 px-4 border-b-2 font-medium",
              activeTab === 'dados'
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
            onClick={() => setActiveTab('dados')}
          >
            Dados da Loja
          </button>
          <button
            type="button"
            className={cn(
              "py-2 px-4 border-b-2 font-medium",
              activeTab === 'classificacao'
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
            onClick={() => setActiveTab('classificacao')}
          >
            Classificação
          </button>
        </div>
      </div>
      
      {activeTab === 'dados' && (
        <div>{children}</div>
      )}
      
      {activeTab === 'classificacao' && (
        <LojaClassificacaoTab loja={loja} onUpdateLoja={onUpdateLoja} />
      )}
    </div>
  );
};

export default LojaTabs;
