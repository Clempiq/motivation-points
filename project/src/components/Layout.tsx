import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ListTodo, Gift } from 'lucide-react';
import AppHeader from './AppHeader';

interface LayoutProps {
  points: number;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ points, children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      <AppHeader points={points} />
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex space-x-4">
            <Link
              to="/taches"
              className={`flex items-center px-3 py-2 text-sm font-medium ${
                location.pathname === '/taches'
                  ? 'text-violet-600 border-b-2 border-violet-600'
                  : 'text-gray-500 hover:text-violet-600'
              }`}
            >
              <ListTodo size={18} className="mr-1" />
              Tâches
            </Link>
            <Link
              to="/recompenses"
              className={`flex items-center px-3 py-2 text-sm font-medium ${
                location.pathname === '/recompenses'
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-500 hover:text-teal-600'
              }`}
            >
              <Gift size={18} className="mr-1" />
              Récompenses
            </Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto pt-6 pb-16 px-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;