import React from 'react';
import { Button } from '@/components/ui/button';
import { useApp } from '../context/AppContext';
import { Challenge } from '../types';
import { formatDistance } from '../utils/formatters';
import { MapPin, Bike, Car, Bus, Footprints } from 'lucide-react';

interface ChallengeListProps {
  challenges: Challenge[];
}

const ChallengeList = ({ challenges }: ChallengeListProps) => {
  const { completeChallenge } = useApp();
  
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

  if (challenges.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No active challenges at the moment. Check back later!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {challenges.map((challenge) => (
        <div key={challenge.id} className="p-3 border rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 
                ${challenge.mode === 'walking' ? 'bg-green-100 text-green-700' : 
                  challenge.mode === 'biking' ? 'bg-blue-100 text-blue-700' : 
                  challenge.mode === 'car' ? 'bg-red-100 text-red-700' : 
                  'bg-purple-100 text-purple-700'}`}>
                {getIcon(challenge.mode)}
              </div>
              <div>
                <div className="font-medium">{challenge.title}</div>
                <div className="text-xs text-muted-foreground flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {challenge.location?.name || "Location unknown"}
                  <span className="mx-1">•</span>
                  {formatDistance(Number(challenge.distance))}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-primary">+{challenge.points} pts</div>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-1"
                onClick={() => completeChallenge(challenge.id)}
              >
                Complete
              </Button>
            </div>
          </div>
          <div className="mt-2 text-sm">
            {challenge.description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChallengeList;
