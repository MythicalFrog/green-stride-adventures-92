
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Journey, Challenge, UserStats, TransportMode } from '../types';
import { toast } from '../components/ui/use-toast';
import { generateMockChallenges, generateMockJourneys } from '../utils/mockData';

interface AppContextType {
  currentJourney: Journey | null;
  journeys: Journey[];
  challenges: Challenge[];
  userStats: UserStats;
  startJourney: (mode: TransportMode) => void;
  endJourney: () => void;
  completeChallenge: (challengeId: string) => void;
}

const initialUserStats: UserStats = {
  totalDistance: 0,
  totalCarbonSaved: 0,
  totalPoints: 0,
  streakDays: 1,
  achievements: [
    {
      id: 'first-steps',
      title: 'First Steps',
      description: 'Start your first journey',
      icon: 'trophy',
      unlocked: false,
    },
    {
      id: 'carbon-saver',
      title: 'Carbon Saver',
      description: 'Save 5kg of CO2',
      icon: 'leaf',
      unlocked: false,
    }
  ],
  level: 1,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentJourney, setCurrentJourney] = useState<Journey | null>(null);
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [userStats, setUserStats] = useState<UserStats>(initialUserStats);

  useEffect(() => {
    // Load mock data on initial mount
    const mockJourneys = generateMockJourneys();
    const mockChallenges = generateMockChallenges();
    
    setJourneys(mockJourneys);
    setChallenges(mockChallenges);
    
    // Calculate initial stats based on mock journeys
    const stats = mockJourneys.reduce((acc, journey) => {
      if (journey.completed) {
        acc.totalDistance += journey.distance;
        acc.totalCarbonSaved += journey.carbonSaved;
        acc.totalPoints += journey.points;
      }
      return acc;
    }, {
      ...initialUserStats,
      totalDistance: 0,
      totalCarbonSaved: 0,
      totalPoints: 0,
    });
    
    // Update achievements based on stats
    if (stats.totalCarbonSaved >= 5) {
      stats.achievements = stats.achievements.map(achievement => 
        achievement.id === 'carbon-saver' 
          ? { ...achievement, unlocked: true, unlockedAt: new Date().toISOString() }
          : achievement
      );
    }
    
    setUserStats(stats);
  }, []);

  const calculateCarbonSaved = (mode: TransportMode, distance: number): number => {
    // Simplified calculation:
    // - Car: 120g CO2 per km
    // - Walking/Biking: 0g CO2 per km (but saves compared to driving)
    const carEmissionPerKm = 0.12; // kg CO2 per km
    
    switch (mode) {
      case 'walking':
      case 'biking':
        // Carbon saved compared to driving the same distance
        return (distance / 1000) * carEmissionPerKm;
      case 'car':
        // No carbon saved when driving
        return 0;
      case 'public':
        // Public transport saves some carbon compared to driving
        return (distance / 1000) * carEmissionPerKm * 0.6;
      default:
        return 0;
    }
  };
  
  const calculatePoints = (mode: TransportMode, distance: number): number => {
    // Points system based on mode and distance
    switch (mode) {
      case 'walking':
        return Math.floor(distance / 100); // 1 point per 100m walked
      case 'biking':
        return Math.floor(distance / 200); // 1 point per 200m biked
      case 'car':
        return 0; // No points for driving
      case 'public':
        return Math.floor(distance / 300); // 1 point per 300m of public transport
      default:
        return 0;
    }
  };

  const startJourney = (mode: TransportMode) => {
    if (currentJourney) {
      toast({
        title: "Journey already in progress",
        description: "Please end your current journey before starting a new one.",
        variant: "destructive"
      });
      return;
    }

    const newJourney: Journey = {
      id: `journey-${Date.now()}`,
      mode,
      startTime: new Date().toISOString(),
      distance: 0,
      carbonSaved: 0,
      points: 0,
      completed: false,
      startLocation: {
        lat: 40.7128,  // Example: New York coordinates
        lng: -74.0060,
      }
    };

    setCurrentJourney(newJourney);
    toast({
      title: `${mode.charAt(0).toUpperCase() + mode.slice(1)} journey started`,
      description: "Your eco-friendly journey is now being tracked!",
    });
  };

  const endJourney = () => {
    if (!currentJourney) {
      toast({
        title: "No journey in progress",
        description: "Please start a journey before ending one.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, we'd calculate the actual distance traveled
    // For this demo, we'll use a random distance between 500m and 5km
    const distance = Math.floor(Math.random() * 4500) + 500;
    
    const carbonSaved = calculateCarbonSaved(currentJourney.mode, distance);
    const points = calculatePoints(currentJourney.mode, distance);
    
    const completedJourney: Journey = {
      ...currentJourney,
      endTime: new Date().toISOString(),
      distance,
      carbonSaved,
      points,
      completed: true,
      endLocation: {
        lat: currentJourney.startLocation?.lat || 0 + (Math.random() * 0.01),
        lng: currentJourney.startLocation?.lng || 0 + (Math.random() * 0.01),
      }
    };

    setJourneys(prev => [completedJourney, ...prev]);
    setCurrentJourney(null);

    // Update user stats
    setUserStats(prev => {
      const updated = {
        ...prev,
        totalDistance: prev.totalDistance + distance,
        totalCarbonSaved: prev.totalCarbonSaved + carbonSaved,
        totalPoints: prev.totalPoints + points,
      };
      
      // Check for achievements
      const updatedAchievements = [...prev.achievements];
      
      // First steps achievement
      if (!updatedAchievements.find(a => a.id === 'first-steps')?.unlocked) {
        updatedAchievements.forEach((achievement, index) => {
          if (achievement.id === 'first-steps') {
            updatedAchievements[index] = {
              ...achievement,
              unlocked: true,
              unlockedAt: new Date().toISOString()
            };
            
            toast({
              title: "Achievement Unlocked!",
              description: "First Steps: Start your first journey",
            });
          }
        });
      }
      
      // Carbon saver achievement
      if (!updatedAchievements.find(a => a.id === 'carbon-saver')?.unlocked && 
          updated.totalCarbonSaved >= 5) {
        updatedAchievements.forEach((achievement, index) => {
          if (achievement.id === 'carbon-saver') {
            updatedAchievements[index] = {
              ...achievement,
              unlocked: true,
              unlockedAt: new Date().toISOString()
            };
            
            toast({
              title: "Achievement Unlocked!",
              description: "Carbon Saver: Save 5kg of CO2",
            });
          }
        });
      }
      
      return {
        ...updated,
        achievements: updatedAchievements
      };
    });

    toast({
      title: "Journey Completed!",
      description: `You earned ${points} points and saved ${carbonSaved.toFixed(2)}kg of CO2.`,
    });
  };

  const completeChallenge = (challengeId: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    
    if (!challenge) {
      toast({
        title: "Challenge not found",
        description: "The challenge you're trying to complete doesn't exist.",
        variant: "destructive"
      });
      return;
    }
    
    if (challenge.completed) {
      toast({
        title: "Challenge already completed",
        description: "You've already completed this challenge.",
        variant: "destructive"
      });
      return;
    }
    
    // Mark challenge as completed
    setChallenges(prev => prev.map(c => 
      c.id === challengeId ? { ...c, completed: true } : c
    ));
    
    // Update user stats
    const carbonSaved = calculateCarbonSaved(challenge.mode, challenge.distance);
    
    setUserStats(prev => ({
      ...prev,
      totalDistance: prev.totalDistance + challenge.distance,
      totalCarbonSaved: prev.totalCarbonSaved + carbonSaved,
      totalPoints: prev.totalPoints + challenge.points,
    }));
    
    toast({
      title: "Challenge Completed!",
      description: `You earned ${challenge.points} points!`,
    });
  };

  return (
    <AppContext.Provider value={{
      currentJourney,
      journeys,
      challenges,
      userStats,
      startJourney,
      endJourney,
      completeChallenge,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
