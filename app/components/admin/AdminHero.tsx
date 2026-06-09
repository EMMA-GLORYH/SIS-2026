"use client";

import Link from "next/link";
import { ExternalLink, MessageSquare, Newspaper } from "lucide-react";
import Button from "@/app/components/ui/Button";

interface AdminHeroProps {
  name?: string;
  loading: boolean;
}

export default function AdminHero({ name, loading }: AdminHeroProps) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400 font-bold">Admin portal</p>
          <h1 className="mt-3 text-3xl font-black text-slate-900 tracking-tight">Welcome back{!loading && name ? `, ${name.split(" ")[0]}` : ""}.</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            This dashboard is your home for announcements and client review moderation. Keep the public feed polished and make every comment count.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:justify-end">
          <Link href="/admin/news" className="inline-flex min-w-[140px]">
            <Button variant="primary" size="sm" fullWidth>
              <Newspaper size={16} /> Manage News
            </Button>
          </Link>
          <Link href="/admin/comments" className="inline-flex min-w-[140px]">
            <Button variant="outline" size="sm" fullWidth>
              <MessageSquare size={16} /> Review Comments
            </Button>
          </Link>
          <Link href="/" className="inline-flex min-w-[140px]">
            <Button variant="secondary" size="sm" fullWidth>
              <ExternalLink size={16} /> View Public Site
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
