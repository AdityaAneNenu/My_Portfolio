'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function LiquidBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  // Generate consistent positions for SSR
  const generatePositions = (count: number) => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      positions.push({
        left: (i * 37 + 23) % 100, // Deterministic positioning
        top: (i * 47 + 17) % 100,
        delay: i * 0.5,
        duration: 6 + (i % 4),
      });
    }
    return positions;
  };

  const orbPositions = generatePositions(12);
  const particlePositions = generatePositions(6);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };

      if (cursorRef.current) {
        cursorRef.current.style.left = (e.clientX - 10) + 'px';
        cursorRef.current.style.top = (e.clientY - 10) + 'px';
      }

      // Create cursor trail particles
      if (Math.random() > 0.8) {
        createTrailParticle(e.clientX, e.clientY);
      }
    };

    const createTrailParticle = (x: number, y: number) => {
      const particle = document.createElement('div');
      particle.className = 'fixed pointer-events-none z-40';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.width = '4px';
      particle.style.height = '4px';
      particle.style.borderRadius = '50%';
      particle.style.background = `rgba(${Math.random() > 0.5 ? 'var(--orange-glow)' : 'var(--purple-glow)'}, 0.8)`;
      particle.style.transform = 'translate(-50%, -50%)';
      particle.style.animation = 'fadeOut 1s ease-out forwards';

      document.body.appendChild(particle);

      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 1000);
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add('hover');
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove('hover');
      }
    };

    const handleMouseDown = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add('click');
      }
    };

    const handleMouseUp = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove('click');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .liquid-button, nav a');

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor" />

      {/* Liquid Background Blobs */}
      <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Main Orange Blob */}
        <motion.div
          className="blob-bg w-96 h-96 opacity-60"
          style={{
            background: `radial-gradient(circle, rgba(var(--orange-glow), 0.8) 0%, rgba(var(--orange-glow), 0.4) 40%, transparent 70%)`,
            top: '20%',
            right: '10%',
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Purple Blob */}
        <motion.div
          className="blob-bg w-80 h-80 opacity-70"
          style={{
            background: `radial-gradient(circle, rgba(var(--purple-glow), 0.9) 0%, rgba(var(--purple-glow), 0.5) 40%, transparent 70%)`,
            bottom: '15%',
            left: '15%',
          }}
          animate={{
            x: [0, -40, 60, 0],
            y: [0, 50, -20, 0],
            scale: [1, 0.9, 1.3, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />

        {/* Blue Blob */}
        <motion.div
          className="blob-bg w-72 h-72 opacity-50"
          style={{
            background: `radial-gradient(circle, rgba(var(--blue-glow), 0.7) 0%, rgba(var(--blue-glow), 0.3) 40%, transparent 70%)`,
            top: '60%',
            left: '60%',
          }}
          animate={{
            x: [0, 30, -50, 0],
            y: [0, -30, 40, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10
          }}
        />

        {/* Pink Accent Blob */}
        <motion.div
          className="blob-bg w-64 h-64 opacity-40"
          style={{
            background: `radial-gradient(circle, rgba(var(--pink-glow), 0.6) 0%, rgba(var(--pink-glow), 0.2) 40%, transparent 70%)`,
            top: '10%',
            left: '30%',
          }}
          animate={{
            x: [0, -20, 40, 0],
            y: [0, 60, -30, 0],
            scale: [1, 1.4, 0.7, 1],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 15
          }}
        />

        {/* Interactive Floating Orbs */}
        {orbPositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full opacity-40 cursor-pointer"
            style={{
              background: `rgba(var(--${['orange-glow', 'purple-glow', 'blue-glow', 'pink-glow'][i % 4]}), 0.8)`,
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              filter: 'blur(0.5px)',
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, (i % 2 === 0 ? 30 : -30), 0],
              scale: [0.5, 1.2, 0.5],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              delay: pos.delay,
              ease: "easeInOut"
            }}
            whileHover={{
              scale: 2,
              opacity: 1,
              filter: 'blur(0px)',
            }}
          />
        ))}

        {/* Cursor-following particles */}
        {particlePositions.map((pos, i) => (
          <motion.div
            key={`cursor-${i}`}
            className="absolute w-2 h-2 rounded-full opacity-20 pointer-events-none"
            style={{
              background: `rgba(var(--${i % 2 === 0 ? 'orange-glow' : 'purple-glow'}), 0.9)`,
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: [0, (i % 2 === 0 ? 100 : -100)],
              y: [0, (i % 3 === 0 ? 100 : -100)],
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </>
  );
}
