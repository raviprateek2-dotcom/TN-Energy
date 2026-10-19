import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, Info, ArrowRight } from "lucide-react";
import { OpenAccessSimulator } from "@/components/calculators/OpenAccessSimulator";
import { BillAuditDropzone } from "@/components/calculators/BillAuditDropzone";
import { StateTariffMatrix } from "@/components/market/StateTariffMatrix";

export const metadata: Metadata = {
  title: "Open Access ROI Calculator | Topnotch Energy Solutions",
  description:
    "Instant Open Access economics calculator for Indian industrial plants. Compute annual savings from rooftop solar, Group Captive Solar SPV, and IEX DAM/GDAM/RTM exchange procurement — incorporating state-specific CSS, Additional Surcharge, wheeling charges, and STU transmission losses.",
};

export default function OpenAccessCalculatorPage() {
  return (
    <main className="min-h-screen bg-grid-navy-950 text-white">
      {/* Hero */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-b border-grid-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-grid-emerald-500/10 border border-grid-emerald-500/30 text-grid-emerald-400 text-[11px] font-mono font-bold uppercase tracking-widest mb-4">
              Unified Energy Transition Simulator
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Onsite Solar + Open Access +{" "}
              <span className="text-grid-emerald-400">Exchange Hybrid</span> Simulator
            </h1>
            <p className="mt-3 text-grid-slate-300 text-sm max-w-2xl leading-relaxed">
              Model Onsite Rooftop Solar (CAPEX with 40% Accelerated Depreciation vs. OPEX/RESCO), Offsite Group Captive
              Solar/Wind (Section 42 CSS &amp; AS waiver), Short-Term IEX Trading (DAM/GDAM/RTM), and 4-Hour BESS Evening
              Peak Shaving — either individually or as an integrated industrial decarbonization portfolio.
            </p>
          </div>

          {/* Methodology callout */}
          <div className="mt-6 flex items-start space-x-2 bg-grid-navy-900 border border-grid-slate-800 rounded-xl px-4 py-3 max-w-2xl">
            <Info className="w-4 h-4 text-grid-cyan-400 flex-shrink-0 mt-0.5" />
            <p className="text-grid-slate-400 text-xs font-mono leading-relaxed">
              <strong className="text-white">Data basis:</strong> CSS and AS from SERC orders (FY 2024-25). Wheeling
              charges per voltage level (11kV / 33kV / 132kV). Rooftop LCOE: ₹1.55/kWh (ALMM-II TOPCon Bifacial, 25yr
              RESCO). Captive PPA: ₹3.85/kWh blended (wind-solar hybrid). IEX DAM solar-hour avg: ₹3.85/kWh default
              (adjustable).
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-grid-slate-800">
        <div className="max-w-7xl mx-auto">
          <OpenAccessSimulator />
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 border-b border-grid-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-extrabold text-white mb-8">How the Calculator Works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                step: "01",
                title: "State Regulatory Data",
                desc: "We apply your state's SERC-notified CSS and Additional Surcharge per kWh. For Green Energy Open Access (≥100 kW, MoP 2022), CSS is set to zero.",
                color: "text-grid-cyan-400",
              },
              {
                step: "02",
                title: "Transmission Losses",
                desc: "State Transmission Utility (STU) pooled losses (3.2%–4.5%) are applied to all grid-delivered power from exchanges and captive plants.",
                color: "text-grid-emerald-400",
              },
              {
                step: "03",
                title: "Procurement Cost Build-Up",
                desc: "IEX landed cost = Exchange Rate + Wheeling + CSS/AS + STU loss factor. Group Captive landed cost = PPA Rate + Wheeling only (no CSS/AS per Section 9).",
                color: "text-grid-amber-400",
              },
              {
                step: "04",
                title: "Blended Tariff vs. Discom",
                desc: "Blended rate across rooftop, captive, exchange, and residual Discom drawl. Savings = (Discom rate − Blended rate) × Annual consumption.",
                color: "text-purple-400",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-5"
              >
                <div className={`text-3xl font-extrabold font-mono tabular-nums ${item.color} mb-3`}>
                  {item.step}
                </div>
                <h3 className="text-white font-bold text-sm">{item.title}</h3>
                <p className="text-grid-slate-400 text-xs leading-relaxed mt-1.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bill Audit Dropzone Section */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 border-b border-grid-slate-800 bg-grid-navy-900/20">
        <div className="max-w-7xl mx-auto">
          <BillAuditDropzone />
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
            Want a Detailed BEE-Grade Audit?
          </h2>
          <p className="text-grid-slate-400 text-sm font-mono mt-3">
            Our in-house BEE Certified Energy Auditors will review your last 12 months of actual billing data —
            producing a formal tariff analysis with month-wise savings projections, optimal procurement mix, and
            SLDC standing clearance roadmap.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-grid-emerald-500 hover:bg-grid-emerald-400 text-grid-navy-950 font-bold font-mono text-sm transition-all shadow-lg shadow-grid-emerald-500/20 flex items-center space-x-2"
            >
              <span>Request Formal Tariff Audit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/case-studies"
              className="px-6 py-3 rounded-xl border border-grid-slate-700 bg-grid-navy-900 hover:bg-grid-navy-800 text-white font-mono text-sm font-bold transition-colors flex items-center space-x-2"
            >
              <Calculator className="w-4 h-4 text-grid-cyan-400" />
              <span>View Client Case Studies</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
