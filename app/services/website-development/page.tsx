"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Cpu, 
  Globe, 
  Layout, 
  Rocket, 
  ShieldCheck, 
  Zap,
  ArrowRight,
  User,
  Layers,
  Search,
  Settings,
  Code2,
  Terminal
} from "lucide-react";

export default function WebDevelopmentPage() {
  const [imgError, setImgError] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: "easeOut" as const }
  };

  const features = [
    { title: "Progressive Web Apps", desc: "Native-like experiences accessible via the browser.", icon: <Rocket /> },
    { title: "SEO Strategy", desc: "Engineered for first-page visibility and semantic health.", icon: <Globe /> },
    { title: "Next.js 15+ Core", desc: "Blazing fast Server-Side Rendering (SSR) and Edge caching.", icon: <Zap /> },
    { title: "Cyber-Security", desc: "Advanced protection against SQLi, XSS, and CSRF attacks.", icon: <ShieldCheck /> },
  ];

  const roadmap = [
    { step: "01", title: "Discovery", desc: "Defining user personas and business logic.", icon: <Search /> },
    { step: "02", title: "UX Wireframing", desc: "Iterative design focusing on conversion funnels.", icon: <Layers /> },
    { step: "03", title: "Dev Sprint", desc: "Agile coding with TypeScript and automated testing.", icon: <Cpu /> },
    { step: "04", title: "Launch & Scale", desc: "Vercel/AWS deployment with 24/7 monitoring.", icon: <Terminal /> },
  ];

  const techStack = [
    { name: 'Next.js', logo: 'https://www.vectorlogo.zone/logos/nextjs/nextjs-icon.svg' },
    { name: 'React', logo: 'https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg' },
    { name: 'TypeScript', logo: 'https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg' },
    { name: 'Tailwind', logo: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg' },
    { name: 'Node.js', logo: 'https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg' },
    { name: 'PostgreSQL', logo: 'https://www.vectorlogo.zone/logos/postgresql/postgresql-icon.svg' },
    { name: 'Firebase', logo: 'https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg' },
    { name: 'Docker', logo: 'https://www.vectorlogo.zone/logos/docker/docker-icon.svg' },
  ];

  return (
    <section className="bg-white min-h-screen selection:bg-indigo-100">
      
      {/* --- HERO SECTION --- */}
      <div className="relative overflow-hidden bg-slate-900 py-32">
        <div className="absolute inset-0 opacity-40">
          <Image 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop" 
            alt="Cyber Background" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div {...fadeIn}>
            <Link href="/services" className="inline-flex items-center text-indigo-400 font-bold mb-6 hover:text-indigo-300">
               <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to Services
            </Link>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8">
              Future-Proof <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Software</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              We engineer scalable web applications using the same stack as the world's leading tech giants. 
              Performance, security, and world-class UX are non-negotiable.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          
          <div className="lg:col-span-2">
            
            {/* UPDATED: Leadership Profile with Local Image */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-24 flex flex-col md:flex-row gap-10 items-center bg-indigo-50/50 p-10 rounded-[2.5rem] border border-indigo-100/50"
            >
              <div className="relative w-56 h-56 shrink-0">
                <div className="absolute inset-0 bg-indigo-600 rounded-[4rem] rotate-6" />
                <div className="relative z-10 w-56 h-56 overflow-hidden rounded-[4rem] bg-white shadow-2xl border-4 border-white">
                    <Image 
                      src="/lead-architect.jpg" // Using your local image
                      alt="Lead Systems Architect"
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-700"
                    />
                </div>
              </div>
              <div>
                <span className="text-indigo-600 font-black tracking-widest text-xs uppercase">Project Director</span>
                <h3 className="text-3xl font-black text-slate-900 mt-2 mb-4 tracking-tight">Ecosystem Engineering</h3>
                <p className="text-slate-600 mb-6 text-lg leading-relaxed italic">
                  "A website shouldn't just exist; it should perform. We build systems that handle 
                  high traffic while maintaining sub-second load times."
                </p>
                <div className="flex items-center gap-6">
                   <div className="flex -space-x-3">
                     {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200" />)}
                   </div>
                   <span className="text-sm font-bold text-slate-500">Trusted by 50+ Enterprises</span>
                </div>
              </div>
            </motion.div>

            {/* Core Capabilities */}
            <div className="mb-24">
              <h2 className="text-4xl font-black text-slate-900 mb-12 flex items-center gap-4">
                <Code2 className="text-indigo-600 w-10 h-10" /> Industrial Grade Development
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((f, i) => (
                  <div key={i} className="p-10 border border-slate-100 rounded-3xl bg-white hover:border-indigo-200 hover:shadow-xl transition-all group">
                    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      {f.icon}
                    </div>
                    <h4 className="font-bold text-xl text-slate-900 mb-3">{f.title}</h4>
                    <p className="text-slate-500 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* The Software Roadmap with Diagram */}
            <div className="mb-24">
              <h2 className="text-4xl font-black text-slate-900 mb-6">The Software Roadmap</h2>
              <p className="text-slate-500 mb-10 max-w-xl">We follow a rigorous SDLC (Software Development Life Cycle) to ensure zero-defect deployments.</p>
              
              

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
                {roadmap.map((item, i) => (
                  <div key={i} className="flex gap-6 p-8 rounded-3xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:shadow-lg transition-all">
                    <div className="text-3xl font-black text-indigo-100">{item.step}</div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
                        {item.title}
                      </h4>
                      <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Grid */}
            <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
               <div className="relative z-10">
                 <h3 className="text-3xl font-bold mb-10 flex items-center gap-3">
                   <Settings className="animate-spin-slow text-indigo-400" />
                   The Modern Tech Stack
                 </h3>
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                   {techStack.map((tech) => (
                     <div key={tech.name} className="flex flex-col items-center gap-4 group">
                       <div className="w-16 h-16 relative grayscale group-hover:grayscale-0 transition-all duration-500">
                          <Image src={tech.logo} alt={tech.name} fill className="object-contain" />
                       </div>
                       <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">{tech.name}</span>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="lg:sticky lg:top-12 h-fit">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-2xl shadow-indigo-100"
            >
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-[3rem] flex items-center justify-center mb-8 shadow-lg shadow-indigo-200">
                <Rocket className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4">Launch Now</h3>
              <p className="text-slate-500 mb-8 leading-relaxed text-lg">
                Stop losing customers to slow, outdated websites. Let's build a digital engine that grows with you.
              </p>
              
              <div className="space-y-5 mb-10">
                {[
                  'SEO & Speed Site Audit', 
                  'Custom Tech Architecture', 
                  'Post-Launch Support'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4 text-slate-700 font-bold">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <Link
                href="/services/service-request?service=web-development"
                className="group block w-full bg-slate-900 text-white text-center py-6 rounded-2xl font-black text-lg overflow-hidden transition-all hover:bg-indigo-600 active:scale-95 shadow-xl"
              >
                Start Build →
              </Link>
            </motion.div>

            {/* Performance Stats */}
            <div className="mt-10 p-10 bg-indigo-600 rounded-[2.5rem] text-white">
               <h4 className="font-black text-2xl mb-4 tracking-tighter uppercase italic">99.9% Uptime</h4>
               <p className="text-indigo-100 text-sm leading-relaxed mb-6">
                 We deploy to global edge networks, ensuring your site is fast for every user, anywhere in the world.
               </p>
               <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '99%' }}
                    transition={{ duration: 2 }}
                    className="h-full bg-white" 
                  />
               </div>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}