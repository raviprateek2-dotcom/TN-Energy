import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  TrendingDown,
  Zap,
  ShieldCheck,
  Calculator,
  BarChart3,
  CheckCircle2,
  PhoneCall,
  Activity,
  Layers,
  Award,
} from "lucide-react";
import { BRAND } from "@/lib/constants/brand";
import { LiveEnergyFlowTopology } from "@/components/market/LiveEnergyFlowTopology";
import { Iex96BlockChart } from "@/components/market/Iex96BlockChart";
import { InteractivePlantHotspotMap } from "@/components/market/InteractivePlantHotspotMap";
import { RooftopVsOpenAccessMatrix } from "@/components/market/RooftopVsOpenAccessMatrix";
import { IndustrialCaseStudiesFilter } from "@/components/market/IndustrialCaseStudiesFilter";

export default function MarketingHomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-grid-navy-950 text-white selection:bg-grid-emerald-500 selection:text-grid-navy-950">
      
      {/* =========================================================================
          HERO SECTION + LIVE ANIMATED ENERGY FLOW TOPOLOGY
         ========================================================================= */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24 border-b border-grid-slate-800">
        {/* Substation Ambient Lighting */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-grid-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-grid-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Value Proposition & CTAs */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Regulatory Pill */}
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-grid-navy-900 border border-grid-slate-700 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-grid-emerald-400 animate-ping" />
                <span className="text-grid-emerald-400 font-bold uppercase tracking-wider text-[11px]">
                  CERC & MoP GEOA 2022 Compliant
                </span>
                <span className="text-grid-slate-600">|</span>
                <span className="text-grid-slate-300 text-[11px]">100 kW+ Industrial C&I</span>
              </div>

              {/* Exact Prompt Headline */}
              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold font-sans tracking-tight text-white leading-[1.15]">
                Unified Power Trading, Onsite Solar & Open Access Decarbonization for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-grid-emerald-400 via-grid-cyan-300 to-grid-emerald-500">
                  Indian Industry
                </span>
              </h1>

              {/* Exact Prompt Subheadline */}
              <p className="text-sm sm:text-base text-grid-slate-300 font-sans leading-relaxed max-w-xl">
                Cut industrial power costs by <strong className="text-white font-mono">18%–42%</strong> and achieve
                Net-Zero Scope 2 targets. Combining 96-block IEX/PXIL algorithmic trading, Group Captive Solar-Wind
                Farms, and ALMM-certified Industrial Rooftop Solar.
              </p>

              {/* Dual Primary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  href="/tools/open-access-calculator"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-grid-emerald-500 to-grid-cyan-500 hover:from-grid-emerald-400 hover:to-grid-cyan-400 text-grid-navy-950 font-bold font-mono text-xs sm:text-sm shadow-xl shadow-grid-emerald-500/20 transition-all flex items-center justify-center space-x-2"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Calculate Plant Solar + OA Savings</span>
                </Link>

                <a
                  href="#iex-terminal-section"
                  className="px-5 py-3.5 rounded-xl border border-grid-slate-700 bg-grid-navy-900/90 hover:bg-grid-navy-800 text-white font-mono text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <Activity className="w-4 h-4 text-grid-cyan-400" />
                  <span>Explore Live 96-Block Terminal</span>
                </a>
              </div>

              {/* Verified Performance Metrics Strip */}
              <div className="pt-6 border-t border-grid-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
                <div>
                  <span className="text-lg sm:text-xl font-extrabold text-white block tabular-nums">
                    {BRAND.metrics.annualUnitsOptimizedMUs}
                  </span>
                  <span className="text-[10px] text-grid-slate-400 uppercase tracking-wider">
                    Annual MUs Traded
                  </span>
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-extrabold text-grid-emerald-400 block tabular-nums">
                    {BRAND.metrics.cumulativeClientSavingsInr}
                  </span>
                  <span className="text-[10px] text-grid-slate-400 uppercase tracking-wider">
                    Client Tariff Savings
                  </span>
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-extrabold text-grid-cyan-300 block tabular-nums">
                    {BRAND.metrics.peakDemandManagedMw}
                  </span>
                  <span className="text-[10px] text-grid-slate-400 uppercase tracking-wider">
                    Peak Load Managed
                  </span>
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-extrabold text-white block tabular-nums">
                    {BRAND.metrics.biddingAccuracyPct}%
                  </span>
                  <span className="text-[10px] text-grid-slate-400 uppercase tracking-wider">
                    Bidding Precision
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Live Energy Flow Topology Component */}
            <div className="lg:col-span-6">
              <LiveEnergyFlowTopology />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE 96-BLOCK MARKET & SOLAR CURVE SECTION
         ========================================================================= */}
      <section id="iex-terminal-section" className="py-16 sm:py-20 border-b border-grid-slate-800 bg-grid-navy-950/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-grid-cyan-400 uppercase tracking-wider mb-2">
              <Activity className="w-3.5 h-3.5" />
              <span>National Electricity Dispatch Telemetry</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-tight">
              Live 96-Time-Block Indian Energy Exchange (IEX) Terminal
            </h2>
            <p className="text-xs sm:text-sm text-grid-slate-300 font-sans mt-2 leading-relaxed">
              Real-time dispatch telemetry, GDAM solar slots, RTM gate closure balancing, and Onsite Solar Bell Curve
              alignment. Discover the exact 15-minute time-blocks where heavy industrial power tariffs plunge to ₹2.90/kWh.
            </p>
          </div>

          <Iex96BlockChart />
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE INDUSTRIAL PLANT HOTSPOT EXPLORER
         ========================================================================= */}
      <section className="py-16 sm:py-20 border-b border-grid-slate-800 relative bg-gradient-to-b from-grid-navy-950 via-grid-navy-900 to-grid-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-grid-emerald-400 uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Technical Substation & Plant Infrastructure</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-tight">
              Inside the Decarbonized Industrial Substation
            </h2>
            <p className="text-xs sm:text-sm text-grid-slate-300 font-sans mt-2 leading-relaxed">
              Explore the 6 mission-critical generation, metering, and storage nodes driving cost reduction across a
              typical 12.5 MVA Indian heavy manufacturing facility.
            </p>
          </div>

          <InteractivePlantHotspotMap />
        </div>
      </section>

      {/* =========================================================================
          ROOFTOP SOLAR VS OPEN ACCESS VS HYBRID MATRIX
         ========================================================================= */}
      <section className="py-16 sm:py-20 border-b border-grid-slate-800 bg-grid-navy-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RooftopVsOpenAccessMatrix />
        </div>
      </section>

      {/* =========================================================================
          VERIFIED INDUSTRIAL CASE STUDIES & CLIENT PROOF
         ========================================================================= */}
      <section className="py-16 sm:py-20 border-b border-grid-slate-800 bg-gradient-to-b from-grid-navy-950 to-grid-navy-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <IndustrialCaseStudiesFilter />
        </div>
      </section>

      {/* =========================================================================
          OPERATIONAL PILLARS: WHY TOPNOTCH ENERGY SOLUTIONS
         ========================================================================= */}
      <section className="py-16 sm:py-20 bg-grid-navy-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-grid-emerald-400 font-bold block">
              Core Engineering Competency
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans mt-1.5">
              Why India&apos;s Leading Heavy Industries Rely on Topnotch
            </h2>
            <p className="text-xs sm:text-sm text-grid-slate-400 mt-2 font-mono">
              Operating at the convergence of high-frequency power trading, transmission engineering, and statutory energy law.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-grid-navy-900 border border-grid-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-grid-emerald-500/10 text-grid-emerald-400 flex items-center justify-center border border-grid-emerald-500/20 font-bold">
                24x7
              </div>
              <h3 className="text-sm font-bold text-white font-sans">
                Non-Stop Market Bidding Desk
              </h3>
              <p className="text-xs text-grid-slate-300 leading-relaxed">
                Dedicated trading floor executing across all 48 half-hour RTM sessions and 96 DAM blocks to prevent peak exposure.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-grid-navy-900 border border-grid-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-grid-cyan-500/10 text-grid-cyan-400 flex items-center justify-center border border-grid-cyan-500/20 font-bold">
                100%
              </div>
              <h3 className="text-sm font-bold text-white font-sans">
                Deemed Regulatory Clearance
              </h3>
              <p className="text-xs text-grid-slate-300 leading-relaxed">
                Flawless track record procuring SLDC Form A/B NOCs, NOAR onboarding, and InSTS/ISTS wheeling agreements in 15 days.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-grid-navy-900 border border-grid-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-grid-amber-500/10 text-grid-amber-400 flex items-center justify-center border border-grid-amber-500/20 font-bold">
                0.2s
              </div>
              <h3 className="text-sm font-bold text-white font-sans">
                CEA ABT SEM Metering
              </h3>
              <p className="text-xs text-grid-slate-300 leading-relaxed">
                Turnkey supply, NABL calibration, and optical AMR modem integration streaming daily 15-minute DLD files to SLDC SCADA.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-grid-navy-900 border border-grid-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 font-bold">
                BEE
              </div>
              <h3 className="text-sm font-bold text-white font-sans">
                Grade-A Energy Auditing
              </h3>
              <p className="text-xs text-grid-slate-300 leading-relaxed">
                Bureau of Energy Efficiency certified engineers optimizing plant power factor to 0.999 PF and eliminating DSM penalties.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
