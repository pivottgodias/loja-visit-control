
import React from 'react';
import { Button } from '@/components/ui/button';

interface FormFooterProps {
  isEditing: boolean;
  onClose: () => void;
}

const FormFooter: React.FC<FormFooterProps> = ({ isEditing, onClose }) => {
  return (
    <div className="flex justify-end mt-6 space-x-2">
      <Button variant="outline" type="button" onClick={onClose}>
        Cancelar
      </Button>
      <Button type="submit">
        {isEditing ? 'Atualizar' : 'Cadastrar'}
      </Button>
    </div>
  );
};

export default FormFooter;
