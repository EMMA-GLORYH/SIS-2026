"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react"; // Removed Chrome, added SVG below

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
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

        {/* --- UPDATED: GOOGLE BUTTON WITH OFFICIAL COLORS AND SVG --- */}
        <button 
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-slate-200 bg-white p-4 rounded-xl font-bold text-slate-700 hover:bg-slate-50 hover:shadow-md transition-all mb-6 active:scale-[0.98]"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
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