
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
import ThemeColorPicker from './ThemeColorPicker';
import FlappyBirdGame from './FlappyBirdGame';
import SnakeGame from './SnakeGame';

const Layout = () => {
  return (
    <AppProvider>
      <div className="min-h-screen pb-20 dark:bg-gray-900 transition-colors duration-300">
        <Outlet />
        
        {/* Left side buttons */}
        {/* Theme color picker button (first) */}
        <div className="fixed bottom-72 left-4 z-50 flex items-center gap-2 group">
          <ThemeColorPicker />
          <span className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border border-primary/20 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-2 group-hover:translate-x-0">
            Color Themes
          </span>
        </div>
        
        {/* Flappy Bird game button (second) */}
        <div className="fixed bottom-60 left-4 z-50 flex items-center gap-2 group">
          <FlappyBirdGame />
          <span className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border border-primary/20 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-2 group-hover:translate-x-0">
            Flappy Bird
          </span>
        </div>
        
        {/* Snake game button (third) */}
        <div className="fixed bottom-48 left-4 z-50 flex items-center gap-2 group">
          <SnakeGame />
          <span className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border border-primary/20 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-2 group-hover:translate-x-0">
            Snake Game
          </span>
        </div>
        
        {/* Right side buttons */}
        {/* Theme toggle button (first) */}
        <div className="fixed bottom-72 right-4 z-50 flex items-center gap-2 group">
          <span className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border border-primary/20 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
            Theme
          </span>
          <ThemeToggle />
        </div>
        
        {/* Device toggle button (second) */}
        <div className="fixed bottom-60 right-4 z-50 flex items-center gap-2 group">
          <span className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border border-primary/20 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
            Mobile
          </span>
          <DeviceToggle />
        </div>
        
        {/* Leaderboard button (third) */}
        <div className="fixed bottom-48 right-4 z-50 flex items-center gap-2 group">
          <span className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border border-primary/20 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
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
        <div className="fixed bottom-36 right-4 z-50 flex items-center gap-2 group">
          <span className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border border-primary/20 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
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
