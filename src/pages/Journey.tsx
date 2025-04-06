
import React, { useState, useEffect, useRef } from 'react';
import EarthVisualization from '../components/EarthVisualization';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Journey = () => {
  const [displayText, setDisplayText] = useState("");
  const phrases = ["EcoQuest", "Save Earth", "Green Travel"];
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[70vh]">
        <div className="relative h-[400px] w-full order-2 md:order-1">
          <EarthVisualization />
        </div>
        
        <div className="flex flex-col items-center text-center order-1 md:order-2">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-green-500">Eco</span>
            <span>Quest</span>
          </h1>
          
          <div className="h-8 mb-4 overflow-hidden">
            <h2 className="text-2xl font-medium">{displayText}<span className="animate-pulse">|</span></h2>
          </div>
          
          <p className="text-muted-foreground mb-8 max-w-md">Make green choices, track your impact, earn rewards</p>
          
          <div className="flex gap-4 mb-6">
            <Link to="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button>Join Now</Button>
            </Link>
          </div>
          
          <div className="mt-8 p-6 bg-transparent backdrop-blur-sm border border-muted rounded-lg max-w-md">
            <h3 className="text-xl font-medium mb-4">Start Your Eco Journey Today</h3>
            <p className="text-muted-foreground mb-4">
              Track your eco-friendly transportation choices, reduce your carbon footprint, 
              and earn rewards while contributing to a healthier planet.
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
    </div>
  );
};

export default Journey;
