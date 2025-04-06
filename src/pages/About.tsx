
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import EarthVisualization from '../components/EarthVisualization';
import { Leaf, Award, MapPin, Bike, Footprints } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8 mb-16 max-w-4xl">
      <div className="flex flex-col items-center mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4">
          <span className="text-green-500">Eco</span>
          <span className="text-foreground">Quest</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-lg mb-8">
          Turning everyday journeys into adventures for a greener planet
        </p>
      </div>
      
      <div className="relative flex flex-col md:flex-row w-full mb-12 rounded-2xl overflow-hidden">
        <div className="w-full md:w-1/2 h-80 relative">
          <EarthVisualization />
        </div>
        
        <div className="w-full md:w-1/2 flex items-center justify-center p-4">
          <Card className="w-full bg-background/40 backdrop-blur-md border border-muted/50 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-center">Our Mission</h2>
              <p className="text-center mb-6">
                EcoQuest empowers individuals to make sustainable transportation choices, 
                track their positive environmental impact, and earn rewards for 
                contributing to a healthier planet.
              </p>
              <div className="flex justify-center">
                <Link to="/signup">
                  <Button size="lg" className="font-medium">Join the Movement</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="bg-transparent backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="ml-4 text-xl font-semibold">Track Your Impact</h3>
            </div>
            <p className="ml-14">
              See how your eco-friendly transportation choices reduce carbon emissions 
              and contribute to a healthier environment in real-time.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-transparent backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="ml-4 text-xl font-semibold">Discover Green Routes</h3>
            </div>
            <p className="ml-14">
              Find the most eco-friendly paths for your daily commute and adventures,
              prioritizing walking, cycling, and public transportation.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-transparent backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30">
                <Award className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="ml-4 text-xl font-semibold">Earn Rewards</h3>
            </div>
            <p className="ml-14">
              Complete challenges and earn points that can be redeemed for 
              eco-friendly products, discounts, and exclusive experiences with our partners.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-transparent backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                <Footprints className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="ml-4 text-xl font-semibold">Build Healthy Habits</h3>
            </div>
            <p className="ml-14">
              Transform your daily routines with gamified challenges that make 
              eco-friendly choices fun, rewarding, and sustainable in the long term.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center mb-16">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white text-xl font-bold mb-4">1</div>
            <h3 className="text-lg font-medium mb-2">Track Your Journeys</h3>
            <p className="text-sm text-muted-foreground">Record walking, cycling, and public transit trips automatically or manually</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold mb-4">2</div>
            <h3 className="text-lg font-medium mb-2">Complete Challenges</h3>
            <p className="text-sm text-muted-foreground">Earn points and achievements by meeting eco-friendly transportation goals</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold mb-4">3</div>
            <h3 className="text-lg font-medium mb-2">Redeem Rewards</h3>
            <p className="text-sm text-muted-foreground">Use your points for discounts and exclusive offers from eco-conscious brands</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mb-8">
        <Link to="/signup">
          <Button size="lg" className="font-medium px-8">Join EcoQuest Today</Button>
        </Link>
      </div>
    </div>
  );
};

export default About;
