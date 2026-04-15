"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      router.push("/notifications"); // Send to admin panel on success
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#001529] p-6">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl">
        <h1 className="text-2xl font-black text-[#002147] mb-6 uppercase tracking-tight">Admin Portal</h1>
        <div className="space-y-4">
          <input 
            type="email" placeholder="Email" 
            className="w-full p-4 bg-slate-100 rounded-xl border-none outline-blue-500 text-slate-900"
            onChange={(e) => setEmail(e.target.value)} required 
          />
          <input 
            type="password" placeholder="Password" 
            className="w-full p-4 bg-slate-100 rounded-xl border-none outline-blue-500 text-slate-900"
            onChange={(e) => setPassword(e.target.value)} required 
          />
          <button 
            disabled={loading}
            className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold uppercase tracking-widest hover:bg-blue-700 transition-all"
          >
            {loading ? "Verifying..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}