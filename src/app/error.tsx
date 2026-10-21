"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertOctagon, RotateCcw, Home, MessageSquare } from "lucide-react";
import { BRAND } from "@/lib/constants/brand";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[APPLICATION RUNTIME INTERRUPT]", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white px-4 py-16">
      <div className="max-w-xl w-full text-center space-y-8">
        
        {/* Error Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 border border-red-200 shadow-sm text-[#EF4444]">
          <AlertOctagon className="w-10 h-10 animate-pulse" />
        </div>

        {/* Message */}
        <div className="space-y-3">
          <p className="text-xs font-mono uppercase tracking-[0.25em] font-bold text-red-600">
            System Synchronization Exception
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C2C34] tracking-tight">
            Unexpected Grid Interruption
          </h1>
          <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
            Our market intelligence engine encountered an unexpected runtime fault while synchronizing market data. Your connection has been safely isolated.
          </p>
          {error.digest && (
            <p className="text-[11px] font-mono text-gray-400">
              Diagnostic Token: {error.digest}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center px-6 py-3.5 rounded-full bg-[#1C2C34] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#F8BC26] hover:text-[#1C2C34] transition-all shadow-md active:scale-95"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            <span>Retry Connection</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center px-6 py-3.5 rounded-full border border-gray-300 bg-white text-[#1C2C34] font-bold text-xs uppercase tracking-wider hover:border-[#F8BC26] transition-all shadow-sm"
          >
            <Home className="w-4 h-4 mr-2" />
            <span>Go to Homepage</span>
          </Link>

          <a
            href={BRAND.contacts.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3.5 rounded-full bg-[#10B981] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#059669] transition-all shadow-md"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            <span>Contact Desk</span>
          </a>
        </div>
      </div>
    </div>
  );
}
