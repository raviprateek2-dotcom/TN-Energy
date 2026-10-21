"use client";

import React from "react";
import { Calendar } from "lucide-react";

interface DatePickerBrandedProps {
  value: string;
  onChange: (val: string) => void;
  min?: string;
  max?: string;
  label?: string;
}

export function DatePickerBranded({
  value,
  onChange,
  min,
  max,
  label = "Trading Date",
}: DatePickerBrandedProps) {
  return (
    <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-xl px-3 py-1.5 shadow-2xs hover:border-[#F8BC26] transition-colors focus-within:ring-2 focus-within:ring-[#F8BC26]">
      <Calendar className="w-4 h-4 text-[#F59E0B]" />
      <div className="flex flex-col">
        <span className="text-[9px] uppercase font-mono font-bold text-gray-500 tracking-wider">
          {label}
        </span>
        <input
          type="date"
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(e.target.value)}
          className="text-xs font-mono font-bold text-[#1C2C34] bg-transparent focus:outline-none cursor-pointer"
        />
      </div>
    </div>
  );
}
