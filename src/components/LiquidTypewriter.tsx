'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LiquidTypewriterProps {
  text: string;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export default function LiquidTypewriter({
  text,
  delay = 30,
  className = '',
  onComplete
}: LiquidTypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, delay, isComplete, onComplete]);

  return (
    <span className={`relative ${className}`}>
      {displayText.split('').map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.2,
            delay: index * 0.01,
            ease: "easeOut"
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}

      {!isComplete && (
        <motion.span
          className="inline-block w-0.5 h-[1em] ml-1 bg-gradient-to-b from-orange-400 to-purple-400"
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </span>
  );
}

// Enhanced version with word-by-word animation
export function LiquidTypewriterWords({ 
  text, 
  delay = 100, 
  className = '', 
  onComplete 
}: LiquidTypewriterProps) {
  const words = text.split(' ');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentWordIndex < words.length) {
      const timer = setTimeout(() => {
        setCurrentWordIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentWordIndex, words.length, delay, isComplete, onComplete]);

  return (
    <span className={`relative ${className}`}>
      {words.slice(0, currentWordIndex + 1).map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          initial={{ opacity: 0, y: 30, rotateX: -90 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            rotateX: 0,
          }}
          transition={{
            duration: 0.6,
            delay: wordIndex * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="inline-block mr-2"
          style={{
            filter: `drop-shadow(0 0 15px rgba(var(--orange-glow), 0.4))`
          }}
        >
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: wordIndex * 0.1 + charIndex * 0.03,
                ease: "backOut"
              }}
              className="inline-block"
              whileHover={{
                scale: 1.1,
                color: `rgba(var(--purple-glow), 1)`,
                transition: { duration: 0.2 }
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      ))}
      
      {!isComplete && (
        <motion.span
          className="inline-block w-1 h-[1em] ml-1 rounded-full"
          style={{
            background: `linear-gradient(180deg, 
              rgba(var(--orange-glow), 1) 0%, 
              rgba(var(--purple-glow), 1) 100%)`
          }}
          animate={{
            opacity: [0, 1, 0],
            scaleY: [1, 1.5, 1],
            boxShadow: [
              '0 0 10px rgba(var(--orange-glow), 0.5)',
              '0 0 20px rgba(var(--purple-glow), 0.8)',
              '0 0 10px rgba(var(--orange-glow), 0.5)'
            ]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </span>
  );
}
