
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navigation from './Navigation';
import JourneyControls from './JourneyControls';
import ThemeToggle from './ThemeToggle';
import DeviceToggle from './DeviceToggle';
import { AppProvider } from '../context/AppContext';
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Medal, Info } from "lucide-react";
import confetti from '../utils/confetti';

const Layout = () => {
  return (
    <AppProvider>
      <div className="min-h-screen pb-20 dark:bg-gray-900 transition-colors duration-300">
        <Outlet />
        
        {/* Theme toggle button (first) */}
        <ThemeToggle />
        
        {/* Device toggle button (second) */}
        <DeviceToggle />
        
        {/* Leaderboard button (third) */}
        <Link to="/leaderboard">
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-48 right-4 z-50 rounded-full h-10 w-10 border border-primary/20 bg-background/80 backdrop-blur-sm"
            aria-label="Leaderboard page"
          >
            <Medal className="h-4 w-4" />
          </Button>
        </Link>
        
        {/* About button (fourth) */}
        <Link to="/about">
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-36 right-4 z-50 rounded-full h-10 w-10 border border-primary/20 bg-background/80 backdrop-blur-sm"
            aria-label="About page"
          >
            <Info className="h-4 w-4" />
          </Button>
        </Link>
        
        <JourneyControls />
        <Navigation />
        <Toaster />
      </div>
    </AppProvider>
  );
};

export default Layout;
