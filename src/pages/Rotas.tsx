
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import RotasTable from '@/components/RotasTable';
import RotaForm from '@/components/RotaForm';
import { Rota } from '@/types/types';
import { Plus } from 'lucide-react';

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
