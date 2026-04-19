"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, ArrowRight, ShieldCheck, CheckCircle2, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'select_account',
        },
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Auth Error:", error.message);
    }
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      alert(error.message);
    } else {
      // ALL users go to home page after signup
      router.push("/");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white font-sans">
      
      {/* LEFT SIDE: THE TRUST & ONBOARDING PANEL */}
      <div className="hidden md:flex w-[45%] bg-[#001529] relative overflow-hidden flex-col justify-between p-16">
        {/* Deep blue accent glow */}
        <div className="absolute top-[-20%] right-[-10%] w-[100%] h-[100%] bg-blue-600/10 rounded-full blur-[120px]" />
        
        <div className="relative z-10 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
              Getting Started
            </span>
            <h1 className="text-5xl font-black text-white leading-[1.1] mb-8">
              Join the future of <br />
              <span className="text-slate-400">managed services.</span>
            </h1>
            
            <div className="space-y-8 mt-12">
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400">
                  <Globe size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Universal Integration</h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                    Connect your existing hardware and software protocols to our unified cloud infrastructure.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Secure by Default</h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                    Your account is protected by industry-standard encryption and OAuth 2.0 security layers.
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

      {/* RIGHT SIDE: THE REGISTRATION FORM */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-24 bg-slate-50 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md py-12 md:py-0"
        >
          <div className="mb-10">
            <h2 className="text-4xl font-black text-[#002147] tracking-tight mb-3">Create Account</h2>
            <p className="text-slate-500 font-medium">Join us to start managing your digital ecosystem.</p>
          </div>

          {/* GOOGLE SIGNUP - JUMIA STYLE */}
          <button 
            type="button"
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 p-4 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:shadow-md transition-all active:scale-[0.98] shadow-sm mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign up with Google Identity
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
            <div className="relative flex justify-center text-[10px] font-black uppercase"><span className="bg-slate-50 px-4 text-slate-400 tracking-[0.2em]">Or Register Manually</span></div>
          </div>

          <form onSubmit={handleEmailSignup} className="space-y-5">
            <div className="group">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Full Legal Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input 
                  type="text" 
                  className="w-full p-4 pl-12 bg-white rounded-2xl border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none text-slate-900 transition-all text-sm shadow-sm font-medium"
                  placeholder="e.g. Emmanuel Hienwo"
                  onChange={(e) => setFullName(e.target.value)} 
                  required 
                />
              </div>
            </div>

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
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Create Security Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input 
                  type="password" 
                  className="w-full p-4 pl-12 bg-white rounded-2xl border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none text-slate-900 transition-all text-sm shadow-sm font-medium"
                  placeholder="Minimum 8 characters"
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
                {loading ? "Initializing..." : (
                  <>
                    Initialize Account 
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-200 text-center">
            <p className="text-slate-400 text-sm font-medium mb-4">
              Already an authorized user?
            </p>
            <button 
              onClick={() => router.push('/login')}
              className="px-8 py-3 rounded-xl border-2 border-slate-200 text-[#002147] font-bold text-sm hover:bg-slate-100 hover:border-slate-300 transition-all active:scale-[0.97]"
            >
              Sign In to Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}