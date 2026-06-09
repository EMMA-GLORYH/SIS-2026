"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "icon";

type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#002147] text-white border border-transparent hover:bg-blue-700 shadow-lg shadow-blue-950/10",
  secondary:
    "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 shadow-sm",
  outline:
    "bg-transparent text-[#002147] border border-slate-200 hover:bg-slate-50",
  ghost:
    "bg-white/10 text-slate-900 border border-transparent hover:bg-white/20",
  danger:
    "bg-red-500 text-white border border-transparent hover:bg-red-600 shadow-sm",
  icon:
    "bg-white/10 text-slate-900 border border-white/10 hover:bg-white/20 rounded-full",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-[11px] md:text-sm min-h-[36px]",
  md: "px-4 py-3 text-sm md:text-base min-h-[44px]",
  lg: "px-6 py-4 text-sm md:text-base min-h-[50px]",
  icon: "p-2",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

function mergeClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", fullWidth = false, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={mergeClasses(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth ? "w-full" : "inline-flex",
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

export default Button;
