
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Map, BarChart2, Award, Info, Trophy } from 'lucide-react';
import { useDevice } from '../context/DeviceContext';

const Navigation = () => {
  const { deviceType } = useDevice();
  
  const navItems = [
    { to: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { to: '/journey', label: 'Journey', icon: <Compass className="w-5 h-5" /> },
    { to: '/map', label: 'Map', icon: <Map className="w-5 h-5" /> },
    { to: '/stats', label: 'Stats', icon: <BarChart2 className="w-5 h-5" /> },
    { to: '/rewards', label: 'Rewards', icon: <Award className="w-5 h-5" /> },
    { to: '/leaderboard', label: 'Leaderboard', icon: <Trophy className="w-5 h-5" /> },
    { to: '/about', label: 'About', icon: <Info className="w-5 h-5" /> },
  ];

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-muted-foreground/10 backdrop-blur-md ${deviceType === 'phone' ? 'px-2' : ''}`}>
      <div className="container mx-auto flex justify-between items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-lg ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
