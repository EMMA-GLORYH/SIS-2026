"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { 
  Mail, Linkedin, ChevronRight, ArrowRight, 
  Cpu, Globe, Star, Zap, Github, Twitter, 
  Instagram, Facebook, Video 
} from "lucide-react";
import Link from "next/link";

/**
 * INTERFACE & DATA
 * Add new members to the teamData array below.
 */
interface TeamMember {
  name: string;
  role: string;
  category: "Leadership" | "Engineering" | "Design";
  bio: string;
  image: string;
  initials: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    facebook?: string;
    tiktok?: string;
    instagram?: string;
    email?: string;
  };
}

const teamData: TeamMember[] = [
  {
    name: "Lead Architect",
    role: "Founding Partner",
    category: "Leadership",
    bio: "Specializing in institutional automation and secure cloud architecture.",
    image: "/images/team/lead.jpg",
    initials: "LA",
    socials: {
      linkedin: "#",
      twitter: "#",
      github: "#",
      facebook: "#",
      tiktok: "#",
      instagram: "#",
      email: "lead@sis.com"
    }
  },
  {
    name: "Sarah Chen",
    role: "Senior Developer",
    category: "Engineering",
    bio: "Expert in Next.js and high-performance database management for scale.",
    image: "/images/team/member1.jpg",
    initials: "SC",
    socials: {
      linkedin: "#",
      github: "#",
      instagram: "#",
      twitter: "#"
    }
  },
  {
    name: "Marcus Tunde",
    role: "UI/UX Strategy Lead",
    category: "Design",
    bio: "Focusing on accessibility and intuitive user journeys for complex tools.",
    image: "/images/team/member2.jpg",
    initials: "MT",
    socials: {
      linkedin: "#",
      instagram: "#",
      tiktok: "#"
    }
  },
  {
    name: "Elena Rodriguez",
    role: "Security Specialist",
    category: "Engineering",
    bio: "Hardening system infrastructure and ensuring global compliance standards.",
    image: "/images/team/member3.jpg",
    initials: "ER",
    socials: {
      linkedin: "#",
      github: "#",
      email: "elena@sis.com"
    }
  }
  // TO ADD MORE MEMBERS: Copy one of the blocks above and paste it here.
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
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden bg-[#001529]">
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
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-[0.85]">
              The <span className="text-blue-400">Team.</span>
            </h1>
            <p className="text-base md:text-xl text-blue-100/70 max-w-xl font-medium leading-relaxed">
              A collective of engineers and designers building the tools of tomorrow. 
              We turn complex problems into simple digital experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- BALANCED FILTER BAR --- */}
      <section className="relative -mt-20 z-20 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          
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

          {/* --- TEAM GRID --- */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 min-h-[500px]">
            <AnimatePresence mode="popLayout">
              {filteredTeam.map((member) => (
                <motion.div 
                  layout
                  key={member.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative bg-white rounded-[2.5rem] p-4 border border-slate-100 hover:shadow-2xl transition-all duration-500"
                >
                  {/* Portrait Container with Vertical Socials */}
                  <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-900 mb-6">
                    {!imageErrors[member.name] ? (
                      <Image 
                        src={member.image} 
                        alt={member.name} 
                        fill 
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        onError={() => handleImageError(member.name)}
                      />
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-white">
                        <span className="text-4xl font-black opacity-10 mb-2">SIS</span>
                        <span className="text-lg font-bold tracking-widest uppercase">{member.initials}</span>
                      </div>
                    )}

                    {/* VERTICAL SOCIAL DOCK (Visible on hover) */}
                    <div className="absolute top-4 right-4 bottom-4 flex flex-col justify-center gap-2 translate-x-16 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 z-30">
                      <SocialIcon href={member.socials.linkedin} icon={<Linkedin size={16} />} color="hover:bg-blue-600" />
                      <SocialIcon href={member.socials.twitter} icon={<Twitter size={16} />} color="hover:bg-black" />
                      <SocialIcon href={member.socials.github} icon={<Github size={16} />} color="hover:bg-slate-800" />
                      <SocialIcon href={member.socials.facebook} icon={<Facebook size={16} />} color="hover:bg-blue-700" />
                      <SocialIcon href={member.socials.instagram} icon={<Instagram size={16} />} color="hover:bg-pink-600" />
                      <SocialIcon href={member.socials.tiktok} icon={<Video size={16} />} color="hover:bg-cyan-500" />
                      <SocialIcon href={`mailto:${member.socials.email}`} icon={<Mail size={16} />} color="hover:bg-red-500" />
                    </div>
                  </div>

                  <div className="px-2">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">{member.role}</p>
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
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 text-center lg:text-left">
          {[
            { label: "Engineering Hours", val: "10k+", icon: Cpu },
            { label: "Success Rate", val: "100%", icon: Star },
            { label: "Global Clients", val: "50+", icon: Globe },
            { label: "Fast Support", val: "24/7", icon: Zap },
          ].map((stat, i) => (
            <div key={i}>
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
            <p className="text-blue-100/60 text-lg mb-10 max-w-xl mx-auto font-medium leading-relaxed">
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

/**
 * HELPER COMPONENT: SocialIcon
 * Renders a stylized link button only if a valid href is provided.
 */
function SocialIcon({ href, icon, color }: { href?: string, icon: React.ReactNode, color: string }) {
  if (!href || href === "#") {
    // Note: You can change the condition above to allow "#" if you want to test the look
    // of the icons before you have the actual URLs.
    if (href !== "#") return null; 
  }
  
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white transition-all duration-300 ${color} hover:scale-110 shadow-lg`}
    >
      {icon}
    </a>
  );
}