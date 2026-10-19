"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Zap,
  TrendingUp,
  Sun,
  ShieldCheck,
  Calculator,
  Briefcase,
  ChevronDown,
  PhoneCall,
  Menu,
  X,
  BatteryCharging,
  Cpu,
  Layers,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { BRAND } from "@/lib/constants/brand";
import { CommandPalette } from "@/components/layout/CommandPalette";

export function Header() {
  const pathname = usePathname();
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close mega menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on route change
  useEffect(() => {
    setActiveMegaMenu(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleMegaMenu = (menu: string) => {
    setActiveMegaMenu(activeMegaMenu === menu ? null : menu);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-grid-navy-950/90 border-b border-grid-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={navRef}>
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-grid-emerald-500 via-grid-cyan-600 to-grid-navy-800 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-grid-navy-950 rounded-[7px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-grid-emerald-400 group-hover:text-grid-cyan-300 transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white flex items-center font-sans">
                Topnotch <span className="text-grid-emerald-400 ml-1">Energy</span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-grid-slate-400 -mt-1 hidden sm:block">
                Power Trading & Open Access Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            
            {/* Solutions Mega-Menu */}
            <div className="relative">
              <button
                onClick={() => toggleMegaMenu("solutions")}
                className={`flex items-center px-3 py-2 text-xs xl:text-sm font-semibold rounded-md transition-colors ${
                  activeMegaMenu === "solutions"
                    ? "text-grid-emerald-400 bg-grid-navy-900"
                    : "text-grid-slate-300 hover:text-white hover:bg-grid-navy-900/60"
                }`}
              >
                <span>Solutions</span>
                <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform ${activeMegaMenu === "solutions" ? "rotate-180" : ""}`} />
              </button>

              {activeMegaMenu === "solutions" && (
                <div className="absolute left-0 mt-2 w-[580px] bg-grid-navy-900/98 backdrop-blur-xl border border-grid-slate-700 rounded-xl p-5 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      href="/solutions/power-trading-bilateral-contracts"
                      className="p-3 rounded-lg hover:bg-grid-navy-800/80 transition-colors border border-transparent hover:border-grid-slate-700 group"
                    >
                      <div className="flex items-center space-x-2 text-grid-emerald-400 font-bold text-xs uppercase font-mono">
                        <TrendingUp className="w-4 h-4" />
                        <span>Power Trading & Bourses</span>
                      </div>
                      <p className="text-xs text-grid-slate-300 mt-1">
                        IEX, PXIL, HPX 24x7 desk across DAM, GDAM, and RTM with automated clearing.
                      </p>
                    </Link>

                    <Link
                      href="/solutions/open-access-execution-regulatory"
                      className="p-3 rounded-lg hover:bg-grid-navy-800/80 transition-colors border border-transparent hover:border-grid-slate-700 group"
                    >
                      <div className="flex items-center space-x-2 text-grid-cyan-400 font-bold text-xs uppercase font-mono">
                        <Layers className="w-4 h-4" />
                        <span>Open Access Advisory</span>
                      </div>
                      <p className="text-xs text-grid-slate-300 mt-1">
                        Group Captive (26:51 SPV), Third-Party Bilateral PPAs, and MoP GEOA 100 kW clearances.
                      </p>
                    </Link>

                    <Link
                      href="/solutions/abt-metering-telemetry-infrastructure"
                      className="p-3 rounded-lg hover:bg-grid-navy-800/80 transition-colors border border-transparent hover:border-grid-slate-700 group"
                    >
                      <div className="flex items-center space-x-2 text-grid-amber-400 font-bold text-xs uppercase font-mono">
                        <Cpu className="w-4 h-4" />
                        <span>ABT 0.2s SEM & Telemetry</span>
                      </div>
                      <p className="text-xs text-grid-slate-300 mt-1">
                        CEA-compliant Main/Check meters, NABL calibration, and SLDC SCADA integration.
                      </p>
                    </Link>

                    <Link
                      href="/solutions/energy-cost-optimization-bill-audits"
                      className="p-3 rounded-lg hover:bg-grid-navy-800/80 transition-colors border border-transparent hover:border-grid-slate-700 group"
                    >
                      <div className="flex items-center space-x-2 text-grid-emerald-300 font-bold text-xs uppercase font-mono">
                        <Calculator className="w-4 h-4" />
                        <span>BEE Grade-A Energy Audits</span>
                      </div>
                      <p className="text-xs text-grid-slate-300 mt-1">
                        Power factor 0.999 tuning, Contract Demand rationalization, and ToD peak shifting.
                      </p>
                    </Link>
                  </div>

                  <div className="mt-4 pt-3 border-t border-grid-slate-800 flex justify-between items-center text-xs">
                    <span className="text-grid-slate-400">Looking for custom utility-scale wheeling?</span>
                    <Link href="/solutions/renewable-energy-sustainability" className="text-grid-cyan-400 hover:underline flex items-center font-medium">
                      <span>View All 5 Enterprise Modules</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Solar Systems Mega-Menu */}
            <div className="relative">
              <button
                onClick={() => toggleMegaMenu("solar")}
                className={`flex items-center px-3 py-2 text-xs xl:text-sm font-semibold rounded-md transition-colors ${
                  activeMegaMenu === "solar"
                    ? "text-grid-emerald-400 bg-grid-navy-900"
                    : "text-grid-slate-300 hover:text-white hover:bg-grid-navy-900/60"
                }`}
              >
                <span>Solar & BESS</span>
                <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform ${activeMegaMenu === "solar" ? "rotate-180" : ""}`} />
              </button>

              {activeMegaMenu === "solar" && (
                <div className="absolute left-0 mt-2 w-[480px] bg-grid-navy-900/98 backdrop-blur-xl border border-grid-slate-700 rounded-xl p-5 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="space-y-3">
                    <Link
                      href="/solutions/renewable-energy-sustainability#rooftop-solar"
                      className="block p-3 rounded-lg hover:bg-grid-navy-800/80 transition-colors border border-transparent hover:border-grid-slate-700"
                    >
                      <div className="flex items-center text-grid-amber-400 font-bold text-xs uppercase font-mono">
                        <Sun className="w-4 h-4 mr-2" />
                        <span>Industrial PEB Shed Rooftop Solar (TOPCon Bifacial)</span>
                      </div>
                      <p className="text-xs text-grid-slate-300 mt-1">
                        High-efficiency on-site generation at ₹1.55/kWh LCOE with zero transmission losses.
                      </p>
                    </Link>

                    <Link
                      href="/solutions/renewable-energy-sustainability#group-captive"
                      className="block p-3 rounded-lg hover:bg-grid-navy-800/80 transition-colors border border-transparent hover:border-grid-slate-700"
                    >
                      <div className="flex items-center text-grid-emerald-400 font-bold text-xs uppercase font-mono">
                        <Zap className="w-4 h-4 mr-2" />
                        <span>Offsite Group Captive Solar & Wind Hybrid</span>
                      </div>
                      <p className="text-xs text-grid-slate-300 mt-1">
                        26% SPV equity model eliminating 100% of Cross-Subsidy and Additional Surcharges.
                      </p>
                    </Link>

                    <Link
                      href="/solutions/renewable-energy-sustainability#bess"
                      className="block p-3 rounded-lg hover:bg-grid-navy-800/80 transition-colors border border-transparent hover:border-grid-slate-700"
                    >
                      <div className="flex items-center text-grid-cyan-400 font-bold text-xs uppercase font-mono">
                        <BatteryCharging className="w-4 h-4 mr-2" />
                        <span>Battery Energy Storage Systems (BESS)</span>
                      </div>
                      <p className="text-xs text-grid-slate-300 mt-1">
                        Containerized LFP storage for Time-of-Day (ToD) peak tariff arbitrage and backup.
                      </p>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Market Intelligence */}
            <Link
              href="/market-intelligence"
              className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-md transition-colors ${
                pathname === "/market-intelligence"
                  ? "text-grid-emerald-400 bg-grid-navy-900"
                  : "text-grid-slate-300 hover:text-white hover:bg-grid-navy-900/60"
              }`}
            >
              Market Intelligence
            </Link>

            {/* Calculators */}
            <Link
              href="/tools/open-access-calculator"
              className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-md transition-colors ${
                pathname === "/tools/open-access-calculator"
                  ? "text-grid-emerald-400 bg-grid-navy-900"
                  : "text-grid-slate-300 hover:text-white hover:bg-grid-navy-900/60"
              }`}
            >
              ROI Calculators
            </Link>

            {/* Case Studies */}
            <Link
              href="/case-studies"
              className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-md transition-colors ${
                pathname === "/case-studies"
                  ? "text-grid-emerald-400 bg-grid-navy-900"
                  : "text-grid-slate-300 hover:text-white hover:bg-grid-navy-900/60"
              }`}
            >
              Case Studies
            </Link>

            {/* Statutory Compliance */}
            <Link
              href="/statutory-compliance"
              className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-md transition-colors ${
                pathname === "/statutory-compliance"
                  ? "text-grid-emerald-400 bg-grid-navy-900"
                  : "text-grid-slate-300 hover:text-white hover:bg-grid-navy-900/60"
              }`}
            >
              Compliance
            </Link>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Quick Command Palette Trigger (Cmd+K / Ctrl+K) */}
            <CommandPalette />

            <Link
              href="/tools/open-access-calculator"
              className="px-4 py-2 text-xs font-bold font-mono rounded-lg bg-grid-emerald-500 hover:bg-grid-emerald-400 text-grid-navy-950 shadow-md shadow-grid-emerald-500/20 transition-all flex items-center space-x-1.5"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Calculate Savings</span>
            </Link>

            <Link
              href="/portal/dashboard"
              className="px-3.5 py-2 text-xs font-bold font-mono rounded-lg border border-grid-slate-700 bg-grid-navy-900 hover:bg-grid-navy-800 text-white transition-colors flex items-center space-x-1.5"
            >
              <span>Client Portal</span>
              <ExternalLink className="w-3 h-3 text-grid-slate-400" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              href="/tools/open-access-calculator"
              className="px-2.5 py-1.5 text-[11px] font-bold font-mono rounded bg-grid-emerald-500 text-grid-navy-950"
            >
              Calc ROI
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-grid-slate-400 hover:text-white hover:bg-grid-navy-900 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Top Navigation Drawer (fallback for desktop full menu) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-grid-slate-800 bg-grid-navy-950 p-4 space-y-3 animate-in slide-in-from-top duration-200">
          <Link
            href="/solutions/power-trading-bilateral-contracts"
            className="block text-sm font-medium text-white hover:text-grid-emerald-400 py-1.5 border-b border-grid-slate-900"
          >
            ⚡ Power Trading & Bilateral Bourses
          </Link>
          <Link
            href="/solutions/open-access-execution-regulatory"
            className="block text-sm font-medium text-white hover:text-grid-emerald-400 py-1.5 border-b border-grid-slate-900"
          >
            🏢 Open Access & Group Captive SPV
          </Link>
          <Link
            href="/solutions/renewable-energy-sustainability"
            className="block text-sm font-medium text-white hover:text-grid-emerald-400 py-1.5 border-b border-grid-slate-900"
          >
            ☀️ Onsite Rooftop Solar & BESS
          </Link>
          <Link
            href="/market-intelligence"
            className="block text-sm font-medium text-white hover:text-grid-emerald-400 py-1.5 border-b border-grid-slate-900"
          >
            📊 Live 96-Block IEX Terminal
          </Link>
          <Link
            href="/tools/open-access-calculator"
            className="block text-sm font-medium text-white hover:text-grid-emerald-400 py-1.5 border-b border-grid-slate-900"
          >
            🧮 Rooftop vs Open Access Calculator
          </Link>
          <Link
            href="/case-studies"
            className="block text-sm font-medium text-white hover:text-grid-emerald-400 py-1.5 border-b border-grid-slate-900"
          >
            📈 Industrial Case Studies (DS Group, Steel Mills)
          </Link>
          <Link
            href="/statutory-compliance"
            className="block text-sm font-medium text-white hover:text-grid-emerald-400 py-1.5 border-b border-grid-slate-900"
          >
            📜 Statutory Regulations & SLDC NOCs
          </Link>
          <div className="pt-2 flex flex-col space-y-2">
            <a
              href={`tel:${BRAND.contacts.phonePrimary}`}
              className="w-full text-center py-2 text-xs font-mono font-bold rounded bg-grid-slate-800 text-white flex items-center justify-center space-x-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-grid-cyan-400" />
              <span>Call 24x7 Bidding Desk</span>
            </a>
            <Link
              href="/portal/dashboard"
              className="w-full text-center py-2 text-xs font-mono font-bold rounded bg-grid-emerald-500 text-grid-navy-950"
            >
              Open Client Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
