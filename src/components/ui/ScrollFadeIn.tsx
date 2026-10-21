"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, defaultTransition } from "@/lib/animations";

interface ScrollFadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export function ScrollFadeIn({
  children,
  delay = 0,
  duration = 0.5,
  yOffset = 24,
  className = "",
}: ScrollFadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
