
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navigation from './Navigation';
import JourneyControls from './JourneyControls';
import ThemeToggle from './ThemeToggle';
import DeviceToggle from './DeviceToggle';
import { AppProvider } from '../context/AppContext';
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Medal, Info, Sparkles } from "lucide-react";

const Layout = () => {
  const handleSparklesClick = () => {
    // Create and configure confetti
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];
    
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { x: 0.1, y: 0.5 },
          colors: colors
        });
      }, i * 200);
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen pb-20 dark:bg-gray-900 transition-colors duration-300">
        <Outlet />
        
        {/* Sparkles button */}
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-72 left-4 z-50 rounded-full h-10 w-10 border border-primary/20 bg-background/80 backdrop-blur-sm"
          aria-label="Sparkles effect"
          onClick={handleSparklesClick}
        >
          <Sparkles className="h-4 w-4" />
        </Button>
        
        {/* Theme toggle button */}
        <ThemeToggle />
        
        {/* Device toggle button */}
        <DeviceToggle />
        
        {/* Leaderboard button */}
        <Link to="/leaderboard">
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-48 left-4 z-50 rounded-full h-10 w-10 border border-primary/20 bg-background/80 backdrop-blur-sm"
            aria-label="Leaderboard page"
          >
            <Medal className="h-4 w-4" />
          </Button>
        </Link>
        
        {/* About button */}
        <Link to="/about">
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-36 left-4 z-50 rounded-full h-10 w-10 border border-primary/20 bg-background/80 backdrop-blur-sm"
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
