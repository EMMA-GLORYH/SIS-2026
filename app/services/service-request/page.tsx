"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Mail, 
  Zap, 
  UserPlus, 
  Lock,
  ArrowRight,
  FileText
} from "lucide-react";
import Link from "next/link";
import ServiceRequestForm from "./ServiceRequestForm";

export default function ServiceRequestPage() {
  // Professional Feature List
  const features = [
    { 
      icon: <UserPlus className="text-blue-600" size={24} />, 
      title: "Streamlined Submission", 
      desc: "Direct request channel bypassing complex registration protocols." 
    },
    { 
      icon: <Mail className="text-blue-600" size={24} />, 
      title: "Formal Documentation", 
      desc: "Receive official tracking and proposals via institutional email." 
    },
    { 
      icon: <Zap className="text-blue-600" size={24} />, 
      title: "Expedited Review", 
      desc: "Technical team analysis within 24 business hours of submission." 
    },
    { 
      icon: <Lock className="text-blue-600" size={24} />, 
      title: "Enterprise Security", 
      desc: "End-to-end encryption ensuring data confidentiality and compliance." 
    }
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* 1. PROFESSIONAL HERO SECTION WITH ONLINE IMAGE */}
      <section className="relative h-[60vh] md:h-[70vh] bg-[#002147] overflow-hidden">
        {/* Online Image Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072" 
            alt="Institutional Technology" 
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002147]/95 to-[#002147]/60" />
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[2px] bg-blue-500" />
              <h2 className="text-blue-400 text-xs font-black uppercase tracking-[0.4em]">Service Portal</h2>
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none mb-8">
              Initiate <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Technical</span> Service Request.
            </h1>
            <p className="text-lg md:text-xl text-blue-100/80 leading-relaxed font-medium max-w-2xl">
              Submit detailed requirements for ICT infrastructure, software development, or hardware support. Our engineering team will provide a formal technical proposal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. PROFESSIONAL CONTENT STRUCTURE */}
      <section className="max-w-7xl mx-auto px-6 py-20 lg:py-32 relative z-20 -mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Professional Guidelines (Sticky) */}
          <div className="lg:col-span-5 space-y-12 lg:sticky lg:top-32">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100">
              <h3 className="text-2xl font-black text-[#002147] tracking-tight mb-8 flex items-center gap-3">
                <FileText size={24} className="text-blue-600" /> Submission Protocol
              </h3>
              <div className="space-y-8">
                {features.map((f, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 group"
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                      <div className="text-blue-600 group-hover:text-white transition-colors">
                        {f.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#002147] text-lg mb-1">{f.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Critical Support CTA */}
            <div className="p-8 rounded-3xl bg-[#002147] text-white border border-blue-900/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 text-blue-800/20"><ShieldCheck size={120} /></div>
              <div className="relative z-10">
                 <h4 className="font-black mb-2 uppercase text-xs tracking-widest text-blue-300">Critical Infrastructure Support</h4>
                 <p className="text-sm text-blue-100/80 mb-6 leading-relaxed">For urgent server outages or security breaches, bypass this form and contact our 24/7 emergency operations center.</p>
                 <Link href="/contact" className="flex items-center gap-2 text-white font-bold text-sm hover:gap-4 transition-all bg-blue-600 w-fit px-6 py-3 rounded-full">
                   Emergency Contact Channels <ArrowRight size={16} />
                 </Link>
              </div>
            </div>
          </div>

          {/* Right Column: The Professional Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-blue-900/10 overflow-hidden"
            >
              <div className="bg-slate-50 p-8 border-b border-slate-100 flex items-center justify-between">
                <div>
                   <h3 className="text-xl font-black text-[#002147] uppercase tracking-tight">Technical Requirement Form</h3>
                   <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Please provide detailed specifications</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 uppercase tracking-widest">
                  <ShieldCheck size={14} /> Secure Transmission
                </div>
              </div>
              <div className="p-8 md:p-12">
                {/* This component should be your professional form code */}
                <ServiceRequestForm />
              </div>
            </motion.div>
          </div>

        </div>
      </section>
    </div>
  );
}