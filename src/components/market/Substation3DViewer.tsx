"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Rotate3d,
  Layers,
  Sparkles,
  ShieldCheck,
  Zap,
  Info,
  Maximize2,
  RefreshCw,
} from "lucide-react";
import { playBreakerClick } from "@/lib/audio/switch-audio";

interface SubstationNode {
  id: string;
  name: string;
  x: number;
  y: number;
  z: number;
  size: [number, number, number]; // [width, height, depth]
  color: string;
  tag: string;
  specs: string;
}

const NODES: SubstationNode[] = [
  {
    id: "gantry",
    name: "33 kV Incoming Line Gantry",
    x: -120,
    y: 0,
    z: -40,
    size: [24, 90, 24],
    color: "#64748B",
    tag: "Grid Interconnection",
    specs: "Overhead terminal gantry with gapless ZnO lightning arrestors",
  },
  {
    id: "vcb",
    name: "33 kV Vacuum Circuit Breaker (VCB)",
    x: -40,
    y: 0,
    z: -20,
    size: [36, 45, 36],
    color: "#059669",
    tag: "Fault Interruption",
    specs: "25 kA / 3s breaking capacity with rapid auto-reclose",
  },
  {
    id: "sem-bay",
    name: "Class 0.2s ABT Revenue SEM Metering Bay",
    x: 40,
    y: 0,
    z: 0,
    size: [32, 50, 32],
    color: "#F8BC26",
    tag: "Statutory Bourse Settlement",
    specs: "CEA Class 0.2s Special Energy Meter with AMR 4G modem to SLDC",
  },
  {
    id: "transformer",
    name: "16 MVA 33/11 kV Main Power Transformer",
    x: 120,
    y: 0,
    z: 20,
    size: [60, 65, 50],
    color: "#0284C7",
    tag: "Stepped Down Plant Supply",
    specs: "ONAN/ONAF oil-cooled with Buchholz relay & OLTC gear",
  },
  {
    id: "apfc",
    name: "Detuned APFC Shunt Capacitor Bank",
    x: 40,
    y: 0,
    z: 80,
    size: [40, 38, 28],
    color: "#8B5CF6",
    tag: "0.999 Power Factor",
    specs: "7% detuned reactor attenuating 5th & 7th order harmonics",
  },
];

export function Substation3DViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotationX, setRotationX] = useState(25);
  const [rotationY, setRotationY] = useState(40);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeNode, setActiveNode] = useState<SubstationNode>(NODES[2]); // Default SEM meter

  // 3D Isometric projection math
  const project = useCallback(
    (x: number, y: number, z: number, width: number, height: number) => {
      const radX = (rotationX * Math.PI) / 180;
      const radY = (rotationY * Math.PI) / 180;

      // Rotate around Y axis
      const cosY = Math.cos(radY);
      const sinY = Math.sin(radY);
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;

      // Rotate around X axis
      const cosX = Math.cos(radX);
      const sinX = Math.sin(radX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      // Perspective projection
      const cameraDistance = 380;
      const scale = cameraDistance / (cameraDistance + z2);

      return {
        x: width / 2 + x1 * scale,
        y: height / 2 - y2 * scale,
        scale,
        depth: z2,
      };
    },
    [rotationX, rotationY]
  );

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Draw Ground Grid Floor in 3D
      ctx.strokeStyle = "rgba(51, 65, 85, 0.4)";
      ctx.lineWidth = 1;

      const gridSize = 160;
      const step = 40;

      for (let i = -gridSize; i <= gridSize; i += step) {
        const p1 = project(i, 0, -gridSize, width, height);
        const p2 = project(i, 0, gridSize, width, height);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        const p3 = project(-gridSize, 0, i, width, height);
        const p4 = project(gridSize, 0, i, width, height);
        ctx.beginPath();
        ctx.moveTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.stroke();
      }

      // Sort nodes by depth for correct painter's algorithm
      const sortedNodes = [...NODES].map((node) => {
        const p = project(node.x, node.y, node.z, width, height);
        return { node, p };
      }).sort((a, b) => b.p.depth - a.p.depth);

      // Draw Connection Power Busbars
      ctx.strokeStyle = "rgba(248, 188, 38, 0.6)";
      ctx.lineWidth = 2.5;
      ctx.setLineDash([4, 4]);

      for (let i = 0; i < sortedNodes.length - 1; i++) {
        const p1 = sortedNodes[i].p;
        const p2 = sortedNodes[i + 1].p;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y - 25 * p1.scale);
        ctx.lineTo(p2.x, p2.y - 25 * p2.scale);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Draw each 3D Block Node
      sortedNodes.forEach(({ node, p }) => {
        const isSelected = activeNode?.id === node.id;
        const [w, h, d] = node.size;
        const sw = w * p.scale;
        const sh = h * p.scale;

        // Shadow on ground
        ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
        ctx.beginPath();
        ctx.ellipse(p.x, p.y + 4, sw * 0.8, (sw * 0.4) * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();

        // Node 3D Box Body
        ctx.fillStyle = isSelected ? "#F8BC26" : node.color;
        ctx.fillRect(p.x - sw / 2, p.y - sh, sw, sh);

        // Highlight stroke
        ctx.strokeStyle = isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = isSelected ? 2.5 : 1;
        ctx.strokeRect(p.x - sw / 2, p.y - sh, sw, sh);

        // Top Face Highlight
        ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
        ctx.beginPath();
        ctx.moveTo(p.x - sw / 2, p.y - sh);
        ctx.lineTo(p.x, p.y - sh - 10 * p.scale);
        ctx.lineTo(p.x + sw / 2, p.y - sh);
        ctx.closePath();
        ctx.fill();

        // Label above component
        ctx.fillStyle = isSelected ? "#FFFFFF" : "rgba(203, 213, 225, 0.85)";
        ctx.font = `${Math.max(10, Math.round(11 * p.scale))}px monospace`;
        ctx.textAlign = "center";
        ctx.fillText(node.tag, p.x, p.y - sh - 14 * p.scale);
      });
    };

    render();
  }, [project, activeNode]);

  // Mouse drag handlers for full 3D rotatability
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setRotationY((prev) => (prev + deltaX * 0.4) % 360);
    setRotationX((prev) => Math.max(5, Math.min(65, prev - deltaY * 0.3)));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-[#F8BC26] mb-1">
            <Rotate3d className="w-4 h-4" />
            <span>Interactive 3D Substation Twin</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            33 kV Switchyard &amp; SEM Bay Digital Model
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Click &amp; drag canvas to rotate 360° | Click components below to inspect technical telemetry
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setRotationX(25);
            setRotationY(40);
          }}
          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all flex items-center space-x-1.5 text-xs font-mono self-start sm:self-auto"
          title="Reset 3D camera angle"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset View</span>
        </button>
      </div>

      {/* 3D Canvas Container */}
      <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden cursor-grab active:cursor-grabbing">
        <canvas
          ref={canvasRef}
          width={700}
          height={380}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="w-full h-auto block select-none"
        />

        {/* Ambient Overlay Hint */}
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700 text-[10px] font-mono text-slate-300 flex items-center space-x-1.5">
          <Rotate3d className="w-3 h-3 text-[#F8BC26]" />
          <span>Click &amp; Drag to Rotate 3D Space</span>
        </div>
      </div>

      {/* Interactive Component Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {NODES.map((node) => {
          const isSelected = activeNode.id === node.id;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => {
                playBreakerClick();
                setActiveNode(node);
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? "bg-[#F8BC26] text-[#1C2C34] border-[#F8BC26] font-bold shadow-md scale-102"
                  : "bg-slate-800/60 text-slate-300 border-slate-700 hover:bg-slate-800 hover:border-slate-600"
              }`}
            >
              <div className="text-[10px] font-mono uppercase tracking-wider block opacity-75">
                {node.tag}
              </div>
              <div className="text-xs font-bold truncate mt-0.5">{node.name}</div>
            </button>
          );
        })}
      </div>

      {/* Selected Node Telemetry Inspector */}
      {activeNode && (
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between">
            <span className="text-white font-bold">{activeNode.name}</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Statutory Certified
            </span>
          </div>
          <p className="text-slate-300 leading-relaxed font-sans">{activeNode.specs}</p>
        </div>
      )}

    </div>
  );
}
