"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  ChevronLeft,
  Download,
  Filter,
  Search,
  Shield,
  Activity,
  BarChart3,
  Zap,
  ExternalLink,
} from "lucide-react";

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
    description: "Open Access standing clearance from UP SLDC for 5,000 kVA HT Industrial (33 kV) — valid till 31 October 2025",
    status: "available",
  },
  {
    id: "rea-sep-2025",
    title: "Regional Energy Account (REA) – September 2025",
    category: "rea",
    date: "2025-10-05",
    fileType: "PDF",
    sizeKb: 890,
    description: "NLDC monthly regional energy accounting statement — inter-state transmission settlement for NR region",
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
        const whImp = Math.floor(125000 + Math.random() * 15000);
        const whExp = 0;
        const lead = Math.floor(2100 + Math.random() * 500);
        const lag = Math.floor(4500 + Math.random() * 800);
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
================================================================================

SUMMARY & COMPLIANCE DISCLOSURE:
${doc.description}

TECHNICAL PARAMETERS:
- Grid Voltage: 33 kV HT
- Contract Demand: 5,000 kVA
- Metering Spec: Class 0.2s Special Energy Meter (SEM) conforming to CEA 2006 Standards
- Settlement Window: 96 Time-Blocks (15-Minute Intervals)
- NOAR Category: Institutional Open Access Advisory

For digital signatures and verifiable hash, contact legal@topnotchenergy.in
================================================================================`;
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
    <main className="min-h-screen bg-grid-navy-950 text-white">
      {/* Header */}
      <div className="border-b border-grid-slate-800 bg-grid-navy-900/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/portal/dashboard" className="text-grid-slate-500 hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-grid-amber-400" />
              <span className="text-white font-extrabold text-sm">Documents &amp; Reports</span>
              <span className="text-[10px] font-mono bg-grid-navy-800 border border-grid-slate-700 text-grid-slate-400 px-2 py-0.5 rounded">
                DEMO
              </span>
            </div>
          </div>
          <div className="text-[11px] font-mono text-grid-slate-500">
            {DEMO_DOCUMENTS.filter((d) => d.status === "available").length} documents available
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters + Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grid-slate-500" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-grid-navy-900 border border-grid-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white font-mono placeholder-grid-slate-600 focus:outline-none focus:border-grid-emerald-500 transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-1.5 flex-wrap gap-1.5">
            <Filter className="w-4 h-4 text-grid-slate-500 flex-shrink-0" />
            {(Object.keys(CATEGORY_LABELS) as DocCategory[]).map((cat) => {
              const Icon = CATEGORY_ICONS[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg font-mono font-bold text-[11px] transition-all ${
                    activeCategory === cat
                      ? "bg-grid-amber-500 text-grid-navy-950"
                      : "bg-grid-navy-900 border border-grid-slate-700 text-grid-slate-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{cat === "all" ? "All" : CATEGORY_LABELS[cat].split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Document List */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-grid-slate-500 font-mono text-sm">
              No documents found matching your filter.
            </div>
          )}
          {filtered.map((doc) => {
            const CategoryIcon = CATEGORY_ICONS[doc.category];
            return (
              <div
                key={doc.id}
                className={`bg-grid-navy-900 border rounded-xl p-5 flex items-start justify-between gap-4 transition-colors ${
                  doc.status === "pending"
                    ? "border-grid-slate-800 opacity-50"
                    : "border-grid-slate-800 hover:border-grid-slate-700"
                }`}
              >
                <div className="flex items-start space-x-4 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-grid-navy-800 border border-grid-slate-700 flex items-center justify-center flex-shrink-0">
                    <CategoryIcon className="w-4 h-4 text-grid-amber-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white font-bold text-sm truncate">{doc.title}</h3>
                    <p className="text-grid-slate-400 font-mono text-xs mt-0.5 line-clamp-2">
                      {doc.description}
                    </p>
                    <div className="flex items-center space-x-3 mt-1.5 text-[10px] font-mono text-grid-slate-600">
                      <span>{doc.date}</span>
                      <span>•</span>
                      <span>{doc.fileType}</span>
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
                      className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-grid-navy-800 border border-grid-slate-700 hover:bg-grid-navy-700 text-grid-slate-300 hover:text-white font-mono text-xs font-bold transition-colors cursor-pointer"
                      title={`Download ${doc.title} (${doc.fileType})`}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-mono text-grid-slate-600 px-3 py-2">
                      {doc.status === "pending" ? "Pending" : "Generating..."}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact for live access */}
        <div className="mt-10 bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-white font-extrabold text-sm">Need Live Document Access?</h3>
            <p className="text-grid-slate-400 text-xs font-mono mt-1">
              This is a demo environment. Live SLDC clearance letters, REA statements, ABT meter reports, and IEX
              settlement documents are available to registered Topnotch clients through their dedicated account portal.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-grid-emerald-500 hover:bg-grid-emerald-400 text-grid-navy-950 font-bold font-mono text-xs transition-all"
          >
            <span>Contact Us</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
