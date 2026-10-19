import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, Activity, Clock, TrendingUp, Info, ArrowRight } from "lucide-react";
import { Iex96BlockChart } from "@/components/market/Iex96BlockChart";
import { MarketSummaryCards } from "@/components/market/MarketSummaryCards";
import { StateTariffMatrix } from "@/components/market/StateTariffMatrix";

export const metadata: Metadata = {
  title: "Live 96-Block IEX Market Intelligence | Topnotch Energy Solutions",
  description:
    "Real-time Indian Energy Exchange (IEX) 96 time-block clearing price terminal. Monitor DAM, GDAM, RTM, and Solar Generation curves across all 15-minute intervals from 00:00 to 24:00 IST.",
};

export default function MarketIntelligencePage() {
  return (
    <main className="min-h-screen bg-grid-navy-950 text-white">
      {/* Hero */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-b border-grid-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-grid-cyan-500/10 border border-grid-cyan-500/30 text-grid-cyan-400 text-[11px] font-mono font-bold uppercase tracking-widest mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-grid-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-grid-cyan-500" />
                </span>
                <span>Live Market Terminal</span>
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                IEX 96-Block{" "}
                <span className="text-grid-cyan-400">Market Intelligence</span>
              </h1>
              <p className="mt-3 text-grid-slate-300 text-sm max-w-xl leading-relaxed">
                Day-Ahead Market (DAM), Green Day-Ahead Market (GDAM), Real-Time Market (RTM), and Onsite Solar
                Generation curve across all 96 settlement blocks (15-minute intervals, 00:00–24:00 IST).
              </p>
            </div>
            <div className="flex items-center space-x-2 text-[11px] font-mono text-grid-slate-500">
              <Clock className="w-3.5 h-3.5" />
              <span>Data: IEX Typical Trading Day (Illustrative) | CERC Price Cap ₹10,000/MWh</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Market Summary KPI Cards with Unit Toggle */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-grid-slate-800 bg-grid-navy-900/30">
        <div className="max-w-7xl mx-auto">
          <MarketSummaryCards />
        </div>
      </section>

      {/* Main 96-Block Chart */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 border-b border-grid-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-white">
                96 Time-Block Clearing Price Terminal
              </h2>
              <p className="text-grid-slate-500 text-xs font-mono mt-0.5">
                Toggle DAM / GDAM / RTM / Solar curves • Mobile: drag crosshair to inspect blocks
              </p>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-grid-amber-500/10 border border-grid-amber-500/30 text-grid-amber-400 text-[11px] font-mono">
              <Info className="w-3.5 h-3.5" />
              <span>Illustrative typical trading day — not live streaming</span>
            </div>
          </div>
          <Iex96BlockChart />
        </div>
      </section>

      {/* Market Segment Explainer */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 border-b border-grid-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-extrabold text-white mb-8">
            Understanding IEX Market Segments
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                name: "DAM – Day Ahead Market",
                color: "text-grid-cyan-400",
                border: "border-grid-cyan-400/20",
                bg: "bg-grid-cyan-400/5",
                icon: BarChart3,
                description:
                  "India's most liquid power market. Closed double-sided collective bids submitted daily 10:00 AM–12:00 PM for all 96 blocks of the next delivery day. Uniform clearing price across all accepted bids.",
                keyFacts: [
                  "Bid window: 10:00–12:00 daily",
                  "Clearing: Market Coupling Algorithm",
                  "Avg volume: 100–140 MUs/day",
                  "Price cap: ₹10,000/MWh (CERC)",
                ],
              },
              {
                name: "GDAM – Green Day Ahead Market",
                color: "text-grid-emerald-400",
                border: "border-grid-emerald-400/20",
                bg: "bg-grid-emerald-400/5",
                icon: Activity,
                description:
                  "Dedicated renewable energy exchange market introduced under CERC (Power Market) Regulations 2021. Allows obligated entities to fulfil RPO targets through GDAM purchases, with green attribute certificates issued.",
                keyFacts: [
                  "Only RE generation sources eligible",
                  "Green certificates with each purchase",
                  "Competitive solar-hour prices ₹2.90–₹3.20/kWh",
                  "No Additional Surcharge on GDAM",
                ],
              },
              {
                name: "RTM – Real-Time Market",
                color: "text-purple-400",
                border: "border-purple-400/20",
                bg: "bg-purple-400/5",
                icon: Clock,
                description:
                  "India's newest short-term segment with 48 sessions per day (every 30 minutes), 1-hour gate closure. Allows continuous balancing of plant deviations and arbitrage of sudden market price movements.",
                keyFacts: [
                  "48 sessions × 2 blocks per session",
                  "1-hour gate closure (statutory)",
                  "Linked to DSM frequency price signals",
                  "Ideal for SCADA-integrated plants",
                ],
              },
              {
                name: "TAM – Term Ahead Market",
                color: "text-grid-amber-400",
                border: "border-grid-amber-400/20",
                bg: "bg-grid-amber-400/5",
                icon: TrendingUp,
                description:
                  "Forward bilateral contracts ranging from intra-day (delivery within 3 hours) to monthly tenure (up to 90 days forward). Allows industrial consumers to hedge against expected evening peak price spikes.",
                keyFacts: [
                  "Tenors: Intra-Day to 3 months",
                  "Firm physical delivery contracts",
                  "Hedge against seasonal DAM spikes",
                  "Includes GTAM for renewable forward hedging",
                ],
              },
            ].map((seg) => {
              const Icon = seg.icon;
              return (
                <div
                  key={seg.name}
                  className={`rounded-2xl border p-5 ${seg.border} ${seg.bg}`}
                >
                  <Icon className={`w-5 h-5 ${seg.color} mb-3`} />
                  <h3 className={`font-extrabold text-sm ${seg.color}`}>{seg.name}</h3>
                  <p className="text-grid-slate-400 text-xs leading-relaxed mt-2">{seg.description}</p>
                  <div className="mt-3 space-y-1">
                    {seg.keyFacts.map((fact) => (
                      <div key={fact} className="flex items-start space-x-1.5 text-[11px] text-grid-slate-400 font-mono">
                        <span className={seg.color}>›</span>
                        <span>{fact}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* State-Wise Open Access Surcharge Matrix */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 border-b border-grid-slate-800">
        <div className="max-w-7xl mx-auto">
          <StateTariffMatrix />
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-extrabold text-white">
            Ready to Participate in These Markets?
          </h2>
          <p className="text-grid-slate-400 text-sm font-mono mt-3">
            Topnotch&apos;s 24×7 NOC Bidding Desk executes DAM, GDAM, and RTM bids on behalf of industrial clients
            across IEX, PXIL, and HPX — with automated SLDC scheduling integration.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-grid-emerald-500 hover:bg-grid-emerald-400 text-grid-navy-950 font-bold font-mono text-sm transition-all shadow-lg shadow-grid-emerald-500/20 flex items-center space-x-2"
            >
              <span>Start Exchange Participation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tools/open-access-calculator"
              className="px-6 py-3 rounded-xl border border-grid-slate-700 bg-grid-navy-900 hover:bg-grid-navy-800 text-white font-mono text-sm font-bold transition-colors"
            >
              Calculate Plant Savings
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
