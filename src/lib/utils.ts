import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency values in Indian Rupees (₹) with standard Indian numbering (Lakhs/Crores)
 */
export function formatINR(
  amount: number,
  options?: {
    decimals?: number;
    showSymbol?: boolean;
    compact?: boolean;
  }
): string {
  const { decimals = 2, showSymbol = true, compact = false } = options || {};
  const symbol = showSymbol ? "₹" : "";

  if (compact) {
    if (Math.abs(amount) >= 10000000) {
      return `${symbol}${(amount / 10000000).toFixed(decimals)} Cr`;
    }
    if (Math.abs(amount) >= 100000) {
      return `${symbol}${(amount / 100000).toFixed(decimals)} L`;
    }
  }

  const formattedNumber = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);

  return `${symbol}${formattedNumber}`;
}

/**
 * Format energy rate per kilowatt-hour (₹/kWh)
 */
export function formatPerKwh(rate: number, decimals: number = 2): string {
  return `₹${rate.toFixed(decimals)}/kWh`;
}

/**
 * Format power exchange rate per megawatt-hour (₹/MWh)
 */
export function formatPerMwh(rate: number, decimals: number = 0): string {
  return `₹${new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: decimals,
  }).format(rate)}/MWh`;
}

/**
 * Format power demand in kW, MW, kVA, or MVA with unit
 */
export function formatDemand(
  value: number,
  unit: "kVA" | "MVA" | "kW" | "MW" = "kVA",
  decimals: number = 1
): string {
  return `${new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)} ${unit}`;
}

/**
 * Convert 15-minute time block (1 to 96) to 24-hour time range string.
 * e.g., block 1 -> "00:00 - 00:15", block 96 -> "23:45 - 24:00"
 */
export function blockToTime(blockIndex: number): {
  start: string;
  end: string;
  label: string;
} {
  const normalizedBlock = Math.max(1, Math.min(96, blockIndex));
  const startMinutesTotal = (normalizedBlock - 1) * 15;
  const endMinutesTotal = normalizedBlock * 15;

  const startHour = Math.floor(startMinutesTotal / 60);
  const startMinute = startMinutesTotal % 60;

  const endHour = Math.floor(endMinutesTotal / 60);
  const endMinute = endMinutesTotal % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");
  const start = `${pad(startHour)}:${pad(startMinute)}`;
  const end = endHour === 24 ? "24:00" : `${pad(endHour)}:${pad(endMinute)}`;

  return {
    start,
    end,
    label: `${start} - ${end}`,
  };
}

/**
 * Convert time string "HH:MM" to 15-minute block number (1 to 96)
 */
export function timeToBlock(timeStr: string): number {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const totalMinutes = (hours || 0) * 60 + (minutes || 0);
  return Math.min(96, Math.max(1, Math.floor(totalMinutes / 15) + 1));
}
