
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, User, Medal } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  rank: number;
}

const Leaderboard = () => {
  // Mock leaderboard data with the current user included
  const { userStats } = useApp();
  const [county, setCounty] = useState('New York County');
  
  const mockLeaderboard: LeaderboardEntry[] = [
    { id: '1', name: 'Emma Thompson', points: 4250, rank: 1 },
    { id: '2', name: 'Jason Rodriguez', points: 3980, rank: 2 },
    { id: '3', name: 'Sarah Lee', points: 3760, rank: 3 },
    { id: '4', name: 'Alex Kim', points: 3650, rank: 4 },
    { id: '5', name: 'Michael Johnson', points: 3520, rank: 5 },
    { id: '6', name: 'Lisa Chen', points: 3410, rank: 6 },
    { id: '7', name: 'David Patel', points: 3280, rank: 7 },
    { id: '8', name: 'Maria Garcia', points: 3150, rank: 8 },
    { id: '9', name: 'Robert Smith', points: 3020, rank: 9 },
    { id: '10', name: 'You', points: userStats.totalPoints, rank: 10 }
  ].sort((a, b) => b.points - a.points)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));

  const getBadge = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Trophy className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Trophy className="h-6 w-6 text-amber-700" />;
    return <span className="font-bold text-sm">{rank}</span>;
  };

  const getBonusPoints = (rank: number) => {
    if (rank === 1) return 400;
    if (rank === 2) return 300;
    if (rank === 3) return 200;
    return 0;
  };

  return (
    <div className="container mx-auto px-4 py-8 mb-16">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Leaderboard</h1>
        <p className="text-muted-foreground">Top eco-friendly travelers in {county}</p>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <span>Rankings</span>
            <span className="text-sm font-normal text-muted-foreground">
              Updated daily
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockLeaderboard.map((entry) => (
              <div
                key={entry.id}
                className={`flex items-center p-3 rounded-lg ${
                  entry.name === 'You' ? 'bg-green-100 dark:bg-green-900/30' : ''
                }`}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full">
                  {getBadge(entry.rank)}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="font-medium">{entry.name}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold">{entry.points.toLocaleString()} pts</span>
                  {getBonusPoints(entry.rank) > 0 && (
                    <span className="text-xs text-green-600 dark:text-green-400">
                      +{getBonusPoints(entry.rank)} bonus pts
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Your Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Current Rank</span>
                <span className="font-bold">{mockLeaderboard.find(e => e.name === 'You')?.rank || '-'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Points</span>
                <span className="font-bold">{userStats.totalPoints.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Level</span>
                <span className="font-bold">{userStats.level}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">County Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">County</span>
                <span className="font-bold">{county}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Participants</span>
                <span className="font-bold">2,378</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">CO₂ Saved (County)</span>
                <span className="font-bold">14,270 kg</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
