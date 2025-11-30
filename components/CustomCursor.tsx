import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const lastParticleTime = useRef(0);
  const requestRef = useRef<number>(0);

  // Track mouse movement
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Check hover state on interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer');
      
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // Particle System Loop
  useEffect(() => {
    const updateParticles = (time: number) => {
      // Add new particle every ~40ms if mouse is moving
      if (time - lastParticleTime.current > 40 && mousePosition.x > 0) {
        const colors = ['#7A3AFF', '#00D0FF', '#FF47E7'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        const newParticle: Particle = {
          id: time,
          x: mousePosition.x + (Math.random() * 10 - 5),
          y: mousePosition.y + (Math.random() * 10 - 5),
          size: Math.random() * 4 + 2,
          color: randomColor,
        };
        
        setParticles(prev => [...prev.slice(-15), newParticle]); // Limit trail length
        lastParticleTime.current = time;
      }
      
      requestRef.current = requestAnimationFrame(updateParticles);
    };

    requestRef.current = requestAnimationFrame(updateParticles);
    return () => cancelAnimationFrame(requestRef.current);
  }, [mousePosition]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      
      {/* Particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0.8, scale: 1, x: particle.x, y: particle.y }}
            animate={{ opacity: 0, scale: 0, x: particle.x, y: particle.y + 10 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute rounded-full blur-[1px]"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              boxShadow: `0 0 4px ${particle.color}`
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main Cursor Follower (Ring) */}
      <motion.div
        className="absolute rounded-full border border-cyan-400 backdrop-blur-[1px]"
        animate={{
          x: mousePosition.x - (isHovering ? 24 : 12),
          y: mousePosition.y - (isHovering ? 24 : 12),
          width: isHovering ? 48 : 24,
          height: isHovering ? 48 : 24,
          borderColor: isHovering ? '#7A3AFF' : '#00D0FF',
          backgroundColor: isHovering ? 'rgba(122, 58, 255, 0.1)' : 'transparent',
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          mass: 0.5
        }}
        style={{
          boxShadow: isHovering ? '0 0 20px rgba(122, 58, 255, 0.4)' : '0 0 10px rgba(0, 208, 255, 0.3)'
        }}
      />

      {/* Center Dot (Instant) */}
      <div 
        className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] mix-blend-difference"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)'
        }}
      />
    </div>
  );
};

export default CustomCursor;
