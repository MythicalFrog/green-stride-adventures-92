
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from '../context/AppContext';
import { formatDistance, formatCO2 } from '../utils/formatters';
import { Leaf, Award, Gauge, Flame, CalendarCheck, Trophy } from 'lucide-react';
import EarthVisualization from '../components/EarthVisualization';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { userStats } = useApp();
  const [displayText, setDisplayText] = useState("");
  const phrases = ["Make green choices", "Track your impact", "Earn rewards"];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const typeWriter = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      const shouldDelete = isDeleting;
      
      if (!shouldDelete && displayText.length < currentPhrase.length) {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
      } else if (shouldDelete && displayText.length > 0) {
        setDisplayText(displayText.substring(0, displayText.length - 1));
      } else if (shouldDelete && displayText.length === 0) {
        setIsDeleting(false);
        setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
      } else {
        setTimeout(() => setIsDeleting(true), 2000);
      }
    };
    
    const timer = setTimeout(typeWriter, isDeleting ? 100 : 150);
    return () => clearTimeout(timer);
  }, [displayText, currentPhraseIndex, isDeleting]);
  
  const getNextLevelPoints = () => {
    return userStats.level * 500;
  };
  
  const progressToNextLevel = () => {
    const nextLevelPoints = getNextLevelPoints();
    return (userStats.totalPoints / nextLevelPoints) * 100;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 mr-4">
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
        
        <div className="h-8 mb-4 overflow-hidden">
          <h2 className="text-2xl font-medium">{displayText}<span className="animate-pulse">|</span></h2>
        </div>
        
        {/* Level progress */}
        <div className="w-full max-w-md rounded-full px-4 py-2 flex flex-col mb-2 bg-transparent">
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
        <div className="flex items-center mb-4">
          <div className="flex items-center bg-amber-100 text-amber-800 px-3 py-1 rounded-full dark:bg-amber-900/30 dark:text-amber-300">
            <Flame className="h-4 w-4 mr-1 text-amber-500" />
            <span className="font-medium">{userStats.streakDays} day streak</span>
          </div>
          <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full ml-2 dark:bg-green-900/30 dark:text-green-300">
            <CalendarCheck className="h-4 w-4 mr-1 text-green-500" />
            <span className="font-medium">Active today</span>
          </div>
        </div>
      </div>
      
      <div className="relative w-full h-64 mb-8 rounded-2xl overflow-hidden">
        <EarthVisualization />
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-background/40 backdrop-blur-sm">
          <div className="grid grid-cols-3 gap-4 w-full max-w-xl px-4">
            <div className="flex flex-col items-center justify-center backdrop-blur-sm p-4 rounded-xl border border-muted shadow-sm bg-transparent">
              <Leaf className="h-8 w-8 text-green-500 mb-2" />
              <div className="font-bold text-xl">{formatCO2(userStats.totalCarbonSaved)}</div>
              <div className="text-xs text-muted-foreground">CO₂ Saved</div>
            </div>
            <div className="flex flex-col items-center justify-center backdrop-blur-sm p-4 rounded-xl border border-muted shadow-sm bg-transparent">
              <Gauge className="h-8 w-8 text-blue-500 mb-2" />
              <div className="font-bold text-xl">{formatDistance(userStats.totalDistance)}</div>
              <div className="text-xs text-muted-foreground">Distance</div>
            </div>
            <div className="flex flex-col items-center justify-center backdrop-blur-sm p-4 rounded-xl border border-muted shadow-sm bg-transparent">
              <Award className="h-8 w-8 text-yellow-500 mb-2" />
              <div className="font-bold text-xl">{userStats.totalPoints}</div>
              <div className="text-xs text-muted-foreground">Points</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-muted bg-transparent backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-primary/10">
                <Gauge className="h-5 w-5 text-primary" />
              </div>
              <h3 className="ml-2 font-semibold">Recent Activity</h3>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-background/50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-1.5 rounded-full bg-green-100 dark:bg-green-900/30">
                    <Leaf className="h-3 w-3 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="ml-2 text-sm">Walk to park</span>
                </div>
                <span className="text-xs text-muted-foreground">2.1 km</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-background/50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <Gauge className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="ml-2 text-sm">Bike to store</span>
                </div>
                <span className="text-xs text-muted-foreground">3.5 km</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-muted bg-transparent backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-primary/10">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <h3 className="ml-2 font-semibold">Current Challenges</h3>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-background/50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30">
                    <Award className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                  </div>
                  <span className="ml-2 text-sm">Weekend Walker</span>
                </div>
                <span className="text-xs text-primary">25 pts</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-background/50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30">
                    <Flame className="h-3 w-3 text-purple-600 dark:text-purple-400" />
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
