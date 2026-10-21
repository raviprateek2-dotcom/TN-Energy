import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, LucideIcon } from "lucide-react";
import { PageDivider, DividerType } from "@/components/ui/PageDivider";

export interface SplitImageMergeSectionProps {
  badgeText?: string;
  badgeIcon?: LucideIcon;
  title: React.ReactNode;
  description: string;
  bullets?: string[];
  imageUrl: string;
  imageAlt: string;
  imagePosition?: "right" | "left";
  primaryCta?: {
    label: string;
    href: string;
    isExternal?: boolean;
    icon?: LucideIcon;
  };
  secondaryCta?: {
    label: string;
    href: string;
    icon?: LucideIcon;
  };
  stats?: {
    value: string;
    label: string;
    sublabel?: string;
  }[];
  children?: React.ReactNode;
  dividerBottom?: boolean;
  dividerType?: DividerType;
  dividerFillColor?: string;
  dividerHeight?: number;
  className?: string;
}

/**
 * Split-Half Image Merge Section (Waaree-Grade Executive Banner)
 * Merges crisp corporate white canvas with bleeding high-resolution clean energy imagery
 * using multi-stop gradient masks for seamless visual integration.
 */
export function SplitImageMergeSection({
  badgeText,
  badgeIcon: BadgeIcon = CheckCircle2,
  title,
  description,
  bullets = [],
  imageUrl,
  imageAlt,
  imagePosition = "right",
  primaryCta,
  secondaryCta,
  stats,
  children,
  dividerBottom = false,
  dividerType = "layered-wave",
  dividerFillColor = "#0A0F1D",
  dividerHeight = 56,
  className = "",
}: SplitImageMergeSectionProps) {
  const isImageRight = imagePosition === "right";

  return (
    <section className={`relative bg-white text-[#1C2C34] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${className}`}>
      {/* Half-Bleed Merging Image Container */}
      <div
        className={`absolute top-0 bottom-0 w-full lg:w-3/5 pointer-events-none select-none overflow-hidden z-0 ${
          isImageRight ? "right-0" : "left-0"
        }`}
      >
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className={`object-cover ${
            isImageRight ? "object-center lg:object-right" : "object-center lg:object-left"
          } opacity-90`}
        />

        {/* Multi-Directional Gradient Masks for 100% Organic Fade */}
        {isImageRight ? (
          <>
            {/* Desktop Left-to-Right Fade */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 lg:via-white/70 to-transparent z-10" />
            {/* Mobile Vertical Fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-transparent lg:hidden z-10" />
          </>
        ) : (
          <>
            {/* Desktop Right-to-Left Fade */}
            <div className="absolute inset-0 bg-gradient-to-l from-white via-white/90 lg:via-white/70 to-transparent z-10" />
            {/* Mobile Vertical Fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-transparent lg:hidden z-10" />
          </>
        )}

        {/* Top & Bottom Ambient Edge Blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/70 z-10" />
      </div>

      {/* Foreground Content Container */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 ${
            !isImageRight ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Main Content Column */}
          <div className="max-w-2xl text-center lg:text-left space-y-5">
            {badgeText && (
              <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
                <BadgeIcon className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>{badgeText}</span>
              </div>
            )}

            <div className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1C2C34] tracking-tight leading-tight">
              {title}
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-sans">
              {description}
            </p>

            {bullets.length > 0 && (
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-slate-700">
                {bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Metric Stats Callouts (Optional) */}
            {stats && stats.length > 0 && (
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-200/90">
                {stats.map((s, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="text-2xl sm:text-3xl font-black font-mono text-[#1C2C34]">
                      {s.value}
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                      {s.label}
                    </div>
                    {s.sublabel && (
                      <div className="text-[11px] text-slate-400 font-sans">
                        {s.sublabel}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* CTAs */}
            {(primaryCta || secondaryCta) && (
              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    target={primaryCta.isExternal ? "_blank" : undefined}
                    rel={primaryCta.isExternal ? "noopener noreferrer" : undefined}
                    className="px-7 py-3.5 rounded-full bg-[#F8BC26] hover:bg-[#eab308] text-[#1C2C34] font-bold text-xs font-mono uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md hover:shadow-lg active:scale-95 group"
                  >
                    <span>{primaryCta.label}</span>
                    {primaryCta.icon ? (
                      <primaryCta.icon className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    )}
                  </Link>
                )}

                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs font-mono uppercase tracking-wider flex items-center space-x-2 transition-all"
                  >
                    {secondaryCta.icon && <secondaryCta.icon className="w-4 h-4 text-[#D97706]" />}
                    <span>{secondaryCta.label}</span>
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Right Custom Container or Form / Interactive Widget */}
          {children && (
            <div className="w-full lg:max-w-md flex-shrink-0">
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Optional Flowing SVG Bottom Page Divider */}
      {dividerBottom && (
        <div className="absolute bottom-0 inset-x-0 pointer-events-none">
          <PageDivider
            type={dividerType}
            fillColor={dividerFillColor}
            bgColor="#FFFFFF"
            position="bottom"
            height={dividerHeight}
          />
        </div>
      )}
    </section>
  );
}
