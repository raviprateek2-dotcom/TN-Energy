"use client";

import React, { useState } from "react";
import { Info, ExternalLink } from "lucide-react";

export interface RegulatoryTooltipProps {
  term: string;
  orderCitation: string;
  statutoryRule: string;
  authority: "CERC" | "SERC" | "MoP" | "CEA" | "BEE";
  gazetteUrl?: string;
  children?: React.ReactNode;
}

export function RegulatoryTooltip({
  term,
  orderCitation,
  statutoryRule,
  authority,
  gazetteUrl,
  children,
}: RegulatoryTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  const authorityColors = {
    CERC: "bg-blue-50 text-blue-800 border-blue-200",
    SERC: "bg-emerald-50 text-emerald-800 border-emerald-200",
    MoP: "bg-amber-50 text-amber-800 border-amber-200",
    CEA: "bg-purple-50 text-purple-800 border-purple-200",
    BEE: "bg-slate-100 text-slate-800 border-slate-300",
  };

  return (
    <span
      className="relative inline-block cursor-help"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
      role="tooltip"
      aria-label={`${term}: ${statutoryRule}`}
    >
      <span className="border-b-2 border-dotted border-emerald-600 font-semibold text-slate-900 hover:text-emerald-800 transition-colors">
        {children || term}
      </span>

      {isOpen && (
        <span
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-3.5 bg-white border border-slate-300 rounded-xl shadow-xl z-50 text-left pointer-events-auto animate-in fade-in zoom-in-95 duration-150 block font-sans"
        >
          <span className="flex items-center justify-between gap-2 pb-1.5 border-b border-slate-100 mb-2">
            <span className="font-black text-xs text-[#1C2C34]">{term}</span>
            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${authorityColors[authority]}`}
            >
              {authority} Statutory
            </span>
          </span>

          <span className="text-xs text-slate-600 leading-relaxed block mb-2 font-normal">
            {statutoryRule}
          </span>

          <span className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span className="truncate pr-2 font-medium">Ref: {orderCitation}</span>
            {gazetteUrl && (
              <a
                href={gazetteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-bold hover:underline inline-flex items-center flex-shrink-0"
              >
                <span>Gazette</span>
                <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
              </a>
            )}
          </span>
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-white" />
        </span>
      )}
    </span>
  );
}
