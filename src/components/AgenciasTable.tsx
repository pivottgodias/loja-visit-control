
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Agencia } from '../types/types';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface AgenciasTableProps {
  onEdit: (agencia: Agencia) => void;
}

const AgenciasTable: React.FC<AgenciasTableProps> = ({ onEdit }) => {
  const { agencias, deleteAgencia } = useAppContext();

  if (!agencias) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contato</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {agencias.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-2 text-center text-gray-500">
                Nenhuma agência cadastrada.
              </td>
            </tr>
          ) : (
            agencias.map((agencia) => (
              <tr key={agencia.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{agencia.nome}</td>
                <td className="px-4 py-2">{agencia.contato}</td>
                <td className="px-4 py-2">{agencia.telefone}</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onEdit(agencia)}
                      title="Editar"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => {
                        if (confirm('Deseja realmente excluir esta agência?')) {
                          deleteAgencia(agencia.id);
                        }
                      }}
                      title="Excluir"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AgenciasTable;
