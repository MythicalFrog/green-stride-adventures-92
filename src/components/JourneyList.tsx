
import React from 'react';
import { useApp } from '../context/AppContext';
import { formatDate, formatDistance, formatDuration, formatCO2, getTransportIcon } from '../utils/formatters';
import { Bike, Car, Bus, Footprints } from 'lucide-react';

interface JourneyListProps {
  limit?: number;
}

const JourneyList = ({ limit }: JourneyListProps) => {
  const { journeys } = useApp();
  
  const displayJourneys = limit ? journeys.slice(0, limit) : journeys;
  
  const getIcon = (mode: string) => {
    switch (mode) {
      case 'walking':
        return <Footprints className="h-4 w-4" />;
      case 'biking':
        return <Bike className="h-4 w-4" />;
      case 'car':
        return <Car className="h-4 w-4" />;
      case 'public':
        return <Bus className="h-4 w-4" />;
      default:
        return null;
    }
  };

  if (displayJourneys.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No journeys recorded yet. Start one to track your eco impact!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {displayJourneys.map((journey) => (
        <div key={journey.id} className="p-3 border rounded-lg flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 
            ${journey.mode === 'walking' ? 'bg-green-100 text-green-700' : 
              journey.mode === 'biking' ? 'bg-blue-100 text-blue-700' : 
              journey.mode === 'car' ? 'bg-red-100 text-red-700' : 
              'bg-purple-100 text-purple-700'}`}>
            {getIcon(journey.mode)}
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium capitalize">
                  {journey.mode} Journey
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatDate(journey.startTime)}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  {formatDistance(journey.distance)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatDuration(journey.startTime, journey.endTime)}
                </div>
              </div>
            </div>
            
            <div className="mt-2 flex justify-between text-xs">
              <span className={journey.mode !== 'car' ? "text-green-600" : "text-muted-foreground"}>
                {journey.mode !== 'car' ? `Saved ${formatCO2(journey.carbonSaved)}` : 'No carbon saved'}
              </span>
              <span className="font-medium">
                +{journey.points} points
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JourneyList;
