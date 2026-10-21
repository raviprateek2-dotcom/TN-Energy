"use client";

import React from "react";
import Link from "next/link";
import {
  BarChart3,
  Activity,
  FileText,
  TrendingUp,
  Zap,
  Clock,
  Shield,
  ChevronRight,
  ExternalLink,
  Phone,
  AlertCircle,
  Building2,
  CheckCircle,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { BRAND } from "@/lib/constants/brand";

const PORTAL_MODULES = [
  {
    href: "/portal/bidding-console",
    icon: Activity,
    label: "15-Min Bidding Console",
    description: "Execute DAM, GDAM, and RTM power exchange bids with live order book depth and 96-block price curves",
    badge: "Live Bourse",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
  {
    href: "/portal/telemetry",
    icon: Zap,
    label: "SCADA & ABT Telemetry",
    description: "Real-time 15-minute interval data from your SLDC-registered Class 0.2s SEM with APFC step-tuning simulator",
    badge: "96-Block SEM",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
  },
  {
    href: "/portal/savings-dashboard",
    icon: TrendingUp,
    label: "Invoice Reconciliation",
    description: "Month-by-month audited DISCOM vs. Topnotch landed tariff reconciliation with BEE certified verification hash",
    badge: "Audited Ledger",
    color: "text-[#F8BC26]",
    bg: "bg-[#F8BC26]/10",
    border: "border-[#F8BC26]/30",
  },
  {
    href: "/portal/documents",
    icon: FileText,
    label: "Statutory Documents & REA",
    description: "SLDC standing clearance letters, Regional Energy Accounts, NABL calibration logs, and CERC REC certificates",
    badge: "NOC Repository",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
  },
];

const QUICK_STATS = [
  { label: "Active Exchange Positions", value: "3 Contracts", sub: "DAM: 2 | RTM: 1 Active", highlight: "text-emerald-400" },
  { label: "Weighted Landed Tariff", value: "₹5.48 / kWh", sub: "DISCOM Baseline: ₹8.65", highlight: "text-[#F8BC26]" },
  { label: "Current Grid Frequency", value: "50.012 Hz", sub: "NR Grid — Normal Band", highlight: "text-cyan-400" },
  { label: "Last DSM Settlement", value: "₹0 Penalty", sub: "Monthly REA – 100% Clean", highlight: "text-emerald-400" },
];

export default function PortalDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Cockpit Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 mb-1">
            <span>PORTAL</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#F8BC26]">OPERATIONS OVERVIEW</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[10px]">
              24×7 NOC ACTIVE
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            C&amp;I Power Exchange Cockpit
          </h1>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Automated power procurement, real-time grid telemetry, and statutory reconciliation engine
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href={BRAND.contacts.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-mono font-bold hover:bg-[#25D366]/30 transition-colors"
          >
            <span>WhatsApp Desk</span>
          </a>
          <a
            href={`tel:${BRAND.contacts.phonePrimary}`}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#F8BC26] to-[#E5A812] text-[#1C2C34] hover:brightness-110 text-xs font-mono font-bold transition-all shadow-lg shadow-[#F8BC26]/20"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>NOC Hotline</span>
          </a>
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#0B1120] to-[#0B1120] border border-emerald-500/30 p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 font-bold mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>POSOCO / NOAR Automated Gateway Synchronized</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white">
              Good day — Industrial Energy Portfolio Operating at 70.4% Green Share
            </h2>
            <p className="text-xs font-mono text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Today&apos;s power dispatch is automated across Rooftop Solar PPA, Interstate Group Captive, and IEX GDAM clearance. All 96 time-blocks are scheduled within SLDC Deviation Settlement limits.
            </p>
          </div>

          <div className="flex-shrink-0 flex items-center space-x-3">
            <Link
              href="/portal/bidding-console"
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#060913] text-xs font-mono font-bold flex items-center space-x-1.5 transition-colors shadow-lg shadow-emerald-500/20"
            >
              <span>Launch Bidding Desk</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick 4 Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {QUICK_STATS.map((stat) => (
          <div key={stat.label} className="bg-[#0B1120] border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
              {stat.label}
            </div>
            <div className={`font-black font-mono text-lg sm:text-2xl tabular-nums ${stat.highlight}`}>
              {stat.value}
            </div>
            <div className="text-slate-400 font-mono text-xs mt-1">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Energy Procurement Split Visualization */}
      <div className="bg-[#0B1120] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-black text-white flex items-center space-x-2">
              <Zap className="w-4 h-4 text-[#F8BC26]" />
              <span>Real-Time Power Procurement Mix (Active Load Profile)</span>
            </h3>
            <p className="text-xs font-mono text-slate-400 mt-0.5">
              Optimal multi-source dispatch balancing renewable generation, exchange clearance, and grid backup
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold">Total Demand: 10.2 MW</span>
        </div>

        {/* Multi-segment Progress Bar */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden flex p-0.5 border border-slate-800">
            <div className="bg-amber-400 rounded-l-full h-full transition-all" style={{ width: "35%" }} title="Solar Onsite PPA (35%)" />
            <div className="bg-cyan-400 h-full transition-all" style={{ width: "35.4%" }} title="Group Captive Wind/Solar (35.4%)" />
            <div className="bg-emerald-400 h-full transition-all" style={{ width: "20%" }} title="IEX GDAM Cleared (20%)" />
            <div className="bg-slate-700 rounded-r-full h-full transition-all" style={{ width: "9.6%" }} title="DISCOM Standby (9.6%)" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-xs">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="text-slate-300">Rooftop Solar: <strong>3.57 MW (35%)</strong></span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span className="text-slate-300">Group Captive: <strong>3.61 MW (35.4%)</strong></span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-slate-300">IEX GDAM: <strong>2.04 MW (20%)</strong></span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
              <span className="text-slate-300">DISCOM Grid: <strong>0.98 MW (9.6%)</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Interactive Portal Modules */}
      <div>
        <h2 className="text-base font-black text-white mb-4">Command Center Modules</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {PORTAL_MODULES.map((mod) => {
            const Icon = mod.icon;
            return (
              <Link
                key={mod.label}
                href={mod.href}
                className="bg-[#0B1120] border border-slate-800 rounded-2xl p-5 hover:border-slate-700 hover:bg-slate-900/60 transition-all group relative overflow-hidden shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${mod.bg} border ${mod.border}`}>
                    <Icon className={`w-5 h-5 ${mod.color}`} />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-slate-700 text-slate-300 font-bold">
                    {mod.badge}
                  </span>
                </div>
                <h3 className="text-white font-extrabold text-sm sm:text-base mt-3 group-hover:text-[#F8BC26] transition-colors flex items-center space-x-1.5">
                  <span>{mod.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-slate-400 text-xs font-mono mt-1 leading-relaxed">
                  {mod.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Compliance & SLDC Calendar */}
      <div className="bg-[#0B1120] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-white font-black text-sm mb-4 flex items-center space-x-2">
          <Shield className="w-4 h-4 text-[#F8BC26]" />
          <span>Statutory Clearances &amp; SLDC Operational Deadlines</span>
        </h3>
        <div className="space-y-3 font-mono text-xs">
          {[
            {
              task: "Monthly REA (Regional Energy Accounting) Settlement",
              deadline: "5th of next month",
              priority: "high",
              detail: "NLDC invoice reconciliation for inter-state transmission wheeling",
            },
            {
              task: "ABT 0.2s Meter Drift Calibration Verification",
              deadline: "Valid till Dec 2026",
              priority: "normal",
              detail: "NABL-accredited laboratory certified CT/PT lead seal inspection",
            },
            {
              task: "CERC REC Renewable Purchase Obligation (RPO)",
              deadline: "FY 2025-26 Target on Track",
              priority: "normal",
              detail: "Solar & Non-Solar compliance satisfied via captive generation",
            },
            {
              task: "State SLDC Open Access Standing Clearance Renewal",
              deadline: "Valid till 31 Oct 2026",
              priority: "normal",
              detail: "Annual continuous feeder clearance endorsed under EA 2003",
            },
          ].map((item) => (
            <div
              key={item.task}
              className="flex items-start justify-between py-2.5 border-b border-slate-800/80 last:border-0 gap-4"
            >
              <div className="flex items-start space-x-3">
                <Clock className={`w-4 h-4 mt-0.5 ${item.priority === "high" ? "text-red-400" : "text-emerald-400"}`} />
                <div>
                  <div className="text-white font-bold">{item.task}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">{item.detail}</div>
                </div>
              </div>
              <div className="text-slate-300 font-bold whitespace-nowrap text-right">
                {item.deadline}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
