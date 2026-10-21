import React from "react";

export type DividerType = "wave" | "curve" | "slant" | "layered-wave";

interface PageDividerProps {
  type?: DividerType;
  position?: "top" | "bottom";
  fillColor?: string;
  bgColor?: string;
  height?: number;
  flipHorizontal?: boolean;
  className?: string;
}

/**
 * Waaree-Inspired Fluid SVG Page Divider
 * Seamlessly merges colors between sections with organic wave, curve, slant, or layered-wave paths.
 */
export function PageDivider({
  type = "wave",
  position = "bottom",
  fillColor = "#FFFFFF",
  bgColor = "transparent",
  height = 56,
  flipHorizontal = false,
  className = "",
}: PageDividerProps) {
  const isTop = position === "top";

  return (
    <div
      className={`relative w-full overflow-hidden leading-none pointer-events-none select-none z-10 ${className}`}
      style={{
        backgroundColor: bgColor,
        transform: `${isTop ? "rotate(180deg)" : ""} ${flipHorizontal ? "scaleX(-1)" : ""}`,
      }}
      aria-hidden="true"
    >
      {type === "wave" && (
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          style={{ height: `${height}px` }}
          preserveAspectRatio="none"
        >
          <path
            d="M0,32 C288,96 576,0 864,48 C1152,96 1296,64 1440,32 L1440,120 L0,120 Z"
            fill={fillColor}
          />
        </svg>
      )}

      {type === "layered-wave" && (
        <svg
          viewBox="0 0 1440 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          style={{ height: `${height}px` }}
          preserveAspectRatio="none"
        >
          {/* Ambient secondary translucent wave for depth */}
          <path
            d="M0,48 C360,110 720,10 1080,60 C1260,85 1380,50 1440,40 L1440,140 L0,140 Z"
            fill={fillColor}
            fillOpacity={0.35}
          />
          {/* Main solid foreground wave */}
          <path
            d="M0,72 C320,130 640,30 960,80 C1200,118 1360,90 1440,70 L1440,140 L0,140 Z"
            fill={fillColor}
          />
        </svg>
      )}

      {type === "curve" && (
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          style={{ height: `${height}px` }}
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 Q720,80 1440,0 L1440,80 L0,80 Z"
            fill={fillColor}
          />
        </svg>
      )}

      {type === "slant" && (
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          style={{ height: `${height}px` }}
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 L1440,0 L1440,80 L0,80 Z"
            fill={fillColor}
          />
        </svg>
      )}
    </div>
  );
}
