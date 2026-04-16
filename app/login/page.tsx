"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Mail, Lock, Chrome } from "lucide-react"; // Added Chrome icon for Google

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // --- NEW: GOOGLE LOGIN HANDLER ---
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, // You'll need this route
      },
    });
    if (error) alert(error.message);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      router.push("/notifications");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#001529] p-6 font-sans">
      <div className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#002147] rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-4 shadow-lg">
            SIS
          </div>
          <h1 className="text-2xl font-black text-[#002147] uppercase tracking-tight">Admin Portal</h1>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">Authorized Personnel Only</p>
        </div>

        {/* GOOGLE BUTTON */}
        <button 
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border-2 border-slate-100 p-4 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-all mb-6 group"
        >
          <Chrome size={20} className="text-blue-500 group-hover:scale-110 transition-transform" />
          Continue with Google
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
          <div className="relative flex justify-center text-[10px] font-bold uppercase"><span className="bg-white px-4 text-slate-300 tracking-widest">Or Email</span></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="email" placeholder="Admin Email" 
              className="w-full p-4 pl-12 bg-slate-50 rounded-xl border-none outline-blue-500 text-slate-900 placeholder:text-slate-400 text-sm"
              onChange={(e) => setEmail(e.target.value)} required 
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="password" placeholder="Password" 
              className="w-full p-4 pl-12 bg-slate-50 rounded-xl border-none outline-blue-500 text-slate-900 placeholder:text-slate-400 text-sm"
              onChange={(e) => setPassword(e.target.value)} required 
            />
          </div>
          <button 
            disabled={loading}
            className="w-full bg-[#002147] text-white p-4 rounded-xl font-bold uppercase tracking-widest hover:bg-blue-900 transition-all shadow-lg active:scale-[0.98]"
          >
            {loading ? "Verifying..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}