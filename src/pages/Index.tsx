
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from '../context/AppContext';
import { formatDistance, formatCO2 } from '../utils/formatters';
import { Leaf, Award, Gauge, Flame, CalendarCheck, Trophy } from 'lucide-react';
import EarthVisualization from '../components/EarthVisualization';

const Index = () => {
  const { userStats } = useApp();
  
  const getNextLevelPoints = () => {
    return userStats.level * 500;
  };
  
  const progressToNextLevel = () => {
    const nextLevelPoints = getNextLevelPoints();
    return (userStats.totalPoints / nextLevelPoints) * 100;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col md:flex-row items-center mb-8 text-center md:text-left">
        <div className="flex flex-shrink-0 items-center justify-center w-20 h-20 md:w-24 md:h-24 mr-0 md:mr-6 mb-4 md:mb-0 bg-primary/10 rounded-full overflow-hidden">
          <span className="text-primary text-4xl md:text-5xl">🌍</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-2">Green Stride Adventures</h1>
          <p className="text-muted-foreground mb-4 max-w-md">Make green choices, track your impact, earn rewards</p>
          
          {/* Level progress */}
          <div className="w-full max-w-md bg-muted rounded-full px-4 py-2 flex flex-col mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">Level {userStats.level}</span>
              <span className="text-muted-foreground">{userStats.totalPoints}/{getNextLevelPoints()} XP</span>
            </div>
            <div className="w-full h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${progressToNextLevel()}%` }}
              ></div>
            </div>
          </div>
          
          {/* Streak display */}
          <div className="flex items-center">
            <div className="flex items-center bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
              <Flame className="h-4 w-4 mr-1 text-amber-500" />
              <span className="font-medium">{userStats.streakDays} day streak</span>
            </div>
            <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full ml-2">
              <CalendarCheck className="h-4 w-4 mr-1 text-green-500" />
              <span className="font-medium">Active today</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative w-full h-64 mb-8 rounded-2xl overflow-hidden border border-muted">
        <EarthVisualization />
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-background/40 backdrop-blur-sm">
          <div className="grid grid-cols-3 gap-4 w-full max-w-md px-4">
            <div className="flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm p-3 rounded-lg border border-muted shadow-sm">
              <Leaf className="h-5 w-5 text-eco-green mb-1" />
              <div className="font-bold text-base">{formatCO2(userStats.totalCarbonSaved)}</div>
              <div className="text-xs text-muted-foreground">CO₂ Saved</div>
            </div>
            <div className="flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm p-3 rounded-lg border border-muted shadow-sm">
              <Gauge className="h-5 w-5 text-eco-sky mb-1" />
              <div className="font-bold text-base">{formatDistance(userStats.totalDistance)}</div>
              <div className="text-xs text-muted-foreground">Distance</div>
            </div>
            <div className="flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm p-3 rounded-lg border border-muted shadow-sm">
              <Award className="h-5 w-5 text-yellow-500 mb-1" />
              <div className="font-bold text-base">{userStats.totalPoints}</div>
              <div className="text-xs text-muted-foreground">Points</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-muted bg-gradient-to-br from-background to-muted/50">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-primary/10">
                <Gauge className="h-5 w-5 text-primary" />
              </div>
              <h3 className="ml-2 font-semibold">Recent Activity</h3>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-background rounded-lg">
                <div className="flex items-center">
                  <div className="p-1.5 rounded-full bg-green-100">
                    <Leaf className="h-3 w-3 text-green-600" />
                  </div>
                  <span className="ml-2 text-sm">Walk to park</span>
                </div>
                <span className="text-xs text-muted-foreground">2.1 km</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-background rounded-lg">
                <div className="flex items-center">
                  <div className="p-1.5 rounded-full bg-blue-100">
                    <Gauge className="h-3 w-3 text-blue-600" />
                  </div>
                  <span className="ml-2 text-sm">Bike to store</span>
                </div>
                <span className="text-xs text-muted-foreground">3.5 km</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-muted bg-gradient-to-br from-background to-muted/50">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-primary/10">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <h3 className="ml-2 font-semibold">Current Challenges</h3>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-background rounded-lg">
                <div className="flex items-center">
                  <div className="p-1.5 rounded-full bg-amber-100">
                    <Award className="h-3 w-3 text-amber-600" />
                  </div>
                  <span className="ml-2 text-sm">Weekend Walker</span>
                </div>
                <span className="text-xs text-primary">25 pts</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-background rounded-lg">
                <div className="flex items-center">
                  <div className="p-1.5 rounded-full bg-purple-100">
                    <Flame className="h-3 w-3 text-purple-600" />
                  </div>
                  <span className="ml-2 text-sm">7-Day Streak</span>
                </div>
                <span className="text-xs text-primary">50 pts</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
