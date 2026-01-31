"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  Zap, 
  Cpu,
  Star as StarIcon,
  ThumbsUp,
  MessageSquare,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/app/supabaselogic/supabaseClient";

// --- TYPES ---
interface Comment {
  id: string;
  name: string;
  message: string;
  rating: number;
  created_at: string;
}

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070"
];

const TECH_STACK = [
  { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/black" },
  { name: "AWS", logo: "https://cdn.simpleicons.org/amazonaws/232F3E" },
  { name: "React", logo: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "Tailwind", logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
];

export default function HomePage() {
  return (
    <main className="bg-white overflow-x-hidden">
      <HeroSlider />
      <TechStackStrip />
      <InstitutionalServices />
      <Testimonials />
    </main>
  );
}

/* ===================== */
/* 1. CINEMATIC HERO     */
/* ===================== */
function HeroSlider() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  const prev = () => setIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[80vh] md:h-[85vh] w-full overflow-hidden bg-[#002147]">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#002147]/95 via-[#002147]/60 to-transparent z-10" />
          <img src={HERO_IMAGES[index]} className="h-full w-full object-cover opacity-50" alt="Banner" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 flex h-full items-center max-w-7xl mx-auto px-6">
        <div className="max-w-4xl">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-4 md:mb-6">
            <span className="w-8 md:w-12 h-[2px] bg-blue-500" />
            <span className="text-blue-400 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">
              Pioneering Tech Solutions
            </span>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[2.5rem] leading-[1.1] sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 md:mb-8">
            Engineering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              Institutional Growth.
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-slate-300 text-sm sm:text-base md:text-xl max-w-xl mb-8 leading-relaxed font-medium">
            Providing world-class software ecosystems and ICT infrastructure for schools, NGOs, and global institutions.
          </motion.p>

          <Link href="/services/service-request">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-[10px] md:text-sm uppercase tracking-widest shadow-2xl transition-all flex items-center gap-3">
              Consult an Expert <ArrowRight size={18} />
            </motion.button>
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-4 md:inset-x-8 top-1/2 z-30 hidden sm:flex -translate-y-1/2 justify-between pointer-events-none">
        <button onClick={prev} className="pointer-events-auto p-3 md:p-4 rounded-full border border-white/10 text-white hover:bg-white hover:text-[#002147] transition-all backdrop-blur-md">
          <ChevronLeft size={24} />
        </button>
        <button onClick={next} className="pointer-events-auto p-3 md:p-4 rounded-full border border-white/10 text-white hover:bg-white hover:text-[#002147] transition-all backdrop-blur-md">
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}

/* ===================== */
/* 2. TECH STRIP         */
/* ===================== */
function TechStackStrip() {
  return (
    <div className="py-10 md:py-16 border-b border-slate-100 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-6 md:mb-10">
        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 text-center">
          Our Industrial Tech Stack
        </p>
      </div>
      <div className="flex relative">
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="flex gap-12 md:gap-24 items-center whitespace-nowrap px-10">
          {[...TECH_STACK, ...TECH_STACK].map((tech, idx) => (
            <div key={idx} className="flex items-center gap-3 md:gap-4 group grayscale hover:grayscale-0 transition-all opacity-40 hover:opacity-100 cursor-default">
              <img src={tech.logo} alt={tech.name} className="h-6 md:h-8 w-auto object-contain" />
              <span className="text-sm md:text-lg font-black tracking-tighter text-[#002147] uppercase">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ===================== */
/* 3. INSTITUTIONAL SERVICES */
/* ===================== */
function InstitutionalServices() {
  const features = [
    { icon: <Cpu size={24} />, title: "Digital Infrastructure", desc: "Enterprise server architecture and secure cloud migration for educational hubs." },
    { icon: <Globe size={24} />, title: "Custom Ecosystems", desc: "Sophisticated school portals and administrative CMS platforms built to scale." },
    { icon: <ShieldCheck size={24} />, title: "Information Security", desc: "Military-grade encryption and data privacy protocols for all institutional assets." },
    { icon: <Zap size={24} />, title: "Agile Development", desc: "Rapid prototyping and deployment cycles to keep your institution ahead of the curve." }
  ];

  return (
    <section className="py-16 md:py-32 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <h2 className="text-blue-600 text-[10px] md:text-xs font-black uppercase tracking-[0.5em] mb-4 md:mb-6">Capabilities</h2>
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#002147] tracking-tighter leading-[1] mb-6 md:mb-10">
            Engineered for <br /><span className="text-blue-600">Reliability.</span>
          </h3>
          <p className="text-base md:text-xl text-slate-500 leading-relaxed mb-8 md:mb-10">
            We prioritize functional excellence over trends. Our systems are the technical foundation for institutions that cannot afford downtime.
          </p>
          <Link href="/services" className="inline-flex items-center gap-4 font-bold text-[#002147] group text-sm md:text-base">
            <span className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-[#002147] group-hover:text-white transition-all">
              <ArrowRight size={20} />
            </span>
            Full Service Directory
          </Link>
        </div>

        <div className="lg:col-span-7 space-y-3 md:space-y-4">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} whileHover={{ x: 15 }} className="group p-6 md:p-10 bg-slate-50 hover:bg-[#002147] transition-all duration-500 rounded-2xl md:rounded-[2.5rem] overflow-hidden relative cursor-default">
              <div className="relative z-10 flex flex-col md:flex-row items-start gap-4 md:gap-8">
                <div className="text-blue-600 group-hover:text-blue-400 transition-colors bg-white md:bg-transparent p-3 md:p-0 rounded-lg shadow-sm md:shadow-none">
                  {f.icon}
                </div>
                <div>
                  <h4 className="text-xl md:text-2xl font-bold text-[#002147] group-hover:text-white transition-colors mb-2 md:mb-3">
                    {f.title}
                  </h4>
                  <p className="text-sm md:text-base text-slate-500 group-hover:text-blue-100/80 transition-colors max-w-md leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== */
/* 4. TESTIMONIALS (HOME)*/
/* ===================== */
function Testimonials() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data, error } = await supabase
          .from("comments")
          .select("id, name, message, rating, created_at")
          .order("created_at", { ascending: false })
          .limit(6); // Increased limit for better 3-column filling

        if (error) throw error;
        setComments(data || []);
      } catch (err) {
        console.error("Supabase Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <h2 className="text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Community Impact</h2>
            <h3 className="text-4xl md:text-5xl font-black text-[#002147] tracking-tight">Institutional Trust.</h3>
          </div>
          
          <Link href="/comments">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 bg-[#002147] text-white px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-blue-600 transition-all"
            >
              View All Reviews <ArrowRight size={16} />
            </motion.button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-slate-50 rounded-[2rem] animate-pulse" />
            ))}
          </div>
        ) : (
          /* MASONRY WRAPPER */
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence>
              {comments.map((c, i) => (
                <CommentItem key={c.id} comment={c} index={i} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}

/* --- UPDATED INDIVIDUAL COMMENT COMPONENT --- */
function CommentItem({ comment, index }: { comment: Comment; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Professional character threshold for the "Read More" trigger
  const charLimit = 150;
  const isLong = comment.message.length > charLimit;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      /* break-inside-avoid: Essential for masonry to prevent card splitting */
      className="break-inside-avoid inline-block w-full bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 group mb-6"
    >
      {/* 1. TOP SECTION: STARS & VERIFICATION */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1">
          {[...Array(5)].map((_, starIdx) => (
            <StarIcon 
              key={starIdx} 
              size={14} 
              className={`${starIdx < comment.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"}`} 
            />
          ))}
        </div>
        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
          <CheckCircle2 size={14} className="text-blue-500" />
        </div>
      </div>

      {/* 2. MESSAGE SECTION: PROFESSIONAL WORD WRAP */}
      <div className="relative mb-8">
        <p className={`text-slate-600 leading-relaxed text-sm md:text-base font-medium transition-all duration-300 
          ${!isExpanded && isLong ? "line-clamp-3" : ""} 
          break-all overflow-wrap-anywhere whitespace-pre-wrap`}
          style={{ wordBreak: 'break-word' }}
        >
          "{comment.message}"
        </p>
        
        {isLong && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-blue-600 font-black text-[10px] uppercase tracking-widest hover:text-[#002147] transition-colors flex items-center gap-1"
          >
            {isExpanded ? "Show Less" : "Read Full Experience"}
            <motion.span animate={{ rotate: isExpanded ? 180 : 0 }}>
              <ChevronRight size={12} className="rotate-90" />
            </motion.span>
          </button>
        )}
      </div>

      {/* 3. USER FOOTER: matches image_becf7a.png */}
      <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
        <div className="w-12 h-12 bg-[#002147] rounded-xl flex items-center justify-center text-white font-black text-lg shrink-0 shadow-inner">
          {comment.name[0].toUpperCase()}
        </div>
        <div className="overflow-hidden">
          <h4 className="font-black text-[#002147] text-[12px] md:text-[13px] uppercase tracking-tighter truncate">
            {comment.name}
          </h4>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
            {new Date(comment.created_at).toLocaleDateString(undefined, {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            })}
          </p>
        </div>
      </div>

      {/* 4. INTERACTION LAYER */}
      <div className="flex items-center gap-6 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <button className="flex items-center gap-1.5 text-slate-400 hover:text-blue-600 transition-colors">
          <ThumbsUp size={14} />
          <span className="text-[9px] font-black uppercase tracking-widest">Helpful</span>
        </button>
      </div>
    </motion.div>
  );
}