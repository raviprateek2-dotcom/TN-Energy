"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Zap,
  Activity,
  BarChart3,
  TrendingUp,
  FileText,
  Clock,
  ShieldCheck,
  ChevronDown,
  Building2,
  ExternalLink,
  Phone,
  Radio,
  Sliders,
  DollarSign,
} from "lucide-react";
import { BRAND } from "@/lib/constants/brand";

const PORTAL_NAV = [
  { href: "/portal/dashboard", label: "Overview", icon: BarChart3 },
  { href: "/portal/bidding-console", label: "15-Min Bidding Console", icon: Activity, badge: "Live Bourse" },
  { href: "/portal/telemetry", label: "SCADA & ABT Telemetry", icon: Zap, badge: "96-Block" },
  { href: "/portal/savings-dashboard", label: "Invoice Reconciliation", icon: TrendingUp },
  { href: "/portal/documents", label: "Statutory Documents", icon: FileText },
];

const DEMO_PLANTS = [
  { id: "p1", name: "Century Plyboards (I) Ltd", demand: "7,500 kVA", state: "West Bengal (WBSETCL)", voltage: "33 kV" },
  { id: "p2", name: "DS Group FMCG Campus", demand: "6,800 kVA", state: "Uttar Pradesh (PVVNL)", voltage: "33 kV" },
  { id: "p3", name: "DCM Shriram Chlor-Alkali", demand: "12,000 kVA", state: "Gujarat (GETCO)", voltage: "66 kV" },
];

function getIstTimeBlock() {
  const now = new Date();
  const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  const istMinutes = (utcMinutes + 330) % 1440;
  const block = Math.floor(istMinutes / 15) + 1;

  const startHour = Math.floor((block - 1) / 4);
  const startMin = ((block - 1) % 4) * 15;
  const endHour = Math.floor(block / 4);
  const endMin = (block % 4) * 15;

  const pad = (n: number) => n.toString().padStart(2, "0");
  const timeWindow = `${pad(startHour)}:${pad(startMin)}–${pad(endHour)}:${pad(endMin)} IST`;

  let session = "Base Load";
  if (block >= 25 && block <= 64) session = "Solar GDAM Generation";
  else if (block >= 73 && block <= 90) session = "Evening Peak (ToD Active)";
  else if (block >= 91 || block <= 24) session = "Night Off-Peak Valley";

  return { block, timeWindow, session };
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [selectedPlant, setSelectedPlant] = useState(DEMO_PLANTS[0]);
  const [plantDropdownOpen, setPlantDropdownOpen] = useState(false);
  const [timeBlock, setTimeBlock] = useState(getIstTimeBlock);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeBlock(getIstTimeBlock());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col font-sans selection:bg-[#F8BC26]/30 selection:text-white">
      {/* =========================================================================
          COCKPIT TOP CONTROL STRIP (TELEMETRY & FACILITY SWITCHER)
         ========================================================================= */}
      <header className="border-b border-slate-800/80 bg-[#090E1F]/95 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Left: Brand Identity & Portal Pill */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              <Link href="/portal/dashboard" className="flex items-center space-x-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F8BC26] to-[#E5A812] flex items-center justify-center text-[#1C2C34] shadow-lg shadow-[#F8BC26]/20 group-hover:scale-105 transition-transform">
                  <Zap className="w-5 h-5 fill-current stroke-[2.5]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-sm tracking-tight text-white flex items-center">
                    TOPNOTCH <span className="text-[#F8BC26] ml-1">PORTAL</span>
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
                    C&amp;I Power Exchange Desk
                  </span>
                </div>
              </Link>

              {/* Plant Switcher Dropdown */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setPlantDropdownOpen(!plantDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-slate-700/70 text-xs font-mono text-slate-200 transition-colors"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#F8BC26]" />
                  <span className="font-bold max-w-[180px] truncate">{selectedPlant.name}</span>
                  <span className="text-slate-400">({selectedPlant.demand})</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {plantDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-72 bg-[#0E1628] border border-slate-700 rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800">
                      Switch Facility Portfolio
                    </div>
                    {DEMO_PLANTS.map((plant) => (
                      <button
                        key={plant.id}
                        onClick={() => {
                          setSelectedPlant(plant);
                          setPlantDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl text-xs font-mono transition-colors flex flex-col space-y-0.5 ${
                          selectedPlant.id === plant.id
                            ? "bg-[#F8BC26]/10 text-[#F8BC26] border border-[#F8BC26]/30"
                            : "text-slate-300 hover:bg-white/5"
                        }`}
                      >
                        <span className="font-bold">{plant.name}</span>
                        <span className="text-[10px] text-slate-400">
                          {plant.demand} • {plant.voltage} • {plant.state}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Center: Live 15-Min IST Time Block & Frequency Ticker */}
            <div className="hidden lg:flex items-center space-x-3 bg-white/5 px-3.5 py-1.5 rounded-full border border-slate-700/60 text-xs font-mono">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-400">IST Block #{timeBlock.block}:</span>
                <span className="text-white font-bold">{timeBlock.timeWindow}</span>
              </div>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400 font-semibold">{timeBlock.session}</span>
              <span className="text-slate-600">|</span>
              <span className="text-[#F8BC26] font-bold">50.012 Hz Normal</span>
            </div>

            {/* Right: Hotline Desk & Return to Marketing Portal */}
            <div className="flex items-center space-x-3">
              <a
                href={`tel:${BRAND.contacts.phonePrimary}`}
                className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-mono font-bold transition-colors"
                title="Direct phone link to 24x7 NOC Floor"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>NOC Floor: {BRAND.contacts.phonePrimary}</span>
              </a>

              <Link
                href="/"
                className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-slate-700/60 text-xs font-mono transition-colors"
              >
                <span>Main Site</span>
                <ExternalLink className="w-3 h-3 ml-0.5 text-slate-400" />
              </Link>
            </div>

          </div>
        </div>

        {/* Sub-Navigation Bar */}
        <div className="border-t border-slate-800/80 bg-[#060A16]/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-1 overflow-x-auto py-2 scrollbar-none">
              {PORTAL_NAV.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-[#F8BC26] text-[#1C2C34] font-bold shadow-md shadow-[#F8BC26]/20"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                    {item.badge && !isActive && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Portal Viewport */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {children}
      </div>

      {/* Portal Footnote & Statutory NOC Status */}
      <footer className="border-t border-slate-800/80 bg-[#060913] py-6 px-4 sm:px-6 lg:px-8 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>POSOCO / NOAR Automated Gateway Active • CERC Cat-IV Advisory License</span>
          </div>
          <div className="text-slate-400 text-center sm:text-right">
            Confidential B2B Client Portal • Encrypted AES-256 Telemetry Feed
          </div>
        </div>
      </footer>
    </div>
  );
}
