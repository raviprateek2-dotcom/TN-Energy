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
  MessageSquare,
  Lock,
  Layers,
  Sun,
  BatteryCharging,
  Cpu,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import { BRAND } from "@/lib/constants/brand";

export function MobileBottomNav() {
  const pathname = usePathname();
  const [solutionsDrawerOpen, setSolutionsDrawerOpen] = useState(false);
  const [deskDrawerOpen, setDeskDrawerOpen] = useState(false);

  return (
    <>
      {/* Pinned Bottom Navigation Bar (< 768px) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-grid-navy-950/95 backdrop-blur-xl border-t border-grid-slate-800 shadow-2xl safe-area-pb">
        <div className="grid grid-cols-5 h-16 items-center px-1">
          
          {/* 1. Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              pathname === "/" ? "text-grid-emerald-400" : "text-grid-slate-400 hover:text-white"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-1">Home</span>
            {pathname === "/" && <span className="w-1 h-1 rounded-full bg-grid-emerald-400 mt-0.5" />}
          </Link>

          {/* 2. Live IEX */}
          <Link
            href="/market-intelligence"
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              pathname === "/market-intelligence" ? "text-grid-cyan-400" : "text-grid-slate-400 hover:text-white"
            }`}
          >
            <div className="relative">
              <TrendingUp className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-grid-emerald-400 animate-ping" />
            </div>
            <span className="text-[10px] font-medium mt-1">Live IEX</span>
            {pathname === "/market-intelligence" && <span className="w-1 h-1 rounded-full bg-grid-cyan-400 mt-0.5" />}
          </Link>

          {/* 3. Center Highlighted Floating Action Button: ROI Calc */}
          <div className="relative flex justify-center items-center -top-3">
            <Link
              href="/tools/open-access-calculator"
              aria-label="Rooftop and Open Access Calculator"
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-grid-emerald-500 to-grid-cyan-400 text-grid-navy-950 flex flex-col items-center justify-center shadow-lg shadow-grid-emerald-500/30 active:scale-95 transition-transform border-2 border-grid-navy-900"
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
              solutionsDrawerOpen ? "text-grid-amber-400" : "text-grid-slate-400 hover:text-white"
            }`}
          >
            <Zap className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-1">Solar & OA</span>
          </button>

          {/* 5. Portal / Desk (Drawer Trigger) */}
          <button
            onClick={() => {
              setDeskDrawerOpen(true);
              setSolutionsDrawerOpen(false);
            }}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              deskDrawerOpen ? "text-grid-cyan-400" : "text-grid-slate-400 hover:text-white"
            }`}
          >
            <PhoneCall className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-1">Portal/Desk</span>
          </button>
        </div>
      </nav>

      {/* Solutions Bottom-Sheet Drawer */}
      {solutionsDrawerOpen && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm md:hidden animate-in fade-in duration-150">
          <div className="fixed inset-x-0 bottom-0 bg-grid-navy-900 border-t border-grid-slate-700 rounded-t-2xl p-5 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            <div className="flex justify-between items-center pb-3 border-b border-grid-slate-800">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-grid-emerald-400" />
                <h3 className="font-bold text-white text-sm">Solar Systems & Open Access Solutions</h3>
              </div>
              <button
                onClick={() => setSolutionsDrawerOpen(false)}
                className="p-1 rounded-full text-grid-slate-400 hover:text-white hover:bg-grid-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 mt-4 text-xs font-mono">
              <Link
                href="/solutions/power-trading-bilateral-contracts"
                onClick={() => setSolutionsDrawerOpen(false)}
                className="flex items-start p-3 bg-grid-navy-950 rounded-lg border border-grid-slate-800"
              >
                <TrendingUp className="w-4 h-4 text-grid-emerald-400 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Power Trading & Exchange Bourses</div>
                  <div className="text-[11px] text-grid-slate-400 font-sans mt-0.5">
                    IEX DAM, GDAM, and RTM 24x7 automated bidding desk.
                  </div>
                </div>
              </Link>

              <Link
                href="/solutions/open-access-execution-regulatory"
                onClick={() => setSolutionsDrawerOpen(false)}
                className="flex items-start p-3 bg-grid-navy-950 rounded-lg border border-grid-slate-800"
              >
                <Layers className="w-4 h-4 text-grid-cyan-400 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Group Captive (26:51) Open Access</div>
                  <div className="text-[11px] text-grid-slate-400 font-sans mt-0.5">
                    100% statutory waiver of Cross-Subsidy and Additional Surcharge.
                  </div>
                </div>
              </Link>

              <Link
                href="/solutions/renewable-energy-sustainability"
                onClick={() => setSolutionsDrawerOpen(false)}
                className="flex items-start p-3 bg-grid-navy-950 rounded-lg border border-grid-slate-800"
              >
                <Sun className="w-4 h-4 text-grid-amber-400 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Industrial Rooftop Solar & BESS</div>
                  <div className="text-[11px] text-grid-slate-400 font-sans mt-0.5">
                    On-site TOPCon Bifacial generation at ₹1.55/kWh LCOE + peak battery storage.
                  </div>
                </div>
              </Link>

              <Link
                href="/solutions/abt-metering-telemetry-infrastructure"
                onClick={() => setSolutionsDrawerOpen(false)}
                className="flex items-start p-3 bg-grid-navy-950 rounded-lg border border-grid-slate-800"
              >
                <Cpu className="w-4 h-4 text-grid-slate-300 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">ABT 0.2s SEM & SLDC SCADA Sync</div>
                  <div className="text-[11px] text-grid-slate-400 font-sans mt-0.5">
                    CEA-compliant metering, NABL calibration, and automated 4G AMR push.
                  </div>
                </div>
              </Link>

              <Link
                href="/solutions/energy-cost-optimization-bill-audits"
                onClick={() => setSolutionsDrawerOpen(false)}
                className="flex items-start p-3 bg-grid-navy-950 rounded-lg border border-grid-slate-800"
              >
                <BarChart3 className="w-4 h-4 text-grid-emerald-400 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">BEE Energy Audits & PF Tuning (0.999)</div>
                  <div className="text-[11px] text-grid-slate-400 font-sans mt-0.5">
                    Contract demand rationalization and Discom bill penalty recovery.
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 24x7 Bidding Desk / Portal Bottom-Sheet Drawer */}
      {deskDrawerOpen && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm md:hidden animate-in fade-in duration-150">
          <div className="fixed inset-x-0 bottom-0 bg-grid-navy-900 border-t border-grid-slate-700 rounded-t-2xl p-5 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            <div className="flex justify-between items-center pb-3 border-b border-grid-slate-800">
              <div className="flex items-center space-x-2">
                <PhoneCall className="w-5 h-5 text-grid-cyan-400" />
                <h3 className="font-bold text-white text-sm">24x7 Bidding Desk & Client Portal</h3>
              </div>
              <button
                onClick={() => setDeskDrawerOpen(false)}
                className="p-1 rounded-full text-grid-slate-400 hover:text-white hover:bg-grid-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-grid-slate-300 mt-3 leading-relaxed">
              Connect directly with our round-the-clock power trading floor in Ghaziabad for urgent block bids, DSM deviation balancing, or Open Access inquiries.
            </p>

            <div className="space-y-3 mt-4">
              <a
                href={`tel:${BRAND.contacts.phonePrimary}`}
                className="flex items-center justify-center p-3.5 bg-grid-emerald-500 text-grid-navy-950 font-bold font-mono text-xs rounded-xl shadow-lg space-x-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Primary Desk: {BRAND.contacts.phonePrimary}</span>
              </a>

              <a
                href={BRAND.contacts.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-3.5 bg-[#25D366] text-white font-bold font-mono text-xs rounded-xl shadow-lg space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Trading Floor (Instant Response)</span>
              </a>

              <a
                href={`tel:${BRAND.contacts.phoneSecondary}`}
                className="flex items-center justify-center p-3 bg-grid-navy-950 border border-grid-slate-800 text-grid-slate-300 font-mono text-xs rounded-xl space-x-2"
              >
                <PhoneCall className="w-3.5 h-3.5 text-grid-slate-400" />
                <span>Secondary Line: {BRAND.contacts.phoneSecondary}</span>
              </a>

              <Link
                href="/portal/dashboard"
                onClick={() => setDeskDrawerOpen(false)}
                className="flex items-center justify-center p-3 bg-grid-navy-800 border border-grid-cyan-500/30 text-grid-cyan-300 font-bold font-mono text-xs rounded-xl space-x-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Secure Client Trading Portal Login</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
