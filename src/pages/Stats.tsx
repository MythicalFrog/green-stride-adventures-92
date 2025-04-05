
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { formatDistance, formatCO2 } from '../utils/formatters';
import { useApp } from '../context/AppContext';

const StatsPage = () => {
  const { userStats, journeys } = useApp();
  
  // Calculate stats by transport mode
  const transportStats = journeys.reduce((acc, journey) => {
    if (!journey.completed) return acc;
    
    if (!acc[journey.mode]) {
      acc[journey.mode] = {
        count: 0,
        distance: 0,
        carbonSaved: 0,
        points: 0
      };
    }
    
    acc[journey.mode].count += 1;
    acc[journey.mode].distance += journey.distance;
    acc[journey.mode].carbonSaved += journey.carbonSaved;
    acc[journey.mode].points += journey.points;
    
    return acc;
  }, {} as Record<string, { count: number; distance: number; carbonSaved: number; points: number; }>);
  
  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'walking': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'biking': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'car': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      case 'public': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800/50 dark:text-gray-300';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mb-16 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Your Eco Stats</h1>
      
      <Card className="mb-8 bg-transparent backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle>Total Impact</CardTitle>
          <CardDescription>Your overall environmental contribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-lg border border-green-200 bg-transparent backdrop-blur-sm dark:border-green-900">
              <div className="text-sm text-muted-foreground">CO₂ Saved</div>
              <div className="text-xl font-bold text-green-600 dark:text-green-400">{formatCO2(userStats.totalCarbonSaved)}</div>
            </div>
            <div className="p-3 rounded-lg border border-blue-200 bg-transparent backdrop-blur-sm dark:border-blue-900">
              <div className="text-sm text-muted-foreground">Distance</div>
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{formatDistance(userStats.totalDistance)}</div>
            </div>
            <div className="p-3 rounded-lg border border-amber-200 bg-transparent backdrop-blur-sm dark:border-amber-900">
              <div className="text-sm text-muted-foreground">Points</div>
              <div className="text-xl font-bold text-amber-600 dark:text-amber-400">{userStats.totalPoints}</div>
            </div>
            <div className="p-3 rounded-lg border border-purple-200 bg-transparent backdrop-blur-sm dark:border-purple-900">
              <div className="text-sm text-muted-foreground">Level</div>
              <div className="text-xl font-bold text-purple-600 dark:text-purple-400">{userStats.level}</div>
            </div>
          </div>
          
          {/* Equivalent impact */}
          <div className="mt-6 p-4 bg-transparent border border-green-200 rounded-lg dark:border-green-900">
            <div className="font-medium mb-2">Environmental Impact</div>
            <div className="text-sm text-green-800 dark:text-green-300">
              Your eco-friendly choices are equivalent to:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Planting {Math.ceil(userStats.totalCarbonSaved / 0.06)} trees</li>
                <li>Not driving {Math.ceil(userStats.totalCarbonSaved * 8.8)} km in a car</li>
                <li>Saving {Math.ceil(userStats.totalCarbonSaved * 0.27)} liters of gasoline</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-transparent backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle>Transport Breakdown</CardTitle>
          <CardDescription>Stats by transportation mode</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(transportStats).map(([mode, stats]) => (
              <div key={mode} className="border rounded-lg p-4 bg-transparent backdrop-blur-sm">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getModeColor(mode)}`}>
                    {mode === 'walking' ? '🚶' : 
                     mode === 'biking' ? '🚲' : 
                     mode === 'car' ? '🚗' : 
                     '🚌'}
                  </div>
                  <div className="ml-3">
                    <div className="font-medium capitalize">{mode}</div>
                    <div className="text-xs text-muted-foreground">{stats.count} journeys</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Distance</div>
                    <div className="font-medium">{formatDistance(stats.distance)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">CO₂ Impact</div>
                    <div className="font-medium">
                      {mode !== 'car' 
                        ? <span className="text-green-600 dark:text-green-400">-{formatCO2(stats.carbonSaved)}</span> 
                        : <span className="text-red-600 dark:text-red-400">+{formatCO2(stats.carbonSaved || 0.12)}</span>}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Points</div>
                    <div className="font-medium">{stats.points}</div>
                  </div>
                </div>
              </div>
            ))}
            
            {Object.keys(transportStats).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No journey data yet. Start tracking to see your stats!
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsPage;
