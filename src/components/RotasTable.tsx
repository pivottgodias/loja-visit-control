
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Rota } from '../types/types';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface RotasTableProps {
  onEdit: (rota: Rota) => void;
}

const RotasTable: React.FC<RotasTableProps> = ({ onEdit }) => {
  const { rotas, deleteRota } = useAppContext();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsável</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supervisor</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gerente</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qtd Códigos</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qtd Lojas</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {rotas.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-4 py-2 text-center text-gray-500">
                Nenhuma rota cadastrada.
              </td>
            </tr>
          ) : (
            rotas.map((rota) => (
              <tr key={rota.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{rota.codigo}</td>
                <td className="px-4 py-2">{rota.nome}</td>
                <td className="px-4 py-2">{rota.responsavel || '-'}</td>
                <td className="px-4 py-2">{rota.supervisor || '-'}</td>
                <td className="px-4 py-2">{rota.gerente || '-'}</td>
                <td className="px-4 py-2">{rota.qtdeCodigo}</td>
                <td className="px-4 py-2">{rota.qtdeLojas}</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onEdit(rota)}
                      title="Editar"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => {
                        if (confirm('Deseja realmente excluir esta rota?')) {
                          deleteRota(rota.id);
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

export default RotasTable;
