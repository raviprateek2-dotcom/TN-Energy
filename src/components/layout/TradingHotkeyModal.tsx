"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Keyboard,
  X,
  Calculator,
  Scale,
  BarChart3,
  FileText,
  Download,
  PhoneCall,
  Home,
  Shield,
  Zap,
} from "lucide-react";
import { BRAND } from "@/lib/constants/brand";

interface HotkeyItem {
  key: string;
  label: string;
  action: () => void;
  category: "Navigation" | "Reports" | "Hotline";
  icon: React.ComponentType<{ className?: string }>;
}

export function TradingHotkeyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  const hotkeys: HotkeyItem[] = [
    {
      key: "1",
      label: "Home & National Grid Barometer",
      action: () => {
        router.push("/");
        handleClose();
      },
      category: "Navigation",
      icon: Home,
    },
    {
      key: "2",
      label: "Open Access ROI Calculator",
      action: () => {
        router.push("/tools/open-access-calculator");
        handleClose();
      },
      category: "Navigation",
      icon: Calculator,
    },
    {
      key: "3",
      label: "Compare 14 Indian States",
      action: () => {
        router.push("/tools/compare-states");
        handleClose();
      },
      category: "Navigation",
      icon: Scale,
    },
    {
      key: "4",
      label: "CERC Market Intelligence (96 Blocks)",
      action: () => {
        router.push("/market-intelligence");
        handleClose();
      },
      category: "Navigation",
      icon: BarChart3,
    },
    {
      key: "5",
      label: "B2B Client Trading Cockpit",
      action: () => {
        router.push("/portal/dashboard");
        handleClose();
      },
      category: "Navigation",
      icon: Zap,
    },
    {
      key: "D",
      label: "Download CERC Audit Dossier (PDF)",
      action: () => {
        window.open("/api/reports/dossier", "_blank");
        handleClose();
      },
      category: "Reports",
      icon: Download,
    },
    {
      key: "R",
      label: "Download REA 96-Block Schedule (CSV)",
      action: () => {
        window.open("/api/reports/rea?format=csv", "_blank");
        handleClose();
      },
      category: "Reports",
      icon: FileText,
    },
    {
      key: "C",
      label: "Call 24x7 NOC Trading Floor",
      action: () => {
        window.location.href = `tel:${BRAND.contacts.phonePrimary}`;
      },
      category: "Hotline",
      icon: PhoneCall,
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in form inputs
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.tagName === "SELECT"
      ) {
        return;
      }

      // '?' opens the hotkey modal
      if (e.key === "?" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      // 'Escape' closes
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
        return;
      }

      // If open, handle numeric / key triggers
      if (isOpen) {
        const match = hotkeys.find(
          (h) => h.key.toLowerCase() === e.key.toLowerCase()
        );
        if (match) {
          e.preventDefault();
          match.action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, hotkeys]);

  return (
    <>
      {/* Floating Keyboard Pill Trigger */}
      <button
        type="button"
        onClick={handleOpen}
        aria-label="Open keyboard shortcuts"
        className="fixed bottom-24 right-5 z-40 p-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-300 shadow-lg hover:border-[#1C2C34] text-slate-700 hover:text-[#1C2C34] transition-all hidden lg:flex items-center space-x-1.5 text-xs font-mono font-bold group hover:scale-105 active:scale-95"
      >
        <Keyboard className="w-4 h-4 text-[#D97706] group-hover:rotate-6 transition-transform" />
        <span className="text-[11px]">Shortcuts</span>
        <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 text-[10px] text-slate-600 font-bold">
          ?
        </kbd>
      </button>

      {/* Shortcuts Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="hotkey-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="relative bg-[#0F172A] border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 text-white shadow-2xl space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-[#F8BC26] text-[#1C2C34] flex items-center justify-center font-black">
                  <Keyboard className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="hotkey-title" className="text-lg font-bold tracking-tight text-white">
                    Power Trading Desk Hotkeys
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    Instant keyboard navigation across the platform
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Hotkeys Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
              {hotkeys.map((h) => {
                const Icon = h.icon;
                return (
                  <button
                    key={h.key}
                    type="button"
                    onClick={h.action}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 hover:border-[#F8BC26] text-left transition-all group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-xl bg-slate-900 text-slate-300 group-hover:text-[#F8BC26] transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-medium text-slate-200 group-hover:text-white">
                        {h.label}
                      </span>
                    </div>

                    <kbd className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-600 group-hover:border-[#F8BC26] group-hover:bg-[#F8BC26] group-hover:text-[#1C2C34] text-xs font-mono font-bold flex items-center justify-center text-slate-300 transition-colors shadow-inner flex-shrink-0">
                      {h.key}
                    </kbd>
                  </button>
                );
              })}
            </div>

            {/* Modal Footer Note */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">Esc</kbd> to dismiss</span>
              <span className="text-[#F8BC26]">Topnotch Power Trading Desk</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
