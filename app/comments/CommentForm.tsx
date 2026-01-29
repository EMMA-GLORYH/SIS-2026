"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, AtSign, AlignLeft, Star } from "lucide-react";

export default function CommentForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <form className="space-y-6">
      {/* 3️⃣ ANTI-SPAM HONEYPOT (Hidden from users) */}
      <div className="hidden">
        <input type="text" name="hp_field" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input required type="text" className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all" />
          </div>
        </div>

        {/* 2️⃣ RATING SYSTEM */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Service Rating</label>
          <div className="flex items-center gap-2 px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="transition-transform active:scale-90"
              >
                <Star 
                  size={24} 
                  className={`${star <= (hover || rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}`} 
                />
              </button>
            ))}
            <span className="ml-2 text-xs font-bold text-slate-400">{rating}/5</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Your Feedback</label>
        <div className="relative">
          <AlignLeft className="absolute left-4 top-6 text-slate-300" size={18} />
          <textarea required rows={4} className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all resize-none"></textarea>
        </div>
      </div>

      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-5 bg-[#002147] text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-blue-900/10"
      >
        Submit Review <Send size={16} />
      </motion.button>
    </form>
  );
}