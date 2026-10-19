"use client";

import React, { useState } from "react";
import {
  Sun,
  Zap,
  BatteryCharging,
  Cpu,
  Layers,
  Radio,
  CheckCircle2,
  X,
  ExternalLink,
  Info,
} from "lucide-react";

export interface PlantHotspot {
  id: string;
  number: number;
  title: string;
  subTitle: string;
  category: "Solar Generation" | "Storage & EV" | "Grid Infrastructure" | "Control Operations";
  xPercent: number; // For position on isometric canvas
  yPercent: number;
  specs: {
    label: string;
    value: string;
  }[];
  regulatoryStandard: string;
  engineeringHighlight: string;
  economicImpact: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const PLANT_HOTSPOTS: PlantHotspot[] = [
  {
    id: "peb-rooftop-solar",
    number: 1,
    title: "PEB Shed Rooftop Solar (TOPCon Bifacial)",
    subTitle: "2.5 MWp Industrial On-Site Generation",
    category: "Solar Generation",
    xPercent: 32,
    yPercent: 24,
    specs: [
      { label: "Module Technology", value: "N-Type TOPCon Dual-Glass Bifacial 580Wp" },
      { label: "ALMM Compliance", value: "MNRE ALMM List-I Certified Modules" },
      { label: "Inverter Topology", value: "String Inverters (250kW) with 99.0% Euro Eff" },
      { label: "Levelized Cost (LCOE)", value: "₹1.55/kWh (CAPEX) / ₹3.20/kWh (RESCO)" },
    ],
    regulatoryStandard: "CEA (Technical Standards for Connectivity of Distributed Generation Resources) Regulations",
    engineeringHighlight:
      "Non-penetrating anodized aluminum clamp mounting engineered for wind speeds up to 170 km/h on Pre-Engineered Building (PEB) standing-seam industrial metal roofs.",
    economicImpact: "Generates 3.65 Million Units annually, displacing expensive peak Discom power at 100% on-site utilization with zero wheeling losses.",
    icon: Sun,
  },
  {
    id: "solar-carport-ev",
    number: 2,
    title: "Solar Carport + EV Fleet Charging",
    subTitle: "500 kWp Elevated Solar Canopy with DC Fast Chargers",
    category: "Storage & EV",
    xPercent: 18,
    yPercent: 68,
    specs: [
      { label: "Canopy Structure", value: "High-Clearance Hot-Dip Galvanized Structural Steel" },
      { label: "EV Charging Infrastructure", value: "6x 120kW Dual-Gun CCS-2 DC Fast Chargers" },
      { label: "Fleet Electrification", value: "Supports 40+ Internal Logistics Yard Vehicles" },
      { label: "Solar Generation", value: "720,000 kWh Annual Clean Injection" },
    ],
    regulatoryStandard: "Ministry of Power Guidelines & Standards for EV Charging Infrastructure (Jan 2022)",
    engineeringHighlight:
      "Rainwater-guttered solar canopy providing shaded parking for employee vehicles and heavy logistics trucks while trickle-charging daytime battery banks.",
    economicImpact: "Reduces internal logistics diesel consumption by ₹48 Lakhs annually, leveraging zero-marginal-cost solar charging.",
    icon: Zap,
  },
  {
    id: "abt-sem-metering-bay",
    number: 3,
    title: "ABT 0.2s Class SEM Substation Metering Bay",
    subTitle: "Revenue-Grade Bi-Directional Power Accounting",
    category: "Grid Infrastructure",
    xPercent: 78,
    yPercent: 32,
    specs: [
      { label: "Accuracy Standard", value: "Class 0.2s Bi-Directional Active & Reactive (IS 14697)" },
      { label: "Redundancy Architecture", value: "Dual Main & Check Meters on Independent CT/PT" },
      { label: "Data Logging Period", value: "15-Minute Load Survey (96 Daily Energy Blocks)" },
      { label: "Laboratory Calibration", value: "NABL High-Voltage Traceable Test Pass" },
    ],
    regulatoryStandard: "Central Electricity Authority (Installation and Operation of Meters) Regulations",
    engineeringHighlight:
      "Dual CT/PT secondary cores connected to optical DLMS modems with tamper-proof Discom and SLDC lead seals, logging import/export active and reactive energy.",
    economicImpact: "Eliminates Discom billing discrepancies, protecting industrial clients against erroneous maximum demand overshoots and unverified power factor penalties.",
    icon: Cpu,
  },
  {
    id: "containerized-bess",
    number: 4,
    title: "Containerized LFP Battery Storage (BESS)",
    subTitle: "4.0 MWh / 2.0 MW Lithium-Iron-Phosphate System",
    category: "Storage & EV",
    xPercent: 54,
    yPercent: 74,
    specs: [
      { label: "Cell Chemistry", value: "Lithium Iron Phosphate (LiFePO4) - 6,000+ Cycles" },
      { label: "Enclosure Architecture", value: "IP55 20ft Climate-Controlled ISO Container" },
      { label: "Thermal Management", value: "Liquid-Cooled with Novec 1230 Fire Suppression" },
      { label: "Round-Trip Efficiency", value: "> 88.5% AC-to-AC RTE" },
    ],
    regulatoryStandard: "CEA Technical Standards for Connectivity to the Grid (Amendment) Regulations & NFPA 855",
    engineeringHighlight:
      "Integrated with AI-driven battery management system (BMS) charging during solar hours (₹2.90/kWh slots) and discharging during evening peak hours (₹9.60/kWh slots).",
    economicImpact: "Arbitrages the ₹6.70/kWh ToD peak differential, saving ₹76 Lakhs annually while eliminating diesel generator startup during brief grid dips.",
    icon: BatteryCharging,
  },
  {
    id: "sldc-grid-interconnect",
    number: 5,
    title: "SLDC/RLDC Open Access Grid Interconnect",
    subTitle: "33 kV / 66 kV Dedicated Evacuation & Drawal Bay",
    category: "Grid Infrastructure",
    xPercent: 88,
    yPercent: 62,
    specs: [
      { label: "Interconnection Voltage", value: "33 kV Dedicated Industrial Feeder (InSTS)" },
      { label: "Protection Relays", value: "Numerical Directional Overcurrent & Earth Fault" },
      { label: "Disconnect Switchgear", value: "SF6 Gas-Insulated Breaker with Motorized Isolator" },
      { label: "Regulatory Framework", value: "CERC General Network Access (GNA) Regulations 2022" },
    ],
    regulatoryStandard: "State Electricity Grid Code (IEGC) & CEIG Safety Approval",
    engineeringHighlight:
      "Dedicated substation terminal bay enabling seamless injection from offsite Group Captive solar/wind farms in Rajasthan/Gujarat straight into the manufacturing plant.",
    economicImpact: "Provides continuous wheeling pathway for 6.0 MW offsite clean baseload, saving ₹1.95/kWh in waived Cross-Subsidy Surcharges.",
    icon: Layers,
  },
  {
    id: "noc-scada-desk",
    number: 6,
    title: "24x7 NOC Bidding & SCADA Telemetry Desk",
    subTitle: "Real-Time Dispatch Control & Deviation Management",
    category: "Control Operations",
    xPercent: 46,
    yPercent: 44,
    specs: [
      { label: "Telemetry Protocol", value: "IEC 60870-5-104 / IEC 61850 over Dual MPLS VPN" },
      { label: "Sampling Resolution", value: "Real-time 2-Second Frequency & Load Telemetry" },
      { label: "Bidding Desk Gate", value: "48 Half-Hour RTM Trading Gates via Automated API" },
      { label: "DSM Penalty Avoidance", value: "Maintains Drawal within +-12% Regulatory Band" },
    ],
    regulatoryStandard: "CERC (Deviation Settlement Mechanism and Related Matters) Regulations, 2024",
    engineeringHighlight:
      "Automated control room synchronizing factory furnace schedules with national grid frequency (50.00 Hz), pushing dynamic schedule revisions to SLDC.",
    economicImpact: "Reduces penal DSM surcharges by 84%, saving ₹1.2 Crores annually in avoidable frequency-linked deviation charges.",
    icon: Radio,
  },
];

export function InteractivePlantHotspotMap() {
  const [selectedHotspot, setSelectedHotspot] = useState<PlantHotspot>(PLANT_HOTSPOTS[0]);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);

  const handleSelectHotspot = (hotspot: PlantHotspot) => {
    setSelectedHotspot(hotspot);
    setIsDetailDrawerOpen(true);
  };

  return (
    <div className="bg-grid-navy-950 border border-grid-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl relative">
      <div className="border-b border-grid-slate-800 pb-4 mb-4">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-grid-cyan-400 animate-pulse" />
          <h3 className="text-base sm:text-lg font-bold text-white font-sans">
            Interactive Industrial Decarbonization Hotspot Explorer
          </h3>
        </div>
        <p className="text-xs text-grid-slate-400 font-mono mt-0.5">
          Tap the 6 engineering nodes across this representative 12.5 MVA Indian manufacturing facility to inspect technical specs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Isometric Plant Canvas with Interactive Hotspots */}
        <div className="lg:col-span-7 bg-grid-navy-900/90 border border-grid-slate-700/80 rounded-2xl p-4 relative overflow-hidden min-h-[380px] sm:min-h-[460px] flex items-center justify-center">
          
          {/* Isometric Schematic Vector Backdrop */}
          <div className="absolute inset-0 bg-grid-dense opacity-30 pointer-events-none" />
          
          {/* Schematic Factory Buildings (SVG Graphics) */}
          <svg className="w-full h-full max-h-[420px] select-none" viewBox="0 0 600 400" fill="none">
            {/* Ground Grid Slab */}
            <polygon points="300,40 560,190 300,340 40,190" fill="#0A1128" stroke="#1E2E5C" strokeWidth="2" />
            
            {/* Main Production PEB Shed */}
            <polygon points="180,120 360,60 440,110 260,170" fill="#131F3F" stroke="#2D427B" strokeWidth="2" />
            <polygon points="180,120 260,170 260,230 180,180" fill="#0E172E" stroke="#2D427B" strokeWidth="1.5" />
            <polygon points="260,170 440,110 440,170 260,230" fill="#18274F" stroke="#2D427B" strokeWidth="1.5" />
            {/* Rooftop Solar Top Panels */}
            <polygon points="200,115 350,65 420,108 270,158" fill="#1E3A8A" opacity="0.6" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />

            {/* Substation & Transformer Yard (Right) */}
            <polygon points="430,200 510,160 550,185 470,225" fill="#162038" stroke="#334155" strokeWidth="1.5" />
            <rect x="460" y="180" width="20" height="25" fill="#0891B2" opacity="0.7" />
            <rect x="490" y="165" width="20" height="25" fill="#0891B2" opacity="0.7" />

            {/* BESS Battery Storage Enclosures (Center-Bottom) */}
            <rect x="290" y="270" width="70" height="35" rx="3" fill="#2E1065" stroke="#7C3AED" strokeWidth="1.5" />
            <rect x="370" y="250" width="70" height="35" rx="3" fill="#2E1065" stroke="#7C3AED" strokeWidth="1.5" />

            {/* Carport Canopy (Bottom-Left) */}
            <polygon points="80,240 180,185 220,210 120,265" fill="#1E293B" stroke="#059669" strokeWidth="1.5" />
            <line x1="100" y1="250" x2="100" y2="280" stroke="#64748B" strokeWidth="2" />
            <line x1="200" y1="195" x2="200" y2="225" stroke="#64748B" strokeWidth="2" />

            {/* Connecting Cables / Power Buses */}
            <line x1="300" y1="150" x2="460" y2="200" stroke="#06B6D4" strokeWidth="2" strokeDasharray="4 2" />
            <line x1="325" y1="270" x2="460" y2="210" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 2" />
            <line x1="150" y1="225" x2="300" y2="170" stroke="#10B981" strokeWidth="2" strokeDasharray="4 2" />
          </svg>

          {/* Hotspot Markers Positioned Over Canvas */}
          {PLANT_HOTSPOTS.map((hotspot) => {
            const isSelected = selectedHotspot.id === hotspot.id;
            return (
              <button
                key={hotspot.id}
                onClick={() => handleSelectHotspot(hotspot)}
                style={{
                  top: `${hotspot.yPercent}%`,
                  left: `${hotspot.xPercent}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group focus:outline-none"
                aria-label={`Inspect ${hotspot.title}`}
              >
                {/* Pulsing Target Rings */}
                <span className="relative flex items-center justify-center">
                  <span
                    className={`animate-ping absolute inline-flex h-8 w-8 rounded-full opacity-75 ${
                      isSelected ? "bg-grid-cyan-400" : "bg-grid-emerald-400"
                    }`}
                  />
                  <span
                    className={`relative inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full font-mono text-xs font-bold text-grid-navy-950 shadow-lg transition-transform transform group-hover:scale-110 ${
                      isSelected
                        ? "bg-grid-cyan-300 ring-4 ring-grid-cyan-500/40"
                        : "bg-grid-emerald-400 ring-2 ring-grid-navy-950 hover:bg-white"
                    }`}
                  >
                    {hotspot.number}
                  </span>
                </span>

                {/* Desktop Hover Tooltip */}
                <span className="hidden sm:group-hover:block absolute left-1/2 -translate-x-1/2 -top-8 whitespace-nowrap bg-grid-navy-950 border border-grid-slate-700 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-xl pointer-events-none">
                  {hotspot.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Technical Spec Card (Desktop & Drawer Sync) */}
        <div className="lg:col-span-5 bg-grid-navy-900 border border-grid-slate-700/80 rounded-2xl p-5 shadow-xl relative">
          <div className="flex items-center justify-between border-b border-grid-slate-800 pb-3 mb-3">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-grid-navy-950 border border-grid-slate-800 text-grid-cyan-300">
              Hotspot Node 0{selectedHotspot.number} • {selectedHotspot.category}
            </span>
            <span className="text-[10px] font-mono text-grid-slate-400 flex items-center">
              <Info className="w-3 h-3 mr-1 text-grid-emerald-400" />
              CEA Standard
            </span>
          </div>

          <h4 className="text-base font-bold text-white font-sans">
            {selectedHotspot.title}
          </h4>
          <p className="text-xs text-grid-slate-400 font-mono mt-0.5">
            {selectedHotspot.subTitle}
          </p>

          {/* Granular Specs Matrix */}
          <div className="mt-4 space-y-2 bg-grid-navy-950/80 p-3 rounded-xl border border-grid-slate-800 font-mono text-xs">
            {selectedHotspot.specs.map((spec, idx) => (
              <div key={idx} className="flex justify-between border-b border-grid-slate-900 pb-1.5 last:border-b-0 last:pb-0">
                <span className="text-grid-slate-400 text-[11px]">{spec.label}:</span>
                <span className="font-bold text-white text-[11px] text-right ml-2">{spec.value}</span>
              </div>
            ))}
          </div>

          {/* Engineering Highlight */}
          <div className="mt-3 text-xs text-grid-slate-300 leading-relaxed">
            <strong className="text-grid-cyan-400 font-mono block mb-0.5">Engineering Architecture:</strong>
            {selectedHotspot.engineeringHighlight}
          </div>

          {/* Economic Impact Badge */}
          <div className="mt-3 p-2.5 rounded-lg bg-grid-emerald-500/10 border border-grid-emerald-500/20 text-xs font-mono text-grid-emerald-300 flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-grid-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-sans">Financial & Regulatory Impact:</strong>
              {selectedHotspot.economicImpact}
            </div>
          </div>

          {/* Bottom Fast Action */}
          <div className="mt-4 pt-3 border-t border-grid-slate-800 flex justify-between items-center text-xs">
            <span className="text-grid-slate-400 font-mono text-[11px] truncate max-w-[200px]">
              {selectedHotspot.regulatoryStandard}
            </span>
            <a
              href="/tools/open-access-calculator"
              className="text-grid-cyan-400 hover:text-white font-mono font-bold flex items-center space-x-1"
            >
              <span>Simulate ROI →</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
