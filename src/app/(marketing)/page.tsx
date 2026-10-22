import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Zap,
  ArrowRight,
  TrendingDown,
  Sun,
  ShieldCheck,
  Calculator,
  PhoneCall,
  Award,
  CheckCircle2,
  ChevronRight,
  BatteryCharging,
  Factory,
  Building2,
  Sparkles,
  ExternalLink,
  MessageSquare,
  BarChart3,
  Scale,
} from "lucide-react";
import { BRAND } from "@/lib/constants/brand";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { ProcessStep } from "@/components/ui/ProcessStep";
import { ScrollFadeIn } from "@/components/ui/ScrollFadeIn";
import { QuickSavingsEstimator } from "@/components/calculators/QuickSavingsEstimator";
import { InteractiveSectorGrid } from "@/components/market/InteractiveSectorGrid";
import { PageDivider } from "@/components/ui/PageDivider";
import { CornerIndustrialWatermark } from "@/components/ui/CornerIndustrialWatermark";
import { IndustrialDecarbonizationBarometer } from "@/components/market/IndustrialDecarbonizationBarometer";
import { DecarbonizationCorridorBridge } from "@/components/home/DecarbonizationCorridorBridge";
import { HeroBackgroundCarousel } from "@/components/home/HeroBackgroundCarousel";
import { AccreditationsShowcase } from "@/components/home/AccreditationsShowcase";
import { SplitImageMergeSection } from "@/components/ui/SplitImageMergeSection";

export default function MarketingHomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1C2C34] selection:bg-[#F8BC26]/30">
      
      {/* =========================================================================
          SECTION 1: CINEMATIC HERO SECTION WITH 10-SECOND ROTATING INDUSTRIAL BACKGROUND
         ========================================================================= */}
      <section className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#0B132B]">
        {/* Auto-Rotating 10-Second High-Resolution Industrial Background Carousel */}
        <HeroBackgroundCarousel />

        {/* Hero Narrative Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-3xl space-y-6">
            
            {/* Accreditation Badge */}
            <ScrollFadeIn delay={0.1}>
              <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="font-bold uppercase tracking-wider text-[11px] text-[#F8BC26]">
                  CERC Category-IV Licensed
                </span>
                <span className="text-white/40">|</span>
                <span className="text-slate-200 text-[11px]">100 kW+ Industrial C&amp;I Consumers</span>
              </div>
            </ScrollFadeIn>

            {/* Main Inspiring Headline */}
            <ScrollFadeIn delay={0.2}>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12] drop-shadow-md">
                Pioneering India&apos;s Industrial{" "}
                <span className="text-[#F8BC26]">Clean Energy</span> &amp; Power Trading Revolution
              </h1>
            </ScrollFadeIn>

            {/* Executive Subheadline */}
            <ScrollFadeIn delay={0.3}>
              <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-normal max-w-2xl drop-shadow-sm">
                Transforming multi-crore factory electricity bills away from expensive DISCOM tariffs (₹7.50–₹11.00/kWh) into <strong className="text-white font-semibold">18%–42% recurring annual savings</strong> through Group Captive solar/wind hybrids and automated Day-Ahead bourse trading across 14 states.
              </p>
            </ScrollFadeIn>

            {/* Primary Action Buttons */}
            <ScrollFadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
                <a
                  href="#quick-calculator"
                  className="px-8 py-4 rounded-full bg-[#F8BC26] hover:bg-[#eab308] text-[#1C2C34] font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 active:scale-95 group"
                >
                  <Calculator className="w-4 h-4 text-[#1C2C34]" />
                  <span>Calculate Plant Savings</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href={`tel:${BRAND.contacts.phonePrimary}`}
                  className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md text-sm font-bold transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <PhoneCall className="w-4 h-4 text-[#F8BC26]" />
                  <span>Speak with Energy Trader</span>
                </a>

                <Link
                  href="/market-intelligence"
                  className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-emerald-400/60 backdrop-blur-md text-sm font-bold transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm active:scale-95 group"
                >
                  <BarChart3 className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>Live 96-Block Intel →</span>
                </Link>
              </div>
            </ScrollFadeIn>

            {/* Trust Proof Chips */}
            <ScrollFadeIn delay={0.5}>
              <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300 font-mono">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>100% Waiver on CSS &amp; Additional Surcharge</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>Turnkey CEA 0.2s ABT Metering</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>Zero Production Disruption Guaranteed</span>
                </div>
              </div>
            </ScrollFadeIn>

          </div>
        </div>

        {/* Waaree Fluid Wave Divider: Hero Dark Navy into Crisp White */}
        <div className="absolute bottom-0 inset-x-0 pointer-events-none">
          <PageDivider type="layered-wave" fillColor="#FFFFFF" position="bottom" height={60} />
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: IMPACT METRICS STRIP WITH ANIMATED COUNTERS
         ========================================================================= */}
      <section className="relative z-20 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/90 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          
          <div className="flex flex-col space-y-1 pl-2 sm:pl-4 border-l-4 border-[#F8BC26]">
            <div className="text-3xl sm:text-4xl font-black text-[#1C2C34] tracking-tight">
              <AnimatedCounter value={10} suffix="+" />
            </div>
            <span className="text-xs uppercase font-mono tracking-wider font-bold text-slate-500">
              Years of Energy Leadership
            </span>
            <span className="text-[11px] text-slate-400">Serving Indian Manufacturing</span>
          </div>

          <div className="flex flex-col space-y-1 pl-2 sm:pl-4 border-l-4 border-[#10B981]">
            <div className="text-3xl sm:text-4xl font-black text-[#10B981] tracking-tight">
              <AnimatedCounter value={185} prefix="₹" suffix="+ Cr" />
            </div>
            <span className="text-xs uppercase font-mono tracking-wider font-bold text-slate-500">
              Client Tariff Savings
            </span>
            <span className="text-[11px] text-slate-400">Direct Financial Reductions</span>
          </div>

          <div className="flex flex-col space-y-1 pl-2 sm:pl-4 border-l-4 border-[#0284C7]">
            <div className="text-3xl sm:text-4xl font-black text-[#0284C7] tracking-tight">
              <AnimatedCounter value={380} suffix="+ MW" />
            </div>
            <span className="text-xs uppercase font-mono tracking-wider font-bold text-slate-500">
              Contract Demand Managed
            </span>
            <span className="text-[11px] text-slate-400">Under Active Portfolio</span>
          </div>

          <div className="flex flex-col space-y-1 pl-2 sm:pl-4 border-l-4 border-amber-600">
            <div className="text-3xl sm:text-4xl font-black text-amber-600 tracking-tight">
              <AnimatedCounter value={14} suffix=" States" />
            </div>
            <span className="text-xs uppercase font-mono tracking-wider font-bold text-slate-500">
              SERC Regulatory Reach
            </span>
            <span className="text-[11px] text-slate-400">Pan-India SLDC Clearances</span>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: CLIENT SOCIAL PROOF MARQUEE ("TRUSTED BY INDIA'S MARQUEE INDUSTRIAL LEADERS")
         ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        {/* Subtle Architectural Corner Watermarks */}
        <CornerIndustrialWatermark type="windmills" position="top-right" size={340} opacity={0.07} />
        <CornerIndustrialWatermark type="solar-array" position="bottom-left" size={300} opacity={0.07} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-[#B45309] text-xs font-mono font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
            <span>Industrial Provenance &amp; National Footprint</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1C2C34] tracking-tight">
            Trusted by India&apos;s Marquee Industrial Leaders
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-sans leading-relaxed">
            Over 380 MW of continuous contract demand across alloy steel, high-speed bottling, chemicals, paper, and synthetic textiles optimized under 15-minute algorithmic scheduling.
          </p>
        </div>
        <LogoMarquee />
      </section>

      {/* Page Divider: Seamless Wave Merging White into Deep Midnight Navy */}
      <PageDivider type="layered-wave" fillColor="#0A0F1D" bgColor="#FFFFFF" position="bottom" height={70} />

      {/* =========================================================================
          SECTION 4: THREE VISUAL CORE POWER PILLARS (WAAREE-STYLE PHOTOGRAPHY CARDS)
         ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#0A0F1D] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] font-bold text-[#F8BC26]">
              End-to-End Enterprise Energy Solutions
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Three Strategic Pathways to Sub-₹4.50 Power
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              Whether you need offsite Group Captive equity structuring, automated 15-minute exchange scheduling, or turnkey rooftop solar EPC, we engineer the optimal landed tariff for your factory.
            </p>
          </div>

          {/* 3 Large Photographic Cards with Hover Zoom */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Pillar 1: Group Captive Open Access */}
            <div className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col min-h-[480px] bg-slate-900">
              <Image
                src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80"
                alt="Utility scale solar and wind hybrid power plant"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-45"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/70 to-transparent" />
              
              <div className="relative z-10 p-8 flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#34D399] text-xs font-mono font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Zero CSS &amp; Zero AS</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Group Captive Solar &amp; Wind Hybrid
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Under Electricity Rule 3, acquire 26% equity in an off-site renewable SPV to legally eliminate 100% of Cross-Subsidy Surcharges (CSS) and Additional Surcharges (AS), locking in clean power at ₹3.80–₹4.20/kWh for 25 years.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/15 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Target Landed Rate:</span>
                    <span className="text-lg font-black text-[#F8BC26]">₹3.80–₹4.20/kWh</span>
                  </div>
                  <Link
                    href="/solutions/open-access-execution-regulatory"
                    className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-[#F8BC26] hover:text-[#1C2C34] text-white font-bold text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 border border-white/20 hover:border-transparent"
                  >
                    <span>View Group Captive Model</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Pillar 2: 24x7 IEX Power Trading */}
            <div className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col min-h-[480px] bg-slate-900">
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
                alt="High-tech electricity dispatch trading analytics monitors"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-45"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/70 to-transparent" />
              
              <div className="relative z-10 p-8 flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#0284C7]/20 border border-[#0284C7]/40 text-[#38BDF8] text-xs font-mono font-bold">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>CERC Category-IV Trading Desk</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    24x7 IEX Bourse Scheduling
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Algorithmic execution across Day-Ahead (DAM), Green Day-Ahead (GDAM), and Real-Time (RTM) markets. We programmatically buy during solar dip hours (Slots 45–64) and avoid expensive evening peaks to minimize monthly power spend.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/15 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Execution Frequency:</span>
                    <span className="text-lg font-black text-[#F8BC26]">15-Min Block Automated</span>
                  </div>
                  <Link
                    href="/solutions/power-trading-bilateral-contracts"
                    className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-[#F8BC26] hover:text-[#1C2C34] text-white font-bold text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 border border-white/20 hover:border-transparent"
                  >
                    <span>View Power Trading Desk</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Pillar 3: Industrial PEB Shed Solar */}
            <div className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col min-h-[480px] bg-slate-900">
              <Image
                src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1200&q=80"
                alt="Industrial factory PEB shed rooftop solar installation"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-45"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/70 to-transparent" />
              
              <div className="relative z-10 p-8 flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
                    <Sun className="w-3.5 h-3.5" />
                    <span>N-Type TOPCon Bifacial</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Industrial Rooftop Solar &amp; BESS
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Turnkey EPC and RESCO/OPEX power purchase agreements. Generate clean power directly behind the factory meter with zero transmission or wheeling losses at a levelized cost of energy (LCOE) benchmark of ₹1.55/kWh.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/15 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Levelized Cost (LCOE):</span>
                    <span className="text-lg font-black text-[#F8BC26]">₹1.55/kWh Benchmark</span>
                  </div>
                  <Link
                    href="/solutions/renewable-energy-sustainability"
                    className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-[#F8BC26] hover:text-[#1C2C34] text-white font-bold text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 border border-white/20 hover:border-transparent"
                  >
                    <span>Explore Rooftop Solar</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Page Divider: Seamless Wave Merging Deep Midnight Navy into Crisp White */}
      <PageDivider type="layered-wave" fillColor="#FFFFFF" bgColor="#0A0F1D" position="bottom" flipHorizontal height={70} />

      {/* =========================================================================
          SECTION 5: THE STRATEGIC SHIFT ("WHY TOPNOTCH" SIDE-BY-SIDE COMPARISON)
         ========================================================================= */}
      <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
        {/* Subtle Architectural Corner Watermarks */}
        <CornerIndustrialWatermark type="transmission-tower" position="top-right" size={360} opacity={0.06} />
        <CornerIndustrialWatermark type="substation" position="bottom-left" size={320} opacity={0.06} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] font-bold text-[#D97706]">
              Executive Economic Comparison
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1C2C34] tracking-tight">
              State DISCOM Grid vs. Topnotch Open Access
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Why India&apos;s leading CFOs and industrial plant directors are shifting factory drawl away from monopolistic utility grids.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* The Old Way: State DISCOM */}
            <div className="rounded-3xl p-8 sm:p-10 bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono font-bold">
                  <span>Traditional Grid Drawl</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  State Utility DISCOM Tariffs
                </h3>
                <div className="text-3xl sm:text-4xl font-extrabold text-rose-600 font-mono">
                  ₹7.50 – ₹11.00 <span className="text-xs text-slate-500 font-sans font-normal">/ kWh Landed</span>
                </div>
                
                <ul className="space-y-3 pt-4 text-xs sm:text-sm text-slate-600">
                  <li className="flex items-start space-x-3">
                    <span className="text-rose-500 font-bold text-base leading-none">✕</span>
                    <span><strong>Escalating fuel adjustment charges:</strong> Unpredictable quarterly FPPCA surcharges eroding EBITDA.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-rose-500 font-bold text-base leading-none">✕</span>
                    <span><strong>100% Fossil fuel exposure:</strong> Zero carbon credit benefits and vulnerability to future green tariffs.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-rose-500 font-bold text-base leading-none">✕</span>
                    <span><strong>Rigid ToD peak penalties:</strong> Up to 20%–50% peak tariff penalties on daytime industrial production.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-rose-500 font-bold text-base leading-none">✕</span>
                    <span><strong>Heavy Cross-Subsidy burden:</strong> Your factory subsidizes agricultural and domestic consumers.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-slate-200 text-xs font-mono text-slate-500">
                Status Quo: Annual power spend continues to increase by 4%–7% year-on-year.
              </div>
            </div>

            {/* The Topnotch Way: Open Access Architecture */}
            <div className="rounded-3xl p-8 sm:p-10 bg-[#1C2C34] text-white border border-[#F8BC26]/30 flex flex-col justify-between space-y-6 relative overflow-hidden shadow-2xl">
              {/* Deep Blue Photographic Backdrop */}
              <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <Image
                  src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80"
                  alt="Industrial power infrastructure"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C2C34] via-[#1C2C34]/90 to-[#1C2C34]/80" />
              </div>

              {/* Golden accent bar */}
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#F8BC26] via-amber-400 to-[#10B981] z-10" />
              
              <div className="space-y-4 relative z-10">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F8BC26]/20 border border-[#F8BC26]/40 text-[#F8BC26] text-xs font-mono font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Topnotch Engineered Architecture</span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Group Captive &amp; Exchange Sourced
                </h3>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#F8BC26] font-mono">
                  ₹3.80 – ₹4.50 <span className="text-xs text-slate-300 font-sans font-normal">/ kWh Landed</span>
                </div>
                
                <ul className="space-y-3 pt-4 text-xs sm:text-sm text-slate-200">
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span><strong>100% Exemption on CSS &amp; AS:</strong> Legally verified under Section 42 &amp; Electricity Rules 2005.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span><strong>25-Year Fixed Tariff Hedge:</strong> Long-term certainty against inflationary fossil fuel price spikes.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span><strong>Automated 15-Minute Bourse Bidding:</strong> Live IEX/PXIL dispatch tailored to your factory shift load curves.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span><strong>Audited Monthly Billing:</strong> Detailed reconciliation against DISCOM baseline with verified net rupee savings.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-slate-700 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  Net Savings: 18% – 42% on Total Monthly Bill
                </span>
                <Link
                  href="/tools/open-access-calculator"
                  className="px-4 py-2 rounded-full bg-[#F8BC26] hover:bg-[#eab308] text-[#1C2C34] font-bold text-xs font-mono transition-colors"
                >
                  Model Your Plant →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          WAAREE-GRADE INDUSTRIAL ROOFTOP SOLAR & BESS (HALF-MERGING FHD IMAGE ON WHITE)
         ========================================================================= */}
      <SplitImageMergeSection
        badgeText="Industrial Decarbonization Architecture"
        title={
          <>
            Industrial Rooftop Solar &amp; <span className="text-[#D97706]">BESS Peak Shaving</span>
          </>
        }
        description="Transform unutilized factory PEB shed roofs and vacant campus land into captive clean-energy generation assets. Coupled with 4-hour Battery Energy Storage Systems (BESS), eliminate expensive ToD evening surcharges and guarantee round-the-clock power reliability."
        bullets={[
          "Tier-1 N-Type TOPCon Bifacial Solar Modules",
          "40% Accelerated Depreciation Tax Shield (Section 32)",
          "4-Hour Lithium Iron Phosphate (LFP) BESS Storage",
          "Zero CAPEX OPEX / RESCO Tariff Structuring",
        ]}
        imageUrl="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Modern industrial factory rooftop solar panel array and BESS installation"
        primaryCta={{
          label: "Explore Rooftop Solar & BESS →",
          href: "/solutions/renewable-energy-sustainability",
        }}
        secondaryCta={{
          label: "Calculate Tariff Savings",
          href: "#quick-calculator",
        }}
        stats={[
          { value: "40%", label: "Tax Depreciation", sublabel: "Year-1 Corporate Shield" },
          { value: "3.2 Yrs", label: "Payback Period", sublabel: "Industrial CAPEX Model" },
          { value: "25 Yrs", label: "Asset Lifecycle", sublabel: "Guaranteed Performance" },
        ]}
      />

      {/* Page Divider: Soft Curve Merging Crisp White into Ghost Slate */}
      <PageDivider type="curve" fillColor="#F9FAFB" bgColor="#FFFFFF" position="bottom" height={50} />

      {/* =========================================================================
          SECTION 6: INTERACTIVE QUICK SAVINGS ESTIMATOR
         ========================================================================= */}
      <section id="quick-calculator" className="py-20 sm:py-28 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] font-bold text-[#D97706]">
              Interactive Financial Simulation
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#1C2C34] tracking-tight">
              Calculate Your Factory&apos;s Potential Savings
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans">
              Select your state jurisdiction, enter your contracted demand, and see instant monthly and annual tariff savings.
            </p>
          </div>

          {/* Embedded Quick Savings Estimator Component */}
          <div className="max-w-5xl mx-auto">
            <QuickSavingsEstimator />
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs font-mono text-slate-500">
              Need multi-state or complex voltage-level analysis?{" "}
              <Link
                href="/tools/open-access-calculator"
                className="text-[#1C2C34] font-bold underline hover:text-[#D97706]"
              >
                Launch Full-Scale Open Access &amp; Rooftop Simulator →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Page Divider: Soft Curve Merging Ghost Slate into Crisp White */}
      <PageDivider type="curve" fillColor="#FFFFFF" bgColor="#F9FAFB" position="bottom" flipHorizontal height={50} />

      {/* =========================================================================
          SECTION 7: INDUSTRY SECTORS EMPOWERED (INTERACTIVE STRUCTURED DATA CARDS)
         ========================================================================= */}
      <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
        {/* Subtle Architectural Corner Watermarks */}
        <CornerIndustrialWatermark type="solar-array" position="top-right" size={320} opacity={0.06} />
        <CornerIndustrialWatermark type="windmills" position="bottom-left" size={320} opacity={0.06} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] font-bold text-[#D97706]">
              Proven Industrial Specialization
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1C2C34] tracking-tight">
              Tailored for High-Tension Energy Consumers
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
              Click any industry card below to explore data-backed shift curves, baseline DISCOM comparisons, engineered procurement mixes, and verified multi-crore audit references.
            </p>
          </div>

          <InteractiveSectorGrid />

        </div>
      </section>

      {/* Page Divider: Organic Wave Merging Crisp White into Ghost Slate */}
      <PageDivider type="wave" fillColor="#F9FAFB" bgColor="#FFFFFF" position="bottom" height={55} />

      {/* =========================================================================
          SECTION 8: TURNKEY 45-DAY TRANSITION JOURNEY
         ========================================================================= */}
      <section className="relative py-20 sm:py-28 bg-[#F9FAFB] text-[#1C2C34] overflow-hidden">
        {/* Contrasty Merged Industrial Substation Engineering Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          <Image
            src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=2000&q=80"
            alt="Turnkey 33 kV substation bay and engineering infrastructure"
            fill
            sizes="100vw"
            className="object-cover object-center lg:object-right opacity-40 sm:opacity-50"
          />
          {/* High-Contrast Directional Gradient Masks: Merging into #F9FAFB with Crisp Foreground Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F9FAFB] via-[#F9FAFB]/90 lg:via-[#F9FAFB]/75 to-[#F9FAFB]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F9FAFB] via-transparent to-[#F9FAFB]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_75%_50%,rgba(217,119,6,0.06),transparent_70%)]" />
        </div>

        {/* Subtle Architectural Corner Watermarks */}
        <CornerIndustrialWatermark type="windmills" position="top-right" size={320} opacity={0.06} />
        <CornerIndustrialWatermark type="solar-array" position="bottom-left" size={320} opacity={0.06} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] font-bold text-[#D97706]">
              Structured Turnkey Execution
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1C2C34] tracking-tight">
              From Plant Audit to Live Exchange Power in 45 Days
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans max-w-2xl mx-auto">
              Our institutional team handles all DISCOM approvals, SLDC NOC clearances, ABT metering installations, and exchange onboarding with zero operational distraction for your plant team.
            </p>
          </div>

          <ProcessStep />
        </div>
      </section>

      {/* Page Divider: Modern Slant Merging Ghost Slate into Crisp White */}
      <PageDivider type="slant" fillColor="#FFFFFF" bgColor="#F9FAFB" position="bottom" height={45} />

      {/* =========================================================================
          SECTION 9: STATUTORY ACCREDITATIONS & COMPLIANCE SEALS (LARGE ANIMATED BADGES)
         ========================================================================= */}
      <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
        {/* Subtle Architectural Corner Watermarks */}
        <CornerIndustrialWatermark type="substation" position="top-right" size={320} opacity={0.06} />
        <CornerIndustrialWatermark type="transmission-tower" position="bottom-left" size={300} opacity={0.06} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Sovereign Regulatory Accreditations</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1C2C34] tracking-tight">
              Institutional Accreditations &amp; Regulatory Licences
            </h2>
            <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto font-sans leading-relaxed">
              Operating under sovereign inter-state power trading licenses, automated National Open Access Registry (NOAR) connectivity, and Bureau of Energy Efficiency Grade-A accredited engineering audits.
            </p>
          </div>
        </div>

        {/* Full-Width Single-Line Continuous Rightward Moving Marquee Ticker */}
        <div className="w-full mt-8 relative z-10">
          <AccreditationsShowcase />
        </div>
      </section>

      {/* Page Divider: Deep Layered Wave Merging Crisp White into Deep Slate Navy Pre-Footer */}
      <PageDivider type="layered-wave" fillColor="#0F172A" bgColor="#FFFFFF" position="bottom" height={75} />

      {/* =========================================================================
          SECTION 10: CINEMATIC DARK NAVY PRE-FOOTER CTA BANNER
         ========================================================================= */}
      <section className="relative py-20 sm:py-28 bg-[#0F172A] text-white overflow-hidden">
        {/* Cinematic Background Lighting Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1600&q=80"
            alt="Industrial electrical infrastructure with ambient night lighting"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-40 sm:opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/85 via-[#0F172A]/60 to-[#0F172A]/75" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl space-y-4 text-center md:text-left">
              <span className="text-xs font-mono uppercase tracking-[0.25em] font-bold text-[#F8BC26]">
                Confidential Factory Feasibility Review
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                Ready to Cut Your Plant&apos;s Electricity Bill by 18%–42%?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                Connect directly with our power trading desk in Ghaziabad or upload your latest high-tension electricity bill for a confidential tariff and load profile audit.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0 w-full sm:w-auto">
              <a
                href="#quick-calculator"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#F8BC26] hover:bg-[#eab308] text-[#1C2C34] font-bold text-xs uppercase tracking-wider transition-all shadow-xl active:scale-95 text-center"
              >
                Start Free Tariff Simulation →
              </a>
              
              <a
                href={`tel:${BRAND.contacts.phonePrimary}`}
                className="w-full sm:w-auto px-6 py-4 rounded-full border border-slate-600 hover:border-white text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-2"
              >
                <PhoneCall className="w-4 h-4 text-[#F8BC26]" />
                <span>Call 24x7 NOC Desk</span>
              </a>

              <a
                href={BRAND.contacts.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Attractive Interactive National Decarbonization & Live Tariff Savings Gauge */}
          <IndustrialDecarbonizationBarometer />

        </div>
      </section>

      {/* =========================================================================
          ATTRACTIVE TRANSITION MODULE: STATE CLEAN POWER TRANSMISSION CORRIDORS & 45-DAY PATHWAY
         ========================================================================= */}
      <DecarbonizationCorridorBridge />

    </div>
  );
}
