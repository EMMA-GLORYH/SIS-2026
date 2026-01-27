"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import { Pagination, Autoplay, Navigation, EffectFade } from "swiper/modules";
import { motion, Variants } from "framer-motion";

interface HeroSliderProps {
  images?: string[];
  placeholder?: string;
  overlay?: boolean;
  title?: string;
  subtitle?: string;
}

// Fixed TypeScript Variants to avoid type mismatch errors
const textVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 1.2, 
      ease: [0.2, 0.8, 0.2, 1] 
    } 
  }
};

export default function HeroSlider({
  images = [],
  placeholder = "/images/placeholder.jpg",
  overlay = false,
  title,
  subtitle,
}: HeroSliderProps) {
  const slides = images.length > 0 ? images : [placeholder];

  return (
    // Updated h-125 md:h-150 per Tailwind suggestions
    <section className="w-full relative h-125 md:h-150 group overflow-hidden bg-slate-900">
      <style jsx global>{`
        .swiper-fade .swiper-slide {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          transform: scale(0.6);
          font-weight: bold;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
        }

        .group:hover .swiper-button-next, 
        .group:hover .swiper-button-prev {
          opacity: 0.7;
        }
        
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.3;
          transition: all 0.6s ease;
        }

        .swiper-pagination-bullet-active {
          opacity: 1;
          width: 30px; 
          border-radius: 4px;
        }

        /* Liquid Progress Bar Animation */
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 7000ms linear infinite;
        }
      `}</style>

      <Swiper
        modules={[Pagination, Autoplay, Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ 
          delay: 7000, 
          disableOnInteraction: false 
        }}
        loop
        speed={1500}
        className="w-full h-full"
      >
        {slides.map((img, idx) => (
          <SwiperSlide key={idx} className="w-full h-full relative">
            <div className="w-full h-full overflow-hidden">
              <img
                src={img}
                alt={`Slide ${idx + 1}`}
                // Updated duration-7000 per Tailwind suggestion
                className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-7000 ease-linear"
              />
            </div>
            {overlay && (
              <div className="absolute inset-0 bg-blue-900/70 mix-blend-multiply pointer-events-none"></div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Hero Content with Framer Motion for precise timing */}
      {(title || subtitle) && (
        <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-8 md:px-20 pointer-events-none">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="max-w-4xl"
          >
            {title && (
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-2xl">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-lg md:text-2xl text-slate-100 leading-relaxed drop-shadow-lg opacity-90 font-light">
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>
      )}

      {/* Progress Bar (Visual Indicator of the next smooth transition) */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
        <div className="h-full bg-blue-500 animate-progress" />
      </div>
    </section>
  );
}