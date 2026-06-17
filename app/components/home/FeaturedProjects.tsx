"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, ExternalLink, FolderOpen } from "lucide-react";
import { supabase } from "@/lib/supabase";

/* ───────── Canvas Background ───────── */
function SectionCanvas({ variant = "dark" }: { variant?: "light" | "dark" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const color = variant === "dark" ? "250,249,246" : "17,17,17";

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const W   = canvas.offsetWidth;
      const H   = canvas.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);

      /*
       * Grid-based dots: spacing keeps density even so lines
       * never cluster or overlap — guarantees uniform thickness.
       */
      const spacing = 70;          // px between grid cells
      const jitter  = 12;          // max random offset per dot
      const maxDist = spacing * 1.6; // connect dots within ~1.6 cells
      const seed    = 42;          // deterministic jitter via simple LCG

      // Tiny seeded PRNG so the pattern is identical every render
      let s = seed;
      const rand = () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };

      const cols = Math.ceil(W / spacing) + 1;
      const rows = Math.ceil(H / spacing) + 1;

      // Build grid with slight jitter
      const dots: { x: number; y: number }[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            x: c * spacing + (rand() - 0.5) * jitter * 2,
            y: r * spacing + (rand() - 0.5) * jitter * 2,
          });
        }
      }

      // Draw lines first (under dots)
      ctx.lineWidth   = 0.75;
      ctx.strokeStyle = `rgba(${color}, 0.22)`;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx   = dots[i].x - dots[j].x;
          const dy   = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw dots on top
      ctx.fillStyle = `rgba(${color}, 0.55)`;
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

/* ───────── Types ───────── */
interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  tags: string[];
  link: string;
  is_featured: boolean;
  display_order: number;
  created_at: string;
}

/* ───────── Project Card ───────── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative bg-[#111111] rounded-3xl overflow-hidden border border-[#222222] hover:border-[#FAF9F6]/20 transition-all duration-500"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={project.image_url}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80" />

        {/* Category Badge */}
        <div className="absolute top-6 left-6 px-4 py-1.5 bg-[#FAF9F6] text-[#111111] text-[10px] font-black uppercase tracking-widest rounded-full">
          {project.category}
        </div>

        {/* Hover Link */}
        {project.link && project.link !== "#" && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-6 right-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
          >
            <div className="bg-[#FAF9F6] text-[#111111] px-5 py-2.5 rounded-2xl flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-white">
              View Project
              <ExternalLink size={14} />
            </div>
          </a>
        )}
      </div>

      <div className="p-8">
        <h3 className="text-[#FAF9F6] font-black text-xl leading-tight mb-3 tracking-tight">
          {project.title}
        </h3>
        <p className="text-[#FAF9F6]/60 text-sm leading-relaxed line-clamp-3 mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags?.map((tag: string) => (
            <span
              key={tag}
              className="text-[10px] px-3 py-1 bg-[#FAF9F6]/5 text-[#FAF9F6]/50 border border-[#FAF9F6]/10 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ───────── Loading Skeleton ───────── */
function ProjectSkeleton() {
  return (
    <div className="bg-[#111111] rounded-3xl overflow-hidden border border-[#222222] animate-pulse">
      <div className="h-64 bg-[#1a1a1a]" />
      <div className="p-8 space-y-4">
        <div className="h-6 bg-[#1a1a1a] rounded-xl w-3/4" />
        <div className="space-y-2">
          <div className="h-3 bg-[#1a1a1a] rounded-lg w-full" />
          <div className="h-3 bg-[#1a1a1a] rounded-lg w-5/6" />
          <div className="h-3 bg-[#1a1a1a] rounded-lg w-2/3" />
        </div>
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 bg-[#1a1a1a] rounded-full" />
          <div className="h-6 w-20 bg-[#1a1a1a] rounded-full" />
          <div className="h-6 w-14 bg-[#1a1a1a] rounded-full" />
        </div>
      </div>
    </div>
  );
}

/* ───────── Empty State ───────── */
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-20 h-20 rounded-3xl bg-[#FAF9F6]/5 border border-[#FAF9F6]/10 flex items-center justify-center mb-6">
        <FolderOpen size={32} className="text-[#FAF9F6]/20" />
      </div>
      <h3 className="text-[#FAF9F6]/60 font-black text-lg uppercase tracking-wider mb-2">
        No Projects Yet
      </h3>
      <p className="text-[#FAF9F6]/30 text-sm max-w-md">
        Featured projects will appear here once they are added by the team.
      </p>
    </motion.div>
  );
}

/* ───────── Main Component ───────── */
export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_featured", true)
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) {
        console.error("Error fetching projects:", error.message);
      } else {
        setProjects(data || []);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <section className="bg-[#111111] py-20 md:py-32 relative overflow-hidden">
      <SectionCanvas variant="dark" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-[#FAF9F6]/10 rounded-full text-[#FAF9F6]/70 text-xs font-black uppercase tracking-[0.25em] mb-6"
          >
            REAL IMPACT
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-5xl md:text-6xl font-black text-[#FAF9F6] tracking-tighter mb-6"
          >
            Projects That Deliver Results
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#FAF9F6]/60 max-w-2xl mx-auto text-base md:text-lg"
          >
            From complete school ecosystems to powerful institutional tools —
            here are some of the solutions we've built for our clients.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <>
              <ProjectSkeleton />
              <ProjectSkeleton />
              <ProjectSkeleton />
            </>
          ) : projects.length > 0 ? (
            projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))
          ) : (
            <EmptyState />
          )}
        </div>

        {/* Bottom CTA */}
        {!loading && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 text-center"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#FAF9F6] text-[#111111] rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white transition-all"
            >
              See All Completed Projects
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}