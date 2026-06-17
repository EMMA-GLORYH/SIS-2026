"use client";

interface EmptyStateProps {
  icon: React.ElementType;
  title: string;
  desc: string;
}

export default function EmptyState({ icon: Icon, title, desc }: EmptyStateProps) {
  return (
    <div className="text-center py-20">
      <div className="w-16 h-16 rounded-2xl bg-[#FAF9F6]/5 border border-[#222] flex items-center justify-center mx-auto mb-4">
        <Icon size={28} className="text-[#FAF9F6]/15" />
      </div>
      <h3 className="text-[#FAF9F6]/30 font-black text-sm uppercase tracking-wider mb-1">
        {title}
      </h3>
      <p className="text-[#FAF9F6]/15 text-xs">{desc}</p>
    </div>
  );
}