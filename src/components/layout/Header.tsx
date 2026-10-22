"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Zap,
  TrendingUp,
  Sun,
  ShieldCheck,
  Calculator,
  ChevronDown,
  PhoneCall,
  Menu,
  X,
  BatteryCharging,
  Cpu,
  ArrowRight,
  ExternalLink,
  Volume2,
  VolumeX,
  Scale,
  FileText,
  FileCheck2,
} from "lucide-react";
import { BRAND } from "@/lib/constants/brand";
import { toggleAudio, playBreakerClick } from "@/lib/audio/switch-audio";

export function Header() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("tn_audio_fx");
      if (saved === "true") {
        toggleAudio(true);
        const timer = setTimeout(() => {
          setAudioEnabled(true);
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleToggleAudio = () => {
    const nextState = !audioEnabled;
    toggleAudio(nextState);
    setAudioEnabled(nextState);
    if (typeof window !== "undefined") {
      localStorage.setItem("tn_audio_fx", String(nextState));
    }
    if (nextState) {
      playBreakerClick();
    }
  };

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveMenu(null);
      setMobileMenuOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const toggleDropdown = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  // Dedicated B2B Portal has its own cockpit navigation shell
  if (pathname?.startsWith("/portal")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all">
      {/* =========================================================================
          UNIFIED SINGLE-ROW EXECUTIVE NAVBAR (72PX HEIGHT)
         ========================================================================= */}
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8" ref={navRef}>
        <div className="flex items-center justify-between h-[72px]">
          
          {/* Brand Logo & Identity (Left) */}
          <Link href="/" className="flex items-center space-x-2.5 sm:space-x-3 group flex-shrink-0 mr-3 xl:mr-6">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#F8BC26] to-[#E5A812] flex items-center justify-center text-[#1C2C34] shadow-[0_4px_16px_rgba(248,188,38,0.32)] group-hover:scale-105 transition-transform duration-200 flex-shrink-0">
              <Zap className="w-5 h-5 fill-current stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl sm:text-2xl tracking-tight text-[#1C2C34] flex items-center leading-none">
                TOPNOTCH <span className="text-[#D97706] ml-1.5">ENERGY</span>
              </span>
              <span className="text-[9px] uppercase font-mono tracking-[0.16em] text-slate-400 mt-1 font-semibold hidden xl:block">
                Power Trading &amp; Open Access
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links — 4 Streamlined Menus (Center) */}
          <nav className="hidden lg:flex items-center flex-nowrap space-x-1 xl:space-x-2">
            
            {/* 1. Solutions Master Mega-Menu */}
            <div className="relative flex-shrink-0">
              <button
                type="button"
                onClick={() => toggleDropdown("solutions")}
                className={`flex items-center px-3 py-2 text-xs xl:text-[13px] font-semibold rounded-full transition-all whitespace-nowrap flex-shrink-0 ${
                  activeMenu === "solutions" || pathname?.startsWith("/solutions")
                    ? "text-[#1C2C34] bg-slate-100 font-bold"
                    : "text-slate-700 hover:text-[#1C2C34] hover:bg-slate-100/70"
                }`}
              >
                <span>Solutions</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 ml-1 transition-transform flex-shrink-0 ${
                    activeMenu === "solutions" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeMenu === "solutions" && (
                <div className="absolute left-0 mt-3 w-[780px] bg-white border border-slate-200 rounded-3xl p-6 shadow-[0_24px_60px_rgba(0,0,0,0.12)] z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="grid grid-cols-12 gap-6">
                    {/* Left & Middle: 5 Key Capabilities (7 cols) */}
                    <div className="col-span-7 space-y-1.5">
                      <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400 px-3 pb-1">
                        Turnkey Power &amp; Renewable Solutions
                      </div>

                      <Link
                        href="/solutions/power-trading-bilateral-contracts"
                        className="block p-2.5 rounded-2xl hover:bg-amber-50/70 transition-all border border-transparent hover:border-amber-200 group"
                      >
                        <div className="flex items-center space-x-2 text-[#1C2C34] font-bold text-xs uppercase font-mono">
                          <TrendingUp className="w-3.5 h-3.5 text-[#D97706]" />
                          <span>Power Trading &amp; Bilateral Bourses</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                          Automated 96-block DAM, GDAM &amp; RTM bidding across IEX, PXIL &amp; HPX.
                        </p>
                      </Link>

                      <Link
                        href="/solutions/open-access-execution-regulatory"
                        className="block p-2.5 rounded-2xl hover:bg-emerald-50/70 transition-all border border-transparent hover:border-emerald-200 group"
                      >
                        <div className="flex items-center space-x-2 text-[#1C2C34] font-bold text-xs uppercase font-mono">
                          <Zap className="w-3.5 h-3.5 text-[#059669]" />
                          <span>Group Captive Open Access (Section 42)</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                          26% SPV equity architecture with 100% statutory waiver on CSS &amp; AS.
                        </p>
                      </Link>

                      <Link
                        href="/solutions/renewable-energy-sustainability"
                        className="block p-2.5 rounded-2xl hover:bg-cyan-50/70 transition-all border border-transparent hover:border-cyan-200 group"
                      >
                        <div className="flex items-center space-x-2 text-[#1C2C34] font-bold text-xs uppercase font-mono">
                          <Sun className="w-3.5 h-3.5 text-[#0891B2]" />
                          <span>Rooftop Solar EPC &amp; BESS Storage</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                          Onsite TOPCon bifacial modules at ₹1.55/kWh LCOE + containerized storage.
                        </p>
                      </Link>

                      <Link
                        href="/solutions/abt-metering-telemetry-infrastructure"
                        className="block p-2.5 rounded-2xl hover:bg-purple-50/70 transition-all border border-transparent hover:border-purple-200 group"
                      >
                        <div className="flex items-center space-x-2 text-[#1C2C34] font-bold text-xs uppercase font-mono">
                          <Cpu className="w-3.5 h-3.5 text-[#7C3AED]" />
                          <span>ABT 0.2s SEM Metering &amp; AMR</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                          CEA Class 0.2s Special Energy Meters &amp; SLDC SCADA telemetry integration.
                        </p>
                      </Link>

                      <Link
                        href="/solutions/energy-cost-optimization-bill-audits"
                        className="block p-2.5 rounded-2xl hover:bg-blue-50/70 transition-all border border-transparent hover:border-blue-200 group"
                      >
                        <div className="flex items-center space-x-2 text-[#1C2C34] font-bold text-xs uppercase font-mono">
                          <Calculator className="w-3.5 h-3.5 text-[#0284C7]" />
                          <span>HT Bill Audits &amp; Power Factor Tuning</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                          Guaranteed 0.999 PF, Contract Demand right-sizing &amp; DSM penalty shield.
                        </p>
                      </Link>
                    </div>

                    {/* Right Visual Image Card (5 cols) */}
                    <div className="col-span-5 relative rounded-2xl overflow-hidden bg-slate-900 p-5 flex flex-col justify-between text-white shadow-lg">
                      <Image
                        src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80"
                        alt="Utility scale solar power plant"
                        fill
                        sizes="260px"
                        className="object-cover object-center opacity-40"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-[#0A0F1D]/75 to-transparent" />
                      
                      <div className="relative z-10 space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#F8BC26] bg-[#F8BC26]/20 px-2.5 py-0.5 rounded-full inline-block border border-[#F8BC26]/30">
                          14 States Licensed
                        </span>
                        <h4 className="text-sm font-bold tracking-tight text-white leading-snug">
                          Sub-₹4.50/kWh Industrial Power
                        </h4>
                        <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                          Structured Group Captive hybrid PPAs delivering 18%–42% bill reductions for heavy industrial loads.
                        </p>
                      </div>

                      <div className="relative z-10 pt-4 border-t border-white/20">
                        <Link
                          href="/procurement-dossier"
                          className="text-xs font-mono font-bold text-[#F8BC26] hover:text-white flex items-center space-x-1.5 transition-colors"
                        >
                          <span>Empanelment Dossier</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Market Intelligence (Live 96-Block Terminal) */}
            <Link
              href="/market-intelligence"
              className={`flex items-center px-3 py-2 text-xs xl:text-[13px] font-semibold rounded-full transition-all relative whitespace-nowrap flex-shrink-0 ${
                pathname === "/market-intelligence"
                  ? "text-[#1C2C34] bg-slate-100 font-bold"
                  : "text-slate-700 hover:text-[#1C2C34] hover:bg-slate-100/70"
              }`}
            >
              <span>Market Intel</span>
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-mono font-bold flex items-center flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                LIVE
              </span>
            </Link>

            {/* 3. Industrial Case Studies */}
            <Link
              href="/case-studies"
              className={`px-3 py-2 text-xs xl:text-[13px] font-semibold rounded-full transition-all whitespace-nowrap flex-shrink-0 ${
                pathname === "/case-studies"
                  ? "text-[#1C2C34] bg-slate-100 font-bold"
                  : "text-slate-700 hover:text-[#1C2C34] hover:bg-slate-100/70"
              }`}
            >
              <span>Case Studies</span>
            </Link>

            {/* 4. Tools & Regulations Dropdown */}
            <div className="relative flex-shrink-0">
              <button
                type="button"
                onClick={() => toggleDropdown("tools")}
                className={`flex items-center px-3 py-2 text-xs xl:text-[13px] font-semibold rounded-full transition-all whitespace-nowrap flex-shrink-0 ${
                  activeMenu === "tools" || pathname?.startsWith("/tools") || pathname === "/procurement-dossier" || pathname === "/statutory-compliance"
                    ? "text-[#1C2C34] bg-slate-100 font-bold"
                    : "text-slate-700 hover:text-[#1C2C34] hover:bg-slate-100/70"
                }`}
              >
                <span>Tools &amp; Regulatory</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 ml-1 transition-transform flex-shrink-0 ${
                    activeMenu === "tools" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeMenu === "tools" && (
                <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-3xl p-4 shadow-[0_24px_60px_rgba(0,0,0,0.12)] z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400 px-3 pb-1">
                    Simulators &amp; Compliance Hub
                  </div>

                  <Link
                    href="/tools/open-access-calculator"
                    className="flex items-start space-x-3 p-3 rounded-2xl hover:bg-amber-50/70 transition-all border border-transparent hover:border-amber-200 group"
                  >
                    <Calculator className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#1C2C34]">Open Access Tariff Simulator</div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Model landed tariff vs DISCOM retail rate</p>
                    </div>
                  </Link>

                  <Link
                    href="/tools/compare-states"
                    className="flex items-start space-x-3 p-3 rounded-2xl hover:bg-blue-50/70 transition-all border border-transparent hover:border-blue-200 group"
                  >
                    <Scale className="w-4 h-4 text-[#0284C7] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#1C2C34]">State Policy Comparator</div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Cross-Subsidy &amp; Banking rules in 14 states</p>
                    </div>
                  </Link>

                  <Link
                    href="/procurement-dossier"
                    className="flex items-start space-x-3 p-3 rounded-2xl hover:bg-emerald-50/70 transition-all border border-transparent hover:border-emerald-200 group"
                  >
                    <FileText className="w-4 h-4 text-[#059669] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#1C2C34]">Vendor Empanelment Dossier</div>
                      <p className="text-[11px] text-slate-500 mt-0.5">BEE &amp; CERC regulatory credentials kit</p>
                    </div>
                  </Link>

                  <Link
                    href="/statutory-compliance"
                    className="flex items-start space-x-3 p-3 rounded-2xl hover:bg-purple-50/70 transition-all border border-transparent hover:border-purple-200 group"
                  >
                    <FileCheck2 className="w-4 h-4 text-[#7C3AED] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#1C2C34]">Statutory Regulations &amp; NOCs</div>
                      <p className="text-[11px] text-slate-500 mt-0.5">CERC, SERC &amp; SLDC connectivity protocols</p>
                    </div>
                  </Link>
                </div>
              )}
            </div>

          </nav>

          {/* Executive Action CTAs (Right — Integrated in Single Row) */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-3 flex-shrink-0 ml-3 xl:ml-6">
            {/* Audio Feedback Toggle */}
            <button
              type="button"
              onClick={handleToggleAudio}
              className={`p-1.5 rounded-full transition-colors ${
                audioEnabled
                  ? "text-emerald-700 bg-emerald-100/70"
                  : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              }`}
              title={audioEnabled ? "Synthetic FX audio enabled" : "Synthetic FX audio muted"}
              aria-label={audioEnabled ? "Mute audio" : "Enable audio"}
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Client Portal Link Button */}
            <Link
              href="/portal/dashboard"
              className="px-3.5 xl:px-4 py-2 text-xs font-bold rounded-full border border-slate-300 hover:border-slate-800 bg-white hover:bg-slate-50 text-[#1C2C34] transition-all flex items-center space-x-1.5 shadow-2xs whitespace-nowrap active:scale-95"
            >
              <span>Client Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </Link>

            {/* Calculate Savings CTA Button */}
            <Link
              href="/tools/open-access-calculator"
              className="px-4 xl:px-5 py-2 text-xs font-bold rounded-full bg-gradient-to-r from-[#F8BC26] to-[#E5A812] hover:from-[#eab308] hover:to-[#ca8a04] text-[#1C2C34] shadow-[0_2px_12px_rgba(248,188,38,0.28)] hover:shadow-[0_4px_16px_rgba(248,188,38,0.38)] transition-all flex items-center space-x-1.5 whitespace-nowrap active:scale-95 font-sans"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Calculate Savings</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle (Right Aligned on Mobile) */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#1C2C34] hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white p-5 space-y-2 animate-in slide-in-from-top-2 duration-150 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="text-[10px] uppercase font-mono font-bold text-slate-400 pb-1">
            Solutions &amp; Capabilities
          </div>
          <Link
            href="/solutions/power-trading-bilateral-contracts"
            className="block text-sm font-semibold text-[#1C2C34] py-2 border-b border-slate-100"
          >
            ⚡ Power Trading &amp; Bilateral Bourses
          </Link>
          <Link
            href="/solutions/open-access-execution-regulatory"
            className="block text-sm font-semibold text-[#1C2C34] py-2 border-b border-slate-100"
          >
            🏢 Group Captive Open Access (Section 42)
          </Link>
          <Link
            href="/solutions/renewable-energy-sustainability"
            className="block text-sm font-semibold text-[#1C2C34] py-2 border-b border-slate-100"
          >
            ☀️ Rooftop Solar EPC &amp; BESS
          </Link>
          <Link
            href="/solutions/abt-metering-telemetry-infrastructure"
            className="block text-sm font-semibold text-[#1C2C34] py-2 border-b border-slate-100"
          >
            📟 ABT 0.2s SEM Metering &amp; AMR
          </Link>
          <Link
            href="/solutions/energy-cost-optimization-bill-audits"
            className="block text-sm font-semibold text-[#1C2C34] py-2 border-b border-slate-100"
          >
            📊 HT Energy Bill Audits &amp; DSM
          </Link>

          <div className="text-[10px] uppercase font-mono font-bold text-slate-400 pt-3 pb-1">
            Intelligence &amp; Regulatory Tools
          </div>
          <Link
            href="/market-intelligence"
            className="block text-sm font-semibold text-[#1C2C34] py-2 border-b border-slate-100"
          >
            📈 Live 96-Block IEX Terminal (LIVE)
          </Link>
          <Link
            href="/case-studies"
            className="block text-sm font-semibold text-[#1C2C34] py-2 border-b border-slate-100"
          >
            🏭 Industrial Case Studies &amp; Audits
          </Link>
          <Link
            href="/tools/open-access-calculator"
            className="block text-sm font-semibold text-[#1C2C34] py-2 border-b border-slate-100"
          >
            🧮 Rooftop vs Open Access Calculator
          </Link>
          <Link
            href="/tools/compare-states"
            className="block text-sm font-semibold text-[#1C2C34] py-2 border-b border-slate-100"
          >
            ⚖️ Multi-State Policy Comparator
          </Link>
          <Link
            href="/procurement-dossier"
            className="block text-sm font-semibold text-[#1C2C34] py-2 border-b border-slate-100"
          >
            🛡️ Vendor Empanelment Dossier
          </Link>
          <Link
            href="/statutory-compliance"
            className="block text-sm font-semibold text-[#1C2C34] py-2 border-b border-slate-100"
          >
            📜 Statutory Regulations &amp; SLDC NOCs
          </Link>

          <div className="pt-3 flex flex-col space-y-2">
            <Link
              href="/tools/open-access-calculator"
              className="w-full text-center py-2.5 text-xs font-bold rounded-full bg-[#F8BC26] text-[#1C2C34] flex items-center justify-center space-x-2"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Calculate Plant Savings</span>
            </Link>
            <Link
              href="/portal/dashboard"
              className="w-full text-center py-2.5 text-xs font-bold rounded-full bg-[#1C2C34] text-white"
            >
              Open Client Portal
            </Link>
            <a
              href={`tel:${BRAND.contacts.phonePrimary}`}
              className="w-full text-center py-2 text-xs font-semibold text-slate-600 flex items-center justify-center space-x-1.5"
            >
              <PhoneCall className="w-3 h-3 text-[#D97706]" />
              <span>24x7 NOC Hotline: {BRAND.contacts.phonePrimary}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
