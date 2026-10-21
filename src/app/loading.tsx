import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white px-4">
      <div className="flex flex-col items-center space-y-6">
        
        {/* Animated Solar Energy Spinner */}
        <div className="relative flex items-center justify-center w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-100 border-t-[#F8BC26] animate-spin" />
          <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
            <span className="w-3 h-3 rounded-full bg-[#1C2C34] animate-ping" />
          </div>
        </div>

        {/* Loading text with pulse */}
        <div className="text-center space-y-1.5">
          <p className="text-xs font-mono uppercase tracking-[0.25em] font-bold text-[#1C2C34]">
            Topnotch Energy Solutions
          </p>
          <p className="text-[11px] font-mono text-gray-400">
            Synchronizing 96-Time-Block Tariff Feeds...
          </p>
        </div>
      </div>
    </div>
  );
}
