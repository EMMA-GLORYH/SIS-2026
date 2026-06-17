"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Building2, Users, Code2, GraduationCap, Award, Zap
} from "lucide-react";

/* ───────── Stats Data ───────── */
const STATS = [
  {
    value: 0,
    suffix: "+",
    label: "Organizations Served",
    description: "Schools, NGOs & institutions across Ghana",
    icon: Building2,
  },
  {
    value: 1,
    suffix: "+",
    label: "Projects Delivered",
    description: "Custom software & digital solutions",
    icon: Code2,
  },
  {
    value: 100,
    suffix: "+",
    label: "Students Impacted",
    description: "Through our portals & learning platforms",
    icon: GraduationCap,
  },
  {
    value: 1,
    suffix: "%",
    label: "Uptime Guarantee",
    description: "Reliable systems built for institutions",
    icon: Zap,
  },
  {
    value: 3,
    suffix: "+",
    label: "Years of Excellence",
    description: "Pioneering tech since 2023",
    icon: Award,
  },
  {
    value: 4,
    suffix: "+",
    label: "Expert Team Members",
    description: "Engineers, designers & strategists",
    icon: Users,
  },
];

/* ───────── Animated Counter ───────── */
function CountUp({
  end,
  duration = 2,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const animate = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      /* easeOutExpo for smooth deceleration */
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  /* Format with commas for large numbers (e.g. 25,000+) */
  const formatted = count.toLocaleString("en-US");

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  );
}

/* ───────── Stat Card ───────── */
function StatCard({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const Icon = stat.icon;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group relative bg-white/[0.025] backdrop-blur-sm border border-white/[0.08] rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-7 hover:bg-white/[0.04] hover:border-white/15 transition-all duration-300"
    >
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-bl from-[#f7eedc]/[0.04] to-transparent rounded-tr-2xl sm:rounded-tr-3xl pointer-events-none" />

      {/* Icon */}
      <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl bg-[#f7eedc]/10 border border-[#f7eedc]/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#f7eedc]/15 transition-colors duration-300">
        <Icon
          size={16}
          className="sm:hidden text-[#f7eedc] group-hover:scale-110 transition-transform"
        />
        <Icon
          size={18}
          className="hidden sm:block text-[#f7eedc] group-hover:scale-110 transition-transform"
        />
      </div>

      {/* Number */}
      <p className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none tracking-tighter mb-1 sm:mb-2">
        <CountUp end={stat.value} suffix={stat.suffix} />
      </p>

      {/* Label */}
      <p className="text-white font-bold text-[10px] sm:text-xs md:text-sm uppercase tracking-wider mb-1 sm:mb-1.5">
        {stat.label}
      </p>

      {/* Description */}
      <p className="text-white/40 text-[9px] sm:text-[10px] md:text-xs leading-relaxed">
        {stat.description}
      </p>
    </motion.div>
  );
}

/* ───────── Main Section ───────── */
export default function ImpactStats() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Subtle scroll parallax for background blobs */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const blob1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#080808] py-10 sm:py-16 md:py-22 lg:py-28 overflow-hidden"
    >
      {/* ───── Animated background blobs ───── */}
      <motion.div
        style={{ y: blob1Y }}
        className="absolute top-0 -left-32 w-[24rem] h-[24rem] bg-[#f7eedc]/[0.025] rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: blob2Y }}
        className="absolute bottom-0 -right-32 w-[28rem] h-[28rem] bg-[#f7eedc]/[0.03] rounded-full blur-3xl pointer-events-none"
      />

      {/* ───── Subtle grid pattern ───── */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-3 sm:px-5 md:px-6 z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 bg-[#f7eedc]/10 border border-[#f7eedc]/15 rounded-full text-[#f7eedc] text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-3 sm:mb-5"
          >
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#f7eedc] animate-pulse" />
            Our Impact
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tighter leading-tight mb-3 sm:mb-4 md:mb-5"
          >
            Numbers That{" "}
            <span className="text-[#f7eedc]">Speak Volumes</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-white/55 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-2"
          >
            From schools to NGOs, we&apos;ve helped institutions across Africa
            modernize their operations and unlock measurable growth.
          </motion.p>
        </div>

        {/* Stats Grid
            Mobile: 2 columns
            SM: 2 columns
            MD: 3 columns
            LG: 3 columns
        */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4 md:gap-5 lg:gap-6">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Bottom accent line + tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 sm:mt-12 md:mt-14 lg:mt-16 flex flex-col items-center"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <span className="h-px w-6 sm:w-10 bg-[#f7eedc]/30" />
            <span className="text-[#f7eedc]/70 text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] whitespace-nowrap">
              Engineered for Trust
            </span>
            <span className="h-px w-6 sm:w-10 bg-[#f7eedc]/30" />
          </div>
          <p className="text-white/30 text-[10px] sm:text-xs text-center max-w-md leading-relaxed px-3">
            Every number represents a real institution we&apos;ve empowered with
            technology built to last.
          </p>
        </motion.div>
      </div>
    </section>
  );
}