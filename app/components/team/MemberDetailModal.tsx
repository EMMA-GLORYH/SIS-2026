"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  X, Cpu, Globe, Zap, Mail, Linkedin,
  Github, Twitter, Facebook, Instagram, Video, Users,
  MapPin, Briefcase
} from "lucide-react";
import { TeamMember } from "@/app/types/team";

interface ModalProps {
  member: TeamMember;
  onClose: () => void;
}

/* Canvas particle background */
function ModalCanvas({ variant = "light" }: { variant?: "light" | "dark" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number; y: number; vx: number; vy: number; radius: number; opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };

    const initParticles = () => {
      particles = [];
      const count = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 12000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          radius: Math.random() * 1.5 + 0.3,
          opacity: Math.random() * 0.15 + 0.05,
        });
      }
    };

    const color = variant === "dark" ? "250, 249, 246" : "17, 17, 17";

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${color}, ${0.04 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    initParticles();
    draw();

    const resizeHandler = () => { resize(); initParticles(); };
    window.addEventListener("resize", resizeHandler);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeHandler);
    };
  }, [variant]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export default function MemberDetailModal({ member, onClose }: ModalProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#111111]/80 backdrop-blur-xl"
    >
      {/* Background click to close */}
      <div className="absolute inset-0 z-0" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="bg-[#FAF9F6] w-full max-w-6xl h-[92vh] md:h-auto md:max-h-[88vh] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden relative flex flex-col md:flex-row shadow-2xl z-10 border border-[#e6dcc9]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 md:top-6 md:right-6 z-50 w-11 h-11 bg-[#111111] hover:bg-[#222222] rounded-full flex items-center justify-center transition-all active:scale-90 group shadow-lg"
        >
          <X size={20} className="text-[#FAF9F6] group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* LEFT COLUMN: IDENTITY & STACK - BLACK */}
        <div className="w-full md:w-[42%] bg-[#111111] p-8 md:p-12 overflow-y-auto relative">
          <ModalCanvas variant="dark" />

          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FAF9F6]/3 rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#FAF9F6]/3 rounded-full pointer-events-none" />

          <div className="relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FAF9F6]/10 backdrop-blur-sm rounded-full border border-[#FAF9F6]/10 mb-8"
            >
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-[9px] font-black text-[#FAF9F6]/60 uppercase tracking-[0.2em]">
                Team Member Profile
              </span>
            </motion.div>

            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden mb-8 shadow-2xl bg-[#1a1a1a] border-4 border-[#FAF9F6]/10"
            >
              {!imageError ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-600 text-[#FAF9F6] text-4xl font-black">
                  {member.initials}
                </div>
              )}
              {/* Status indicator */}
              <div className="absolute bottom-3 right-3 w-4 h-4 bg-green-400 rounded-full border-2 border-[#111111] shadow-lg" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-black text-[#FAF9F6] tracking-tight mb-2 leading-tight"
            >
              {member.name}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="flex items-center gap-2 mb-8"
            >
              <div className="w-8 h-[2px] bg-blue-400" />
              <p className="text-blue-300 font-black uppercase tracking-[0.2em] text-[10px]">
                {member.role}
              </p>
            </motion.div>

            {/* Social Links */}
            {Object.keys(member.socials).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <p className="text-[9px] font-black text-[#FAF9F6]/30 uppercase tracking-[0.25em] mb-3">
                  Connect
                </p>
                <div className="flex flex-wrap gap-2">
                  {member.socials.email && (
                    <SocialLink href={`mailto:${member.socials.email}`} icon={Mail} title="Email" />
                  )}
                  {member.socials.linkedin && (
                    <SocialLink href={member.socials.linkedin} icon={Linkedin} title="LinkedIn" external />
                  )}
                  {member.socials.github && (
                    <SocialLink href={member.socials.github} icon={Github} title="GitHub" external />
                  )}
                  {member.socials.twitter && (
                    <SocialLink href={member.socials.twitter} icon={Twitter} title="Twitter / X" external />
                  )}
                  {member.socials.facebook && (
                    <SocialLink href={member.socials.facebook} icon={Facebook} title="Facebook" external />
                  )}
                  {member.socials.instagram && (
                    <SocialLink href={member.socials.instagram} icon={Instagram} title="Instagram" external />
                  )}
                  {member.socials.tiktok && (
                    <SocialLink href={member.socials.tiktok} icon={Video} title="TikTok" external />
                  )}
                </div>
              </motion.div>
            )}

            {/* Divider */}
            <div className="h-px bg-[#FAF9F6]/10 mb-8" />

            <div className="space-y-8">
              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <h4 className="text-[9px] font-black text-[#FAF9F6]/30 uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
                  <Cpu size={12} /> Core Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {member.techStack.map(stack =>
                    stack.skills.map(skill => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-[#FAF9F6]/5 hover:bg-[#FAF9F6]/10 border border-[#FAF9F6]/10 rounded-lg text-[10px] font-bold text-[#FAF9F6]/80 transition-colors uppercase tracking-wider"
                      >
                        {skill}
                      </span>
                    ))
                  )}
                </div>
              </motion.div>

              {/* Academics */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h4 className="text-[9px] font-black text-[#FAF9F6]/30 uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
                  <Globe size={12} /> Academic Background
                </h4>
                <div className="space-y-3">
                  {member.academics.map((edu, i) => (
                    <div
                      key={i}
                      className="bg-[#FAF9F6]/5 hover:bg-[#FAF9F6]/[0.08] p-4 rounded-xl border border-[#FAF9F6]/10 transition-colors"
                    >
                      <p className="text-xs font-black text-[#FAF9F6] leading-tight">{edu.degree}</p>
                      <p className="text-[10px] text-[#FAF9F6]/40 font-medium mt-1.5">
                        {edu.institution} · {edu.year}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: BIO & HIERARCHY - CREAM/WHITE */}
        <div className="flex-1 overflow-y-auto bg-[#FAF9F6] relative">
          <ModalCanvas variant="light" />

          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <div className="max-w-2xl">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8 mt-12 md:mt-0"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-[2px] bg-[#111111]" />
                  <p className="text-[9px] font-black text-[#111111]/40 uppercase tracking-[0.25em]">
                    Professional Narrative
                  </p>
                </div>
                <h3 className="font-playfair text-3xl md:text-4xl font-black text-[#111111] tracking-tight leading-tight">
                  About {member.name.split(' ')[0]}
                </h3>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[#444444] text-base md:text-[15px] leading-relaxed font-medium mb-10"
              >
                {member.fullBio}
              </motion.p>

              {/* Organizational Hierarchy Section */}
              {member.directReports && member.directReports.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-10 p-6 bg-white rounded-2xl border border-[#e6dcc9]/60 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-5">
                    <h4 className="text-[9px] font-black text-[#111111]/40 uppercase tracking-[0.25em] flex items-center gap-2">
                      <Users size={12} /> Team Leadership
                    </h4>
                    <span className="text-[9px] font-black text-[#111111]/30 uppercase tracking-wider">
                      {member.directReports.length} Direct {member.directReports.length === 1 ? 'Report' : 'Reports'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {member.directReports.map((report, idx) => (
                      <DirectReportCard key={idx} report={report} delay={0.45 + idx * 0.05} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Info Grid */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
              >
                <div className="p-5 bg-white rounded-2xl border border-[#e6dcc9]/60">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase size={12} className="text-[#111111]/40" />
                    <p className="text-[9px] font-black text-[#111111]/40 uppercase tracking-[0.2em]">
                      Availability
                    </p>
                  </div>
                  <p className="text-sm font-bold text-[#111111]">Immediate Technical Consulting</p>
                </div>
                <div className="p-5 bg-white rounded-2xl border border-[#e6dcc9]/60">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={12} className="text-[#111111]/40" />
                    <p className="text-[9px] font-black text-[#111111]/40 uppercase tracking-[0.2em]">
                      Location
                    </p>
                  </div>
                  <p className="text-sm font-bold text-[#111111]">Winneba, Ghana</p>
                </div>
              </motion.div>

              {/* CTA */}
              {member.socials.email && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    href={`mailto:${member.socials.email}`}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#111111] hover:bg-[#222222] text-[#FAF9F6] rounded-2xl font-black text-xs uppercase tracking-[0.15em] transition-all shadow-xl w-full md:w-auto justify-center overflow-hidden"
                  >
                    {/* Shimmer */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FAF9F6]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                    <span className="relative z-10 flex items-center gap-3">
                      Collaborate with {member.name.split(' ')[0]}
                      <Zap size={16} className="text-blue-400 group-hover:scale-125 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* Social Link Component */
function SocialLink({
  href, icon: Icon, title, external = false
}: {
  href: string; icon: any; title: string; external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      className="w-10 h-10 flex items-center justify-center bg-[#FAF9F6]/5 hover:bg-[#FAF9F6]/15 border border-[#FAF9F6]/10 hover:border-[#FAF9F6]/30 rounded-xl transition-all active:scale-95 group"
      title={title}
    >
      <Icon size={14} className="text-[#FAF9F6]/60 group-hover:text-[#FAF9F6] transition-colors" />
    </Link>
  );
}

/* Direct Report Card */
function DirectReportCard({
  report, delay = 0
}: {
  report: { name: string; role: string; image: string }; delay?: number;
}) {
  const [err, setErr] = useState(false);
  const initials = report.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex items-center gap-3 bg-[#FAF9F6] p-3 rounded-xl border border-[#e6dcc9]/60 hover:border-[#111111]/20 hover:bg-white transition-all group"
    >
      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[#111111] shrink-0 flex items-center justify-center">
        {!err ? (
          <Image src={report.image} alt={report.name} fill className="object-cover" onError={() => setErr(true)} />
        ) : (
          <span className="text-[#FAF9F6] text-[10px] font-black">{initials}</span>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold text-[#111111] leading-tight truncate">{report.name}</p>
        <p className="text-[9px] font-black text-[#111111]/40 uppercase tracking-wider mt-0.5 truncate">
          {report.role}
        </p>
      </div>
    </motion.div>
  );
}