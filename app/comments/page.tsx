"use client";

import { motion } from "framer-motion";
import { MessageSquare, Star, Quote, ShieldCheck } from "lucide-react";
import CommentForm from "./CommentForm";

export default function CommentsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HEADER SECTION */}
      <section className="relative pt-32 pb-20 bg-[#002147] overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-300 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                <Star size={12} className="fill-blue-300" /> Community Feedback
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-none">
                Voice of our <br />
                <span className="text-blue-400">Partners.</span>
              </h1>
              <p className="text-lg text-blue-100/70 font-medium leading-relaxed">
                At SIS, we don't just build software; we build relationships. Your insights drive our innovation and help us maintain our standard of excellence.
              </p>
            </motion.div>

            {/* QUICK STATS */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: "Satisfaction", val: "99%", icon: ShieldCheck },
                { label: "Responses", val: "24h", icon: MessageSquare }
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] text-center">
                  <stat.icon className="text-blue-400 mx-auto mb-3" size={24} />
                  <div className="text-2xl font-black text-white">{stat.val}</div>
                  <div className="text-[9px] font-bold text-blue-300/50 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="relative -mt-12 pb-24 px-6 z-20">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/10 border border-slate-100 p-8 md:p-16 relative overflow-hidden"
          >
            {/* Watermark Quote Icon */}
            <Quote className="absolute top-10 right-10 text-slate-50 opacity-[0.03]" size={200} />
            
            <div className="relative z-10">
              <div className="mb-10 text-center">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Submit Your Experience</h2>
                <div className="h-1 w-12 bg-blue-600 mx-auto rounded-full" />
              </div>
              
              <CommentForm />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}