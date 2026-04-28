'use client';

import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

export default function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 1000 : 120,
    damping: prefersReducedMotion ? 100 : 25,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-neon-green origin-left pointer-events-none"
    />
  );
}
