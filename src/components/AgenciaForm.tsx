
import React, { useState, useEffect } from 'react';
import { Agencia } from '../types/types';
import { useAppContext } from '../contexts/AppContext';
import FormField from './FormField';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { v4 as uuidv4 } from 'uuid';

interface AgenciaFormProps {
  agencia?: Agencia;
  onClose: () => void;
}

const initialAgencia: Omit<Agencia, 'id'> = {
  nome: '',
  contato: '',
  telefone: '',
};

const AgenciaForm: React.FC<AgenciaFormProps> = ({ agencia, onClose }) => {
  const { addAgencia, updateAgencia } = useAppContext();
  const [form, setForm] = useState<Omit<Agencia, 'id'>>(initialAgencia);

  useEffect(() => {
    if (agencia) {
      // Use spread on object with explicit type to avoid TypeScript errors
      setForm({
        nome: agencia.nome,
        contato: agencia.contato,
        telefone: agencia.telefone
      });
    }
  }, [agencia]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!form.nome || !form.contato) {
        toast.error('Por favor, preencha todos os campos obrigatórios');
        return;
      }

      if (agencia) {
        updateAgencia({ ...form, id: agencia.id });
        toast.success('Agência atualizada com sucesso!');
      } else {
        addAgencia({ ...form, id: uuidv4() });
        toast.success('Agência cadastrada com sucesso!');
      }
      onClose();
    } catch (error) {
      console.error('Erro ao salvar agência:', error);
      toast.error('Erro ao salvar agência');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{agencia ? 'Editar Agência' : 'Nova Agência'}</h2>
        <button 
          type="button" 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <FormField
          label="Nome"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
        />

        <FormField
          label="Contato"
          name="contato"
          value={form.contato}
          onChange={handleChange}
          required
        />

        <FormField
          label="Telefone"
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end mt-6 space-x-2">
        <Button variant="outline" type="button" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">
          {agencia ? 'Atualizar' : 'Cadastrar'}
        </Button>
      </div>
    </form>
  );
};

export default AgenciaForm;
