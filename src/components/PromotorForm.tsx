
import React, { useState, useEffect } from 'react';
import { Promotor } from '../types/types';
import { useAppContext } from '../contexts/AppContext';
import FormField from './FormField';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { v4 as uuidv4 } from 'uuid';

interface PromotorFormProps {
  promotor?: Promotor;
  onClose: () => void;
}

const initialPromotor: Omit<Promotor, 'id'> = {
  tipo: "PRÓPRIO",
  codigo: '',
  nome: '',
  agencia: '',
  supervisor: '',
  gerencia: '',
};

const PromotorForm: React.FC<PromotorFormProps> = ({ promotor, onClose }) => {
  const { addPromotor, updatePromotor } = useAppContext();
  const [form, setForm] = useState<Omit<Promotor, 'id'>>(initialPromotor);

  useEffect(() => {
    if (promotor) {
      setForm({ ...promotor });
    }
  }, [promotor]);

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
      if (!form.nome || !form.codigo) {
        toast.error('Por favor, preencha todos os campos obrigatórios');
        return;
      }

      if (promotor) {
        updatePromotor({ ...form, id: promotor.id });
        toast.success('Promotor atualizado com sucesso!');
      } else {
        addPromotor({ ...form, id: uuidv4() });
        toast.success('Promotor cadastrado com sucesso!');
      }
      onClose();
    } catch (error) {
      console.error('Erro ao salvar promotor:', error);
      toast.error('Erro ao salvar promotor');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{promotor ? 'Editar Promotor' : 'Novo Promotor'}</h2>
        <button 
          type="button" 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Tipo"
          name="tipo"
          type="select"
          value={form.tipo}
          onChange={handleChange}
          options={[
            { value: 'PRÓPRIO', label: 'PRÓPRIO' },
            { value: 'TERCEIRO', label: 'TERCEIRO' }
          ]}
          required
        />

        <FormField
          label="Código"
          name="codigo"
          value={form.codigo}
          onChange={handleChange}
          required
        />

        <FormField
          label="Nome"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
        />

        {form.tipo === 'TERCEIRO' && (
          <FormField
            label="Agência"
            name="agencia"
            value={form.agencia || ''}
            onChange={handleChange}
          />
        )}

        <FormField
          label="Supervisor"
          name="supervisor"
          value={form.supervisor}
          onChange={handleChange}
        />

        <FormField
          label="Gerência"
          name="gerencia"
          value={form.gerencia}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end mt-6 space-x-2">
        <Button variant="outline" type="button" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">
          {promotor ? 'Atualizar' : 'Cadastrar'}
        </Button>
      </div>
    </form>
  );
};

export default PromotorForm;
