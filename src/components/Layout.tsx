
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
        <div className="fixed bottom-72 right-4 z-50 flex items-center gap-2">
          <span className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border border-primary/20 text-sm">
            Theme
          </span>
          <ThemeToggle />
        </div>
        
        {/* Device toggle button (second) */}
        <div className="fixed bottom-60 right-4 z-50 flex items-center gap-2">
          <span className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border border-primary/20 text-sm">
            Mobile
          </span>
          <DeviceToggle />
        </div>
        
        {/* Leaderboard button (third) */}
        <div className="fixed bottom-48 right-4 z-50 flex items-center gap-2">
          <span className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border border-primary/20 text-sm">
            Leaderboard
          </span>
          <Link to="/leaderboard">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 border border-primary/20 bg-background/80 backdrop-blur-sm"
              aria-label="Leaderboard page"
            >
              <Medal className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        {/* About button (fourth) */}
        <div className="fixed bottom-36 right-4 z-50 flex items-center gap-2">
          <span className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border border-primary/20 text-sm">
            About
          </span>
          <Link to="/about">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 border border-primary/20 bg-background/80 backdrop-blur-sm"
              aria-label="About page"
            >
              <Info className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <JourneyControls />
        <Navigation />
        <Toaster />
      </div>
    </AppProvider>
  );
};

export default Layout;
