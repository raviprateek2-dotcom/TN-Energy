"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Factory,
  TrendingDown,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  X,
  Zap,
  BarChart3,
  Scale,
  Clock,
  FileText,
  Calculator,
  ChevronLeft,
  ChevronRight,
  Sliders,
} from "lucide-react";

export interface SectorInsight {
  id: string;
  name: string;
  subtitle: string;
  savingsHeadline: string;
  image: string;
  demandProfile: string;
  discomRate: string;
  topnotchRate: string;
  annualSavingsRange: string;
  procurementMix: { source: string; share: number; color: string }[];
  shiftOptimization: string;
  powerFactorStrategy: string;
  regulatoryBasis: string;
  verifiedCaseReference: string;
}

const SECTOR_INSIGHTS: SectorInsight[] = [
  {
    id: "steel",
    name: "Steel & Induction Furnaces",
    subtitle: "Continuous round-the-clock melting & rolling mills",
    savingsHeadline: "₹1.40–₹2.50/kWh Net Reduction",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    demandProfile: "10,000 kVA to 30,000 kVA (Continuous furnace baseload with extreme reactive power drawl)",
    discomRate: "₹8.10 – ₹9.50 / kWh (HT-2 Industrial)",
    topnotchRate: "₹4.80 – ₹5.64 / kWh (Blended Landed)",
    annualSavingsRange: "₹12.0 – ₹25.0 Crores / year",
    procurementMix: [
      { source: "IEX Day-Ahead Market (Off-Peak Baseload)", share: 55, color: "bg-amber-500" },
      { source: "IEX Real-Time Market (RTM Furnace Load Balancing)", share: 25, color: "bg-blue-500" },
      { source: "DISCOM Standby Grid Drawl", share: 20, color: "bg-slate-400" },
    ],
    shiftOptimization:
      "Automated bidding across 96 time-blocks shifts high-tonnage scrap melting to night valley hours (23:00 to 06:00 IST). Real-Time Market (RTM) bids are dynamically executed with 1-hour gate closure during furnace batch delays, eliminating Deviation Settlement (DSM) penalties.",
    powerFactorStrategy:
      "High-speed thyristorized detuned APFC capacitor banks maintain an operating power factor of 0.998, eliminating inductive penalties and unlocking up to ₹84 Lakhs in annual Discom PF rebates directly on monthly bills.",
    regulatoryBasis:
      "CERC Indian Electricity Grid Code (IEGC) 2023, CERC Deviation Settlement Mechanism (DSM 2024), and Section 42 Open Access.",
    verifiedCaseReference: "North India Steel Rolling Mill (14,000 kVA, Ghaziabad UP) – ₹14.42 Cr Annualized Savings.",
  },
  {
    id: "textiles",
    name: "Textile & Spinning Mills",
    subtitle: "Heavy kVA demand with razor-thin operating margins",
    savingsHeadline: "₹1.60–₹2.80/kWh Net Reduction",
    image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80",
    demandProfile: "5,000 kVA to 25,000 kVA (Flat 24x7 3-shift continuous baseload, >85% load factor)",
    discomRate: "₹7.45 – ₹8.80 / kWh (State Industrial Grid)",
    topnotchRate: "₹4.05 – ₹4.61 / kWh (Hybrid Landed)",
    annualSavingsRange: "₹15.0 – ₹30.0 Crores / year",
    procurementMix: [
      { source: "Wind-Solar Hybrid (WSH) Group Captive Asset", share: 70, color: "bg-emerald-500" },
      { source: "Green Day-Ahead Market (GDAM Off-Peak)", share: 15, color: "bg-teal-500" },
      { source: "DISCOM HT Grid Supply", share: 15, color: "bg-slate-400" },
    ],
    shiftOptimization:
      "Continuous ring spinning machines require uninterrupted baseload. Offsite 22 MW Wind-Solar Hybrid (WSH) Group Captive SPVs supply daytime solar paired with night-blowing coastal wind, matching weaving cycles 24 hours a day with zero production interruption.",
    powerFactorStrategy:
      "Harmonic mitigation via active harmonic filters (AHF) attenuates VFD-induced 5th and 7th order harmonics from high-speed spindles, prolonging motor lifespan and keeping total harmonic distortion (THD) below IEEE 519 standards.",
    regulatoryBasis:
      "Electricity Rule 3 (100% waiver of Cross-Subsidy Surcharge & Additional Surcharge), MoP Green Energy Open Access (GEOA 2022), and GERC RE Policy 2023.",
    verifiedCaseReference: "Integrated Synthetic Textile Industrial Park (18,500 kVA, Dahej Gujarat) – ₹22.26 Cr Annualized Savings.",
  },
  {
    id: "chemicals",
    name: "Chemicals & Process Plants",
    subtitle: "33 kV / 66 kV grid interconnection with stringent safety baseload",
    savingsHeadline: "₹1.50–₹2.40/kWh Net Reduction",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    demandProfile: "4,000 kVA to 20,000 kVA (Continuous process reactors with zero tolerance for voltage sag)",
    discomRate: "₹7.90 – ₹9.20 / kWh (High Tension HT-2)",
    topnotchRate: "₹4.20 – ₹4.95 / kWh (Landed PPA)",
    annualSavingsRange: "₹8.0 – ₹18.0 Crores / year",
    procurementMix: [
      { source: "Group Captive Solar SPV (Section 42 Equity)", share: 65, color: "bg-amber-500" },
      { source: "IEX Day-Ahead Solar-Dip Power", share: 20, color: "bg-blue-500" },
      { source: "DISCOM Dual-Feeder Standby", share: 15, color: "bg-slate-400" },
    ],
    shiftOptimization:
      "Continuous chemical synthesizers operate with dual-feeder redundancy. Topnotch integrates CEA Class 0.2s SEM meters with real-time AMR modems directly linked to SLDC dispatch rooms to guarantee uncompromised grid power quality and zero unscheduled tripping.",
    powerFactorStrategy:
      "Centralized automatic power factor controllers coupled with reactor-tuned capacitor banks prevent capacitive over-excitation during light reactor loading, sustaining 0.995+ PF continuously.",
    regulatoryBasis:
      "SERC Open Access Regulations, CEA Technical Standards for Connectivity to the Grid, and 100% Green Energy Certificate (REC) issuance for global ESG compliance.",
    verifiedCaseReference: "DS Group Multi-Facility FMCG & Chemical Cluster (8,500 kVA, Noida UP) – ₹10.60 Cr Annualized Savings.",
  },
  {
    id: "coldchain",
    name: "Cold Storage & Food Processing",
    subtitle: "High daytime refrigeration peaks coinciding with solar generation",
    savingsHeadline: "₹1.80–₹3.20/kWh Net Reduction",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    demandProfile: "1,500 kVA to 10,000 kVA (Extreme summer daytime compressor refrigeration cycles)",
    discomRate: "₹8.50 – ₹10.20 / kWh (Commercial / Food Industrial)",
    topnotchRate: "₹3.80 – ₹4.50 / kWh (Blended Solar + Captive)",
    annualSavingsRange: "₹4.0 – ₹12.0 Crores / year",
    procurementMix: [
      { source: "Industrial PEB Shed TOPCon Rooftop Solar", share: 45, color: "bg-amber-500" },
      { source: "Group Captive Solar SPV Offsite Drawl", share: 40, color: "bg-emerald-500" },
      { source: "DISCOM Grid Drawl (Night Baselines)", share: 15, color: "bg-slate-400" },
    ],
    shiftOptimization:
      "Compressor staging is intelligently pre-programmed to over-chill cold storage chambers during peak solar hours (10:00 to 14:00 IST) when on-site TOPCon solar is producing at ₹1.55/kWh LCOE, substantially cutting high-tariff DISCOM peak evening drawl.",
    powerFactorStrategy:
      "Individual APFC banks on high-horsepower ammonia and Freon screw compressors eliminate inductive motor lag, stabilizing terminal voltage and reducing internal transformer heat losses.",
    regulatoryBasis:
      "Ministry of Power Net/Gross Open Access Framework, State Agro-Industrial Cold Chain tariff concessions, and BEE Grade-A Energy Auditing.",
    verifiedCaseReference: "Leading Northern Agro-Processing & Bottling Facility (6,800 kVA, Haryana) – ₹5.40 Cr Annualized Savings.",
  },
  {
    id: "paper",
    name: "Pulp, Paper & Corrugated Packaging",
    subtitle: "Heavy round-the-clock drying cylinders & hydrapulper baseload",
    savingsHeadline: "₹1.65–₹2.70/kWh Net Reduction",
    image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=800&q=80",
    demandProfile: "8,000 kVA to 22,000 kVA (24x7 high steam and continuous electrical load profile)",
    discomRate: "₹7.85 – ₹9.15 / kWh (State HT Industrial)",
    topnotchRate: "₹4.10 – ₹4.75 / kWh (Blended Captive + Bourse)",
    annualSavingsRange: "₹9.5 – ₹21.0 Crores / year",
    procurementMix: [
      { source: "Group Captive Solar/Wind Hybrid SPV", share: 60, color: "bg-emerald-500" },
      { source: "IEX Day-Ahead Market Off-Peak Power", share: 25, color: "bg-blue-500" },
      { source: "DISCOM Standby Supply", share: 15, color: "bg-slate-400" },
    ],
    shiftOptimization:
      "Co-generation steam turbine generation is co-optimized with external IEX power. When exchange power clears under ₹3.20/kWh during daytime solar dip hours, high-pressure steam is diverted to drying sections while electricity drawl is scheduled via open access.",
    powerFactorStrategy:
      "Dynamic tuned harmonic filters mitigate high non-linear loads created by DC drives on paper machines, ensuring unity power factor across all 96 settlement blocks.",
    regulatoryBasis:
      "CERC Open Access Regulations 2021, State Captive Energy Banking Norms, and Energy Conservation Act (PAT Cycle Designated Consumer).",
    verifiedCaseReference: "Century Plyboards & Paper Division (12,500 kVA, West Bengal) – ₹11.85 Cr Annualized Savings.",
  },
  {
    id: "auto",
    name: "Automotive Ancillaries & Precision Forging",
    subtitle: "High-tonnage stamping presses, CNC lines & induction heaters",
    savingsHeadline: "₹1.55–₹2.90/kWh Net Reduction",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    demandProfile: "3,000 kVA to 16,000 kVA (High peak-to-average ratio with surge inductive loads)",
    discomRate: "₹8.20 – ₹9.80 / kWh (High Tension Auto Cluster)",
    topnotchRate: "₹4.25 – ₹4.85 / kWh (Landed Hybrid)",
    annualSavingsRange: "₹6.0 – ₹16.5 Crores / year",
    procurementMix: [
      { source: "Onsite PEB Shed Rooftop Solar (TOPCon Bifacial)", share: 35, color: "bg-amber-500" },
      { source: "Group Captive Wind-Solar Hybrid SPV", share: 45, color: "bg-emerald-500" },
      { source: "IEX Real-Time Market (Peak Shaving)", share: 20, color: "bg-blue-500" },
    ],
    shiftOptimization:
      "Heavy billet induction heating batches are scheduled during off-peak morning and night blocks. Automated SCADA scheduling matches robotics and CNC lines with real-time bourse cleared slots.",
    powerFactorStrategy:
      "Fast-acting thyristor switched capacitor (TSC) banks respond in under 5 milliseconds to rapid forge press stroke cycling, eliminating voltage flickers and maintaining 0.998 PF.",
    regulatoryBasis:
      "State Electricity Regulatory Commission (SERC) Open Access Regulations and CEA Substation Telemetry Standards.",
    verifiedCaseReference: "Tier-1 Auto Component Forging Plant (7,200 kVA, Manesar Haryana) – ₹7.90 Cr Annualized Savings.",
  },
  {
    id: "cement",
    name: "Cement Grinding & Clinker Ball Mills",
    subtitle: "Heavy 66 kV / 132 kV dedicated transmission substation drawl",
    savingsHeadline: "₹1.70–₹2.85/kWh Net Reduction",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80",
    demandProfile: "15,000 kVA to 45,000 kVA (Massive continuous motor loads on vertical roller mills)",
    discomRate: "₹7.95 – ₹9.40 / kWh (HT Heavy Industrial)",
    topnotchRate: "₹3.95 – ₹4.55 / kWh (Landed Captive Blend)",
    annualSavingsRange: "₹22.0 – ₹55.0 Crores / year",
    procurementMix: [
      { source: "Utility Scale Solar & Wind Group Captive SPV", share: 70, color: "bg-emerald-500" },
      { source: "IEX Day-Ahead Baseload Procurement", share: 20, color: "bg-blue-500" },
      { source: "Grid Standby & Deviation Balancing", share: 10, color: "bg-slate-400" },
    ],
    shiftOptimization:
      "Cement ball mill operations are shifted to maximize off-peak solar generation hours and night tariff concessions. Continuous 15-minute AMR telemetry coordinates drawl with State Load Despatch Centre (SLDC) schedules.",
    powerFactorStrategy:
      "Substation-level synchronous condenser and multi-stage detuned capacitor banks eliminate large reactive kVAR drawl from slip-ring induction motors.",
    regulatoryBasis:
      "Electricity Act 2003 (Section 42 & Rule 3 Captive Exemption), CERC Connectivity Regulations, and CEA 0.2s Metering.",
    verifiedCaseReference: "Integrated Clinker Grinding Plant (28,000 kVA, Rajasthan) – ₹34.20 Cr Annualized Savings.",
  },
  {
    id: "pharma",
    name: "Pharmaceuticals & Active Pharma (API)",
    subtitle: "Zero-tolerance cleanrooms, lyophilizers & chilled water loops",
    savingsHeadline: "₹1.45–₹2.60/kWh Net Reduction",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    demandProfile: "2,500 kVA to 12,000 kVA (Uninterruptible baseload with strict temperature & air-change tolerances)",
    discomRate: "₹8.40 – ₹9.90 / kWh (Pharma Industrial HT)",
    topnotchRate: "₹4.30 – ₹4.90 / kWh (Renewable Landed)",
    annualSavingsRange: "₹5.5 – ₹14.0 Crores / year",
    procurementMix: [
      { source: "Offsite Solar Group Captive SPV", share: 60, color: "bg-emerald-500" },
      { source: "Industrial PEB Rooftop Solar Array", share: 20, color: "bg-amber-500" },
      { source: "Dedicated DISCOM Dual Express Feeder", share: 20, color: "bg-slate-400" },
    ],
    shiftOptimization:
      "Critical cleanroom HVAC runs uninterrupted while secondary water purification, distillation, and compressed air systems are co-optimized with green day-ahead exchange hours.",
    powerFactorStrategy:
      "Active power filters suppress harmonic distortions generated by non-linear chiller VFDs, preventing nuisance tripping of sensitive electronic cleanroom sensors.",
    regulatoryBasis:
      "Green Energy Open Access (GEOA) Rules 2022, State Industrial RE Incentives, and US-FDA compliant power quality logging.",
    verifiedCaseReference: "Sterile API Formulation Facility (5,400 kVA, Baddi HP) – ₹6.85 Cr Annualized Savings.",
  },
  {
    id: "glass",
    name: "Glass & Ceramic Tunnel Kilns",
    subtitle: "High thermal & electric boosting furnaces with non-stop drawl",
    savingsHeadline: "₹1.60–₹2.75/kWh Net Reduction",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    demandProfile: "5,000 kVA to 18,000 kVA (Continuous electric melting boosting electrodes, 24x7x365)",
    discomRate: "₹7.90 – ₹9.30 / kWh (Continuous Industry HT)",
    topnotchRate: "₹4.15 – ₹4.70 / kWh (Landed Captive Blend)",
    annualSavingsRange: "₹8.5 – ₹19.5 Crores / year",
    procurementMix: [
      { source: "Group Captive Solar-Wind Hybrid Asset", share: 65, color: "bg-emerald-500" },
      { source: "IEX Day-Ahead Night Valley Procurement", share: 20, color: "bg-blue-500" },
      { source: "DISCOM HT Standby Connection", share: 15, color: "bg-slate-400" },
    ],
    shiftOptimization:
      "Electric boosting in glass forehearths requires 100% reliable baseload. Hybrid wind-solar captive assets ensure round-the-clock clean energy supply with zero freezing risk for glass batches.",
    powerFactorStrategy:
      "Heavy-duty oil-cooled capacitor banks with damping reactors handle heavy electric arc furnace electrode fluctuations, maintaining a steady 0.996 PF.",
    regulatoryBasis:
      "Electricity Rules 2005 (Rule 3), State Solar/Wind Hybrid Policies, and Energy Conservation Building Code (ECBC).",
    verifiedCaseReference: "Ceramic Glaze & Container Glass Manufacturer (11,000 kVA, Morbi Gujarat) – ₹13.70 Cr Annualized Savings.",
  },
];

const ITEMS_PER_PAGE = 4;

export function InteractiveSectorGrid() {
  const [selectedSector, setSelectedSector] = useState<SectorInsight | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(SECTOR_INSIGHTS.length / ITEMS_PER_PAGE);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  // Keyboard navigation with ArrowLeft and ArrowRight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if modal is open or an input is focused
      if (selectedSector || document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        return;
      }
      if (e.key === "ArrowRight") {
        nextPage();
      } else if (e.key === "ArrowLeft") {
        prevPage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedSector, nextPage, prevPage]);

  // Get current active sectors
  const visibleSectors = SECTOR_INSIGHTS.slice(
    currentPage * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const startItem = currentPage * ITEMS_PER_PAGE + 1;
  const endItem = Math.min((currentPage + 1) * ITEMS_PER_PAGE, SECTOR_INSIGHTS.length);

  return (
    <div className="space-y-8">
      
      {/* Top Carousel Navigation Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <span className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-mono font-bold">
            Showing Industries {startItem}–{endItem} of {SECTOR_INSIGHTS.length}
          </span>
          <span className="hidden md:inline-flex items-center space-x-1.5 text-xs font-mono text-slate-600">
            <span>Tip: Use</span>
            <kbd className="px-2 py-0.5 rounded bg-slate-200 border border-slate-300 text-slate-700 text-[10px] font-bold">←</kbd>
            <kbd className="px-2 py-0.5 rounded bg-slate-200 border border-slate-300 text-slate-700 text-[10px] font-bold">→</kbd>
            <span>keys to navigate</span>
          </span>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center space-x-3">
          {/* Pagination Dot Indicators */}
          <div className="flex items-center space-x-1.5 mr-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentPage(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  idx === currentPage
                    ? "w-8 bg-[#F8BC26]"
                    : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to sector page ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={prevPage}
            className="p-3 rounded-2xl bg-white border border-slate-300 hover:border-[#1C2C34] hover:bg-slate-50 text-slate-800 transition-all shadow-sm active:scale-95 flex items-center justify-center space-x-1 group"
            aria-label="Previous industries"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-xs font-mono font-bold hidden sm:inline">Prev</span>
          </button>

          <button
            type="button"
            onClick={nextPage}
            className="p-3 rounded-2xl bg-[#1C2C34] hover:bg-slate-800 text-white transition-all shadow-md active:scale-95 flex items-center justify-center space-x-1 group"
            aria-label="Next industries"
          >
            <span className="text-xs font-mono font-bold hidden sm:inline">Next</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Interactive Clickable Sector Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-300">
        {visibleSectors.map((sector) => (
          <button
            key={sector.id}
            onClick={() => setSelectedSector(sector)}
            className="group rounded-3xl overflow-hidden bg-slate-900 border border-slate-700/80 hover:border-[#F8BC26]/60 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col relative min-h-[430px] text-left focus:outline-hidden focus:ring-2 focus:ring-[#F8BC26] hover:-translate-y-1.5"
          >
            {/* Ambient Corner Flare on Hover */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#F8BC26]/10 rounded-full blur-2xl group-hover:bg-[#F8BC26]/25 transition-all duration-500 pointer-events-none" />

            {/* Background Photography with Zoom Effect & Multi-Stage Seamless Gradient Mask */}
            <Image
              src={sector.image}
              alt={sector.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-45"
            />
            {/* Seamless Multi-Layer Gradient Fade for 100% WCAG Typography Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/85 via-40% to-[#0F172A]/40" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />

            {/* Click Indicator Badge */}
            <div className="absolute top-4 right-4 z-20">
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-white group-hover:bg-[#F8BC26] group-hover:text-[#1C2C34] group-hover:border-[#F8BC26] transition-all shadow-md">
                <span>View Data</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>

            <div className="relative z-10 p-6 flex flex-col justify-between h-full space-y-4">
              <div className="space-y-2.5">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#F8BC26] bg-[#F8BC26]/10 px-2.5 py-0.5 rounded-full inline-block border border-[#F8BC26]/20">
                  {sector.savingsHeadline}
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-[#F8BC26] transition-colors leading-snug">
                  {sector.name}
                </h3>
                <p className="text-[11px] text-slate-300 font-mono leading-relaxed">
                  {sector.subtitle}
                </p>
              </div>

              <div className="pt-4 border-t border-white/15 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 text-[11px]">Annual Impact:</span>
                  <span className="text-xs font-bold text-emerald-400">{sector.annualSavingsRange}</span>
                </div>
                <div className="text-[11px] text-slate-300 font-mono flex items-center space-x-1 group-hover:text-white transition-colors">
                  <span>Explore load curves &amp; procurement mix</span>
                  <span className="text-[#F8BC26] font-bold">→</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Comprehensive Structured Data Modal */}
      {selectedSector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
            
            {/* Modal Header with Immersive Half-Merging Industrial Photography */}
            <div className="relative p-6 sm:p-8 bg-[#0F172A] text-white overflow-hidden rounded-t-3xl">
              <Image
                src={selectedSector.image}
                alt={selectedSector.name}
                fill
                sizes="100vw"
                className="object-cover object-center opacity-40 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />

              <button
                type="button"
                onClick={() => setSelectedSector(null)}
                className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10 max-w-xl space-y-3">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F8BC26]/20 border border-[#F8BC26]/40 text-[#F8BC26] text-xs font-mono font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Industrial Sector Blueprint</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  {selectedSector.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-mono">
                  {selectedSector.demandProfile}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Tariff Benchmark Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-[10px] font-mono text-slate-700 uppercase tracking-wider font-bold block mb-1">
                    Baseline DISCOM Tariff
                  </span>
                  <span className="text-lg font-bold text-rose-600 font-mono">
                    {selectedSector.discomRate}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-700 uppercase tracking-wider font-bold block mb-1">
                    Topnotch Landed Rate
                  </span>
                  <span className="text-lg font-bold text-[#10B981] font-mono">
                    {selectedSector.topnotchRate}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-700 uppercase tracking-wider font-bold block mb-1">
                    Annual Net Savings
                  </span>
                  <span className="text-lg font-black text-[#F8BC26] font-mono">
                    {selectedSector.annualSavingsRange}
                  </span>
                </div>
              </div>

              {/* Engineered Power Procurement Mix */}
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                  <BarChart3 className="w-4 h-4 text-[#F8BC26]" />
                  <span>Engineered Power Procurement Mix</span>
                </span>
                
                {/* Horizontal Bar Visualizer */}
                <div className="h-6 w-full rounded-xl overflow-hidden flex bg-slate-200">
                  {selectedSector.procurementMix.map((mix, idx) => (
                    <div
                      key={idx}
                      className={`${mix.color} h-full transition-all duration-500`}
                      style={{ width: `${mix.share}%` }}
                      title={`${mix.source}: ${mix.share}%`}
                    />
                  ))}
                </div>

                {/* Legend */}
                <div className="grid sm:grid-cols-3 gap-2 text-xs font-mono text-slate-600 pt-1">
                  {selectedSector.procurementMix.map((mix, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <span className={`w-3 h-3 rounded-full ${mix.color} flex-shrink-0`} />
                      <span className="truncate">{mix.source} ({mix.share}%)</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering Insights Grid */}
              <div className="grid sm:grid-cols-2 gap-6 pt-2">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-[#1C2C34]">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>Shift &amp; Bourse Optimization</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {selectedSector.shiftOptimization}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-[#1C2C34]">
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span>Power Factor (APFC) &amp; Harmonics</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {selectedSector.powerFactorStrategy}
                  </p>
                </div>
              </div>

              {/* Regulatory Citations & Case Reference */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
                <div className="flex items-center space-x-2 text-xs font-mono text-[#F8BC26] font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Regulatory Legal Basis &amp; Verified Case Reference</span>
                </div>
                <div className="text-xs font-mono text-slate-300 leading-relaxed">
                  <strong className="text-white">Legal Framework:</strong> {selectedSector.regulatoryBasis}
                </div>
                <div className="text-xs font-mono text-emerald-300 leading-relaxed pt-2 border-t border-slate-800">
                  <strong className="text-white">Audited Client Reference:</strong> {selectedSector.verifiedCaseReference}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 rounded-b-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono text-slate-500 text-center sm:text-left">
                Want a custom load-curve analysis for your plant?
              </span>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <Link
                  href="/tools/open-access-calculator"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#F8BC26] hover:bg-[#eab308] text-[#1C2C34] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Simulate Plant Economics</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedSector(null)}
                  className="px-5 py-3 rounded-full border border-slate-300 text-slate-700 font-mono text-xs font-bold hover:bg-slate-100 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}