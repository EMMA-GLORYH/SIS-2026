"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect } from "react";

const features = [
  {
    title: "Information Security",
    desc: "Military-grade encryption and data privacy protocols for all institutional assets.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600",
    tall: false,
  },
  {
    title: "Custom Ecosystems",
    desc: "Sophisticated school portals and administrative CMS platforms built to scale.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600",
    tall: true,
  },
  {
    title: "Digital Infrastructure",
    desc: "Enterprise server architecture and secure cloud migration for educational hubs.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600",
    tall: true,
  },
  {
    title: "Agile Development",
    desc: "Rapid prototyping and deployment cycles to keep your institution ahead of the curve.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600",
    tall: false,
  },
];

/* Canvas particle background */
function SectionCanvas() {
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
      const count = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 15000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          radius: Math.random() * 1.5 + 0.3,
          opacity: Math.random() * 0.08 + 0.02,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(17, 17, 17, ${0.03 * (1 - dist / 100)})`;
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
        ctx.fillStyle = `rgba(17, 17, 17, ${p.opacity})`;
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
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* Feature card */
function FeatureCard({ f, i }: { f: typeof features[0]; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: i * 0.12,
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group flex flex-col gap-4"
    >
      {/* Image with parallax */}
      <div
        className={`overflow-hidden rounded-2xl relative ${
          f.tall ? "aspect-[3/4]" : "aspect-[4/3]"
        }`}
      >
        {/* Shimmer overlay on hover */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

        {/* Dark overlay that lifts on hover */}
        <motion.div
          className="absolute inset-0 z-[5] bg-[#111111]/20 group-hover:bg-[#111111]/0 transition-colors duration-500"
        />

        <motion.img
          src={f.image}
          alt={f.title}
          style={{ y: imageY, scale: imageScale }}
          className="w-full h-full object-cover"
        />

        {/* Corner index badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: i * 0.12 + 0.4, duration: 0.4 }}
          className="absolute top-4 left-4 z-20 w-8 h-8 bg-[#111111] rounded-full flex items-center justify-center"
        >
          <span className="text-[#FAF9F6] text-[10px] font-black">
            {String(i + 1).padStart(2, "0")}
          </span>
        </motion.div>
      </div>

      {/* Text with staggered reveal */}
      <div>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "2rem" } : {}}
          transition={{ delay: i * 0.12 + 0.3, duration: 0.4 }}
          className="h-[2px] bg-[#111111] mb-3"
        />
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: i * 0.12 + 0.35, duration: 0.5 }}
          className="font-playfair text-2xl md:text-3xl font-black text-[#111111] leading-tight mb-3 group-hover:tracking-tight transition-all duration-300"
        >
          {f.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: i * 0.12 + 0.45, duration: 0.5 }}
          className="text-sm text-[#555555] leading-relaxed"
        >
          {f.desc}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function InstitutionalServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  return (
    <section ref={sectionRef} className="bg-[#e8e4dc] py-20 md:py-32 px-6 relative overflow-hidden">
      {/* Canvas Background */}
      <SectionCanvas />

      {/* Subtle parallax background shapes */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 -left-20 w-80 h-80 bg-[#111111]/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-40 -right-20 w-96 h-96 bg-[#111111]/[0.02] rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#111111]/[0.01] rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Centered header with animated reveal */}
        <div ref={headerRef} className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#111111] text-[10px] font-black uppercase tracking-[0.5em] mb-4">
              Capabilities
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2 className="font-playfair text-5xl sm:text-6xl md:text-7xl font-black text-[#111111] tracking-tight leading-[1.05] mb-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="inline-block"
              >
                Engineered for{" "}
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="inline-block"
              >
                Reliability.
              </motion.span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-base md:text-lg text-[#444444] leading-relaxed max-w-lg mx-auto"
          >
            We prioritize functional excellence over trends. Our systems are the
            technical foundation for institutions that cannot afford downtime.
          </motion.p>

          {/* Animated divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-16 h-[2px] bg-[#111111]/20 mx-auto mt-8 origin-center"
          />
        </div>

        {/* 4-column grid — inner two cards taller, outer two shorter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 lg:items-end">
          {features.map((f, i) => (
            <FeatureCard key={i} f={f} i={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center pt-4"
        >
          <Link
            href="/services"
            className="group relative inline-flex items-center gap-3 border border-[#111111]/30 hover:border-[#111111] hover:bg-[#111111] hover:text-white text-[#111111] text-[11px] font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 overflow-hidden"
          >
            {/* Button shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            <span className="relative z-10 flex items-center gap-3">
              Full Service Directory
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}