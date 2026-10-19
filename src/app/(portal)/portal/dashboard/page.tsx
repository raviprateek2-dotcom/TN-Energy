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
} from "lucide-react";
import { BRAND } from "@/lib/constants/brand";

const PORTAL_MODULES = [
  {
    href: "/portal/bidding-console",
    icon: Activity,
    label: "Bidding Console",
    description: "Place DAM, GDAM, and RTM bids with SLDC schedule view",
    status: "live",
    color: "text-grid-cyan-400",
    bg: "bg-grid-cyan-400/10",
    border: "border-grid-cyan-400/30",
  },
  {
    href: "/portal/documents",
    icon: FileText,
    label: "Documents & Reports",
    description: "SLDC clearance letters, Regional Energy Accounts, ABT meter reports",
    status: "live",
    color: "text-grid-amber-400",
    bg: "bg-grid-amber-400/10",
    border: "border-grid-amber-400/30",
  },
  {
    href: "/portal/savings-dashboard",
    icon: TrendingUp,
    label: "Savings Dashboard",
    description: "Month-wise savings vs Discom baseline, blended tariff tracker",
    status: "live",
    color: "text-grid-emerald-400",
    bg: "bg-grid-emerald-400/10",
    border: "border-grid-emerald-400/30",
  },
  {
    href: "/portal/telemetry",
    icon: Zap,
    label: "ABT Meter Telemetry",
    description: "Real-time 15-minute interval data from your SLDC-registered 0.2s SEM",
    status: "live",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/30",
  },
];

const QUICK_STATS = [
  { label: "Active Exchange Positions", value: "3", sub: "DAM: 2 | RTM: 1" },
  { label: "Next DAM Bidding Window", value: "10:00 AM", sub: "Tomorrow (Day Ahead)" },
  { label: "Current Grid Frequency", value: "50.012 Hz", sub: "NR grid — Normal" },
  { label: "Last DSM Settlement", value: "₹0 Penalty", sub: "Monthly REA – Clean" },
];

export default function PortalDashboardPage() {
  return (
    <main className="min-h-screen bg-grid-navy-950 text-white">
      {/* Portal Header */}
      <div className="border-b border-grid-slate-800 bg-grid-navy-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-grid-emerald-500 to-grid-cyan-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-grid-navy-950" />
            </div>
            <div>
              <div className="text-white font-extrabold text-sm">Client Portal</div>
              <div className="text-grid-slate-500 font-mono text-[10px]">Topnotch Energy Solutions</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 text-[11px] font-mono">
              <div className="w-1.5 h-1.5 rounded-full bg-grid-emerald-400 animate-pulse" />
              <span className="text-grid-emerald-400">24×7 Desk Active</span>
            </div>
            <Link
              href="/"
              className="text-grid-slate-400 hover:text-white font-mono text-xs transition-colors flex items-center space-x-1"
            >
              <span>Main Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-grid-emerald-500/10 via-grid-navy-900 to-grid-navy-900 border border-grid-emerald-500/20 rounded-2xl p-6 mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-extrabold text-white">
                Good morning — 24×7 NOC Bidding Desk is Active
              </h1>
              <p className="text-grid-slate-300 text-xs font-mono mt-1">
                This is a demo portal environment. For live SLDC scheduling and ABT meter data, contact your
                Topnotch account manager.
              </p>
            </div>
            <a
              href={BRAND.contacts.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 px-4 py-2 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] font-mono text-xs font-bold hover:bg-[#25D366]/30 transition-colors"
            >
              WhatsApp Desk
            </a>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {QUICK_STATS.map((stat) => (
            <div key={stat.label} className="bg-grid-navy-900 border border-grid-slate-800 rounded-xl p-4">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-grid-slate-500 mb-1">
                {stat.label}
              </div>
              <div className="text-white font-extrabold font-mono text-base tabular-nums">
                {stat.value}
              </div>
              <div className="text-grid-slate-600 font-mono text-[10px] mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Portal Modules */}
        <h2 className="text-lg font-extrabold text-white mb-5">Portal Modules</h2>
        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          {PORTAL_MODULES.map((mod) => {
            const Icon = mod.icon;
            return (
              <Link
                key={mod.label}
                href={mod.href}
                className={`bg-grid-navy-900 border rounded-2xl p-5 hover:border-grid-slate-600 transition-all group ${
                  mod.status === "coming-soon"
                    ? "border-grid-slate-800 opacity-60 pointer-events-none cursor-not-allowed"
                    : "border-grid-slate-800"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${mod.bg} border ${mod.border}`}>
                    <Icon className={`w-5 h-5 ${mod.color}`} />
                  </div>
                  <div className="flex items-center space-x-2">
                    {mod.status === "coming-soon" ? (
                      <span className="text-[10px] font-mono bg-grid-navy-800 border border-grid-slate-700 text-grid-slate-500 px-2 py-0.5 rounded">
                        Coming Soon
                      </span>
                    ) : (
                      <ChevronRight className="w-4 h-4 text-grid-slate-600 group-hover:text-white transition-colors" />
                    )}
                  </div>
                </div>
                <h3 className="text-white font-extrabold text-sm mt-3">{mod.label}</h3>
                <p className="text-grid-slate-400 text-xs font-mono mt-1 leading-relaxed">
                  {mod.description}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Compliance Reminders */}
        <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-6">
          <h3 className="text-white font-extrabold text-sm mb-4 flex items-center space-x-2">
            <Shield className="w-4 h-4 text-grid-amber-400" />
            <span>Upcoming Compliance Deadlines</span>
          </h3>
          <div className="space-y-3">
            {[
              {
                task: "Monthly REA (Regional Energy Accounting) Settlement",
                deadline: "5th of next month",
                priority: "high",
                detail: "NLDC invoice reconciliation for inter-state transactions",
              },
              {
                task: "ABT Meter Calibration Renewal",
                deadline: "Quarterly — Next: Dec 2025",
                priority: "medium",
                detail: "NABL-accredited lab CT/PT sealing verification",
              },
              {
                task: "REC Purchase for RPO Compliance",
                deadline: "March 31, 2026",
                priority: "medium",
                detail: "Obligated entity RPO target — non-solar and solar REC mix",
              },
              {
                task: "SLDC Standing Clearance Renewal",
                deadline: "Jan 31, 2026",
                priority: "low",
                detail: "Annual renewal of Open Access standing clearance at UP SLDC",
              },
            ].map((item) => (
              <div
                key={item.task}
                className="flex items-start space-x-4 py-2 border-b border-grid-slate-800/80 last:border-0"
              >
                <div className="flex items-center space-x-1.5 flex-shrink-0">
                  <Clock
                    className={`w-4 h-4 ${
                      item.priority === "high"
                        ? "text-red-400"
                        : item.priority === "medium"
                        ? "text-grid-amber-400"
                        : "text-grid-slate-500"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-bold text-xs">{item.task}</div>
                  <div className="text-grid-slate-400 font-mono text-[11px] mt-0.5">{item.detail}</div>
                </div>
                <div className="text-grid-slate-400 font-mono text-[11px] flex-shrink-0">{item.deadline}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
