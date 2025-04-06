
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import JourneyControls from './JourneyControls';
import ThemeToggle from './ThemeToggle';
import DeviceToggle from './DeviceToggle';
import { AppProvider } from '../context/AppContext';
import { Toaster } from "@/components/ui/toaster";

const Layout = () => {
  return (
    <AppProvider>
      <div className="min-h-screen pb-20 dark:bg-gray-900 transition-colors duration-300">
        <Outlet />
        <JourneyControls />
        <DeviceToggle />
        <ThemeToggle />
        <Navigation />
        <Toaster />
      </div>
    </AppProvider>
  );
};

export default Layout;
