import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Calculator, TrendingUp, PhoneCall, ShieldAlert } from "lucide-react";
import { BRAND } from "@/lib/constants/brand";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-white px-4 py-16">
      <div className="max-w-2xl w-full text-center space-y-8">
        
        {/* Visual Badge */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-50 border border-amber-200 shadow-sm text-[#F59E0B]">
          <ShieldAlert className="w-10 h-10" />
        </div>

        {/* Heading & Context */}
        <div className="space-y-3">
          <p className="text-xs font-mono uppercase tracking-[0.25em] font-bold text-amber-600">
            Error 404 · Route Not Dispatched
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1C2C34] tracking-tight">
            Grid Substation Feeder Unavailable
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-lg mx-auto leading-relaxed">
            The power trading page or regulatory filing you requested could not be located in our transmission schedule. Please return to the main dashboard or verify your tariff calculator parameters.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3.5 rounded-full bg-[#1C2C34] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#F8BC26] hover:text-[#1C2C34] transition-all shadow-md"
          >
            <Home className="w-4 h-4 mr-2" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/tools/open-access-calculator"
            className="inline-flex items-center px-6 py-3.5 rounded-full border border-gray-300 bg-white text-[#1C2C34] font-bold text-xs uppercase tracking-wider hover:border-[#F8BC26] hover:bg-amber-50/50 transition-all shadow-sm"
          >
            <Calculator className="w-4 h-4 mr-2 text-[#F59E0B]" />
            <span>Open Access Calculator</span>
          </Link>

          <a
            href={BRAND.contacts.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3.5 rounded-full bg-[#10B981] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#059669] transition-all shadow-md"
          >
            <PhoneCall className="w-4 h-4 mr-2" />
            <span>24x7 WhatsApp Desk</span>
          </a>
        </div>

        {/* Footer Meta */}
        <div className="pt-6 border-t border-gray-100 text-xs text-gray-400 font-mono">
          <span>Topnotch Energy Solutions · CERC Category-IV Advisory Desk</span>
        </div>
      </div>
    </div>
  );
}
