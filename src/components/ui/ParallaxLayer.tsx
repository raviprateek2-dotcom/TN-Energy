"use client";

import React, { useEffect, useRef, useState } from "react";

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number; // 0.1 to 0.4
  className?: string;
}

export function ParallaxLayer({
  children,
  speed = 0.2,
  className = "",
}: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    // Respect user reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let rafId: number;

    const handleScroll = () => {
      if (!layerRef.current) return;
      const rect = layerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Only calculate if visible
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const scrolled = (viewportHeight / 2 - rect.top) * speed;
        setOffsetY(scrolled);
      }
    };

    const onScroll = () => {
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return (
    <div
      ref={layerRef}
      style={{
        transform: `translate3d(0, ${offsetY}px, 0)`,
        willChange: "transform",
      }}
      className={`pointer-events-none ${className}`}
    >
      {children}
    </div>
  );
}
