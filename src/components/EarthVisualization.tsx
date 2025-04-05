
import React, { useEffect, useRef } from 'react';

const EarthVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const parentElement = canvas.parentElement;
      if (!parentElement) return;
      
      canvas.width = parentElement.clientWidth;
      canvas.height = parentElement.clientHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Animation properties
    const earthRadius = Math.min(canvas.width, canvas.height) * 0.35;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Points for orbit lines
    const points = [];
    const orbits = [];
    
    // Create points
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = earthRadius * (0.3 + Math.random() * 0.7);
      const speed = 0.0005 + Math.random() * 0.001;
      const size = 1 + Math.random() * 3;
      const hue = 120 + Math.random() * 60; // Green to teal
      
      points.push({
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        angle,
        distance,
        speed,
        size,
        hue,
      });
    }
    
    // Create orbit lines
    for (let i = 0; i < 8; i++) {
      const radius = earthRadius * (0.3 + i * 0.1);
      const segments = 40 + i * 5;
      const speed = 0.0002 + i * 0.0001;
      const hue = 140 + i * 10;
      
      orbits.push({
        radius,
        segments,
        speed,
        hue,
        offset: Math.random() * Math.PI * 2,
      });
    }
    
    // Draw earth
    const drawEarth = () => {
      // Earth gradient
      const earthGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, earthRadius
      );
      earthGradient.addColorStop(0, 'rgba(64, 180, 230, 0.6)');
      earthGradient.addColorStop(0.5, 'rgba(30, 130, 200, 0.4)');
      earthGradient.addColorStop(1, 'rgba(0, 100, 160, 0.1)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2);
      ctx.fillStyle = earthGradient;
      ctx.fill();
      
      // Earth outline
      ctx.beginPath();
      ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(100, 200, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Earth grid lines
      for (let i = 0; i < 8; i++) {
        const radius = earthRadius * (i / 8);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(100, 200, 255, 0.1)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      
      // Earth meridian lines
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * earthRadius,
          centerY + Math.sin(angle) * earthRadius
        );
        ctx.strokeStyle = 'rgba(100, 200, 255, 0.1)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    };
    
    // Animation loop
    let animationId: number;
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw earth
      drawEarth();
      
      // Draw orbit lines
      orbits.forEach(orbit => {
        ctx.beginPath();
        for (let i = 0; i <= orbit.segments; i++) {
          const angle = (i / orbit.segments) * Math.PI * 2 + orbit.offset + time * orbit.speed;
          const x = centerX + Math.cos(angle) * orbit.radius;
          const y = centerY + Math.sin(angle) * orbit.radius;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = `hsla(${orbit.hue}, 80%, 60%, 0.3)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      
      // Draw and update points
      points.forEach(point => {
        // Update position
        point.angle += point.speed;
        point.x = centerX + Math.cos(point.angle) * point.distance;
        point.y = centerY + Math.sin(point.angle) * point.distance;
        
        // Draw point
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${point.hue}, 70%, 60%, 0.8)`;
        ctx.fill();
        
        // Draw glow
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size * 2, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, point.size * 2
        );
        gradient.addColorStop(0, `hsla(${point.hue}, 70%, 60%, 0.4)`);
        gradient.addColorStop(1, `hsla(${point.hue}, 70%, 60%, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
};

export default EarthVisualization;
