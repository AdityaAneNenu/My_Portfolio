'use client';

import { motion } from 'framer-motion';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export default function TextReveal({
  children,
  className = '',
  delay = 0,
  once = true,
}: TextRevealProps) {
  const words = children.split(' ');

  return (
    <span className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.3em]">
          {word.split('').map((char, charIndex) => (
            <span key={charIndex} className="inline-block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once }}
                transition={{
                  type: 'spring',
                  damping: 12,
                  stiffness: 100,
                  delay: delay + wordIndex * 0.1 + charIndex * 0.02,
                }}
              >
                {char}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

/* Fade-up wrapper for any element */
export function FadeUp({
  children,
  className = '',
  delay = 0,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
