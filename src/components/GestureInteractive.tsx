'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface GestureInteractiveProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function GestureInteractive({
  children,
  className = '',
  intensity = 1
}: GestureInteractiveProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true); // Start with mobile assumption
  const [hasMounted, setHasMounted] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [15 * intensity, -15 * intensity]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-15 * intensity, 15 * intensity]);

  useEffect(() => {
    setHasMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !hasMounted || isMobile) return; // Skip on mobile for performance

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={(!hasMounted || isMobile) ? undefined : handleMouseMove}
      onMouseLeave={(!hasMounted || isMobile) ? undefined : handleMouseLeave}
      style={(!hasMounted || isMobile) ? {} : {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={(!hasMounted || isMobile) ? {} : {
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
    >
      {/* Content */}
      <div>
        {children}
      </div>
    </motion.div>
  );
}

// Simplified Magnetic effect component - Desktop only
export function MagneticElement({
  children,
  className = '',
  strength = 0.3
}: GestureInteractiveProps & { strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(true); // Start with mobile assumption
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!hasMounted || isMobile) return; // Skip on mobile

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );

      if (distance < 100) { // Reduced detection range
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const force = (100 - distance) / 100;

        setPosition({
          x: Math.cos(angle) * force * 10 * strength, // Reduced movement
          y: Math.sin(angle) * force * 10 * strength,
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [strength, hasMounted, isMobile]);

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={(!hasMounted || isMobile) ? {} : {
        x: position.x,
        y: position.y,
      }}
      transition={(!hasMounted || isMobile) ? {} : {
        type: "spring",
        stiffness: 150,
        damping: 25,
      }}
    >
      {children}
    </motion.div>
  );
}
