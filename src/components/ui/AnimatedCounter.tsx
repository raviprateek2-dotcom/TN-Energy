"use client";

import React, { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  value?: number;
  target?: number;
  duration?: number; // in milliseconds
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  target,
  duration = 1800,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: AnimatedCounterProps) {
  const finalValue = value ?? target ?? 0;
  const [displayValue, setDisplayValue] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted, prefersReducedMotion]);

  useEffect(() => {
    if (!hasStarted || prefersReducedMotion) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutExpo(progress);
      
      const current = easedProgress * finalValue;
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(finalValue);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [hasStarted, finalValue, duration, prefersReducedMotion]);

  const effectiveValue = prefersReducedMotion ? finalValue : displayValue;

  const formatted = decimals > 0 
    ? effectiveValue.toFixed(decimals) 
    : Math.floor(effectiveValue).toLocaleString("en-IN");

  return (
    <span ref={ref} className={`tabular-nums font-bold ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
