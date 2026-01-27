// app/components/ui/Card.tsx
"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type CardProps = {
  children: ReactNode;
  className?: string;
  accentColor?: string;
  variant?: "default" | "gradient" | "elevated" | "outlined";
};

export default function Card({ 
  children, 
  className = "", 
  accentColor,
  variant = "default" 
}: CardProps) {
  
  const variants = {
    default: "bg-white border border-slate-200",
    gradient: "bg-gradient-to-br from-white to-slate-50 border border-slate-200",
    elevated: "bg-white border-none shadow-lg",
    outlined: "bg-transparent border-2 border-slate-300"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className={`
        relative
        ${variants[variant]}
        rounded-2xl 
        p-6 
        shadow-sm 
        hover:shadow-2xl 
        transition-all 
        duration-500 
        ease-out
        overflow-hidden
        group
        ${className}
      `}
    >
      {/* Animated gradient overlay on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-50/0 via-indigo-50/0 to-purple-50/0 group-hover:from-blue-50/30 group-hover:via-indigo-50/20 group-hover:to-purple-50/30 transition-all duration-700 ease-out" />
      
      {/* Top-left accent stripe with animation */}
      {accentColor && (
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "3rem" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute top-0 left-0 w-1 rounded-tl-2xl"
          style={{ backgroundColor: accentColor }}
        />
      )}

      {/* Animated corner accent */}
      <motion.div 
        className="absolute -top-10 -right-10 w-32 h-32 bg-linear-to-br from-blue-100/30 to-indigo-100/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />

      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}