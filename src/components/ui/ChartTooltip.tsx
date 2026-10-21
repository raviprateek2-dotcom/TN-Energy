import React from "react";

interface ChartTooltipPayloadItem {
  name: string;
  value: number;
  color: string;
  dataKey?: string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: ChartTooltipPayloadItem[];
  label?: string;
  unit?: string;
  title?: string;
}

export function ChartTooltip({
  active,
  payload,
  label,
  unit = "₹/kWh",
  title,
}: ChartTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white/95 backdrop-blur-md border-2 border-[#F8BC26] rounded-xl p-3 shadow-xl text-xs space-y-1.5 z-50 min-w-[180px]">
      <div className="border-b border-gray-100 pb-1 mb-1">
        <span className="font-mono text-[10px] uppercase font-bold text-gray-500">
          {title || "Time Block"}
        </span>
        <p className="font-mono text-xs font-bold text-[#1C2C34]">{label}</p>
      </div>

      <div className="space-y-1">
        {payload.map((entry, idx) => (
          <div key={`item-${idx}`} className="flex items-center justify-between space-x-3">
            <div className="flex items-center space-x-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-[11px] text-gray-700 font-medium">{entry.name}</span>
            </div>
            <span className="font-mono font-bold text-[#1C2C34] tabular-nums">
              {typeof entry.value === "number" ? entry.value.toFixed(2) : entry.value} {unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
