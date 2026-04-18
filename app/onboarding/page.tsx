"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Building, ArrowRight, Loader2 } from "lucide-react";

export default function OnboardingPage() {
  const [orgName, setOrgName] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/"); // Not logged in? Send home.
        return;
      }

      // If they already have an org name in metadata, skip onboarding
      if (user.user_metadata?.organization_name) {
        router.push("/notifications");
      }
      setChecking(false);
    };
    checkUser();
  }, [router]);

  const handleCompleteOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      data: { 
        organization_name: orgName,
        role: "partner_admin",
        onboarding_completed: true 
      }
    });

    if (error) {
      alert(error.message);
    } else {
      router.push("/notifications");
      router.refresh();
    }
    setLoading(false);
  };

  if (checking) return (
    <div className="min-h-screen bg-[#001529] flex items-center justify-center">
      <Loader2 className="animate-spin text-white w-10 h-10" />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#001529] p-6 font-sans">
      <div className="bg-white p-8 md:p-10 rounded-3xl w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-4 shadow-lg">
            G
          </div>
          <h1 className="text-2xl font-black text-[#002147] uppercase">Almost There!</h1>
          <p className="text-slate-500 text-sm mt-2">We've verified your email. Now, tell us about your organization.</p>
        </div>

        <form onSubmit={handleCompleteOnboarding} className="space-y-6">
          <div className="relative">
            <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Organization Name (e.g. Red Cross)" 
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              required 
              className="w-full p-4 pl-12 bg-slate-50 rounded-xl border-none outline-blue-500 text-slate-900 font-medium"
            />
          </div>

          <button 
            disabled={loading || !orgName}
            className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Finish Setup"} 
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}