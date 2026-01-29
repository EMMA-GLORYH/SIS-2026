"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { 
  Mail, Linkedin, ChevronRight, ArrowRight, 
  ShieldCheck, Cpu, Code, Globe, Star, Zap
} from "lucide-react";
import Link from "next/link";

interface TeamMember {
  name: string;
  role: string;
  category: "Leadership" | "Engineering" | "Design";
  bio: string;
  image: string;
  initials: string;
  linkedin?: string;
}

const teamData: TeamMember[] = [
  {
    name: "Lead Architect",
    role: "Founding Partner & Lead Engineer",
    category: "Leadership",
    bio: "Specializing in institutional automation and secure cloud architecture.",
    image: "/images/team/lead.jpg",
    initials: "LA"
  },
  {
    name: "Sarah Chen",
    role: "Senior Full-Stack Developer",
    category: "Engineering",
    bio: "Expert in Next.js and high-performance database management.",
    image: "/images/team/member1.jpg",
    initials: "SC"
  },
  {
    name: "Marcus Tunde",
    role: "UI/UX Strategy Lead",
    category: "Design",
    bio: "Crafting simple, intuitive interfaces for complex digital systems.",
    image: "/images/team/member2.jpg",
    initials: "MT"
  },
  {
    name: "Elena Rodriguez",
    role: "Security Systems Specialist",
    category: "Engineering",
    bio: "Ensuring every portal we build meets global data protection standards.",
    image: "/images/team/member3.jpg",
    initials: "ER"
  }
];

export default function TeamPage() {
  const [filter, setFilter] = useState("All Members");
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const filteredTeam = teamData.filter(member => 
    filter === "All Members" ? true : member.category === filter
  );

  const handleImageError = (name: string) => {
    setImageErrors(prev => ({ ...prev, [name]: true }));
  };

  return (
    <main className="min-h-screen bg-white selection:bg-blue-600 selection:text-white overflow-x-hidden scroll-smooth">
      
      {/* --- CINEMATIC HERO SECTION --- */}
      <section className="relative min-h-[70vh] flex items-center pt-32 pb-20 overflow-hidden bg-[#001529]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
            alt="Team Background" 
            fill 
            className="object-cover opacity-20 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001529] via-[#001529]/95 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-left">
          <motion.nav 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-blue-400 font-bold text-[10px] md:text-xs mb-8 uppercase tracking-[0.4em]"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link> 
            <ChevronRight size={10} /> 
            <span className="text-white/50">Our Team</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.85]">
              The Minds Behind <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                The Mission.
              </span>
            </h1>
            <p className="text-base md:text-xl text-blue-100/70 leading-relaxed font-medium max-w-xl mb-10">
              A collective of engineers and designers dedicated to stripping away 
              technical complexity for modern institutions.
            </p>
          </motion.div>
        </div>
      </section>

  
      {/* --- BALANCED FILTER BAR --- */}
        <section className="relative -mt-20 z-20 pb-24 px-6">
          <div className="max-w-7xl mx-auto">
            
            {/* Grid ensures even distribution regardless of text length */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
            >
              {["All Members", "Leadership", "Engineering", "Design"].map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setFilter(cat)}
                  className={`w-full py-4 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 border ${
                    filter === cat 
                      ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/40 scale-[1.02]" 
                      : "bg-white border-slate-200 text-slate-500 hover:border-blue-400 hover:bg-slate-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>

            {/* --- TEAM GRID (Remains the same for consistency) --- */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredTeam.map((member) => (
                  <motion.div 
                    layout
                    key={member.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative bg-white rounded-[2.5rem] p-4 border border-slate-100 hover:shadow-2xl transition-all"
                  >
                    {/* Portrait Container */}
                    <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-900 mb-6">
                      {!imageErrors[member.name] ? (
                        <Image 
                          src={member.image} 
                          alt={member.name} 
                          fill 
                          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                          onError={() => handleImageError(member.name)}
                        />
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-white">
                          <span className="text-4xl font-black opacity-10 mb-2">SIS</span>
                          <span className="text-lg font-bold tracking-widest uppercase">{member.initials}</span>
                        </div>
                      )}
                    </div>

                    <div className="px-2">
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">{member.role}</p>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tighter mb-2">{member.name}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{member.bio}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

      {/* --- TEAM STATS --- */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { label: "Engineering Hours", val: "10k+", icon: Cpu },
            { label: "Success Rate", val: "100%", icon: Star },
            { label: "Global Clients", val: "50+", icon: Globe },
            { label: "Fast Support", val: "24/7", icon: Zap },
          ].map((stat, i) => (
            <div key={i} className="text-center lg:text-left">
              <div className="text-blue-600 mb-4 flex justify-center lg:justify-start">
                <stat.icon size={32} strokeWidth={1.5} />
              </div>
              <h4 className="text-3xl font-black text-slate-900 tracking-tighter mb-1">{stat.val}</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- JOIN CTA --- */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3.5rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-6xl font-black text-white mb-8 tracking-tighter">Join the SIS Team.</h2>
            <p className="text-blue-100/60 text-lg mb-10 max-w-xl mx-auto font-medium">
              We are always looking for obsessive engineers and creative thinkers 
              to help us build simple solutions for complex problems.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20">
              Apply Now <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}