"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(2px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -16, filter: "blur(2px)" }}
      transition={{
        duration: 0.42,
        ease: [0.16, 1, 0.3, 1], // Cinematic high-end cubic bezier ease-out
      }}
      className="flex flex-col flex-1 w-full relative"
    >
      {/* Ambient Horizon Energy Beam on Page Change */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#F8BC26] via-emerald-400 to-transparent opacity-90 pointer-events-none" />

      {/* Atmospheric Soft Deep-Blue Transition Curtain on Route Entry */}
      <motion.div
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed inset-0 pointer-events-none z-40 bg-gradient-to-b from-[#0A0F1D]/25 via-[#0B132B]/10 to-transparent"
        aria-hidden="true"
      />

      {children}
    </motion.div>
  );
}
