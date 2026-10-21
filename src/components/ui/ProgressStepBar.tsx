import React from "react";
import { Check } from "lucide-react";

interface Step {
  id: number;
  name: string;
}

interface ProgressStepBarProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepId: number) => void;
}

export function ProgressStepBar({
  steps,
  currentStep,
  onStepClick,
}: ProgressStepBarProps) {
  return (
    <div className="w-full py-4 select-none">
      <div className="flex items-center justify-between relative">
        
        {/* Background Connecting Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0" />
        
        {/* Active Progress Line */}
        <div
          className="absolute top-1/2 left-0 h-1 bg-[#10B981] -translate-y-1/2 z-0 transition-all duration-300"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center group cursor-pointer"
              onClick={() => onStepClick && onStepClick(step.id)}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-200 border-2 ${
                  isCompleted
                    ? "bg-[#10B981] border-[#10B981] text-white"
                    : isCurrent
                    ? "bg-[#1C2C34] border-[#F8BC26] text-white shadow-md ring-4 ring-amber-100"
                    : "bg-white border-gray-300 text-gray-500"
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : step.id}
              </div>

              <span
                className={`mt-2 text-[11px] font-mono tracking-tight text-center max-w-[80px] hidden sm:block ${
                  isCurrent ? "font-bold text-[#1C2C34]" : "text-gray-500"
                }`}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
