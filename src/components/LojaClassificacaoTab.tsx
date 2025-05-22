
import React, { useState } from 'react';
import { Loja } from '../types/types';
import { classificarLoja } from '../services/classificacaoService';
import { Button } from './ui/button';
import FormField from './FormField';

interface LojaClassificacaoTabProps {
  loja: Loja;
  onUpdateLoja: (updatedLoja: Loja) => void;
}

const LojaClassificacaoTab: React.FC<LojaClassificacaoTabProps> = ({ loja, onUpdateLoja }) => {
  const [mixIdealClassificacao, setMixIdealClassificacao] = useState<"ACIMA" | "MÉDIO" | "ABAIXO">(
    loja.mixIdealClassificacao || "MÉDIO"
  );
  const [selectedBonus, setSelectedBonus] = useState<string[]>([]);
  
  const bonusOptions = [
    { value: "Furioso (2)", label: "Furioso (2)" },
    { value: "Refriko", label: "Refriko" },
    { value: "Moema", label: "Moema" },
    { value: "Bella Roma", label: "Bella Roma" },
    { value: "Mínimo", label: "Mínimo" },
    { value: "Máximo", label: "Máximo" },
  ];
  
  const handleBonusToggle = (bonusName: string) => {
    setSelectedBonus(prev => {
      if (prev.includes(bonusName)) {
        return prev.filter(item => item !== bonusName);
      } else {
        return [...prev, bonusName];
      }
    });
  };
  
  const handleClassificar = () => {
    const lojaClassificada = classificarLoja(loja, mixIdealClassificacao, selectedBonus);
    onUpdateLoja(lojaClassificada);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Classificação da Loja</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tamanho da Loja</label>
          <div className="mt-1 p-2 border rounded-md bg-gray-100">
            {loja.tamanho || "Não definido"}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {loja.tamanho === "P" && "(1 a 4 pontos)"}
            {loja.tamanho === "M" && "(5 a 9 pontos)"}
            {loja.tamanho === "G" && "(10+ pontos)"}
            {loja.tamanho === "CASH" && "(Cash & Carry)"}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">MIX Ideal</label>
          <div className="grid grid-cols-3 gap-2 mt-1">
            {["ACIMA", "MÉDIO", "ABAIXO"].map(option => (
              <Button 
                key={option}
                type="button"
                variant={mixIdealClassificacao === option ? "default" : "outline"}
                onClick={() => setMixIdealClassificacao(option as "ACIMA" | "MÉDIO" | "ABAIXO")}
                className="w-full"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bônus</label>
          <div className="grid grid-cols-3 gap-2">
            {bonusOptions.map(option => (
              <div key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={`bonus-${option.value}`}
                  checked={selectedBonus.includes(option.value)}
                  onChange={() => handleBonusToggle(option.value)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={`bonus-${option.value}`} className="ml-2 text-sm text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Button onClick={handleClassificar} className="w-full">
          Classificar Loja
        </Button>
        
        {loja.pontuacaoFinal && (
          <div className="p-4 border rounded-md bg-gray-50 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Pontos Base:</span>
                <span className="block text-lg font-semibold">{loja.pontos}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">MIX Ideal Pontos:</span>
                <span className="block text-lg font-semibold">{loja.mixIdealPontos}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Bônus Pontos:</span>
                <span className="block text-lg font-semibold">{loja.bonusPontos}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Pontuação Final:</span>
                <span className="block text-lg font-semibold">{loja.pontuacaoFinal}</span>
              </div>
            </div>
            
            <div className="border-t pt-3">
              <h4 className="font-medium mb-2">Recomendação de Visitas</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Horas/Frequência:</span>
                  <span className="block text-lg font-semibold">{loja.horasFrequencia}</span>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-500">Dias Sugeridos:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {loja.diasVisitaSugeridos && Object.entries(loja.diasVisitaSugeridos).map(([dia, checked]) => (
                      checked && (
                        <span 
                          key={dia} 
                          className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full capitalize"
                        >
                          {dia}
                        </span>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LojaClassificacaoTab;
