"use client";

import React, { useState } from "react";
import { MessageSquare, X, ArrowUpRight, Zap, ShieldCheck } from "lucide-react";
import { BRAND } from "@/lib/constants/brand";

export function WhatsAppFloatingDesk() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
      {/* Expanded Pill on Hover or Initial Cue */}
      {isHovered && (
        <div className="mb-2 bg-grid-navy-900/98 border border-grid-slate-700 text-white p-3 rounded-2xl shadow-2xl max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center space-x-2 text-xs font-mono text-grid-emerald-400 font-bold border-b border-grid-slate-800 pb-1.5 mb-2">
            <span className="w-2 h-2 rounded-full bg-grid-emerald-400 animate-ping" />
            <span>24x7 Bidding Desk Live</span>
          </div>
          <p className="text-[11px] text-grid-slate-300 leading-normal">
            Need instant 96-block rate clearance, emergency RTM balancing, or an Open Access feasibility check?
          </p>
          <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-grid-cyan-300">
            <span>Direct to Trading Floor</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      )}

      {/* Main Floating Button */}
      <a
        href={BRAND.contacts.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Chat with Topnotch 24x7 Bidding Desk on WhatsApp"
        className="group flex items-center bg-[#25D366] hover:bg-[#20BD5A] text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:shadow-emerald-500/30 transition-all transform hover:scale-105 active:scale-95"
      >
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline ml-2 text-xs font-bold font-mono tracking-tight text-grid-navy-950">
          24x7 Bidding Desk
        </span>
        <span className="ml-1.5 hidden sm:inline-block w-2 h-2 rounded-full bg-grid-navy-950 animate-pulse" />
      </a>
    </div>
  );
}
