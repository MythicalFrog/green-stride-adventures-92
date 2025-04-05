
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useApp } from '../context/AppContext';
import { Trophy, Lock, CheckCircle } from 'lucide-react';

const RewardsPage = () => {
  const { userStats } = useApp();
  
  const rewards = [
    {
      id: 'eco-badge',
      title: 'Eco Pioneer Badge',
      description: 'Reach level 2',
      pointsRequired: 500,
      icon: '🌱',
      unlocked: userStats.level >= 2,
    },
    {
      id: 'carbon-hero',
      title: 'Carbon Hero',
      description: 'Save 10kg of CO₂',
      pointsRequired: 0,
      icon: '🌿',
      unlocked: userStats.totalCarbonSaved >= 10,
    },
    {
      id: 'marathon-walker',
      title: 'Marathon Walker',
      description: 'Walk a total of 10km',
      pointsRequired: 0,
      icon: '🚶',
      unlocked: false,
    },
    {
      id: 'bike-enthusiast',
      title: 'Bike Enthusiast',
      description: 'Complete 5 biking journeys',
      pointsRequired: 0,
      icon: '🚲',
      unlocked: false,
    },
    {
      id: 'challenge-champion',
      title: 'Challenge Champion',
      description: 'Complete 3 challenges',
      pointsRequired: 0,
      icon: '🏆',
      unlocked: false,
    }
  ];
  
  const availableCoupons = [
    {
      id: 'eco-coffee',
      title: '20% Off at Eco Coffee',
      description: 'Good for one eco-friendly coffee',
      pointsCost: 200,
      icon: '☕',
      canAfford: userStats.totalPoints >= 200,
    },
    {
      id: 'bike-repair',
      title: 'Free Bike Check-up',
      description: 'At City Bikes shop downtown',
      pointsCost: 350,
      icon: '🛠️',
      canAfford: userStats.totalPoints >= 350,
    },
    {
      id: 'organic-grocery',
      title: '15% Off Organic Groceries',
      description: 'At Green Basket Market',
      pointsCost: 500,
      icon: '🥕',
      canAfford: userStats.totalPoints >= 500,
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8 mb-16 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Rewards</h1>
        <div className="bg-muted px-4 py-1 rounded-full flex items-center">
          <Trophy className="w-4 h-4 text-yellow-500 mr-1" />
          <span className="font-medium">{userStats.totalPoints} pts</span>
        </div>
      </div>
      
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle>Your Achievements</CardTitle>
          <CardDescription>Milestones you've reached on your eco journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {rewards.map((reward) => (
              <div 
                key={reward.id} 
                className={`border rounded-lg p-4 transition ${
                  reward.unlocked 
                    ? 'bg-gradient-to-br from-green-50 to-blue-50 border-green-200' 
                    : 'bg-muted/50 border-muted'
                }`}
              >
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 flex items-center justify-center text-xl">
                    {reward.icon}
                  </div>
                  <div className="ml-2 flex-1">
                    <div className="font-medium">{reward.title}</div>
                    <div className="text-xs text-muted-foreground">{reward.description}</div>
                  </div>
                  {reward.unlocked ? (
                    <CheckCircle className="h-5 w-5 text-green-600 ml-2" />
                  ) : (
                    <Lock className="h-5 w-5 text-muted-foreground ml-2" />
                  )}
                </div>
                {!reward.unlocked && reward.pointsRequired > 0 && (
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-2">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${Math.min(100, (userStats.totalPoints / reward.pointsRequired) * 100)}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Available Rewards</CardTitle>
          <CardDescription>Redeem your points for these eco-friendly offers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {availableCoupons.map((coupon) => (
              <div 
                key={coupon.id} 
                className={`border rounded-lg p-4 ${
                  coupon.canAfford 
                    ? 'hover:border-primary cursor-pointer transition' 
                    : 'opacity-70'
                }`}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl">
                    {coupon.icon}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="font-medium">{coupon.title}</div>
                    <div className="text-xs text-muted-foreground">{coupon.description}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center text-amber-600">
                    <Trophy className="w-4 h-4 mr-1" />
                    <span className="font-medium">{coupon.pointsCost} pts</span>
                  </div>
                  <button
                    className={`px-3 py-1 rounded text-sm ${
                      coupon.canAfford
                        ? 'bg-primary text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}
                    disabled={!coupon.canAfford}
                  >
                    {coupon.canAfford ? 'Redeem' : 'Not enough points'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RewardsPage;
