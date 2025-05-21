
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import VisitasTable from '@/components/VisitasTable';
import VisitaForm from '@/components/VisitaForm';
import { Visita } from '@/types/types';
import { Plus, FileUp, FileDown } from 'lucide-react';

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
