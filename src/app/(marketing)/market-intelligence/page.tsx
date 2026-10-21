import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  Activity,
  Clock,
  TrendingUp,
  Info,
  ArrowRight,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Radio,
  FileText,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import { Iex96BlockChart } from "@/components/market/Iex96BlockChart";
import { MarketSummaryCards } from "@/components/market/MarketSummaryCards";
import { StateTariffMatrix } from "@/components/market/StateTariffMatrix";
import { PageDivider } from "@/components/ui/PageDivider";
import { CornerIndustrialWatermark } from "@/components/ui/CornerIndustrialWatermark";
import { PlantArbitrageSimulator } from "@/components/market/PlantArbitrageSimulator";
import { SplitImageMergeSection } from "@/components/ui/SplitImageMergeSection";
import { BRAND } from "@/lib/constants/brand";

export const metadata: Metadata = {
  title: "Live 96-Block IEX Market Intelligence | Topnotch Energy Solutions",
  description:
    "Real-time Indian Energy Exchange (IEX) 96 time-block clearing price terminal. Monitor DAM, GDAM, RTM, and Solar Generation curves across all 15-minute intervals from 00:00 to 24:00 IST.",
};

export default function MarketIntelligencePage() {
  const tradingAdvisories = [
    {
      time: "Slot 48 (12:00 IST)",
      tag: "Solar GDAM Opportunity",
      text: "Solar GDAM clearing at ₹3.15/kWh across Slots 45–60. Heavy industrial plants on Open Access saving ₹48,000/hour vs DISCOM peak tariff.",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    },
    {
      time: "Slot 76 (19:00 IST)",
      tag: "Evening Peak Warning",
      text: "Evening ToD peak surcharge active. Real-Time Market (RTM) clearing at ₹7.80/kWh. Non-critical furnace batches shifted to night valley hours.",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    },
    {
      time: "CERC Regulatory Order",
      tag: "DSM 2024 Status",
      text: "Grid frequency maintained at 50.012 Hz. Automated SCADA scheduling eliminated 100% of overdrawl deviation settlement penalties.",
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-800">
      
      {/* =========================================================================
          HERO SECTION WITH CINEMATIC DISPATCH CONTROL ROOM BACKGROUND PHOTOGRAPHY
         ========================================================================= */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-[#0A0F1D] py-20 px-4 sm:px-6 lg:px-8 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80"
            alt="National power grid dispatch control room telemetry monitors"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1D]/95 via-[#0A0F1D]/85 to-[#0A0F1D]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-transparent to-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="font-bold uppercase tracking-wider text-[11px] text-[#F8BC26]">
                  Live IEX / PXIL / HPX Telemetry Desk
                </span>
                <span className="text-white/40">|</span>
                <span className="text-slate-200 text-[11px]">15-Min Settlement Blocks</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                96-Time-Block National{" "}
                <span className="text-[#F8BC26]">
                  Power Exchange Terminal
                </span>
              </h1>

              <p className="text-slate-200 text-sm sm:text-base max-w-2xl leading-relaxed font-sans">
                Real-time clearing price analytics across Day-Ahead Market (DAM), Green Day-Ahead Market (GDAM), Real-Time Market (RTM), and solar generation curves from 00:00 to 24:00 IST. Benchmarked against CERC price caps and DISCOM industrial retail tariffs.
              </p>
            </div>

            {/* Quick Action Cluster */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
              <Link
                href="/tools/open-access-calculator"
                className="px-6 py-3.5 rounded-full bg-[#F8BC26] hover:bg-[#eab308] text-[#1C2C34] font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center space-x-2"
              >
                <Zap className="w-4 h-4" />
                <span>Simulate Exchange Savings</span>
              </Link>
              <a
                href={`tel:${BRAND.contacts.phonePrimary}`}
                className="px-5 py-3.5 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-colors flex items-center justify-center space-x-2"
              >
                <PhoneCall className="w-4 h-4 text-[#F8BC26]" />
                <span>Call 24x7 Bidding Floor</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          LIVE TRADING FLOOR ADVISORY TICKER
         ========================================================================= */}
      <section className="bg-[#0F172A] border-y border-slate-800 py-3.5 px-4 sm:px-6 lg:px-8 text-xs font-mono text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="font-bold text-white uppercase text-[11px] tracking-wider">
              NOC TRADER DISPATCH DESK:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            {tradingAdvisories.map((advisory, idx) => (
              <div
                key={idx}
                className="inline-flex items-center space-x-2 px-3 py-1 rounded-xl bg-white/5 border border-slate-800"
              >
                <span className="text-[#F8BC26] font-bold">{advisory.time}:</span>
                <span className="text-slate-300 truncate max-w-[280px] sm:max-w-md">{advisory.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waaree Fluid Wave Divider: Dark NOC Floor to Ghost Slate Observatory */}
      <PageDivider type="layered-wave" fillColor="#F9FAFB" bgColor="#0F172A" position="bottom" height={55} />

      {/* =========================================================================
          INTERACTIVE MARKET SUMMARY CARDS WITH UNIT TOGGLE
         ========================================================================= */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB] border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <MarketSummaryCards />
        </div>
      </section>

      {/* =========================================================================
          MAIN 96-BLOCK CHART TERMINAL
         ========================================================================= */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] font-bold text-[#0284C7]">
                Continuous 24-Hour Bourse Dispatch
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1C2C34] mt-1 tracking-tight">
                96 Time-Block Market Clearing Price Curve
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm font-mono mt-1">
                Toggle DAM / GDAM / RTM / Solar curves • Touch or scrub over chart blocks to inspect discrete 15-minute intervals
              </p>
            </div>

            <div className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono self-start sm:self-auto shadow-2xs">
              <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>CERC Price Cap: ₹10,000/MWh (₹10.00/kWh)</span>
            </div>
          </div>

          <div className="p-4 sm:p-8 bg-slate-50/60 border border-slate-200/90 rounded-3xl shadow-sm">
            <Iex96BlockChart />
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE FACTORY ARBITRAGE SIMULATOR
         ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-[#F9FAFB] relative overflow-hidden">
        <CornerIndustrialWatermark type="windmills" position="top-right" opacity={0.06} />
        <CornerIndustrialWatermark type="solar-array" position="bottom-left" opacity={0.06} />
        <div className="max-w-7xl mx-auto relative z-10">
          <PlantArbitrageSimulator />
        </div>
      </section>

      {/* =========================================================================
          EXCHANGE ARCHITECTURE & MARKET SEGMENTS EXPLAINER
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200 relative overflow-hidden">
        <CornerIndustrialWatermark type="transmission-tower" position="top-right" opacity={0.06} />
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D97706]">
              Regulatory Market Mechanics
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#1C2C34] tracking-tight">
              Understanding IEX Trading Segments
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
              How Indian power exchanges operate under the Central Electricity Regulatory Commission (CERC Power Market Regulations 2021).
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "DAM – Day Ahead Market",
                icon: BarChart3,
                iconColor: "text-blue-700",
                iconBg: "bg-blue-50 border-blue-200",
                description:
                  "India's most liquid collective power market. Closed double-sided bids submitted daily 10:00–12:00 IST for all 96 blocks of the next delivery day. Uniform market clearing price.",
                keyFacts: [
                  "Bid window: 10:00–12:00 daily",
                  "Clearing: Uniform Market Coupling",
                  "Avg volume: 100–140 MUs/day",
                  "Price cap: ₹10,000/MWh (CERC)",
                ],
              },
              {
                name: "GDAM – Green Day Ahead",
                icon: Activity,
                iconColor: "text-emerald-700",
                iconBg: "bg-emerald-50 border-emerald-200",
                description:
                  "Dedicated renewable energy segment. Industrial consumers buy zero-carbon power at solar dip hours (₹2.90–₹3.60/kWh) with verifiable Green Attribute Certificates for Scope-2 RPO compliance.",
                keyFacts: [
                  "100% Renewable Generation",
                  "Green Attribute Certificates issued",
                  "Solar dip rates: ₹2.90–₹3.60/kWh",
                  "100% Exemption from Additional Surcharge",
                ],
              },
              {
                name: "RTM – Real-Time Market",
                icon: Clock,
                iconColor: "text-amber-700",
                iconBg: "bg-amber-50 border-amber-200",
                description:
                  "India's flexible balancing segment operating 48 half-hour sessions per day with 1-hour gate closure. Dynamically adjusts factory load deviations and mitigates Deviation Settlement (DSM) penalties.",
                keyFacts: [
                  "48 half-hour sessions daily",
                  "1-hour statutory gate closure",
                  "Protects against DSM penalties",
                  "Automated SCADA desk dispatch",
                ],
              },
              {
                name: "TAM – Term Ahead Contracts",
                icon: TrendingUp,
                iconColor: "text-purple-700",
                iconBg: "bg-purple-50 border-purple-200",
                description:
                  "Forward physical delivery contracts ranging from intra-day (within 3 hours) to monthly bilateral tenors (up to 90 days). Protects heavy continuous industries against seasonal power price volatility.",
                keyFacts: [
                  "Tenors: Intra-day to 90 days",
                  "Firm physical delivery contracts",
                  "Hedges seasonal tariff spikes",
                  "Includes GTAM for green hedging",
                ],
              },
            ].map((seg) => {
              const Icon = seg.icon;
              return (
                <div
                  key={seg.name}
                  className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl ${seg.iconBg} ${seg.iconColor} border flex items-center justify-center mb-4 shadow-xs`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-[#1C2C34] text-base">{seg.name}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed mt-2.5 font-sans">{seg.description}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                    {seg.keyFacts.map((fact) => (
                      <div key={fact} className="flex items-start space-x-2 text-xs text-slate-600 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{fact}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          STATE-WISE OPEN ACCESS SURCHARGE & POLICY MATRIX
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-[#F9FAFB] relative overflow-hidden">
        <CornerIndustrialWatermark type="substation" position="bottom-right" opacity={0.06} />
        <div className="max-w-7xl mx-auto relative z-10">
          <StateTariffMatrix />
        </div>
      </section>

      {/* =========================================================================
          WAAREE-GRADE BOURSE ONBOARDING & 24x7 DESK (HALF-MERGING IMAGE ON WHITE)
         ========================================================================= */}
      <SplitImageMergeSection
        badgeText="Institutional Bourse Operations"
        title={
          <>
            Ready to Capitalize on <span className="text-[#D97706]">Exchange Tariffs?</span>
          </>
        }
        description="Topnotch's 24x7 NOC Bidding Desk executes DAM, GDAM, and RTM bids on behalf of industrial clients across IEX, PXIL, and HPX — with automated SLDC scheduling integration and zero DSM penalty risk."
        bullets={[
          "Live 15-Minute Clearing Price Tracking",
          "Automated SCADA & SLDC Scheduling Integration",
          "Zero DSM Deviation Penalty Protection",
          "CERC Category-IV Licensed Trading Desk",
        ]}
        imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Modern power exchange trading floor and dispatch terminal"
        primaryCta={{
          label: "Onboard Your Factory to IEX",
          href: "/tools/open-access-calculator",
        }}
        secondaryCta={{
          label: "Download Empanelment Dossier",
          href: "/procurement-dossier",
        }}
        stats={[
          { value: "48 Windows", label: "Daily RTM Auctions", sublabel: "Continuous Bidding" },
          { value: "50.0 Hz", label: "IEGC Grid Band", sublabel: "Zero DSM Penalty" },
        ]}
      />

    </main>
  );
}
