
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import RotasTable from '@/components/RotasTable';
import RotaForm from '@/components/RotaForm';
import { Rota } from '@/types/types';
import { Plus, FileUp, FileDown } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { exportRotas, importRotas } from '@/services/excelService';

const Rotas = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRota, setSelectedRota] = useState<Rota | undefined>(undefined);

  const handleEdit = (rota: Rota) => {
    setSelectedRota(rota);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setSelectedRota(undefined);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx, .xls';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      try {
        const result = await importRotas(file);
        toast.success(result);
      } catch (error) {
        console.error('Erro ao importar rotas:', error);
        toast.error(`Erro ao importar rotas: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      }
    };
    
    input.click();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Cadastro de Rotas</h1>
        <div className="flex gap-2">
          <Button 
            onClick={() => {
              setSelectedRota(undefined);
              setIsFormOpen(true);
            }}
            className="flex items-center gap-1"
          >
            <Plus size={16} /> Nova Rota
          </Button>
          
          <Button
            variant="outline"
            onClick={handleImport}
            className="flex items-center gap-1"
            title="Importar rotas"
          >
            <FileUp size={16} /> Importar
          </Button>
          
          <Button
            variant="outline"
            onClick={() => {
              try {
                exportRotas();
                toast.success('Rotas exportadas com sucesso!');
              } catch (error) {
                console.error('Erro ao exportar rotas:', error);
                toast.error('Erro ao exportar rotas');
              }
            }}
            className="flex items-center gap-1"
            title="Exportar rotas"
          >
            <FileDown size={16} /> Exportar
          </Button>
        </div>
      </div>
      
      <RotasTable onEdit={handleEdit} />
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <RotaForm rota={selectedRota} onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Rotas;
