"use client";

import Button from "./Button";

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
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/60 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-[2rem] bg-white shadow-2xl border border-slate-200">
        <div className="p-8">
          <h2 className="text-2xl font-black text-[#002147] mb-3">{title}</h2>
          <p className="text-slate-600 leading-relaxed mb-8">{message}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button variant="outline" size="md" onClick={onClose} className="w-full sm:w-auto">
              {cancelLabel}
            </Button>
            <Button variant="danger" size="md" onClick={onConfirm} className="w-full sm:w-auto">
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
