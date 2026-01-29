"use client";

import HeroSlider from "../components/HeroSlider";
import { services } from "../data/service";
import { Service } from "../types/service";
import Card from "../components/ui/Card";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Globe, Cpu, Palette, Monitor } from "lucide-react";

export default function ServicesPage() {
  // 3 High-Stability Hero Images
  const heroImages = [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop", 
  ];

  // 17 Themed Images for Cards and Gallery (Total 20)
  const technicalImages = [
    "https://images.unsplash.com/photo-1591405351990-4726e331f141?q=80&w=600&auto=format&fit=crop", // Repair
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600&auto=format&fit=crop", // Engineering
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop", // Hardware
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop", // Design UI
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop", // Business
    "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600&auto=format&fit=crop", // Graphic Design
    "https://images.unsplash.com/photo-1588702547919-26089e690ecc?q=80&w=600&auto=format&fit=crop", // Laptop internals
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop", // Web code
    "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600&auto=format&fit=crop", // Office
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=600&auto=format&fit=crop", // Tech Abstract
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop", // Server
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop", // Coding
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop", // Diagnostic
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop", // Education
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop", // MacBook
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop", // Collaboration
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=600&auto=format&fit=crop", // Desktop
  ];

  return (
    <div className="bg-white min-h-screen selection:bg-indigo-100">
      <HeroSlider images={heroImages} overlay={true} title="Technology & Design Excellence" />

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight"
          >
            Our Professional <span className="text-indigo-600">Solutions</span>
          </motion.h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Combining precision engineering with creative strategy to help your business thrive in the digital age.
          </p>
        </div>

        {/* --- CORE SERVICES CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
          {services.map((service, idx) => (
            <motion.div 
              key={service.slug} 
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="h-full p-0 overflow-hidden border-none shadow-xl shadow-slate-200/50 rounded-[4rem] bg-white group">
                <div className="h-56 relative overflow-hidden">
                  <Image 
                    src={technicalImages[idx]} 
                    alt={service.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-6 text-white font-bold flex items-center gap-2 text-sm uppercase tracking-widest">
                    <Zap size={16} className="text-amber-400" /> Premium Service
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <Link 
                    href={`/services/${service.slug}`} 
                    className="inline-flex items-center gap-2 text-indigo-600 font-bold group/btn"
                  >
                    Service Details <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* --- DYNAMIC MASONRY GALLERY (20 Image Context) --- */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Technical Showreel</h2>
              <p className="text-slate-500">A visual journey through our hardware lab and creative studio.</p>
            </div>
            <div className="flex gap-4">
               <span className="p-3 bg-slate-50 rounded-xl text-slate-400"><Cpu /></span>
               <span className="p-3 bg-slate-50 rounded-xl text-slate-400"><Palette /></span>
               <span className="p-3 bg-slate-50 rounded-xl text-slate-400"><Monitor /></span>
            </div>
          </div>
          
          <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
            {technicalImages.map((src, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-[3rem] shadow-md group cursor-zoom-in"
              >
                <Image 
                  src={src} 
                  alt="Gallery Item" 
                  width={400} 
                  height={500} 
                  className="w-full h-auto object-cover group-hover:brightness-75 transition-all duration-500"
                />
              </motion.div>
            ))}
          </div>  
        </div>

        {/* --- QUALITY STANDARDS SECTION --- */}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center bg-slate-900 rounded-[3rem] p-12 lg:p-24 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-8 tracking-tight">Committed to <span className="text-indigo-400 text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">Global Standards</span></h2>
            <div className="space-y-8">
              {[
                { t: "Global Precision", d: "We utilize industrial-grade diagnostic equipment for all hardware tasks.", i: <Globe className="text-indigo-400"/> },
                { t: "Verified Hardware", d: "Only genuine parts are used in our repairs, ensuring longevity.", i: <ShieldCheck className="text-emerald-400"/> },
                { t: "Creative Integrity", d: "Original designs tailored specifically to your brand mission.", i: <Zap className="text-amber-400"/> }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="shrink-0 w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                    {item.i}
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-white mb-1">{item.t}</h4>
                    <p className="text-slate-400 leading-relaxed">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-3">
             <Image 
               src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop" 
               alt="Quality Assurance Lab" 
               fill 
               className="object-cover" 
             />
          </div>
        </div>
      </section>

      {/* --- CTA FOOTER --- */}
      <section className="py-24 text-center">
        <h2 className="text-4xl font-black text-slate-900 mb-8">Ready to Optimize Your Technology?</h2>
        <Link 
          href="/contact" 
          className="px-12 py-5 bg-indigo-600 text-white font-black rounded-full hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-200 transition-all active:scale-95 inline-block"
        >
          Consult an Expert
        </Link>
      </section>
    </div>
  );
}