"use client";

import React, { useState, useEffect } from "react";
import { Phone, Shield, Sun, Eye, X, ExternalLink } from "lucide-react";
import { BRAND } from "@/lib/constants/brand";

export type ThemeMode = "crisp-slate-light" | "high-contrast";
export type FontSize = "sm" | "base" | "lg";

export function AccessibilityToolbar() {
  const [fontSize, setFontSize] = useState<FontSize>("base");
  const [isDisclosureOpen, setIsDisclosureOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("text-scale-sm", "text-scale-base", "text-scale-lg");
    root.classList.add(`text-scale-${fontSize}`);
  }, [fontSize]);

  return (
    <>
      <div className="bg-white border-b border-gray-200 text-gray-600 text-xs py-1.5 px-4 sm:px-6 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          {/* Left: 24x7 Bidding Desk Direct Access */}
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mr-1 animate-pulse" />
              SLDC 24x7 ACTIVE
            </span>
            <a
              href={`tel:${BRAND.contacts.phonePrimary}`}
              className="flex items-center hover:text-[#1C2C34] transition-colors font-mono tabular-nums font-semibold"
              title="Direct line to 24x7 Bidding Desk"
            >
              <Phone className="w-3 h-3 mr-1 text-[#F59E0B]" />
              <span>Desk: {BRAND.contacts.phonePrimary}</span>
            </a>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="hidden sm:inline text-gray-500 font-mono text-[11px]">
              NOAR Reg: Category-IV Advisory Desk
            </span>
          </div>

          {/* Right: Accessibility Controls & Regulatory Disclosures */}
          <div className="flex items-center space-x-3 ml-auto">
            {/* Font Size Adjuster */}
            <div className="flex items-center bg-gray-100 rounded-lg p-0.5 border border-gray-200" title="Adjust Interface Font Size">
              <button
                onClick={() => setFontSize("sm")}
                aria-label="Small font size"
                className={`px-1.5 py-0.5 text-[10px] font-bold rounded transition-colors ${
                  fontSize === "sm" ? "bg-white text-[#1C2C34] shadow-xs" : "text-gray-500 hover:text-[#1C2C34]"
                }`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize("base")}
                aria-label="Default font size"
                className={`px-1.5 py-0.5 text-[11px] font-bold rounded transition-colors ${
                  fontSize === "base" ? "bg-white text-[#1C2C34] shadow-xs" : "text-gray-500 hover:text-[#1C2C34]"
                }`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize("lg")}
                aria-label="Large font size"
                className={`px-1.5 py-0.5 text-[12px] font-bold rounded transition-colors ${
                  fontSize === "lg" ? "bg-white text-[#1C2C34] shadow-xs" : "text-gray-500 hover:text-[#1C2C34]"
                }`}
              >
                A+
              </button>
            </div>

            <span className="text-gray-300">|</span>

            {/* Regulatory Modal Trigger */}
            <button
              onClick={() => setIsDisclosureOpen(true)}
              className="flex items-center text-[11px] text-gray-600 hover:text-[#1C2C34] transition-colors font-medium"
            >
              <Shield className="w-3 h-3 mr-1 text-[#10B981]" />
              <span>CERC/SERC Orders</span>
            </button>
          </div>
        </div>
      </div>

      {/* Regulatory Disclosures Modal */}
      {isDisclosureOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-gray-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-[#F59E0B]" />
                <h3 className="font-bold text-sm text-[#1C2C34]">
                  Regulatory Compliance & Statutory Disclosures
                </h3>
              </div>
              <button
                onClick={() => setIsDisclosureOpen(false)}
                className="text-gray-400 hover:text-gray-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-600 leading-relaxed max-h-[60vh] overflow-y-auto">
              <p>
                <strong>Topnotch Energy Solutions Private Limited</strong> operates as a registered Institutional Power Trading Consultant under the Central Electricity Regulatory Commission (Power Market) Regulations 2021.
              </p>
              <div className="p-3 bg-gray-50 rounded-xl space-y-1.5 font-mono text-[11px]">
                <div>• CERC Licenced Category-IV Advisory</div>
                <div>• National Open Access Registry (NOAR) Registered</div>
                <div>• Bureau of Energy Efficiency (BEE) Certified Auditors</div>
                <div>• Central Electricity Authority (CEA) Class 0.2s SEM Metering</div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setIsDisclosureOpen(false)}
                className="px-4 py-2 text-xs font-bold rounded-full bg-[#1C2C34] text-white hover:bg-[#F8BC26] hover:text-[#1C2C34] transition-colors"
              >
                Close Disclosure
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
