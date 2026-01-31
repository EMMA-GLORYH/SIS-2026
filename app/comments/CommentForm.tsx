"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, AlignLeft, Star, CheckCircle2, ArrowRight } from "lucide-react";

export default function CommentForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      location: "Website User", // Or add a location input
      comment: formData.get("comment") + ` (Rating: ${rating}/5)`,
    };

    try {
      const res = await fetch("/api/send-comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        const errData = await res.json();
        alert(`Error: ${errData.error}`);
      }
    } catch (err) {
      alert("System error. Check connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!isSubmitted ? (
        <motion.form 
          key="form"
          exit={{ opacity: 0, y: -20 }}
          onSubmit={handleSubmit} 
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input name="name" required type="text" className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all text-slate-900" />
              </div>
            </div>

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
                    <Star size={24} className={`${star <= (hover || rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}`} />
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
              <textarea name="comment" required rows={4} className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all resize-none text-slate-900"></textarea>
            </div>
          </div>

          <motion.button 
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-5 ${isLoading ? 'bg-slate-400' : 'bg-[#002147]'} text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl`}
          >
            {isLoading ? "Sending..." : "Submit Review"} <Send size={16} />
          </motion.button>
        </motion.form>
      ) : (
        <motion.div 
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}

          className="text-center py-10"
        >
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={42} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-3">Thank you for your comment!</h2>
          <p className="text-slate-500 text-sm mb-8 max-w-xs mx-auto">Your feedback has been received and sent to our executive team for review.</p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="px-8 py-4 bg-[#002147] text-white rounded-2xl font-bold flex items-center justify-center gap-2 mx-auto hover:bg-blue-600 transition-all"
          >
            Okay <ArrowRight size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}