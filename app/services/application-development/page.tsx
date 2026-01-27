"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Code2, 
  Monitor, 
  Database, 
  Cpu, 
  ArrowLeft, 
  User, 
  CheckCircle2, 
  Rocket, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Search,
  Layers,
  Settings,
  Server,
  Activity
} from "lucide-react";

export default function ApplicationDevelopmentPage() {
  const [imgError, setImgError] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: "easeOut" as const }
  };

  const capabilities = [
    { title: "Enterprise ERP", desc: "Integrated management systems for finance, HR, and logistics.", icon: <Server className="w-6 h-6" /> },
    { title: "Local Desktop Apps", desc: "Native Windows and cross-platform tools for offline performance.", icon: <Monitor className="w-6 h-6" /> },
    { title: "Relational Databases", desc: "High-integrity architecture using SQL Server and PostgreSQL.", icon: <Database className="w-6 h-6" /> },
    { title: "Workflow Automation", desc: "Smart scripts to eliminate redundant data entry tasks.", icon: <Activity className="w-6 h-6" /> },
  ];

  const roadmap = [
    { step: "01", title: "Analysis", desc: "Requirement elicitation and process mapping.", icon: <Search /> },
    { step: "02", title: "Schema Design", desc: "Optimizing data relationships for speed.", icon: <Layers /> },
    { step: "03", title: "Core Logic", desc: "Building the engine using .NET and C#.", icon: <Code2 /> },
    { step: "04", title: "Deployment", desc: "On-premise or Cloud installation & QA.", icon: <Rocket /> },
  ];

  const techStack = [
    { name: 'C#', logo: 'https://www.vectorlogo.zone/logos/csharp/csharp-icon.svg' },
    { name: '.NET', logo: 'https://www.vectorlogo.zone/logos/dotnet/dotnet-icon.svg' },
    { name: 'Microsoft SQL', logo: 'https://www.vectorlogo.zone/logos/microsoft_sql_server/microsoft_sql_server-icon.svg' },
    { name: 'PostgreSQL', logo: 'https://www.vectorlogo.zone/logos/postgresql/postgresql-icon.svg' },
    { name: 'Docker', logo: 'https://www.vectorlogo.zone/logos/docker/docker-icon.svg' },
    { name: 'Azure', logo: 'https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg' },
  ];

  return (
    <section className="bg-white min-h-screen selection:bg-indigo-100">
      
      {/* --- HERO SECTION --- */}
      <div className="relative overflow-hidden bg-slate-900 py-32">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop" 
            alt="Secure Systems" 
            fill 
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-slate-900/60 to-slate-900" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div {...fadeIn}>
            <Link 
              href="/services" 
              className="group inline-flex items-center text-indigo-400 font-bold mb-8 hover:text-indigo-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-2 transition-transform" />
              Back to Services
            </Link>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-none">
              Application <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">Systems</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
              We build heavy-duty software foundations. From custom ERP systems to automated 
              reporting tools, we engineer the logic that drives your business.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          
          {/* --- LEFT CONTENT AREA --- */}
          <div className="lg:col-span-2">
            
            {/* Lead Profile Card (Using Local Image) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-24 flex flex-col md:flex-row gap-10 items-center bg-slate-50 p-10 rounded-[2.5rem] border border-slate-200"
            >
              <div className="relative w-56 h-56 shrink-0 group">
                <div className="absolute inset-0 bg-indigo-600 rounded-3xl rotate-6 group-hover:rotate-3 transition-transform duration-500" />
                <div className="relative z-10 w-56 h-56 overflow-hidden rounded-3xl bg-slate-200 shadow-2xl border-4 border-white">
                  {!imgError ? (
                    <Image 
                      src="/images/leader.jpg" // Local image as requested
                      alt="Elijah Emmanuel Hienwo"
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
                <span className="text-indigo-600 font-black tracking-widest text-xs uppercase">Systems Architect</span>
                <h3 className="text-3xl font-black text-slate-900 mt-2 mb-4 tracking-tight">Elijah Emmanuel Hienwo</h3>
                <p className="text-slate-600 mb-6 text-lg leading-relaxed italic">
                  "Complexity is the enemy of execution. Our mission is to take your most difficult 
                  workflows and transform them into seamless, high-performance software systems."
                </p>
                <Link 
                  href="/about-leader" 
                  className="px-8 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold hover:bg-slate-900 hover:text-white transition-all inline-block"
                >
                  Technical Profile
                </Link>
              </div>
            </motion.div>

            {/* Core Capabilities */}
            <div className="mb-24">
              <h2 className="text-4xl font-black text-slate-900 mb-12 flex items-center gap-4">
                <Settings className="text-indigo-600 w-10 h-10 animate-spin-slow" /> System Specializations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {capabilities.map((cap, i) => (
                  <div key={i} className="p-10 border border-slate-100 rounded-3xl bg-white shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all group">
                    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      {cap.icon}
                    </div>
                    <h4 className="font-bold text-xl text-slate-900 mb-3">{cap.title}</h4>
                    <p className="text-slate-600 leading-relaxed">{cap.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual SDLC Section */}
            <div className="mb-24">
              <h2 className="text-4xl font-black text-slate-900 mb-12">Engineered Lifecycle</h2>
              <div className="relative h-96 w-full rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl">
                 <Image 
                   src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200" 
                   alt="Software Development Lifecycle" 
                   fill 
                   className="object-cover"
                 />
                 <div className="absolute inset-0 bg-indigo-900/40 flex items-center justify-center">
                    <div className="px-10 py-4 bg-white/90 backdrop-blur rounded-full font-black text-indigo-900 tracking-widest uppercase">
                       The SDLC Process
                    </div>
                 </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {roadmap.map((item, i) => (
                  <div key={i} className="flex gap-6 p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white transition-all">
                    <div className="text-3xl font-black text-indigo-200">{item.step}</div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                        <span className="text-indigo-600 scale-75">{item.icon}</span> {item.title}
                      </h4>
                      <p className="text-sm text-slate-500 mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Chips */}
            <motion.div {...fadeIn} className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-10">
                    <Cpu className="text-indigo-400" />
                    <h3 className="text-3xl font-bold">The Tech We Trust</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                    {techStack.map((tech) => (
                      <div key={tech.name} className="flex items-center gap-4 group">
                        <div className="w-10 h-10 relative grayscale group-hover:grayscale-0 transition-all">
                           <Image src={tech.logo} alt={tech.name} fill className="object-contain" />
                        </div>
                        <span className="font-bold text-slate-300">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
            </motion.div>
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="lg:sticky lg:top-12 h-fit">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50"
            >
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-indigo-200">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Build Smarter</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Optimize your organization with a system that reduces manual overhead by up to 70%.
              </p>
              
              <div className="space-y-5 mb-10">
                {['Custom DB Architecture', 'Local/Cloud Integration', 'LTS (Long Term Support)'].map((item) => (
                  <div key={item} className="flex items-center gap-4 text-slate-700 font-bold text-sm">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="group relative block w-full bg-slate-900 text-white text-center py-6 rounded-2xl font-black text-lg overflow-hidden transition-all hover:bg-indigo-600 active:scale-95 shadow-xl"
              >
                Request a Quote
              </Link>
            </motion.div>

            {/* Security Note */}
            <div className="mt-8 p-10 bg-emerald-600 rounded-[2.5rem] text-white">
               <ShieldCheck className="w-10 h-10 mb-4" />
               <h4 className="font-black text-xl mb-2">Data Security</h4>
               <p className="text-emerald-100 text-sm leading-relaxed">
                 All our systems include AES-256 encryption and role-based access control as standard.
               </p>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}