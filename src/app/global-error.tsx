"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[GLOBAL APPLICATION CRASH]", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 font-sans p-6">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-gray-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-[#1C2C34]">Critical Platform Error</h1>
            <p className="text-xs text-gray-600">
              The root layout encountered an unrecoverable exception. Our technical team has been notified.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={() => reset()}
              className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#1C2C34] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#F8BC26] hover:text-[#1C2C34] transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              <span>Reload Platform</span>
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
