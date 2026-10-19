import React from "react";
import Link from "next/link";
import { Zap, Phone, Mail, MapPin, Shield, ExternalLink, ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/constants/brand";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-grid-navy-950 border-t border-grid-slate-800 text-grid-slate-400 font-sans text-xs pb-20 md:pb-8">
      {/* Upper Pre-Footer CTA */}
      <div className="border-b border-grid-slate-800/80 bg-gradient-to-r from-grid-navy-950 via-grid-navy-900 to-grid-navy-950 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-grid-emerald-400">
              Transform Your Factory Power Bill
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Ready to hedge against peak Discom tariffs and secure 18%–42% landed power savings?
            </h2>
            <p className="text-grid-slate-300 text-xs mt-2 font-mono">
              Book a confidential tariff audit with our BEE Certified Energy Auditors and CERC power trading team in Ghaziabad.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <Link
              href="/tools/open-access-calculator"
              className="px-5 py-3 rounded-xl bg-grid-emerald-500 hover:bg-grid-emerald-400 text-grid-navy-950 font-bold font-mono text-xs transition-all shadow-lg shadow-grid-emerald-500/20 flex items-center space-x-2"
            >
              <span>Instant Plant ROI Calculator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${BRAND.contacts.phonePrimary}`}
              className="px-4 py-3 rounded-xl border border-grid-slate-700 bg-grid-navy-900 hover:bg-grid-navy-800 text-white font-mono text-xs font-bold transition-colors flex items-center space-x-2"
            >
              <Phone className="w-4 h-4 text-grid-cyan-400" />
              <span>Call 24x7 Bidding Desk</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1 & 2: Brand & Headquarters */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-grid-emerald-500 to-grid-cyan-600 flex items-center justify-center p-0.5 shadow-md">
                <div className="w-full h-full bg-grid-navy-950 rounded-[7px] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-grid-emerald-400" />
                </div>
              </div>
              <span className="font-extrabold text-lg text-white font-sans tracking-tight">
                Topnotch <span className="text-grid-emerald-400">Energy Solutions</span>
              </span>
            </div>

            <p className="text-grid-slate-300 text-xs leading-relaxed max-w-sm">
              Enterprise B2B Indian power trading advisory, Group Captive renewable procurement, and turnkey Open Access execution for commercial & heavy industrial consumers across 14 states.
            </p>

            <div className="space-y-2 text-xs font-mono text-grid-slate-400 pt-2">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-grid-cyan-400 flex-shrink-0 mt-0.5" />
                <span>{BRAND.headquarters.fullAddress}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-grid-emerald-400 flex-shrink-0" />
                <a href={`tel:${BRAND.contacts.phonePrimary}`} className="hover:text-white transition-colors">
                  {BRAND.contacts.phonePrimary} / {BRAND.contacts.phoneSecondary}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-grid-amber-400 flex-shrink-0" />
                <a href={`mailto:${BRAND.contacts.emailGeneral}`} className="hover:text-white transition-colors">
                  {BRAND.contacts.emailGeneral}
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Enterprise Solutions */}
          <div>
            <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider mb-3">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link href="/solutions/power-trading-bilateral-contracts" className="hover:text-white transition-colors">
                  Power Trading & DAM/RTM
                </Link>
              </li>
              <li>
                <Link href="/solutions/open-access-execution-regulatory" className="hover:text-white transition-colors">
                  Group Captive (26:51) Open Access
                </Link>
              </li>
              <li>
                <Link href="/solutions/renewable-energy-sustainability" className="hover:text-white transition-colors">
                  Onsite Rooftop Solar & BESS
                </Link>
              </li>
              <li>
                <Link href="/solutions/abt-metering-telemetry-infrastructure" className="hover:text-white transition-colors">
                  ABT 0.2s SEM Metering Bay
                </Link>
              </li>
              <li>
                <Link href="/solutions/energy-cost-optimization-bill-audits" className="hover:text-white transition-colors">
                  BEE Grade-A Energy Audits
                </Link>
              </li>
              <li>
                <Link href="/solutions/power-trading-bilateral-contracts#banking" className="hover:text-white transition-colors">
                  Inter/Intra-State Banking
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Market & Calculators */}
          <div>
            <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider mb-3">
              Market & Tools
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link href="/market-intelligence" className="hover:text-white transition-colors">
                  Live 96-Block IEX Terminal
                </Link>
              </li>
              <li>
                <Link href="/tools/open-access-calculator" className="hover:text-white transition-colors">
                  Solar vs. Open Access ROI Calc
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-white transition-colors">
                  Client Case Studies
                </Link>
              </li>
              <li>
                <Link href="/statutory-compliance" className="hover:text-white transition-colors">
                  CERC & SERC Regulations
                </Link>
              </li>
              <li>
                <Link href="/portal/dashboard" className="hover:text-white transition-colors flex items-center">
                  <span>Client Trading Portal</span>
                  <ExternalLink className="w-3 h-3 ml-1 text-grid-cyan-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Regulatory Compliance */}
          <div>
            <h4 className="text-white font-mono text-xs font-bold uppercase tracking-wider mb-3">
              Accreditations
            </h4>
            <div className="space-y-2 text-xs text-grid-slate-400">
              <div className="flex items-center space-x-1.5 text-grid-emerald-400 font-mono text-[11px]">
                <Shield className="w-3.5 h-3.5" />
                <span>NOAR Consultant</span>
              </div>
              <p className="text-[11px] text-grid-slate-400">
                Registered Institutional Consultant on National Open Access Registry.
              </p>
              <div className="pt-2 text-[11px] font-mono text-grid-slate-400 border-t border-grid-slate-800">
                <div>• CERC Category-IV Advisory</div>
                <div>• BEE Certified Energy Auditors</div>
                <div>• CEA 0.2s SEM Infrastructure</div>
                <div>• QCA for Pooling Substations</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Copyright & Statutory Disclaimer */}
        <div className="mt-12 pt-6 border-t border-grid-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-grid-slate-500">
          <div>
            © {CURRENT_YEAR} {BRAND.legalName}. All rights reserved.
          </div>

          <div className="text-center md:text-right max-w-xl text-[10px] leading-normal text-grid-slate-600">
            Disclaimer: All power market clearing prices (DAM, GDAM, RTM, REC) are published under the CERC (Power Market) Regulations 2021. Open Access savings calculations depend on individual Discom tariff schedules, Cross-Subsidy Surcharges (CSS), and Additional Surcharges (AS).
          </div>
        </div>
      </div>
    </footer>
  );
}
