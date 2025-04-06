
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Leaf, Map, BarChart, Trophy, Compass, Route } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navigation = () => {
  const location = useLocation();
  const { userStats } = useApp();
  
  const navItems = [
    {
      name: 'Journey',
      path: '/journey',
      icon: <Route className="h-5 w-5" />,
    },
    {
      name: 'Home',
      path: '/',
      icon: <Leaf className="h-5 w-5" />,
    },
    {
      name: 'Adventure',
      path: '/adventure',
      icon: <Compass className="h-5 w-5" />,
    },
    {
      name: 'Map',
      path: '/map',
      icon: <Map className="h-5 w-5" />,
    },
    {
      name: 'Stats',
      path: '/stats',
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      name: 'Rewards',
      path: '/rewards',
      icon: <Trophy className="h-5 w-5" />,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t py-2 px-4 z-10 dark:bg-gray-900/80">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={cn(
              "flex flex-col items-center p-2 rounded-md transition-colors",
              location.pathname === item.path 
                ? "text-primary bg-primary/10" 
                : "text-muted-foreground hover:text-foreground hover:bg-background/60",
            )}
          >
            {item.icon}
            {!useApp().userStats?.isPhoneView && <span className="text-xs mt-1">{item.name}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
