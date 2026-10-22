"use client";

import React from "react";
import {
  Award,
  ShieldCheck,
  Zap,
  Calculator,
  CheckCircle2,
  FileCheck2,
  Layers,
} from "lucide-react";

interface Accreditation {
  id: string;
  authority: string;
  title: string;
  licenceCode: string;
  scope: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badgeBg: string;
  glowColor: string;
  validity: string;
}

const ACCREDITATIONS: Accreditation[] = [
  {
    id: "cerc",
    authority: "Central Electricity Regulatory Commission",
    title: "CERC Category-IV Trading License",
    licenceCode: "Licence No: CERC/Trading/Cat-IV/2021",
    scope: "Inter-State Power Trading Advisory",
    description: "Statutory authorization under CERC PMR 2021 to execute bilateral contracts and collective exchange trading across Indian bourses.",
    icon: Award,
    accentColor: "text-amber-500",
    badgeBg: "bg-amber-500/10 border-amber-500/30",
    glowColor: "group-hover:border-amber-300",
    validity: "Active Standing",
  },
  {
    id: "noar",
    authority: "GRID-INDIA / POSOCO",
    title: "NOAR Registered Standing Entity",
    licenceCode: "National Open Access Registry: Verified",
    scope: "Pan-India Automated SLDC Clearance",
    description: "Direct electronic integration with the National Open Access Registry (NOAR) enabling automated day-ahead and real-time corridor reservation.",
    icon: ShieldCheck,
    accentColor: "text-emerald-500",
    badgeBg: "bg-emerald-500/10 border-emerald-500/30",
    glowColor: "group-hover:border-emerald-300",
    validity: "Instant e-Clearance",
  },
  {
    id: "cea",
    authority: "Central Electricity Authority",
    title: "CEA Class 0.2s ABT Metering",
    licenceCode: "CEA (Installation & Operation of Meters) Regs",
    scope: "Substation Bay Telemetry Integration",
    description: "Accredited engineering of 0.2s accuracy class Special Energy Meters (SEM), Optical Isolation Boxes, and AMR modems.",
    icon: Zap,
    accentColor: "text-sky-500",
    badgeBg: "bg-sky-500/10 border-sky-500/30",
    glowColor: "group-hover:border-sky-300",
    validity: "NABL Calibrated",
  },
  {
    id: "bee",
    authority: "Bureau of Energy Efficiency",
    title: "BEE Certified Grade-A Energy Auditors",
    licenceCode: "Energy Conservation Act 2001 Empanelment",
    scope: "Designated Consumer (DC) Plant Audits",
    description: "Accredited Grade-A energy auditors providing mandatory PAT scheme diagnostics, specific energy consumption (SEC) benchmarking, and heat-rate audits.",
    icon: Calculator,
    accentColor: "text-teal-500",
    badgeBg: "bg-teal-500/10 border-teal-500/30",
    glowColor: "group-hover:border-teal-300",
    validity: "MoP Approved",
  },
  {
    id: "iso",
    authority: "International Standards Organization",
    title: "ISO 50001 : 2018 Certified",
    licenceCode: "EnMS Industrial Energy Management Protocol",
    scope: "Continuous Decarbonization Systems",
    description: "Certified energy management governance ensuring systematic baselining, measurement, and verification of heavy industrial power reduction initiatives.",
    icon: FileCheck2,
    accentColor: "text-purple-500",
    badgeBg: "bg-purple-500/10 border-purple-500/30",
    glowColor: "group-hover:border-purple-300",
    validity: "Global ESG Audit Ready",
  },
  {
    id: "bourse",
    authority: "Power Bourses of India",
    title: "IEX & PXIL Primary Trading Member",
    licenceCode: "National Energy Exchanges Connectivity",
    scope: "15-Minute 96-Block Dispatch Operations",
    description: "Direct proprietary bidding console terminal connected to IEX, PXIL, and HPX matching collective industrial bids with sub-millisecond execution.",
    icon: Layers,
    accentColor: "text-[#F8BC26]",
    badgeBg: "bg-[#F8BC26]/10 border-[#F8BC26]/30",
    glowColor: "group-hover:border-[#F8BC26]",
    validity: "24x7 NOC Desk",
  },
];

export function AccreditationsShowcase() {
  // Duplicate badges list to ensure an infinite, seamless continuous single-line loop
  const duplicatedBadges = [...ACCREDITATIONS, ...ACCREDITATIONS];

  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* Left Gradient Edge Mask for Smooth Entrance */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
      
      {/* Right Gradient Edge Mask for Smooth Exit */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

      {/* Single Continuous Line Marquee Moving Rightwards */}
      <div className="flex w-max animate-marquee-right hover:[animation-play-state:paused] space-x-5 sm:space-x-6 items-stretch py-2">
        {duplicatedBadges.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <div
              key={`${badge.id}-${idx}`}
              className={`w-[340px] sm:w-[390px] flex-shrink-0 group relative rounded-2xl p-5 sm:p-5.5 bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between overflow-hidden ${badge.glowColor}`}
            >
              {/* Top Accent Gradient Shimmer */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent group-hover:via-[#F8BC26] transition-all duration-300" />

              <div className="space-y-3.5">
                {/* Header Row: Authority & Live Pulse Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold truncate max-w-[190px]">
                    {badge.authority}
                  </span>

                  <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-mono font-bold flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    <span>{badge.validity}</span>
                  </span>
                </div>

                {/* Medium-Sized Icon and Title */}
                <div className="flex items-start space-x-3.5">
                  <div
                    className={`w-11 h-11 rounded-xl ${badge.badgeBg} border flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200 shadow-xs`}
                  >
                    <Icon className={`w-5.5 h-5.5 ${badge.accentColor} transition-transform duration-200 group-hover:rotate-3`} />
                  </div>

                  <div className="space-y-0.5">
                    <h3 className="text-base font-bold text-[#1C2C34] tracking-tight group-hover:text-emerald-700 transition-colors leading-snug">
                      {badge.title}
                    </h3>
                    <p className="text-[11px] font-mono text-slate-600 font-medium">
                      {badge.scope}
                    </p>
                  </div>
                </div>

                {/* Concise Description */}
                <p className="text-xs text-slate-600 leading-relaxed font-sans line-clamp-2">
                  {badge.description}
                </p>
              </div>

              {/* Bottom Regulatory Registration Code */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-500 font-medium truncate max-w-[210px]" title={badge.licenceCode}>
                  {badge.licenceCode}
                </span>

                <span className="flex items-center space-x-1 font-bold flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-slate-700">Verified</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee-right {
          animation: marquee-right 36s linear infinite;
        }
      `}</style>
    </div>
  );
}