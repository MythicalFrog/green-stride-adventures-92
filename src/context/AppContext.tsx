
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockUserStats } from '../utils/mockData';
import { UserStats } from '../types';

interface AppContextType {
  userStats: UserStats;
  incrementStats: (points: number, distance: number, carbonSaved: number) => void;
  completeChallenge: (points: number) => void;
  redeemReward: (id: string, points: number) => void;
  resetStats: () => void;
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

  const incrementStats = (points: number, distance: number, carbonSaved: number) => {
    setUserStats((prevStats) => ({
      ...prevStats,
      totalPoints: prevStats.totalPoints + points,
      totalDistance: prevStats.totalDistance + distance,
      totalCarbonSaved: prevStats.totalCarbonSaved + carbonSaved,
      level: calculateLevel(prevStats.totalPoints + points),
      streakDays: prevStats.streakDays,
      activeDays: prevStats.activeDays
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
  };

  const resetStats = () => {
    setUserStats(mockUserStats);
  };

  const calculateLevel = (points: number): number => {
    return Math.floor(points / 500) + 1;
  };

  return (
    <AppContext.Provider value={{
      userStats,
      incrementStats,
      completeChallenge,
      redeemReward,
      resetStats
    }}>
      {children}
    </AppContext.Provider>
  );
};
