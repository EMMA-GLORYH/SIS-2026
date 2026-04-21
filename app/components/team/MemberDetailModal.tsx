"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight, Cpu, Globe, Zap, Mail, Linkedin,
  Github, Twitter, Facebook, Instagram, Video, Users
} from "lucide-react";
import { TeamMember } from "@/types/team";

interface ModalProps {
  member: TeamMember;
  onClose: () => void;
}

export default function MemberDetailModal({ member, onClose }: ModalProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#001529]/95 backdrop-blur-xl"
    >
      {/* Background click to close */}
      <div className="absolute inset-0 z-0" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-6xl h-[90vh] md:h-auto md:max-h-[85vh] rounded-[3rem] overflow-hidden relative flex flex-col md:flex-row shadow-2xl z-10"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 md:top-8 md:right-8 z-50 p-3 bg-slate-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-all active:scale-90"
        >
          <ArrowRight className="rotate-180" size={24} />
        </button>

        {/* LEFT COLUMN: IDENTITY & STACK */}
        <div className="w-full md:w-[40%] bg-slate-50 p-8 md:p-12 overflow-y-auto border-r border-slate-100">
          {/* Avatar */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden mb-8 shadow-xl bg-slate-800 border-4 border-white">
            {!imageError ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white text-4xl font-black">
                {member.initials}
              </div>
            )}
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-[#002147] tracking-tighter mb-2">{member.name}</h2>
          <p className="text-blue-600 font-black uppercase tracking-[0.2em] text-xs mb-6">{member.role}</p>

          {/* Social Links */}
          {Object.keys(member.socials).length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {member.socials.email && (
                <Link href={`mailto:${member.socials.email}`} className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all group" title="Email">
                  <Mail size={16} className="text-slate-500 group-hover:text-blue-600" />
                </Link>
              )}
              {member.socials.linkedin && (
                <Link href={member.socials.linkedin} target="_blank" className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all group" title="LinkedIn">
                  <Linkedin size={16} className="text-slate-500 group-hover:text-blue-600" />
                </Link>
              )}
              {member.socials.github && (
                <Link href={member.socials.github} target="_blank" className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-all group" title="GitHub">
                  <Github size={16} className="text-slate-500 group-hover:text-slate-900" />
                </Link>
              )}
              {member.socials.twitter && (
                <Link href={member.socials.twitter} target="_blank" className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-sky-50 hover:border-sky-200 transition-all group" title="Twitter / X">
                  <Twitter size={16} className="text-slate-500 group-hover:text-sky-500" />
                </Link>
              )}
              {member.socials.facebook && (
                <Link href={member.socials.facebook} target="_blank" className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all group" title="Facebook">
                  <Facebook size={16} className="text-slate-500 group-hover:text-blue-700" />
                </Link>
              )}
              {member.socials.instagram && (
                <Link href={member.socials.instagram} target="_blank" className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-pink-50 hover:border-pink-200 transition-all group" title="Instagram">
                  <Instagram size={16} className="text-slate-500 group-hover:text-pink-600" />
                </Link>
              )}
              {member.socials.tiktok && (
                <Link href={member.socials.tiktok} target="_blank" className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-all group" title="TikTok">
                  <Video size={16} className="text-slate-500 group-hover:text-slate-900" />
                </Link>
              )}
            </div>
          )}

          <div className="space-y-8">
            {/* Tech Stack */}
            <div>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Cpu size={14} /> Core Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {member.techStack.map(stack =>
                  stack.skills.map(skill => (
                    <span key={skill} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm">
                      {skill}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Academics */}
            <div>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Globe size={14} /> Academic Background
              </h4>
              <div className="space-y-4">
                {member.academics.map((edu, i) => (
                  <div key={i} className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                    <p className="text-sm font-black text-[#002147] leading-tight">{edu.degree}</p>
                    <p className="text-xs text-slate-500 font-medium mt-1">{edu.institution} • {edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: BIO & HIERARCHY */}
        <div className="flex-1 p-8 md:p-16 overflow-y-auto bg-white">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-black text-[#002147] mb-6 mt-12 md:mt-0">Professional Narrative</h3>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium mb-10">
              {member.fullBio}
            </p>

            {/* Organizational Hierarchy Section */}
            {member.directReports && member.directReports.length > 0 && (
              <div className="mb-10 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Users size={14} /> Team Leadership & Direct Reports
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {member.directReports.map((report, idx) => (
                    <DirectReportCard key={idx} report={report} />
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10 border-t border-slate-100">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Availability</p>
                <p className="text-sm font-bold text-slate-900">Immediate Technical Consulting</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Location</p>
                <p className="text-sm font-bold text-slate-900">Winneba, Ghana</p>
              </div>
            </div>

            {member.socials.email && (
              <Link
                href={`mailto:${member.socials.email}`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#002147] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-blue-900/20 group w-full md:w-auto justify-center"
              >
                Collaborate with {member.name.split(' ')[0]}
                <Zap size={18} className="text-yellow-400 group-hover:scale-125 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* Small card for each direct report with its own image error state */
function DirectReportCard({ report }: { report: { name: string; role: string; image: string } }) {
  const [err, setErr] = useState(false);
  const initials = report.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-blue-600 shrink-0 flex items-center justify-center">
        {!err ? (
          <Image src={report.image} alt={report.name} fill className="object-cover" onError={() => setErr(true)} />
        ) : (
          <span className="text-white text-xs font-black">{initials}</span>
        )}
      </div>
      <div>
        <p className="text-sm font-bold text-[#002147] leading-tight">{report.name}</p>
        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{report.role}</p>
      </div>
    </div>
  );
}