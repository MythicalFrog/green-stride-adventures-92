
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockUserStats, generateMockJourneys, generateMockChallenges } from '../utils/mockData';
import { UserStats, Journey, Challenge, TransportMode } from '../types';
import { toast } from '@/components/ui/use-toast';
import confetti from 'canvas-confetti';

interface AppContextType {
  userStats: UserStats;
  journeys: Journey[];
  challenges: Challenge[];
  currentJourney: Journey | null;
  incrementStats: (points: number, distance: number, carbonSaved: number) => void;
  completeChallenge: (points: number) => void;
  redeemReward: (id: string, points: number) => void;
  resetStats: () => void;
  startJourney: (mode: TransportMode) => void;
  endJourney: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [userStats, setUserStats] = useState<UserStats>(mockUserStats);
  const [journeys, setJourneys] = useState<Journey[]>(generateMockJourneys());
  const [challenges, setChallenges] = useState<Challenge[]>(generateMockChallenges());
  const [currentJourney, setCurrentJourney] = useState<Journey | null>(null);

  const incrementStats = (points: number, distance: number, carbonSaved: number) => {
    setUserStats((prevStats) => ({
      ...prevStats,
      totalPoints: prevStats.totalPoints + points,
      totalDistance: prevStats.totalDistance + distance,
      totalCarbonSaved: prevStats.totalCarbonSaved + carbonSaved,
      level: calculateLevel(prevStats.totalPoints + points)
    }));
  };

  const completeChallenge = (points: number) => {
    setUserStats((prevStats) => ({
      ...prevStats,
      totalPoints: prevStats.totalPoints + points,
      level: calculateLevel(prevStats.totalPoints + points),
    }));
  };

  const redeemReward = (id: string, pointsCost: number) => {
    setUserStats((prevStats) => ({
      ...prevStats,
      totalPoints: prevStats.totalPoints - pointsCost,
      redeemedRewards: [...prevStats.redeemedRewards, id]
    }));
    
    // Display success message and confetti
    toast({
      title: "Reward Redeemed!",
      description: "Congratulations on helping save the planet!",
    });
    
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const resetStats = () => {
    setUserStats(mockUserStats);
  };

  const calculateLevel = (points: number): number => {
    return Math.floor(points / 500) + 1;
  };

  const startJourney = (mode: TransportMode) => {
    const now = new Date();
    const newJourney: Journey = {
      id: `journey-${Date.now()}`,
      mode,
      startTime: now.toISOString(),
      endTime: '',
      distance: 0,
      carbonSaved: 0,
      points: 0,
      completed: false,
      startLocation: {
        lat: 40.7128 + (Math.random() * 0.02 - 0.01),
        lng: -74.0060 + (Math.random() * 0.02 - 0.01),
      },
      endLocation: {
        lat: 0,
        lng: 0,
      }
    };
    
    setCurrentJourney(newJourney);
    toast({
      title: `${mode.charAt(0).toUpperCase() + mode.slice(1)} Journey Started`,
      description: "We're tracking your eco-friendly trip!",
    });
  };

  const endJourney = () => {
    if (!currentJourney) return;
    
    const now = new Date();
    const startTime = new Date(currentJourney.startTime);
    const durationMs = now.getTime() - startTime.getTime();
    const durationMinutes = durationMs / (1000 * 60);
    
    // Calculate simulated distance based on duration and mode
    const speed = currentJourney.mode === 'walking' ? 5 : // km/h
                 currentJourney.mode === 'biking' ? 15 :
                 currentJourney.mode === 'public' ? 25 : 40; // car
    
    const distanceKm = (speed * durationMinutes) / 60;
    const distanceM = Math.round(distanceKm * 1000);
    
    // Calculate carbon saved (kg) - rough estimate
    // Only non-car modes save carbon
    const carbonSaved = currentJourney.mode !== 'car' ? distanceKm * 0.12 : 0;
    
    // Calculate points - FIXED: ensure walking, biking, and public transport earn points
    let points = 0;
    if (currentJourney.mode === 'walking') {
      points = Math.max(5, Math.floor(distanceM / 100)); // Min 5 points for walking
    } else if (currentJourney.mode === 'biking') {
      points = Math.max(3, Math.floor(distanceM / 200)); // Min 3 points for biking
    } else if (currentJourney.mode === 'public') {
      points = Math.max(2, Math.floor(distanceM / 300)); // Min 2 points for public transit
    }
    // Car journeys earn 0 points (no change needed)
    
    const completedJourney: Journey = {
      ...currentJourney,
      endTime: now.toISOString(),
      distance: distanceM,
      carbonSaved,
      points,
      completed: true,
      endLocation: {
        lat: 40.7128 + (Math.random() * 0.02 - 0.01),
        lng: -74.0060 + (Math.random() * 0.02 - 0.01),
      }
    };
    
    // Update journeys list
    setJourneys(prev => [completedJourney, ...prev]);
    
    // Update stats
    incrementStats(points, distanceM, carbonSaved);
    
    // Reset current journey
    setCurrentJourney(null);
    
    // Give feedback to the user with more detail about their journey
    toast({
      title: "Journey Completed!",
      description: `You earned ${points} points, traveled ${(distanceM/1000).toFixed(2)}km, and saved ${carbonSaved.toFixed(2)}kg of CO2!`,
    });
    
    // Add confetti for non-car journeys to celebrate eco-friendly travel
    if (currentJourney.mode !== 'car' && points > 0) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <AppContext.Provider value={{
      userStats,
      journeys,
      challenges,
      currentJourney,
      incrementStats,
      completeChallenge,
      redeemReward,
      resetStats,
      startJourney,
      endJourney
    }}>
      {children}
    </AppContext.Provider>
  );
};
