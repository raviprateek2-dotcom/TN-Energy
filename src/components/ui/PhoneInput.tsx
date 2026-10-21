"use client";

import React, { useMemo } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface PhoneInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
}

export function PhoneInput({
  value,
  onChange,
  placeholder = "98765 43210",
  disabled = false,
  error,
  required = false,
}: PhoneInputProps) {
  // Extract pure digits
  const rawDigits = useMemo(() => value.replace(/\D/g, "").slice(0, 10), [value]);

  // Format as "XXXXX XXXXX" for readable display
  const formattedDisplay = useMemo(() => {
    if (rawDigits.length <= 5) return rawDigits;
    return `${rawDigits.slice(0, 5)} ${rawDigits.slice(5)}`;
  }, [rawDigits]);

  const isValidPrefix = useMemo(() => {
    if (rawDigits.length === 0) return true;
    return /^[6-9]/.test(rawDigits);
  }, [rawDigits]);

  const carrierEstimate = useMemo(() => {
    if (rawDigits.length < 2) return null;
    const prefix2 = rawDigits.slice(0, 2);
    const prefix1 = rawDigits.charAt(0);
    if (!["6", "7", "8", "9"].includes(prefix1)) return "Invalid Prefix";
    if (["98", "99", "97", "88", "76", "95"].includes(prefix2)) return "Airtel / Vi Network";
    if (["70", "79", "80", "81", "82", "83", "86", "91", "92", "93"].includes(prefix2)) return "Jio / 5G Network";
    if (["94", "93", "89"].includes(prefix2)) return "BSNL / Enterprise";
    return "Indian Telecom Network";
  }, [rawDigits]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const trimmed = raw.slice(0, 10);
    onChange(trimmed);
  };

  return (
    <div className="space-y-1.5 w-full font-mono">
      <div
        className={`flex items-center rounded-xl border bg-white overflow-hidden transition-all focus-within:ring-2 focus-within:ring-[#F8BC26] focus-within:border-[#F8BC26] ${
          error || (!isValidPrefix && rawDigits.length > 0)
            ? "border-red-500"
            : "border-slate-300"
        } ${disabled ? "opacity-50 cursor-not-allowed bg-slate-50" : ""}`}
      >
        {/* Country Code Prefix */}
        <div className="flex items-center space-x-1 px-3 py-3 bg-slate-50 border-r border-slate-200 text-xs font-bold text-slate-700 select-none">
          <span aria-hidden="true">🇮🇳</span>
          <span>+91</span>
        </div>

        {/* Input */}
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          value={formattedDisplay}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className="flex-1 px-3.5 py-3 text-sm text-[#1C2C34] font-mono tracking-wider placeholder-slate-400 focus:outline-none bg-transparent"
        />

        {/* Carrier / Validation Tag */}
        {rawDigits.length === 10 && isValidPrefix && (
          <div className="pr-3 flex items-center space-x-1 text-[11px] text-emerald-700 select-none">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-semibold">{carrierEstimate}</span>
          </div>
        )}
      </div>

      {/* Validation Message */}
      {!isValidPrefix && rawDigits.length > 0 && (
        <p className="text-xs text-red-600 flex items-center space-x-1 pl-1">
          <AlertCircle className="w-3 h-3" />
          <span>Indian mobile numbers must start with 6, 7, 8, or 9</span>
        </p>
      )}

      {error && <p className="text-xs text-red-500 font-medium pl-1">{error}</p>}
    </div>
  );
}
