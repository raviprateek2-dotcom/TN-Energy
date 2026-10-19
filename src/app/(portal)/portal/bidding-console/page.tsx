"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ChevronLeft,
  Clock,
  Zap,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react";
import { IEX_96_BLOCKS_DATA } from "@/lib/constants/market-blocks-seed";

const MARKET_SEGMENTS = ["DAM", "GDAM", "RTM"] as const;
type MarketSegment = (typeof MARKET_SEGMENTS)[number];

const QUANTITY_OPTIONS = [1, 2, 5, 10, 20, 50, 100];

interface BidOrder {
  id: string;
  timestamp: string;
  segment: MarketSegment;
  bidType: "buy" | "sell";
  quantityMw: number;
  bidPricePerKwh: number;
  blockCount: number;
  blockRange: string;
  status: "Queued for 12:00 IST Clearing" | "SLDC Verified" | "Cleared @ MCP";
}

export default function BiddingConsolePage() {
  const [selectedSegment, setSelectedSegment] = useState<MarketSegment>("DAM");
  const [selectedBlocks, setSelectedBlocks] = useState<number[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [bidPrice, setBidPrice] = useState<string>("");
  const [bidType, setBidType] = useState<"buy" | "sell">("buy");
  const [submitted, setSubmitted] = useState(false);
  const [orders, setOrders] = useState<BidOrder[]>([
    {
      id: "TES-DAM-84920",
      timestamp: "10:15:32 IST",
      segment: "DAM",
      bidType: "buy",
      quantityMw: 5,
      bidPricePerKwh: 3.4,
      blockCount: 12,
      blockRange: "Blocks 37–48 (09:00–12:00)",
      status: "Queued for 12:00 IST Clearing",
    },
    {
      id: "TES-GDAM-39182",
      timestamp: "09:42:10 IST",
      segment: "GDAM",
      bidType: "buy",
      quantityMw: 3,
      bidPricePerKwh: 3.15,
      blockCount: 20,
      blockRange: "Blocks 45–64 (11:00–16:00)",
      status: "SLDC Verified",
    },
  ]);

  const currentData = IEX_96_BLOCKS_DATA;

  const toggleBlock = (blockNum: number) => {
    setSelectedBlocks((prev) =>
      prev.includes(blockNum) ? prev.filter((b) => b !== blockNum) : [...prev, blockNum].sort((a, b) => a - b)
    );
  };

  const handleBid = () => {
    if (selectedBlocks.length === 0 || !bidPrice) return;
    const minB = Math.min(...selectedBlocks);
    const maxB = Math.max(...selectedBlocks);
    const newOrder: BidOrder = {
      id: `TES-${selectedSegment}-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: new Date().toLocaleTimeString("en-IN", { hour12: false }) + " IST",
      segment: selectedSegment,
      bidType,
      quantityMw: quantity,
      bidPricePerKwh: parseFloat(bidPrice),
      blockCount: selectedBlocks.length,
      blockRange: `Blocks ${minB}–${maxB} (${selectedBlocks.length} Blocks)`,
      status: "Queued for 12:00 IST Clearing",
    };
    setOrders((prev) => [newOrder, ...prev]);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setSelectedBlocks([]);
    setBidPrice("");
  };

  const avgPrice =
    selectedBlocks.length > 0
      ? selectedBlocks.reduce((sum, bn) => {
          const block = currentData.find((b) => b.blockNumber === bn);
          if (!block) return sum;
          return (
            sum +
            (selectedSegment === "DAM"
              ? block.DAM.kwh
              : selectedSegment === "GDAM"
              ? block.GDAM.kwh
              : block.RTM.kwh)
          );
        }, 0) / selectedBlocks.length
      : 0;

  return (
    <main className="min-h-screen bg-grid-navy-950 text-white">
      {/* Console Header */}
      <div className="border-b border-grid-slate-800 bg-grid-navy-900/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link
              href="/portal/dashboard"
              className="text-grid-slate-500 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-grid-cyan-400" />
              <span className="text-white font-extrabold text-sm">Bidding Console</span>
              <span className="text-[10px] font-mono bg-grid-navy-800 border border-grid-slate-700 text-grid-slate-400 px-2 py-0.5 rounded">
                DEMO MODE
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-[11px] font-mono">
            <div className="flex items-center space-x-1.5 text-grid-emerald-400">
              <div className="w-1.5 h-1.5 rounded-full bg-grid-emerald-400 animate-pulse" />
              <span>IEX Connected</span>
            </div>
            <div className="text-grid-slate-500 flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>DAM Window: 10:00–12:00 IST</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Demo Notice */}
        <div className="bg-grid-amber-500/10 border border-grid-amber-500/30 rounded-xl px-4 py-3 mb-6 flex items-start space-x-3">
          <Info className="w-4 h-4 text-grid-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-grid-slate-300 text-xs font-mono">
            <strong className="text-grid-amber-400">Demo Environment:</strong> This bidding console is illustrative.
            Live IEX/PXIL bid submission requires CERC-registered trading account and SLDC scheduling credentials.
            Contact Topnotch&apos;s 24×7 NOC team to initiate live trading operations.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: 96-Block Selector */}
          <div className="lg:col-span-2 space-y-5">
            {/* Segment Switcher */}
            <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-extrabold text-sm">Market Segment</h2>
                <div className="flex space-x-1">
                  {MARKET_SEGMENTS.map((seg) => (
                    <button
                      key={seg}
                      onClick={() => setSelectedSegment(seg)}
                      className={`px-3 py-1.5 rounded-lg font-mono font-bold text-xs transition-all ${
                        selectedSegment === seg
                          ? "bg-grid-emerald-500 text-grid-navy-950"
                          : "bg-grid-navy-800 border border-grid-slate-700 text-grid-slate-400 hover:text-white"
                      }`}
                    >
                      {seg}
                    </button>
                  ))}
                </div>
              </div>

              {/* 96 Block Grid */}
              <div className="mb-2 text-[10px] font-mono text-grid-slate-500">
                Click blocks to select / deselect for bidding. Green = selected.
              </div>
              <div className="grid grid-cols-12 gap-0.5">
                {currentData.map((block) => {
                  const price =
                    selectedSegment === "DAM"
                      ? block.DAM.kwh
                      : selectedSegment === "GDAM"
                      ? block.GDAM.kwh
                      : block.RTM.kwh;
                  const isSelected = selectedBlocks.includes(block.blockNumber);
                  // Color code by price
                  const priceColor =
                    price >= 7
                      ? "bg-red-900/60 hover:bg-red-800/80"
                      : price >= 5
                      ? "bg-orange-900/50 hover:bg-orange-800/70"
                      : price >= 4
                      ? "bg-grid-amber-900/40 hover:bg-grid-amber-800/60"
                      : price >= 3
                      ? "bg-grid-emerald-900/40 hover:bg-grid-emerald-800/60"
                      : "bg-blue-900/40 hover:bg-blue-800/60";

                  return (
                    <button
                      key={block.blockNumber}
                      onClick={() => toggleBlock(block.blockNumber)}
                      title={`Block ${block.blockNumber}: ${block.startTime}–${block.endTime} | ₹${price.toFixed(2)}/kWh`}
                      className={`aspect-square rounded-sm text-[8px] font-mono font-bold transition-all ${
                        isSelected
                          ? "bg-grid-emerald-500 text-grid-navy-950 ring-1 ring-grid-emerald-300"
                          : `${priceColor} text-grid-slate-400 border border-grid-slate-800/50`
                      }`}
                    >
                      {block.blockNumber}
                    </button>
                  );
                })}
              </div>

              {/* Price Legend */}
              <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-mono text-grid-slate-500">
                <span className="flex items-center space-x-1">
                  <span className="w-3 h-3 rounded-sm bg-blue-900/60 inline-block" />
                  <span>{"<₹3/kWh"}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-3 h-3 rounded-sm bg-grid-emerald-900/40 inline-block" />
                  <span>₹3–4/kWh</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-3 h-3 rounded-sm bg-grid-amber-900/40 inline-block" />
                  <span>₹4–5/kWh</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-3 h-3 rounded-sm bg-orange-900/50 inline-block" />
                  <span>₹5–7/kWh</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-3 h-3 rounded-sm bg-red-900/60 inline-block" />
                  <span>{"≥₹7/kWh"}</span>
                </span>
              </div>
            </div>

            {/* Selected Blocks Summary */}
            {selectedBlocks.length > 0 && (
              <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-xl p-4">
                <h3 className="text-white font-bold text-xs mb-2">
                  Selected: {selectedBlocks.length} blocks ({(selectedBlocks.length * 15)} minutes)
                </h3>
                <div className="text-grid-slate-400 font-mono text-[11px] flex flex-wrap gap-1.5">
                  {selectedBlocks.map((b) => (
                    <span key={b} className="px-1.5 py-0.5 rounded bg-grid-navy-800 border border-grid-emerald-500/30 text-grid-emerald-400">
                      B{b.toString().padStart(2, "0")}
                    </span>
                  ))}
                </div>
                <div className="mt-2 text-grid-slate-500 font-mono text-[11px]">
                  Avg {selectedSegment} price: <span className="text-grid-cyan-400 font-bold">₹{avgPrice.toFixed(2)}/kWh</span>
                </div>
              </div>
            )}
          </div>

          {/* Right: Bid Form */}
          <div className="space-y-5">
            <div className="bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-5">
              <h2 className="text-white font-extrabold text-sm mb-4 flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-grid-emerald-400" />
                <span>Bid Entry</span>
              </h2>

              {/* Buy / Sell */}
              <div className="flex space-x-2 mb-4">
                {(["buy", "sell"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setBidType(t)}
                    className={`flex-1 py-2 rounded-lg font-mono font-bold text-xs transition-all uppercase ${
                      bidType === t
                        ? t === "buy"
                          ? "bg-grid-emerald-500 text-grid-navy-950"
                          : "bg-red-500 text-white"
                        : "bg-grid-navy-800 border border-grid-slate-700 text-grid-slate-400"
                    }`}
                  >
                    {t === "buy" ? "Buy (Purchase)" : "Sell (Injection)"}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-grid-slate-500 mb-1">
                    Bid Price (₹/kWh)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={bidPrice}
                    onChange={(e) => setBidPrice(e.target.value)}
                    placeholder="e.g. 4.20"
                    className="w-full bg-grid-navy-950 border border-grid-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono placeholder-grid-slate-600 focus:outline-none focus:border-grid-emerald-500 transition-colors"
                  />
                  <p className="text-grid-slate-600 font-mono text-[10px] mt-0.5">
                    CERC Price Cap: ₹10.00/kWh
                  </p>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-grid-slate-500 mb-1">
                    Quantity (MW per block)
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {QUANTITY_OPTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => setQuantity(q)}
                        className={`px-2 py-1 rounded font-mono text-xs font-bold transition-all ${
                          quantity === q
                            ? "bg-grid-cyan-500 text-grid-navy-950"
                            : "bg-grid-navy-800 border border-grid-slate-700 text-grid-slate-400 hover:text-white"
                        }`}
                      >
                        {q} MW
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bid Summary */}
                {selectedBlocks.length > 0 && bidPrice && (
                  <div className="bg-grid-navy-800 border border-grid-slate-700 rounded-xl p-3 text-xs font-mono space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-grid-slate-500">Segment</span>
                      <span className="text-white font-bold">{selectedSegment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-grid-slate-500">Blocks</span>
                      <span className="text-white font-bold tabular-nums">{selectedBlocks.length} blocks</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-grid-slate-500">Volume</span>
                      <span className="text-white font-bold tabular-nums">
                        {(quantity * selectedBlocks.length * 0.25).toFixed(2)} MUs
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-grid-slate-500">Bid Price</span>
                      <span className="text-grid-cyan-400 font-bold tabular-nums">
                        ₹{parseFloat(bidPrice).toFixed(2)}/kWh
                      </span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleBid}
                  disabled={selectedBlocks.length === 0 || !bidPrice}
                  className={`w-full py-3 rounded-xl font-extrabold font-mono text-sm transition-all flex items-center justify-center space-x-2 ${
                    bidType === "buy"
                      ? "bg-grid-emerald-500 hover:bg-grid-emerald-400 text-grid-navy-950 shadow-lg shadow-grid-emerald-500/20"
                      : "bg-red-500 hover:bg-red-400 text-white"
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  <Zap className="w-4 h-4" />
                  <span>
                    Submit {bidType === "buy" ? "Purchase" : "Sell"} Bid ({selectedSegment})
                  </span>
                </button>

                {submitted && (
                  <div className="bg-grid-emerald-500/10 border border-grid-emerald-500/30 rounded-xl px-4 py-3 flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-grid-emerald-400 flex-shrink-0" />
                    <p className="text-grid-emerald-400 text-xs font-mono">
                      Demo bid submitted. In live mode, this would be forwarded to IEX/PXIL with SLDC scheduling
                      reference.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Market Alert */}
            <div className="bg-grid-amber-500/10 border border-grid-amber-500/30 rounded-xl p-4">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-grid-amber-400 flex-shrink-0" />
                <div>
                  <div className="text-grid-amber-400 font-bold text-xs">Evening Peak Alert</div>
                  <p className="text-grid-slate-400 font-mono text-[11px] mt-1">
                    Blocks 73–92 (18:00–23:00) DAM MCP historically ₹8,500–₹9,980/MWh. Consider RTM balancing
                    or BESS discharge to reduce peak drawl costs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Bid Orders & Clearing Positions Ledger */}
        <div className="mt-8 bg-grid-navy-900 border border-grid-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-grid-slate-800">
            <div>
              <h3 className="text-white font-extrabold text-sm flex items-center space-x-2">
                <Activity className="w-4 h-4 text-grid-cyan-400" />
                <span>Active Bid Orders &amp; Clearing Ledger</span>
              </h3>
              <p className="text-grid-slate-500 font-mono text-xs mt-0.5">
                Real-time position tracking across IEX DAM, GDAM, and RTM bourses.
              </p>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-grid-navy-950 border border-grid-slate-800 text-grid-slate-400">
              Total Active Positions: {orders.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-grid-navy-950 text-grid-slate-400 text-[10px] uppercase">
                <tr>
                  <th className="p-3">Order Ref</th>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Market</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Block Allocation</th>
                  <th className="p-3">Volume</th>
                  <th className="p-3">Bid Price</th>
                  <th className="p-3">Clearing Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-grid-slate-800 text-grid-slate-300">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-grid-navy-800/40 transition-colors">
                    <td className="p-3 font-bold text-white">{o.id}</td>
                    <td className="p-3 text-grid-slate-400">{o.timestamp}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          o.segment === "DAM"
                            ? "bg-grid-cyan-500/20 text-grid-cyan-400 border border-grid-cyan-500/30"
                            : o.segment === "GDAM"
                            ? "bg-grid-emerald-500/20 text-grid-emerald-400 border border-grid-emerald-500/30"
                            : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                        }`}
                      >
                        {o.segment}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-grid-emerald-400 uppercase">{o.bidType}</td>
                    <td className="p-3 text-white">{o.blockRange}</td>
                    <td className="p-3 font-bold text-white tabular-nums">
                      {o.quantityMw} MW ({(o.quantityMw * o.blockCount * 0.25).toFixed(2)} MUs)
                    </td>
                    <td className="p-3 font-bold text-grid-cyan-400 tabular-nums">
                      ₹{o.bidPricePerKwh.toFixed(2)}/kWh
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center space-x-1.5 text-[11px] text-grid-amber-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-grid-amber-400 animate-pulse" />
                        <span>{o.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
