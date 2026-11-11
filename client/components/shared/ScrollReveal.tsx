'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  scale?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.65,
  y = 36,
  x = 0,
  scale = 1,
  className = '',
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y, 
        x, 
        scale: scale !== 1 ? scale : 1 
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        x: 0, 
        scale: 1 
      }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
