import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageDivider } from "@/components/ui/PageDivider";
import { SplitImageMergeSection } from "@/components/ui/SplitImageMergeSection";
import {
  Shield,
  FileText,
  ExternalLink,
  BookOpen,
  Scale,
  Zap,
  Globe2,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Statutory Compliance | Topnotch Energy Solutions – CERC, SERC, CEA Regulations",
  description:
    "Comprehensive guide to Indian electricity regulations governing Open Access, Power Trading, Renewable Energy procurement, and ABT metering. CERC (Power Market) Regulations 2021, Electricity Act 2003, Ministry of Power Green Energy Open Access Rules 2022.",
};

interface ComplianceDoc {
  category: string;
  icon: React.ElementType;
  badgeColor: string;
  regulations: {
    title: string;
    authority: string;
    year: string;
    description: string;
    keyProvisions: string[];
    relevance: string;
    url?: string;
  }[];
}

const COMPLIANCE_DOCS: ComplianceDoc[] = [
  {
    category: "Power Market & Exchange Trading",
    icon: Zap,
    badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
    regulations: [
      {
        title: "CERC (Power Market) Regulations, 2021",
        authority: "Central Electricity Regulatory Commission",
        year: "2021",
        description:
          "The foundational regulation governing power exchanges (IEX, PXIL, HPX), market segment definitions (DAM, GDAM, RTM, TAM, GTAM), trading licenses, and power exchange governance in India.",
        keyProvisions: [
          "Regulation 5 & 6: Market contracts – DAM, RTM, GDAM, GTAM, TAM, Ancillary Services",
          "96 time-block (15-minute) settlement framework under ABT",
          "Market Coupling regulations for IEX/PXIL price discovery",
          "₹10,000/MWh (₹10/kWh) statutory Price Cap on all market segments",
          "Trading license conditions for Category-IV advisors",
        ],
        relevance: "Governs all IEX/PXIL/HPX bidding operations conducted by Topnotch",
      },
      {
        title: "CERC (Open Access in Inter-State Transmission) Regulations, 2008 (as amended)",
        authority: "Central Electricity Regulatory Commission",
        year: "2008 / Amended 2020, 2022",
        description:
          "Regulates inter-state Open Access: GNA (General Network Access), T-GNA (Temporary General Network Access), transmission corridor allocation, scheduling, and curtailment procedures.",
        keyProvisions: [
          "GNA/T-GNA application procedures at RLDC",
          "Scheduling and rescheduling protocols (72-hour, 24-hour, day-ahead)",
          "Intra-day curtailment and re-scheduling hierarchy",
          "CTU transmission charges and pooled loss factors (3.2%–3.6%)",
          "Congestion management through constrained dispatch",
        ],
        relevance: "Required for all inter-state power exchange and bilateral transactions",
      },
      {
        title: "CERC (Deviation Settlement Mechanism) Regulations, 2022",
        authority: "Central Electricity Regulatory Commission",
        year: "2022",
        description:
          "The DSM framework penalises generators and consumers for unscheduled interchange (UI). Consumers deviating from schedule face penal charges linked to grid frequency.",
        keyProvisions: [
          "DSM rate slabs: ₹0/kWh (50.10 Hz+) to ₹8/kWh (49.50 Hz–) for under-drawl",
          "Over-drawl penal charges at grid frequency below 49.70 Hz",
          "Monthly REA (Regional Energy Accounting) settlement cycle",
          "ABT 0.2s Class Special Energy Meter mandatory for all grid-connected entities ≥1 MW",
        ],
        relevance: "Critical for ABT metering clients; Topnotch DSM monitoring minimises penalty exposure",
      },
    ],
  },
  {
    category: "Open Access & Captive Generation",
    icon: Globe2,
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    regulations: [
      {
        title: "Electricity Act, 2003 – Sections 38–42 (Open Access Rights)",
        authority: "Parliament of India / Ministry of Law & Justice",
        year: "2003",
        description:
          "The primary legislation establishing the legal right of open access for generation, transmission, and distribution. Section 42(2) mandates SERCs to specify surcharges (CSS/AS) for wheeling.",
        keyProvisions: [
          "Section 9: Captive generation rights – 26% equity + 51% consumption rule",
          "Section 38: National grid transmission open access",
          "Section 39: State transmission utility open access obligations",
          "Section 42(2): Cross-Subsidy Surcharge (CSS) fixation by SERC",
          "Section 42(4): Additional Surcharge (AS) for distribution system",
        ],
        relevance: "The foundational statute for all Open Access and Group Captive engagements",
      },
      {
        title: "Ministry of Power – Green Energy Open Access Rules, 2022",
        authority: "Ministry of Power, Government of India",
        year: "2022",
        description:
          "Landmark rules reducing Green Energy Open Access threshold from 1 MW to 100 kW, simplifying CSS exemptions for GDAM/GTAM purchases, and mandating automatic approvals within 15 days for green energy consumers.",
        keyProvisions: [
          "Green Energy Open Access threshold: 100 kW (from earlier 1 MW)",
          "No Cross-Subsidy Surcharge (CSS) on approved Green Open Access consumers",
          "15-day automatic approval mandate from SLDC/DISCOM",
          "Banking of green energy units: 30 days (monthly settlement)",
          "Grievance redressal: SERC nodal officer within 30 days",
        ],
        relevance: "Enables Topnotch to offer GDAM rooftop advisory for clients as small as 100 kW",
      },
      {
        title: "Electricity Rules, 2005 – Rule 3 (Captive Generating Plant)",
        authority: "Ministry of Power, Government of India",
        year: "2005",
        description:
          "Defines the 26:51 qualifying criteria for captive status. A generating plant is 'captive' if at least 26% equity is held by captive users and at least 51% of generation is consumed by them.",
        keyProvisions: [
          "Minimum 26% ownership by the captive user group in the generating SPV",
          "Minimum 51% consumption by the captive user group annually",
          "Captive status certificates reviewed annually by State SERC/Nodal Agency",
          "Full exemption from CSS and AS upon captive certification",
          "Group Captive consumer-generator proportional allocation framework",
        ],
        relevance: "Legal backbone of all Group Captive Solar SPV structures executed by Topnotch",
      },
    ],
  },
  {
    category: "Metering & Telemetry Standards",
    icon: Shield,
    badgeColor: "bg-purple-50 text-purple-800 border-purple-200",
    regulations: [
      {
        title: "CEA (Installation and Operation of Meters) Amendment Regulations, 2019",
        authority: "Central Electricity Authority",
        year: "2019",
        description:
          "Mandates 0.2s accuracy class Special Energy Meters (SEMs) for all inter-state grid-connected entities ≥1 MW, with real-time 15-minute telemetry integration to SLDC/RLDC SCADA systems.",
        keyProvisions: [
          "0.2s accuracy class SEM mandatory for generators, IPPs, and large consumers ≥1 MW",
          "15-minute interval energy data telemetry to SLDC control room",
          "CT/PT calibration within ±0.2% accuracy (IEC 62052 / IEC 62053 standards)",
          "AMR (Automatic Meter Reading) integration with SLDC scheduling portal",
          "Annual calibration and sealing requirements by accredited NABL laboratory",
        ],
        relevance: "Core to Topnotch's ABT Metering & Telemetry Infrastructure vertical",
      },
      {
        title: "CERC (Connectivity and General Network Access) Regulations, 2022",
        authority: "Central Electricity Regulatory Commission",
        year: "2022",
        description:
          "Introduces the General Network Access (GNA) framework replacing long-term access. Provides streamlined connectivity for new industrial loads, solar generators, and BESS projects seeking inter-state transmission.",
        keyProvisions: [
          "GNA replaces Long-Term Access (LTA) and Medium-Term Access (MTOA)",
          "Temporary GNA (T-GNA) for short-term bi-lateral transactions on ISTS",
          "Connectivity conditions for new solar/wind plants at 220 kV / 400 kV grid",
          "Substation pooling for Group Captive solar-wind hybrid projects",
          "Curtailment priority: Must-Run RE plants (solar/wind) protected from dispatch curtailment",
        ],
        relevance: "Governs transmission access for all inter-state Group Captive projects",
      },
    ],
  },
  {
    category: "Renewable Energy & REC Framework",
    icon: BookOpen,
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    regulations: [
      {
        title: "CERC (Terms and Conditions for Renewable Energy Certificates) Regulations, 2022",
        authority: "Central Electricity Regulatory Commission",
        year: "2022",
        description:
          "Updated REC framework establishing solar and non-solar REC floor and forbearance prices, issuance methodology on power exchanges, and RPO compliance tracking through National Registry.",
        keyProvisions: [
          "REC Floor Price: ₹1,000/certificate (non-solar); Forbearance: ₹2,000/certificate",
          "Solar REC Floor: ₹1,000/cert; Forbearance: ₹1,500/cert (post-2022 revision)",
          "Monthly REC trading sessions on IEX and PXIL",
          "National REC Registry maintained by POSOCO (now NLDC/CEL)",
          "RPO compliance tracking: State-wise renewable purchase obligations",
        ],
        relevance: "Governs all REC trading activities and green certification for captive consumers",
      },
      {
        title: "BEE – Perform, Achieve and Trade (PAT) Scheme",
        authority: "Bureau of Energy Efficiency, Ministry of Power",
        year: "2012 (PAT Cycle I–VII ongoing)",
        description:
          "Energy efficiency trading scheme for Designated Consumers (DCs) in energy-intensive industries. DCs who exceed energy savings targets earn Energy Savings Certificates (ESCerts) tradeable on power exchanges.",
        keyProvisions: [
          "Designated Consumer (DC) baseline Specific Energy Consumption (SEC) assessment",
          "ESCerts issued for energy savings above assigned targets (1 ESCert = 1 MTOE saved)",
          "ESCert trading on IEX: Floor ₹1,000/MTOE; Recent clearing ~₹1,840/MTOE",
          "Mandatory BEE Grade-A Energy Audit for DC compliance reporting",
          "PAT Cycle-VII: April 2023 – March 2026, 1,169 DCs enrolled",
        ],
        relevance: "Topnotch BEE Certified Auditors conduct PAT-grade energy audits for DC clients",
      },
    ],
  },
  {
    category: "Tariff & Distribution Regulations",
    icon: Scale,
    badgeColor: "bg-slate-100 text-slate-800 border-slate-300",
    regulations: [
      {
        title: "UPERC Tariff Order (Uttar Pradesh Electricity Regulatory Commission)",
        authority: "Uttar Pradesh Electricity Regulatory Commission",
        year: "Annual – FY 2024-25 effective",
        description:
          "Annual tariff orders issued by UP SERC governing industrial, commercial, and domestic electricity rates for PVVNL, PUVVNL, MVVNL, PuVVNL, and KESCO distribution companies.",
        keyProvisions: [
          "HT Industrial (11 kV): Fixed Charge ₹200/kVA/month + Energy Charge ₹6.80/kWh",
          "EHT (33 kV): Fixed Charge ₹175/kVA/month + Energy Charge ₹6.40/kWh",
          "Fuel Surcharge: Quarterly revision by UPERC",
          "Cross-Subsidy Surcharge (CSS): As notified for Open Access consumers",
          "Additional Surcharge (AS): Waived for Green Energy Open Access ≥100 kW",
        ],
        relevance: "UP being HQ state — all client tariff benchmarking is against UPERC orders",
      },
    ],
  },
];

export default function StatutoryCompliancePage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* Hero with Cinematic Photographic Backdrop */}
      <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden bg-[#0A0F1D] py-20 px-4 sm:px-6 lg:px-8 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
            alt="Indian Electricity Regulatory Framework and Statutory Architecture"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1D]/95 via-[#0A0F1D]/85 to-[#0A0F1D]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>Statutory Compliance Architecture</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Indian Electricity{" "}
              <span className="text-[#F8BC26]">
                Regulatory Framework
              </span>
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
              Comprehensive reference to CERC, SERC, CEA, BEE, and Ministry of Power regulations governing power
              trading, Open Access, Group Captive generation, ABT metering, REC trading, and energy efficiency
              compliance for Indian industrial consumers.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-300">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>Audited for FY 2024–25</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>Gazette Notifications Verified</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>CERC / SERC / CEA Harmonized</span>
              </span>
            </div>
          </div>
        </div>

        {/* Waaree Fluid Wave Divider: Dark Hero into Ghost Slate Navigation */}
        <div className="absolute bottom-0 inset-x-0 pointer-events-none">
          <PageDivider type="layered-wave" fillColor="#F9FAFB" position="bottom" height={55} />
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-[#F9FAFB] sticky top-0 z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {COMPLIANCE_DOCS.map((cat) => {
              const Icon = cat.icon;
              return (
                <a
                  key={cat.category}
                  href={`#${cat.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 text-xs font-mono font-bold transition-all shadow-2xs"
                >
                  <Icon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{cat.category}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Regulation Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {COMPLIANCE_DOCS.map((cat) => {
          const Icon = cat.icon;
          const anchorId = cat.category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          return (
            <section key={cat.category} id={anchorId} className="scroll-mt-24">
              <div className="flex items-center space-x-3 mb-8 border-b border-slate-200 pb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#1C2C34]">
                  <Icon className="w-5 h-5 text-emerald-700" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#1C2C34]">{cat.category}</h2>
              </div>

              <div className="space-y-6">
                {cat.regulations.map((reg) => (
                  <div
                    key={reg.title}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Header */}
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-1.5">
                            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${cat.badgeColor}`}>
                              {reg.authority}
                            </span>
                            <span className="text-slate-500 text-xs font-mono">• {reg.year}</span>
                          </div>
                          <h3 className="text-base sm:text-lg font-black text-[#1C2C34]">{reg.title}</h3>
                        </div>
                        {reg.url && (
                          <a
                            href={reg.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-slate-500 hover:text-emerald-700 text-xs font-mono transition-colors flex-shrink-0"
                          >
                            <span>Official Source</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-3">{reg.description}</p>
                    </div>

                    {/* Body */}
                    <div className="p-6 grid sm:grid-cols-2 gap-6">
                      <div>
                        <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center space-x-1.5">
                          <FileText className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Key Provisions</span>
                        </div>
                        <div className="space-y-2">
                          {reg.keyProvisions.map((provision) => (
                            <div key={provision} className="flex items-start space-x-2 text-xs text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                              <span>{provision}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center space-x-1.5">
                          <Shield className="w-3.5 h-3.5 text-amber-600" />
                          <span>Topnotch Relevance</span>
                        </div>
                        <div className="text-xs leading-relaxed font-mono p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800">
                          {reg.relevance}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* =========================================================================
          WAAREE-GRADE EXECUTIVE STATUTORY CONSULTATION SECTION (HALF-MERGING IMAGE ON WHITE)
         ========================================================================= */}
      <SplitImageMergeSection
        badgeText="Sovereign Regulatory Advisory"
        title={
          <>
            Need Formal Statutory <span className="text-[#D97706]">Regulatory Advisory</span> for Your Plant?
          </>
        }
        description="Our in-house CERC Category-IV advisors and BEE Accredited Energy Auditors formulate binding regulatory risk dossiers, SLDC NOC clearance roadmaps, and Electricity Act Section 42 Group Captive compliance verifications for high-tension manufacturing plants."
        bullets={[
          "Electricity Act 2003 Rule 3 Statutory Audits",
          "Inter-State GNA / T-GNA RLDC Filings",
          "State DISCOM Cross-Subsidy Surcharge Exemptions",
          "15-Minute ABT Metering & DSM Penalty Audits",
        ]}
        imageUrl="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1600&q=80"
        imageAlt="High-voltage power transmission lines and grid substation infrastructure"
        primaryCta={{
          label: "Consult Regulatory Advisory Team",
          href: "/contact?intent=statutory-advisory",
        }}
        secondaryCta={{
          label: "Download Empanelment Dossier",
          href: "/procurement-dossier",
        }}
        stats={[
          { value: "100%", label: "Legal Exemption", sublabel: "CSS & AS under Sec 42" },
          { value: "14 States", label: "Pan-India Standing", sublabel: "Active SLDC Clearances" },
        ]}
      />

      {/* Legal Disclaimer */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 border-t border-slate-200 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-[#1C2C34] font-black text-base mb-3 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-emerald-700" />
              <span>Legal Disclaimer &amp; Regulatory Jurisdiction</span>
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-mono">
              The regulatory summaries on this page are compiled for informational purposes by Topnotch Energy Solutions
              and do not constitute legal advice. Indian electricity regulations, CERC orders, and SERC tariff structures
              are subject to periodic amendments. Clients should obtain jurisdiction-specific legal opinions before
              implementing Open Access or captive generation transactions. Topnotch Energy Solutions holds NOAR
              Institutional Consultant registration and CERC Category-IV advisory accreditation but operates independently
              from any statutory commission.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-xl bg-[#F8BC26] hover:bg-[#e6ab1e] text-[#1C2C34] font-bold text-xs transition-all shadow-sm"
              >
                Consult Our Regulatory Team
              </Link>
              <a
                href="https://www.cercind.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-mono text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-2xs"
              >
                <span>CERC Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
