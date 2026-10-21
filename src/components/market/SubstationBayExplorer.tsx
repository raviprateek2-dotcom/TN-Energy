"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Zap,
  Shield,
  Activity,
  CheckCircle2,
  Cpu,
  FileText,
  AlertTriangle,
  ArrowRight,
  Info,
  Layers,
  Sparkles,
  ExternalLink,
  PhoneCall,
} from "lucide-react";
import { BRAND } from "@/lib/constants/brand";

interface BayComponent {
  id: string;
  name: string;
  tag: string;
  ceaStandard: string;
  statutoryRule: string;
  accuracyClass: string;
  inspectionCycle: string;
  description: string;
  specs: { label: string; value: string }[];
  sldcRole: string;
  image: string;
}

const BAY_COMPONENTS: BayComponent[] = [
  {
    id: "sem-meter",
    name: "Class 0.2s ABT Special Energy Meter (SEM)",
    tag: "Main / Check / Standby Metering Trio",
    ceaStandard: "CEA (Installation & Operation of Meters) Regulations 2006 (Amended 2024)",
    statutoryRule: "IEGC 2023 Regulation 28: Mandatory 15-Minute ABT Settlement",
    accuracyClass: "Class 0.2s (Active) / Class 0.5s (Reactive)",
    inspectionCycle: "Quarterly NABL optical calibration & CT/PT vector checks",
    description:
      "Statutory electronic Special Energy Meter configured with non-volatile memory recording 15-minute average active MWh and reactive MVARh intervals. Equipped with RS-485 and optical communication ports pushing automated AMR telemetry to SLDC servers every 24 hours.",
    specs: [
      { label: "Nominal Input", value: "3-Phase 4-Wire, 110V (PT) / 1A or 5A (CT)" },
      { label: "Time-Block Storage", value: "96 blocks/day across 45 rolling days" },
      { label: "Telemetry Modem", value: "Industrial 4G/LTE Cat-M1 AMR with SLDC static IP" },
      { label: "Tamper Evidence", value: "Optical seal, magnetic immunity & phase reversal logging" },
    ],
    sldcRole: "Primary financial settlement ledger for Day-Ahead/Real-Time exchange drawl and Deviation Settlement Mechanism (DSM).",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ct-pt",
    name: "0.2s Accuracy Instrument Transformers (CT & PT)",
    tag: "Current & Potential Transformation Bay",
    ceaStandard: "IS 16227 / IEC 61869-2 & IEC 61869-3",
    statutoryRule: "Central Electricity Authority Grid Connectivity Regulations",
    accuracyClass: "Class 0.2s Metering Core + 5P20 Protection Core",
    inspectionCycle: "Pre-commissioning primary injection & NABL accredited lab test",
    description:
      "Hermetically sealed outdoor oil-cooled Current Transformers (CT) and Capacitive/Inductive Voltage Transformers (PT). Dual-core secondary windings isolate sensitive revenue metering from plant short-circuit fault transients.",
    specs: [
      { label: "Primary Voltage", value: "33 kV / 66 kV / 132 kV AC (50 Hz ± 0.5 Hz)" },
      { label: "Secondary Ratio", value: "33 kV / √3 to 110 V / √3 (PT) | 200-400/1A (CT)" },
      { label: "Burden Rating", value: "10 VA to 15 VA per phase (Low burden for precision)" },
      { label: "Dielectric Level", value: "70 kV rms Power Frequency / 170 kVp BIL" },
    ],
    sldcRole: "Converts high-voltage power transmission down to standardized 110V/1A analog signals for zero-error bourse reconciliation.",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "vcb",
    name: "33 kV Vacuum Circuit Breaker (VCB) & Trip Panel",
    tag: "Switchyard Fault Isolation & Gang Isolator",
    ceaStandard: "IS/IEC 62271-100 & IEC 62271-102",
    statutoryRule: "State Grid Code Protection Standard for Open Access Consumer Bays",
    accuracyClass: "25 kA Symmetrical Breaking Capacity for 3 Seconds",
    inspectionCycle: "Annual breaker timing test & contact resistance micro-ohm check",
    description:
      "Rapid-action outdoor vacuum circuit breaker paired with motorized gang-operated line disconnect isolator and earth switch. Interlocked with numerical directional overcurrent and earth fault protective relays to shield consumer plant from grid disturbances.",
    specs: [
      { label: "Continuous Current", value: "1250 A / 2000 A Rated Continuous Current" },
      { label: "Operating Sequence", value: "O - 0.3s - CO - 3min - CO (Rapid Auto-Reclose)" },
      { label: "Auxiliary Supply", value: "110V DC Station Battery Bank with Dual Float Charger" },
      { label: "Relay Coordination", value: "IEC 61850 protocol with SLDC SCADA trip signaling" },
    ],
    sldcRole: "Provides safe electrical isolation during scheduled grid maintenance and isolates plant faults in under 60 milliseconds.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "la-surge",
    name: "Gapless Zinc Oxide (ZnO) Lightning Arrestors",
    tag: "Atmospheric & Switching Overvoltage Defense",
    ceaStandard: "IS 15086 / IEC 60099-4",
    statutoryRule: "Substation Insulation Coordination Standards (CEA)",
    accuracyClass: "Class 3 Heavy Duty (10 kA Nominal Discharge)",
    inspectionCycle: "Third harmonic leakage current analysis every pre-monsoon",
    description:
      "Heavy-duty polymer-housed Zinc-Oxide surge arrestors positioned on incoming overhead line gantries and transformer bushings. Discharges atmospheric lightning strikes and high-voltage switching surges directly into dedicated deep-earth grounding pits.",
    specs: [
      { label: "Rated Voltage (Ur)", value: "30 kV rms (for 33 kV system) / 60 kV (66 kV system)" },
      { label: "Continuous Operating", value: "25 kV rms Continuous Operating Voltage (MCOV)" },
      { label: "Surge Counter", value: "Integrated mechanical surge monitor with mA leakage meter" },
      { label: "Earth Resistance", value: "Deep copper-bonded rod grid < 1.0 Ohm combined" },
    ],
    sldcRole: "Safeguards sensitive revenue metering and consumer transformers against lightning impulses exceeding 170 kVp.",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80",
  },
];

export function SubstationBayExplorer() {
  const [activeComponentId, setActiveComponentId] = useState<string>("sem-meter");
  const [isSimulatingCurrent, setIsSimulatingCurrent] = useState<boolean>(true);

  const activeComponent =
    BAY_COMPONENTS.find((c) => c.id === activeComponentId) || BAY_COMPONENTS[0];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>CEA Class 0.2s Technical Standards</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#1C2C34] tracking-tight">
            33 kV Substation &amp; Telemetry Bay Explorer
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-2xl leading-relaxed">
            Click on any substation component below to inspect statutory CEA accuracy benchmarks, NABL calibration standards, and real-time AMR modems required for SLDC Open Access standing clearance.
          </p>
        </div>

        {/* Live Current Simulation Indicator */}
        <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 p-2.5 rounded-2xl">
          <button
            type="button"
            onClick={() => setIsSimulatingCurrent(!isSimulatingCurrent)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
              isSimulatingCurrent
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-slate-200 text-slate-700 hover:bg-slate-300"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isSimulatingCurrent ? "bg-white animate-pulse" : "bg-slate-400"
              }`}
            />
            <span>{isSimulatingCurrent ? "Grid Current Live (50 Hz)" : "Grid Isolated"}</span>
          </button>
        </div>
      </div>

      {/* Interactive Single Line Diagram (SLD) Component Selector Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {BAY_COMPONENTS.map((item, idx) => {
          const isSelected = item.id === activeComponentId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveComponentId(item.id)}
              className={`p-5 rounded-3xl border text-left transition-all relative overflow-hidden flex flex-col justify-between space-y-4 group ${
                isSelected
                  ? "bg-[#1C2C34] text-white border-[#F8BC26] shadow-xl ring-2 ring-[#F8BC26]/40 -translate-y-1"
                  : "bg-white text-slate-800 border-slate-200 hover:border-slate-400 hover:shadow-md"
              }`}
            >
              {/* Component Sequence Tag */}
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-[#F8BC26] text-[#1C2C34]"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  Bay Bay Stage 0{idx + 1}
                </span>
                <span
                  className={`text-xs font-mono font-bold ${
                    isSelected ? "text-emerald-400" : "text-emerald-700"
                  }`}
                >
                  {item.accuracyClass.split(" ")[0]} {item.accuracyClass.split(" ")[1]}
                </span>
              </div>

              <div>
                <h3
                  className={`text-sm sm:text-base font-bold tracking-tight line-clamp-2 ${
                    isSelected ? "text-white" : "text-[#1C2C34] group-hover:text-amber-700"
                  }`}
                >
                  {item.name}
                </h3>
                <p
                  className={`text-[11px] font-mono mt-1 ${
                    isSelected ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  {item.tag}
                </p>
              </div>

              {/* Status Indicator */}
              <div
                className={`pt-3 border-t text-[11px] font-mono flex items-center justify-between ${
                  isSelected ? "border-slate-700 text-[#F8BC26]" : "border-slate-100 text-slate-500"
                }`}
              >
                <span>Inspect Technical Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Selected Component Digital Inspection Panel (Half-Merging Style) */}
      <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column (7 cols): Deep Technical Data & CEA Regulations */}
        <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Regulatory Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-mono font-bold uppercase tracking-wider">
                {activeComponent.accuracyClass}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-slate-700 text-xs font-mono font-semibold">
                NABL Calibrated
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono font-semibold">
                SLDC Telemetry Compliant
              </span>
            </div>

            {/* Component Title & Purpose */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#1C2C34] tracking-tight">
                {activeComponent.name}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-[#D97706] font-bold mt-1">
                {activeComponent.tag}
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {activeComponent.description}
            </p>

            {/* Statutory Compliance Citations */}
            <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-slate-200/90 space-y-2">
              <div className="flex items-start space-x-2.5">
                <Shield className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <div className="text-xs font-mono">
                  <span className="text-slate-500 font-bold uppercase block">CEA Standard:</span>
                  <span className="text-slate-800 font-bold">{activeComponent.ceaStandard}</span>
                </div>
              </div>
              <div className="flex items-start space-x-2.5 pt-2 border-t border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
                <div className="text-xs font-mono">
                  <span className="text-slate-500 font-bold uppercase block">State SLDC Role:</span>
                  <span className="text-slate-700">{activeComponent.sldcRole}</span>
                </div>
              </div>
            </div>

            {/* Hardware Specification Matrix */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                Engineering Technical Ratings:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeComponent.specs.map((spec, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono"
                  >
                    <span className="text-slate-500 block text-[11px]">{spec.label}</span>
                    <span className="text-slate-900 font-bold mt-0.5 block">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-mono text-slate-500">
              Inspection Interval: <strong className="text-slate-800">{activeComponent.inspectionCycle}</strong>
            </div>

            <div className="flex items-center space-x-3">
              <a
                href={`tel:${BRAND.contacts.phonePrimary}`}
                className="px-5 py-2.5 rounded-xl bg-[#F8BC26] hover:bg-[#eab308] text-[#1C2C34] font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center space-x-2"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Consult Substation Bay Engineer</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Cinematic Engineering Photo Merging into Section */}
        <div className="lg:col-span-5 relative min-h-[350px] lg:min-h-full bg-slate-950 overflow-hidden">
          <Image
            src={activeComponent.image}
            alt={activeComponent.name}
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover object-center opacity-70 scale-105 transition-transform duration-700"
          />
          {/* Gradient Masks */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent lg:hidden" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

          {/* Overlay Schematic Tag */}
          <div className="absolute bottom-6 left-6 right-6 z-20 space-y-2 text-white">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-mono uppercase font-bold tracking-wider border border-white/30">
              <Sparkles className="w-3 h-3 text-[#F8BC26]" />
              <span>NABL Lab Test Verified</span>
            </div>
            <h4 className="text-lg font-bold text-white tracking-tight">
              Turnkey Substation Bay Supply &amp; Commissioning
            </h4>
            <p className="text-xs text-slate-300 font-mono leading-relaxed">
              Topnotch Energy Solutions provides turnkey supply, installation, testing, and commissioning (SITC) of complete 33 kV / 66 kV / 132 kV incoming bays with SLDC optical telemetry handover across 14 states.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
