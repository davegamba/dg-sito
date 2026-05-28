"use client";

import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "gold";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[#00CBDB] text-[#080810] font-semibold hover:bg-[#00b8c7] active:scale-[0.98] shadow-[0_0_24px_#00cbdb33]",
  secondary:
    "bg-transparent border border-[#00CBDB] text-[#00CBDB] font-medium hover:bg-[#00cbdb11] active:scale-[0.98]",
  ghost:
    "bg-transparent text-[#F0F0F0] font-medium hover:text-[#00CBDB] active:scale-[0.98]",
  gold:
    "bg-[#F0C040] text-[#080810] font-semibold hover:bg-[#e0b030] active:scale-[0.98] shadow-[0_0_24px_#f0c04033]",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-[8px]",
  md: "px-6 py-3 text-base rounded-[10px]",
  lg: "px-8 py-4 text-lg rounded-[12px]",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer select-none",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
