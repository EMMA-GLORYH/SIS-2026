"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Star as StarIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Comment {
  id: string;
  name: string;
  message: string;
  rating: number | null;
  created_at: string;
}

interface Review {
  name: string;
  role: string;
  message: string;
  rating: number;
  avatar: string | null;
}

export default function Testimonials() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  /* Slide state */
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  /* Touch swipe state */
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

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

  /* Responsive items per view */
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w >= 1024) setItemsPerView(3);
      else if (w >= 640) setItemsPerView(2);
      else setItemsPerView(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fallbackReviews: Review[] = [
    {
      name: "Kofi Asante",
      role: "Academic Director, Kumasi School",
      message:
        "Attendance tracking alone saved us hours every week. The system is intuitive and reliable.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=100",
    },
    {
      name: "Fatima Al-Rashid",
      role: "Operations Manager, Dubai International",
      message:
        "Our fee collection process became transparent. Parents know exactly what they owe and when.",
      rating: 4,
      avatar:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=100",
    },
    {
      name: "Samuel Okafor",
      role: "IT Manager, Port Harcourt Academy",
      message:
        "The student portal engagement increased dramatically. Kids actually use it to check grades.",
      rating: 4,
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100",
    },
    {
      name: "Amina Diallo",
      role: "Principal, Accra Lyceum",
      message:
        "We adopted the platform across three campuses. Onboarding was painless and support is excellent.",
      rating: 5,
      avatar: null,
    },
    {
      name: "Joseph Mensah",
      role: "Founder, EduTech Lagos",
      message:
        "An incredibly well-engineered system. Reliable, modern, and built for African institutions.",
      rating: 5,
      avatar: null,
    },
  ];

  const reviews: Review[] =
    comments.length > 0
      ? comments.map((c) => ({
          name: c.name,
          role: "",
          message: c.message,
          rating: c.rating ?? 5,
          avatar: null,
        }))
      : fallbackReviews;

  /* Pagination calculation */
  const totalPages = Math.ceil(reviews.length / itemsPerView);
  const startIdx = page * itemsPerView;
  const visibleReviews = reviews.slice(startIdx, startIdx + itemsPerView);

  /* Reset to first page when itemsPerView changes */
  useEffect(() => {
    setPage(0);
  }, [itemsPerView]);

  /* Navigation */
  const goNext = () => {
    if (page < totalPages - 1) {
      setDirection(1);
      setPage(page + 1);
    }
  };

  const goPrev = () => {
    if (page > 0) {
      setDirection(-1);
      setPage(page - 1);
    }
  };

  const goToPage = (p: number) => {
    setDirection(p > page ? 1 : -1);
    setPage(p);
  };

  /* Swipe handlers */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) goNext();
    if (distance < -minSwipeDistance) goPrev();

    touchStartX.current = null;
    touchEndX.current = null;
  };

  /* Slide animation variants */
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <section
      className="relative bg-[#0e0e0e] py-10 sm:py-16 md:py-22 lg:py-28 text-white overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(27, 91, 247, 0.06), transparent 50%),
          linear-gradient(to right, rgba(255, 255, 255, 0.07) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.07) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 30px 30px, 30px 30px",
      }}
    >
      <div className="absolute inset-0 bg-[#0e0e0e]/35 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-3 sm:px-5 md:px-6 z-10">
        {/* Header with navigation */}
        <div className="flex items-end justify-between gap-4 mb-6 sm:mb-10 md:mb-14 lg:mb-16">
          <div className="text-left flex-1 min-w-0">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white/60 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs tracking-[0.2em] sm:tracking-[0.22em] md:tracking-[0.25em] uppercase font-bold mb-1.5 sm:mb-2 md:mb-3"
            >
              Testimonial
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-tight"
            >
              Voice of Success
            </motion.h2>
          </div>

          {/* Top-right Navigation Arrows (visible when needed) */}
          {!loading && reviews.length > itemsPerView && (
            <motion.div
              initial={{ opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="flex gap-1.5 sm:gap-2 shrink-0"
            >
              <button
                onClick={goPrev}
                disabled={page === 0}
                aria-label="Previous testimonials"
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-white/15 active:scale-95"
              >
                <ArrowLeft size={13} className="sm:hidden" />
                <ArrowLeft size={15} className="hidden sm:block" />
              </button>
              <button
                onClick={goNext}
                disabled={page >= totalPages - 1}
                aria-label="Next testimonials"
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-white/15 active:scale-95"
              >
                <ArrowRight size={13} className="sm:hidden" />
                <ArrowRight size={15} className="hidden sm:block" />
              </button>
            </motion.div>
          )}
        </div>

        {/* Testimonials Loading / Carousel */}
        {loading ? (
          <div className="flex justify-center items-center h-28 sm:h-36 md:h-48">
            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 border-[3px] sm:border-4 border-[#1B5BF7] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Slide container with touch swipe */}
            <div
              className="relative min-h-[280px] sm:min-h-[320px] md:min-h-[360px] touch-pan-y select-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={page}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.25 },
                  }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-7 lg:gap-12"
                >
                  {visibleReviews.map((r, i) => (
                    <div
                      key={`${page}-${i}`}
                      className={`
                        flex flex-col items-center text-center group
                        rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-white/[0.025]
                        px-3 py-4 sm:px-4 sm:py-6 md:px-5 md:py-7
                        lg:border-transparent lg:bg-transparent lg:px-0 lg:py-0
                        transition-all duration-300
                      `}
                    >
                      {/* Stars */}
                      <div className="flex justify-center gap-0.5 sm:gap-1 mb-2.5 sm:mb-4 md:mb-5 lg:mb-6">
                        {[...Array(5)].map((_, j) => (
                          <StarIcon
                            key={j}
                            size={11}
                            className={`sm:hidden ${
                              j < r.rating
                                ? "fill-[#1B5BF7] text-[#1B5BF7] drop-shadow-[0_0_8px_rgba(27,91,247,0.4)]"
                                : "text-[#1B5BF7]/40"
                            }`}
                          />
                        ))}
                        {[...Array(5)].map((_, j) => (
                          <StarIcon
                            key={`md-${j}`}
                            size={14}
                            className={`hidden sm:block ${
                              j < r.rating
                                ? "fill-[#1B5BF7] text-[#1B5BF7] drop-shadow-[0_0_8px_rgba(27,91,247,0.4)]"
                                : "text-[#1B5BF7]/40"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold leading-relaxed mb-4 sm:mb-6 md:mb-7 lg:mb-8 max-w-sm transition-transform duration-300 group-hover:scale-[1.02]">
                        &ldquo;{r.message}&rdquo;
                      </p>

                      {/* Avatar */}
                      {r.avatar ? (
                        <img
                          src={r.avatar}
                          alt={r.name}
                          draggable={false}
                          className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full object-cover border-2 border-white/15 mb-2 sm:mb-3 md:mb-4 shadow-lg group-hover:border-[#1B5BF7]/50 transition-colors duration-300"
                        />
                      ) : (
                        <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 text-white flex items-center justify-center font-black text-sm sm:text-base md:text-lg border border-white/15 mb-2 sm:mb-3 md:mb-4 shadow-lg group-hover:border-[#1B5BF7]/50 transition-colors duration-300">
                          {r.name[0]?.toUpperCase() || "U"}
                        </div>
                      )}

                      {/* Author */}
                      <div className="flex flex-col items-center">
                        <p className="text-white font-bold text-xs sm:text-sm md:text-base tracking-wide group-hover:text-[#1B5BF7] transition-colors duration-300">
                          {r.name}
                        </p>
                        {r.role ? (
                          <p className="text-white/60 text-[9px] sm:text-[10px] md:text-xs lg:text-sm mt-0.5 sm:mt-1 max-w-[180px] sm:max-w-[200px] md:max-w-[220px] leading-relaxed">
                            {r.role}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Dots */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8 md:mt-10"
              >
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i)}
                    aria-label={`Go to page ${i + 1}`}
                    className={`h-[3px] sm:h-1 rounded-full transition-all duration-500 ${
                      page === i
                        ? "w-8 sm:w-10 md:w-12 bg-[#1B5BF7]"
                        : "w-2.5 sm:w-3 md:w-3.5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </motion.div>
            )}

            {/* Swipe hint (mobile only) */}
            {reviews.length > itemsPerView && (
              <p className="sm:hidden text-center text-white/30 text-[9px] mt-3 font-medium tracking-wider uppercase">
                Swipe to view more
              </p>
            )}
          </>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 sm:mt-12 md:mt-14 lg:mt-20 flex justify-center"
        >
          <Link
            href="/comments"
            className="group inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 border border-white/10 hover:border-white/30 hover:bg-white hover:text-[#0e0e0e] text-white text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] font-black uppercase tracking-[0.14em] sm:tracking-[0.16em] md:tracking-widest px-3 sm:px-4 md:px-6 lg:px-7 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.97]"
          >
            View all testimonials
            <ArrowRight
              size={10}
              className="sm:hidden group-hover:translate-x-0.5 transition-transform"
            />
            <ArrowRight
              size={11}
              className="hidden sm:block group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}