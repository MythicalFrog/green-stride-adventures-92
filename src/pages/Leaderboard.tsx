
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useApp } from '../context/AppContext';
import { Medal, Trophy, Award, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LeaderboardPage = () => {
  const { userStats } = useApp();
  const [selectedRegion, setSelectedRegion] = useState("county");
  
  // Mock leaderboard data
  const countyLeaderboard = [
    { id: 1, name: "Jamie Smith", points: 2458, avatar: "JS", rank: 1 },
    { id: 2, name: "Alex Johnson", points: 2142, avatar: "AJ", rank: 2 },
    { id: 3, name: "Taylor Brown", points: 1987, avatar: "TB", rank: 3 },
    { id: 4, name: "Jordan Lee", points: 1845, avatar: "JL", rank: 4 },
    { id: 5, name: "Morgan Chen", points: 1702, avatar: "MC", rank: 5 },
    { id: 6, name: "Riley Williams", points: userStats.totalPoints, avatar: "You", rank: 6, isCurrentUser: true },
    { id: 7, name: "Casey Davis", points: 1598, avatar: "CD", rank: 7 },
    { id: 8, name: "Quinn Miller", points: 1485, avatar: "QM", rank: 8 },
    { id: 9, name: "Avery Wilson", points: 1392, avatar: "AW", rank: 9 },
    { id: 10, name: "Dakota Garcia", points: 1287, avatar: "DG", rank: 10 },
  ];
  
  const stateLeaderboard = [
    { id: 1, name: "Robin Hughes", points: 3852, avatar: "RH", rank: 1 },
    { id: 2, name: "Sam Torres", points: 3721, avatar: "ST", rank: 2 },
    { id: 3, name: "Jesse Patel", points: 3564, avatar: "JP", rank: 3 },
    { id: 4, name: "Cameron Wright", points: 3412, avatar: "CW", rank: 4 },
    { id: 5, name: "Sydney Khan", points: 3287, avatar: "SK", rank: 5 },
    { id: 6, name: "Hayden Lopez", points: 3154, avatar: "HL", rank: 6 },
    { id: 7, name: "Jordan Park", points: 3042, avatar: "JP", rank: 7 },
    { id: 8, name: "Taylor Kim", points: 2987, avatar: "TK", rank: 8 },
    { id: 9, name: "Riley Williams", points: userStats.totalPoints, avatar: "You", rank: 18, isCurrentUser: true },
    { id: 10, name: "Ash Rodriguez", points: 2765, avatar: "AR", rank: 10 },
  ];
  
  const nationalLeaderboard = [
    { id: 1, name: "Blake Johnson", points: 5897, avatar: "BJ", rank: 1 },
    { id: 2, name: "Charlie Singh", points: 5742, avatar: "CS", rank: 2 },
    { id: 3, name: "Finley Ahmed", points: 5631, avatar: "FA", rank: 3 },
    { id: 4, name: "Drew Martinez", points: 5489, avatar: "DM", rank: 4 },
    { id: 5, name: "Ellis Thompson", points: 5375, avatar: "ET", rank: 5 },
    { id: 6, name: "Harper Nguyen", points: 5218, avatar: "HN", rank: 6 },
    { id: 7, name: "Jordan Lee", points: 5107, avatar: "JL", rank: 7 },
    { id: 8, name: "Kelly Rivera", points: 4986, avatar: "KR", rank: 8 },
    { id: 9, name: "Logan Smith", points: 4832, avatar: "LS", rank: 9 },
    { id: 10, name: "Riley Williams", points: userStats.totalPoints, avatar: "You", rank: 42, isCurrentUser: true },
  ];
  
  const getLeaderboardData = () => {
    switch (selectedRegion) {
      case "county":
        return countyLeaderboard;
      case "state":
        return stateLeaderboard;
      case "national":
        return nationalLeaderboard;
      default:
        return countyLeaderboard;
    }
  };
  
  const getRankMedal = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-700" />;
      default:
        return <span className="text-muted-foreground text-sm font-medium w-5">{rank}</span>;
    }
  };
  
  const leaderboardData = getLeaderboardData();
  
  // Find user ranking
  const userRanking = leaderboardData.find(entry => entry.isCurrentUser);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Trophy className="h-7 w-7 text-yellow-500" />
            Leaderboard
          </h1>
          <p className="text-muted-foreground">Compare your eco-impact with others in your region</p>
        </div>
      </div>
      
      <Card className="bg-transparent backdrop-blur-sm mb-8">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Your Ranking</span>
            <MapPin className="h-5 w-5 text-primary" />
          </CardTitle>
          <CardDescription>Based on total eco-points earned</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between bg-muted/20 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-primary">
                {userRanking?.avatar || "You"}
              </div>
              <div>
                <div className="font-medium">You</div>
                <div className="text-sm text-muted-foreground">
                  {userRanking?.points || userStats.totalPoints} points
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center">
                <span className="font-semibold mr-2">Rank: {userRanking?.rank || "-"}</span>
                {userRanking?.rank <= 3 && getRankMedal(userRanking.rank)}
              </div>
              {userRanking?.rank === 1 && (
                <div className="text-xs text-green-600 dark:text-green-400">
                  +400 bonus points awarded!
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="county" className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger 
              value="county" 
              onClick={() => setSelectedRegion("county")}
            >
              County
            </TabsTrigger>
            <TabsTrigger 
              value="state" 
              onClick={() => setSelectedRegion("state")}
            >
              State
            </TabsTrigger>
            <TabsTrigger 
              value="national"
              onClick={() => setSelectedRegion("national")}
            >
              National
            </TabsTrigger>
          </TabsList>
          
          <div className="text-sm text-muted-foreground">
            Updated daily
          </div>
        </div>
        
        <TabsContent value="county" className="mt-0">
          <Card className="bg-transparent backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-2">
                {countyLeaderboard.map((entry) => (
                  <div 
                    key={entry.id} 
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      entry.isCurrentUser ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/20'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center">
                        {getRankMedal(entry.rank)}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center mx-3 text-sm">
                        {entry.avatar}
                      </div>
                      <div>
                        <div className="font-medium">
                          {entry.name}
                          {entry.isCurrentUser && <span className="ml-2 text-primary">(You)</span>}
                        </div>
                      </div>
                    </div>
                    <div className="font-semibold">{entry.points} pts</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="state" className="mt-0">
          <Card className="bg-transparent backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-2">
                {stateLeaderboard.map((entry) => (
                  <div 
                    key={entry.id} 
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      entry.isCurrentUser ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/20'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center">
                        {getRankMedal(entry.rank)}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center mx-3 text-sm">
                        {entry.avatar}
                      </div>
                      <div>
                        <div className="font-medium">
                          {entry.name}
                          {entry.isCurrentUser && <span className="ml-2 text-primary">(You)</span>}
                        </div>
                      </div>
                    </div>
                    <div className="font-semibold">{entry.points} pts</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="national" className="mt-0">
          <Card className="bg-transparent backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-2">
                {nationalLeaderboard.map((entry) => (
                  <div 
                    key={entry.id} 
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      entry.isCurrentUser ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/20'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center">
                        {getRankMedal(entry.rank)}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center mx-3 text-sm">
                        {entry.avatar}
                      </div>
                      <div>
                        <div className="font-medium">
                          {entry.name}
                          {entry.isCurrentUser && <span className="ml-2 text-primary">(You)</span>}
                        </div>
                      </div>
                    </div>
                    <div className="font-semibold">{entry.points} pts</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="bg-transparent backdrop-blur-sm border-dashed border-2">
        <CardContent className="p-6">
          <div className="text-center">
            <Trophy className="h-10 w-10 text-yellow-500 mx-auto mb-2" />
            <h3 className="text-lg font-bold mb-1">Top County Performer</h3>
            <p className="text-muted-foreground mb-4">
              Reach #1 in your county this month and earn 400+ bonus points!
            </p>
            <Button variant="outline">View Full Rankings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardPage;
