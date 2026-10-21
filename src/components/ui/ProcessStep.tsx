"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Clock, ShieldCheck, ArrowRight } from "lucide-react";

export interface EnhancedStepItem {
  number: string;
  title: string;
  description: string;
  duration: string;
  completionPercentage: number;
  image: string;
  deliverables: string[];
  slaTag: string;
}

export const DEFAULT_45_DAY_STEPS: EnhancedStepItem[] = [
  {
    number: "01",
    title: "72-Hour Plant & Bill Audit",
    duration: "Days 1–3",
    completionPercentage: 25,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    description:
      "BEE Certified Energy Auditors dissect 12-month HT electricity bills, 15-minute load curves, and contracted demand to uncover hidden tariff leakages.",
    deliverables: [
      "12-Month HT Bill & Power Factor Leakage Audit",
      "Sanctioned Contract Demand Headroom Analysis",
      "Executive Open Access Feasibility & ROI Report",
    ],
    slaTag: "72-Hour Guaranteed SLA",
  },
  {
    number: "02",
    title: "Regulatory Approvals & NOAR",
    duration: "Days 4–14",
    completionPercentage: 50,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    description:
      "End-to-end statutory liaisoning securing SLDC Standing Clearances, connectivity feasibility, InSTS wheeling agreements, and NOAR portal registration.",
    deliverables: [
      "National Open Access Registry (NOAR) Registration",
      "Form A & Form B SLDC Standing Clearance NOC",
      "InSTS Transmission & Wheeling Agreement Execution",
    ],
    slaTag: "10-Day Statutory Turnaround",
  },
  {
    number: "03",
    title: "CEA 0.2s ABT Metering Bay",
    duration: "Days 15–30",
    completionPercentage: 75,
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80",
    description:
      "Turnkey installation of Class 0.2s Special Energy Meters (SEM) with optical AMR modems and direct telemetry synchronization into SLDC SCADA.",
    deliverables: [
      "Dual Main & Check 0.2s SEM Meter Installation",
      "NABL Laboratory Testing & Injection Calibration",
      "Automated Optical AMR 4G/5G Telemetry to SLDC",
    ],
    slaTag: "NABL Certified Commissioning",
  },
  {
    number: "04",
    title: "Live Bidding & Monthly Bill Cut",
    duration: "Day 31 Onwards",
    completionPercentage: 100,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    description:
      "24x7 algorithmic bidding across IEX DAM/GDAM/RTM bourses aligned with factory shifts, plus audited monthly DISCOM baseline reconciliation.",
    deliverables: [
      "Automated 96-Block Algorithmic Exchange Bidding",
      "DSM 2024 Deviation Settlement Elimination",
      "Monthly Audited Net Power Savings Reconciliation",
    ],
    slaTag: "Recurring Monthly Savings",
  },
];

interface ProcessStepProps {
  steps?: EnhancedStepItem[];
}

export function ProcessStep({ steps = DEFAULT_45_DAY_STEPS }: ProcessStepProps) {
  return (
    <div className="space-y-8">
      {/* 45-Day Overall Completion Progression Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#1C2C34]">
            <Clock className="w-4 h-4 text-[#F8BC26]" />
            <span>45-DAY TURNKEY ONBOARDING LIFECYCLE</span>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            100% Commissioning Guarantee • Zero Factory Disruption
          </span>
        </div>

        {/* Multi-Segment Connected Progress Tracker */}
        <div className="relative pt-2 pb-1">
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
            <div className="w-1/4 bg-amber-400 border-r border-white/50" />
            <div className="w-1/4 bg-amber-500 border-r border-white/50" />
            <div className="w-1/4 bg-blue-500 border-r border-white/50" />
            <div className="w-1/4 bg-emerald-500" />
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono font-bold text-slate-500 pt-2">
            <div>Audit (25%)</div>
            <div>Clearances (50%)</div>
            <div>ABT Metering (75%)</div>
            <div className="text-emerald-700">Live Power (100%)</div>
          </div>
        </div>
      </div>

      {/* 4 Informative Photographic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, idx) => (
          <div
            key={step.number}
            className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between min-h-[460px] text-white"
          >
            {/* Subtle Background Photography */}
            <Image
              src={step.image}
              alt={step.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/85 to-black/50" />

            {/* Card Content Top */}
            <div className="relative z-10 p-6 space-y-4">
              {/* Header Badge & Step Number */}
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-xl bg-[#F8BC26] text-[#1C2C34] font-mono text-sm font-black flex items-center justify-center shadow-md">
                  {step.number}
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-200 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                  {step.duration}
                </span>
              </div>

              {/* Title & SLA Tag */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-400">
                  {step.slaTag}
                </span>
                <h4 className="text-lg font-bold text-white tracking-tight leading-snug">
                  {step.title}
                </h4>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {step.description}
              </p>
            </div>

            {/* Card Content Bottom: Deliverables Checklist */}
            <div className="relative z-10 p-6 pt-0 space-y-3">
              <div className="pt-3 border-t border-white/15">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-2">
                  Key Deliverables:
                </span>
                <ul className="space-y-2 text-[11px] text-slate-200 font-sans">
                  {step.deliverables.map((item, dIdx) => (
                    <li key={dIdx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F8BC26] flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Completion Tag */}
              <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Phase Progress:</span>
                <span className="font-bold text-[#F8BC26]">{step.completionPercentage}% Complete</span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
