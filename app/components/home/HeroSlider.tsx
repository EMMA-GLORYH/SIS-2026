"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";


const TILE = 28;

interface Tile {
  c: number;
  r: number;
  phase: number;
}

function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const tilesRef = useRef<Tile[]>([]);
  const rafRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const rebuild = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    const cols = Math.ceil(canvas.width / TILE) + 1;
    const rows = Math.ceil(canvas.height / TILE) + 1;
    const next: Tile[] = [];
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        next.push({ c, r, phase: Math.random() * Math.PI * 2 });
    tilesRef.current = next;
  }, []);

  useEffect(() => {
    rebuild();
    window.addEventListener("resize", rebuild);
    return () => window.removeEventListener("resize", rebuild);
  }, [rebuild]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      } else {
        mouseRef.current = { x: -9999, y: -9999 };
      }
    };

    /* Touch support for mobile/tablet */
    const handleTouchMove = (e: TouchEvent) => {
      const container = containerRef.current;
      if (!container || !e.touches[0]) return;
      const rect = container.getBoundingClientRect();
      const touch = e.touches[0];
      if (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      ) {
        mouseRef.current = {
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
        };
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const draw = (t: number) => {
      const T = t * 0.0008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const { c, r, phase } of tilesRef.current) {
        const x = c * TILE;
        const y = r * TILE;
        const cx = x + TILE / 2;
        const cy = y + TILE / 2;

        const dx = cx - mouseRef.current.x;
        const dy = cy - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const ripple =
          dist < 220
            ? Math.exp(-dist / 90) * Math.sin(dist / 18 - T * 12)
            : 0;

        const globalWave =
          Math.sin(cx / 90 + T * 1.2 + phase) *
          Math.cos(cy / 70 + T * 0.9);

        const lift = globalWave * 0.6 + ripple * 2.8;
        const proximity = dist < 220 ? 1 - dist / 220 : 0;

        const alpha = Math.min(
          Math.max(0.05 + lift * 0.07 + proximity * 0.18, 0.03),
          0.55
        );
        const scale = 0.6 + lift * 0.08 + proximity * 0.22;
        const size = TILE * scale;
        const gap = (TILE - size) / 2;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(lift * 0.08);
        ctx.translate(-cx, -cy);

        ctx.beginPath();
        (ctx as any).roundRect(x + gap, y + gap, size, size, 5);
        ctx.fillStyle =
          dist < 100
            ? `rgba(247,238,220,${alpha})`
            : `rgba(255,255,255,${alpha})`;
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}

/* Standalone hero button — bypasses Button variant color overrides */
function HeroButton({
  href,
  children,
  primary,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <Link href={href}>
      <button
        className={`
          inline-flex items-center justify-center gap-2
          px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full
          text-[9px] sm:text-[10px] md:text-[11px] font-black uppercase tracking-wider sm:tracking-widest
          transition-all duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50
          active:scale-[0.97]
          ${
            primary
              ? "bg-[#f7eedc] text-[#111111] hover:bg-[#111111] hover:text-white border border-transparent"
              : "bg-transparent text-white border border-white/30 hover:bg-white hover:text-[#111111]"
          }
        `}
      >
        {children}
      </button>
    </Link>
  );
}

export default function HeroSlider() {
  const [slideIndex, setSlideIndex] = useState(0);
  const SLIDE_COUNT = 3;

  const next = useCallback(
    () => setSlideIndex((p) => (p + 1) % SLIDE_COUNT),
    []
  );
  const prev = useCallback(
    () => setSlideIndex((p) => (p - 1 + SLIDE_COUNT) % SLIDE_COUNT),
    []
  );

  useEffect(() => {
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="relative h-[88vh] sm:h-[85vh] min-h-[560px] w-full overflow-hidden bg-[#080808]">

      {/* Wave tile canvas */}
      <WaveCanvas />

      {/* Subtle centre glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgba(247,238,220,0.06),transparent)]" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6">
        <div className="text-center max-w-3xl w-full">

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6"
          >
            <span className="w-6 sm:w-8 md:w-10 h-[1.5px] sm:h-[2px] bg-[#f7eedc]" />
            <span className="text-[#f7eedc] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[8px] sm:text-[9px] md:text-[10px] whitespace-nowrap">
              Pioneering Tech Solutions
            </span>
            <span className="w-6 sm:w-8 md:w-10 h-[1.5px] sm:h-[2px] bg-[#f7eedc]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white leading-[1.05] mb-4 sm:mb-6 px-2"
          >
            Engineering{" "}
            <span className="text-[#f7eedc] block sm:inline">
              Institutional Growth.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-[rgba(245,237,222,0.75)] text-xs sm:text-sm md:text-base lg:text-lg max-w-xl mx-auto mb-6 sm:mb-8 md:mb-10 leading-relaxed px-3"
          >
            Providing world-class software ecosystems and ICT infrastructure for
            schools, NGOs, and global institutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex items-center justify-center gap-2.5 sm:gap-3 md:gap-4 flex-wrap px-2"
          >
            <HeroButton href="/services/service-request" primary>
              Consult an Expert
            </HeroButton>
            <HeroButton href="/services">
              Explore Platform
            </HeroButton>
          </motion.div>
        </div>
      </div>


      {/* Slide dots */}
      <div className="absolute bottom-5 sm:bottom-6 md:bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:gap-2.5 md:gap-3">
        {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
          <button
            key={i}
            onClick={() => setSlideIndex(i)}
            className={`h-[3px] sm:h-1 transition-all duration-700 rounded-full ${
              slideIndex === i
                ? "w-10 sm:w-12 md:w-14 bg-[#f7eedc]"
                : "w-3 sm:w-3.5 md:w-4 bg-white/20"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}