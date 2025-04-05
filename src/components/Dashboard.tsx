
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useApp } from '../context/AppContext';
import { formatDistance, formatCO2 } from '../utils/formatters';
import { Leaf, Award, Gauge } from 'lucide-react';
import StatsCard from './StatsCard';
import JourneyList from './JourneyList';
import ChallengeList from './ChallengeList';

const Dashboard = () => {
  const { userStats, challenges } = useApp();
  
  const activeChallenges = challenges.filter(c => !c.completed).slice(0, 3);
  
  const getNextLevelPoints = () => {
    return userStats.level * 500;
  };
  
  const progressToNextLevel = () => {
    const nextLevelPoints = getNextLevelPoints();
    return (userStats.totalPoints / nextLevelPoints) * 100;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">EcoQuests</h1>
          <p className="text-muted-foreground">Track your eco-friendly journeys and earn rewards</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center bg-transparent rounded-full px-4 py-1 border border-primary/20">
          <div className="mr-2 text-primary font-semibold">Level {userStats.level}</div>
          <div className="w-32 h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary" 
              style={{ width: `${progressToNextLevel()}%` }}
            ></div>
          </div>
          <div className="ml-2 text-xs text-muted-foreground">
            {userStats.totalPoints}/{getNextLevelPoints()} XP
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard 
          icon={<Leaf className="h-5 w-5 text-eco-green" />}
          title="Carbon Saved"
          value={formatCO2(userStats.totalCarbonSaved)}
          description="Total CO₂ emissions prevented"
          className="bg-transparent backdrop-blur-sm"
        />
        
        <StatsCard 
          icon={<Gauge className="h-5 w-5 text-eco-sky" />} 
          title="Distance Traveled"
          value={formatDistance(userStats.totalDistance)}
          description="Total eco-friendly distance"
          className="bg-transparent backdrop-blur-sm"
        />
        
        <StatsCard 
          icon={<Award className="h-5 w-5 text-yellow-500" />}
          title="Points Earned"
          value={userStats.totalPoints.toString()}
          description={`Day streak: ${userStats.streakDays}`}
          className="bg-transparent backdrop-blur-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-transparent backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recent Journeys</CardTitle>
            <CardDescription>Your eco-friendly trips</CardDescription>
          </CardHeader>
          <CardContent>
            <JourneyList limit={5} />
          </CardContent>
        </Card>
        
        <Card className="bg-transparent backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Active Challenges</CardTitle>
              <CardDescription>Complete these for bonus points</CardDescription>
            </div>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <ChallengeList challenges={activeChallenges} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
