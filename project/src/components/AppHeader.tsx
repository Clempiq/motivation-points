import React from 'react';
import { Sparkles } from 'lucide-react';

interface AppHeaderProps {
  points: number;
}

const AppHeader: React.FC<AppHeaderProps> = ({ points }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-violet-600 to-purple-700 text-white p-4 shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold flex items-center">
          <Sparkles className="mr-2" size={20} />
          Motivation Points
        </h1>
        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
          <span className="font-medium">Points: </span>
          <span className="ml-2 font-bold text-xl">{points}</span>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;