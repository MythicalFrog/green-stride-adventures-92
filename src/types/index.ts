
export type TransportMode = 'walking' | 'biking' | 'car' | 'public';

export interface Journey {
  id: string;
  mode: TransportMode;
  startTime: string;
  endTime?: string;
  distance: number; // in meters
  carbonSaved: number; // in kg CO2
  points: number;
  completed: boolean;
  startLocation?: {
    lat: number;
    lng: number;
    name?: string;
  };
  endLocation?: {
    lat: number;
    lng: number;
    name?: string;
  };
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  mode: TransportMode;
  distance: number; // in meters
  points: number;
  deadline?: string;
  completed: boolean;
  location?: {
    lat: number;
    lng: number;
    name: string;
  };
}

export interface UserStats {
  totalDistance: number;
  totalCarbonSaved: number;
  totalPoints: number;
  streakDays: number;
  activeDays: number;
  level: number;
  redeemedRewards: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  unlocked: boolean;
}
