
import React from 'react';

interface FormHeaderProps {
  isEditing: boolean;
  onClose: () => void;
}

const FormHeader: React.FC<FormHeaderProps> = ({ isEditing, onClose }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">{isEditing ? 'Editar Visita' : 'Nova Visita'}</h2>
      <button 
        type="button" 
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700"
      >
        &times;
      </button>
    </div>
  );
};

export default FormHeader;
