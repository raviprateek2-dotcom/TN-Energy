"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Zap,
  Phone,
  Mail,
  MapPin,
  Shield,
  ArrowRight,
  Award,
  CheckCircle2,
  Cpu,
  Calculator,
  Activity,
  Send,
  Building,
  Scale,
  FileText,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { BRAND } from "@/lib/constants/brand";
import { PageDivider } from "@/components/ui/PageDivider";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Dedicated B2B Portal has its own cockpit footer
  if (pathname?.startsWith("/portal")) {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative font-sans overflow-hidden">
      {/* =========================================================================
          UPPER EXECUTIVE DISPATCH & POWER MARKET INTELLIGENCE STRIP (WAAREE-GRADE)
          CRISP WHITE BACKGROUND WITH HALF-MERGING INDUSTRIAL CLEAN ENERGY IMAGE
         ========================================================================= */}
      <section className="relative bg-white text-[#1C2C34] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-slate-200">
        
        {/* Right Half: High-Resolution Industrial Solar & Wind Array Merging into White */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-3/5 pointer-events-none select-none overflow-hidden z-0">
          <Image
            src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1600&q=80"
            alt="Utility-scale industrial solar arrays and clean energy transmission"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover object-center lg:object-right opacity-90"
          />
          {/* Left-to-Right Seamless Gradient Mask: White to Transparent */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 lg:via-white/70 to-transparent z-10" />
          {/* Mobile Vertical Fade for 100% Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-transparent lg:hidden z-10" />
          {/* Top and Bottom Fades for Organic Blending */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/70 z-10" />
        </div>

        {/* Foreground Content */}
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
            
            {/* Left Column: Heading & Executive Description */}
            <div className="max-w-2xl text-center lg:text-left space-y-4">
              <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                <span>CERC Power Market Intelligence &amp; Regulatory Dispatches</span>
              </div>
              
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1C2C34] tracking-tight leading-tight">
                Stay Ahead of India&apos;s Industrial{" "}
                <span className="text-[#D97706]">Energy Transition</span>
              </h2>
              
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-sans">
                Join 1,200+ Factory Owners, CFOs, and Energy Managers receiving bi-weekly IEX clearing price dynamics, state open access banking notifications, and SERC tariff order breakdowns.
              </p>

              {/* Quick Regulatory Proof Points */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs font-mono text-slate-700">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Bi-Weekly 96-Block Bourse Analysis</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>SERC Tariff Order Impact Audits</span>
                </div>
              </div>
            </div>

            {/* Right Form Card Container */}
            <div className="w-full lg:max-w-md flex-shrink-0">
              <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xl space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#1C2C34] flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-[#D97706]" />
                    <span>Subscribe to Regulatory Intelligence</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    Direct executive intelligence delivered to your corporate inbox
                  </p>
                </div>

                {subscribed ? (
                  <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center space-x-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="font-medium">
                      Thank you! You are subscribed to Topnotch CERC Market Dispatches.
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <div className="relative flex flex-col sm:flex-row items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-300/90 focus-within:border-[#F8BC26] focus-within:bg-white transition-all shadow-inner">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter corporate email (e.g. cfo@industry.com)"
                        required
                        className="w-full bg-transparent text-[#1C2C34] placeholder-slate-400 px-4 py-3 text-sm focus:outline-none font-sans"
                      />
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#F8BC26] hover:bg-[#eab308] text-[#1C2C34] font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95 flex-shrink-0"
                      >
                        <span>Subscribe</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] font-mono text-slate-500 text-center sm:text-left pl-1">
                      Zero spam. Strictly CERC filings, SERC open access orders &amp; power bourses.
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Waaree Fluid Wave Divider: Flowing Crisp White into Deep Midnight Blue */}
        <div className="absolute bottom-0 inset-x-0 pointer-events-none">
          <PageDivider type="layered-wave" fillColor="#0A0F1D" bgColor="#FFFFFF" position="bottom" height={60} />
        </div>
      </section>

      {/* =========================================================================
          MAIN 5-COLUMN ENTERPRISE FOOTER (DEEP MIDNIGHT BLUE WITH AMBIENT ILLUMINATION)
         ========================================================================= */}
      <div className="relative bg-[#060913] text-slate-300 pb-24 md:pb-12 border-t border-slate-800/80 overflow-hidden">
        {/* Dynamic Multi-Layer Ambient Lighting Flares */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#F8BC26]/[0.06] blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] rounded-full bg-emerald-500/[0.06] blur-[150px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-blue-600/[0.05] rounded-full blur-[180px] pointer-events-none" />

        {/* Fine Industrial Architectural Grid Telemetry Background with Radial Fade */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415518_1px,transparent_1px),linear-gradient(to_bottom,#33415518_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_80%,transparent_100%)] pointer-events-none" />

        {/* Cinematic Industrial Photography Background Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2000&q=80"
            alt="Industrial power infrastructure background"
            fill
            sizes="100vw"
            className="object-cover object-bottom opacity-[0.14]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/95 to-[#060913]/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060913]/90 via-transparent to-[#060913]/90" />
        </div>

        {/* Top Edge Ambient Horizon Beam */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#F8BC26]/30 via-emerald-400/20 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-14">
            
            {/* Col 1: Corporate Identity & Accreditations (Spans 4 columns on large screens) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Brand Logo & Title */}
              <div className="flex items-center space-x-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#F8BC26] flex items-center justify-center text-[#1C2C34] shadow-lg shadow-[#F8BC26]/20">
                  <Zap className="w-6 h-6 fill-current stroke-[2.5]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-2xl text-white tracking-tight leading-none">
                    Topnotch <span className="text-[#F8BC26]">Energy</span>
                  </span>
                  <span className="text-[11px] uppercase font-mono tracking-wider text-slate-400 mt-1">
                    Industrial Power Trading &amp; Open Access
                  </span>
                </div>
              </div>

              {/* Corporate Value Prop */}
              <p className="text-slate-300 text-sm leading-relaxed">
                India&apos;s premier B2B industrial power advisory delivering 18%–42% electricity bill reductions for high-tension consumers through Group Captive renewable SPVs, automated 24x7 IEX bourse trading, and turnkey CEA 0.2s ABT metering infrastructure across 14 manufacturing states.
              </p>

              {/* Head Office & Operational Telemetry Details */}
              <div className="space-y-3.5 text-xs font-mono text-slate-300 pt-3 border-t border-slate-800">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-[#F8BC26] flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    {BRAND.headquarters.fullAddress}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <a
                    href={`tel:${BRAND.contacts.phonePrimary}`}
                    className="hover:text-white transition-colors"
                  >
                    24x7 NOC Dispatch Floor: <span className="text-white font-bold">{BRAND.contacts.phonePrimary}</span>
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-[#F8BC26] flex-shrink-0" />
                  <a
                    href={`tel:${BRAND.contacts.phoneSecondary}`}
                    className="hover:text-white transition-colors"
                  >
                    Corporate Desk: {BRAND.contacts.phoneSecondary}
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <a
                    href={`mailto:${BRAND.contacts.emailGeneral}`}
                    className="hover:text-white transition-colors"
                  >
                    {BRAND.contacts.emailGeneral}
                  </a>
                </div>
              </div>

              {/* Regulatory Accreditations Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="px-3 py-1.5 rounded-lg bg-slate-800/90 border border-slate-700 text-xs font-mono text-slate-200 flex items-center space-x-1.5 shadow-sm">
                  <Award className="w-3.5 h-3.5 text-[#F8BC26]" />
                  <span>CERC Category-IV</span>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-800/90 border border-slate-700 text-xs font-mono text-slate-200 flex items-center space-x-1.5 shadow-sm">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>NOAR Gateway</span>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-800/90 border border-slate-700 text-xs font-mono text-slate-200 flex items-center space-x-1.5 shadow-sm">
                  <Cpu className="w-3.5 h-3.5 text-sky-400" />
                  <span>CEA 0.2s ABT</span>
                </span>
              </div>
            </div>

            {/* Col 2: Solutions & PPA Structuring (Spans 2 columns) */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider text-[#F8BC26] pb-2 border-b border-slate-800 flex items-center space-x-1.5">
                <span>Solutions</span>
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/solutions/open-access-execution-regulatory"
                    className="text-slate-300 hover:text-[#F8BC26] transition-colors block"
                  >
                    Group Captive SPV (Sec 42)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solutions/power-trading-bilateral-contracts"
                    className="text-slate-300 hover:text-[#F8BC26] transition-colors block"
                  >
                    IEX DAM, GDAM &amp; RTM Trading
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solutions/renewable-energy-sustainability"
                    className="text-slate-300 hover:text-[#F8BC26] transition-colors block"
                  >
                    Industrial Rooftop Solar &amp; BESS
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solutions/abt-metering-telemetry-infrastructure"
                    className="text-slate-300 hover:text-[#F8BC26] transition-colors block"
                  >
                    Turnkey ABT 0.2s SEM Metering
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solutions/energy-cost-optimization-bill-audits"
                    className="text-slate-300 hover:text-[#F8BC26] transition-colors block"
                  >
                    BEE Grade-A Energy Audits
                  </Link>
                </li>
                <li>
                  <Link
                    href="/statutory-compliance"
                    className="text-slate-300 hover:text-[#F8BC26] transition-colors block"
                  >
                    SLDC &amp; NOAR Clearances
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Sectors Powered (Spans 2 columns) */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider text-[#F8BC26] pb-2 border-b border-slate-800 flex items-center space-x-1.5">
                <span>Sectors Powered</span>
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/case-studies" className="text-slate-300 hover:text-[#F8BC26] transition-colors block">
                    Steel &amp; Induction Furnaces
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies" className="text-slate-300 hover:text-[#F8BC26] transition-colors block">
                    Textile &amp; Spinning Mills
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies" className="text-slate-300 hover:text-[#F8BC26] transition-colors block">
                    Chemical &amp; Active Pharma Plants
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies" className="text-slate-300 hover:text-[#F8BC26] transition-colors block">
                    Cold Chain &amp; Food Processing
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies" className="text-slate-300 hover:text-[#F8BC26] transition-colors block">
                    Pulp, Paper &amp; Packaging
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies" className="text-slate-300 hover:text-[#F8BC26] transition-colors block">
                    Auto Ancillary PEB Sheds
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Market Telemetry & Tools (Spans 2 columns) */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider text-[#F8BC26] pb-2 border-b border-slate-800 flex items-center space-x-1.5">
                <span>Tools &amp; Bourses</span>
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/market-intelligence"
                    className="text-slate-300 hover:text-[#F8BC26] transition-colors flex items-center space-x-1.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse flex-shrink-0" />
                    <span>Live 96-Block Terminal</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools/open-access-calculator" className="text-slate-300 hover:text-[#F8BC26] transition-colors block">
                    Open Access ROI Simulator
                  </Link>
                </li>
                <li>
                  <Link href="/tools/compare-states" className="text-slate-300 hover:text-[#F8BC26] transition-colors block">
                    14-State Policy Matrix
                  </Link>
                </li>
                <li>
                  <Link href="/procurement-dossier" className="text-slate-300 hover:text-[#F8BC26] transition-colors block">
                    Vendor Empanelment Kit
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies" className="text-slate-300 hover:text-[#F8BC26] transition-colors block">
                    Audited Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-slate-300 hover:text-[#F8BC26] transition-colors block">
                    Regulatory FAQ &amp; Guides
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 5: Governance & Statutory (Spans 2 columns) */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider text-[#F8BC26] pb-2 border-b border-slate-800 flex items-center space-x-1.5">
                <span>Governance</span>
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/statutory-compliance" className="text-slate-300 hover:text-[#F8BC26] transition-colors block">
                    CERC PMR 2021 Norms
                  </Link>
                </li>
                <li>
                  <Link href="/statutory-compliance" className="text-slate-300 hover:text-[#F8BC26] transition-colors block">
                    Electricity Act 2003 (Rule 3)
                  </Link>
                </li>
                <li>
                  <Link href="/statutory-compliance" className="text-slate-300 hover:text-[#F8BC26] transition-colors block">
                    NOAR Registry Gateway
                  </Link>
                </li>
                <li>
                  <Link href="/statutory-compliance" className="text-slate-300 hover:text-[#F8BC26] transition-colors block">
                    Deviation Settlement (DSM)
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-slate-300 hover:text-[#F8BC26] transition-colors block">
                    Leadership &amp; BEE Auditors
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-slate-300 hover:text-[#F8BC26] transition-colors block">
                    NOC Bidding Desk Floor
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          {/* =========================================================================
              LIVE NATIONAL POWER GRID TELEMETRY BAR (WAAREE-GRADE INDUSTRIAL STATUS)
             ========================================================================= */}
          <div className="mt-16 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-400">Live Indian Power Grid Status:</span>
              <span className="text-emerald-400 font-bold flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>50.012 Hz (Within 49.90–50.05 Hz IEGC Band)</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-slate-400">
              <span className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>IEX / PXIL Bourses: Connected</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>NOAR Connectivity: Live</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F8BC26]" />
                <span>Trading Floor: Ghaziabad Active</span>
              </span>
            </div>
          </div>

          {/* =========================================================================
              BOTTOM LEGAL DISCLAIMER & STATUTORY GOVERNANCE (SPACIOUS WAAREE-GRADE)
             ========================================================================= */}
          <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col lg:flex-row items-center justify-between gap-6 text-xs text-slate-400 font-mono">
            <div>
              &copy; {CURRENT_YEAR} {BRAND.legalName}. All rights reserved. Registered Office: {BRAND.headquarters.city}, {BRAND.headquarters.state}.
            </div>

            <div className="max-w-2xl text-center lg:text-right text-[11px] leading-relaxed text-slate-400">
              Regulatory Note: All exchange power transactions are executed in compliance with CERC (Power Market) Regulations 2021 and State Electricity Regulatory Commission (SERC) Open Access regulations. Group Captive structures conform strictly to Electricity Rules 2005 (Rule 3) requiring 26% equity ownership and 51% captive consumption.
            </div>
          </div>

          {/* Bottom Utility Links */}
          <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-mono text-slate-400">
            <Link href="/statutory-compliance" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link href="/statutory-compliance" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span>&bull;</span>
            <Link href="/statutory-compliance" className="hover:text-white transition-colors">
              Regulatory Disclosures
            </Link>
            <span>&bull;</span>
            <Link href="/procurement-dossier" className="hover:text-white transition-colors">
              Empanelment Kit
            </Link>
            <span>&bull;</span>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">
              XML Sitemap
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}