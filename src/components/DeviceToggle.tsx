
import React from 'react';
import { Button } from '@/components/ui/button';
import { Smartphone, Laptop } from 'lucide-react';
import { useDevice } from '../context/DeviceContext';
import { useIsMobile } from '@/hooks/use-mobile';

const DeviceToggle = () => {
  const { deviceType, toggleDeviceType } = useDevice();
  const isMobile = useIsMobile();
  
  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-36 right-4 z-50 rounded-full h-10 w-10 border border-primary/20 bg-background/80 backdrop-blur-sm"
      onClick={toggleDeviceType}
      aria-label="Toggle device view"
    >
      {deviceType === 'laptop' ? (
        <Smartphone className="h-4 w-4" />
      ) : (
        <Laptop className="h-4 w-4" />
      )}
    </Button>
  );
};

export default DeviceToggle;
