"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, ChevronDown, Search, ArrowRight, Home, ChevronRight, 
  Briefcase, Users, Mail, Info, Target, Workflow, 
  Award, Globe, ShieldCheck, Cpu, Zap, Lock
} from "lucide-react";

/* ===================== */
/* DATA CONFIGURATION    */
/* ===================== */

const NAVIGATION_DATA = {
  services: {
    title: "Our Services",
    tagline: "Simple, powerful digital tools built for schools and businesses.",
    items: [
      { title: "Web & Portals", desc: "Easy-to-use school & business sites", href: "/services/website-development", icon: Globe },
      { title: "Custom Software", desc: "Apps built for your specific needs", href: "/services/application-development", icon: Cpu },
      { title: "Graphic Design", desc: "Logo, branding & professional media", href: "/services/graphic-design", icon: Target },
      { title: "ICT Teaching", desc: "Training for students & staff", href: "/services/ict-teaching", icon: Award },
      { title: "Hardware Fixes", desc: "Maintenance & computer repairs", href: "/services/hardware-fixing", icon: Workflow },
      { title: "Technical Support", desc: "24/7 help for your IT systems", href: "/services/ict-support", icon: ShieldCheck },
    ]
  },
  about: {
    title: "Who We Are",
    tagline: "Making complex technology easy since 2023.",
    items: [
      { title: "Our Identity", desc: "What we believe in", href: "/about#identity", icon: Target },
      { title: "How We Work", desc: "Our simple 3-step process", href: "/about#methodology", icon: Workflow },
      { title: "Who We Serve", desc: "Institutions we empower", href: "/about#portfolio", icon: Briefcase },
      { title: "Safety Rules", desc: "How we protect your data", href: "/about#standards", icon: Lock },
    ]
  }
};

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setOpenMenu(null); setIsSearchOpen(false); };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header 
        className="sticky top-0 z-[100] bg-[#002147] text-white border-b border-white/10 shadow-xl"
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white text-[#002147] flex items-center justify-center font-black text-lg md:text-xl shadow-lg transition-transform group-hover:rotate-12">
              SIS
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm md:text-base font-black tracking-tight leading-none uppercase">Solutions & ICT</span>
              <span className="text-[9px] font-bold text-blue-300 tracking-[0.2em] uppercase">Services Limited</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest">
            <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
            
            {/* Ensure these both use setOpenMenu */}
            <NavTrigger label="Services" id="services" activeMenu={openMenu} setMenu={setOpenMenu} />
            <NavTrigger label="About SIS" id="about" activeMenu={openMenu} setMenu={setOpenMenu} />
            
            <Link href="/team" className="hover:text-blue-400 transition-colors">Our Team</Link>
            <Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-2">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2.5 hover:bg-white/10 rounded-full transition-all">
              <Search size={20} className={isSearchOpen ? "text-blue-400" : "text-white"} />
            </button>
            <button onClick={() => setSidebarOpen(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-full font-bold shadow-lg transition-all active:scale-95">
              <Menu size={18} />
              <span className="hidden sm:inline text-xs uppercase tracking-tighter">Menu</span>
            </button>
          </div>
        </div>

        {/* MEGA MENU */}
        <AnimatePresence>
          {openMenu && (NAVIGATION_DATA[openMenu as keyof typeof NAVIGATION_DATA]) && (
            <MegaMenuContent 
              data={NAVIGATION_DATA[openMenu as keyof typeof NAVIGATION_DATA]} 
              onClose={() => setOpenMenu(null)} 
            />
          )}
        </AnimatePresence>
      </header>

      {/* SEARCH BAR */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="bg-white overflow-hidden border-b border-slate-200">
             <div className="max-w-4xl mx-auto px-6 py-12">
               <input 
                type="text" 
                placeholder="How can we help you today?" 
                className="w-full h-16 px-8 rounded-full border-2 border-slate-100 focus:border-blue-600 outline-none text-slate-900 text-xl font-medium shadow-inner"
               />
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}

/* ===================== */
/* SUB-COMPONENTS        */
/* ===================== */

function NavTrigger({ label, id, activeMenu, setMenu }: any) {
  return (
    <div onMouseEnter={() => setMenu(id)} className="relative py-2 cursor-pointer">
      <div className={`flex items-center gap-1 transition-colors ${activeMenu === id ? "text-blue-400" : ""}`}>
        {label} <ChevronDown size={14} className={`transition-transform duration-300 ${activeMenu === id ? "rotate-180" : ""}`} />
      </div>
      <motion.div 
        animate={{ width: activeMenu === id ? "100%" : "0%" }}
        className="absolute -bottom-1 left-0 h-0.5 bg-blue-400"
      />
    </div>
  );
}

function MegaMenuContent({ data, onClose }: { data: any, onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -10 }}
      className="hidden lg:block absolute left-0 w-full bg-white text-slate-900 shadow-2xl border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto flex min-h-[400px]">
        <div className="w-1/3 bg-slate-50 p-12 border-r border-slate-100 flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 bg-[#002147] rounded-xl flex items-center justify-center text-white font-black text-xl mb-6">SIS</div>
            <h2 className="text-2xl font-black text-[#002147] uppercase tracking-tighter mb-4">{data.title}</h2>
            <p className="text-slate-500 leading-relaxed text-sm font-medium">{data.tagline}</p>
          </div>
          <Link href="/services/service-request" onClick={onClose} className="group flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em]">
            Start Your Project <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="w-2/3 p-12 grid grid-cols-2 gap-x-12 gap-y-10">
          {data.items.map((item: any, idx: number) => (
            <Link key={idx} href={item.href} onClick={onClose} className="group flex items-start gap-4">
              <div className="p-3 bg-slate-100 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all text-blue-600">
                <item.icon size={24} />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#002147] group-hover:text-blue-600 transition-colors mb-1">{item.title}</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-normal">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ===================== */
/* SIDEBAR DRAWER        */
/* ===================== */

function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-[#002147]/60 backdrop-blur-sm z-[200]" />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[380px] bg-white shadow-2xl z-[201] overflow-y-auto"
          >
            <div className="bg-[#002147] text-white p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-xl bg-white text-[#002147] flex items-center justify-center font-black text-xl">SIS</div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full"><X size={24} /></button>
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tighter">Menu</h2>
              <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest mt-2">Simple Technology. Powerful Results.</p>
            </div>

            <div className="p-6 space-y-2">
              <SidebarLink href="/" icon={<Home size={20} />} label="Home" onClick={onClose} />
              
              <SidebarSection
                icon={<Briefcase size={20} />} label="Our Services"
                expanded={expandedSection === "services"}
                onToggle={() => setExpandedSection(expandedSection === "services" ? null : "services")}
              >
                {NAVIGATION_DATA.services.items.map((item, i) => (
                  <SidebarSubLink key={i} href={item.href} label={item.title} onClick={onClose} />
                ))}
              </SidebarSection>

              <SidebarSection
                icon={<Info size={20} />} label="About SIS"
                expanded={expandedSection === "about"}
                onToggle={() => setExpandedSection(expandedSection === "about" ? null : "about")}
              >
                {NAVIGATION_DATA.about.items.map((item, i) => (
                  <SidebarSubLink key={i} href={item.href} label={item.title} onClick={onClose} />
                ))}
              </SidebarSection>

              <SidebarLink href="/team" icon={<Users size={20} />} label="Our Team" onClick={onClose} />
              <SidebarLink href="/contact" icon={<Mail size={20} />} label="Contact" onClick={onClose} />
            </div>

            <div className="mt-8 p-8 border-t border-slate-100 bg-slate-50 text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-loose">
                Architecting Institutional Efficiency
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SidebarLink({ href, icon, label, onClick }: any) {
  return (
    <Link href={href} onClick={onClick} className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group">
      <span className="text-blue-600">{icon}</span>
      <span className="font-bold text-slate-800 uppercase text-[11px] tracking-wider group-hover:text-blue-600">{label}</span>
    </Link>
  );
}

function SidebarSection({ icon, label, expanded, onToggle, children }: any) {
  return (
    <div>
      <button onClick={onToggle} className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors group text-left">
        <div className="flex items-center gap-4">
          <span className="text-blue-600">{icon}</span>
          <span className="font-bold text-slate-800 uppercase text-[11px] tracking-wider group-hover:text-blue-600">{label}</span>
        </div>
        <ChevronRight size={18} className={`transition-transform text-slate-400 ${expanded ? "rotate-90" : ""}`} />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pl-12 space-y-2 mt-2 border-l-2 border-blue-100 ml-6 overflow-hidden">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarSubLink({ href, label, onClick }: any) {
  return (
    <Link href={href} onClick={onClick} className="block py-2 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">
      {label}
    </Link>
  );
}