
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
    
    // Create Earth texture
    const earthImg = new Image();
    earthImg.src = 'https://assets.codepen.io/123456/earth-map.jpg'; // Fallback to a simple color if image fails to load
    
    // Create cloud texture (optional)
    const cloudsImg = new Image();
    cloudsImg.src = 'https://assets.codepen.io/123456/earth-clouds.png';
    
    // Rotation angles
    let rotationY = 0;
    const rotationSpeed = 0.005;
    
    // Points for orbit lines and satellites
    const points = [];
    const orbits = [];
    
    // Create points (satellites)
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = earthRadius * (1.2 + Math.random() * 0.5);
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
    for (let i = 0; i < 5; i++) {
      const radius = earthRadius * (1.2 + i * 0.15);
      const segments = 50;
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
    
    // Draw rotating Earth with texture
    const drawEarth = (time: number) => {
      rotationY += rotationSpeed;
      
      // Clear background for Earth area
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2);
      ctx.clip();
      
      // Draw basic Earth gradient as fallback
      const earthGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, earthRadius
      );
      earthGradient.addColorStop(0, 'rgba(64, 180, 230, 0.9)');
      earthGradient.addColorStop(0.5, 'rgba(30, 130, 200, 0.8)');
      earthGradient.addColorStop(1, 'rgba(0, 100, 160, 0.7)');
      
      ctx.fillStyle = earthGradient;
      ctx.fillRect(centerX - earthRadius, centerY - earthRadius, earthRadius * 2, earthRadius * 2);
      
      // Draw continents (simplified approach for 2D canvas)
      for (let lat = -90; lat < 90; lat += 15) {
        for (let lng = -180; lng < 180; lng += 15) {
          // Convert lat/lng to 3D coordinates
          const phi = (90 - lat) * (Math.PI / 180);
          const theta = (lng + rotationY * (180 / Math.PI)) * (Math.PI / 180);
          
          // Calculate 3D point
          const x = -earthRadius * Math.sin(phi) * Math.cos(theta);
          const y = earthRadius * Math.cos(phi);
          const z = earthRadius * Math.sin(phi) * Math.sin(theta);
          
          // Only draw if point is on the visible hemisphere (z > 0)
          if (z > 0) {
            // Project to 2D
            const scale = 400 / (400 - z); // Perspective scale
            const projX = centerX + x * scale;
            const projY = centerY + y * scale;
            
            // Randomize continent colors
            if (Math.random() > 0.6) {
              ctx.fillStyle = 'rgba(34, 139, 34, 0.8)'; // Green for land
              ctx.beginPath();
              ctx.arc(projX, projY, 3 * scale, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }
      
      // Draw latitude/longitude grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 0.5;
      
      // Draw longitude lines
      for (let i = 0; i < 12; i++) {
        const lng = i * 30 - 180;
        const theta = (lng + rotationY * (180 / Math.PI)) * (Math.PI / 180);
        
        ctx.beginPath();
        
        for (let lat = -90; lat <= 90; lat += 5) {
          const phi = (90 - lat) * (Math.PI / 180);
          
          // Calculate 3D point
          const x = -earthRadius * Math.sin(phi) * Math.cos(theta);
          const y = earthRadius * Math.cos(phi);
          const z = earthRadius * Math.sin(phi) * Math.sin(theta);
          
          // Only draw if point is on the visible hemisphere (z > 0)
          if (z > -earthRadius/4) {
            // Project to 2D
            const scale = 400 / (400 - z); // Perspective scale
            const projX = centerX + x * scale;
            const projY = centerY + y * scale;
            
            if (lat === -90) {
              ctx.moveTo(projX, projY);
            } else {
              ctx.lineTo(projX, projY);
            }
          }
        }
        
        ctx.stroke();
      }
      
      // Draw latitude lines
      for (let lat = -75; lat <= 75; lat += 15) {
        ctx.beginPath();
        const phi = (90 - lat) * (Math.PI / 180);
        const radius = earthRadius * Math.sin(phi);
        
        for (let lng = -180; lng <= 180; lng += 5) {
          const theta = (lng + rotationY * (180 / Math.PI)) * (Math.PI / 180);
          
          // Calculate 3D point
          const x = -radius * Math.cos(theta);
          const y = earthRadius * Math.cos(phi);
          const z = radius * Math.sin(theta);
          
          // Only draw if point is on the visible hemisphere (z > 0)
          if (z > -earthRadius/4) {
            // Project to 2D
            const scale = 400 / (400 - z); // Perspective scale
            const projX = centerX + x * scale;
            const projY = centerY + y * scale;
            
            if (lng === -180) {
              ctx.moveTo(projX, projY);
            } else {
              ctx.lineTo(projX, projY);
            }
          }
        }
        
        ctx.stroke();
      }
      
      // Add atmosphere glow
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY, earthRadius * 0.9,
        centerX, centerY, earthRadius * 1.1
      );
      glowGradient.addColorStop(0, 'rgba(140, 200, 255, 0.5)');
      glowGradient.addColorStop(1, 'rgba(140, 200, 255, 0)');
      
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, earthRadius * 1.1, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
      
      // Earth outline
      ctx.beginPath();
      ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(140, 200, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
    };
    
    // Animation loop
    let animationId: number;
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw earth
      drawEarth(time);
      
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
