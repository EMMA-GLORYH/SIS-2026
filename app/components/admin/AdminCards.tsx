"use client";

import Button from "@/app/components/ui/Button";
import { Newspaper, MessageSquare } from "lucide-react";

interface AdminCardsProps {
  onNewsClick?: () => void;
  onCommentsClick?: () => void;
}

export default function AdminCards({ onNewsClick, onCommentsClick }: AdminCardsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-slate-100 p-3 text-slate-600">
            <Newspaper size={18} />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900">Announcements</h2>
            <p className="mt-2 text-sm text-slate-500">Create, edit, or delete news posts visible on the public homepage.</p>
          </div>
        </div>
        <div className="mt-6">
          <Button variant="outline" size="sm" fullWidth onClick={onNewsClick}>
            Open News Control
          </Button>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-slate-100 p-3 text-slate-600">
            <MessageSquare size={18} />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900">Reviews</h2>
            <p className="mt-2 text-sm text-slate-500">Moderate user comments and keep client feedback safe and professional.</p>
          </div>
        </div>
        <div className="mt-6">
          <Button variant="outline" size="sm" fullWidth onClick={onCommentsClick}>
            Open Moderation
          </Button>
        </div>
      </div>
    </section>
  );
}
