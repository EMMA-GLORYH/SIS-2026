"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  Zap, 
  Cpu,
  Quote, 
  Star as StarIcon 
} from "lucide-react";
import Link from "next/link";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070"
];

const TECH_STACK = [
  { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/black" },
  { name: "AWS", logo: "https://cdn.simpleicons.org/amazonaws/232F3E" },
  { name: "React", logo: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "Tailwind", logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
];

export default function HomePage() {
  return (
    <main className="bg-white overflow-x-hidden">
      <HeroSlider />
      <TechStackStrip />
      <InstitutionalServices />
      <Testimonials />
    </main>
  );
}

/* ===================== */
/* 1. CINEMATIC HERO     */
/* ===================== */
function HeroSlider() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  const prev = () => setIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[80vh] md:h-[85vh] w-full overflow-hidden bg-[#002147]">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#002147]/95 via-[#002147]/60 to-transparent z-10" />
          <img src={HERO_IMAGES[index]} className="h-full w-full object-cover opacity-50" alt="Banner" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 flex h-full items-center max-w-7xl mx-auto px-6">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-4 md:mb-6"
          >
            <span className="w-8 md:w-12 h-[2px] bg-blue-500" />
            <span className="text-blue-400 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">
              Pioneering Tech Solutions
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[2.5rem] leading-[1.1] sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 md:mb-8"
          >
            Engineering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              Institutional Growth.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-300 text-sm sm:text-base md:text-xl max-w-xl mb-8 leading-relaxed font-medium"
          >
            Providing world-class software ecosystems and ICT infrastructure for schools, NGOs, and global institutions.
          </motion.p>

          <Link href="/services/service-request">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-[10px] md:text-sm uppercase tracking-widest shadow-2xl transition-all flex items-center gap-3"
            >
              Consult an Expert <ArrowRight size={18} />
            </motion.button>
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-4 md:inset-x-8 top-1/2 z-30 hidden sm:flex -translate-y-1/2 justify-between pointer-events-none">
        <button onClick={prev} className="pointer-events-auto p-3 md:p-4 rounded-full border border-white/10 text-white hover:bg-white hover:text-[#002147] transition-all backdrop-blur-md">
          <ChevronLeft size={24} />
        </button>
        <button onClick={next} className="pointer-events-auto p-3 md:p-4 rounded-full border border-white/10 text-white hover:bg-white hover:text-[#002147] transition-all backdrop-blur-md">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="absolute bottom-6 md:bottom-10 left-1/2 z-30 flex -translate-x-1/2 gap-2 md:gap-4">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1 md:h-1.5 transition-all duration-700 rounded-full ${index === i ? "w-10 md:w-16 bg-blue-500" : "w-3 md:w-4 bg-white/20"}`}
          />
        ))}
      </div>
    </section>
  );
}

/* ===================== */
/* 2. TECH STRIP         */
/* ===================== */
function TechStackStrip() {
  return (
    <div className="py-10 md:py-16 border-b border-slate-100 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-6 md:mb-10">
        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 text-center">
          Our Industrial Tech Stack
        </p>
      </div>
      
      <div className="flex relative">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 md:gap-24 items-center whitespace-nowrap px-10"
        >
          {[...TECH_STACK, ...TECH_STACK].map((tech, idx) => (
            <div key={idx} className="flex items-center gap-3 md:gap-4 group grayscale hover:grayscale-0 transition-all opacity-40 hover:opacity-100 cursor-default">
              <img src={tech.logo} alt={tech.name} className="h-6 md:h-8 w-auto object-contain" />
              <span className="text-sm md:text-lg font-black tracking-tighter text-[#002147] uppercase">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ===================== */
/* 3. INSTITUTIONAL SERVICES */
/* ===================== */
function InstitutionalServices() {
  const features = [
    { icon: <Cpu size={24} />, title: "Digital Infrastructure", desc: "Enterprise server architecture and secure cloud migration for educational hubs." },
    { icon: <Globe size={24} />, title: "Custom Ecosystems", desc: "Sophisticated school portals and administrative CMS platforms built to scale." },
    { icon: <ShieldCheck size={24} />, title: "Information Security", desc: "Military-grade encryption and data privacy protocols for all institutional assets." },
    { icon: <Zap size={24} />, title: "Agile Development", desc: "Rapid prototyping and deployment cycles to keep your institution ahead of the curve." }
  ];

  return (
    <section className="py-16 md:py-32 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <h2 className="text-blue-600 text-[10px] md:text-xs font-black uppercase tracking-[0.5em] mb-4 md:mb-6">Capabilities</h2>
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#002147] tracking-tighter leading-[1] mb-6 md:mb-10">
            Engineered for <br /><span className="text-blue-600">Reliability.</span>
          </h3>
          <p className="text-base md:text-xl text-slate-500 leading-relaxed mb-8 md:mb-10">
            We prioritize functional excellence over trends. Our systems are the technical foundation for institutions that cannot afford downtime.
          </p>
          <Link href="/services" className="inline-flex items-center gap-4 font-bold text-[#002147] group text-sm md:text-base">
            <span className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-[#002147] group-hover:text-white transition-all">
              <ArrowRight size={20} />
            </span>
            Full Service Directory
          </Link>
        </div>

        <div className="lg:col-span-7 space-y-3 md:space-y-4">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ x: 15 }}
              className="group p-6 md:p-10 bg-slate-50 hover:bg-[#002147] transition-all duration-500 rounded-2xl md:rounded-[2.5rem] overflow-hidden relative cursor-default"
            >
              <div className="relative z-10 flex flex-col md:flex-row items-start gap-4 md:gap-8">
                <div className="text-blue-600 group-hover:text-blue-400 transition-colors bg-white md:bg-transparent p-3 md:p-0 rounded-lg shadow-sm md:shadow-none">
                  {f.icon}
                </div>
                <div>
                  <h4 className="text-xl md:text-2xl font-bold text-[#002147] group-hover:text-white transition-colors mb-2 md:mb-3">
                    {f.title}
                  </h4>
                  <p className="text-sm md:text-base text-slate-500 group-hover:text-blue-100/80 transition-colors max-w-md leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== */
/* 4. TESTIMONIALS       */
/* ===================== */
/* ===================== */
/* 4. TESTIMONIALS       */
/* ===================== */
function Testimonials() {
  const reviews = [
    { name: "Principal, St. Andrews", text: "The school portal reduced our admin workload by 60%. Essential for modern education.", rating: 5 },
    { name: "NGO Director", text: "Secure, reliable, and highly professional. The team at SIS understands institutional needs.", rating: 5 }
  ];

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-blue-600 text-xs font-black uppercase tracking-[0.3em] mb-4">Testimonials</h2>
          <h3 className="text-4xl font-black text-[#002147] tracking-tight">Voices of Success.</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {reviews.map((r, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 relative"
            >
              <Quote className="absolute top-8 right-10 text-slate-100" size={60} />
              <div className="flex gap-1 mb-6">
                {[...Array(r.rating)].map((_, i) => (
                  <StarIcon key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8 relative z-10 italic">
                "{r.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {r.name[0]}
                </div>
                <span className="font-black text-[#002147] text-sm uppercase tracking-wider">{r.name}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- NEW NAVIGATION BUTTON --- */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="h-px w-24 bg-slate-200" />
          <Link href="/comments">
            <motion.button
              whileHover={{ scale: 1.05, gap: "1.5rem" }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-4 bg-white border-2 border-[#002147] text-[#002147] px-8 py-4 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-[#002147] hover:text-white transition-all duration-300"
            >
              Share Your Experience
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Help us improve our institutional services
          </p>
        </div>
      </div>
    </section>
  );
}