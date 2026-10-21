import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calculator, Info, ArrowRight, ShieldCheck, CheckCircle2, Cpu, Zap, PhoneCall } from "lucide-react";
import { OpenAccessSimulator } from "@/components/calculators/OpenAccessSimulator";
import { BillAuditDropzone } from "@/components/calculators/BillAuditDropzone";
import { AlgorithmicDispatchVisualizer } from "@/components/calculators/AlgorithmicDispatchVisualizer";
import { StateTariffMatrix } from "@/components/market/StateTariffMatrix";
import { PageDivider } from "@/components/ui/PageDivider";
import { CornerIndustrialWatermark } from "@/components/ui/CornerIndustrialWatermark";
import { SplitImageMergeSection } from "@/components/ui/SplitImageMergeSection";
import { BRAND } from "@/lib/constants/brand";

export const metadata: Metadata = {
  title: "Open Access ROI Calculator & 96-Block Dispatch Solver | Topnotch Energy",
  description:
    "Instant Open Access economics calculator for Indian industrial plants. Compute annual savings from rooftop solar, Group Captive Solar SPV, 96-block linear dispatch co-optimization, and IEX DAM/GDAM/RTM exchange procurement — incorporating state-specific CSS, Additional Surcharge, wheeling charges, and STU transmission losses.",
};

export default function OpenAccessCalculatorPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      
      {/* =========================================================================
          HERO SECTION WITH CINEMATIC BACKGROUND PHOTOGRAPHY
         ========================================================================= */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-[#0A0F1D] py-20 px-4 sm:px-6 lg:px-8 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=2000&q=80"
            alt="Utility-scale solar array and power transmission infrastructure"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1D]/95 via-[#0A0F1D]/85 to-[#0A0F1D]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>CERC &amp; SERC Notified Tariff Engine (FY 2024–25)</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Onsite Solar + Open Access +{" "}
              <span className="text-[#F8BC26]">
                Exchange Hybrid
              </span>{" "}
              Simulator
            </h1>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
              Model Onsite Rooftop Solar (CAPEX with 40% Accelerated Depreciation vs. OPEX/RESCO), Offsite Group Captive Solar/Wind (Section 42 CSS &amp; AS waiver), Short-Term IEX Trading (DAM/GDAM/RTM), and 4-Hour BESS Peak Shaving — individually or as an integrated industrial decarbonization portfolio.
            </p>
          </div>

          {/* Regulatory Data Basis Bar */}
          <div className="mt-8 flex items-start space-x-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 max-w-3xl text-slate-200">
            <Info className="w-5 h-5 text-[#F8BC26] flex-shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm font-mono leading-relaxed">
              <strong className="text-white">Statutory Data Basis:</strong> Cross-Subsidy Surcharges (CSS) and Additional Surcharges (AS) referenced from latest FY 2024–25 SERC Tariff Orders. Group Captive structures apply 100% CSS/AS statutory waiver under Section 42. CEA Class 0.2s ABT metering telemetry integrated.
            </p>
          </div>
        </div>

        {/* Waaree Fluid Wave Divider: Dark Hero into Ghost Slate Calculator */}
        <div className="absolute bottom-0 inset-x-0 pointer-events-none">
          <PageDivider type="layered-wave" fillColor="#F9FAFB" position="bottom" height={55} />
        </div>
      </section>

      {/* =========================================================================
          MAIN INTERACTIVE SIMULATOR ENGINE
         ========================================================================= */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-[#F8FAFC] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] relative">
        <div className="max-w-7xl mx-auto">
          <OpenAccessSimulator />
        </div>
      </section>

      {/* =========================================================================
          ALGORITHMIC 96-BLOCK DISPATCH SOLVER
         ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-white relative overflow-hidden">
        <CornerIndustrialWatermark type="solar-array" position="top-right" opacity={0.06} />
        <div className="max-w-7xl mx-auto relative z-10">
          <AlgorithmicDispatchVisualizer />
        </div>
      </section>

      {/* =========================================================================
          HOW THE MATHEMATICAL ENGINE COMPUTES TARIFFS
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-[#F9FAFB] relative overflow-hidden">
        <CornerIndustrialWatermark type="substation" position="bottom-left" opacity={0.06} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-14 text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#D97706]">
              Mathematical Integrity
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#1C2C34] tracking-tight">
              How the Engine Computes Landed Tariffs
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "State Regulatory Schedule",
                desc: "We apply your state's SERC-notified CSS and Additional Surcharge per kWh. For Green Energy Open Access (≥100 kW, MoP 2022), CSS is set to zero.",
              },
              {
                step: "02",
                title: "Transmission Losses",
                desc: "State Transmission Utility (STU) pooled losses (3.2%–4.5%) are applied to all grid-delivered power from exchanges and captive plants.",
              },
              {
                step: "03",
                title: "Procurement Cost Build-Up",
                desc: "IEX landed cost = Exchange Rate + Wheeling + CSS/AS + STU loss factor. Group Captive landed cost = PPA Rate + Wheeling only (no CSS/AS per Section 42).",
              },
              {
                step: "04",
                title: "Blended Tariff vs. DISCOM",
                desc: "Blended rate across rooftop, captive, exchange, and residual DISCOM drawl. Net savings = (DISCOM rate − Blended rate) × Annual consumption.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="text-3xl font-black font-mono text-[#F8BC26] mb-3">
                  {item.step}
                </div>
                <h3 className="text-[#1C2C34] font-bold text-base">{item.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2 font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          BILL AUDIT DROPZONE SECTION
         ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <BillAuditDropzone />
        </div>
      </section>

      {/* =========================================================================
          STATE-WISE OPEN ACCESS SURCHARGE MATRIX
         ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-[#F9FAFB] relative overflow-hidden">
        <CornerIndustrialWatermark type="windmills" position="top-right" opacity={0.05} />
        <div className="max-w-7xl mx-auto relative z-10">
          <StateTariffMatrix />
        </div>
      </section>

      {/* Waaree Fluid Wave Divider: Ghost Slate into Dark Navy Pre-Footer */}
      <PageDivider type="layered-wave" fillColor="#0F172A" bgColor="#F9FAFB" position="bottom" height={60} />

      {/* =========================================================================
          WAAREE-GRADE BOARDROOM DOSSIER & FEASIBILITY (HALF-MERGING IMAGE ON WHITE)
         ========================================================================= */}
      <SplitImageMergeSection
        badgeText="Certified Energy Audit Protocol"
        title={
          <>
            Want an Audited <span className="text-[#D97706]">Boardroom Dossier?</span>
          </>
        }
        description="Our BEE Certified Energy Auditors will analyze your last 12 months of DISCOM electricity bills — producing a formal bankable tariff feasibility dossier with month-wise savings projections and SLDC clearance roadmaps."
        bullets={[
          "12-Month Joint Meter Reading (JMR) Analysis",
          "DISCOM vs Group Captive Net Rupee Comparison",
          "Accelerated Depreciation & Tax Shelter Model",
          "48-Hour Executive Delivery Guarantee",
        ]}
        imageUrl="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Utility-scale industrial solar arrays and high-voltage transmission lines"
        primaryCta={{
          label: "Download Boardroom Dossier →",
          href: "/procurement-dossier",
        }}
        secondaryCta={{
          label: `Call Trading Desk: ${BRAND.contacts.phonePrimary}`,
          href: `tel:${BRAND.contacts.phonePrimary}`,
          icon: PhoneCall,
        }}
        stats={[
          { value: "48h SLA", label: "Executive Delivery", sublabel: "Formal Boardroom Dossier" },
          { value: "100%", label: "CSS & AS Waiver", sublabel: "Sec 42 Group Captive" },
        ]}
      />

    </main>
  );
}
