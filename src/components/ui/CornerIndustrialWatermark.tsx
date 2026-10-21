import React from "react";

export type IndustrialWatermarkType = "windmills" | "solar-array" | "transmission-tower" | "substation";
export type WatermarkPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface CornerIndustrialWatermarkProps {
  type?: IndustrialWatermarkType;
  position?: WatermarkPosition;
  opacity?: number;
  className?: string;
  size?: number;
}

/**
 * Waaree-Inspired Corner Industrial Background Watermark
 * Renders subtle architectural clean-energy graphics (windmills, solar arrays, transmission pylons)
 * in white section corners for an immersive, tactile industrial ambiance.
 */
export function CornerIndustrialWatermark({
  type = "windmills",
  position = "top-right",
  opacity = 0.08,
  className = "",
  size = 320,
}: CornerIndustrialWatermarkProps) {
  const positionClasses = {
    "top-left": "top-0 left-0 -translate-x-6 -translate-y-6",
    "top-right": "top-0 right-0 translate-x-6 -translate-y-6",
    "bottom-left": "bottom-0 left-0 -translate-x-6 translate-y-6",
    "bottom-right": "bottom-0 right-0 translate-x-6 translate-y-6",
  }[position];

  return (
    <div
      className={`absolute pointer-events-none select-none z-0 overflow-hidden ${positionClasses} ${className}`}
      style={{ opacity, width: `${size}px`, height: `${size}px` }}
      aria-hidden="true"
    >
      {type === "windmills" && (
        <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-slate-900">
          {/* Main Large Wind Turbine */}
          <line x1="150" y1="90" x2="150" y2="280" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <circle cx="150" cy="90" r="8" fill="currentColor" />
          {/* Rotor Blades */}
          <path d="M150 90 L150 15 C152 35 155 60 150 90 Z" fill="currentColor" />
          <path d="M150 90 L85 125 C100 115 125 105 150 90 Z" fill="currentColor" />
          <path d="M150 90 L215 125 C200 115 175 105 150 90 Z" fill="currentColor" />

          {/* Secondary Distant Wind Turbine */}
          <line x1="230" y1="140" x2="230" y2="280" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <circle cx="230" cy="140" r="6" fill="currentColor" />
          <path d="M230 140 L230 85 C232 100 234 120 230 140 Z" fill="currentColor" />
          <path d="M230 140 L180 165 C190 158 210 150 230 140 Z" fill="currentColor" />
          <path d="M230 140 L280 165 C270 158 250 150 230 140 Z" fill="currentColor" />

          {/* Wind Streamlines */}
          <path d="M30 60 C80 40 140 70 200 50" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
          <path d="M50 110 C100 90 160 120 220 100" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
        </svg>
      )}

      {type === "solar-array" && (
        <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-slate-900">
          {/* Tilted Solar PV Table 1 */}
          <polygon points="40,160 180,110 260,150 120,200" stroke="currentColor" strokeWidth="3" fill="none" />
          <line x1="75" y1="147" x2="155" y2="187" stroke="currentColor" strokeWidth="1.5" />
          <line x1="110" y1="135" x2="190" y2="175" stroke="currentColor" strokeWidth="1.5" />
          <line x1="145" y1="122" x2="225" y2="162" stroke="currentColor" strokeWidth="1.5" />
          <line x1="80" y1="180" x2="220" y2="130" stroke="currentColor" strokeWidth="1.5" />
          {/* Ground Mounting Piles */}
          <line x1="80" y1="185" x2="80" y2="240" stroke="currentColor" strokeWidth="3" />
          <line x1="120" y1="200" x2="120" y2="255" stroke="currentColor" strokeWidth="3" />
          <line x1="190" y1="175" x2="190" y2="230" stroke="currentColor" strokeWidth="3" />
          <line x1="260" y1="150" x2="260" y2="205" stroke="currentColor" strokeWidth="3" />

          {/* Tilted Solar PV Table 2 (Behind) */}
          <polygon points="70,90 190,50 260,85 140,125" stroke="currentColor" strokeWidth="2" fill="none" />
          <line x1="100" y1="80" x2="170" y2="115" stroke="currentColor" strokeWidth="1" />
          <line x1="130" y1="70" x2="200" y2="105" stroke="currentColor" strokeWidth="1" />
          <line x1="160" y1="60" x2="230" y2="95" stroke="currentColor" strokeWidth="1" />
        </svg>
      )}

      {type === "transmission-tower" && (
        <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-slate-900">
          {/* 400kV Double-Circuit Transmission Tower Pylon */}
          <polygon points="150,30 135,270 165,270" stroke="currentColor" strokeWidth="2.5" fill="none" />
          {/* Cross Bracing */}
          <line x1="145" y1="70" x2="155" y2="70" stroke="currentColor" strokeWidth="2" />
          <line x1="140" y1="120" x2="160" y2="120" stroke="currentColor" strokeWidth="2" />
          <line x1="137" y1="170" x2="163" y2="170" stroke="currentColor" strokeWidth="2" />
          <line x1="135" y1="220" x2="165" y2="220" stroke="currentColor" strokeWidth="2" />
          <line x1="145" y1="70" x2="160" y2="120" stroke="currentColor" strokeWidth="1.5" />
          <line x1="155" y1="70" x2="140" y2="120" stroke="currentColor" strokeWidth="1.5" />
          <line x1="140" y1="120" x2="163" y2="170" stroke="currentColor" strokeWidth="1.5" />
          <line x1="160" y1="120" x2="137" y2="170" stroke="currentColor" strokeWidth="1.5" />
          <line x1="137" y1="170" x2="165" y2="220" stroke="currentColor" strokeWidth="1.5" />
          <line x1="163" y1="170" x2="135" y2="220" stroke="currentColor" strokeWidth="1.5" />

          {/* Crossarms */}
          <line x1="90" y1="80" x2="210" y2="80" stroke="currentColor" strokeWidth="3" />
          <line x1="80" y1="130" x2="220" y2="130" stroke="currentColor" strokeWidth="3" />
          <line x1="95" y1="180" x2="205" y2="180" stroke="currentColor" strokeWidth="3" />

          {/* Catenary Conductor Wires */}
          <path d="M0,90 Q90,110 90,80" stroke="currentColor" strokeWidth="1.5" />
          <path d="M210,80 Q210,110 300,90" stroke="currentColor" strokeWidth="1.5" />
          <path d="M0,140 Q80,160 80,130" stroke="currentColor" strokeWidth="1.5" />
          <path d="M220,130 Q220,160 300,140" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )}

      {type === "substation" && (
        <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-slate-900">
          {/* High-Voltage Substation Busbars & Transformer */}
          <rect x="110" y="160" width="80" height="90" rx="8" stroke="currentColor" strokeWidth="3" fill="none" />
          {/* Bushing Isolators */}
          <line x1="130" y1="160" x2="130" y2="110" stroke="currentColor" strokeWidth="3" />
          <circle cx="130" cy="110" r="5" fill="currentColor" />
          <line x1="150" y1="160" x2="150" y2="100" stroke="currentColor" strokeWidth="3" />
          <circle cx="150" cy="100" r="5" fill="currentColor" />
          <line x1="170" y1="160" x2="170" y2="110" stroke="currentColor" strokeWidth="3" />
          <circle cx="170" cy="110" r="5" fill="currentColor" />
          {/* Radiator Cooling Fins */}
          <line x1="125" y1="180" x2="125" y2="230" stroke="currentColor" strokeWidth="1.5" />
          <line x1="140" y1="180" x2="140" y2="230" stroke="currentColor" strokeWidth="1.5" />
          <line x1="150" y1="180" x2="150" y2="230" stroke="currentColor" strokeWidth="1.5" />
          <line x1="160" y1="180" x2="160" y2="230" stroke="currentColor" strokeWidth="1.5" />
          <line x1="175" y1="180" x2="175" y2="230" stroke="currentColor" strokeWidth="1.5" />

          {/* Overhead Gantry Structure */}
          <line x1="60" y1="60" x2="240" y2="60" stroke="currentColor" strokeWidth="4" />
          <line x1="80" y1="60" x2="80" y2="260" stroke="currentColor" strokeWidth="3" />
          <line x1="220" y1="60" x2="220" y2="260" stroke="currentColor" strokeWidth="3" />
        </svg>
      )}
    </div>
  );
}
