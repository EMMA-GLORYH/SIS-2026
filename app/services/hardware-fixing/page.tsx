"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Smartphone, 
  Laptop, 
  HardDrive, 
  Monitor, 
  Cpu, 
  ArrowLeft, 
  User, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  Wrench,
  ShieldCheck,
  Search,
  Activity
} from "lucide-react";

export default function HardwareFixingPage() {
  const [imgError, setImgError] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: "easeOut" as const }
  };

  const devices = [
    { title: "Smartphones", icon: <Smartphone />, image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800" },
    { title: "Laptops", icon: <Laptop />, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800" },
    { title: "Displays", icon: <Monitor />, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800" },
    { title: "Storage (SSD/HDD)", icon: <HardDrive />, image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&q=80&w=800" },
  ];

  // Professional Brand Data with Logo URLs (using clear SVGs)
  const brandData = [
    { name: "HP", logo: "https://www.vectorlogo.zone/logos/hp/hp-icon.svg" },
    { name: "Dell", logo: "https://www.vectorlogo.zone/logos/dell/dell-icon.svg" },
    { name: "Apple", logo: "https://www.vectorlogo.zone/logos/apple/apple-icon.svg" },
    { name: "Samsung", logo: "https://www.vectorlogo.zone/logos/samsung/samsung-icon.svg" },
    { name: "Lenovo", logo: "https://www.vectorlogo.zone/logos/lenovo/lenovo-icon.svg" },
    { name: "Asus", logo: "https://www.vectorlogo.zone/logos/asus/asus-icon.svg" },
    { name: "Acer", logo: "https://www.vectorlogo.zone/logos/acer/acer-icon.svg" },
    { name: "Intel", logo: "https://www.vectorlogo.zone/logos/intel/intel-icon.svg" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % devices.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [devices.length]);

  return (
    <section className="bg-white min-h-screen selection:bg-orange-100">
      
      {/* --- HERO SECTION --- */}
      <div className="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 -right-4 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div {...fadeIn}>
            <Link href="/services" className="group inline-flex items-center text-orange-400 font-medium mb-8 hover:text-orange-300 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:mr-4 transition-all" /> Back to Services
            </Link>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
              Hardware <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-400">Repair</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
              Expert diagnostics for global brands. We restore functionality to your 
              most essential hardware with precision tools.
            </p>
          </motion.div>
        </div>
      </div>

      {/* --- BRAND LOGO MARQUEE WITH LOGO IMAGES --- */}
      <div className="bg-slate-50 border-y border-slate-200 py-12 overflow-hidden relative">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...brandData, ...brandData].map((brand, i) => (
            <div key={i} className="mx-16 flex flex-col items-center justify-center gap-3 group">
              <div className="relative w-12 h-12 grayscale group-hover:grayscale-0 transition-all duration-300">
                <Image 
                  src={brand.logo} 
                  alt={`${brand.name} logo`} 
                  fill 
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-bold text-slate-400 tracking-widest uppercase">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          <div className="lg:col-span-2">
            
            {/* Lead Technician Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-20 flex flex-col md:flex-row gap-8 items-center bg-slate-50 p-8 rounded-3xl border border-slate-200"
            >
              <div className="relative w-48 h-48 shrink-0">
                <div className="absolute inset-0 bg-orange-500 rounded-2xl rotate-6" />
                <div className="relative z-10 w-48 h-48 overflow-hidden rounded-2xl bg-slate-200 shadow-xl border-4 border-white flex items-center justify-center">
                  {!imgError ? (
                    <Image 
                      src="/images/technician.jpg" 
                      alt="Lead Technician"
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <User size={80} className="text-slate-400" strokeWidth={1} />
                  )}
                </div>
              </div>
              <div>
                <span className="text-orange-600 font-bold tracking-widest text-xs uppercase">Certified Hardware Expert</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-3">Our Technical Team</h3>
                <p className="text-slate-600 mb-5 leading-relaxed">
                  "Repairing a device isn't just about swapping parts; it's about understanding 
                  circuit logic and ensuring the integrity of your data."
                </p>
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5" /> 90-Day Service Warranty
                </div>
              </div>
            </motion.div>

            {/* Device Showcase Slideshow */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <Wrench className="text-orange-600" /> Serviced Hardware
              </h2>
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-100 shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                  >
                    <Image 
                      src={devices[activeSlide].image} 
                      alt={devices[activeSlide].title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8 text-white">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="p-2 bg-orange-500 rounded-lg">{devices[activeSlide].icon}</span>
                        <h4 className="text-3xl font-bold">{devices[activeSlide].title}</h4>
                      </div>
                      <p className="text-slate-300">Professional component-level repair and maintenance.</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="flex justify-center gap-2 mt-6">
                {devices.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveSlide(i)}
                    className={`h-1.5 rounded-full transition-all ${activeSlide === i ? 'w-8 bg-orange-500' : 'w-2 bg-slate-300'}`}
                  />
                ))}
              </div>
            </div>

            {/* Service Icons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
               {[
                 { title: "Deep Diagnostics", desc: "Root cause analysis of complex hardware failures.", icon: <Search /> },
                 { title: "Performance Tuning", desc: "Upgrading SSDs and RAM for maximum efficiency.", icon: <Activity /> },
                 { title: "Micro-Soldering", desc: "Precision motherboard and charging port repairs.", icon: <Cpu /> },
                 { title: "Overheating Solutions", desc: "Thermal paste application and internal dusting.", icon: <Zap /> },
               ].map((item, i) => (
                 <div key={i} className="p-6 bg-white border border-slate-100 rounded-2xl hover:shadow-lg transition-shadow">
                    <div className="text-orange-500 mb-4">{item.icon}</div>
                    <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="lg:sticky lg:top-12 h-fit">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl shadow-slate-200/50"
            >
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
                <Wrench className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Book a Fix</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Trust our technicians to bring your dead devices back to life.
              </p>
              
              <div className="space-y-4 mb-10">
                {['Free Initial Diagnostics', 'Genuine Replacement Parts', 'Same-Day Service Options'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="group relative block w-full bg-orange-600 text-white text-center py-5 rounded-2xl font-bold overflow-hidden transition-all active:scale-95 shadow-lg shadow-orange-200"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Request Repair <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </motion.div>

            <div className="mt-8 p-6 bg-slate-900 rounded-3xl text-white">
              <h4 className="font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                <Activity className="text-orange-400 w-4 h-4" /> Device Longevity
              </h4>
              
              <p className="text-xs text-slate-400 leading-relaxed mt-4">
                Regular maintenance can extend your laptop's life by 3+ years. Don't wait for it to fail.
              </p>
            </div>
          </aside>

        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}