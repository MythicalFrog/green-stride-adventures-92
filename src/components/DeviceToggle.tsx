
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Laptop, Smartphone } from 'lucide-react';

const DeviceToggle = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    // Check if there's a saved preference
    const savedPreference = localStorage.getItem('devicePreference');
    if (savedPreference) {
      setIsMobileView(savedPreference === 'mobile');
      applyViewportMeta(savedPreference === 'mobile');
    }
  }, []);

  const toggleDeviceView = () => {
    const newView = !isMobileView;
    setIsMobileView(newView);
    
    // Save preference to localStorage
    localStorage.setItem('devicePreference', newView ? 'mobile' : 'desktop');
    
    // Apply viewport changes
    applyViewportMeta(newView);
  };

  const applyViewportMeta = (isMobile: boolean) => {
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      if (isMobile) {
        viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        document.documentElement.style.maxWidth = '480px';
        document.documentElement.style.margin = '0 auto';
        document.documentElement.style.border = '1px solid var(--border)';
        document.documentElement.style.borderRadius = '20px';
        document.documentElement.style.height = '90vh';
        document.documentElement.style.overflow = 'auto';
        document.documentElement.style.marginTop = '2rem';
        document.documentElement.style.marginBottom = '2rem';
      } else {
        viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0');
        document.documentElement.style.maxWidth = '';
        document.documentElement.style.margin = '';
        document.documentElement.style.border = '';
        document.documentElement.style.borderRadius = '';
        document.documentElement.style.height = '';
        document.documentElement.style.overflow = '';
        document.documentElement.style.marginTop = '';
        document.documentElement.style.marginBottom = '';
      }
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleDeviceView}
      className="fixed top-4 right-4 z-50 rounded-full h-10 w-10 border border-primary/20 bg-background/80 backdrop-blur-sm"
      aria-label="Toggle device view"
    >
      {isMobileView ? <Laptop className="h-4 w-4" /> : <Smartphone className="h-4 w-4" />}
    </Button>
  );
};

export default DeviceToggle;
