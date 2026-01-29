"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export default function CursorDot() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Physics tuned for a premium "mechanical" feel
  const springConfig = { damping: 30, stiffness: 300, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest("a") || target.closest("button") || target.tagName === "INPUT";
      setIsHovered(!!isClickable);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", () => setIsClicking(true));
    window.addEventListener("mouseup", () => setIsClicking(false));
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseleave", () => setIsVisible(false));

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <div className="hidden lg:block">
      <AnimatePresence>
        {isVisible && (
          <>
            {/* 1. REINFORCED CENTER POINT - Increased size and subtle glow */}
            <motion.div
              className="pointer-events-none fixed top-0 left-0 z-[10001] h-3 w-3 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]"
              style={{
                x: mouseX,
                y: mouseY,
                translateX: "-50%",
                translateY: "-50%",
              }}
              exit={{ scale: 0, opacity: 0 }}
            />

            {/* 2. THICKENED ARCHITECTURAL LENS (CROSSHAIR) */}
            <motion.div
              className="pointer-events-none fixed top-0 left-0 z-[10000] mix-blend-difference"
              animate={{
                width: isHovered ? 90 : 50,
                height: isHovered ? 90 : 50,
                rotate: isHovered ? 45 : 0, // Rotates to an 'X' on hover for interaction
                scale: isClicking ? 0.85 : 1,
              }}
              style={{
                x: smoothX,
                y: smoothY,
                translateX: "-50%",
                translateY: "-50%",
              }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Thickened outer circle for better visibility */}
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5" 
                  className="opacity-70"
                />
                {/* Heavy Crosshair markers */}
                <line x1="50" y1="0" x2="50" y2="12" stroke="white" strokeWidth="3" className="opacity-90" />
                <line x1="50" y1="88" x2="50" y2="100" stroke="white" strokeWidth="3" className="opacity-90" />
                <line x1="0" y1="50" x2="12" y2="50" stroke="white" strokeWidth="3" className="opacity-90" />
                <line x1="88" y1="50" x2="100" y2="50" stroke="white" strokeWidth="3" className="opacity-90" />
              </svg>
            </motion.div>

            {/* 3. PROFESSIONAL BACKGROUND AURA */}
            <motion.div
              className="pointer-events-none fixed top-0 left-0 z-[9999] h-24 w-24 rounded-full bg-blue-500/10 blur-3xl"
              style={{
                x: smoothX,
                y: smoothY,
                translateX: "-50%",
                translateY: "-50%",
              }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}