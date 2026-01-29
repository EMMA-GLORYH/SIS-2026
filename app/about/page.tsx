"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { 
  History, Target, ShieldCheck, ArrowRight, ChevronRight,
  Globe, Award, Zap, Cpu, Workflow, Briefcase, CheckCircle2,
  Users2, Lightbulb, Rocket, Lock
} from "lucide-react";

export default function AboutPage() {
  const [imageError, setImageError] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <main className="min-h-screen bg-white selection:bg-blue-100 overflow-x-hidden scroll-smooth">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-[#002147] overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
          <motion.div {...fadeIn}>
            <nav className="flex items-center gap-2 text-blue-400 font-bold text-xs mb-6 uppercase tracking-[0.3em]">
              <Link href="/">Home</Link> <ChevronRight size={12} /> <span className="text-white">About SIS</span>
            </nav>
            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
              Great Technology <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Made Simple.</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100/70 leading-relaxed font-medium max-w-xl">
              We help schools and businesses grow by building smart, easy-to-use digital tools. 
              At SIS, we handle the complex tech so you can focus on your work.
            </p>
          </motion.div>

          {/* Lead Architect Image Section */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative flex justify-center lg:justify-end">
            <div className="relative w-72 h-96 md:w-80 md:h-[28rem] rounded-[2rem] overflow-hidden border-2 border-white/10 bg-slate-800/50 backdrop-blur-xl shadow-2xl">
              {!imageError ? (
                <Image src="/images/team/lead.jpg" alt="Team Lead" fill className="object-cover" onError={() => setImageError(true)} />
              ) : (
                <div className="h-full flex flex-col items-center justify-center bg-slate-800">
                  <span className="text-6xl font-black text-white/10">SIS</span>
                </div>
              )}
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[#002147] to-transparent">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 text-white">
                   <p className="font-bold text-sm">Our Leadership</p>
                   <p className="text-blue-300 text-[10px] uppercase tracking-widest">Guiding Technical Excellence</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 1: CORPORATE IDENTITY --- */}
      <section id="identity" className="py-20 md:py-32 px-6 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-full text-blue-600 font-bold uppercase tracking-widest text-xs mb-8">
                <Target size={16} /> Who We Are
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight">
                Our Vision & Mission
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Started in 2023, **SIS Team** was built to solve a simple problem: most technology is too 
                  complicated for the average user. We believe that your website or school portal should 
                  work perfectly every time, without you needing to be a "tech expert."
                </p>
                <div className="grid sm:grid-cols-2 gap-6 mt-12">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <Lightbulb className="text-blue-600 mb-4" />
                    <h4 className="font-bold text-slate-900 mb-2">The Mission</h4>
                    <p className="text-sm">To build reliable digital tools that make your daily work faster and easier.</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <Rocket className="text-blue-600 mb-4" />
                    <h4 className="font-bold text-slate-900 mb-2">The Vision</h4>
                    <p className="text-sm">To be the #1 choice for schools and businesses looking for smart automation.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="relative h-[400px] bg-slate-100 rounded-3xl overflow-hidden shadow-inner">
               <div className="absolute inset-0 flex items-center justify-center opacity-20">
                 <Target size={200} className="text-slate-300" />
               </div>
               {/* Replace with actual branding image */}
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: METHODOLOGY --- */}
      <section id="methodology" className="py-20 md:py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-indigo-50 rounded-full text-indigo-600 font-bold uppercase tracking-widest text-xs mb-6">
              <Workflow size={16} /> Our Simple Process
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">How We Work For You</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              We follow 3 simple steps to ensure your project is successful, secure, and delivered on time.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Listen & Plan", desc: "We sit down with you to understand exactly what your business or school needs.", icon: Users2 },
              { step: "02", title: "Build & Test", desc: "Our experts build your tool and test it heavily to make sure there are no mistakes.", icon: Cpu },
              { step: "03", title: "Launch & Support", desc: "We go live and stay by your side to provide help whenever you need it.", icon: Zap }
            ].map((m, i) => (
              <motion.div key={i} {...fadeIn} className="p-10 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow">
                <span className="text-4xl font-black text-slate-100 mb-6 block">{m.step}</span>
                <m.icon className="text-blue-600 mb-6" size={32} />
                <h4 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">{m.title}</h4>
                <p className="text-slate-500 leading-relaxed font-medium">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 3: PORTFOLIO & STANDARDS --- */}
      <section id="portfolio" className="py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            <motion.div {...fadeIn}>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-50 rounded-full text-emerald-600 font-bold uppercase tracking-widest text-xs mb-8">
                <Briefcase size={16} /> Our Clients
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight">Who We Help</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                We provide the "Digital Backbone" for institutions. This means we build the systems that 
                keep everything running smoothly behind the scenes.
              </p>
              <ul className="space-y-4">
                {["Private & Public Schools", "Corporate Business Offices", "Creative Agencies", "Retail & E-commerce Hubs"].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-slate-800 font-bold">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                      <CheckCircle2 size={14} className="text-emerald-600" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fadeIn} id="standards" className="bg-[#002147] p-10 md:p-16 rounded-[3rem] text-white">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full text-blue-300 font-bold uppercase tracking-widest text-xs mb-8">
                <Lock size={16} /> Safety & Standards
              </div>
              <h2 className="text-3xl font-black mb-6">Your Data is Safe</h2>
              <p className="text-blue-100/70 mb-10 leading-relaxed">
                Every project we build is protected by modern security rules. We make sure your 
                information is locked away from hackers and always available to you.
              </p>
              <div className="space-y-4">
                {["Encryption Secure", "Daily Backups", "Technical Support"].map((s) => (
                  <div key={s} className="flex items-center gap-3 font-bold text-sm tracking-widest uppercase">
                    <Award className="text-blue-400" /> {s}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
          <motion.div {...fadeIn} className="relative z-10">
            <h2 className="text-3xl md:text-6xl font-black text-white mb-8 tracking-tighter">Let's Build Something.</h2>
            <p className="text-blue-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto opacity-80">
              Stop struggling with slow systems. Contact the SIS Team and let us 
              bring your business into the digital future today.
            </p>
            <Link 
              href="/services/service-request" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-600 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl"
            >
              Start Your Project <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}