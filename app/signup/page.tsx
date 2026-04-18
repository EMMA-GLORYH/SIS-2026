"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Building2, ArrowRight, CheckCircle2 } from "lucide-react";
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
      // This ensures the user sees the Google Account selection screen
      queryParams: {
        access_type: 'offline',
        prompt: 'select_account',
      },
      // window.location.origin dynamically handles localhost or your production domain
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
      // With the trigger we set up, the profile is created automatically
      alert("Registration successful! Check your email for verification.");
      router.push("/login");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#001529] relative overflow-hidden font-sans p-6">
      {/* Subtle Background Glow */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-white p-8 md:p-12 rounded-[2.5rem] w-full max-w-2xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col md:flex-row gap-12"
      >
        {/* Left Side: Branding & Trust */}
        <div className="md:w-1/2 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-100 pb-8 md:pb-0 md:pr-12">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl mb-6 shadow-lg shadow-blue-600/20">
            SIS
          </div>
          <h1 className="text-4xl font-black text-[#002147] leading-tight tracking-tighter">
            Join the <br/><span className="text-blue-600">Professional</span> Network.
          </h1>
          <p className="text-slate-500 mt-4 text-sm leading-relaxed">
            Create an account to track your requests, access custom portals, and manage your professional services.
          </p>
          
          <div className="mt-8 space-y-4">
            {['Real-time tracking', 'Direct Admin Access', 'Secure Data Layers'].map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-xs font-bold text-[#002147] uppercase tracking-widest">
                <CheckCircle2 size={16} className="text-blue-500" /> {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2">
          <button 
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 border border-slate-200 bg-white p-4 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:shadow-xl transition-all mb-6 active:scale-[0.98]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google Signup
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <div className="relative flex justify-center text-[9px] font-black uppercase"><span className="bg-white px-4 text-slate-300 tracking-[0.3em]">Or Manual</span></div>
          </div>

          <form onSubmit={handleEmailSignup} className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" placeholder="Full Name" 
                className="w-full p-4 pl-12 bg-slate-50 rounded-2xl border-none outline-blue-500 text-sm font-medium"
                onChange={(e) => setFullName(e.target.value)} required 
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="email" placeholder="Email Address" 
                className="w-full p-4 pl-12 bg-slate-50 rounded-2xl border-none outline-blue-500 text-sm font-medium"
                onChange={(e) => setEmail(e.target.value)} required 
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="password" placeholder="Create Password" 
                className="w-full p-4 pl-12 bg-slate-50 rounded-2xl border-none outline-blue-500 text-sm font-medium"
                onChange={(e) => setPassword(e.target.value)} required 
              />
            </div>
            
            <button 
              disabled={loading}
              className="w-full bg-[#002147] text-white p-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? "Creating..." : <>Create Account <ArrowRight size={16}/></>}
            </button>
          </form>

          <p className="text-center mt-6 text-slate-400 text-[11px] font-medium">
            Already have an account? <button onClick={() => router.push('/login')} className="text-blue-600 font-bold hover:underline">Log In</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}