"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[301] w-full max-w-md"
          >
            <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden mx-4">
              <div className="flex items-start gap-4 p-6 pb-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle size={20} className="text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#111111] font-black text-base">{title}</h3>
                  <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{message}</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex items-center gap-3 px-6 pb-6 pt-2">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-[#111111] font-bold text-xs uppercase tracking-wider hover:bg-gray-100 transition-all"
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={() => { onConfirm(); onClose(); }}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white font-bold text-xs uppercase tracking-wider hover:bg-red-600 transition-all"
                >
                  {confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}