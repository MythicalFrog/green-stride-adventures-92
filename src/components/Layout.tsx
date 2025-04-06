
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import JourneyControls from './JourneyControls';
import ThemeToggle from './ThemeToggle';
import DeviceToggle from './DeviceToggle';
import { AppProvider } from '../context/AppContext';
import { DeviceProvider } from '../context/DeviceContext';

const Layout = () => {
  return (
    <AppProvider>
      <DeviceProvider>
        <div className="min-h-screen pb-20 dark:bg-gray-900 transition-colors duration-300">
          <Outlet />
          <JourneyControls />
          <ThemeToggle />
          <DeviceToggle />
          <Navigation />
        </div>
      </DeviceProvider>
    </AppProvider>
  );
};

export default Layout;
