
import React from 'react';

interface TabNavProps {
  activeTab: 'geral' | 'financeiro' | 'planejamento';
  setActiveTab: (tab: 'geral' | 'financeiro' | 'planejamento') => void;
}

const TabNav: React.FC<TabNavProps> = ({ activeTab, setActiveTab }) => {
  return (
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
  );
};

export default TabNav;
