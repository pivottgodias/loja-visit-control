
import React, { useState, useEffect } from 'react';
import { Rota } from '../types/types';
import { useAppContext } from '../contexts/AppContext';
import FormField from './FormField';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { v4 as uuidv4 } from 'uuid';

interface RotaFormProps {
  rota?: Rota;
  onClose: () => void;
}

const initialRota: Omit<Rota, 'id'> = {
  codigo: '',
  nome: '',
  qtdeCodigo: 0,
  qtdeLojas: 0,
  responsavel: '',
  supervisor: '',
  gerente: '',
};

const RotaForm: React.FC<RotaFormProps> = ({ rota, onClose }) => {
  const { addRota, updateRota } = useAppContext();
  const [form, setForm] = useState<Omit<Rota, 'id'>>(initialRota);

  useEffect(() => {
    if (rota) {
      // Use explicit property assignment to avoid TypeScript issues
      setForm({
        codigo: rota.codigo,
        nome: rota.nome,
        qtdeCodigo: rota.qtdeCodigo,
        qtdeLojas: rota.qtdeLojas,
        responsavel: rota.responsavel || '',
        supervisor: rota.supervisor || '',
        gerente: rota.gerente || ''
      });
    }
  }, [rota]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!form.codigo || !form.nome) {
        toast.error('Por favor, preencha todos os campos obrigatórios');
        return;
      }

      if (rota) {
        updateRota({ ...form, id: rota.id });
        toast.success('Rota atualizada com sucesso!');
      } else {
        addRota({ ...form, id: uuidv4() });
        toast.success('Rota cadastrada com sucesso!');
      }
      onClose();
    } catch (error) {
      console.error('Erro ao salvar rota:', error);
      toast.error('Erro ao salvar rota');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{rota ? 'Editar Rota' : 'Nova Rota'}</h2>
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

        <FormField
          label="Quantidade de Códigos"
          name="qtdeCodigo"
          type="number"
          value={form.qtdeCodigo}
          onChange={handleChange}
        />

        <FormField
          label="Quantidade de Lojas"
          name="qtdeLojas"
          type="number"
          value={form.qtdeLojas}
          onChange={handleChange}
        />
        
        <FormField
          label="Responsável"
          name="responsavel"
          value={form.responsavel}
          onChange={handleChange}
        />
        
        <FormField
          label="Supervisor"
          name="supervisor"
          value={form.supervisor}
          onChange={handleChange}
        />
        
        <FormField
          label="Gerente"
          name="gerente"
          value={form.gerente}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end mt-6 space-x-2">
        <Button variant="outline" type="button" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">
          {rota ? 'Atualizar' : 'Cadastrar'}
        </Button>
      </div>
    </form>
  );
};

export default RotaForm;
