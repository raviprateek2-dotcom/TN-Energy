"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from "lucide-react";

interface HeroSlide {
  url: string;
  alt: string;
  caption: string;
  telemetryTag: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    url: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=2000&q=80",
    alt: "Utility-scale industrial solar farm and transmission infrastructure",
    caption: "Utility Solar & Inter-State Transmission Grid",
    telemetryTag: "ISTS 400 kV Grid",
  },
  {
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80",
    alt: "National power grid dispatch control room telemetry monitors",
    caption: "National Grid Dispatch & Real-Time SCADA Floor",
    telemetryTag: "15-Min Bourse Desk",
  },
  {
    url: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2000&q=80",
    alt: "High-voltage transmission pylon corridor under ambient dusk lighting",
    caption: "Heavy Industrial High-Tension Transmission Corridors",
    telemetryTag: "66 kV / 132 kV Bay",
  },
  {
    url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=2000&q=80",
    alt: "Industrial wind turbine array along coastal manufacturing belt",
    caption: "Megawatt Wind-Solar Hybrid Group Captive Parks",
    telemetryTag: "WSH Zero-CSS Assets",
  },
  {
    url: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=2000&q=80",
    alt: "Industrial factory PEB shed rooftop solar installation",
    caption: "Behind-the-Meter TOPCon Bifacial Factory Rooftops",
    telemetryTag: "₹1.55/kWh LCOE",
  },
  {
    url: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=2000&q=80",
    alt: "Heavy step-down power substation transformers and switchyard",
    caption: "Turnkey CEA Class 0.2s ABT Metering Bays",
    telemetryTag: "NABL Calibrated",
  },
];

const SLIDE_DURATION_MS = 10000; // 10 seconds per image

export function HeroBackgroundCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, [isPlaying, nextSlide]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* 6 Seamless Cross-Fading Images */}
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={slide.url}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-35" : "opacity-0"
            }`}
          >
            <Image
              src={slide.url}
              alt={slide.alt}
              fill
              priority={idx === 0}
              sizes="100vw"
              className={`object-cover object-center transition-transform duration-[10000ms] ease-out ${
                isActive ? "scale-105" : "scale-100"
              }`}
            />
          </div>
        );
      })}

      {/* Deep Blue Corporate Gradient Overlays for Maximum Contrast & Authority */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B]/95 via-[#0F172A]/85 to-[#0F172A]/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-black/40" />

      {/* Ambient Gold Radial Flare */}
      <div className="absolute -top-24 right-1/4 w-96 h-96 bg-[#F8BC26]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Interactive Floating Carousel Control Pill (Bottom Right) */}
      <div className="absolute bottom-24 right-4 sm:right-8 z-30 pointer-events-auto flex items-center space-x-3 bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white text-xs font-mono shadow-xl">
        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-1 rounded-full hover:bg-white/15 transition-colors text-slate-300 hover:text-white"
          title={isPlaying ? "Pause rotation (10s)" : "Resume rotation"}
          aria-label={isPlaying ? "Pause hero rotation" : "Resume hero rotation"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        {/* Current Tag & Counter */}
        <div className="hidden sm:flex items-center space-x-2">
          <span className="text-[10px] uppercase font-bold text-[#F8BC26]">
            {HERO_SLIDES[currentIndex].telemetryTag}
          </span>
          <span className="text-white/40">|</span>
        </div>

        <span className="text-slate-200 text-[11px] font-bold">
          0{currentIndex + 1} / 0{HERO_SLIDES.length}
        </span>

        {/* Navigation Arrows */}
        <div className="flex items-center space-x-1 pl-1 border-l border-white/20">
          <button
            type="button"
            onClick={prevSlide}
            className="p-1 rounded-full hover:bg-white/20 transition-colors text-slate-200 hover:text-white"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="p-1 rounded-full hover:bg-white/20 transition-colors text-slate-200 hover:text-white"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Discrete 10-Second Auto-Fill Progress Line */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10 z-20">
        <div
          key={currentIndex}
          className="h-full bg-gradient-to-r from-[#F8BC26] to-[#10B981] animate-in"
          style={{
            animation: isPlaying ? `heroProgress ${SLIDE_DURATION_MS}ms linear forwards` : "none",
            width: isPlaying ? "100%" : "0%",
          }}
        />
      </div>
    </div>
  );
}