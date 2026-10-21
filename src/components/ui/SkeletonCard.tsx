import React from "react";

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-gray-100/90 border border-gray-200/60 p-6 space-y-4 ${className}`}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 rounded-xl bg-gray-200" />
        <div className="w-20 h-5 rounded-full bg-gray-200" />
      </div>
      <div className="w-3/4 h-6 rounded-md bg-gray-200" />
      <div className="space-y-2">
        <div className="w-full h-4 rounded-md bg-gray-200" />
        <div className="w-5/6 h-4 rounded-md bg-gray-200" />
      </div>
      <div className="pt-4 border-t border-gray-200 flex justify-between">
        <div className="w-1/3 h-4 rounded-md bg-gray-200" />
        <div className="w-1/4 h-4 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}
