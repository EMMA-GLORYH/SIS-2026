"use client";

interface AdminInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function AdminInput({ label, value, onChange, placeholder }: AdminInputProps) {
  return (
    <div>
      <label className="block text-[9px] font-black text-[#FAF9F6]/40 uppercase tracking-[0.2em] mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#222] rounded-xl text-[#FAF9F6] text-sm placeholder:text-[#FAF9F6]/20 focus:outline-none focus:border-[#FAF9F6]/30 transition-colors"
      />
    </div>
  );
}