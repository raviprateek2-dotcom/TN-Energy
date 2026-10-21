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
  Sliders,
  DollarSign,
  Sun,
  Moon,
  TrendingDown,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
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
  projectedSavingsInr: number;
  status: "Queued for 12:00 IST Clearing" | "SLDC Verified" | "Cleared @ MCP";
}

const PRESETS = [
  {
    name: "Solar Hours",
    icon: Sun,
    description: "Blocks 44–64 (11:00–16:00)",
    blocks: Array.from({ length: 21 }, (_, i) => 44 + i),
    color: "text-[#F8BC26] bg-[#F8BC26]/10 border-[#F8BC26]/30",
  },
  {
    name: "Evening Peak Hedge",
    icon: Zap,
    description: "Blocks 73–90 (18:15–22:30)",
    blocks: Array.from({ length: 18 }, (_, i) => 73 + i),
    color: "text-rose-400 bg-rose-500/10 border-rose-500/30",
  },
  {
    name: "Night Valley Shift",
    icon: Moon,
    description: "Blocks 1–24 (00:00–06:00)",
    blocks: Array.from({ length: 24 }, (_, i) => 1 + i),
    color: "text-sky-400 bg-sky-500/10 border-sky-500/30",
  },
];

export default function BiddingConsolePage() {
  const [selectedSegment, setSelectedSegment] = useState<MarketSegment>("DAM");
  const [selectedBlocks, setSelectedBlocks] = useState<number[]>([44, 45, 46, 47, 48, 49, 50, 51, 52]);
  const [quantity, setQuantity] = useState(5);
  const [bidPrice, setBidPrice] = useState<string>("3.40");
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
      projectedSavingsInr: 62400,
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
      projectedSavingsInr: 81750,
      status: "SLDC Verified",
    },
  ]);

  const currentData = IEX_96_BLOCKS_DATA;

  const toggleBlock = (blockNum: number) => {
    setSelectedBlocks((prev) =>
      prev.includes(blockNum) ? prev.filter((b) => b !== blockNum) : [...prev, blockNum].sort((a, b) => a - b)
    );
  };

  const applyPreset = (presetBlocks: number[]) => {
    setSelectedBlocks(presetBlocks);
  };

  const selectAllBlocks = () => {
    setSelectedBlocks(Array.from({ length: 96 }, (_, i) => i + 1));
  };

  const clearSelection = () => {
    setSelectedBlocks([]);
  };

  const parsedBidPrice = parseFloat(bidPrice) || 3.4;
  const wheelingAndLossCost = 0.76; // Landed wheeling charges and STU losses
  const landedBidCost = parsedBidPrice + wheelingAndLossCost;
  const discomBaselineTariff = 8.65;
  const unitRupeeSavings = Math.max(0, discomBaselineTariff - landedBidCost);
  const hoursSelected = selectedBlocks.length * 0.25;
  const totalMwh = quantity * hoursSelected;
  const projectedRupeeSavings = Math.round(unitRupeeSavings * totalMwh * 1000);

  const handleBid = () => {
    if (selectedBlocks.length === 0 || !bidPrice) return;
    const minB = Math.min(...selectedBlocks);
    const maxB = Math.max(...selectedBlocks);
    setOrders((prev) => {
      const nextSeq = 84920 + prev.length + 1;
      const minPad = ((15 + prev.length * 3) % 60).toString().padStart(2, "0");
      const newOrder: BidOrder = {
        id: `TES-${selectedSegment}-${nextSeq}`,
        timestamp: `10:${minPad}:00 IST`,
        segment: selectedSegment,
        bidType,
        quantityMw: quantity,
        bidPricePerKwh: parseFloat(bidPrice),
        blockCount: selectedBlocks.length,
        blockRange: `Blocks ${minB}–${maxB} (${selectedBlocks.length} Blocks)`,
        projectedSavingsInr: projectedRupeeSavings,
        status: "Queued for 12:00 IST Clearing",
      };
      return [newOrder, ...prev];
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
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
    <div className="space-y-8">
      {/* Top Console Status Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white/5 border border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-extrabold text-white">
                Live 15-Minute Bidding Terminal
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                IEX / PXIL Connected
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Automated portfolio dispatch co-optimization for Century Plyboards (7,500 kVA HT load).
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
          <div className="flex items-center space-x-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>DAM Bourse Window: Open (10:00–12:00 IST)</span>
          </div>
        </div>
      </div>

      {/* Main Bidding Grid Layout */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Column: 96-Block Matrix & Presets (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Segment Selector & Presets */}
          <div className="bg-[#0C1222] border border-slate-800/90 rounded-3xl p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                  Select Bourse Segment
                </span>
                <div className="flex space-x-2 mt-2">
                  {MARKET_SEGMENTS.map((seg) => (
                    <button
                      key={seg}
                      onClick={() => setSelectedSegment(seg)}
                      className={`px-4 py-2 rounded-xl font-mono font-bold text-xs transition-all ${
                        selectedSegment === seg
                          ? "bg-[#F8BC26] text-[#1C2C34] shadow-md shadow-[#F8BC26]/20"
                          : "bg-white/5 border border-slate-700/60 text-slate-400 hover:text-white"
                      }`}
                    >
                      {seg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Presets */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                  Quick Shift Presets
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {PRESETS.map((p) => {
                    const Icon = p.icon;
                    return (
                      <button
                        key={p.name}
                        onClick={() => applyPreset(p.blocks)}
                        className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${p.color}`}
                        title={p.description}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{p.name}</span>
                      </button>
                    );
                  })}
                  <button
                    onClick={selectAllBlocks}
                    className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-slate-700 text-xs font-mono text-slate-300"
                  >
                    All 96
                  </button>
                  <button
                    onClick={clearSelection}
                    className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-slate-700 text-xs font-mono text-slate-400"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            {/* 96 Blocks Heatmap Matrix */}
            <div>
              <div className="flex items-center justify-between mb-2 text-xs font-mono text-slate-400">
                <span>96 Time-Blocks (15-Min Intervals from 00:00 to 24:00 IST):</span>
                <span className="text-emerald-400 font-bold">{selectedBlocks.length} Blocks Selected</span>
              </div>

              <div className="grid grid-cols-12 gap-1 p-2 rounded-2xl bg-black/30 border border-slate-800">
                {currentData.map((block) => {
                  const price =
                    selectedSegment === "DAM"
                      ? block.DAM.kwh
                      : selectedSegment === "GDAM"
                      ? block.GDAM.kwh
                      : block.RTM.kwh;
                  const isSelected = selectedBlocks.includes(block.blockNumber);
                  
                  const priceColor =
                    price >= 7
                      ? "bg-red-900/60 hover:bg-red-800/80 text-red-200"
                      : price >= 5
                      ? "bg-amber-900/50 hover:bg-amber-800/70 text-amber-200"
                      : price >= 4
                      ? "bg-yellow-900/40 hover:bg-yellow-800/60 text-yellow-200"
                      : price >= 3
                      ? "bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-200"
                      : "bg-blue-900/40 hover:bg-blue-800/60 text-blue-200";

                  return (
                    <button
                      key={block.blockNumber}
                      onClick={() => toggleBlock(block.blockNumber)}
                      title={`Block #${block.blockNumber}: ${block.startTime}–${block.endTime} | ₹${price.toFixed(2)}/kWh`}
                      className={`aspect-square rounded-md text-[9px] font-mono font-bold transition-all flex items-center justify-center ${
                        isSelected
                          ? "bg-[#F8BC26] text-[#1C2C34] ring-2 ring-[#F8BC26] font-black scale-105 z-10 shadow-md"
                          : `${priceColor} border border-slate-800/60`
                      }`}
                    >
                      {block.blockNumber}
                    </button>
                  );
                })}
              </div>

              {/* Price Color Legend */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-slate-400">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded bg-blue-900/60 inline-block border border-blue-700/50" />
                    <span>{"< ₹3.00"}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-900/50 inline-block border border-emerald-700/50" />
                    <span>₹3–4</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded bg-yellow-900/50 inline-block border border-yellow-700/50" />
                    <span>₹4–5</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded bg-amber-900/50 inline-block border border-amber-700/50" />
                    <span>₹5–7</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded bg-red-900/60 inline-block border border-red-700/50" />
                    <span>{"≥ ₹7.00"}</span>
                  </span>
                </div>
                <div>
                  Average Selected MCP: <strong className="text-white">₹{avgPrice.toFixed(2)}/kWh</strong>
                </div>
              </div>
            </div>

          </div>

          {/* Simulated Real-Time Order Book (Market Depth) */}
          <div className="bg-[#0C1222] border border-slate-800/90 rounded-3xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Live IEX Market Depth Order Book (MW)</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Equilibrium MCP: ₹3.42/kWh</span>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4 text-xs font-mono">
              {/* Buy Side Queue */}
              <div className="space-y-2">
                <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex justify-between">
                  <span>Buy Bids (High to Low)</span>
                  <span>Volume (MW)</span>
                </div>
                {[
                  { price: "₹3.65", vol: "42 MW", pct: "85%" },
                  { price: "₹3.50", vol: "78 MW", pct: "95%" },
                  { price: "₹3.40 (Your Bid)", vol: "115 MW", pct: "100%", isYou: true },
                  { price: "₹3.25", vol: "54 MW", pct: "60%" },
                ].map((b, i) => (
                  <div
                    key={i}
                    className={`relative p-2 rounded-lg flex justify-between items-center overflow-hidden ${
                      b.isYou ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-200" : "bg-white/[0.02] text-slate-300"
                    }`}
                  >
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-emerald-500/10 pointer-events-none"
                      style={{ width: b.pct }}
                    />
                    <span className="font-bold relative z-10">{b.price}</span>
                    <span className="relative z-10 text-slate-400">{b.vol}</span>
                  </div>
                ))}
              </div>

              {/* Sell Side Queue */}
              <div className="space-y-2">
                <div className="text-[10px] text-rose-400 font-bold uppercase tracking-wider flex justify-between">
                  <span>Sell Asks (Low to High)</span>
                  <span>Volume (MW)</span>
                </div>
                {[
                  { price: "₹3.30", vol: "35 MW", pct: "50%" },
                  { price: "₹3.42 (MCP Cleared)", vol: "140 MW", pct: "100%", isMcp: true },
                  { price: "₹3.55", vol: "82 MW", pct: "75%" },
                  { price: "₹3.70", vol: "40 MW", pct: "40%" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className={`relative p-2 rounded-lg flex justify-between items-center overflow-hidden ${
                      s.isMcp ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-200" : "bg-white/[0.02] text-slate-300"
                    }`}
                  >
                    <div
                      className="absolute right-0 top-0 bottom-0 bg-rose-500/10 pointer-events-none"
                      style={{ width: s.pct }}
                    />
                    <span className="font-bold relative z-10">{s.price}</span>
                    <span className="relative z-10 text-slate-400">{s.vol}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Bid Execution & Financial Savings Simulator (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Order Placement Console */}
          <div className="bg-[#0C1222] border border-slate-800/90 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-[#F8BC26]" />
                <span>Execute Bourse Order</span>
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                Client: Century Plyboards
              </span>
            </div>

            {/* Buy / Sell Toggle */}
            <div className="grid grid-cols-2 gap-2 bg-black/40 p-1.5 rounded-2xl border border-slate-800">
              <button
                onClick={() => setBidType("buy")}
                className={`py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  bidType === "buy" ? "bg-emerald-500 text-[#060913] shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                Buy Exchange Power
              </button>
              <button
                onClick={() => setBidType("sell")}
                className={`py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  bidType === "sell" ? "bg-rose-500 text-white shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                Sell Surpluses
              </button>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Contract Quantity (MW):</span>
                <span className="text-white font-bold">{quantity} MW ({quantity * 1000} kW)</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {QUANTITY_OPTIONS.slice(0, 4).map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuantity(q)}
                    className={`py-2 rounded-xl text-xs font-mono font-bold border transition-colors ${
                      quantity === q
                        ? "bg-[#F8BC26] text-[#1C2C34] border-[#F8BC26]"
                        : "bg-white/5 border-slate-700/60 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {q} MW
                  </button>
                ))}
              </div>
            </div>

            {/* Limit Price Input */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Max Bid Price (₹/kWh):</span>
                <span className="text-cyan-400 font-bold">CERC Cap: ₹10.00</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  step="0.05"
                  min="1.0"
                  max="10.0"
                  value={bidPrice}
                  onChange={(e) => setBidPrice(e.target.value)}
                  placeholder="3.40"
                  className="w-full bg-black/40 border border-slate-700 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-[#F8BC26]"
                />
                <span className="absolute right-4 top-3 text-xs font-mono text-slate-400">₹ / kWh</span>
              </div>
            </div>

            {/* Live Financial Margin Calculation */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-slate-800 space-y-2.5 text-xs font-mono">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Real-Time Landed Economics
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">DISCOM Baseline Tariff:</span>
                <span className="text-slate-200">₹{discomBaselineTariff.toFixed(2)}/kWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Landed Cost:</span>
                <span className="text-cyan-400 font-bold">₹{landedBidCost.toFixed(2)}/kWh</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-800">
                <span className="text-emerald-400 font-bold">Unit Margin Spread:</span>
                <span className="text-emerald-400 font-bold">+₹{unitRupeeSavings.toFixed(2)}/kWh</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-800">
                <span className="text-white font-bold">Projected Net Savings:</span>
                <span className="text-[#F8BC26] font-extrabold text-sm">₹{projectedRupeeSavings.toLocaleString()}</span>
              </div>
            </div>

            {/* Submit Bid Button */}
            <button
              onClick={handleBid}
              disabled={selectedBlocks.length === 0 || !bidPrice}
              className="w-full py-3.5 rounded-2xl bg-[#F8BC26] hover:bg-[#eab308] text-[#1C2C34] font-bold text-xs font-mono uppercase tracking-wider shadow-lg shadow-[#F8BC26]/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <span>Queue Bid for 12:00 Clearing</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {submitted && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center space-x-2 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Order queued successfully with SLDC pre-clearance token!</span>
              </div>
            )}
          </div>

          {/* Active Orders Ticket Queue */}
          <div className="bg-[#0C1222] border border-slate-800/90 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-400">
                Today&apos;s Bourse Orders ({orders.length})
              </h3>
              <span className="text-[10px] font-mono text-emerald-400">SLDC Sync Active</span>
            </div>

            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.id} className="p-3.5 rounded-2xl bg-white/[0.02] border border-slate-800 space-y-2 text-xs font-mono">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-white">{o.id}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-bold">
                      {o.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {o.segment} • {o.quantityMw} MW @ ₹{o.bidPricePerKwh.toFixed(2)}/kWh
                  </div>
                  <div className="text-[10px] text-slate-500 flex justify-between pt-1 border-t border-slate-800/60">
                    <span>{o.blockRange}</span>
                    <span className="text-[#F8BC26] font-bold">+₹{o.projectedSavingsInr.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
