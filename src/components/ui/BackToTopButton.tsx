"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top of page"
      className="fixed bottom-20 md:bottom-6 right-20 sm:right-24 z-40 p-3 rounded-full bg-white border border-gray-200 text-[#1C2C34] hover:bg-[#F8BC26] hover:border-[#F8BC26] shadow-lg transition-all duration-200 hover:-translate-y-1 active:translate-y-0"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}
