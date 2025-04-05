
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import JourneyControls from './JourneyControls';
import { AppProvider } from '../context/AppContext';

const Layout = () => {
  return (
    <AppProvider>
      <div className="min-h-screen pb-20">
        <Outlet />
        <JourneyControls />
        <Navigation />
      </div>
    </AppProvider>
  );
};

export default Layout;
