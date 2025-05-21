
import React, { useState, useEffect } from 'react';
import { Loja } from '../types/types';
import { useAppContext } from '../contexts/AppContext';
import FormField from './FormField';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { v4 as uuidv4 } from 'uuid';

interface LojaFormProps {
  loja?: Loja;
  onClose: () => void;
}

const initialLoja: Omit<Loja, 'id'> = {
  cnpj: '',
  fantasia: '',
  regional: '',
  rede: '',
  status: '',
  estado: '',
  tamanho: 'M',
};

const estados = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const LojaForm: React.FC<LojaFormProps> = ({ loja, onClose }) => {
  const { addLoja, updateLoja } = useAppContext();
  const [form, setForm] = useState<Omit<Loja, 'id'>>(initialLoja);

  useEffect(() => {
    if (loja) {
      setForm({ ...loja });
    }
  }, [loja]);

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
      if (!form.cnpj || !form.fantasia) {
        toast.error('Por favor, preencha todos os campos obrigatórios');
        return;
      }

      if (loja) {
        updateLoja({ ...form, id: loja.id });
        toast.success('Loja atualizada com sucesso!');
      } else {
        addLoja({ ...form, id: uuidv4() });
        toast.success('Loja cadastrada com sucesso!');
      }
      onClose();
    } catch (error) {
      console.error('Erro ao salvar loja:', error);
      toast.error('Erro ao salvar loja');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{loja ? 'Editar Loja' : 'Nova Loja'}</h2>
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
          label="CNPJ"
          name="cnpj"
          value={form.cnpj}
          onChange={handleChange}
          required
        />

        <FormField
          label="Nome Fantasia"
          name="fantasia"
          value={form.fantasia}
          onChange={handleChange}
          required
        />

        <FormField
          label="Regional"
          name="regional"
          value={form.regional}
          onChange={handleChange}
        />

        <FormField
          label="Rede"
          name="rede"
          value={form.rede}
          onChange={handleChange}
        />

        <FormField
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
        />

        <FormField
          label="Estado"
          name="estado"
          type="select"
          value={form.estado}
          onChange={handleChange}
          options={estados.map(estado => ({ value: estado, label: estado }))}
        />

        <FormField
          label="Tamanho"
          name="tamanho"
          type="select"
          value={form.tamanho}
          onChange={handleChange}
          options={[
            { value: 'P', label: 'Pequeno' },
            { value: 'M', label: 'Médio' },
            { value: 'G', label: 'Grande' }
          ]}
        />
      </div>

      <div className="flex justify-end mt-6 space-x-2">
        <Button variant="outline" type="button" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">
          {loja ? 'Atualizar' : 'Cadastrar'}
        </Button>
      </div>
    </form>
  );
};

export default LojaForm;
