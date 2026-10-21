import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SolutionCardProps {
  title: string;
  description: string;
  slug: string;
  icon: React.ReactNode;
  kpi: string;
  badge?: string;
}

export function SolutionCard({
  title,
  description,
  slug,
  icon,
  kpi,
  badge,
}: SolutionCardProps) {
  return (
    <Link
      href={`/solutions/${slug}`}
      className="group relative flex flex-col justify-between p-7 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-l-4 hover:border-l-[#F8BC26] hover:-translate-y-1.5 active:-translate-y-0.5 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#F8BC26] focus-visible:outline-none"
    >
      <div className="space-y-4">
        {/* Header Row: Icon + Badge */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-xl bg-amber-50/80 border border-amber-200/60 flex items-center justify-center text-[#1C2C34] group-hover:bg-[#F8BC26] transition-colors duration-300">
            {icon}
          </div>
          {badge && (
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-[#10B981] border border-emerald-200/60">
              {badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-[#1C2C34] tracking-tight group-hover:text-amber-700 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      {/* Footer KPI & CTA Link */}
      <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs font-mono font-bold text-gray-700">
          {kpi}
        </span>
        <span className="inline-flex items-center text-xs font-bold text-[#1C2C34] group-hover:text-[#F8BC26] transition-colors">
          <span>Explore Solution</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}
