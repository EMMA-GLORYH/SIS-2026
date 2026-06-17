"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

  /* Helper: reading time */
  const getReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <section className="py-14 sm:py-20 md:py-24 lg:py-28 bg-[#FAF9F6] border-t border-[#e6dcc9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-start">
          {/* Left Column: Section Info & Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 lg:sticky lg:top-8"
          >
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200/60 mb-3 sm:mb-5">
              Latest Update
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight mb-3 sm:mb-5">
              Stay informed with our latest announcements.
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base lg:text-lg mb-5 sm:mb-7 leading-relaxed max-w-md">
              We regularly publish important updates regarding events, academic
              policies, operations, and community milestones.
            </p>
            <Link href="/news">
              <Button
                variant="outline"
                size="sm"
                className="group !text-[9px] sm:!text-[10px] md:!text-[11px] !px-4 sm:!px-5 md:!px-6 !py-2 sm:!py-2.5"
              >
                More Announcements
                <ArrowRight
                  size={12}
                  className="ml-1.5 sm:ml-2 inline-block transform transition-transform duration-200 group-hover:translate-x-1"
                />
              </Button>
            </Link>
          </motion.div>

          {/* Right Column: Featured Announcement Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 w-full"
          >
            {loading ? (
              /* Skeleton Loader */
              <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 md:p-9 lg:p-12 shadow-sm space-y-4 sm:space-y-6">
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <div className="h-4 sm:h-5 bg-slate-100 rounded-full w-16 sm:w-24 animate-pulse" />
                  <div className="h-4 sm:h-5 bg-slate-100 rounded-full w-14 sm:w-20 animate-pulse" />
                </div>
                <div className="h-5 sm:h-7 md:h-8 bg-slate-100 rounded-lg w-4/5 animate-pulse" />
                <div className="space-y-2 sm:space-y-3">
                  <div className="h-3 sm:h-4 bg-slate-100 rounded-full w-full animate-pulse" />
                  <div className="h-3 sm:h-4 bg-slate-100 rounded-full w-11/12 animate-pulse" />
                  <div className="h-3 sm:h-4 bg-slate-100 rounded-full w-5/6 animate-pulse" />
                </div>
                <div className="h-4 sm:h-5 bg-slate-100 rounded-full w-20 sm:w-28 animate-pulse" />
              </div>
            ) : news ? (
              /* Featured News Card */
              <div className="group relative rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-7 md:p-9 lg:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)] hover:border-slate-300/80 transition-all duration-300">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-slate-400 text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-wide mb-4 sm:mb-5 md:mb-6">
                  <span className="flex items-center gap-1 sm:gap-1.5 text-emerald-600 bg-emerald-50 px-2 sm:px-2.5 py-0.5 rounded-md">
                    <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-500 animate-pulse" />
                    New
                  </span>
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <Calendar size={12} className="text-slate-400 sm:hidden" />
                    <Calendar
                      size={14}
                      className="text-slate-400 hidden sm:block"
                    />
                    <span>
                      {new Date(news.created_at).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <Clock size={12} className="text-slate-400 sm:hidden" />
                    <Clock
                      size={14}
                      className="text-slate-400 hidden sm:block"
                    />
                    <span>{getReadingTime(news.content)}</span>
                  </div>
                </div>

                {/* News Title */}
                <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#111111] mb-3 sm:mb-5 md:mb-6 tracking-tight leading-tight group-hover:text-amber-800 transition-colors duration-200">
                  {news.title}
                </h4>

                {/* News Body Text */}
                <p className="text-slate-600 leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg mb-5 sm:mb-7 md:mb-8 whitespace-pre-wrap line-clamp-6 sm:line-clamp-none">
                  {news.content}
                </p>

                {/* Read More Footer */}
                <div className="pt-4 sm:pt-5 md:pt-6 border-t border-slate-100 flex justify-between items-center">
                  <Link
                    href={`/news`}
                    className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-[#111111] hover:text-amber-800 transition-colors duration-200 group/link"
                  >
                    Read full announcement
                    <ArrowRight
                      size={12}
                      className="transform transition-transform duration-200 group-hover/link:translate-x-1 text-[#111111] group-hover/link:text-amber-800"
                    />
                  </Link>
                </div>
              </div>
            ) : (
              /* Empty State */
              <div className="rounded-2xl sm:rounded-3xl border-2 border-dashed border-slate-200 p-6 sm:p-10 md:p-12 text-center">
                <p className="text-slate-400 text-xs sm:text-sm font-medium">
                  No announcements are available at the moment. Check back soon
                  for updates.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}