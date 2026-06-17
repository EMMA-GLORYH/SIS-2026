"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Check, AlertTriangle } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function AdminToast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: -20, x: "-50%" }}
      className={`fixed top-6 left-1/2 z-[300] flex items-center gap-3 px-6 py-3.5 rounded-2xl shadow-2xl border ${
        type === "success" ? "bg-[#111] border-green-500/20" : "bg-[#111] border-red-500/20"
      } text-[#FAF9F6]`}
    >
      {type === "success" ? (
        <Check size={16} className="text-green-400" />
      ) : (
        <AlertTriangle size={16} className="text-red-400" />
      )}
      <span className="text-xs font-bold uppercase tracking-wider">{message}</span>
    </motion.div>
  );
}