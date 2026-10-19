import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-grid-emerald-500/30 bg-grid-emerald-500/10 text-grid-emerald-400",
        secondary:
          "border-grid-slate-700 bg-grid-navy-900 text-grid-slate-300",
        cyan:
          "border-grid-cyan-500/30 bg-grid-cyan-500/10 text-grid-cyan-400",
        amber:
          "border-grid-amber-500/30 bg-grid-amber-500/10 text-grid-amber-400",
        purple:
          "border-purple-500/30 bg-purple-500/10 text-purple-400",
        destructive:
          "border-red-500/30 bg-red-500/10 text-red-400",
        outline:
          "border-grid-slate-700 text-grid-slate-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
