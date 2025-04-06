
import React from 'react';
import EarthVisualization from '../components/EarthVisualization';
import { useApp } from '../context/AppContext';
import { Leaf, Route, Globe, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Journey = () => {
  const { currentJourney } = useApp();
  
  // If journey is active, show simplified journey progress view
  if (currentJourney) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[70vh]">
          <div className="relative h-[400px] w-full order-2 md:order-1">
            <EarthVisualization />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center">
                <div className="w-16 h-16 mr-4">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="40" fill="rgba(72, 187, 120, 0.2)" />
                    <circle cx="50" cy="50" r="30" fill="rgba(72, 187, 120, 0.4)" />
                    <path d="M50 10 A40 40 0 0 1 90 50 A40 40 0 0 1 50 90 A40 40 0 0 1 10 50 A40 40 0 0 1 50 10 Z" fill="none" stroke="rgba(72, 187, 120, 0.8)" strokeWidth="2" />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold">
                  <span className="text-green-500">Eco</span>
                  <span>Quest</span>
                </h1>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center text-center order-1 md:order-2">
            <h2 className="text-3xl font-bold mb-4">Journey in Progress</h2>
            <p className="text-xl text-muted-foreground mb-6">
              {currentJourney.mode.charAt(0).toUpperCase() + currentJourney.mode.slice(1)} journey active...
            </p>
            <div className="w-full max-w-sm bg-green-50/30 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-green-700 dark:text-green-300">
                Keep going! You're making a positive impact on the environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[70vh]">
        <div className="relative h-[400px] w-full order-2 md:order-1">
          <EarthVisualization />
        </div>
        
        <div className="flex flex-col items-center text-center order-1 md:order-2">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 mr-4">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="40" fill="rgba(72, 187, 120, 0.2)" />
                <circle cx="50" cy="50" r="30" fill="rgba(72, 187, 120, 0.4)" />
                <path d="M50 10 A40 40 0 0 1 90 50 A40 40 0 0 1 50 90 A40 40 0 0 1 10 50 A40 40 0 0 1 50 10 Z" fill="none" stroke="rgba(72, 187, 120, 0.8)" strokeWidth="2" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold">
              <span className="text-green-500">Eco</span>
              <span>Quest</span>
            </h1>
          </div>
          
          <p className="text-muted-foreground mb-8 max-w-md">Make green choices, track your impact, earn rewards</p>
          
          {/* Sign in and Sign up buttons added here */}
          <div className="flex space-x-4 mb-8">
            <Link to="/login">
              <Button variant="outline" className="px-6">Sign in</Button>
            </Link>
            <Link to="/signup">
              <Button className="px-6">Sign up</Button>
            </Link>
          </div>
          
          <div className="mt-8 p-6 bg-transparent backdrop-blur-sm border border-muted rounded-lg max-w-md">
            <h3 className="text-xl font-medium mb-4">What is EcoQuest?</h3>
            <p className="text-muted-foreground mb-4">
              EcoQuest is a platform designed to help you make environmentally friendly choices in your daily travel and activities. 
              By tracking your sustainable transportation methods, you can see your positive impact on the environment while earning rewards.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 border rounded-lg bg-green-50/30 dark:bg-green-900/20">
                <div className="text-lg font-bold text-green-600 dark:text-green-400">Track</div>
                <div className="text-xs text-muted-foreground">Your journeys</div>
              </div>
              <div className="p-3 border rounded-lg bg-blue-50/30 dark:bg-blue-900/20">
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">Reduce</div>
                <div className="text-xs text-muted-foreground">Carbon emissions</div>
              </div>
              <div className="p-3 border rounded-lg bg-amber-50/30 dark:bg-amber-900/20">
                <div className="text-lg font-bold text-amber-600 dark:text-amber-400">Reward</div>
                <div className="text-xs text-muted-foreground">Earn points</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Who Are We Section */}
      <div className="mt-16 mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            Who Are We
          </h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Meet the passionate team behind EcoQuest who are dedicated to making our planet greener through technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="overflow-hidden bg-transparent backdrop-blur-sm">
            <div className="aspect-square w-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                alt="Team member 1" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4 text-center">
              <h3 className="font-bold">Emma Chen</h3>
              <p className="text-sm text-muted-foreground">Founder & CEO</p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden bg-transparent backdrop-blur-sm">
            <div className="aspect-square w-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                alt="Team member 2" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4 text-center">
              <h3 className="font-bold">Michael Park</h3>
              <p className="text-sm text-muted-foreground">CTO</p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden bg-transparent backdrop-blur-sm">
            <div className="aspect-square w-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                alt="Team member 3" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4 text-center">
              <h3 className="font-bold">Alex Rivera</h3>
              <p className="text-sm text-muted-foreground">Lead Developer</p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden bg-transparent backdrop-blur-sm">
            <div className="aspect-square w-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                alt="Team member 4" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4 text-center">
              <h3 className="font-bold">Sarah Kim</h3>
              <p className="text-sm text-muted-foreground">UX/UI Designer</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Journey;
