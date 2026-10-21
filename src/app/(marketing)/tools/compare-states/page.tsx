import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StatePolicyComparator } from "@/components/market/StatePolicyComparator";
import { PageDivider } from "@/components/ui/PageDivider";
import { CornerIndustrialWatermark } from "@/components/ui/CornerIndustrialWatermark";
import { SplitImageMergeSection } from "@/components/ui/SplitImageMergeSection";
import { AmbientSpotlightCard } from "@/components/ui/AmbientSpotlightCard";
import { Scale, ArrowRight, ShieldCheck, Info, PhoneCall } from "lucide-react";
import { BRAND } from "@/lib/constants/brand";

export const metadata: Metadata = {
  title: "Multi-State Open Access Policy & Tariff Comparator | Topnotch Energy Solutions",
  description:
    "Side-by-side comparison of Indian state Open Access regulations, Cross-Subsidy Surcharges (CSS), Additional Surcharges (AS), wheeling charges, and banking frameworks across UP, Gujarat, Rajasthan, Haryana, and Maharashtra.",
};

export default function CompareStatesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      
      {/* =========================================================================
          HERO SECTION WITH CINEMATIC INTER-STATE TRANSMISSION PHOTOGRAPHY
         ========================================================================= */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-[#0A0F1D] py-20 px-4 sm:px-6 lg:px-8 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2000&q=80"
            alt="High-voltage interstate power transmission network"
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
              <Scale className="w-4 h-4 text-[#F8BC26]" />
              <span>Multi-Jurisdiction SERC Comparative Matrix</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Multi-State Open Access{" "}
              <span className="text-[#F8BC26]">
                Policy &amp; Tariff
              </span>{" "}
              Comparator
            </h1>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
              Compare retail industrial DISCOM tariffs, wheeling charges across voltage levels (11kV to 132kV), Cross-Subsidy Surcharges (CSS), Additional Surcharges (AS), and energy banking frameworks side-by-side across any three Indian industrial states.
            </p>
          </div>
        </div>

        {/* Waaree Fluid Wave Divider: Dark Hero into Ghost Slate Policy Comparator */}
        <div className="absolute bottom-0 inset-x-0 pointer-events-none">
          <PageDivider type="layered-wave" fillColor="#F9FAFB" position="bottom" height={55} />
        </div>
      </section>

      {/* =========================================================================
          MAIN INTERACTIVE COMPARATOR COMPONENT
         ========================================================================= */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB] border-b border-slate-200 relative overflow-hidden">
        <CornerIndustrialWatermark type="transmission-tower" position="top-right" opacity={0.06} />
        <div className="max-w-7xl mx-auto relative z-10">
          <StatePolicyComparator />
        </div>
      </section>

      {/* =========================================================================
          REGULATORY CONTEXT NOTE (WITH AMBIENT SPOTLIGHT CARD)
         ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200 relative overflow-hidden">
        <CornerIndustrialWatermark type="substation" position="bottom-left" opacity={0.06} />
        <div className="max-w-4xl mx-auto relative z-10">
          <AmbientSpotlightCard
            className="p-8 sm:p-10 shadow-md bg-slate-50/80 backdrop-blur-sm"
            spotlightColor="rgba(4, 120, 87, 0.12)"
            borderColor="rgba(4, 120, 87, 0.3)"
          >
            <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 mb-2">
              <Info className="w-4 h-4 text-emerald-700" />
              <span>Statutory Interpretation Note</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#1C2C34] mb-3">
              Why Multi-State Portfolios Require Tailored Procurement Mixes
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans mb-3">
              In states like <strong>Gujarat</strong>, high industrial grid tariffs combined with monthly banking make
              Wind-Solar Hybrid captive PPAs highly profitable. In <strong>Uttar Pradesh</strong>, solar-hour IEX exchange
              procurement delivers steep discounts against PVVNL/PUVVNL rates, while Group Captive structures provide 100%
              waiver from the ₹1.85/kWh CSS.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
              Topnotch Energy Solutions structures custom cross-state procurement portfolios for multi-locational manufacturers,
              optimizing scheduling and standing clearances across individual SLDCs.
            </p>
          </AmbientSpotlightCard>
        </div>
      </section>

      {/* =========================================================================
          WAAREE-GRADE MULTI-PLANT STATE POLICY STRIP (HALF-MERGING IMAGE ON WHITE)
         ========================================================================= */}
      <SplitImageMergeSection
        badgeText="Multi-State Manufacturing Advisory"
        badgeIcon={Scale}
        title={
          <>
            Operate Multi-State <span className="text-[#D97706]">Manufacturing Facilities?</span>
          </>
        }
        description="Our senior power trading team models unified inter-state procurement portfolios across Gujarat, UP, Rajasthan, Haryana, and Maharashtra — optimizing banking, voltage-level wheeling, and SLDC standing clearances for all plants."
        bullets={[
          "Unified Multi-Plant Portfolio Optimization",
          "Inter-State GNA & T-GNA Clearing at RLDC",
          "State-Specific Banking & Settlement Audits",
          "Consolidated Executive C&I Energy Billing",
        ]}
        imageUrl="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Interstate renewable energy wind turbines across Indian landscapes"
        primaryCta={{
          label: "Single-Plant ROI Calculator →",
          href: "/tools/open-access-calculator",
        }}
        secondaryCta={{
          label: `Call Desk: ${BRAND.contacts.phonePrimary}`,
          href: `tel:${BRAND.contacts.phonePrimary}`,
          icon: PhoneCall,
        }}
        stats={[
          { value: "14 States", label: "Active Clearances", sublabel: "State SLDCs Covered" },
          { value: "₹185+ Cr", label: "Client Rupee Savings", sublabel: "Landed Multi-State" },
        ]}
      />

    </main>
  );
}
