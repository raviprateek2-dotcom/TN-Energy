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
  Layers,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";
import { BRAND } from "@/lib/constants/brand";
import { toggleAudio, playBreakerClick } from "@/lib/audio/switch-audio";

export function Header() {
  const pathname = usePathname();
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
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

  // Close mega menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveMegaMenu(null);
      setMobileMenuOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const toggleMegaMenu = (menu: string) => {
    setActiveMegaMenu(activeMegaMenu === menu ? null : menu);
  };

  // Dedicated B2B Portal has its own cockpit navigation shell
  if (pathname?.startsWith("/portal")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/70 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all">
      {/* =========================================================================
          MAIN NAVIGATION BAR (WAAREE-GRADE MODERN ARCHITECTURE)
         ========================================================================= */}
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8" ref={navRef}>
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Precision Mark */}
          <Link href="/" className="flex items-center space-x-2.5 sm:space-x-3 group flex-shrink-0 mr-3 xl:mr-6 2xl:mr-8">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#F8BC26] to-[#E5A812] flex items-center justify-center text-[#1C2C34] shadow-[0_4px_16px_rgba(248,188,38,0.35)] group-hover:scale-105 transition-transform duration-200 flex-shrink-0">
              <Zap className="w-5 h-5 fill-current stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl sm:text-2xl tracking-tight text-[#1C2C34] flex items-center leading-none">
                TOPNOTCH <span className="text-[#D97706] ml-1.5">ENERGY</span>
              </span>
              <span className="text-[9px] uppercase font-mono tracking-[0.18em] text-slate-400 mt-1 font-semibold hidden xl:block">
                Enterprise Power Trading &amp; Open Access
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links - Single-Line Guaranteed Across All Screens */}
          <nav className="hidden lg:flex items-center flex-nowrap space-x-0.5 xl:space-x-1.5 2xl:space-x-2.5">
            {/* Solutions Mega-Menu */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => toggleMegaMenu("solutions")}
                className={`flex items-center px-2.5 xl:px-3.5 py-1.5 xl:py-2 text-xs xl:text-[13px] font-semibold rounded-full transition-all whitespace-nowrap flex-shrink-0 ${
                  activeMegaMenu === "solutions"
                    ? "text-[#1C2C34] bg-slate-100 font-bold"
                    : "text-slate-700 hover:text-[#1C2C34] hover:bg-slate-100/70"
                }`}
              >
                <span>Solutions</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 ml-1 transition-transform flex-shrink-0 ${
                    activeMegaMenu === "solutions" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeMegaMenu === "solutions" && (
                <div className="absolute left-0 mt-3 w-[760px] bg-white border border-slate-200/90 rounded-3xl p-6 shadow-[0_24px_60px_rgba(0,0,0,0.12)] z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="grid grid-cols-12 gap-6">
                    {/* Left 4 Solution Links (7 cols) */}
                    <div className="col-span-7 grid grid-cols-1 gap-1.5">
                      <Link
                        href="/solutions/power-trading-bilateral-contracts"
                        className="p-3 rounded-2xl hover:bg-amber-50/70 transition-all border border-transparent hover:border-amber-200 group"
                      >
                        <div className="flex items-center space-x-2 text-[#1C2C34] font-bold text-xs uppercase font-mono">
                          <TrendingUp className="w-3.5 h-3.5 text-[#D97706]" />
                          <span>Power Trading &amp; Bilateral Bourses</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                          Automated 96-block DAM, GDAM &amp; RTM exchange bidding.
                        </p>
                      </Link>

                      <Link
                        href="/solutions/open-access-execution-regulatory"
                        className="p-3 rounded-2xl hover:bg-emerald-50/70 transition-all border border-transparent hover:border-emerald-200 group"
                      >
                        <div className="flex items-center space-x-2 text-[#1C2C34] font-bold text-xs uppercase font-mono">
                          <Zap className="w-3.5 h-3.5 text-[#059669]" />
                          <span>Group Captive Open Access</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                          Section 42 SPV equity with 100% waiver on CSS &amp; AS.
                        </p>
                      </Link>

                      <Link
                        href="/solutions/abt-metering-telemetry-infrastructure"
                        className="p-3 rounded-2xl hover:bg-purple-50/70 transition-all border border-transparent hover:border-purple-200 group"
                      >
                        <div className="flex items-center space-x-2 text-[#1C2C34] font-bold text-xs uppercase font-mono">
                          <Cpu className="w-3.5 h-3.5 text-[#7C3AED]" />
                          <span>ABT 0.2s SEM Metering &amp; AMR</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                          Turnkey CEA Class 0.2s meters &amp; SLDC SCADA telemetry.
                        </p>
                      </Link>

                      <Link
                        href="/solutions/energy-cost-optimization-bill-audits"
                        className="p-3 rounded-2xl hover:bg-blue-50/70 transition-all border border-transparent hover:border-blue-200 group"
                      >
                        <div className="flex items-center space-x-2 text-[#1C2C34] font-bold text-xs uppercase font-mono">
                          <Calculator className="w-3.5 h-3.5 text-[#0284C7]" />
                          <span>HT Energy Bill Audits &amp; DSM</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                          Power factor 0.999 tuning &amp; Contract Demand optimization.
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
                          Structured Group Captive hybrid PPAs delivering 18%–42% bill reductions.
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

                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-mono text-[11px]">Need turnkey utility-scale hybrid advisory?</span>
                    <Link
                      href="/solutions/renewable-energy-sustainability"
                      className="text-[#1C2C34] hover:text-[#D97706] flex items-center font-bold text-xs"
                    >
                      <span>Explore Renewable Energy &amp; BESS</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Solar & BESS Mega-Menu */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => toggleMegaMenu("solar")}
                className={`flex items-center px-2.5 xl:px-3.5 py-1.5 xl:py-2 text-xs xl:text-[13px] font-semibold rounded-full transition-all whitespace-nowrap flex-shrink-0 ${
                  activeMegaMenu === "solar"
                    ? "text-[#1C2C34] bg-slate-100 font-bold"
                    : "text-slate-700 hover:text-[#1C2C34] hover:bg-slate-100/70"
                }`}
              >
                <span>Solar &amp; BESS</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 ml-1 transition-transform flex-shrink-0 ${
                    activeMegaMenu === "solar" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeMegaMenu === "solar" && (
                <div className="absolute left-0 mt-3 w-[680px] bg-white border border-slate-200/90 rounded-3xl p-6 shadow-[0_24px_60px_rgba(0,0,0,0.12)] z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="grid grid-cols-12 gap-6">
                    {/* Left 3 items (7 cols) */}
                    <div className="col-span-7 space-y-1.5">
                      <Link
                        href="/solutions/renewable-energy-sustainability#rooftop-solar"
                        className="block p-3 rounded-2xl hover:bg-amber-50/70 transition-all border border-transparent hover:border-amber-200"
                      >
                        <div className="flex items-center text-[#1C2C34] font-bold text-xs uppercase font-mono">
                          <Sun className="w-3.5 h-3.5 mr-1.5 text-[#D97706]" />
                          <span>PEB Shed Rooftop Solar EPC</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          High-efficiency TOPCon bifacial modules at ₹1.55/kWh benchmark LCOE.
                        </p>
                      </Link>

                      <Link
                        href="/solutions/renewable-energy-sustainability#group-captive"
                        className="block p-3 rounded-2xl hover:bg-emerald-50/70 transition-all border border-transparent hover:border-emerald-200"
                      >
                        <div className="flex items-center text-[#1C2C34] font-bold text-xs uppercase font-mono">
                          <Zap className="w-3.5 h-3.5 mr-1.5 text-[#059669]" />
                          <span>Group Captive Solar &amp; Wind</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          26% SPV equity model eliminating 100% of Cross-Subsidy surcharges.
                        </p>
                      </Link>

                      <Link
                        href="/solutions/renewable-energy-sustainability#bess"
                        className="block p-3 rounded-2xl hover:bg-cyan-50/70 transition-all border border-transparent hover:border-cyan-200"
                      >
                        <div className="flex items-center text-[#1C2C34] font-bold text-xs uppercase font-mono">
                          <BatteryCharging className="w-3.5 h-3.5 mr-1.5 text-[#0891B2]" />
                          <span>Battery Energy Storage (BESS)</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          Containerized LFP storage for Time-of-Day (ToD) peak tariff arbitrage.
                        </p>
                      </Link>
                    </div>

                    {/* Right Visual Image Card (5 cols) */}
                    <div className="col-span-5 relative rounded-2xl overflow-hidden bg-slate-900 p-5 flex flex-col justify-between text-white shadow-lg">
                      <Image
                        src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=80"
                        alt="Industrial factory rooftop solar installation"
                        fill
                        sizes="240px"
                        className="object-cover object-center opacity-40"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-[#0A0F1D]/75 to-transparent" />
                      
                      <div className="relative z-10 space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#10B981] bg-[#10B981]/20 px-2.5 py-0.5 rounded-full inline-block border border-[#10B981]/30">
                          ₹1.55/kWh LCOE
                        </span>
                        <h4 className="text-sm font-bold tracking-tight text-white leading-snug">
                          Zero Transmission Losses
                        </h4>
                        <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                          OPEX/RESCO and CAPEX models with 25-year performance warranties.
                        </p>
                      </div>

                      <div className="relative z-10 pt-4 border-t border-white/20">
                        <Link
                          href="/tools/open-access-calculator"
                          className="text-xs font-mono font-bold text-[#F8BC26] hover:text-white flex items-center space-x-1.5 transition-colors"
                        >
                          <span>Calculate Solar ROI</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Market Intelligence with Pulsing Live Pill */}
            <Link
              href="/market-intelligence"
              className={`flex items-center px-2.5 xl:px-3.5 py-1.5 xl:py-2 text-xs xl:text-[13px] font-semibold rounded-full transition-all relative whitespace-nowrap flex-shrink-0 ${
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

            {/* Industrial Case Studies */}
            <Link
              href="/case-studies"
              className={`px-2.5 xl:px-3.5 py-1.5 xl:py-2 text-xs xl:text-[13px] font-semibold rounded-full transition-all whitespace-nowrap flex-shrink-0 ${
                pathname === "/case-studies"
                  ? "text-[#1C2C34] bg-slate-100 font-bold"
                  : "text-slate-700 hover:text-[#1C2C34] hover:bg-slate-100/70"
              }`}
            >
              <span>Case Studies</span>
            </Link>

            {/* ROI Calculators */}
            <Link
              href="/tools/open-access-calculator"
              className={`px-2.5 xl:px-3.5 py-1.5 xl:py-2 text-xs xl:text-[13px] font-semibold rounded-full transition-all whitespace-nowrap flex-shrink-0 ${
                pathname === "/tools/open-access-calculator"
                  ? "text-[#1C2C34] bg-slate-100 font-bold"
                  : "text-slate-700 hover:text-[#1C2C34] hover:bg-slate-100/70"
              }`}
            >
              <span>Tariff Simulator</span>
            </Link>

            {/* State Policy Comparator */}
            <Link
              href="/tools/compare-states"
              className={`px-2.5 xl:px-3.5 py-1.5 xl:py-2 text-xs xl:text-[13px] font-semibold rounded-full transition-all whitespace-nowrap flex-shrink-0 ${
                pathname === "/tools/compare-states"
                  ? "text-[#1C2C34] bg-slate-100 font-bold"
                  : "text-slate-700 hover:text-[#1C2C34] hover:bg-slate-100/70"
              }`}
            >
              <span>State Policies</span>
            </Link>

            {/* Due Diligence Dossier */}
            <Link
              href="/procurement-dossier"
              className={`px-2.5 xl:px-3.5 py-1.5 xl:py-2 text-xs xl:text-[13px] font-semibold rounded-full transition-all whitespace-nowrap flex-shrink-0 ${
                pathname === "/procurement-dossier"
                  ? "text-[#1C2C34] bg-slate-100 font-bold"
                  : "text-slate-700 hover:text-[#1C2C34] hover:bg-slate-100/70"
              }`}
            >
              <span>Diligence Hub</span>
            </Link>
          </nav>

          {/* Mobile Hamburger Toggle (Right Aligned on Mobile) */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#1C2C34] hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          EXECUTIVE SUB-HEADER ACTION STRIP: CLIENT PORTAL & SAVINGS CALCULATOR
          Shifted directly under the main header to create maximum room in header navbar
         ========================================================================= */}
      <div className="bg-slate-50/95 backdrop-blur-md border-t border-slate-200/80 py-2 sm:py-2.5 px-4 sm:px-6 lg:px-8 shadow-2xs">
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          {/* Left: Industrial Credential & Surcharge Exemption Proof */}
          <div className="flex items-center space-x-3 text-xs font-mono text-slate-600 truncate">
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-[10px] font-bold uppercase tracking-wider flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>CERC Cat-IV &amp; NOAR Standing</span>
            </span>
            <span className="hidden md:inline text-slate-300">|</span>
            <span className="hidden md:inline text-[11px] text-slate-600 font-sans font-medium truncate">
              18%–42% Recurring Tariff Savings for 100 kW+ Industrial Consumers
            </span>
          </div>

          {/* Right: Shifted Action Buttons (Client Portal & Calculate Savings) */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 ml-auto flex-shrink-0">
            {/* Audio Feedback Toggle */}
            <button
              type="button"
              onClick={handleToggleAudio}
              className={`p-1.5 rounded-full transition-colors ${
                audioEnabled
                  ? "text-emerald-700 bg-emerald-100/70"
                  : "text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
              }`}
              title={audioEnabled ? "Synthetic FX audio enabled (Click to mute)" : "Synthetic FX audio muted (Click to enable)"}
              aria-label={audioEnabled ? "Mute audio" : "Enable audio"}
            >
              {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            <Link
              href="/portal/dashboard"
              className="px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-bold rounded-full border border-slate-300 hover:border-slate-800 bg-white hover:bg-slate-100 text-[#1C2C34] transition-all flex items-center space-x-1.5 shadow-2xs active:scale-95 flex-shrink-0"
            >
              <span>Client Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </Link>

            <Link
              href="/tools/open-access-calculator"
              className="px-4 sm:px-5 py-1.5 sm:py-2 text-xs font-bold rounded-full bg-gradient-to-r from-[#F8BC26] to-[#E5A812] hover:from-[#eab308] hover:to-[#ca8a04] text-[#1C2C34] shadow-[0_2px_12px_rgba(248,188,38,0.28)] hover:shadow-[0_4px_16px_rgba(248,188,38,0.38)] transition-all duration-200 flex items-center space-x-1.5 active:scale-95 flex-shrink-0"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Calculate Savings</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white p-5 space-y-2 animate-in slide-in-from-top-2 duration-150 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="text-[10px] uppercase font-mono font-bold text-slate-400 pb-1">
            Solutions &amp; Advisory
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
            🏢 Open Access &amp; Group Captive SPV
          </Link>
          <Link
            href="/solutions/renewable-energy-sustainability"
            className="block text-sm font-semibold text-[#1C2C34] py-2 border-b border-slate-100"
          >
            ☀️ Onsite Rooftop Solar &amp; BESS
          </Link>
          <Link
            href="/market-intelligence"
            className="block text-sm font-semibold text-[#1C2C34] py-2 border-b border-slate-100"
          >
            📊 Live 96-Block IEX Terminal (LIVE)
          </Link>
          <Link
            href="/case-studies"
            className="block text-sm font-semibold text-[#1C2C34] py-2 border-b border-slate-100"
          >
            📈 Industrial Case Studies &amp; Audits
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
            <a
              href={`tel:${BRAND.contacts.phonePrimary}`}
              className="w-full text-center py-2.5 text-xs font-bold rounded-full bg-slate-100 text-[#1C2C34] flex items-center justify-center space-x-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Call 24x7 Bidding Desk</span>
            </a>
            <Link
              href="/portal/dashboard"
              className="w-full text-center py-2.5 text-xs font-bold rounded-full bg-[#1C2C34] text-white"
            >
              Open Client Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
