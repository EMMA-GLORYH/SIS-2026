"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

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
      className="group flex flex-col gap-3 sm:gap-4"
    >
      {/* Image with parallax — responsive aspect ratios */}
      <div
        className={`overflow-hidden rounded-xl sm:rounded-2xl relative ${
          f.tall
            ? "aspect-[4/3] sm:aspect-[3/4]"
            : "aspect-[16/10] sm:aspect-[4/3]"
        }`}
      >
        {/* Shimmer overlay on hover */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

        {/* Dark overlay that lifts on hover */}
        <motion.div className="absolute inset-0 z-[5] bg-[#111111]/20 group-hover:bg-[#111111]/0 transition-colors duration-500" />

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
          className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 w-6 h-6 sm:w-8 sm:h-8 bg-[#111111] rounded-full flex items-center justify-center"
        >
          <span className="text-[#FAF9F6] text-[8px] sm:text-[10px] font-black">
            {String(i + 1).padStart(2, "0")}
          </span>
        </motion.div>
      </div>

      {/* Text with staggered reveal */}
      <div>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "1.5rem" } : {}}
          transition={{ delay: i * 0.12 + 0.3, duration: 0.4 }}
          className="h-[1.5px] sm:h-[2px] bg-[#111111] mb-2 sm:mb-3"
        />
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: i * 0.12 + 0.35, duration: 0.5 }}
          className="font-playfair text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-[#111111] leading-tight mb-1.5 sm:mb-3 group-hover:tracking-tight transition-all duration-300"
        >
          {f.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: i * 0.12 + 0.45, duration: 0.5 }}
          className="text-xs sm:text-sm text-[#555555] leading-relaxed"
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

  /* Multi-layer parallax scroll animations */
  const blob1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const blob3Y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const blob1X = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const blob2X = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  /* Content drift effect */
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-3%"]);

  /* Floating accent line */
  const lineRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.4, 0.4, 0]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#e8e4dc] py-14 sm:py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* ───── Animated parallax background shapes ───── */}
      <motion.div
        style={{ y: blob1Y, x: blob1X }}
        className="absolute top-10 -left-32 w-[28rem] h-[28rem] bg-[#111111]/[0.025] rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: blob2Y, x: blob2X }}
        className="absolute bottom-20 -right-32 w-[32rem] h-[32rem] bg-[#111111]/[0.03] rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: blob3Y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-[#111111]/[0.015] rounded-full blur-3xl pointer-events-none"
      />

      {/* ───── Floating accent diagonal line ───── */}
      <motion.div
        style={{ rotate: lineRotate, opacity: lineOpacity }}
        className="absolute top-1/4 right-[8%] w-32 sm:w-48 h-px bg-gradient-to-r from-transparent via-[#111111]/30 to-transparent pointer-events-none origin-center"
      />
      <motion.div
        style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, -10]), opacity: lineOpacity }}
        className="absolute bottom-1/3 left-[5%] w-24 sm:w-40 h-px bg-gradient-to-r from-transparent via-[#111111]/25 to-transparent pointer-events-none origin-center"
      />

      {/* ───── Subtle drifting dots ───── */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "40%"]) }}
        className="absolute top-32 right-[15%] w-1.5 h-1.5 rounded-full bg-[#111111]/20 pointer-events-none"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]) }}
        className="absolute bottom-40 left-[12%] w-2 h-2 rounded-full bg-[#111111]/15 pointer-events-none"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
        className="absolute top-1/2 left-[20%] w-1 h-1 rounded-full bg-[#111111]/25 pointer-events-none"
      />

      {/* ───── Main Content ───── */}
      <motion.div
        style={{ y: contentY }}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* Centered header with animated reveal */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#111111] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] sm:tracking-[0.5em] mb-3 sm:mb-4">
              Capabilities
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2 className="font-playfair text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#111111] tracking-tight leading-[1.05] mb-4 sm:mb-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="inline-block"
              >
                Engineered for{" "}
              </motion.span>
              <br className="hidden sm:block" />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="inline-block"
              >
                Reliability
              </motion.span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-sm sm:text-base md:text-lg text-[#444444] leading-relaxed max-w-lg mx-auto"
          >
            We prioritize functional excellence over trends. Our systems are the
            technical foundation for institutions that cannot afford downtime.
          </motion.p>

          {/* Animated divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-12 sm:w-16 h-[1.5px] sm:h-[2px] bg-[#111111]/20 mx-auto mt-6 sm:mt-8 origin-center"
          />
        </div>

        {/* Responsive grid:
            Mobile: 2 columns (compact cards)
            SM: 2 columns
            LG: 4 columns with tall/short variation
        */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6 lg:gap-8 mb-10 sm:mb-16 lg:items-end">
          {features.map((f, i) => (
            <FeatureCard key={i} f={f} i={i} />
          ))}
        </div>

        {/* Bottom CTA — small, professional, responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <Link
            href="/services"
            className="group relative inline-flex items-center gap-2 border border-[#111111]/30 hover:border-[#111111] hover:bg-[#111111] hover:text-white text-[#111111] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-widest px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 overflow-hidden active:scale-[0.97]"
          >
            {/* Button shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
              All Services
              <ArrowRight
                size={11}
                className="group-hover:translate-x-0.5 transition-transform duration-300"
              />
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}