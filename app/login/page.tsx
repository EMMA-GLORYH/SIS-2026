"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      if (data.user?.email === 'emmanuelhienwo@gmail.com') {
        router.push("/notifications");
      } else {
        router.push("/");
      }
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white font-sans">
      
      {/* LEFT SIDE: INSTRUCTIONS & BRANDING */}
      <div className="hidden md:flex w-1/2 bg-[#001529] relative overflow-hidden flex-col justify-between p-16">
        {/* Decorative Background */}
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-blue-600/10 rounded-full blur-[120px]" />
        
        <div className="relative z-10">
          <div className="w-16 h-16 bg-white text-[#001529] rounded-2xl flex items-center justify-center font-black text-2xl shadow-2xl mb-12">
            SIS
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl font-black text-white leading-tight mb-6">
              Architecting <br />
              <span className="text-blue-500">Institutional</span> Efficiency.
            </h1>
            <p className="text-slate-400 text-lg max-w-md leading-relaxed">
              Access your centralized dashboard to manage institutional data, 
              track real-time communications, and monitor system health.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-4 text-slate-300">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <ShieldCheck size={20} className="text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white uppercase tracking-wider">End-to-End Encryption</p>
              <p className="text-xs text-slate-500">Your session is secured with military-grade protocols.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-slate-300">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <CheckCircle2 size={20} className="text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white uppercase tracking-wider">Real-time Syncing</p>
              <p className="text-xs text-slate-500">Instant updates across all institutional modules.</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-12 border-t border-white/5">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
            Solutions & ICT Services Ltd. © 2026
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: LOGIN FIELDS */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-24 bg-slate-50">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-10">
            <h2 className="text-3xl font-black text-[#002147] tracking-tight mb-2">Login to Account</h2>
            <p className="text-slate-500 font-medium text-sm">Please enter your authorized credentials below.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Enterprise Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input 
                  type="email" 
                  className="w-full p-4 pl-12 bg-white rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none text-slate-900 transition-all text-sm shadow-sm"
                  placeholder="e.g. admin@sis.com"
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="group">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Security Password</label>
                <button type="button" className="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-tighter">Request Reset</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input 
                  type="password" 
                  className="w-full p-4 pl-12 bg-white rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none text-slate-900 transition-all text-sm shadow-sm"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="pt-4">
              <button 
                disabled={loading}
                className="w-full bg-[#002147] text-white p-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-600 transition-all shadow-xl shadow-blue-900/10 active:scale-[0.98] flex items-center justify-center gap-3 group disabled:opacity-50"
              >
                {loading ? "Verifying Identity..." : (
                  <>
                    Secure Login 
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col items-center gap-4">
            <p className="text-slate-400 text-xs font-medium">
              Don&apos;t have an account? 
              <button onClick={() => router.push('/signup')} className="text-blue-600 font-bold hover:underline ml-1">
                Register via Google
              </button>
            </p>
            <div className="flex gap-6">
               <span className="text-[10px] font-bold text-slate-300 uppercase">Support</span>
               <span className="text-[10px] font-bold text-slate-300 uppercase">Privacy</span>
               <span className="text-[10px] font-bold text-slate-300 uppercase">Terms</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}