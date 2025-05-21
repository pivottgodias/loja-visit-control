
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Users, MapPin, Map } from 'lucide-react';

const navItems = [
  { name: 'Início', path: '/', icon: Home },
  { name: 'Visitas', path: '/visitas', icon: MapPin },
  { name: 'Promotores', path: '/promotores', icon: Users },
  { name: 'Lojas', path: '/lojas', icon: Map },
  { name: 'Rotas', path: '/rotas', icon: Map },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 border-r border-gray-200 fixed h-full">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-600">Controle de Visitas</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center px-4 py-3 text-gray-700 rounded-md transition-colors",
                      isActive ? "bg-blue-100 text-blue-600" : "hover:bg-blue-50"
                    )}
                  >
                    <Icon size={20} className="mr-3" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 ml-64">
        {children}
      </div>
    </div>
  );
};

export default Layout;
