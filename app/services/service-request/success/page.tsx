"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, FileText, Calendar, ShieldCheck } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-20">
      <div className="max-w-3xl w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center border border-green-100 shadow-xl shadow-green-900/10">
              <CheckCircle2 size={48} className="text-green-600" />
            </div>
          </div>

          <h2 className="text-blue-600 text-xs font-black uppercase tracking-[0.4em] mb-4">Transmission Successful</h2>
          <h1 className="text-4xl md:text-6xl font-black text-[#002147] tracking-tighter mb-8 leading-none">
            Request Logged <br />in our System.
          </h1>
          
          <p className="text-lg text-slate-500 max-w-xl mx-auto mb-12 leading-relaxed">
            Your technical service request has been received. A confirmation email has been dispatched to your inbox containing your request details.
          </p>

          {/* Institutional Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
            <ProcessCard 
              icon={<FileText size={20} />} 
              title="Review" 
              desc="Engineers analyze your requirements." 
            />
            <ProcessCard 
              icon={<Calendar size={20} />} 
              title="Contact" 
              desc="Follow-up call within 24-48 hours." 
            />
            <ProcessCard 
              icon={<ShieldCheck size={20} />} 
              title="Proposal" 
              desc="Formal technical proposal issued." 
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className="w-full sm:w-auto bg-[#002147] text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
              <ArrowLeft size={16} /> Return to Home
            </Link>
            <Link href="/services" className="w-full sm:w-auto border border-slate-200 text-slate-600 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-slate-50 transition-all">
              View Other Services
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ProcessCard({ icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h4 className="font-black text-[#002147] text-[10px] uppercase tracking-widest mb-2">{title}</h4>
      <p className="text-xs text-slate-500 leading-normal">{desc}</p>
    </div>
  );
}