"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, ExternalLink, FolderOpen, Link2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

/* ───────── Subtle Network Background Canvas ───────── */
function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, W, H);

      const spacing = 80;
      const jitter = 14;
      const maxDist = spacing * 1.5;
      const seed = 42;

      let s = seed;
      const rand = () => {
        s = (s * 1664525 + 1013904223) & 0xffffffff;
        return (s >>> 0) / 0xffffffff;
      };

      const cols = Math.ceil(W / spacing) + 1;
      const rows = Math.ceil(H / spacing) + 1;

      const dots: { x: number; y: number }[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            x: c * spacing + (rand() - 0.5) * jitter * 2,
            y: r * spacing + (rand() - 0.5) * jitter * 2,
          });
        }
      }

      /* Lines — subtle but visible */
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = "rgba(250, 249, 246, 0.09)";
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      /* Dots — slightly brighter than lines */
      ctx.fillStyle = "rgba(250, 249, 246, 0.22)";
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

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

/* ───────── Helper: strip protocol from URL ───────── */
function displayUrl(url: string): string {
  return url.replace(/^https?:\/\//i, "").replace(/\/$/, "");
}

/* ───────── Project Card ───────── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const hasLink = project.link && project.link !== "#";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group relative bg-[#111111] rounded-xl sm:rounded-2xl overflow-hidden border border-[#222222] hover:border-[#FAF9F6]/20 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-28 sm:h-36 md:h-40 lg:h-44 overflow-hidden">
        <Image
          src={project.image_url}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70" />

        {/* Category Badge */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-[#FAF9F6] text-[#111111] text-[7px] sm:text-[9px] font-black uppercase tracking-wider rounded-full max-w-[85%] truncate">
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-2.5 sm:p-4 lg:p-5">
        <h3 className="text-[#FAF9F6] font-black text-[11px] sm:text-sm md:text-base leading-tight mb-1 sm:mb-2 tracking-tight line-clamp-2">
          {project.title}
        </h3>
        <p className="text-[#FAF9F6]/55 text-[9px] sm:text-[11px] md:text-xs leading-relaxed line-clamp-2 mb-2 sm:mb-3">
          {project.description}
        </p>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-3">
            {project.tags.slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                className="text-[7px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 bg-[#FAF9F6]/5 text-[#FAF9F6]/40 border border-[#FAF9F6]/10 rounded-full font-medium uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Address / Link */}
        {hasLink ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 sm:gap-1.5 pt-2 sm:pt-3 border-t border-[#FAF9F6]/10 group/link"
          >
            <Link2
              size={9}
              className="sm:hidden text-[#FAF9F6]/40 group-hover/link:text-[#FAF9F6]/80 transition-colors flex-shrink-0"
            />
            <Link2
              size={11}
              className="hidden sm:block text-[#FAF9F6]/40 group-hover/link:text-[#FAF9F6]/80 transition-colors flex-shrink-0"
            />
            <span className="text-[8px] sm:text-[10px] md:text-[11px] text-[#FAF9F6]/40 group-hover/link:text-[#FAF9F6]/80 truncate font-medium transition-colors">
              {displayUrl(project.link)}
            </span>
            <ExternalLink
              size={9}
              className="text-[#FAF9F6]/30 group-hover/link:text-[#FAF9F6]/70 ml-auto flex-shrink-0 group-hover/link:translate-x-0.5 transition-all"
            />
          </a>
        ) : (
          <div className="flex items-center gap-1.5 pt-2 sm:pt-3 border-t border-[#FAF9F6]/10">
            <span className="text-[8px] sm:text-[10px] md:text-[11px] text-[#FAF9F6]/25 italic font-medium">
              Internal project
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ───────── Loading Skeleton ───────── */
function ProjectSkeleton() {
  return (
    <div className="bg-[#111111] rounded-xl sm:rounded-2xl overflow-hidden border border-[#222222] animate-pulse">
      <div className="h-28 sm:h-36 md:h-40 lg:h-44 bg-[#1a1a1a]" />
      <div className="p-2.5 sm:p-4 lg:p-5 space-y-2 sm:space-y-3">
        <div className="h-3 sm:h-4 bg-[#1a1a1a] rounded w-3/4" />
        <div className="space-y-1 sm:space-y-1.5">
          <div className="h-2 sm:h-2.5 bg-[#1a1a1a] rounded w-full" />
          <div className="h-2 sm:h-2.5 bg-[#1a1a1a] rounded w-5/6" />
        </div>
        <div className="flex gap-1 sm:gap-1.5 pt-1">
          <div className="h-3 sm:h-4 w-10 sm:w-12 bg-[#1a1a1a] rounded-full" />
          <div className="h-3 sm:h-4 w-12 sm:w-14 bg-[#1a1a1a] rounded-full" />
        </div>
        <div className="h-2.5 sm:h-3 bg-[#1a1a1a] rounded w-2/3 mt-2 sm:mt-3" />
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
      className="col-span-full flex flex-col items-center justify-center py-12 sm:py-16 text-center"
    >
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#FAF9F6]/5 border border-[#FAF9F6]/10 flex items-center justify-center mb-4 sm:mb-5">
        <FolderOpen size={22} className="sm:hidden text-[#FAF9F6]/20" />
        <FolderOpen size={26} className="hidden sm:block text-[#FAF9F6]/20" />
      </div>
      <h3 className="text-[#FAF9F6]/60 font-black text-sm sm:text-base uppercase tracking-wider mb-1.5 sm:mb-2">
        No Projects Yet
      </h3>
      <p className="text-[#FAF9F6]/30 text-[10px] sm:text-xs max-w-sm">
        Featured projects will appear here once they are added by the team.
      </p>
    </motion.div>
  );
}

/* ───────── Main Component ───────── */
export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  /* Scroll animations */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const blob1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const blob1X = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const blob2X = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  const lineRotate = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const lineRotate2 = useTransform(scrollYProgress, [0, 1], [0, -8]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.5, 0.5, 0]);

  const dot1Y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const dot2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_featured", true)
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false })
        .limit(8);

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
    <section
      ref={sectionRef}
      className="bg-[#111111] py-12 sm:py-16 md:py-24 relative overflow-hidden"
    >
      {/* ───── Layer 1: Network/Dot Pattern (visible base layer) ───── */}
      <NetworkCanvas />

      {/* ───── Layer 2: Soft animated blobs (subtle depth) ───── */}
      <motion.div
        style={{ y: blob1Y, x: blob1X }}
        className="absolute top-10 -left-32 w-[24rem] h-[24rem] bg-[#FAF9F6]/[0.025] rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: blob2Y, x: blob2X }}
        className="absolute bottom-20 -right-32 w-[28rem] h-[28rem] bg-[#FAF9F6]/[0.03] rounded-full blur-3xl pointer-events-none"
      />

      {/* ───── Layer 3: Floating accent lines (animated on scroll) ───── */}
      <motion.div
        style={{ rotate: lineRotate, opacity: lineOpacity }}
        className="absolute top-1/4 right-[8%] w-32 sm:w-48 h-px bg-gradient-to-r from-transparent via-[#FAF9F6]/40 to-transparent pointer-events-none origin-center"
      />
      <motion.div
        style={{ rotate: lineRotate2, opacity: lineOpacity }}
        className="absolute bottom-1/3 left-[5%] w-24 sm:w-40 h-px bg-gradient-to-r from-transparent via-[#FAF9F6]/35 to-transparent pointer-events-none origin-center"
      />

      {/* ───── Layer 4: Drifting accent dots ───── */}
      <motion.div
        style={{ y: dot1Y }}
        className="absolute top-32 right-[15%] w-1.5 h-1.5 rounded-full bg-[#FAF9F6]/40 pointer-events-none"
      />
      <motion.div
        style={{ y: dot2Y }}
        className="absolute bottom-40 left-[12%] w-2 h-2 rounded-full bg-[#FAF9F6]/30 pointer-events-none"
      />

      {/* ───── Main Content ───── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 bg-[#FAF9F6]/10 backdrop-blur-sm rounded-full text-[#FAF9F6]/70 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-3 sm:mb-5"
          >
            REAL IMPACT
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#FAF9F6] tracking-tighter mb-3 sm:mb-4 leading-tight"
          >
            Projects That Deliver Results
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#FAF9F6]/60 max-w-xl mx-auto text-xs sm:text-sm md:text-base px-2"
          >
            From complete school ecosystems to powerful institutional tools —
            here are some of the solutions we&apos;ve built for our clients.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {loading ? (
            <>
              <ProjectSkeleton />
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 sm:mt-10 md:mt-12 text-center"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-[#FAF9F6] text-[#111111] rounded-full sm:rounded-xl font-black text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.18em] hover:bg-white transition-all active:scale-[0.97]"
            >
              See All Projects
              <ArrowRight
                size={11}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}