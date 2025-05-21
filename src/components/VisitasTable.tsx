
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Visita, DiasSemana } from '../types/types';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Check, X } from 'lucide-react';

interface VisitasTableProps {
  onEdit: (visita: Visita) => void;
}

const diasSemanaIniciais: Record<DiasSemana, string> = {
  segunda: 'S',
  terca: 'T',
  quarta: 'Q',
  quinta: 'Q',
  sexta: 'S',
  sabado: 'S',
};

const VisitasTable: React.FC<VisitasTableProps> = ({ onEdit }) => {
  const { visitas, promotores, lojas, rotas, deleteVisita } = useAppContext();

  // Funções auxiliares para obter nomes a partir de IDs
  const getPromotorNome = (id: string) => {
    const promotor = promotores.find(p => p.id === id);
    return promotor ? `${promotor.nome} (${promotor.codigo})` : 'Desconhecido';
  };

  const getLojaNome = (id: string) => {
    const loja = lojas.find(l => l.id === id);
    return loja ? loja.fantasia : 'Desconhecida';
  };

  const getRotaNome = (id: string) => {
    const rota = rotas.find(r => r.id === id);
    return rota ? rota.nome : 'Desconhecida';
  };

  // Função para calcular o total de faturamento anual
  const calcularTotalFaturamento = (visita: Visita) => {
    return Object.values(visita.faturamentoMensal).reduce((sum, val) => sum + val, 0);
  };

  const renderDiasVisita = (diasVisita: Record<DiasSemana, boolean>) => {
    return (
      <div className="flex space-x-1">
        {(Object.entries(diasVisita) as [DiasSemana, boolean][]).map(([dia, checked]) => (
          <span 
            key={dia} 
            className={`inline-block w-6 h-6 rounded-full text-xs flex items-center justify-center ${
              checked ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}
            title={dia.charAt(0).toUpperCase() + dia.slice(1)}
          >
            {diasSemanaIniciais[dia]}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Promotor</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loja</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rota</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Período</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dias</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitas</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faturamento Total</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {visitas.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-4 py-2 text-center text-gray-500">
                Nenhuma visita cadastrada.
              </td>
            </tr>
          ) : (
            visitas.map((visita) => (
              <tr key={visita.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{getPromotorNome(visita.promotorId)}</td>
                <td className="px-4 py-2">{getLojaNome(visita.lojaId)}</td>
                <td className="px-4 py-2">{getRotaNome(visita.rotaId)}</td>
                <td className="px-4 py-2">{visita.periodo}</td>
                <td className="px-4 py-2">{renderDiasVisita(visita.diasVisita)}</td>
                <td className="px-4 py-2 text-center">{visita.quantVisitas}</td>
                <td className="px-4 py-2">
                  {calcularTotalFaturamento(visita).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onEdit(visita)}
                      title="Editar"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => {
                        if (confirm('Deseja realmente excluir esta visita?')) {
                          deleteVisita(visita.id);
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

export default VisitasTable;
