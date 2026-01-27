"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Users, 
  Laptop, 
  ShieldCheck, 
  ArrowLeft, 
  User, 
  CheckCircle2, 
  Rocket, 
  ArrowRight,
  Zap,
  Search,
  BookMarked,
  GraduationCap,
  Settings,
  Globe,
  Award
} from "lucide-react";

export default function ICTTeachingPage() {
  const [imgError, setImgError] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: "easeOut" as const }
  };

  const teachingCapabilities = [
    { title: "Digital Literacy", desc: "Equipping students with essential computer navigation and digital citizenship.", icon: <Globe className="w-6 h-6" /> },
    { title: "Productivity Suites", desc: "Expert training in MS Office, Google Workspace, and data visualization.", icon: <BookOpen className="w-6 h-6" /> },
    { title: "STEM & Coding", desc: "Building logic through Scratch, Python, and robotics fundamentals.", icon: <Zap className="w-6 h-6" /> },
    { title: "E-Safety", desc: "Comprehensive modules on data privacy, cyberbullying, and web security.", icon: <ShieldCheck className="w-6 h-6" /> },
  ];

  const teachingProcess = [
    { step: "01", title: "Needs Analysis", desc: "Assessing current student knowledge and school infrastructure.", icon: <Search /> },
    { step: "02", title: "Curriculum Alignment", desc: "Designing lessons that meet GES and international standards.", icon: <BookMarked /> },
    { step: "03", title: "Interactive Delivery", desc: "Project-based learning and hands-on laboratory sessions.", icon: <Users /> },
    { step: "04", title: "Certification", desc: "Periodic assessments and formal progress tracking.", icon: <GraduationCap /> },
  ];

  const topicsCovered = [
    'MS Office Mastery', 'Cloud Computing', 'Intro to Python', 'Internet Safety', 
    'Hardware Basics', 'Digital Research', 'Algorithm Design', 'Typing Skills'
  ];

  return (
    <section className="bg-white min-h-screen selection:bg-indigo-100">
      
      {/* --- HERO SECTION --- */}
      <div className="relative overflow-hidden bg-slate-900 py-32">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop" 
            alt="Classroom Technology" 
            fill 
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-slate-900/60 via-slate-900/80 to-slate-900" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center lg:text-left">
          <motion.div {...fadeIn}>
            <Link 
              href="/services" 
              className="group inline-flex items-center text-emerald-400 font-bold mb-8 hover:text-emerald-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-2 transition-transform" />
              Back to Services
            </Link>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-none">
              ICT <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">Education</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
              We empower the next generation of digital leaders. Our part-time ICT training 
              brings industry-level expertise directly into schools and community centers.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          
          {/* --- LEFT CONTENT AREA --- */}
          <div className="lg:col-span-2">
            
            {/* Lead Trainer Card (Local Image) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-24 flex flex-col md:flex-row gap-10 items-center bg-emerald-50/30 p-10 rounded-[2.5rem] border border-emerald-100"
            >
              <div className="relative w-56 h-56 shrink-0 group">
                <div className="absolute inset-0 bg-emerald-600 rounded-3xl rotate-6 group-hover:rotate-3 transition-transform duration-500" />
                <div className="relative z-10 w-56 h-56 overflow-hidden rounded-3xl bg-slate-200 shadow-2xl border-4 border-white">
                  {!imgError ? (
                    <Image 
                      src="/images/theo.jpg" // Local image as requested
                      alt="Theo Awuah"
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100">
                      <User size={80} className="text-slate-400" />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <span className="text-emerald-600 font-black tracking-widest text-xs uppercase italic">Head of Training</span>
                <h3 className="text-3xl font-black text-slate-900 mt-2 mb-4 tracking-tight">Theo Awuah</h3>
                <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                  "Digital literacy is no longer an option; it's a fundamental human right. 
                  My focus is on creating curious, capable, and safe digital citizens."
                </p>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2 text-sm font-bold text-emerald-700 bg-emerald-100 px-4 py-2 rounded-full">
                    <Award className="w-4 h-4" /> GES Curriculum Expert
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Core Capabilities */}
            <div className="mb-24">
              <h2 className="text-4xl font-black text-slate-900 mb-12 flex items-center gap-4">
                <Laptop className="text-emerald-600 w-10 h-10" /> Instructional Focus
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {teachingCapabilities.map((cap, i) => (
                  <div key={i} className="p-10 border border-slate-100 rounded-3xl bg-white shadow-sm hover:shadow-2xl hover:border-emerald-100 transition-all group">
                    <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      {cap.icon}
                    </div>
                    <h4 className="font-bold text-xl text-slate-900 mb-3">{cap.title}</h4>
                    <p className="text-slate-600 leading-relaxed">{cap.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Educational Visualization */}
            <div className="mb-24">
              <h2 className="text-4xl font-black text-slate-900 mb-12">The Learning Journey</h2>
              <div className="relative h-96 w-full rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl">
                 <Image 
                   src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200" 
                   alt="Modern ICT Lab Training" 
                   fill 
                   className="object-cover"
                 />
                 <div className="absolute inset-0 bg-emerald-900/40 flex items-center justify-center text-center px-6">
                    <div className="max-w-md px-10 py-6 bg-white/95 backdrop-blur rounded-3xl">
                       <p className="font-black text-emerald-900 uppercase tracking-widest text-sm mb-2">Project-Based Learning</p>
                       <h4 className="text-xl font-bold text-slate-900 leading-tight">From Theory to Real-World Application</h4>
                    </div>
                 </div>
              </div>
              
              
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {teachingProcess.map((item, i) => (
                  <div key={i} className="flex gap-6 p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white transition-all">
                    <div className="text-3xl font-black text-emerald-200">{item.step}</div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                        <span className="text-emerald-600 scale-75">{item.icon}</span> {item.title}
                      </h4>
                      <p className="text-sm text-slate-500 mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Syllabus Tech Chips */}
            <motion.div {...fadeIn} className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-10">
                    <BookMarked className="text-emerald-400" />
                    <h3 className="text-3xl font-bold">Comprehensive Curriculum</h3>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {topicsCovered.map((topic) => (
                      <span key={topic} className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold text-emerald-300 hover:bg-emerald-500 hover:text-white transition-all cursor-default">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
            </motion.div>
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="lg:sticky lg:top-12 h-fit">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50"
            >
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-emerald-200">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Partner With Us</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Elevate your school's technological standard with expert part-time ICT instructors.
              </p>
              
              <div className="space-y-5 mb-10">
                {[
                  'Custom Lesson Planning', 
                  'Hands-on Lab Guidance', 
                  'Student Performance Metrics'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4 text-slate-700 font-bold text-sm">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <Link
                href="/services/service-request?service=ict-teaching"
                className="group relative block w-full bg-slate-900 text-white text-center py-6 rounded-2xl font-black text-lg overflow-hidden transition-all hover:bg-emerald-600 active:scale-95 shadow-xl"
              >
                Request a Proposal
              </Link>
            </motion.div>

            {/* Impact Quote */}
            <div className="mt-8 p-10 bg-indigo-900 rounded-[2.5rem] text-white">
               <Users className="w-10 h-10 mb-4 text-emerald-400" />
               <h4 className="font-black text-xl mb-2">Community Impact</h4>
               <p className="text-indigo-200 text-sm leading-relaxed">
                 We've trained over 500+ students across various districts, bridging the gap between classroom theory and real-world tech.
               </p>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}