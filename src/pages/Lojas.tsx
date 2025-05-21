
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import LojasTable from '@/components/LojasTable';
import LojaForm from '@/components/LojaForm';
import { Loja } from '@/types/types';
import { Plus } from 'lucide-react';

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
