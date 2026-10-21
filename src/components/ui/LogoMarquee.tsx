"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { TrendingDown, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export interface MarqueeClient {
  name: string;
  category: string;
  demand: string;
  tariffBefore: string;
  tariffAfter: string;
  savings: string;
  state: string;
  discom: string;
  bgImage: string;
  logo: React.ReactNode;
  cardBg: string;
  borderColor: string;
  hoverShadow: string;
  tagColor: string;
}

// Vector SVG Corporate Brand Logos
const ClientLogos = {
  JSW: (
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#0F2238] border border-blue-400/50 flex items-center justify-center p-2.5 sm:p-3 shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Steel Ingot Arcs */}
        <path d="M15 70 L35 25 L50 25 L30 70 Z" fill="#D71920" />
        <path d="M40 70 L60 25 L75 25 L55 70 Z" fill="#0072CE" />
        <path d="M65 70 L85 25 L100 25 L80 70 Z" fill="#FFFFFF" />
        <text x="50%" y="94%" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">
          JSW
        </text>
      </svg>
    </div>
  ),

  DSGroup: (
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center p-2.5 sm:p-3 shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="50" cy="50" r="42" stroke="#10B981" strokeWidth="4" strokeDasharray="6 3" />
        <path d="M50 18 L68 50 L50 82 L32 50 Z" fill="#F59E0B" />
        <circle cx="50" cy="50" r="14" fill="#064E3B" />
        <text x="50" y="56" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="900" fontFamily="sans-serif">
          DS
        </text>
      </svg>
    </div>
  ),

  VarunBeverages: (
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-950 border border-blue-500/50 flex items-center justify-center p-2.5 sm:p-3 shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="50" cy="50" r="42" fill="#004B93" />
        <path d="M12 50 Q50 20 88 50 Q50 78 12 50 Z" fill="#E31B23" />
        <path d="M20 50 Q50 32 80 50 Q50 66 20 50 Z" fill="#FFFFFF" />
        <text x="50" y="56" textAnchor="middle" fill="#004B93" fontSize="16" fontWeight="900" fontFamily="sans-serif">
          VBL
        </text>
      </svg>
    </div>
  ),

  KandhariBeverages: (
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-rose-950 border border-rose-500/50 flex items-center justify-center p-2.5 sm:p-3 shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="50" cy="50" r="44" fill="#E11D48" />
        <path d="M22 62 C38 48, 62 48, 78 62 C62 55, 38 55, 22 62 Z" fill="#FFFFFF" />
        <path d="M24 38 C40 26, 60 26, 76 38 C60 32, 40 32, 24 38 Z" fill="#FFFFFF" />
        <text x="50" y="54" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="900" fontFamily="sans-serif">
          KBL
        </text>
      </svg>
    </div>
  ),

  GujaratSynthetics: (
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-purple-950 border border-purple-500/50 flex items-center justify-center p-2.5 sm:p-3 shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="15" y="15" width="70" height="70" rx="16" fill="#581C87" />
        <path d="M28 35 H72 M28 50 H72 M28 65 H72" stroke="#F8BC26" strokeWidth="6" strokeLinecap="round" />
        <path d="M35 28 V72 M50 28 V72 M65 28 V72" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
      </svg>
    </div>
  ),

  DCMShriram: (
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-cyan-950 border border-cyan-500/50 flex items-center justify-center p-2.5 sm:p-3 shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Chemical Benzene / Crystal Lattice */}
        <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" stroke="#06B6D4" strokeWidth="5" fill="#083344" />
        <circle cx="50" cy="50" r="14" fill="#38BDF8" />
        <text x="50" y="55" textAnchor="middle" fill="#0A0F1D" fontSize="14" fontWeight="900" fontFamily="sans-serif">
          DCM
        </text>
      </svg>
    </div>
  ),

  GangaPaperMills: (
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-teal-950 border border-teal-500/50 flex items-center justify-center p-2.5 sm:p-3 shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="50" cy="50" r="42" fill="#115E59" />
        <path d="M28 68 C28 42, 50 30, 72 26 C68 48, 52 70, 28 68 Z" fill="#2DD4BF" />
        <path d="M36 62 C36 46, 50 38, 64 34" stroke="#FFFFFF" strokeWidth="3" fill="none" />
      </svg>
    </div>
  ),

  RadicoKhaitan: (
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-indigo-950 border border-amber-500/50 flex items-center justify-center p-2.5 sm:p-3 shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M50 15 L78 30 V60 C78 76 50 88 50 88 C50 88 22 76 22 60 V30 Z" fill="#1E1B4B" stroke="#F59E0B" strokeWidth="4" />
        <polygon points="50,34 54,44 64,44 56,50 59,60 50,54 41,60 44,50 36,44 46,44" fill="#F8BC26" />
        <text x="50" y="74" textAnchor="middle" fill="#FDE68A" fontSize="13" fontWeight="800" fontFamily="sans-serif">
          RKL
        </text>
      </svg>
    </div>
  ),

  CenturyPly: (
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-950 border border-amber-500/50 flex items-center justify-center p-2.5 sm:p-3 shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="18" y="20" width="64" height="60" rx="8" fill="#78350F" />
        <path d="M24 35 H76 M24 50 H76 M24 65 H76" stroke="#FDE68A" strokeWidth="4" />
        <path d="M48 20 V80" stroke="#B45309" strokeWidth="4" />
      </svg>
    </div>
  ),
};

const DEFAULT_CLIENTS: MarqueeClient[] = [
  {
    name: "Jindal Steel Works",
    category: "Alloy Steel & Rolling Mills",
    demand: "14,000 kVA (Continuous)",
    tariffBefore: "₹8.90/kWh",
    tariffAfter: "₹4.35/kWh",
    savings: "₹14.42 Cr/yr Saved",
    state: "Uttar Pradesh",
    discom: "PVVNL 33kV",
    bgImage: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    logo: ClientLogos.JSW,
    cardBg: "bg-gradient-to-br from-blue-50/90 via-white to-blue-50/50",
    borderColor: "border-blue-200/90 hover:border-blue-500",
    hoverShadow: "hover:shadow-[0_16px_36px_rgba(37,99,235,0.18)]",
    tagColor: "bg-blue-100/80 text-blue-800 border-blue-200",
  },
  {
    name: "DS Group",
    category: "Agro-Industrial & FMCG",
    demand: "8,500 kVA (24x7 Continuous)",
    tariffBefore: "₹8.60/kWh",
    tariffAfter: "₹4.15/kWh",
    savings: "₹10.60 Cr/yr Saved",
    state: "Uttar Pradesh",
    discom: "PVVNL 33kV",
    bgImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    logo: ClientLogos.DSGroup,
    cardBg: "bg-gradient-to-br from-emerald-50/90 via-white to-emerald-50/50",
    borderColor: "border-emerald-200/90 hover:border-emerald-500",
    hoverShadow: "hover:shadow-[0_16px_36px_rgba(16,185,129,0.18)]",
    tagColor: "bg-emerald-100/80 text-emerald-800 border-emerald-200",
  },
  {
    name: "Varun Beverages",
    category: "High-Speed Bottling & FMCG",
    demand: "12,000 kVA (Seasonal Peak)",
    tariffBefore: "₹8.75/kWh",
    tariffAfter: "₹4.40/kWh",
    savings: "₹8.80 Cr/yr Saved",
    state: "Haryana & UP",
    discom: "DHBVN / PVVNL",
    bgImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    logo: ClientLogos.VarunBeverages,
    cardBg: "bg-gradient-to-br from-sky-50/90 via-white to-sky-50/50",
    borderColor: "border-sky-200/90 hover:border-sky-500",
    hoverShadow: "hover:shadow-[0_16px_36px_rgba(14,165,233,0.18)]",
    tagColor: "bg-sky-100/80 text-sky-800 border-sky-200",
  },
  {
    name: "Kandhari Beverages",
    category: "Coca-Cola Franchisee Plant",
    demand: "6,800 kVA (Cleanroom HVAC)",
    tariffBefore: "₹8.45/kWh",
    tariffAfter: "₹4.20/kWh",
    savings: "₹5.40 Cr/yr Saved",
    state: "Punjab & Haryana",
    discom: "PSPCL / DHBVN",
    bgImage: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    logo: ClientLogos.KandhariBeverages,
    cardBg: "bg-gradient-to-br from-rose-50/90 via-white to-rose-50/50",
    borderColor: "border-rose-200/90 hover:border-rose-500",
    hoverShadow: "hover:shadow-[0_16px_36px_rgba(244,63,94,0.18)]",
    tagColor: "bg-rose-100/80 text-rose-800 border-rose-200",
  },
  {
    name: "Gujarat Synthetic Textiles",
    category: "Synthetic Weaving Park",
    demand: "18,500 kVA (Continuous)",
    tariffBefore: "₹7.95/kWh",
    tariffAfter: "₹3.90/kWh",
    savings: "₹22.26 Cr/yr Saved",
    state: "Gujarat",
    discom: "DGVCL 66kV",
    bgImage: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
    logo: ClientLogos.GujaratSynthetics,
    cardBg: "bg-gradient-to-br from-purple-50/90 via-white to-purple-50/50",
    borderColor: "border-purple-200/90 hover:border-purple-500",
    hoverShadow: "hover:shadow-[0_16px_36px_rgba(168,85,247,0.18)]",
    tagColor: "bg-purple-100/80 text-purple-800 border-purple-200",
  },
  {
    name: "DCM Shriram Industries",
    category: "Chlor-Alkali & Sugar Chemical",
    demand: "16,000 kVA (Electrolytic)",
    tariffBefore: "₹8.80/kWh",
    tariffAfter: "₹4.25/kWh",
    savings: "₹12.20 Cr/yr Saved",
    state: "Uttar Pradesh",
    discom: "MVVNL 132kV",
    bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    logo: ClientLogos.DCMShriram,
    cardBg: "bg-gradient-to-br from-cyan-50/90 via-white to-cyan-50/50",
    borderColor: "border-cyan-200/90 hover:border-cyan-500",
    hoverShadow: "hover:shadow-[0_16px_36px_rgba(6,182,212,0.18)]",
    tagColor: "bg-cyan-100/80 text-cyan-800 border-cyan-200",
  },
  {
    name: "Century Plyboards (I) Ltd",
    category: "Heavy Timber & Engineered Panels",
    demand: "7,500 kVA (Hydraulic Presses)",
    tariffBefore: "₹9.20/kWh",
    tariffAfter: "₹4.60/kWh",
    savings: "₹7.80 Cr/yr Saved",
    state: "West Bengal & Haryana",
    discom: "WBSEDCL / UHBVN",
    bgImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    logo: ClientLogos.CenturyPly,
    cardBg: "bg-gradient-to-br from-amber-50/90 via-white to-amber-50/50",
    borderColor: "border-amber-200/90 hover:border-amber-500",
    hoverShadow: "hover:shadow-[0_16px_36px_rgba(245,158,11,0.18)]",
    tagColor: "bg-amber-100/80 text-amber-800 border-amber-200",
  },
  {
    name: "Radico Khaitan",
    category: "Distillery & Bottling Complex",
    demand: "7,500 kVA (Continuous)",
    tariffBefore: "₹8.50/kWh",
    tariffAfter: "₹4.10/kWh",
    savings: "₹6.15 Cr/yr Saved",
    state: "Uttar Pradesh",
    discom: "PVVNL 33kV",
    bgImage: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80",
    logo: ClientLogos.RadicoKhaitan,
    cardBg: "bg-gradient-to-br from-indigo-50/90 via-white to-indigo-50/50",
    borderColor: "border-indigo-200/90 hover:border-indigo-500",
    hoverShadow: "hover:shadow-[0_16px_36px_rgba(99,102,241,0.18)]",
    tagColor: "bg-indigo-100/80 text-indigo-800 border-indigo-200",
  },
];

export function LogoMarquee({ clients = DEFAULT_CLIENTS }: { clients?: MarqueeClient[] }) {
  // Duplicate list for infinite smooth kinetic marquee
  const duplicated = [...clients, ...clients];

  return (
    <div className="relative w-full overflow-hidden select-none py-6">
      {/* Subtle edge fade masks */}
      <div className="absolute left-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] space-x-6 items-stretch">
        {duplicated.map((client, idx) => (
          <Link
            href="/case-studies"
            key={`${client.name}-${idx}`}
            className={`group relative w-[380px] sm:w-[440px] rounded-3xl overflow-hidden border ${client.borderColor} ${client.cardBg} shadow-sm ${client.hoverShadow} transition-all duration-300 flex flex-col justify-between p-6 sm:p-7 flex-shrink-0`}
          >
            {/* Background Photographic Layer with Dual Gradient Mask */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src={client.bgImage}
                alt={`${client.name} industrial manufacturing facility`}
                fill
                sizes="440px"
                className="object-cover object-center opacity-10 group-hover:opacity-25 group-hover:scale-108 transition-all duration-700 filter grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/70 to-transparent" />
            </div>

            {/* Top Row: Authentic Brand Logo Mark + Status Badges */}
            <div className="relative z-10 flex items-start justify-between gap-3">
              <div className="flex items-center space-x-4">
                {client.logo}
                <div className="flex flex-col text-left">
                  <h4 className="text-base sm:text-xl font-black text-[#1C2C34] tracking-tight group-hover:text-[#D97706] transition-colors leading-snug">
                    {client.name}
                  </h4>
                  <span className="text-xs font-mono font-medium text-slate-500 mt-0.5">
                    {client.category}
                  </span>
                </div>
              </div>

              <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${client.tagColor} border flex-shrink-0 shadow-2xs`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{client.state}</span>
              </span>
            </div>

            {/* Middle Row: Demand Dynamics & Landed Tariff Shift */}
            <div className="relative z-10 my-4 py-3 border-y border-slate-200/60 grid grid-cols-2 gap-3 text-left">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400 block">
                  Contract Demand
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold text-[#1C2C34]">
                  {client.demand}
                </span>
                <span className="text-[10px] text-slate-500 block font-mono">
                  {client.discom}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400 block">
                  Landed Tariff Shift
                </span>
                <div className="flex items-center space-x-1.5 font-mono text-xs sm:text-sm">
                  <span className="line-through text-rose-500 font-medium">
                    {client.tariffBefore}
                  </span>
                  <span className="text-slate-400">→</span>
                  <span className="font-black text-emerald-700">
                    {client.tariffAfter}
                  </span>
                </div>
                <span className="text-[10px] text-emerald-700 block font-mono font-bold">
                  Zero CSS / Section 42
                </span>
              </div>
            </div>

            {/* Bottom Row: Net Annual Savings Badge & View Case Study Link */}
            <div className="relative z-10 flex items-center justify-between pt-1">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/90 border border-emerald-300 text-emerald-800 text-xs font-mono font-extrabold shadow-2xs">
                <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                <span>{client.savings}</span>
              </div>

              <div className="flex items-center space-x-1 text-xs font-mono font-bold text-slate-600 group-hover:text-[#D97706] transition-colors">
                <span>Dossier</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 45s linear infinite;
        }
      `}</style>
    </div>
  );
}
