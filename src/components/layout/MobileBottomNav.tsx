"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  TrendingUp,
  Calculator,
  Zap,
  PhoneCall,
  X,
  Layers,
  Sun,
  BatteryCharging,
  Cpu,
} from "lucide-react";
import { BRAND } from "@/lib/constants/brand";

export function MobileBottomNav() {
  const pathname = usePathname();
  const [solutionsDrawerOpen, setSolutionsDrawerOpen] = useState(false);
  const [deskDrawerOpen, setDeskDrawerOpen] = useState(false);

  // Dedicated B2B Portal has its own navigation
  if (pathname?.startsWith("/portal")) {
    return null;
  }

  return (
    <>
      {/* Pinned Bottom Navigation Bar (< 768px) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl safe-area-pb">
        <div className="grid grid-cols-5 h-16 items-center px-1">
          
          {/* 1. Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              pathname === "/" ? "text-[#1C2C34] font-bold" : "text-gray-500 hover:text-[#1C2C34]"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-1">Home</span>
            {pathname === "/" && <span className="w-1.5 h-1.5 rounded-full bg-[#F8BC26] mt-0.5" />}
          </Link>

          {/* 2. Live IEX */}
          <Link
            href="/market-intelligence"
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              pathname === "/market-intelligence" ? "text-[#1C2C34] font-bold" : "text-gray-500 hover:text-[#1C2C34]"
            }`}
          >
            <div className="relative">
              <TrendingUp className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            </div>
            <span className="text-[10px] font-medium mt-1">Live IEX</span>
            {pathname === "/market-intelligence" && <span className="w-1.5 h-1.5 rounded-full bg-[#F8BC26] mt-0.5" />}
          </Link>

          {/* 3. Center Highlighted Floating Action Button: ROI Calc */}
          <div className="relative flex justify-center items-center -top-3">
            <Link
              href="/tools/open-access-calculator"
              aria-label="Rooftop and Open Access Calculator"
              className="w-12 h-12 rounded-full bg-[#F8BC26] text-[#1C2C34] flex flex-col items-center justify-center shadow-lg shadow-amber-300/40 active:scale-95 transition-transform border-2 border-white"
            >
              <Calculator className="w-5 h-5 font-bold" />
              <span className="text-[8px] font-mono font-extrabold -mt-0.5">CALC</span>
            </Link>
          </div>

          {/* 4. Solar & OA (Drawer Trigger) */}
          <button
            onClick={() => {
              setSolutionsDrawerOpen(true);
              setDeskDrawerOpen(false);
            }}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              pathname.startsWith("/solutions") ? "text-[#1C2C34] font-bold" : "text-gray-500 hover:text-[#1C2C34]"
            }`}
          >
            <Zap className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-1">Services</span>
            {pathname.startsWith("/solutions") && <span className="w-1.5 h-1.5 rounded-full bg-[#F8BC26] mt-0.5" />}
          </button>

          {/* 5. 24x7 Desk (Drawer Trigger) */}
          <button
            onClick={() => {
              setDeskDrawerOpen(true);
              setSolutionsDrawerOpen(false);
            }}
            className="flex flex-col items-center justify-center py-1 text-gray-500 hover:text-[#1C2C34] transition-colors"
          >
            <PhoneCall className="w-5 h-5 text-[#10B981]" />
            <span className="text-[10px] font-medium mt-1">24x7 Desk</span>
          </button>
        </div>
      </nav>

      {/* Solutions Bottom Drawer */}
      {solutionsDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setSolutionsDrawerOpen(false)}
          />
          <div className="relative bg-white rounded-t-3xl p-6 shadow-2xl border-t border-gray-200 space-y-4 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                Enterprise Power Modules
              </span>
              <button
                onClick={() => setSolutionsDrawerOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/solutions/power-trading-bilateral-contracts"
                onClick={() => setSolutionsDrawerOpen(false)}
                className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex flex-col space-y-1 hover:border-[#F8BC26]"
              >
                <TrendingUp className="w-4 h-4 text-[#F59E0B]" />
                <span className="text-xs font-bold text-[#1C2C34]">IEX Trading Desk</span>
                <span className="text-[10px] text-gray-500">DAM, GDAM, RTM</span>
              </Link>

              <Link
                href="/solutions/open-access-execution-regulatory"
                onClick={() => setSolutionsDrawerOpen(false)}
                className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex flex-col space-y-1 hover:border-[#F8BC26]"
              >
                <Layers className="w-4 h-4 text-[#10B981]" />
                <span className="text-xs font-bold text-[#1C2C34]">Open Access</span>
                <span className="text-[10px] text-gray-500">Group Captive 26:51</span>
              </Link>

              <Link
                href="/solutions/renewable-energy-sustainability#rooftop-solar"
                onClick={() => setSolutionsDrawerOpen(false)}
                className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex flex-col space-y-1 hover:border-[#F8BC26]"
              >
                <Sun className="w-4 h-4 text-[#F59E0B]" />
                <span className="text-xs font-bold text-[#1C2C34]">Rooftop Solar</span>
                <span className="text-[10px] text-gray-500">TOPCon Bifacial</span>
              </Link>

              <Link
                href="/solutions/renewable-energy-sustainability#bess"
                onClick={() => setSolutionsDrawerOpen(false)}
                className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex flex-col space-y-1 hover:border-[#F8BC26]"
              >
                <BatteryCharging className="w-4 h-4 text-[#0EA5E9]" />
                <span className="text-xs font-bold text-[#1C2C34]">BESS Storage</span>
                <span className="text-[10px] text-gray-500">Peak Arbitrage</span>
              </Link>

              <Link
                href="/solutions/abt-metering-telemetry-infrastructure"
                onClick={() => setSolutionsDrawerOpen(false)}
                className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex flex-col space-y-1 hover:border-[#F8BC26]"
              >
                <Cpu className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-bold text-[#1C2C34]">ABT 0.2s SEM</span>
                <span className="text-[10px] text-gray-500">CEA Telemetry</span>
              </Link>

              <Link
                href="/solutions/energy-cost-optimization-bill-audits"
                onClick={() => setSolutionsDrawerOpen(false)}
                className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex flex-col space-y-1 hover:border-[#F8BC26]"
              >
                <Calculator className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-[#1C2C34]">BEE Bill Audit</span>
                <span className="text-[10px] text-gray-500">0.999 PF Tuning</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 24x7 Desk Contact Drawer */}
      {deskDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setDeskDrawerOpen(false)}
          />
          <div className="relative bg-white rounded-t-3xl p-6 shadow-2xl border-t border-gray-200 space-y-4 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                24x7 NOC Trading Floor Direct
              </span>
              <button
                onClick={() => setDeskDrawerOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Connect directly with our power trading desk in Ghaziabad for immediate IEX block clearance, emergency RTM balancing, or tariff consultations.
            </p>

            <div className="space-y-2 pt-1">
              <a
                href={`tel:${BRAND.contacts.phonePrimary}`}
                className="w-full py-3 px-4 rounded-xl bg-[#1C2C34] text-white font-bold text-xs flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <PhoneCall className="w-4 h-4 text-[#F8BC26]" />
                  <span>Call Primary Line: {BRAND.contacts.phonePrimary}</span>
                </div>
                <span className="text-[10px] text-gray-400">24/7 LIVE</span>
              </a>

              <a
                href={BRAND.contacts.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-between"
              >
                <span>WhatsApp Bidding Desk</span>
                <span>Immediate Reply →</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
