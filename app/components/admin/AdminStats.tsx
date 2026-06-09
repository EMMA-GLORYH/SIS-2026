"use client";

import { Clock, FileText, MessageSquare } from "lucide-react";

interface AdminStatsProps {
  counts: {
    news: number;
    comments: number;
    pendingComments: number;
  };
  loading: boolean;
}

function StatCard({ label, value, icon, caption }: { label: string; value: number; icon: React.ReactNode; caption: string; }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold">{label}</p>
          <p className="mt-4 text-3xl font-black text-slate-900">{value}</p>
        </div>
        <div className="rounded-2xl bg-slate-100 p-3 text-slate-600">{icon}</div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-500">{caption}</p>
    </div>
  );
}

export default function AdminStats({ counts, loading }: AdminStatsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      <StatCard
        label="Pending reviews"
        value={loading ? 0 : counts.pendingComments}
        icon={<Clock size={20} />}
        caption="Comments waiting for approval or removal."
      />
      <StatCard
        label="Published news"
        value={loading ? 0 : counts.news}
        icon={<FileText size={20} />}
        caption="Announcements currently visible to visitors."
      />
      <StatCard
        label="Total comments"
        value={loading ? 0 : counts.comments}
        icon={<MessageSquare size={20} />}
        caption="Client feedback items collected so far."
      />
    </section>
  );
}
