"use client";

import React, { useState } from "react";
import { ShieldCheck, Lock, FileText, CheckCircle2, X, Printer, Loader2 } from "lucide-react";
import { BRAND } from "@/lib/constants/brand";

export interface NdaExecutionData {
  certificateId: string;
  companyName: string;
  signatoryName: string;
  designation: string;
  executedAt: string;
}

interface BilateralNdaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: (data: NdaExecutionData) => void;
  defaultCompany?: string;
}

export function BilateralNdaModal({
  isOpen,
  onClose,
  onAccept,
  defaultCompany = "",
}: BilateralNdaModalProps) {
  const [companyName, setCompanyName] = useState(defaultCompany);
  const [signatoryName, setSignatoryName] = useState("");
  const [designation, setDesignation] = useState("Chief Financial Officer / Plant Head");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) {
      setError("Please provide your registered corporate entity name.");
      return;
    }
    if (!signatoryName.trim()) {
      setError("Please provide the authorized signatory's full name.");
      return;
    }
    if (!agreed) {
      setError("You must acknowledge and accept the statutory non-disclosure covenants.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const certificateId = `NDA-TES-${Date.now().toString(36).toUpperCase()}`;
    const execution: NdaExecutionData = {
      certificateId,
      companyName: companyName.trim(),
      signatoryName: signatoryName.trim(),
      designation: designation.trim(),
      executedAt: new Date().toISOString(),
    };

    setTimeout(() => {
      setSubmitting(false);
      onAccept(execution);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 font-sans">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black tracking-tight">
                Bilateral Non-Disclosure &amp; Bill Data Custody Undertaking
              </h3>
              <p className="text-[10px] font-mono text-slate-400">
                Grounded in Information Technology Act 2000 (Sec 43A, 72A) &amp; Electricity Act 2003
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Legal Text & Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-mono">
              {error}
            </div>
          )}

          {/* Legal Undertaking Scroll Box */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 max-h-48 overflow-y-auto text-xs font-mono text-slate-700 space-y-3 leading-relaxed">
            <div className="font-bold text-slate-900 text-[11px] uppercase tracking-wider">
              Statutory Custody &amp; Confidentiality Covenants
            </div>
            <p>
              <strong>1. Parties &amp; Purpose:</strong> This Bilateral Undertaking is entered between{" "}
              <strong>Topnotch Energy Solutions</strong> (CERC Cat-IV Trading Desk &amp; BEE Certified Energy Audit Practice)
              and the Disclosing Industrial Consumer for the sole purpose of technical bill auditing, contract demand rationalization, and open access feasibility evaluation.
            </p>
            <p>
              <strong>2. Absolute Confidentiality:</strong> Topnotch covenants that all electricity invoices, ToD meter dumps, kVAh billing logs, sanctioned loads, and commercial financial data shall be treated as privileged trade secrets.
            </p>
            <p>
              <strong>3. Zero Third-Party Transmission:</strong> Under Section 72A of the Information Technology Act, 2000, no disclosed data shall ever be sold, transmitted, or syndicated to third parties, brokers, or external entities without written board sanction.
            </p>
            <p>
              <strong>4. Data Custody &amp; Erasure:</strong> Invoices are parsed in memory using AES-256 encrypted channels. The consumer holds the perpetual right to demand complete cryptographic erasure of diagnostic telemetry upon receipt of the final report.
            </p>
          </div>

          {/* Signatory Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1C2C34] font-mono">
                Corporate Entity / Factory Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Varun Beverages Ltd"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#F8BC26] focus:border-[#F8BC26]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1C2C34] font-mono">
                Authorized Signatory Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={signatoryName}
                onChange={(e) => setSignatoryName(e.target.value)}
                placeholder="e.g. Rajeev Singhal"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#F8BC26] focus:border-[#F8BC26]"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-[#1C2C34] font-mono">
                Corporate Designation / Title
              </label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="e.g. Director of Finance / Plant Head"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#F8BC26] focus:border-[#F8BC26]"
              />
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div className="flex items-start space-x-2.5 pt-1">
            <input
              type="checkbox"
              id="nda-agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="nda-agree" className="text-xs text-slate-700 leading-normal font-mono">
              I am an authorized officer executing this bilateral non-disclosure agreement on behalf of the company and acknowledge mutual custody protection.
            </label>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-mono text-xs font-bold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !agreed}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Executing Agreement...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Execute Bilateral NDA &amp; Unlock Audit</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
