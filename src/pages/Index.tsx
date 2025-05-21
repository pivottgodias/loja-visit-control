
import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Users, Store, Map, MapPin } from 'lucide-react';

const Index = () => {
  const { promotores, lojas, rotas, visitas } = useAppContext();

  // Contadores por tipo de promotor
  const promotoresProprios = promotores.filter(p => p.tipo === 'PRÓPRIO').length;
  const promotoresTerceiros = promotores.filter(p => p.tipo === 'TERCEIRO').length;

  // Contadores por estado
  const lojasPorEstado = lojas.reduce((acc, loja) => {
    acc[loja.estado] = (acc[loja.estado] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Total do faturamento
  const totalFaturamento = visitas.reduce((acc, visita) => {
    return acc + Object.values(visita.faturamentoMensal).reduce((sum, val) => sum + val, 0);
  }, 0);

  const statCards = [
    {
      title: 'Promotores',
      value: promotores.length,
      description: `${promotoresProprios} próprios, ${promotoresTerceiros} terceiros`,
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      link: '/promotores'
    },
    {
      title: 'Lojas',
      value: lojas.length,
      description: `Em ${Object.keys(lojasPorEstado).length} estados`,
      icon: Store,
      color: 'bg-green-100 text-green-600',
      link: '/lojas'
    },
    {
      title: 'Rotas',
      value: rotas.length,
      description: 'Cadastradas no sistema',
      icon: Map,
      color: 'bg-amber-100 text-amber-600',
      link: '/rotas'
    },
    {
      title: 'Visitas',
      value: visitas.length,
      description: 'Programadas',
      icon: MapPin,
      color: 'bg-purple-100 text-purple-600',
      link: '/visitas'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Painel de Controle</h1>
        <p className="text-gray-600 mt-1">
          Seja bem-vindo ao sistema de controle de visitas de lojas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <Link to={card.link} key={index}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                  <div className={`p-2 rounded-full ${card.color}`}>
                    <card.icon size={20} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{card.value}</p>
                <CardDescription>{card.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Faturamento Total</CardTitle>
            <CardDescription>Soma do faturamento de todas as visitas</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {totalFaturamento.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Distribuição das Lojas</CardTitle>
            <CardDescription>Por estado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(lojasPorEstado).map(([estado, quantidade]) => (
                <div key={estado} className="flex items-center">
                  <span className="font-medium w-12">{estado}:</span>
                  <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500" 
                      style={{ width: `${(quantidade / lojas.length) * 100}%` }}
                    />
                  </div>
                  <span className="ml-2 text-sm">{quantidade}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
