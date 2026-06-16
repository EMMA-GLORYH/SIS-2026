"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

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

export default function InstitutionalServices() {
  return (
    <section className="bg-[#e8e4dc] py-20 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Centered header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-[#111111] text-[10px] font-black uppercase tracking-[0.5em] mb-4">
            Capabilities
          </p>
          <h2 className="font-playfair text-5xl sm:text-6xl md:text-7xl font-black text-[#111111] tracking-tight leading-[1.05] mb-6">
            Engineered for <br />Reliability.
          </h2>
          <p className="text-base md:text-lg text-[#444444] leading-relaxed max-w-lg mx-auto">
            We prioritize functional excellence over trends. Our systems are the
            technical foundation for institutions that cannot afford downtime.
          </p>
        </div>

        {/* 4-column grid — inner two cards taller, outer two shorter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 lg:items-end">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group flex flex-col gap-4"
            >
              {/* Image — shorter on outer, taller on inner */}
              <div
                className={`overflow-hidden rounded-2xl ${
                  f.tall ? "aspect-[3/4]" : "aspect-[4/3]"
                }`}
              >
                <img
                  src={f.image}
                  alt={f.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Text */}
              <div>
                <h3 className="font-playfair text-2xl md:text-3xl font-black text-[#111111] leading-tight mb-3">
                  {f.title}
                </h3>
                <p className="text-sm text-[#555555] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center pt-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 border border-[#111111]/30 hover:border-[#111111] hover:bg-[#111111] hover:text-white text-[#111111] text-[11px] font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-200"
          >
            Full Service Directory <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}