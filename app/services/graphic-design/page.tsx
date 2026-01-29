"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Palette, 
  Layers, 
  Component, 
  PenTool, 
  ArrowLeft, 
  User, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  Search,
  Sparkles,
  Eye,
  Megaphone,
  Layout,
  MousePointer2,
  Brush
} from "lucide-react";

export default function GraphicDesignPage() {
  const [imgError, setImgError] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: "easeOut" as const }
  };

  const designCapabilities = [
    { title: "Brand Identity", desc: "Logos, style guides, and visual systems that command attention.", icon: <Sparkles className="w-6 h-6" /> },
    { title: "Print & Editorial", desc: "Brochures, magazines, and large-format institutional banners.", icon: <Layers className="w-6 h-6" /> },
    { title: "Digital Marketing", desc: "High-conversion social media assets and interactive web graphics.", icon: <Megaphone className="w-6 h-6" /> },
    { title: "UI/UX Visuals", desc: "Interface prototyping and user-centric aesthetic design.", icon: <MousePointer2 className="w-6 h-6" /> },
  ];

  const portfolioItems = [
    { title: "Lumina Tech Rebrand", category: "Logo & Identity", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800" },
    { title: "Horizon Annual Report", category: "Layout Design", img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800" },
    { title: "EcoPulse Campaign", category: "Digital Marketing", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800" },
    { title: "Urban Art Exhibit", category: "Print Media", img: "https://images.unsplash.com/photo-1561070791-26c11d6d9e3d?q=80&w=800" },
  ];

  const toolsUsed = [
    { name: 'Photoshop', logo: 'https://www.vectorlogo.zone/logos/adobe_photoshop/adobe_photoshop-icon.svg' },
    { name: 'Illustrator', logo: 'https://www.vectorlogo.zone/logos/adobe_illustrator/adobe_illustrator-icon.svg' },
    { name: 'Figma', logo: 'https://www.vectorlogo.zone/logos/figma/figma-icon.svg' },
    { name: 'InDesign', logo: 'https://www.vectorlogo.zone/logos/adobe_indesign/adobe_indesign-icon.svg' },
    { name: 'After Effects', logo: 'https://www.vectorlogo.zone/logos/adobe_aftereffects/adobe_aftereffects-icon.svg' },
    { name: 'Canva Pro', logo: 'https://www.vectorlogo.zone/logos/canva/canva-icon.svg' },
  ];

  return (
    <section className="bg-white min-h-screen selection:bg-pink-100">
      
      {/* --- HERO SECTION --- */}
      <div className="relative overflow-hidden bg-slate-950 py-32">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1600" 
            alt="Design Studio" 
            fill 
            className="object-cover opacity-20 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div {...fadeIn}>
            <Link 
              href="/services" 
              className="group inline-flex items-center text-pink-400 font-bold mb-8 hover:text-pink-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-2 transition-transform" />
              Back to Services
            </Link>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-none">
              Creative <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-violet-400">Branding</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
              We define the visual DNA of your brand. From minimalist logos to complex 
              multi-channel marketing assets, we create designs that resonate.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          
          {/* --- LEFT CONTENT AREA --- */}
          <div className="lg:col-span-2">
            
            {/* Lead Designer Card (Local Image) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-24 flex flex-col md:flex-row gap-10 items-center bg-slate-50 p-10 rounded-[2.5rem] border border-slate-200"
            >
              <div className="relative w-56 h-56 shrink-0 group">
                <div className="absolute inset-0 bg-pink-500 rounded-3xl -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
                <div className="relative z-10 w-56 h-56 overflow-hidden rounded-3xl bg-slate-200 shadow-2xl border-4 border-white">
                  {!imgError ? (
                    <Image 
                      src="/images/stephen.jpg" // Local image
                      alt="Stephen"
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100">
                      <User size={80} className="text-slate-400" />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <span className="text-pink-600 font-black tracking-widest text-xs uppercase">Creative Lead</span>
                <h3 className="text-3xl font-black text-slate-900 mt-2 mb-4 tracking-tight">Stephen</h3>
                <p className="text-slate-600 mb-6 text-lg leading-relaxed italic">
                  "Visual storytelling is the bridge between a business and its audience. 
                  Every color, line, and typeface we choose is a deliberate step toward your success."
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                  <Brush className="w-4 h-4 text-pink-500" /> 10+ Years of Visual Innovation
                </div>
              </div>
            </motion.div>

            {/* Core Capabilities */}
            <div className="mb-24">
              <h2 className="text-4xl font-black text-slate-900 mb-12 flex items-center gap-4">
                <Palette className="text-pink-600 w-10 h-10" /> Design Expertise
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {designCapabilities.map((cap, i) => (
                  <div key={i} className="p-10 border border-slate-100 rounded-3xl bg-white shadow-sm hover:shadow-2xl hover:border-pink-100 transition-all group">
                    <div className="w-14 h-14 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                      {cap.icon}
                    </div>
                    <h4 className="font-bold text-xl text-slate-900 mb-3">{cap.title}</h4>
                    <p className="text-slate-600 leading-relaxed">{cap.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Portfolio Showcase */}
            <div className="mb-24">
              <h2 className="text-4xl font-black text-slate-900 mb-12">Recent Showcases</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {portfolioItems.map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -10 }}
                    className="relative aspect-square rounded-[4rem] overflow-hidden group cursor-crosshair shadow-lg"
                  >
                    <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                      <span className="text-xs uppercase font-black tracking-widest text-pink-400 mb-2">{item.category}</span>
                      <h4 className="text-2xl font-bold">{item.title}</h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Design Process */}
            <div className="mb-24">
              <h2 className="text-4xl font-black text-slate-900 mb-12">The Creative Workflow</h2>
              
              
              
              <div className="relative h-80 w-full rounded-[2.5rem] overflow-hidden mb-10 shadow-2xl">
                 <Image 
                   src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1200" 
                   alt="Design Process" 
                   fill 
                   className="object-cover"
                 />
                 <div className="absolute inset-0 bg-pink-900/20 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="px-8 py-4 bg-white/90 rounded-2xl font-black text-pink-900 tracking-widest uppercase">
                       From Sketch to Screen
                    </div>
                 </div>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
                We believe in <strong>Strategic Minimalism</strong>. Our process starts with deep research into your market, 
                followed by iterative sketching and digital prototyping to ensure your visual assets are both 
                beautiful and functional.
              </p>
            </div>

            {/* Tech Chips */}
            <motion.div {...fadeIn} className="bg-slate-950 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-10">
                    <PenTool className="text-pink-400" />
                    <h3 className="text-3xl font-bold">Studio Toolset</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
                    {toolsUsed.map((tool) => (
                      <div key={tool.name} className="flex items-center gap-4 group">
                        <div className="w-10 h-10 relative grayscale group-hover:grayscale-0 transition-all duration-300">
                           <Image src={tool.logo} alt={tool.name} fill className="object-contain" />
                        </div>
                        <span className="font-bold text-slate-400 group-hover:text-pink-400 transition-colors">{tool.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" />
            </motion.div>
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="lg:sticky lg:top-12 h-fit">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50"
            >
              <div className="w-16 h-16 bg-pink-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-pink-200">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Hire a Creative</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Transform your brand's presence with professional visual assets that communicate quality.
              </p>
              
              <div className="space-y-5 mb-10">
                {['High-Res Source Files', 'Copyright Ownership', 'Unlimited Revisions*'].map((item) => (
                  <div key={item} className="flex items-center gap-4 text-slate-700 font-bold text-sm">
                    <CheckCircle2 className="w-6 h-6 text-pink-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <Link
                href="/services/service-request?service=graphic-design"
                className="group relative block w-full bg-slate-950 text-white text-center py-6 rounded-2xl font-black text-lg overflow-hidden transition-all hover:bg-pink-600 active:scale-95 shadow-xl"
              >
                Start a Project
              </Link>
            </motion.div>

            {/* Philosophy Box */}
            <div className="mt-8 p-10 bg-slate-900 rounded-[2.5rem] text-white">
               <Eye className="w-10 h-10 mb-4 text-pink-400" />
               <h4 className="font-black text-xl mb-2">Visual Clarity</h4>
               <div className="flex gap-2 mb-4">
                 <div className="h-2 w-full bg-pink-500 rounded-full" />
                 <div className="h-2 w-full bg-violet-500 rounded-full" />
                 <div className="h-2 w-full bg-slate-700 rounded-full" />
               </div>
               <p className="text-slate-400 text-sm leading-relaxed">
                 Our design philosophy focuses on removing the noise to let your core message shine through.
               </p>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}