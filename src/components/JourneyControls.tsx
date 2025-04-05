
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useApp } from '../context/AppContext';
import { Bike, Car, Bus, Footprints, Play, Square, Minimize, Maximize } from 'lucide-react';
import { TransportMode } from '../types';
import { cn } from '@/lib/utils';

const JourneyControls = () => {
  const { currentJourney, startJourney, endJourney } = useApp();
  const [minimized, setMinimized] = useState(false);
  
  const transportModes: { mode: TransportMode; icon: React.ReactNode; label: string; color: string }[] = [
    { 
      mode: 'walking', 
      icon: <Footprints className="h-5 w-5" />, 
      label: 'Walk',
      color: 'bg-green-100 text-green-700 border-green-200'
    },
    { 
      mode: 'biking', 
      icon: <Bike className="h-5 w-5" />, 
      label: 'Bike',
      color: 'bg-blue-100 text-blue-700 border-blue-200'
    },
    { 
      mode: 'car', 
      icon: <Car className="h-5 w-5" />, 
      label: 'Car',
      color: 'bg-red-100 text-red-700 border-red-200'
    },
    { 
      mode: 'public', 
      icon: <Bus className="h-5 w-5" />, 
      label: 'Public',
      color: 'bg-purple-100 text-purple-700 border-purple-200'
    },
  ];

  if (currentJourney) {
    const activeMode = transportModes.find(m => m.mode === currentJourney.mode);
    
    return (
      <div className="fixed bottom-20 left-0 right-0 p-4 z-10">
        <div className="max-w-md mx-auto bg-background border rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", activeMode?.color)}>
                {activeMode?.icon}
              </div>
              <div className="ml-3">
                <div className="font-medium">{activeMode?.label} Journey</div>
                <div className="text-xs text-muted-foreground">Journey in progress...</div>
              </div>
            </div>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={endJourney}
              className="flex items-center gap-1"
            >
              <Square className="h-4 w-4" />
              End
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  if (minimized) {
    return (
      <div className="fixed bottom-20 left-0 right-0 z-10 flex justify-center">
        <div 
          className="bg-background border rounded-full shadow-lg px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setMinimized(false)}
        >
          <Maximize className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Start Journey</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed bottom-20 left-0 right-0 p-4 z-10">
      <div className="max-w-md mx-auto bg-background border rounded-lg p-4 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Start a new journey</h3>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setMinimized(true)}
          >
            <Minimize className="h-4 w-4" />
            <span className="sr-only">Minimize</span>
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {transportModes.map((transport) => (
            <Button
              key={transport.mode}
              variant="outline"
              className={cn("flex flex-col items-center py-3 h-auto", 
                transport.mode === 'car' ? "hover:bg-red-50" : "hover:bg-primary/5"
              )}
              onClick={() => startJourney(transport.mode)}
            >
              {transport.icon}
              <span className="text-xs mt-1">{transport.label}</span>
            </Button>
          ))}
        </div>
        <div className="text-xs text-center mt-2 text-muted-foreground">
          {/* Show appropriate messaging */}
          {transportModes[0].mode === 'walking' 
            ? "Walking and biking earn more points!" 
            : "Select your transportation mode"}
        </div>
      </div>
    </div>
  );
};

export default JourneyControls;
