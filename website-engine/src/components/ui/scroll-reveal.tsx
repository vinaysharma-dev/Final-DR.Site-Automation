"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export function ScrollReveal({ 
  children, 
  delay = 0, 
  direction = "up",
  className = "" 
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants = {
    up: { y: prefersReducedMotion ? 0 : 24, opacity: prefersReducedMotion ? 1 : 0 },
    down: { y: prefersReducedMotion ? 0 : -24, opacity: prefersReducedMotion ? 1 : 0 },
    left: { x: prefersReducedMotion ? 0 : 24, opacity: prefersReducedMotion ? 1 : 0 },
    right: { x: prefersReducedMotion ? 0 : -24, opacity: prefersReducedMotion ? 1 : 0 },
  };

  return (
    <motion.div
      initial={variants[direction]}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.4,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
