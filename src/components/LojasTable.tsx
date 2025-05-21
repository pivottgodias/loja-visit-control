
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Loja } from '../types/types';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface LojasTableProps {
  onEdit: (loja: Loja) => void;
}

const LojasTable: React.FC<LojasTableProps> = ({ onEdit }) => {
  const { lojas, deleteLoja } = useAppContext();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CNPJ</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fantasia</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Regional</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rede</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tamanho</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {lojas.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-4 py-2 text-center text-gray-500">
                Nenhuma loja cadastrada.
              </td>
            </tr>
          ) : (
            lojas.map((loja) => (
              <tr key={loja.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{loja.cnpj}</td>
                <td className="px-4 py-2">{loja.fantasia}</td>
                <td className="px-4 py-2">{loja.regional}</td>
                <td className="px-4 py-2">{loja.rede}</td>
                <td className="px-4 py-2">{loja.status}</td>
                <td className="px-4 py-2">{loja.estado}</td>
                <td className="px-4 py-2">{
                  loja.tamanho === 'P' ? 'Pequeno' :
                  loja.tamanho === 'M' ? 'Médio' :
                  loja.tamanho === 'G' ? 'Grande' : loja.tamanho
                }</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onEdit(loja)}
                      title="Editar"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => {
                        if (confirm('Deseja realmente excluir esta loja?')) {
                          deleteLoja(loja.id);
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

export default LojasTable;
