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
    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-[#0B192C] to-[#0F2238] border-2 border-blue-400/60 flex items-center justify-center p-3 sm:p-3.5 shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Steel Ingot Arcs */}
        <path d="M15 68 L36 22 L52 22 L31 68 Z" fill="#E11D24" />
        <path d="M41 68 L62 22 L78 22 L57 68 Z" fill="#0072CE" />
        <path d="M67 68 L88 22 L100 22 L83 68 Z" fill="#FFFFFF" />
        <rect x="10" y="74" width="80" height="3" fill="#0072CE" rx="1.5" />
        <text x="50%" y="94%" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="2">
          JSW
        </text>
      </svg>
    </div>
  ),

  DSGroup: (
    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-[#062419] to-[#0A3D2C] border-2 border-emerald-400/60 flex items-center justify-center p-3 sm:p-3.5 shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="50" cy="46" r="38" stroke="#10B981" strokeWidth="4" strokeDasharray="7 3.5" />
        <path d="M50 14 L68 46 L50 78 L32 46 Z" fill="#F59E0B" />
        <circle cx="50" cy="46" r="16" fill="#064E3B" stroke="#34D399" strokeWidth="2" />
        <text x="50" y="52" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="900" fontFamily="system-ui, sans-serif">
          DS
        </text>
        <text x="50%" y="93%" textAnchor="middle" fill="#A7F3D0" fontSize="11" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="1.5">
          DS GROUP
        </text>
      </svg>
    </div>
  ),

  VarunBeverages: (
    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-[#081C3D] to-[#0D2E68] border-2 border-blue-400/60 flex items-center justify-center p-3 sm:p-3.5 shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="50" cy="45" r="38" fill="#004B93" stroke="#3B82F6" strokeWidth="2" />
        <path d="M14 45 Q50 16 86 45 Q50 74 14 45 Z" fill="#E31B23" />
        <path d="M22 45 Q50 28 78 45 Q50 62 22 45 Z" fill="#FFFFFF" />
        <circle cx="50" cy="45" r="12" fill="#004B93" />
        <text x="50" y="50" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="1">
          VBL
        </text>
        <text x="50%" y="94%" textAnchor="middle" fill="#BFDBFE" fontSize="10" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="1">
          VARUN BEV
        </text>
      </svg>
    </div>
  ),

  KandhariBeverages: (
    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-[#2D0A14] to-[#4C0D1E] border-2 border-rose-400/60 flex items-center justify-center p-3 sm:p-3.5 shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="50" cy="45" r="38" fill="#E11D48" stroke="#FDA4AF" strokeWidth="2" />
        <path d="M18 56 C36 42, 64 42, 82 56 C64 48, 36 48, 18 56 Z" fill="#FFFFFF" />
        <path d="M20 36 C38 24, 62 24, 80 36 C62 30, 38 30, 20 36 Z" fill="#FFFFFF" opacity="0.85" />
        <text x="50" y="50" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="1">
          KBL
        </text>
        <text x="50%" y="94%" textAnchor="middle" fill="#FECDD3" fontSize="10" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="1">
          KANDHARI
        </text>
      </svg>
    </div>
  ),

  GujaratSynthetics: (
    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-[#230C38] to-[#3B125E] border-2 border-purple-400/60 flex items-center justify-center p-3 sm:p-3.5 shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="14" y="12" width="72" height="66" rx="16" fill="#581C87" stroke="#A855F7" strokeWidth="2" />
        <path d="M26 30 H74 M26 45 H74 M26 60 H74" stroke="#F8BC26" strokeWidth="6" strokeLinecap="round" />
        <path d="M34 22 V68 M50 22 V68 M66 22 V68" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
        <text x="50%" y="93%" textAnchor="middle" fill="#E9D5FF" fontSize="10" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="1">
          GUJ SYNTHETICS
        </text>
      </svg>
    </div>
  ),

  DCMShriram: (
    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-[#06202A] to-[#0A384A] border-2 border-cyan-400/60 flex items-center justify-center p-3 sm:p-3.5 shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Chemical Benzene / Crystal Lattice */}
        <polygon points="50,10 82,28 82,64 50,82 18,64 18,28" stroke="#06B6D4" strokeWidth="5" fill="#083344" />
        <polygon points="50,22 72,35 72,57 50,70 28,57 28,35" stroke="#38BDF8" strokeWidth="2" fill="none" opacity="0.6" />
        <circle cx="50" cy="46" r="15" fill="#38BDF8" />
        <text x="50" y="51" textAnchor="middle" fill="#0A0F1D" fontSize="13" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.5">
          DCM
        </text>
        <text x="50%" y="94%" textAnchor="middle" fill="#BAE6FD" fontSize="10" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="1">
          DCM SHRIRAM
        </text>
      </svg>
    </div>
  ),

  GangaPaperMills: (
    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-[#072522] to-[#0B423D] border-2 border-teal-400/60 flex items-center justify-center p-3 sm:p-3.5 shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="50" cy="45" r="38" fill="#115E59" stroke="#2DD4BF" strokeWidth="2" />
        <path d="M26 66 C26 38, 50 26, 74 22 C70 46, 52 70, 26 66 Z" fill="#2DD4BF" />
        <path d="M35 60 C35 42, 50 34, 66 30" stroke="#FFFFFF" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <text x="50%" y="94%" textAnchor="middle" fill="#99F6E4" fontSize="10" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="1">
          GANGA PAPER
        </text>
      </svg>
    </div>
  ),

  RadicoKhaitan: (
    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-[#120F33] to-[#1F1B52] border-2 border-amber-400/60 flex items-center justify-center p-3 sm:p-3.5 shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M50 10 L82 26 V58 C82 76 50 88 50 88 C50 88 18 76 18 58 V26 Z" fill="#1E1B4B" stroke="#F59E0B" strokeWidth="4" />
        <polygon points="50,28 54,39 65,39 57,46 60,57 50,50 40,57 43,46 35,39 46,39" fill="#F8BC26" />
        <text x="50" y="68" textAnchor="middle" fill="#FDE68A" fontSize="14" fontWeight="900" fontFamily="system-ui, sans-serif">
          RKL
        </text>
        <text x="50%" y="96%" textAnchor="middle" fill="#FDE68A" fontSize="9" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="1">
          RADICO KHAITAN
        </text>
      </svg>
    </div>
  ),

  CenturyPly: (
    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-[#2D1606] to-[#4A240A] border-2 border-amber-400/60 flex items-center justify-center p-3 sm:p-3.5 shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="14" y="12" width="72" height="66" rx="10" fill="#78350F" stroke="#F59E0B" strokeWidth="2" />
        <path d="M22 28 H78 M22 45 H78 M22 62 H78" stroke="#FDE68A" strokeWidth="5" />
        <path d="M50 12 V78" stroke="#D97706" strokeWidth="5" />
        <text x="50%" y="93%" textAnchor="middle" fill="#FEF3C7" fontSize="10" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="1">
          CENTURY PLY
        </text>
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
            className={`group relative w-[420px] sm:w-[480px] rounded-3xl overflow-hidden border ${client.borderColor} ${client.cardBg} shadow-sm ${client.hoverShadow} transition-all duration-300 flex flex-col justify-between p-6 sm:p-7 flex-shrink-0`}
          >
            {/* Background Photographic Layer with Dual Gradient Mask */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src={client.bgImage}
                alt={`${client.name} industrial manufacturing facility`}
                fill
                sizes="480px"
                className="object-cover object-center opacity-10 group-hover:opacity-25 group-hover:scale-108 transition-all duration-700 filter grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-white/75 to-transparent" />
            </div>

            {/* Top Bar: Regional & Open Access Classification */}
            <div className="relative z-10 flex items-center justify-between gap-2 mb-3.5">
              <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold ${client.tagColor} border shadow-2xs`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{client.state}</span>
                <span className="text-slate-400">|</span>
                <span>{client.discom}</span>
              </span>

              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-extrabold bg-emerald-100/80 border border-emerald-300 px-2.5 py-0.5 rounded-full shadow-2xs">
                Section 42 Captive
              </span>
            </div>

            {/* Main Brand Row: Large Corporate Logo Mark + Name & Category */}
            <div className="relative z-10 flex items-center space-x-5">
              {client.logo}
              <div className="flex flex-col text-left">
                <h4 className="text-xl sm:text-2xl font-black text-[#1C2C34] tracking-tight group-hover:text-[#D97706] transition-colors leading-tight">
                  {client.name}
                </h4>
                <span className="text-xs sm:text-sm font-mono font-semibold text-slate-500 mt-1">
                  {client.category}
                </span>
                <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-emerald-800 mt-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  <span>{client.demand}</span>
                </div>
              </div>
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
