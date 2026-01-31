"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Star, 
  Plus, 
  X, 
  CheckCircle2, 
  ThumbsUp,
  Star as StarIcon,
  ChevronRight
} from "lucide-react";
import CommentForm from "./CommentForm";
import { supabase } from "@/app/supabaselogic/supabaseClient";

interface Comment {
  id: string;
  name: string;
  message: string;
  rating: number;
  created_at: string;
}

export default function CommentsPage() {
  const [showForm, setShowForm] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllComments = async () => {
      try {
        const { data, error } = await supabase
          .from("comments")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setComments(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllComments();
  }, []);

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-40 bg-[#002147] overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-300 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              <Star size={12} className="fill-blue-300" /> Professional Testimonials
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-[0.9]">
              Built on <span className="text-blue-400">Trust.</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100/60 max-w-2xl mx-auto font-medium mb-12">
              Join the network of global institutions powered by our technical excellence.
            </p>
            
            {!showForm && (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(true)}
                className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-500/20 flex items-center gap-3 mx-auto"
              >
                <Plus size={20} /> Leave Your Feedback
              </motion.button>
            )}
          </motion.div>
        </div>
      </section>

      {/* 2. OVERLAPPING FORM SECTION */}
      <AnimatePresence>
        {showForm && (
          <motion.section 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="relative z-30 -mt-32 px-6"
          >
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.15)] border border-slate-100 p-8 md:p-12 relative">
                <button 
                  onClick={() => setShowForm(false)}
                  className="absolute top-6 right-6 p-2 hover:bg-slate-50 rounded-full transition-colors"
                >
                  <X size={24} className="text-slate-400" />
                </button>
                <div className="mb-10 text-center">
                  <h2 className="text-2xl font-black text-[#002147] tracking-tight">Partner Submission</h2>
                  <p className="text-slate-400 text-xs font-bold uppercase mt-2">Institutional Verification Required</p>
                </div>
                <CommentForm />
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* 3. THREE-COLUMN COMMENTS GRID */}
      <section className={`px-6 transition-all duration-500 ${showForm ? 'pt-24' : 'pt-20'}`}>
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-slate-50 rounded-[2rem] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {comments.map((c, i) => (
                <CommentCard key={c.id} comment={c} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

/* --- UPDATED MASONRY CARD COMPONENT --- */
function CommentCard({ comment, index }: { comment: Comment; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const charLimit = 160;
  const isLong = comment.message.length > charLimit;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="break-inside-avoid inline-block w-full bg-slate-50 border border-slate-100 p-8 rounded-[2.5rem] hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, starIdx) => (
            <StarIcon 
              key={starIdx} 
              size={12} 
              className={`${starIdx < comment.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"}`} 
            />
          ))}
        </div>
        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
          <CheckCircle2 size={14} className="text-blue-500" />
        </div>
      </div>

      <div className="relative mb-8">
        <p 
          className={`text-slate-600 font-medium leading-relaxed italic text-sm md:text-base transition-all duration-300 
          ${!isExpanded && isLong ? "line-clamp-4" : ""} 
          break-words overflow-wrap-anywhere whitespace-pre-wrap`}
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

      <div className="flex items-center gap-4 pt-6 border-t border-slate-200/50">
        <div className="w-10 h-10 bg-[#002147] rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0 shadow-lg">
          {comment.name[0].toUpperCase()}
        </div>
        <div className="overflow-hidden">
          <span className="block font-black text-[#002147] text-[11px] uppercase tracking-wider truncate">
            {comment.name}
          </span>
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
            {new Date(comment.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-6 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
        <button className="flex items-center gap-1.5 text-slate-400 hover:text-blue-600 transition-colors">
          <ThumbsUp size={12} />
          <span className="text-[9px] font-black uppercase tracking-widest">Helpful</span>
        </button>
        <button className="flex items-center gap-1.5 text-slate-400 hover:text-blue-600 transition-colors">
          <MessageSquare size={12} />
          <span className="text-[9px] font-black uppercase tracking-widest">Verify</span>
        </button>
      </div>
    </motion.div>
  );
}