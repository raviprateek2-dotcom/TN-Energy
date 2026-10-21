"use client";

import React, { useRef, useState, useCallback } from "react";
import { playBreakerClick } from "@/lib/audio/switch-audio";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  magneticRadius?: number; // Distance in px before pull activates
  strength?: number; // Multiplier for movement (0.1 to 0.4)
  withAudio?: boolean;
}

export function MagneticButton({
  children,
  className = "",
  magneticRadius = 50,
  strength = 0.25,
  withAudio = true,
  onClick,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance < magneticRadius) {
        setOffset({
          x: deltaX * strength,
          y: deltaY * strength,
        });
      } else {
        setOffset({ x: 0, y: 0 });
      }
    },
    [magneticRadius, strength]
  );

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (withAudio) {
      playBreakerClick();
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: offset.x === 0 && offset.y === 0 ? "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)" : "transform 0.08s ease-out",
      }}
      className={`relative inline-flex items-center justify-center will-change-transform ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
