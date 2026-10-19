import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-xs font-mono font-bold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-grid-emerald-500 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-grid-emerald-500 text-grid-navy-950 shadow-lg shadow-grid-emerald-500/20 hover:bg-grid-emerald-400 active:scale-[0.98]",
        primary:
          "bg-grid-emerald-500 text-grid-navy-950 shadow-lg shadow-grid-emerald-500/20 hover:bg-grid-emerald-400 active:scale-[0.98]",
        secondary:
          "bg-grid-navy-900 border border-grid-slate-700 text-white hover:bg-grid-navy-800 hover:border-grid-slate-600",
        outline:
          "border border-grid-slate-700 bg-transparent text-grid-slate-300 hover:bg-grid-navy-900 hover:text-white",
        ghost:
          "text-grid-slate-400 hover:bg-grid-navy-900 hover:text-white",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20",
        cyan:
          "bg-grid-cyan-500 text-grid-navy-950 shadow-lg shadow-grid-cyan-500/20 hover:bg-grid-cyan-400",
        amber:
          "bg-grid-amber-500 text-grid-navy-950 shadow-lg shadow-grid-amber-500/20 hover:bg-grid-amber-400",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-[11px]",
        lg: "h-12 rounded-xl px-6 text-sm",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
