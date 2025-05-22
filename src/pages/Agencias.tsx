
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import AgenciasTable from '@/components/AgenciasTable';
import AgenciaForm from '@/components/AgenciaForm';
import { Agencia } from '@/types/types';
import { Plus, FileUp, FileDown } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { exportAgencias, importAgencias } from '@/services/excelService';

const Agencias = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedAgencia, setSelectedAgencia] = useState<Agencia | undefined>(undefined);

  const handleEdit = (agencia: Agencia) => {
    setSelectedAgencia(agencia);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setSelectedAgencia(undefined);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx, .xls';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      try {
        const result = await importAgencias(file);
        toast.success(result);
      } catch (error) {
        console.error('Erro ao importar agências:', error);
        toast.error(`Erro ao importar agências: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      }
    };
    
    input.click();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Cadastro de Agências</h1>
        <div className="flex gap-2">
          <Button 
            onClick={() => {
              setSelectedAgencia(undefined);
              setIsFormOpen(true);
            }}
            className="flex items-center gap-1"
          >
            <Plus size={16} /> Nova Agência
          </Button>
          
          <Button
            variant="outline"
            onClick={handleImport}
            className="flex items-center gap-1"
            title="Importar agências"
          >
            <FileUp size={16} /> Importar
          </Button>
          
          <Button
            variant="outline"
            onClick={() => {
              try {
                exportAgencias();
                toast.success('Agências exportadas com sucesso!');
              } catch (error) {
                console.error('Erro ao exportar agências:', error);
                toast.error('Erro ao exportar agências');
              }
            }}
            className="flex items-center gap-1"
            title="Exportar agências"
          >
            <FileDown size={16} /> Exportar
          </Button>
        </div>
      </div>
      
      <AgenciasTable onEdit={handleEdit} />
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <AgenciaForm agencia={selectedAgencia} onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Agencias;
