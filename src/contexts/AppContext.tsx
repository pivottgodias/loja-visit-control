
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Promotor, Rota, Loja, Visita } from '../types/types';
import * as storageService from '../services/storageService';

interface AppContextType {
  promotores: Promotor[];
  rotas: Rota[];
  lojas: Loja[];
  visitas: Visita[];
  addPromotor: (promotor: Promotor) => void;
  updatePromotor: (promotor: Promotor) => void;
  deletePromotor: (id: string) => void;
  addRota: (rota: Rota) => void;
  updateRota: (rota: Rota) => void;
  deleteRota: (id: string) => void;
  addLoja: (loja: Loja) => void;
  updateLoja: (loja: Loja) => void;
  deleteLoja: (id: string) => void;
  addVisita: (visita: Visita) => void;
  updateVisita: (visita: Visita) => void;
  deleteVisita: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [promotores, setPromotores] = useState<Promotor[]>([]);
  const [rotas, setRotas] = useState<Rota[]>([]);
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [visitas, setVisitas] = useState<Visita[]>([]);

  // Inicializar dados do localStorage
  useEffect(() => {
    // Primeiro tenta carregar dados existentes
    const loadData = () => {
      setPromotores(storageService.getPromotores());
      setRotas(storageService.getRotas());
      setLojas(storageService.getLojas());
      setVisitas(storageService.getVisitas());
    };
    
    loadData();
    
    // Se não existe dados, importar os exemplos
    if (promotores.length === 0 && rotas.length === 0 && lojas.length === 0 && visitas.length === 0) {
      storageService.importarDadosExemplo();
      loadData();
    }
  }, []);

  // Funções para adicionar, atualizar e excluir
  const addPromotor = (promotor: Promotor) => {
    storageService.addPromotor(promotor);
    setPromotores(storageService.getPromotores());
  };

  const updatePromotor = (promotor: Promotor) => {
    storageService.updatePromotor(promotor);
    setPromotores(storageService.getPromotores());
  };

  const deletePromotor = (id: string) => {
    storageService.deletePromotor(id);
    setPromotores(storageService.getPromotores());
  };

  const addRota = (rota: Rota) => {
    storageService.addRota(rota);
    setRotas(storageService.getRotas());
  };

  const updateRota = (rota: Rota) => {
    storageService.updateRota(rota);
    setRotas(storageService.getRotas());
  };

  const deleteRota = (id: string) => {
    storageService.deleteRota(id);
    setRotas(storageService.getRotas());
  };

  const addLoja = (loja: Loja) => {
    storageService.addLoja(loja);
    setLojas(storageService.getLojas());
  };

  const updateLoja = (loja: Loja) => {
    storageService.updateLoja(loja);
    setLojas(storageService.getLojas());
  };

  const deleteLoja = (id: string) => {
    storageService.deleteLoja(id);
    setLojas(storageService.getLojas());
  };

  const addVisita = (visita: Visita) => {
    storageService.addVisita(visita);
    setVisitas(storageService.getVisitas());
  };

  const updateVisita = (visita: Visita) => {
    storageService.updateVisita(visita);
    setVisitas(storageService.getVisitas());
  };

  const deleteVisita = (id: string) => {
    storageService.deleteVisita(id);
    setVisitas(storageService.getVisitas());
  };

  return (
    <AppContext.Provider
      value={{
        promotores,
        rotas,
        lojas,
        visitas,
        addPromotor,
        updatePromotor,
        deletePromotor,
        addRota,
        updateRota,
        deleteRota,
        addLoja,
        updateLoja,
        deleteLoja,
        addVisita,
        updateVisita,
        deleteVisita,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
