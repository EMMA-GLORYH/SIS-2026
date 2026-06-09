"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RefreshCcw, PlusCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { isSupportUser } from "@/lib/support";
import Button from "@/app/components/ui/Button";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  author?: string;
  created_at: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      setNews([]);
    } else {
      setNews(data ?? []);
    }

    setLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAdmin(isSupportUser(session?.user?.email ?? null));
      fetchNews();
    };

    init();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold">News & Updates</p>
            <h1 className="text-3xl sm:text-4xl font-black text-[#002147] mt-3">Latest Announcements</h1>
            <p className="mt-3 max-w-2xl text-slate-600 leading-relaxed">Stay informed with the latest news, releases, and updates from NGI Services.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={fetchNews} variant="primary" size="sm" className="gap-2" disabled={loading}>
              <RefreshCcw size={14} className={loading ? "animate-spin" : ""} /> Refresh
            </Button>
            {isAdmin && (
              <Link href="/admin/news" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs uppercase tracking-widest text-[#002147] hover:bg-slate-50 transition-all">
                <PlusCircle size={14} /> Manage News
              </Link>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
              <p className="font-bold">Unable to load news</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-400 animate-pulse">Loading latest news...</div>
          ) : news.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
              <p className="text-xl font-bold text-slate-800">No news yet</p>
              <p className="mt-2 text-slate-500">Check back later for announcements and updates.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {news.map((item) => (
                <article key={item.id} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-black text-[#002147]">{item.title}</h2>
                      <p className="mt-3 text-slate-600 leading-relaxed whitespace-pre-wrap">{item.content}</p>
                    </div>
                    <div className="text-right text-slate-400 text-[10px] uppercase tracking-[0.3em] font-bold">
                      <p>{item.author || "NGI Services"}</p>
                      <p className="mt-3 text-[11px] text-slate-500">{new Date(item.created_at).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
