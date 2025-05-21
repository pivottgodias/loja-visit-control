
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Promotor } from '../types/types';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface PromotoresTableProps {
  onEdit: (promotor: Promotor) => void;
}

const PromotoresTable: React.FC<PromotoresTableProps> = ({ onEdit }) => {
  const { promotores, deletePromotor } = useAppContext();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agência</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supervisor</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gerência</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {promotores.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-2 text-center text-gray-500">
                Nenhum promotor cadastrado.
              </td>
            </tr>
          ) : (
            promotores.map((promotor) => (
              <tr key={promotor.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{promotor.tipo}</td>
                <td className="px-4 py-2">{promotor.codigo}</td>
                <td className="px-4 py-2">{promotor.nome}</td>
                <td className="px-4 py-2">{promotor.agencia || '-'}</td>
                <td className="px-4 py-2">{promotor.supervisor}</td>
                <td className="px-4 py-2">{promotor.gerencia}</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onEdit(promotor)}
                      title="Editar"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => {
                        if (confirm('Deseja realmente excluir este promotor?')) {
                          deletePromotor(promotor.id);
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

export default PromotoresTable;
