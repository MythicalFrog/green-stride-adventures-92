
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Gamepad } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useApp } from '../context/AppContext';
import { useToast } from "@/components/ui/use-toast";
import confetti from '../utils/confetti';

const FlappyBirdGame: React.FC = () => {
  const { toast } = useToast();
  const { incrementStats } = useApp();
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Logic to start the game
  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setGameOver(false);
  };
  
  // Logic to end the game and award points
  const endGame = () => {
    setGameActive(false);
    setGameOver(true);
    
    // Award points based on score
    const points = score * 5; // 5 points per score point
    
    if (points > 0) {
      incrementStats(points, 0, points / 10); // Add points and carbon saved
      
      toast({
        title: "Game Over!",
        description: `You scored ${score} points and earned ${points} EcoQuest points!`,
      });
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };
  
  // Logic for when the user clicks/taps (makes the bird jump)
  const handleJump = () => {
    if (!gameActive || gameOver) return;
    
    // Increment score on successful jump
    setScore(prevScore => prevScore + 1);
    
    // End the game after a certain score to simulate winning
    if (score >= 9) {
      endGame();
    }
  };
  
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-10 w-10 border border-primary/20 bg-background/80 backdrop-blur-sm"
          aria-label="Play Flappy Bird"
        >
          <Gamepad className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Flappy EcoQuest Bird</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4">
          <div 
            className="relative bg-gradient-to-b from-blue-300 to-blue-500 w-full h-80 rounded-lg overflow-hidden border cursor-pointer"
            onClick={handleJump}
          >
            {/* Game container */}
            {!gameActive && !gameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
                <p className="text-xl font-bold mb-4">Flappy EcoQuest</p>
                <Button onClick={startGame}>Start Game</Button>
              </div>
            )}
            
            {gameActive && (
              <>
                {/* Bird character (using EcoQuest leaf as a placeholder) */}
                <div className="absolute left-1/4 transition-transform duration-300 animate-bounce" style={{ top: `${40 + Math.sin(Date.now() / 300) * 10}%` }}>
                  <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    <svg viewBox="0 0 24 24" className="h-8 w-8 text-green-100">
                      <path fill="currentColor" d="M17 8C8 10 5 16 5 16S2 8 2 8S8 6 17 8M17 8C16 9 15.5 10 15.5 10S13 7 10.5 9.5C10.5 9.5 13.5 10 13.5 13C12.5 9.5 10 10 10 10S12 11.5 12 15C11 13 8 13 8 13S10.5 14.5 11 17.5C10 16 8 16 8 16S9 19 11 22C8 20.5 5 18 3 18C9 22 14.5 22 17.5 21C20.5 20 22 19 22 19S21 17.5 17 14C17 14 18.5 17 20.5 17C19 15.5 19 14 19 14H22C21.5 13.5 21 13 19.5 12.5C22 12 22 10 22 10L19.5 11C19.5 11 20 9.5 20.5 9C18.5 9.5 17 8 17 8M14 15C14 14.4 14.4 14 15 14S16 14.4 16 15 15.6 16 15 16 14 15.6 14 15Z" />
                    </svg>
                  </div>
                </div>
                
                {/* Obstacles */}
                <div className="absolute top-0 h-1/3 w-16 bg-green-600 right-1/4 animate-[slide-in-right_2s_linear_infinite]"></div>
                <div className="absolute bottom-0 h-1/3 w-16 bg-green-600 right-1/2 animate-[slide-in-right_2s_linear_infinite]"></div>
                
                {/* Score display */}
                <div className="absolute top-4 left-4 bg-white/70 rounded px-2 py-1">
                  <span className="font-bold">Score: {score}</span>
                </div>
              </>
            )}
            
            {gameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
                <p className="text-xl font-bold mb-2">Game Over!</p>
                <p className="mb-4">Score: {score}</p>
                <Button onClick={startGame}>Play Again</Button>
              </div>
            )}
          </div>
          
          <div className="text-sm text-muted-foreground text-center">
            <p>Tap/click to make the bird jump and avoid obstacles.</p>
            <p>Earn 5 EcoQuest points for each game point!</p>
          </div>
          
          <Button variant="outline" onClick={() => setDialogOpen(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FlappyBirdGame;
