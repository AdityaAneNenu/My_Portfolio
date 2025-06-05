'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function LiquidBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Minimal positions for better performance
  const generatePositions = (count: number) => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      positions.push({
        left: (i * 40 + 20) % 100,
        top: (i * 50 + 15) % 100,
        delay: i * 1,
        duration: 8 + (i % 2),
      });
    }
    return positions;
  };

  // Significantly reduced particle count
  const orbPositions = generatePositions(isMobile ? 2 : 3);

  useEffect(() => {
    // Skip cursor effects on mobile for better performance
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = (e.clientX - 10) + 'px';
        cursorRef.current.style.top = (e.clientY - 10) + 'px';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  return (
    <>
      {/* Custom Cursor - Only on desktop */}
      {!isMobile && <div ref={cursorRef} className="custom-cursor" />}

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

        {/* Simplified Floating Orbs - Desktop only */}
        {!isMobile && orbPositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-30"
            style={{
              background: `rgba(var(--${['orange-glow', 'purple-glow'][i % 2]}), 0.6)`,
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              delay: pos.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </>
  );
}
