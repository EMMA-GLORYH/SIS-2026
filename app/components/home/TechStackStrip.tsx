"use client";

import { motion } from "framer-motion";

const TECH_STACK = [
  { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/000000" },
  { name: "AWS", logo: "https://cdn.simpleicons.org/amazonwebservices/232F3E" },
  { name: "React", logo: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "Tailwind", logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
];

export default function TechStackStrip() {
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
            <div
              key={idx}
              className="flex items-center gap-3 md:gap-4 group grayscale hover:grayscale-0 transition-all opacity-40 hover:opacity-100 cursor-default"
            >
              <img src={tech.logo} alt={tech.name} className="h-6 md:h-8 w-auto object-contain" />
              <span className="text-sm md:text-lg font-black tracking-tighter text-[#111111] uppercase">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}