"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Star as StarIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Comment {
  id: string;
  name: string;
  message: string;
  rating: number | null;
  created_at: string;
}

export default function Testimonials() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await supabase
          .from("comments")
          .select("id, name, message, rating, created_at")
          .eq("is_reviewed", true)
          .eq("is_visible", true)
          .order("created_at", { ascending: false });

        if (data && data.length > 0) {
          setComments(data);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  const fallbackReviews = [
    {
      name: "Kofi Asante",
      role: "Academic Director, Kumasi School",
      message: "Attendance tracking alone saved us hours every week. The system is intuitive and reliable.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=100",
    },
    {
      name: "Fatima Al-Rashid",
      role: "Operations Manager, Dubai International",
      message: "Our fee collection process became transparent. Parents know exactly what they owe and when.",
      rating: 4,
      avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=100",
    },
    {
      name: "Samuel Okafor",
      role: "IT Manager, Port Harcourt Academy",
      message: "The student portal engagement increased dramatically. Kids actually use it to check grades.",
      rating: 4,
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100",
    },
  ];

  // Map database comments to standard shape, otherwise use fallback data
  const reviews = comments.length > 0
    ? comments.map((c) => ({
        name: c.name,
        role: "",
        message: c.message,
        rating: c.rating ?? 5,
        avatar: null as string | null,
      }))
    : fallbackReviews;

  // Render exactly the first 3 testimonials
  const displayedReviews = reviews.slice(0, 3);

  return (
    <section 
      className="relative bg-[#0e0e0e] py-24 text-white overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(27, 91, 247, 0.06), transparent 50%),
          linear-gradient(to right, rgba(255, 255, 255, 0.07) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.07) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 40px 40px, 40px 40px",
      }}
    >
      <div className="relative max-w-6xl mx-auto px-6 z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-white/60 text-sm tracking-[0.25em] uppercase font-bold mb-3">
            Testimonial
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Voice of Success
          </h2>
        </div>

        {/* Testimonials Loading / Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="w-8 h-8 border-4 border-[#1B5BF7] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {displayedReviews.map((r, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center group"
              >
                {/* Stars centered */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <StarIcon
                      key={j}
                      size={16}
                      className={
                        j < r.rating
                          ? "fill-[#1B5BF7] text-[#1B5BF7] drop-shadow-[0_0_8px_rgba(27,91,247,0.4)]"
                          : "text-[#1B5BF7]/40"
                      }
                    />
                  ))}
                </div>

                {/* Quote centered with generous spacing */}
                <p className="text-white text-lg sm:text-xl font-bold leading-relaxed mb-8 max-w-sm transition-transform duration-300 group-hover:scale-[1.02]">
                  "{r.message}"
                </p>

                {/* Avatar centered below quote */}
                {r.avatar ? (
                  <img
                    src={r.avatar}
                    alt={r.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white/15 mb-4 shadow-lg group-hover:border-[#1B5BF7]/50 transition-colors duration-300"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center font-black text-lg border border-white/15 mb-4 shadow-lg group-hover:border-[#1B5BF7]/50 transition-colors duration-300">
                    {r.name[0]?.toUpperCase() || "U"}
                  </div>
                )}

                {/* Author Name & Role */}
                <div className="flex flex-col items-center">
                  <p className="text-white font-bold text-base tracking-wide group-hover:text-[#1B5BF7] transition-colors duration-300">
                    {r.name}
                  </p>
                  {r.role ? (
                    <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-[220px] leading-relaxed">
                      {r.role}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Optional View All Button */}
        <div className="mt-20 flex justify-center">
          <Link
            href="/comments"
            className="inline-flex items-center gap-3 border border-white/10 hover:border-white/30 hover:bg-white hover:text-[#0e0e0e] text-white text-[11px] font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
          >
            View all testimonials <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}