
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import PromotoresTable from '@/components/PromotoresTable';
import PromotorForm from '@/components/PromotorForm';
import { Promotor } from '@/types/types';
import { Plus, FileUp, FileDown } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { exportPromotores, importPromotores } from '@/services/excelService';

const Promotores = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPromotor, setSelectedPromotor] = useState<Promotor | undefined>(undefined);

  const handleEdit = (promotor: Promotor) => {
    setSelectedPromotor(promotor);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setSelectedPromotor(undefined);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx, .xls';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      try {
        const result = await importPromotores(file);
        toast.success(result);
      } catch (error) {
        console.error('Erro ao importar promotores:', error);
        toast.error(`Erro ao importar promotores: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      }
    };
    
    input.click();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Cadastro de Promotores</h1>
        <div className="flex gap-2">
          <Button 
            onClick={() => {
              setSelectedPromotor(undefined);
              setIsFormOpen(true);
            }}
            className="flex items-center gap-1"
          >
            <Plus size={16} /> Novo Promotor
          </Button>
          
          <Button
            variant="outline"
            onClick={handleImport}
            className="flex items-center gap-1"
            title="Importar promotores"
          >
            <FileUp size={16} /> Importar
          </Button>
          
          <Button
            variant="outline"
            onClick={() => {
              try {
                exportPromotores();
                toast.success('Promotores exportados com sucesso!');
              } catch (error) {
                console.error('Erro ao exportar promotores:', error);
                toast.error('Erro ao exportar promotores');
              }
            }}
            className="flex items-center gap-1"
            title="Exportar promotores"
          >
            <FileDown size={16} /> Exportar
          </Button>
        </div>
      </div>
      
      <PromotoresTable onEdit={handleEdit} />
      
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <PromotorForm promotor={selectedPromotor} onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Promotores;
