
import React, { useState, useEffect, useRef } from 'react';
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

// Define game constants
const GRID_SIZE = 20;
const GAME_SPEED = 150; // ms

const SnakeGame: React.FC = () => {
  const { toast } = useToast();
  const { incrementStats } = useApp();
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const gameLoopRef = useRef<number | null>(null);
  
  // Snake state
  const [snake, setSnake] = useState<{ x: number, y: number }[]>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ]);
  
  // Food state
  const [food, setFood] = useState<{ x: number, y: number }>({ x: 15, y: 10 });
  
  // Direction state (initially moving right)
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const directionRef = useRef(direction);
  
  // Update direction ref when direction changes
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);
  
  // Place food at random position
  const placeFood = () => {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    setFood({ x, y });
  };
  
  // Start the game
  const startGame = () => {
    setSnake([
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ]);
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setScore(0);
    setGameOver(false);
    setGameActive(true);
    placeFood();
    
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    
    gameLoopRef.current = window.setInterval(moveSnake, GAME_SPEED);
  };
  
  // End the game
  const endGame = () => {
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
    
    setGameActive(false);
    setGameOver(true);
    
    // Award points based on score
    const points = score * 10; // 10 points per score point
    
    if (points > 0) {
      incrementStats(points, 0, points / 10); // Add points and carbon saved
      
      toast({
        title: "Game Over!",
        description: `Your snake length was ${score + 3} and you earned ${points} EcoQuest points!`,
      });
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, []);
  
  // Handle key presses for changing direction
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameActive) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (directionRef.current !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (directionRef.current !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (directionRef.current !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (directionRef.current !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameActive]);
  
  // Handle direction button clicks
  const changeDirection = (newDirection: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    if (!gameActive) return;
    
    switch (newDirection) {
      case 'UP':
        if (directionRef.current !== 'DOWN') setDirection('UP');
        break;
      case 'DOWN':
        if (directionRef.current !== 'UP') setDirection('DOWN');
        break;
      case 'LEFT':
        if (directionRef.current !== 'RIGHT') setDirection('LEFT');
        break;
      case 'RIGHT':
        if (directionRef.current !== 'LEFT') setDirection('RIGHT');
        break;
    }
  };
  
  // Move the snake
  const moveSnake = () => {
    if (!gameActive) return;
    
    setSnake((prevSnake) => {
      const head = { ...prevSnake[0] };
      
      // Move the head
      switch (directionRef.current) {
        case 'UP':
          head.y = (head.y - 1 + GRID_SIZE) % GRID_SIZE;
          break;
        case 'DOWN':
          head.y = (head.y + 1) % GRID_SIZE;
          break;
        case 'LEFT':
          head.x = (head.x - 1 + GRID_SIZE) % GRID_SIZE;
          break;
        case 'RIGHT':
          head.x = (head.x + 1) % GRID_SIZE;
          break;
      }
      
      // Check if the snake hit itself
      if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        endGame();
        return prevSnake;
      }
      
      const newSnake = [head, ...prevSnake];
      
      // Check if the snake ate the food
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 1);
        placeFood();
      } else {
        // Remove the tail
        newSnake.pop();
      }
      
      return newSnake;
    });
  };
  
  // Close dialog and clean up
  useEffect(() => {
    if (!dialogOpen && gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
  }, [dialogOpen]);
  
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-10 w-10 border border-primary/20 bg-background/80 backdrop-blur-sm"
          aria-label="Play Snake Game"
        >
          <Gamepad className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>EcoQuest Snake Game</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4">
          <div className="relative bg-black w-full aspect-square rounded-lg overflow-hidden border">
            {/* Game container */}
            {!gameActive && !gameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white">
                <p className="text-xl font-bold mb-4">EcoQuest Snake</p>
                <Button onClick={startGame}>Start Game</Button>
              </div>
            )}
            
            {(gameActive || gameOver) && (
              <div className="w-full h-full grid" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
                {/* Render snake */}
                {snake.map((segment, index) => (
                  <div 
                    key={`snake-${index}`}
                    className={`absolute bg-green-500 ${index === 0 ? 'rounded-full' : ''}`}
                    style={{
                      left: `${(segment.x / GRID_SIZE) * 100}%`,
                      top: `${(segment.y / GRID_SIZE) * 100}%`,
                      width: `${100 / GRID_SIZE}%`,
                      height: `${100 / GRID_SIZE}%`
                    }}
                  >
                    {index === 0 && (
                      <svg viewBox="0 0 24 24" className="h-full w-full text-green-100">
                        <path fill="currentColor" d="M17 8C8 10 5 16 5 16S2 8 2 8S8 6 17 8M17 8C16 9 15.5 10 15.5 10S13 7 10.5 9.5C10.5 9.5 13.5 10 13.5 13C12.5 9.5 10 10 10 10S12 11.5 12 15C11 13 8 13 8 13S10.5 14.5 11 17.5C10 16 8 16 8 16S9 19 11 22C8 20.5 5 18 3 18C9 22 14.5 22 17.5 21C20.5 20 22 19 22 19S21 17.5 17 14C17 14 18.5 17 20.5 17C19 15.5 19 14 19 14H22C21.5 13.5 21 13 19.5 12.5C22 12 22 10 22 10L19.5 11C19.5 11 20 9.5 20.5 9C18.5 9.5 17 8 17 8M14 15C14 14.4 14.4 14 15 14S16 14.4 16 15 15.6 16 15 16 14 15.6 14 15Z" />
                      </svg>
                    )}
                  </div>
                ))}
                
                {/* Render food */}
                <div 
                  className="absolute bg-red-500 rounded-full"
                  style={{
                    left: `${(food.x / GRID_SIZE) * 100}%`,
                    top: `${(food.y / GRID_SIZE) * 100}%`,
                    width: `${100 / GRID_SIZE}%`,
                    height: `${100 / GRID_SIZE}%`
                  }}
                ></div>
              </div>
            )}
            
            {/* Score display */}
            {gameActive && (
              <div className="absolute top-2 left-2 bg-white/70 rounded px-2 py-1">
                <span className="font-bold">Score: {score}</span>
              </div>
            )}
            
            {gameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white">
                <p className="text-xl font-bold mb-2">Game Over!</p>
                <p className="mb-4">Score: {score}</p>
                <Button onClick={startGame}>Play Again</Button>
              </div>
            )}
          </div>
          
          {/* Control buttons */}
          <div className="grid grid-cols-3 gap-2 w-32">
            <div className="col-span-3 flex justify-center">
              <Button 
                size="sm" 
                variant="outline" 
                className="w-10 h-10" 
                onClick={() => changeDirection('UP')}
                disabled={!gameActive}
              >
                ↑
              </Button>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              className="w-10 h-10" 
              onClick={() => changeDirection('LEFT')}
              disabled={!gameActive}
            >
              ←
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="w-10 h-10" 
              onClick={() => changeDirection('DOWN')}
              disabled={!gameActive}
            >
              ↓
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="w-10 h-10" 
              onClick={() => changeDirection('RIGHT')}
              disabled={!gameActive}
            >
              →
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground text-center">
            <p>Use arrow keys or buttons to control the snake.</p>
            <p>Earn 10 EcoQuest points for each food eaten!</p>
          </div>
          
          <Button variant="outline" onClick={() => setDialogOpen(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SnakeGame;
