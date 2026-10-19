"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Zap,
  TrendingUp,
  Layers,
  Cpu,
  Calculator,
  Shield,
  FileText,
  Phone,
  ArrowRight,
  X,
  Building2,
  Clock,
  Sparkles,
  Command,
} from "lucide-react";
import { INDIAN_STATES_OA_DATA } from "@/lib/constants/indian-states-oa-data";
import { BRAND } from "@/lib/constants/brand";

interface SearchItem {
  id: string;
  category: "States & DISCOMs" | "Solutions" | "Case Studies" | "Regulations" | "Tools & Actions";
  title: string;
  subtitle: string;
  badge?: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  keywords: string[];
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut listener: Cmd+K / Ctrl+K or '/'
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Static indexed catalog
  const catalog: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [];

    // 1. Quick Tools & Desk Actions
    items.push(
      {
        id: "tool-calc",
        category: "Tools & Actions",
        title: "Open Access & Rooftop Solar ROI Calculator",
        subtitle: "Multi-mode financial simulator: CAPEX 40% AD, Group Captive, Landed Tariff Waterfall",
        badge: "Interactive Tool",
        href: "/tools/open-access-calculator",
        icon: Calculator,
        keywords: ["calculator", "roi", "savings", "open access", "solar", "rooftop", "capex", "opex", "landed cost"],
      },
      {
        id: "tool-bill-audit",
        category: "Tools & Actions",
        title: "Industrial Electricity Bill Audit Dropzone",
        subtitle: "Diagnose power factor leakage, ToD peak surcharges, and contract demand headroom",
        badge: "Diagnostic",
        href: "/tools/open-access-calculator#bill-audit",
        icon: FileText,
        keywords: ["bill audit", "dropzone", "upload bill", "kvah", "power factor", "tod", "fuel surcharge"],
      },
      {
        id: "tool-iex-terminal",
        category: "Tools & Actions",
        title: "Live 96-Block IEX Market Intelligence Terminal",
        subtitle: "Touch-scrubber 15-minute DAM, GDAM, and RTM clearing price charts",
        badge: "Live Telemetry",
        href: "/market-intelligence",
        icon: TrendingUp,
        keywords: ["market intelligence", "iex", "dam", "gdam", "rtm", "96 blocks", "mcp", "clearing rate"],
      },
      {
        id: "action-desk-call",
        category: "Tools & Actions",
        title: `Direct Line: 24×7 Power Trading Desk (${BRAND.contacts.phonePrimary})`,
        subtitle: "Immediate consultation with CERC Category-IV certified power traders",
        badge: "24x7 SLA",
        href: `tel:${BRAND.contacts.phonePrimary}`,
        icon: Phone,
        keywords: ["phone", "desk", "call", "contact", "support", "trader", "emergency", "bidding desk"],
      },
      {
        id: "portal-savings",
        category: "Tools & Actions",
        title: "Client Portal: Industrial Savings Dashboard",
        subtitle: "12-month historical reconciliation, audited monthly landed tariffs vs DISCOM baseline",
        badge: "Portal App",
        href: "/portal/savings-dashboard",
        icon: TrendingUp,
        keywords: ["portal", "savings dashboard", "reconciliation", "historical", "cfo", "bill savings"],
      },
      {
        id: "portal-telemetry",
        category: "Tools & Actions",
        title: "Client Portal: ABT 0.2s SEM Telemetry Console",
        subtitle: "Live 96-block demand curve, frequency monitor (Hz), reactive power factor (PF)",
        badge: "Portal App",
        href: "/portal/telemetry",
        icon: Cpu,
        keywords: ["portal", "telemetry", "sem", "abt", "meter", "frequency", "scada", "power factor"],
      }
    );

    // 2. Solutions
    items.push(
      {
        id: "sol-power-trading",
        category: "Solutions",
        title: "Power Trading & Bilateral Bourses (DAM, GDAM, RTM)",
        subtitle: "Automated 96-block bidding, portfolio clearing, and Intraday scheduling on IEX, PXIL, HPX",
        badge: "Core Service",
        href: "/solutions/power-trading-bilateral-contracts",
        icon: TrendingUp,
        keywords: ["trading", "dam", "gdam", "rtm", "tam", "gtam", "iex", "pxil", "hpx", "bilateral"],
      },
      {
        id: "sol-open-access",
        category: "Solutions",
        title: "End-to-End Open Access Execution & Regulatory Clearances",
        subtitle: "Group Captive 26:51 SPV structuring (0 CSS, 0 AS), SLDC/RLDC standing clearance, GNA/T-GNA",
        badge: "Advisory",
        href: "/solutions/open-access-execution-regulatory",
        icon: Layers,
        keywords: ["open access", "group captive", "spv", "rule 3", "sldc", "rldc", "gna", "t-gna", "noar", "css", "as"],
      },
      {
        id: "sol-abt-metering",
        category: "Solutions",
        title: "ABT 0.2s SEM & Telemetry Infrastructure",
        subtitle: "CEA-compliant 0.2s Class meters, optical AMR, NABL calibration, and real-time SLDC SCADA feeds",
        badge: "Grid Engineering",
        href: "/solutions/abt-metering-telemetry-infrastructure",
        icon: Cpu,
        keywords: ["abt", "meter", "sem", "0.2s", "cea", "amr", "ct pt", "sldc scada", "dsm"],
      },
      {
        id: "sol-energy-audits",
        category: "Solutions",
        title: "Energy Cost Optimization & BEE Certified Audits",
        subtitle: "Power factor 0.999 tuning, Contract Demand rationalization, ToD load shifting, DSM risk mitigation",
        badge: "BEE Grade-A",
        href: "/solutions/energy-cost-optimization-bill-audits",
        icon: Calculator,
        keywords: ["energy audit", "bee", "power factor", "kvah", "contract demand", "tod", "load shifting", "dsm"],
      },
      {
        id: "sol-renewables",
        category: "Solutions",
        title: "Renewable Energy, Decarbonization & BESS",
        subtitle: "Industrial PEB rooftop solar, offsite wind-solar hybrids, 4-hour LFP BESS peak shaving",
        badge: "Net Zero",
        href: "/solutions/renewable-energy-sustainability",
        icon: Zap,
        keywords: ["solar", "rooftop", "bess", "battery", "storage", "green open access", "rec", "escerts", "net zero"],
      }
    );

    // 3. Indian Industrial States
    Object.entries(INDIAN_STATES_OA_DATA).forEach(([stateKey, data]) => {
      items.push({
        id: `state-${stateKey}`,
        category: "States & DISCOMs",
        title: `${data.stateName} Open Access Framework`,
        subtitle: `Tariff: ₹${data.industrialGridTariffPerKwh}/kWh • CSS: ₹${data.crossSubsidySurchargePerKwh}/kWh • DISCOMs: ${data.discomNames.join(", ")}`,
        badge: data.sldcName,
        href: `/market-intelligence#state-${stateKey}`,
        icon: Building2,
        keywords: [
          data.stateName.toLowerCase(),
          stateKey,
          ...data.discomNames.map((d) => d.toLowerCase()),
          data.sldcName.toLowerCase(),
          "tariff",
          "wheeling",
          "css",
        ],
      });
    });

    // 4. Case Studies
    items.push(
      {
        id: "cs-fmcg",
        category: "Case Studies",
        title: "DS Group FMCG Manufacturing Hub (6.8 MW)",
        subtitle: "Greater Noida, UP — ₹10.60 Cr/yr saved via Group Captive Solar + IEX GDAM + 0.2s ABT Metering",
        badge: "FMCG / Food",
        href: "/case-studies#ds-group",
        icon: Zap,
        keywords: ["ds group", "fmcg", "varun beverages", "confectionery", "up", "pvvnl", "group captive"],
      },
      {
        id: "cs-steel",
        category: "Case Studies",
        title: "Continuous Heavy Steel Ingot & Rolling Mill (11.2 MW)",
        subtitle: "Mandi Gobindgarh, Punjab — ₹14.42 Cr/yr saved via Round-the-Clock Bilateral Banking + RTM Arbitrage",
        badge: "Heavy Steel",
        href: "/case-studies#steel-mill",
        icon: Zap,
        keywords: ["steel", "rolling mill", "induction furnace", "punjab", "pspcl", "rtm", "bilateral"],
      },
      {
        id: "cs-textile",
        category: "Case Studies",
        title: "Export-Oriented Synthetic Textile Mill (15.0 MW)",
        subtitle: "Surat, Gujarat — ₹22.26 Cr/yr saved via 15 MW Wind-Solar Hybrid + Peak Shaving BESS",
        badge: "Textile",
        href: "/case-studies#textile-mill",
        icon: Zap,
        keywords: ["textile", "surat", "gujarat", "dgvcl", "wind-solar", "hybrid", "bess"],
      },
      {
        id: "cs-paper",
        category: "Case Studies",
        title: "High-Volume Packaging Board & Paper Mill (4.9 MW)",
        subtitle: "Muzaffarnagar, UP — ₹6.67 Cr/yr saved via Rooftop TOPCon Bifacial Solar + IEX TAM Intraday",
        badge: "Paper & Pulp",
        href: "/case-studies#paper-mill",
        icon: Zap,
        keywords: ["paper", "packaging", "muzaffarnagar", "up", "rooftop solar", "tam", "intraday"],
      }
    );

    // 5. Statutory Regulations & Compendium
    items.push(
      {
        id: "reg-cerc-pmr",
        category: "Regulations",
        title: "CERC Power Market Regulations 2021 & General Network Access (GNA)",
        subtitle: "National transmission connectivity, NOAR bidding protocols, and Category-IV trading licensee governance",
        badge: "CERC Order",
        href: "/statutory-compliance#cerc",
        icon: Shield,
        keywords: ["cerc", "pmr 2021", "gna", "t-gna", "noar", "category 4", "trading regulations"],
      },
      {
        id: "reg-mop-geoa",
        category: "Regulations",
        title: "Ministry of Power Green Energy Open Access (GEOA) Rules 2022",
        subtitle: "100 kW sanctioned load threshold, 15-day deemed approval rule, and Cross-Subsidy Surcharge waivers",
        badge: "MoP Rules",
        href: "/statutory-compliance#geoa",
        icon: Shield,
        keywords: ["geoa", "mop", "green open access", "100 kw", "css waiver", "green tariff"],
      },
      {
        id: "reg-rule-3",
        category: "Regulations",
        title: "Electricity Rules 2005: Section 9 & Rule 3 Group Captive Norms",
        subtitle: "Mandatory 26% equity ownership in generating SPV and 51% captive consumption requirement",
        badge: "Rule 3",
        href: "/statutory-compliance#group-captive",
        icon: Shield,
        keywords: ["electricity rules 2005", "rule 3", "section 9", "group captive equity", "26 percent", "51 percent"],
      },
      {
        id: "reg-dsm-2024",
        category: "Regulations",
        title: "Deviation Settlement Mechanism (DSM) Regulations 2024",
        subtitle: "Frequency-linked commercial penalties (50.05 Hz to 49.90 Hz) and volume limits for open access drawl",
        badge: "CERC DSM",
        href: "/statutory-compliance#dsm",
        icon: Shield,
        keywords: ["dsm", "deviation settlement", "grid frequency", "penalties", "overdrawl", "underdrawl"],
      }
    );

    return items;
  }, []);

  // Filter items based on query
  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      return catalog.slice(0, 10); // Default recommendations
    }

    const q = query.toLowerCase().trim();
    return catalog.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSubtitle = item.subtitle.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      const matchKeywords = item.keywords.some((k) => k.includes(q));
      return matchTitle || matchSubtitle || matchCategory || matchKeywords;
    });
  }, [catalog, query]);

  // Handle keyboard navigation inside the list
  const handleKeyDownInList = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      selectItem(filteredItems[selectedIndex]);
    }
  };

  const selectItem = (item: SearchItem) => {
    setIsOpen(false);
    if (item.href.startsWith("tel:")) {
      window.location.href = item.href;
    } else {
      router.push(item.href);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center space-x-2 px-2.5 py-1.5 rounded-lg border border-grid-slate-800 bg-grid-navy-900/80 hover:bg-grid-navy-800/80 hover:border-grid-slate-700 text-grid-slate-400 hover:text-white transition-all text-xs font-mono group"
        title="Open Command Palette (Cmd+K or Ctrl+K)"
      >
        <Search className="w-3.5 h-3.5 text-grid-cyan-400 group-hover:scale-110 transition-transform" />
        <span className="hidden xl:inline text-grid-slate-400">Search states, solutions, tariffs...</span>
        <span className="xl:hidden text-grid-slate-400">Search...</span>
        <kbd className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-grid-navy-950 border border-grid-slate-700 text-grid-slate-400 font-sans shadow-sm">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="bg-grid-navy-900 border border-grid-slate-700 text-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden relative flex flex-col max-h-[80vh]"
        onKeyDown={handleKeyDownInList}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-grid-slate-800 bg-grid-navy-950/60">
          <Search className="w-5 h-5 text-grid-cyan-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a state (e.g. UP, Gujarat), solution, case study, or CERC rule..."
            className="w-full bg-transparent text-white placeholder-grid-slate-500 text-sm font-sans focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => {
                setQuery("");
                setSelectedIndex(0);
              }}
              className="p-1 text-grid-slate-400 hover:text-white rounded"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="text-[10px] font-mono px-2 py-0.5 rounded bg-grid-navy-800 text-grid-slate-400 border border-grid-slate-700">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div ref={listRef} className="overflow-y-auto p-2 space-y-1 divide-y divide-grid-slate-800/40">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-grid-slate-400">
              <Zap className="w-8 h-8 text-grid-slate-600 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium">No results found for &quot;{query}&quot;</p>
              <p className="text-xs text-grid-slate-500 font-mono mt-1">
                Try searching for &quot;Uttar Pradesh&quot;, &quot;Group Captive&quot;, &quot;ABT Meter&quot;, or &quot;DS Group&quot;.
              </p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => selectItem(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-start justify-between group ${
                    isSelected
                      ? "bg-grid-navy-800 border border-grid-slate-700 shadow-md"
                      : "hover:bg-grid-navy-950/60 border border-transparent"
                  }`}
                >
                  <div className="flex items-start space-x-3 pr-2">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? "bg-grid-emerald-500/20 text-grid-emerald-400"
                          : "bg-grid-navy-950 text-grid-slate-400 group-hover:text-white"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs sm:text-sm font-bold text-white group-hover:text-grid-emerald-400 transition-colors">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-grid-navy-950 border border-grid-slate-800 text-grid-slate-300">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-grid-slate-400 font-mono mt-0.5 line-clamp-1">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0 self-center">
                    <span className="text-[10px] font-mono text-grid-slate-500 uppercase hidden sm:inline">
                      {item.category}
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected
                          ? "text-grid-emerald-400 translate-x-0.5"
                          : "text-grid-slate-600 opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2 bg-grid-navy-950 border-t border-grid-slate-800 flex items-center justify-between text-[11px] font-mono text-grid-slate-500">
          <div className="flex items-center space-x-3">
            <span><kbd className="px-1.5 py-0.5 rounded bg-grid-navy-900 border border-grid-slate-800 text-grid-slate-400">↑↓</kbd> Navigate</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-grid-navy-900 border border-grid-slate-800 text-grid-slate-400">↵</kbd> Select</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-grid-navy-900 border border-grid-slate-800 text-grid-slate-400">ESC</kbd> Close</span>
          </div>
          <span className="text-grid-slate-400 hidden sm:inline">Topnotch Energy Solutions • CERC Cat-IV</span>
        </div>
      </div>
    </div>
  );
}
