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
      
      // Set canvas size with some padding to prevent clipping
      canvas.width = parentElement.clientWidth;
      canvas.height = parentElement.clientHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Animation properties
    // Reduce the radius slightly to prevent clipping at edges
    const earthRadius = Math.min(canvas.width, canvas.height) * 0.33;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Rotation angles and tilt
    let rotationY = 0;
    let rotationX = Math.PI * 0.15; // Add tilt angle (around 23.5 degrees)
    const rotationSpeed = 0.005;
    
    // Points for orbit lines and satellites
    const points = [];
    const orbits = [];
    
    // Inner Earth layers
    const innerLayers = [
      { radius: earthRadius * 0.6, color: '#e67e22', name: 'Core' },  // Orange/yellow for core
      { radius: earthRadius * 0.75, color: '#c0392b', name: 'Mantle' },  // Red for mantle
      { radius: earthRadius * 0.9, color: '#7f8c8d', name: 'Crust' }   // Gray for crust
    ];
    
    // Create points (satellites)
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const inclination = (Math.random() - 0.5) * Math.PI * 0.5; // Orbital inclination
      const distance = earthRadius * (1.2 + Math.random() * 0.6);
      const speed = 0.0005 + Math.random() * 0.001;
      const size = 1 + Math.random() * 3;
      const hue = 120 + Math.random() * 60; // Green to teal
      
      points.push({
        angle,
        inclination,
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
      const inclination = (Math.random() - 0.5) * Math.PI * 0.3; // Orbital inclination
      
      orbits.push({
        radius,
        segments,
        speed,
        hue,
        inclination,
        offset: Math.random() * Math.PI * 2,
      });
    }
    
    // Convert 3D coordinates to 2D with perspective
    const projectPoint = (x: number, y: number, z: number) => {
      // Apply perspective
      const scale = 400 / (400 - z);
      return {
        x: centerX + x * scale,
        y: centerY + y * scale,
        z: z,
        visible: z > -earthRadius * 0.5
      };
    };
    
    // Convert spherical to cartesian coordinates
    const sphericalToCartesian = (radius: number, theta: number, phi: number) => {
      // theta: longitude, phi: latitude
      return {
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.cos(phi),
        z: radius * Math.sin(phi) * Math.sin(theta),
      };
    };
    
    // Draw rotating Earth with texture and internal structure
    const drawEarth = (time: number) => {
      rotationY += rotationSpeed;
      
      // Clear background
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw orbit lines with inclination
      orbits.forEach(orbit => {
        ctx.beginPath();
        
        for (let i = 0; i <= orbit.segments; i++) {
          const angle = (i / orbit.segments) * Math.PI * 2 + orbit.offset + time * orbit.speed;
          
          // Calculate point on inclined orbit
          const { x, y, z } = sphericalToCartesian(
            orbit.radius,
            angle,
            Math.PI / 2 + orbit.inclination * Math.sin(angle)
          );
          
          // Rotate around Earth's axis
          const rotatedX = x * Math.cos(rotationY) - z * Math.sin(rotationY);
          const rotatedZ = x * Math.sin(rotationY) + z * Math.cos(rotationY);
          
          // Apply Earth's tilt
          const tiltedY = y * Math.cos(rotationX) - rotatedZ * Math.sin(rotationX);
          const tiltedZ = y * Math.sin(rotationX) + rotatedZ * Math.cos(rotationX);
          
          const projected = projectPoint(rotatedX, tiltedY, tiltedZ);
          
          if (i === 0) {
            ctx.moveTo(projected.x, projected.y);
          } else {
            ctx.lineTo(projected.x, projected.y);
          }
        }
        
        ctx.strokeStyle = `hsla(${orbit.hue}, 80%, 60%, 0.3)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      
      // Draw and update points (satellites)
      points.forEach(point => {
        // Update position
        point.angle += point.speed;
        
        // Calculate 3D position with inclination
        const { x, y, z } = sphericalToCartesian(
          point.distance,
          point.angle,
          Math.PI / 2 + point.inclination * Math.sin(point.angle)
        );
        
        // Rotate around Earth's axis
        const rotatedX = x * Math.cos(rotationY) - z * Math.sin(rotationY);
        const rotatedZ = x * Math.sin(rotationY) + z * Math.cos(rotationY);
        
        // Apply Earth's tilt
        const tiltedY = y * Math.cos(rotationX) - rotatedZ * Math.sin(rotationX);
        const tiltedZ = y * Math.sin(rotationX) + rotatedZ * Math.cos(rotationX);
        
        const projected = projectPoint(rotatedX, tiltedY, tiltedZ);
        
        if (projected.visible) {
          // Draw point
          ctx.beginPath();
          ctx.arc(projected.x, projected.y, point.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${point.hue}, 70%, 60%, 0.8)`;
          ctx.fill();
          
          // Draw glow
          ctx.beginPath();
          ctx.arc(projected.x, projected.y, point.size * 2, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(
            projected.x, projected.y, 0,
            projected.x, projected.y, point.size * 2
          );
          gradient.addColorStop(0, `hsla(${point.hue}, 70%, 60%, 0.4)`);
          gradient.addColorStop(1, `hsla(${point.hue}, 70%, 60%, 0)`);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });
      
      // Draw Earth's cross-section (half-cut Earth showing layers)
      ctx.save();
      
      // Draw Earth's internal layers
      innerLayers.forEach(layer => {
        ctx.beginPath();
        
        // Draw layers as a semicircle first
        for (let phi = Math.PI * 0.5; phi <= Math.PI * 1.5; phi += Math.PI / 50) {
          for (let theta = 0; theta <= Math.PI; theta += Math.PI / 50) {
            const { x, y, z } = sphericalToCartesian(layer.radius, theta, phi);
            
            // Rotate around Earth's axis
            const rotatedX = x * Math.cos(rotationY) - z * Math.sin(rotationY);
            const rotatedZ = x * Math.sin(rotationY) + z * Math.cos(rotationY);
            
            // Apply Earth's tilt
            const tiltedY = y * Math.cos(rotationX) - rotatedZ * Math.sin(rotationX);
            const tiltedZ = y * Math.sin(rotationX) + rotatedZ * Math.cos(rotationX);
            
            const projected = projectPoint(rotatedX, tiltedY, tiltedZ);
            
            if (projected.visible) {
              if (theta === 0 && phi === Math.PI * 0.5) {
                ctx.moveTo(projected.x, projected.y);
              } else {
                ctx.lineTo(projected.x, projected.y);
              }
            }
          }
        }
        
        ctx.fillStyle = layer.color;
        ctx.globalAlpha = 0.5;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });
      
      ctx.restore();
      
      // Draw Earth's surface
      ctx.save();
      ctx.beginPath();
      
      // Draw surface as a sphere
      for (let phi = 0; phi <= Math.PI; phi += Math.PI / 30) {
        for (let theta = 0; theta <= Math.PI * 2; theta += Math.PI / 30) {
          const { x, y, z } = sphericalToCartesian(earthRadius, theta, phi);
          
          // Rotate around Earth's axis
          const rotatedX = x * Math.cos(rotationY) - z * Math.sin(rotationY);
          const rotatedZ = x * Math.sin(rotationY) + z * Math.cos(rotationY);
          
          // Apply Earth's tilt
          const tiltedY = y * Math.cos(rotationX) - rotatedZ * Math.sin(rotationX);
          const tiltedZ = y * Math.sin(rotationX) + rotatedZ * Math.cos(rotationX);
          
          const projected = projectPoint(rotatedX, tiltedY, tiltedZ);
          
          if (projected.visible) {
            // Continents (simplified approach)
            if (Math.random() > 0.75) {
              ctx.fillStyle = 'rgba(34, 139, 34, 0.8)'; // Green for land
              ctx.beginPath();
              ctx.arc(projected.x, projected.y, 2, 0, Math.PI * 2);
              ctx.fill();
            } else if (projected.z > earthRadius * 0.8) {
              ctx.fillStyle = 'rgba(64, 164, 223, 0.8)'; // Blue for water
              ctx.beginPath();
              ctx.arc(projected.x, projected.y, 2, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }
      
      // Draw latitude/longitude grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 0.5;
      
      // Draw longitude lines
      for (let i = 0; i < 12; i++) {
        const lng = i * 30 - 180;
        const theta = (lng + rotationY * (180 / Math.PI)) * (Math.PI / 180);
        
        ctx.beginPath();
        
        for (let lat = -90; lat <= 90; lat += 5) {
          const phi = (90 - lat) * (Math.PI / 180);
          
          // Calculate 3D point
          const { x, y, z } = sphericalToCartesian(earthRadius, theta, phi);
          
          // Rotate around Earth's axis
          const rotatedX = x * Math.cos(rotationY) - z * Math.sin(rotationY);
          const rotatedZ = x * Math.sin(rotationY) + z * Math.cos(rotationY);
          
          // Apply Earth's tilt
          const tiltedY = y * Math.cos(rotationX) - rotatedZ * Math.sin(rotationX);
          const tiltedZ = y * Math.sin(rotationX) + rotatedZ * Math.cos(rotationX);
          
          const projected = projectPoint(rotatedX, tiltedY, tiltedZ);
          
          if (projected.visible) {
            if (lat === -90) {
              ctx.moveTo(projected.x, projected.y);
            } else {
              ctx.lineTo(projected.x, projected.y);
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
          const { x, y, z } = sphericalToCartesian(earthRadius, theta, phi);
          
          // Rotate around Earth's axis
          const rotatedX = x * Math.cos(rotationY) - z * Math.sin(rotationY);
          const rotatedZ = x * Math.sin(rotationY) + z * Math.cos(rotationY);
          
          // Apply Earth's tilt
          const tiltedY = y * Math.cos(rotationX) - rotatedZ * Math.sin(rotationX);
          const tiltedZ = y * Math.sin(rotationX) + rotatedZ * Math.cos(rotationX);
          
          const projected = projectPoint(rotatedX, tiltedY, tiltedZ);
          
          if (projected.visible) {
            if (lng === -180) {
              ctx.moveTo(projected.x, projected.y);
            } else {
              ctx.lineTo(projected.x, projected.y);
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
    };
    
    // Animation loop
    let animationId: number;
    const animate = (time: number) => {
      // Draw earth with layers and tilt
      drawEarth(time / 1000);
      
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
      style={{ maxWidth: '100%' }}
    />
  );
};

export default EarthVisualization;
