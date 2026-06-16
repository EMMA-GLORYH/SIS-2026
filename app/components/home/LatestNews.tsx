"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Button from "@/app/components/ui/Button";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export default function LatestNews() {
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const { data, error } = await supabase
          .from("news")
          .select("id, title, content, created_at")
          .order("created_at", { ascending: false })
          .limit(1);

        if (error) {
          console.error("Latest news load error:", error.message);
        } else if (data && data.length > 0) {
          setNews(data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  // Helper to calculate reading time dynamically
  const getReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <section className="py-24 bg-[#FAF9F6] border-t border-[#e6dcc9]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Section Info & Action */}
          <div className="lg:col-span-5 lg:sticky lg:top-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200/60 mb-6">
              Latest Update
            </span>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight mb-6">
              Stay informed with our latest announcements.
            </h3>
            <p className="text-slate-600 text-base md:text-lg mb-8 leading-relaxed max-w-md">
              We regularly publish important updates regarding events, academic policies, operations, and community milestones.
            </p>
            <Link href="/news">
              <Button variant="outline" size="md" className="group">
                More Announcements 
                <ArrowRight size={16} className="ml-2 inline-block transform transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Right Column: Featured Announcement Card */}
          <div className="lg:col-span-7 w-full">
            {loading ? (
              // Sleek Skeleton Loader
              <div className="rounded-3xl border border-slate-200 bg-white p-8 md:p-12 shadow-sm space-y-6">
                <div className="flex gap-4">
                  <div className="h-5 bg-slate-100 rounded-full w-24 animate-pulse" />
                  <div className="h-5 bg-slate-100 rounded-full w-20 animate-pulse" />
                </div>
                <div className="h-8 bg-slate-100 rounded-lg w-4/5 animate-pulse" />
                <div className="space-y-3">
                  <div className="h-4 bg-slate-100 rounded-full w-full animate-pulse" />
                  <div className="h-4 bg-slate-100 rounded-full w-11/12 animate-pulse" />
                  <div className="h-4 bg-slate-100 rounded-full w-5/6 animate-pulse" />
                </div>
                <div className="h-5 bg-slate-100 rounded-full w-28 animate-pulse pt-2" />
              </div>
            ) : news ? (
              // Professional Featured News Card
              <div className="group relative rounded-3xl border border-slate-200/80 bg-white p-8 md:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)] hover:border-slate-300/80 transition-all duration-300">
                
                {/* Meta Header */}
                <div className="flex flex-wrap items-center gap-4 text-slate-400 text-xs font-semibold tracking-wide mb-6">
                  <span className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    New
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-slate-400" />
                    <span>{new Date(news.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-slate-400" />
                    <span>{getReadingTime(news.content)}</span>
                  </div>
                </div>

                {/* News Title */}
                <h4 className="text-2xl md:text-3xl font-bold text-[#111111] mb-6 tracking-tight leading-tight group-hover:text-amber-800 transition-colors duration-200">
                  {news.title}
                </h4>

                {/* News Body Text */}
                <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-8 whitespace-pre-wrap">
                  {news.content}
                </p>

                {/* Read More Footer */}
                <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                  <Link
                    href={`/news`}
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#111111] hover:text-amber-800 transition-colors duration-200 group/link"
                  >
                    Read full announcement
                    <ArrowRight size={14} className="transform transition-transform duration-200 group-hover/link:translate-x-1 text-[#111111] group-hover/link:text-amber-800" />
                  </Link>
                </div>

              </div>
            ) : (
              // Empty State
              <div className="rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center">
                <p className="text-slate-400 font-medium">
                  No announcements are available at the moment. Check back soon for updates.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}