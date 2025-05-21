
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import PromotoresTable from '@/components/PromotoresTable';
import PromotorForm from '@/components/PromotorForm';
import { Promotor } from '@/types/types';
import { Plus } from 'lucide-react';

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
