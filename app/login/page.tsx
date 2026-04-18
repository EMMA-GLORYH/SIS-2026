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

  // --- EXPERT GOOGLE OAUTH FLOW ---
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // "select_account" forces the Google popup just like Jumia/Enterprise apps
        queryParams: {
          access_type: 'offline',
          prompt: 'select_account',
        },
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      alert("Google Login Error: " + error.message);
    }
  };

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
      
      {/* LEFT SIDE: THE "INSTRUCTIONAL" PANEL */}
      <div className="hidden md:flex w-[45%] bg-[#001529] relative overflow-hidden flex-col justify-between p-16">
        <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-blue-600/20 rounded-full blur-[120px]" />
        
        <div className="relative z-10 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
              Digital Infrastructure
            </span>
            <h1 className="text-5xl font-black text-white leading-[1.1] mb-8">
              Seamless access to <br />
              <span className="text-slate-400">your smart systems.</span>
            </h1>
            
            <div className="space-y-8 mt-12">
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <ShieldCheck className="text-blue-400" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Identity Protection</h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                    Multi-factor authentication protocols ensure your data remains strictly confidential.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <CheckCircle2 className="text-blue-400" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Centralized Control</h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                    One gateway for VOLTRIDE telemetry, FindMe safety, and institutional management.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 pt-8 border-t border-white/10">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-[0.4em]">
            Solutions & ICT Services © 2026
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: THE "ACTION" PANEL */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-24 bg-slate-50">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-10">
            <h2 className="text-4xl font-black text-[#002147] tracking-tight mb-3">Sign In</h2>
            <p className="text-slate-500 font-medium">Enter your credentials to manage your platform.</p>
          </div>

          {/* --- GOOGLE OAUTH BUTTON --- */}
          <button 
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 p-4 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:shadow-md transition-all active:scale-[0.98] shadow-sm mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          {/* --- OR DIVIDER --- */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
            <div className="relative flex justify-center text-[10px] font-black uppercase"><span className="bg-slate-50 px-4 text-slate-400 tracking-[0.2em]">Or Use Email</span></div>
          </div>

          {/* --- EMAIL CREDENTIAL FORM --- */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="group">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Enterprise Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input 
                  type="email" 
                  className="w-full p-4 pl-12 bg-white rounded-2xl border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none text-slate-900 transition-all text-sm shadow-sm font-medium"
                  placeholder="name@institution.com"
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="group">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 block">Password</label>
                <button type="button" className="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-tighter">Lost Access?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input 
                  type="password" 
                  className="w-full p-4 pl-12 bg-white rounded-2xl border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none text-slate-900 transition-all text-sm shadow-sm font-medium"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="pt-4">
              <button 
                disabled={loading}
                className="w-full bg-[#002147] text-white p-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/10 active:scale-[0.98] flex items-center justify-center gap-3 group disabled:opacity-50"
              >
                {loading ? "Authenticating..." : (
                  <>
                    Access Dashboard 
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-16 pt-8 border-t border-slate-200 text-center">
            <p className="text-slate-400 text-sm font-medium mb-4">
              New to the platform?
            </p>
            <button 
              onClick={() => router.push('/signup')}
              className="px-8 py-3 rounded-xl border-2 border-slate-200 text-[#002147] font-bold text-sm hover:bg-slate-100 hover:border-slate-300 transition-all active:scale-[0.97]"
            >
              Create an Account
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}