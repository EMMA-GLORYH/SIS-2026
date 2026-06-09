"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ChevronRight, ArrowRight, Cpu, Globe, Star, Zap } from "lucide-react";
import Link from "next/link";

import { TeamMember } from "@/app/types/team";
import MemberDetailModal from "@/app/components/team/MemberDetailModal";

const teamData: TeamMember[] = [
  {
    name: "Emmanuel Hienwo",
    role: "Lead Architect & Founder",
    category: "Leadership",
    bio: "Specializing in institutional automation and secure cloud architecture.",
    fullBio: "Emmanuel leads the architectural vision at SIS, focusing on highly scalable, real-time tracking systems and enterprise resource planning. He bridges the gap between complex hardware protocols and intuitive user interfaces.",
    academics: [
      { degree: "BSc. Information Technology", institution: "University of Education, Winneba", year: "2026" }
    ],
    techStack: [
      { category: "Frontend", skills: ["Next.js", "Flutter", "Tailwind"] },
      { category: "Backend", skills: ["Supabase", "Go", "PostgreSQL"] }
    ],
    image: "/images/team/lead.jpg",
    initials: "EH",
    socials: { email: "emmanuel@sis.com", linkedin: "#", github: "#" },
    directReports: [
      { name: "Sarah Chen", role: "Senior Developer", image: "/images/team/member1.jpg" },
      { name: "Stephen Amponsah", role: "UI/UX Strategy Lead", image: "/images/team/stephen.jpg" }
    ]
  },
  {
    name: "Stephen Amponsah",
    role: "UI/UX Strategy Lead",
    category: "Design",
    bio: "Focusing on accessibility and intuitive user journeys for complex tools.",
    fullBio: "Stephen ensures that our enterprise tools are not only functional but a joy to use. He specializes in design systems that scale across web and mobile platforms.",
    academics: [
      { degree: "BSc. Information Technology Education", institution: "UEW", year: "2022" }
    ],
    techStack: [
      { category: "Design", skills: ["Figma", "Adobe CC", "Framer"] }
    ],
    image: "/images/team/stephen.jpg",
    initials: "SA",
    socials: { twitter: "#", linkedin: "#" }
  },
  {
    name: "Sarah Chen",
    role: "Senior Developer",
    category: "Engineering",
    bio: "Expert in Next.js and high-performance database management.",
    fullBio: "Sarah handles our data architecture and ensures real-time systems sync perfectly with our frontend interfaces.",
    academics: [
      { degree: "MSc. Computer Science", institution: "Tech Institute", year: "2023" }
    ],
    techStack: [
      { category: "Fullstack", skills: ["TypeScript", "Node.js", "Prisma"] }
    ],
    image: "/images/team/member1.jpg",
    initials: "SC",
    socials: { github: "#", email: "sarah@NGI.com" }
  }
];

const CATEGORIES = ["All Members", "Leadership", "Engineering", "Design"] as const;

export default function TeamPage() {
  const [filter, setFilter] = useState<string>("All Members");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const filteredTeam = teamData.filter(member =>
    filter === "All Members" ? true : member.category === filter
  );

  const handleImageError = (name: string) => {
    setImageErrors(prev => ({ ...prev, [name]: true }));
  };

  return (
    <main className="min-h-screen bg-white selection:bg-blue-600 selection:text-white overflow-x-hidden scroll-smooth">

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden bg-[#001529]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
            alt="Background" fill className="object-cover opacity-20 grayscale" priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001529] via-[#001529]/95 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.nav
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-blue-400 font-bold text-xs mb-8 uppercase tracking-[0.4em]"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={10} />
            <span className="text-white/50">Our Team</span>
          </motion.nav>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-[0.85]">
              The <span className="text-blue-400">Team.</span>
            </h1>
            <p className="text-base md:text-xl text-blue-100/70 max-w-xl font-medium leading-relaxed">
              Engineering the digital future of Ghana's transport and institutional systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FILTER BAR + TEAM GRID */}
      <section className="relative -mt-20 z-20 pb-24 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Filter Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all border ${
                  filter === cat
                    ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/40 scale-[1.02]"
                    : "bg-white border-slate-200 text-slate-500 hover:border-blue-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredTeam.map((member) => (
                <motion.div
                  layout
                  key={member.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setSelectedMember(member)}
                  className="group bg-white rounded-[2.5rem] p-4 border border-slate-100 hover:shadow-2xl transition-all cursor-pointer"
                >
                  <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-900 mb-6">
                    {!imageErrors[member.name] ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        onError={() => handleImageError(member.name)}
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center bg-blue-600 text-white">
                        <span className="text-4xl font-black">{member.initials}</span>
                      </div>
                    )}
                  </div>
                  <div className="px-2">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">{member.role}</p>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter mb-2">{member.name}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* STATS SLIDER */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 overflow-hidden relative">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="flex gap-24 px-12 items-center">
              <StatItem val="10k+" label="Engineering Hours" icon={Cpu} />
              <StatItem val="100%" label="Success Rate" icon={Star} />
              <StatItem val="50+" label="Live Deployments" icon={Globe} />
              <StatItem val="24/7" label="System Monitoring" icon={Zap} />
            </div>
          ))}
        </motion.div>
      </section>

      {/* MEMBER DETAIL MODAL */}
      <AnimatePresence>
        {selectedMember && (
          <MemberDetailModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function StatItem({ val, label, icon: Icon }: { val: string; label: string; icon: any }) {
  return (
    <div className="flex items-center gap-6">
      <Icon size={40} className="text-blue-600" strokeWidth={1.5} />
      <div>
        <h4 className="text-4xl font-black text-slate-900 tracking-tighter">{val}</h4>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      </div>
    </div>
  );
}