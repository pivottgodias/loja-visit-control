
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import VisitasTable from '@/components/VisitasTable';
import VisitaForm from '@/components/VisitaForm';
import { Visita } from '@/types/types';
import { Plus, FileUp, FileDown } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { exportFinanceiroMensal, importFinanceiroMensal } from '@/services/excelService';

const Visitas = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedVisita, setSelectedVisita] = useState<Visita | undefined>(undefined);

  const handleEdit = (visita: Visita) => {
    setSelectedVisita(visita);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setSelectedVisita(undefined);
  };

  const handleImportFinanceiro = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx, .xls';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      try {
        const result = await importFinanceiroMensal(file);
        toast.success(result);
      } catch (error) {
        console.error('Erro ao importar dados financeiros:', error);
        toast.error(`Erro ao importar dados: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      }
    };
    
    input.click();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Controle de Visitas</h1>
        <div className="flex gap-2">
          <Button 
            onClick={() => {
              setSelectedVisita(undefined);
              setIsFormOpen(true);
            }}
            className="flex items-center gap-1"
          >
            <Plus size={16} /> Nova Visita
          </Button>
          
          <Button
            variant="outline"
            onClick={handleImportFinanceiro}
            className="flex items-center gap-1"
            title="Importar dados financeiros"
          >
            <FileUp size={16} /> Importar Financeiro
          </Button>
          
          <Button
            variant="outline"
            onClick={() => {
              try {
                exportFinanceiroMensal();
                toast.success('Dados financeiros exportados com sucesso!');
              } catch (error) {
                console.error('Erro ao exportar dados financeiros:', error);
                toast.error('Erro ao exportar dados financeiros');
              }
            }}
            className="flex items-center gap-1"
            title="Exportar dados financeiros"
          >
            <FileDown size={16} /> Exportar Financeiro
          </Button>
        </div>
      </div>
      
      <VisitasTable onEdit={handleEdit} />
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl">
          <VisitaForm visita={selectedVisita} onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Visitas;
