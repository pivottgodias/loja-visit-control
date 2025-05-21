
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import LojasTable from '@/components/LojasTable';
import LojaForm from '@/components/LojaForm';
import { Loja } from '@/types/types';
import { Plus, FileUp, FileDown } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { exportLojas, importLojas } from '@/services/excelService';

const Lojas = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedLoja, setSelectedLoja] = useState<Loja | undefined>(undefined);

  const handleEdit = (loja: Loja) => {
    setSelectedLoja(loja);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setSelectedLoja(undefined);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx, .xls';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      try {
        const result = await importLojas(file);
        toast.success(result);
      } catch (error) {
        console.error('Erro ao importar lojas:', error);
        toast.error(`Erro ao importar lojas: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      }
    };
    
    input.click();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Cadastro de Lojas</h1>
        <div className="flex gap-2">
          <Button 
            onClick={() => {
              setSelectedLoja(undefined);
              setIsFormOpen(true);
            }}
            className="flex items-center gap-1"
          >
            <Plus size={16} /> Nova Loja
          </Button>
          
          <Button
            variant="outline"
            onClick={handleImport}
            className="flex items-center gap-1"
            title="Importar lojas"
          >
            <FileUp size={16} /> Importar
          </Button>
          
          <Button
            variant="outline"
            onClick={() => {
              try {
                exportLojas();
                toast.success('Lojas exportadas com sucesso!');
              } catch (error) {
                console.error('Erro ao exportar lojas:', error);
                toast.error('Erro ao exportar lojas');
              }
            }}
            className="flex items-center gap-1"
            title="Exportar lojas"
          >
            <FileDown size={16} /> Exportar
          </Button>
        </div>
      </div>
      
      <LojasTable onEdit={handleEdit} />
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <LojaForm loja={selectedLoja} onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Lojas;
