"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  MonitorSmartphone, 
  MapPin, 
  RefreshCcw, 
  Network, 
  ShieldCheck, 
  Database,
  ArrowRight,
  Headset
} from "lucide-react";
import Card from "../../components/ui/Card";

export default function TechnicalSupportPage() {
  const supportFeatures = [
    {
      icon: <MonitorSmartphone className="text-blue-500" />,
      title: "Remote Troubleshooting",
      description: "Our team utilizes enterprise-grade secure access tools to diagnose and resolve system issues remotely, ensuring zero-travel delay.",
    },
    {
      icon: <MapPin className="text-blue-500" />,
      title: "On-site Support",
      description: "For complex hardware failures or infrastructure deployment, our certified technicians provide rapid physical intervention.",
    },
    {
      icon: <RefreshCcw className="text-blue-500" />,
      title: "Software Lifecycle",
      description: "Comprehensive patch management and version control to maintain the security integrity and efficiency of your software stack.",
    },
    {
      icon: <Network className="text-blue-500" />,
      title: "Network Optimization",
      description: "Architecture design and real-time monitoring of LAN/WAN and Wi-Fi ecosystems to eliminate bottlenecks and latency.",
    },
    {
      icon: <ShieldCheck className="text-blue-500" />,
      title: "Strategic IT Consultation",
      description: "Data-driven advice on infrastructure scaling, cybersecurity posture, and long-term hardware procurement strategies.",
    },
    {
      icon: <Database className="text-blue-500" />,
      title: "Data Integrity & Recovery",
      description: "Automated off-site backup protocols and disaster recovery testing to ensure business continuity under any circumstances.",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* 1. PROFESSIONAL HERO SECTION */}
      <section className="relative h-[60vh] flex items-center bg-[#002147] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070" 
            alt="Technical Support Hub" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002147] via-[#002147]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Headset className="text-blue-400" size={20} />
              <span className="text-blue-400 text-xs font-black uppercase tracking-[0.3em]">Infrastructure Support</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6">
              Engineered <span className="text-blue-500 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 text-fill">Reliability.</span>
            </h1>
            <p className="text-lg text-blue-100/70 max-w-lg leading-relaxed">
              SIS Solutions offers tiered technical support services designed for institutional stability. From remote diagnostics to disaster recovery, we keep your operations online.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-black text-[#002147] tracking-tight mb-4">Service Capabilities</h2>
            <p className="text-slate-500">Standardized support protocols for schools, government agencies, and corporate enterprises.</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span className="w-8 h-[1px] bg-slate-200"></span> 
            Support Matrix
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {supportFeatures.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card variant="elevated" accentColor="#3b82f6">
                <div className="mb-6 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black text-[#002147] mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. LOGO CLOUD (Trust Indicators) */}
      <section className="bg-slate-50 py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-10">We Support & Partner With</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg" alt="Cisco" className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_Web_Services_Logo.svg" alt="AWS" className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Dell_Logo.svg" alt="Dell" className="h-6" />
          </div>
        </div>
      </section>

      {/* 4. PROFESSIONAL CTA */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <div className="bg-[#002147] rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">
              Ready to stabilize <br className="hidden md:block" /> your IT infrastructure?
            </h2>
            <p className="text-blue-100/60 mb-10 max-w-xl mx-auto font-medium">
              Schedule a technical assessment today. Our engineers are ready to tailor a support plan for your specific requirements.
            </p>
            <Link
              href="/services/service-request?service=technical-support"
              className="inline-flex items-center gap-3 bg-blue-500 text-white px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-blue-400 transition-all shadow-xl shadow-blue-500/20"
            >
              Request Support Protocol <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}