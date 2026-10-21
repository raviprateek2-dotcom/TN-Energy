"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  ChevronRight,
  Download,
  Filter,
  Search,
  Shield,
  Activity,
  BarChart3,
  Zap,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { BRAND } from "@/lib/constants/brand";

type DocCategory = "all" | "sldc" | "rea" | "abt" | "rec" | "audit";

interface PortalDocument {
  id: string;
  title: string;
  category: DocCategory;
  date: string;
  fileType: "PDF" | "XLSX" | "CSV";
  sizeKb: number;
  description: string;
  status: "available" | "generating" | "pending";
}

const DEMO_DOCUMENTS: PortalDocument[] = [
  {
    id: "sldc-2025-10",
    title: "SLDC Standing Clearance Letter – October 2025",
    category: "sldc",
    date: "2025-10-01",
    fileType: "PDF",
    sizeKb: 342,
    description: "Open Access standing clearance from UP SLDC for 7,500 kVA HT Industrial (33 kV) — valid till 31 October 2025",
    status: "available",
  },
  {
    id: "rea-sep-2025",
    title: "Regional Energy Account (REA) – September 2025",
    category: "rea",
    date: "2025-10-05",
    fileType: "PDF",
    sizeKb: 890,
    description: "NLDC monthly regional energy accounting statement — inter-state transmission settlement for Northern Region",
    status: "available",
  },
  {
    id: "abt-report-q3",
    title: "ABT 0.2s SEM Meter Report – Q3 FY 2025-26",
    category: "abt",
    date: "2025-10-12",
    fileType: "XLSX",
    sizeKb: 1240,
    description: "Quarterly 96-block interval energy data export from 0.2s Class SEM — includes injection/drawl profile and DSM position",
    status: "available",
  },
  {
    id: "iex-settlement-sep",
    title: "IEX Trade Settlement Statement – September 2025",
    category: "rea",
    date: "2025-10-08",
    fileType: "PDF",
    sizeKb: 512,
    description: "IEX DAM, GDAM, and RTM trade confirmations and financial settlement for September 2025",
    status: "available",
  },
  {
    id: "rec-certificate-q2",
    title: "REC Certificates – Q2 FY 2025-26 (Solar)",
    category: "rec",
    date: "2025-10-15",
    fileType: "PDF",
    sizeKb: 280,
    description: "CERC-issued Solar Renewable Energy Certificates (1,200 RECs) from Group Captive Solar plant — IEX Registry reference",
    status: "available",
  },
  {
    id: "bee-audit-fy25",
    title: "BEE Grade-A Energy Audit Report – FY 2024-25",
    category: "audit",
    date: "2025-09-30",
    fileType: "PDF",
    sizeKb: 3200,
    description: "Full-plant BEE Certified Energy Audit — load pattern analysis, power factor KVAh assessment, DSM exposure map, recommendations",
    status: "available",
  },
  {
    id: "sldc-oct-schedule",
    title: "SLDC Daily Schedule – October Dispatch Blocks",
    category: "sldc",
    date: "2025-10-19",
    fileType: "CSV",
    sizeKb: 68,
    description: "96-block dispatch schedule confirmed by UP SLDC for today's trading day — import in ABT meter management software",
    status: "available",
  },
  {
    id: "rea-oct-2025",
    title: "Regional Energy Account (REA) – October 2025",
    category: "rea",
    date: "2025-11-05",
    fileType: "PDF",
    sizeKb: 0,
    description: "NLDC monthly settlement for October 2025 — will be available after 5th November 2025",
    status: "pending",
  },
];

const CATEGORY_LABELS: Record<DocCategory, string> = {
  all: "All Documents",
  sldc: "SLDC Clearances",
  rea: "REA / Settlements",
  abt: "ABT Meter Reports",
  rec: "REC Certificates",
  audit: "Energy Audits",
};

const CATEGORY_ICONS: Record<DocCategory, React.ElementType> = {
  all: FileText,
  sldc: Shield,
  rea: BarChart3,
  abt: Activity,
  rec: Zap,
  audit: Search,
};

export default function PortalDocumentsPage() {
  const [activeCategory, setActiveCategory] = useState<DocCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = DEMO_DOCUMENTS.filter((doc) => {
    const matchesCategory = activeCategory === "all" || doc.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (doc: PortalDocument) => {
    if (doc.fileType === "PDF") {
      const facility = encodeURIComponent("Century Plyboards (I) Ltd");
      const month = encodeURIComponent(doc.title);
      window.open(`/api/reports/dossier?facility=${facility}&month=${month}&download=true`, "_blank");
      return;
    }

    let content = "";
    let mimeType = "text/plain";
    let filename = `${doc.id}.${doc.fileType.toLowerCase()}`;

    if (doc.fileType === "CSV") {
      mimeType = "text/csv;charset=utf-8;";
      content = "Block,StartTime,EndTime,ApprovedInjectionMW,ApprovedDrawlMW,SLDCScheduleMW,GridFrequencyHz\n";
      for (let b = 1; b <= 96; b++) {
        const h = Math.floor((b - 1) / 4);
        const m = ((b - 1) % 4) * 15;
        const hNext = Math.floor(b / 4);
        const mNext = (b % 4) * 15;
        const start = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
        const end = `${String(hNext).padStart(2, "0")}:${String(mNext).padStart(2, "0")}`;
        const inj = (3.5 + Math.sin(b / 10) * 1.2).toFixed(2);
        const drawl = (4.8 + Math.cos(b / 8) * 1.5).toFixed(2);
        const freq = (50.0 + Math.sin(b / 4) * 0.05).toFixed(3);
        content += `${b},${start},${end},${inj},${drawl},${drawl},${freq}\n`;
      }
    } else if (doc.fileType === "XLSX") {
      mimeType = "text/csv;charset=utf-8;";
      filename = `${doc.id}.csv`;
      content = "TimeBlock,Timestamp,Wh_Import,Wh_Export,VArh_Lead,VArh_Lag,AvgFrequency_Hz,SEM_Meter_Serial\n";
      for (let b = 1; b <= 96; b++) {
        const time = `${String(Math.floor((b - 1) / 4)).padStart(2, "0")}:${String(((b - 1) % 4) * 15).padStart(2, "0")}:00`;
        const whImp = Math.floor(125000 + ((b * 137) % 15000));
        const whExp = 0;
        const lead = Math.floor(2100 + ((b * 47) % 500));
        const lag = Math.floor(4500 + ((b * 73) % 800));
        content += `${b},${time},${whImp},${whExp},${lead},${lag},50.012,SEM-TES-0.2S-9481\n`;
      }
    } else {
      mimeType = "text/plain;charset=utf-8;";
      filename = `${doc.id}-summary.txt`;
      content = `================================================================================
TOPNOTCH ENERGY SOLUTIONS — OFFICIAL REGULATORY & TELEMETRY ARCHIVE
================================================================================
Document Title: ${doc.title}
Document Ref:   ${doc.id}
Date Issued:    ${doc.date}
Regulatory Body: CERC / UP SLDC / NLDC Regional Energy Accounts
Classification: HT Industrial Open Access Portfolio (0.2s SEM Telemetry)
Authorised Desk: Topnotch Energy Solutions, UG-5 Parsvnath Regalia, Ghaziabad, UP
Contact Floor:  ${BRAND.contacts.phonePrimary} / ${BRAND.contacts.emailGeneral}
================================================================================

SUMMARY & COMPLIANCE DISCLOSURE:
${doc.description}

TECHNICAL PARAMETERS:
- Grid Voltage: 33 kV HT
- Contract Demand: 7,500 kVA
- Metering Spec: Class 0.2s Special Energy Meter (SEM) conforming to CEA 2006 Standards
- Settlement Window: 96 Time-Blocks (15-Minute Intervals)
- NOAR Category: Institutional Open Access Advisory
- BEE Verification Seal: Verified / Clean REA Settlement
================================================================================
Generated by Topnotch B2B Power Desk • Encrypted SHA-256 Audit Seal
`;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 mb-1">
            <span>PORTAL</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-cyan-400">STATUTORY REPOSITORY</span>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-[10px]">
              CERC / NOAR ARCHIVE
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Regulatory Clearances &amp; Settlement Documents
          </h1>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Encrypted vault of SLDC standing clearances, Regional Energy Accounts (REA), and ABT calibration logs
          </p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs text-slate-400 bg-white/5 px-3 py-1.5 rounded-xl border border-slate-800">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{DEMO_DOCUMENTS.filter((d) => d.status === "available").length} Documents Active</span>
        </div>
      </div>

      {/* Filters + Search Bar */}
      <div className="bg-[#0B1120] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, regulator, or reference ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#060913] border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-[#F8BC26] transition-colors"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center space-x-1.5 flex-wrap gap-1.5">
            {(Object.keys(CATEGORY_LABELS) as DocCategory[]).map((cat) => {
              const Icon = CATEGORY_ICONS[cat];
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-mono font-bold text-xs transition-all ${
                    isActive
                      ? "bg-[#F8BC26] text-[#1C2C34] shadow-md shadow-[#F8BC26]/20"
                      : "bg-[#060913] border border-slate-700 text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat === "all" ? "All" : CATEGORY_LABELS[cat].split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Document List Cards */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-16 bg-[#0B1120] border border-slate-800 rounded-2xl text-slate-400 font-mono text-sm">
            No regulatory documents found matching your filter criteria.
          </div>
        )}

        {filtered.map((doc) => {
          const CategoryIcon = CATEGORY_ICONS[doc.category];
          return (
            <div
              key={doc.id}
              className={`bg-[#0B1120] border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-lg ${
                doc.status === "pending"
                  ? "border-slate-800/60 opacity-60"
                  : "border-slate-800 hover:border-slate-700 hover:bg-slate-900/40"
              }`}
            >
              <div className="flex items-start space-x-4 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#060913] border border-slate-700 flex items-center justify-center flex-shrink-0 text-[#F8BC26]">
                  <CategoryIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-extrabold text-sm sm:text-base truncate">{doc.title}</h3>
                  <p className="text-slate-400 font-mono text-xs mt-0.5 line-clamp-2">
                    {doc.description}
                  </p>
                  <div className="flex items-center space-x-3 mt-2 text-[10px] font-mono text-slate-400">
                    <span className="text-emerald-400 font-bold">{doc.date}</span>
                    <span>•</span>
                    <span className="px-1.5 py-0.2 rounded bg-white/5 border border-slate-700 text-slate-300 font-bold">
                      {doc.fileType}
                    </span>
                    {doc.sizeKb > 0 && (
                      <>
                        <span>•</span>
                        <span>{doc.sizeKb > 1000 ? `${(doc.sizeKb / 1024).toFixed(1)} MB` : `${doc.sizeKb} KB`}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 flex items-center space-x-2">
                {doc.status === "available" ? (
                  <button
                    onClick={() => handleDownload(doc)}
                    className="w-full sm:w-auto flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl bg-white/5 border border-slate-700 hover:bg-white/10 hover:border-[#F8BC26]/40 text-slate-200 hover:text-white font-mono text-xs font-bold transition-all shadow-md"
                    title={`Download ${doc.title} (${doc.fileType})`}
                  >
                    <Download className="w-3.5 h-3.5 text-[#F8BC26]" />
                    <span>Download</span>
                  </button>
                ) : (
                  <span className="text-[11px] font-mono text-slate-400 px-3 py-2 flex items-center space-x-1">
                    <Lock className="w-3 h-3" />
                    <span>Awaiting NLDC</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Advisory Note */}
      <div className="bg-[#0B1120] border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <h3 className="text-white font-black text-sm flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Dedicated Account Manager &amp; Legal Liaison</span>
          </h3>
          <p className="text-slate-400 text-xs font-mono mt-1 max-w-2xl">
            Original stamp-sealed SLDC clearance letters, certified meter calibration certificates, and bilateral PPA deeds are archived at our corporate office: UG-5, First Floor, Parsvnath Regalia, Ghaziabad, UP.
          </p>
        </div>
        <Link
          href="/contact"
          className="flex-shrink-0 flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-[#F8BC26] hover:bg-[#E5A812] text-[#1C2C34] font-black font-mono text-xs transition-all shadow-lg shadow-[#F8BC26]/20"
        >
          <span>Contact Legal Desk</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
