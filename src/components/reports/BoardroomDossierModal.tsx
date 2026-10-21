"use client";

import React, { useRef } from "react";
import {
  Printer,
  X,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { BRAND } from "@/lib/constants/brand";

export interface BoardroomDossierProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    clientCompany: string;
    stateName: string;
    discomName: string;
    voltageLevel: string;
    contractDemandKva: number;
    monthlyConsumptionKwh: number;
    currentDiscomTariff: number;
    projectedLandedTariff: number;
    monthlySavingsInr: number;
    annualSavingsInr: number;
    model: string;
    powerSource: string;
    costBreakdown: {
      generationCost: number;
      transmissionCharge: number;
      wheelingCharge: number;
      crossSubsidySurcharge: number;
      additionalSurcharge: number;
      sldcAndScheduling: number;
    };
  };
}

export function BoardroomDossierModal({ isOpen, onClose, data }: BoardroomDossierProps) {
  const dossierRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const netSavingsPerKwh = Math.max(0, data.currentDiscomTariff - data.projectedLandedTariff);
  const percentageSavings = data.currentDiscomTariff > 0 ? (netSavingsPerKwh / data.currentDiscomTariff) * 100 : 0;
  const twentyFiveYearSavingsCr = ((data.annualSavingsInr * 25 * 1.35) / 10000000).toFixed(2); // with modest inflation
  const referenceDocId = `TES-BOARD-${data.clientCompany.replace(/\s+/g, "").slice(0, 4).toUpperCase()}-2026`;
  const currentDateFormatted = "21 October 2026";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-xs overflow-y-auto">
      {/* Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-6 border border-slate-200">
        {/* Action Header (Screen only) */}
        <div className="print:hidden bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-xs uppercase tracking-wider font-bold">
              Boardroom Feasibility Dossier Preview (A4 Ready)
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-[#F8BC26] hover:bg-[#eab308] text-[#1C2C34] font-mono text-xs font-bold transition-all shadow-sm flex items-center space-x-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Boardroom Dossier Content */}
        <div
          ref={dossierRef}
          id="printable-term-sheet"
          className="p-8 sm:p-12 text-[#1C2C34] bg-white font-sans selection:bg-amber-100"
        >
          {/* Letterhead */}
          <div className="border-b-2 border-slate-900 pb-6 mb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-black tracking-tight text-[#1C2C34]">
                  TOPNOTCH ENERGY
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-[#1C2C34] text-white font-mono font-bold">
                  SOLUTIONS
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                CERC Category-IV Power Trading &amp; Open Access Advisory Desk
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                {BRAND.headquarters.fullAddress} • Tel: {BRAND.contacts.phonePrimary}
              </p>
            </div>

            <div className="text-left sm:text-right font-mono text-xs space-y-1">
              <div className="font-bold text-slate-900">BOARDROOM EXECUTIVE DOSSIER</div>
              <div className="text-slate-500">Document Ref: {referenceDocId}</div>
              <div className="text-slate-500">Date: {currentDateFormatted}</div>
              <div className="inline-flex items-center space-x-1 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px] font-bold">
                <ShieldCheck className="w-3 h-3" />
                <span>CONFIDENTIAL &amp; PRIVILEGED</span>
              </div>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <div className="mb-8">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 font-mono border-b border-slate-200 pb-2 mb-4">
              1. Executive Brief &amp; Plant Profile
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Client Enterprise</span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">{data.clientCompany}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Location / DISCOM</span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">{data.stateName}</span>
                <span className="text-[10px] text-slate-500">{data.discomName}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Contract Demand</span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">{data.contractDemandKva.toLocaleString("en-IN")} kVA</span>
                <span className="text-[10px] text-slate-500">Voltage: {data.voltageLevel}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Procurement Model</span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block uppercase">{data.model.replace("-", " ")}</span>
                <span className="text-[10px] text-emerald-700 font-bold">Sec 42 Captive Waiver</span>
              </div>
            </div>
          </div>

          {/* Section 2: Financial Impact Matrix */}
          <div className="mb-8">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 font-mono border-b border-slate-200 pb-2 mb-4">
              2. Commercial Tariff Comparison &amp; Bottom-Line Impact
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 font-mono text-center">
              <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Current Utility Grid Tariff</span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">
                  ₹{data.currentDiscomTariff.toFixed(2)}
                  <span className="text-xs font-normal text-slate-500">/kWh</span>
                </span>
                <span className="text-[10px] text-slate-500 mt-1 block">100% DISCOM HT Drawl</span>
              </div>

              <div className="p-4 rounded-2xl border border-emerald-300 bg-emerald-50">
                <span className="text-[10px] text-emerald-800 uppercase block font-semibold">Topnotch Blended Landed Cost</span>
                <span className="text-2xl font-black text-emerald-700 mt-1 block">
                  ₹{data.projectedLandedTariff.toFixed(2)}
                  <span className="text-xs font-normal text-emerald-600">/kWh</span>
                </span>
                <span className="text-[10px] text-emerald-800 font-bold mt-1 block">
                  Net Savings: ₹{netSavingsPerKwh.toFixed(2)}/kWh ({percentageSavings.toFixed(1)}%)
                </span>
              </div>

              <div className="p-4 rounded-2xl border border-amber-300 bg-amber-50">
                <span className="text-[10px] text-amber-800 uppercase block font-semibold">Projected 1-Year Financial Savings</span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">
                  ₹{(data.annualSavingsInr / 10000000).toFixed(2)} Cr
                  <span className="text-xs font-normal text-slate-500">/year</span>
                </span>
                <span className="text-[10px] text-amber-900 font-bold mt-1 block">
                  25-Year Cumulative: ~₹{twentyFiveYearSavingsCr} Cr
                </span>
              </div>
            </div>

            {/* Landed Cost Breakdown Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-xs font-mono text-left">
                <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-4 font-bold">Cost Component</th>
                    <th className="py-2.5 px-4 font-bold">Regulatory Authority</th>
                    <th className="py-2.5 px-4 font-bold">Charge (₹/kWh)</th>
                    <th className="py-2.5 px-4 font-bold">Status / Exemption</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="py-2.5 px-4 font-semibold">Generation Tariff (Solar / Hybrid)</td>
                    <td className="py-2.5 px-4 text-slate-600">Long-Term Bilateral PPA</td>
                    <td className="py-2.5 px-4 font-bold text-slate-900">₹{data.costBreakdown.generationCost.toFixed(2)}</td>
                    <td className="py-2.5 px-4 text-emerald-700 font-bold">Fixed PPA (No Escalation)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold">STU Transmission Charge</td>
                    <td className="py-2.5 px-4 text-slate-600">{data.stateName} SLDC / STU</td>
                    <td className="py-2.5 px-4 text-slate-900">₹{data.costBreakdown.transmissionCharge.toFixed(2)}</td>
                    <td className="py-2.5 px-4 text-slate-600">Per SERC Tariff Order</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold">DISCOM Wheeling Charge ({data.voltageLevel})</td>
                    <td className="py-2.5 px-4 text-slate-600">{data.discomName}</td>
                    <td className="py-2.5 px-4 text-slate-900">₹{data.costBreakdown.wheelingCharge.toFixed(2)}</td>
                    <td className="py-2.5 px-4 text-slate-600">Voltage Surcharged</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold">Cross-Subsidy Surcharge (CSS)</td>
                    <td className="py-2.5 px-4 text-slate-600">SERC Retail Tariff Order</td>
                    <td className="py-2.5 px-4 text-slate-900">₹{data.costBreakdown.crossSubsidySurcharge.toFixed(2)}</td>
                    <td className="py-2.5 px-4 font-bold text-emerald-700">
                      {data.costBreakdown.crossSubsidySurcharge === 0 ? "WAIVED (Section 42)" : "Applicable"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold">Additional Surcharge (AS)</td>
                    <td className="py-2.5 px-4 text-slate-600">DISCOM Stranded Cost</td>
                    <td className="py-2.5 px-4 text-slate-900">₹{data.costBreakdown.additionalSurcharge.toFixed(2)}</td>
                    <td className="py-2.5 px-4 font-bold text-emerald-700">
                      {data.costBreakdown.additionalSurcharge === 0 ? "EXEMPT (Captive SPV)" : "Applicable"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold">SLDC Scheduling &amp; NOAR Fee</td>
                    <td className="py-2.5 px-4 text-slate-600">POSOCO / NOAR Registry</td>
                    <td className="py-2.5 px-4 text-slate-900">₹{data.costBreakdown.sldcAndScheduling.toFixed(2)}</td>
                    <td className="py-2.5 px-4 text-slate-600">Standard Scheduling</td>
                  </tr>
                  <tr className="bg-slate-50 font-bold">
                    <td className="py-3 px-4 text-slate-900">TOTAL LANDED COST</td>
                    <td className="py-3 px-4 text-slate-600">All Charges Included</td>
                    <td className="py-3 px-4 text-emerald-700 text-sm">₹{data.projectedLandedTariff.toFixed(2)}</td>
                    <td className="py-3 px-4 text-emerald-700 font-bold">Guaranteed Delivery</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: 45-Day Implementation Roadmap */}
          <div className="mb-10">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 font-mono border-b border-slate-200 pb-2 mb-4">
              3. 45-Day Turnkey Regulatory Roadmap
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-[10px] text-amber-800 font-bold uppercase block">Stage 1 (Days 1–10)</span>
                <span className="font-bold text-slate-900 block mt-1">DISCOM Feasibility</span>
                <p className="text-[11px] text-slate-600 mt-1">
                  NOC filing with {data.discomName} and load flow verification.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-[10px] text-amber-800 font-bold uppercase block">Stage 2 (Days 11–20)</span>
                <span className="font-bold text-slate-900 block mt-1">SLDC Clearance</span>
                <p className="text-[11px] text-slate-600 mt-1">
                  Standing Clearance registration via National Open Access Registry (NOAR).
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-[10px] text-amber-800 font-bold uppercase block">Stage 3 (Days 21–32)</span>
                <span className="font-bold text-slate-900 block mt-1">0.2s ABT Metering</span>
                <p className="text-[11px] text-slate-600 mt-1">
                  Installation of CEA-compliant 0.2s Class DLMS automated energy meters.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-[10px] text-emerald-800 font-bold uppercase block">Stage 4 (Days 33–45)</span>
                <span className="font-bold text-slate-900 block mt-1">Power Scheduling</span>
                <p className="text-[11px] text-slate-600 mt-1">
                  Execution of bilateral PPA &amp; first 15-minute dispatch slot scheduled.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Attestation & Corporate Seal */}
          <div className="pt-6 border-t-2 border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono">
            <div className="space-y-1 text-center sm:text-left">
              <span className="font-bold text-slate-900 block">TOPNOTCH ENERGY SOLUTIONS</span>
              <p className="text-[11px] text-slate-500">
                BEE Certified Energy Audit Practice • CERC Category-IV Trading Desk
              </p>
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-[10px] text-emerald-700 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Digitally Certified &amp; Grounded in CERC / SERC Orders</span>
              </div>
            </div>

            <div className="flex items-center space-x-8 text-center">
              <div>
                <div className="w-32 h-10 border-b border-dashed border-slate-400 mb-1" />
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Designated Power Trader</span>
                <span className="text-[11px] font-bold text-slate-800">Topnotch Trading Desk</span>
              </div>
              <div>
                <div className="w-32 h-10 border-b border-dashed border-slate-400 mb-1" />
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Client Acceptance</span>
                <span className="text-[11px] font-bold text-slate-800">Authorized Signatory</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
