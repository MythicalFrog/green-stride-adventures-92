
import confetti from 'canvas-confetti';

export const triggerConfetti = (options = {}) => {
  const defaultOptions = {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6, x: 0.5 }
  };
  
  confetti({
    ...defaultOptions,
    ...options
  });
};

export default confetti;
