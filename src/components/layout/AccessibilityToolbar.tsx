"use client";

import React, { useState, useEffect } from "react";
import { Phone, Shield, Sun, Moon, Eye, X, ExternalLink } from "lucide-react";
import { BRAND } from "@/lib/constants/brand";

export type ThemeMode = "control-room-dark" | "crisp-slate-light" | "high-contrast";
export type FontSize = "sm" | "base" | "lg";

export function AccessibilityToolbar() {
  const [theme, setTheme] = useState<ThemeMode>("control-room-dark");
  const [fontSize, setFontSize] = useState<FontSize>("base");
  const [isDisclosureOpen, setIsDisclosureOpen] = useState(false);

  useEffect(() => {
    // Apply theme classes to <html>
    const root = document.documentElement;
    root.classList.remove("dark", "light", "theme-high-contrast");

    if (theme === "control-room-dark") {
      root.classList.add("dark");
    } else if (theme === "crisp-slate-light") {
      root.classList.add("light");
    } else if (theme === "high-contrast") {
      root.classList.add("dark", "theme-high-contrast");
    }

    // Apply font size
    root.classList.remove("text-scale-sm", "text-scale-base", "text-scale-lg");
    root.classList.add(`text-scale-${fontSize}`);
  }, [theme, fontSize]);

  return (
    <>
      <div className="bg-grid-navy-950 border-b border-grid-slate-800 text-grid-slate-300 text-xs py-1.5 px-4 sm:px-6 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          {/* Left: 24x7 Bidding Desk Direct Access */}
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-grid-emerald-500/20 text-grid-emerald-400 border border-grid-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-grid-emerald-400 mr-1 animate-pulse" />
              SLDC 24x7 ACTIVE
            </span>
            <a
              href={`tel:${BRAND.contacts.phonePrimary}`}
              className="flex items-center hover:text-white transition-colors font-mono tabular-nums font-medium"
              title="Direct line to 24x7 Bidding Desk"
            >
              <Phone className="w-3 h-3 mr-1 text-grid-cyan-400" />
              <span>Desk: {BRAND.contacts.phonePrimary}</span>
            </a>
            <span className="hidden sm:inline text-grid-slate-700">|</span>
            <span className="hidden sm:inline text-grid-slate-400 font-mono text-[11px]">
              NOAR Reg: CAT-IV / UPERC / MERC
            </span>
          </div>

          {/* Right: Accessibility Controls & Regulatory Disclosures */}
          <div className="flex items-center space-x-3 ml-auto">
            {/* Font Size Adjuster */}
            <div className="flex items-center bg-grid-navy-900 rounded border border-grid-slate-800 p-0.5" title="Adjust Interface Font Size">
              <button
                onClick={() => setFontSize("sm")}
                aria-label="Small font size"
                className={`px-1.5 py-0.5 text-[10px] font-bold rounded transition-colors ${
                  fontSize === "sm" ? "bg-grid-slate-700 text-white" : "text-grid-slate-400 hover:text-white"
                }`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize("base")}
                aria-label="Default font size"
                className={`px-1.5 py-0.5 text-[11px] font-bold rounded transition-colors ${
                  fontSize === "base" ? "bg-grid-slate-700 text-white" : "text-grid-slate-400 hover:text-white"
                }`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize("lg")}
                aria-label="Large font size"
                className={`px-1.5 py-0.5 text-[12px] font-bold rounded transition-colors ${
                  fontSize === "lg" ? "bg-grid-slate-700 text-white" : "text-grid-slate-400 hover:text-white"
                }`}
              >
                A+
              </button>
            </div>

            {/* Theme Modes */}
            <div className="flex items-center bg-grid-navy-900 rounded border border-grid-slate-800 p-0.5">
              <button
                onClick={() => setTheme("control-room-dark")}
                title="Control-Room Dark Mode (24/7 SLDC Desk)"
                className={`p-1 rounded transition-colors ${
                  theme === "control-room-dark"
                    ? "bg-grid-navy-700 text-grid-cyan-400"
                    : "text-grid-slate-400 hover:text-white"
                }`}
              >
                <Moon className="w-3 h-3" />
              </button>
              <button
                onClick={() => setTheme("crisp-slate-light")}
                title="Crisp Slate Light Mode"
                className={`p-1 rounded transition-colors ${
                  theme === "crisp-slate-light"
                    ? "bg-slate-200 text-slate-900"
                    : "text-grid-slate-400 hover:text-white"
                }`}
              >
                <Sun className="w-3 h-3" />
              </button>
              <button
                onClick={() => setTheme("high-contrast")}
                title="Outdoor Sunlight High-Contrast (Site Audit Mode)"
                className={`p-1 rounded transition-colors ${
                  theme === "high-contrast"
                    ? "bg-amber-400 text-black font-bold"
                    : "text-grid-slate-400 hover:text-white"
                }`}
              >
                <Eye className="w-3 h-3" />
              </button>
            </div>

            {/* Statutory Disclosures Trigger */}
            <button
              onClick={() => setIsDisclosureOpen(true)}
              className="flex items-center text-grid-slate-400 hover:text-grid-cyan-400 transition-colors text-[11px]"
            >
              <Shield className="w-3 h-3 mr-1 text-grid-emerald-400" />
              <span className="hidden md:inline">Statutory Disclosures</span>
              <span className="md:hidden">Compliance</span>
            </button>
          </div>
        </div>
      </div>

      {/* Statutory Disclosures Modal */}
      {isDisclosureOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-grid-navy-900 border border-grid-slate-700 text-white rounded-lg max-w-2xl w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsDisclosureOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-md text-grid-slate-400 hover:text-white hover:bg-grid-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-grid-emerald-400 mb-3">
              <Shield className="w-5 h-5" />
              <h3 className="text-base font-bold tracking-wide">
                Statutory Compliance & Regulatory Disclosures
              </h3>
            </div>

            <p className="text-grid-slate-300 text-xs leading-relaxed mb-4">
              {BRAND.companyName} operates in full compliance with the statutory provisions of the{" "}
              <strong>Electricity Act 2003</strong>, the <strong>CERC (Power Market) Regulations 2021</strong>, the{" "}
              <strong>Ministry of Power Green Energy Open Access Rules 2022</strong>, and the respective State
              Electricity Regulatory Commissions (SERC).
            </p>

            <div className="space-y-3 text-xs bg-grid-navy-950/80 p-4 rounded border border-grid-slate-800 font-mono">
              <div className="flex justify-between border-b border-grid-slate-800 pb-2">
                <span className="text-grid-slate-400">Advisory Licensing:</span>
                <span className="text-grid-cyan-300">Category-IV Power Trading & Portfolio Advisory</span>
              </div>
              <div className="flex justify-between border-b border-grid-slate-800 pb-2">
                <span className="text-grid-slate-400">National Open Access Registry:</span>
                <span className="text-white">Active NOAR Institutional Consultant</span>
              </div>
              <div className="flex justify-between border-b border-grid-slate-800 pb-2">
                <span className="text-grid-slate-400">CEA Metering Compliance:</span>
                <span className="text-grid-emerald-400">Class 0.2s SEM / NABL Traceable Calibration</span>
              </div>
              <div className="flex justify-between border-b border-grid-slate-800 pb-2">
                <span className="text-grid-slate-400">CERC DSM Framework:</span>
                <span className="text-white">Deviation Settlement Mechanism Regulations 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-grid-slate-400">Official Regd. Office:</span>
                <span className="text-right text-grid-slate-300">{BRAND.headquarters.fullAddress}</span>
              </div>
            </div>

            <div className="mt-5 flex justify-end space-x-3">
              <a
                href="/statutory-compliance"
                className="inline-flex items-center text-xs font-semibold text-grid-cyan-400 hover:underline"
              >
                <span>View Full Regulatory Repository</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
              <button
                onClick={() => setIsDisclosureOpen(false)}
                className="px-4 py-1.5 bg-grid-emerald-500 hover:bg-grid-emerald-600 text-grid-navy-950 font-bold rounded text-xs transition-colors"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
