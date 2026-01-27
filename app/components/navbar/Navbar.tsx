"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  ChevronRight, 
  Home, 
  Briefcase, 
  Users, 
  Mail,
  Info,
  Search,
  ArrowRight
} from "lucide-react";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Close menus on scroll for a smoother experience
  useEffect(() => {
    const handleScroll = () => {
      setOpenMenu(null);
      setIsSearchOpen(false);
    };
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
          
          {/* BRAND (Logo on the Left) */}
          <Link href="/" className="flex items-center gap-4 group">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white text-[#002147] flex items-center justify-center font-black text-lg md:text-xl shadow-lg"
            >
              SIS
            </motion.div>
            <div className="hidden sm:flex flex-col">
              <span className="text-base md:text-lg font-black tracking-tight leading-none uppercase">
                Solutions & ICT
              </span>
              <span className="text-[9px] md:text-[10px] font-bold text-blue-300 tracking-[0.2em] uppercase">
                Services Limited
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV (Right Aligned) */}
          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>

            <NavHover
              label="Services"
              href="/services"
              onHover={() => setOpenMenu("services")}
              isActive={openMenu === "services"}
            />

            <NavHover
              label="About Us"
              href="/about"
              onHover={() => setOpenMenu("about")}
              isActive={openMenu === "about"}
            />

            <Link href="/team" className="hover:text-blue-400 transition-colors">
              Our Team
            </Link>

            <NavHover
              label="Media & Contact"
              href="/contact"
              onHover={() => setOpenMenu("contact")}
              isActive={openMenu === "contact"}
            />
          </nav>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-2 md:gap-3">
            <button 
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                setOpenMenu(null);
              }}
              className="p-2.5 hover:bg-white/10 rounded-full transition-colors relative group"
              aria-label="Search"
            >
              <Search size={20} className={isSearchOpen ? "text-blue-400" : "text-white"} />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full font-bold shadow-lg transition-all"
            >
              <Menu size={18} />
              <span className="hidden sm:inline text-[10px] md:text-xs uppercase tracking-tighter">Menu</span>
            </motion.button>
          </div>
        </div>

        {/* CLEAN INSTITUTIONAL SEARCH BAR */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-white border-b border-slate-200 overflow-hidden shadow-2xl"
            >
              <div className="max-w-5xl mx-auto px-6 py-8">
                <div className="relative flex items-center">
                   <div className="absolute left-6 text-slate-400">
                      <Search size={24} />
                   </div>
                   <input 
                    autoFocus
                    type="text"
                    placeholder="Search for Services, Technical Staff, or Support News..."
                    className="w-full h-14 md:h-16 pl-16 pr-6 rounded-full border-2 border-slate-200 focus:border-blue-600 outline-none text-slate-800 text-base md:text-lg font-medium transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                   />
                </div>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 justify-center text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span className="text-slate-500">Popular:</span>
                  <Link href="/services/website-development" className="hover:text-blue-600">Web Development</Link>
                  <span>•</span>
                  <Link href="/services/ict-support" className="hover:text-blue-600">ICT Support</Link>
                  <span>•</span>
                  <Link href="/services/application-development" className="hover:text-blue-600">School Portals</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* INSTITUTIONAL DROPDOWN (KNUST Layout Style) */}
        <AnimatePresence>
          {openMenu && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="hidden lg:block absolute left-0 w-full bg-white text-slate-900 border-b border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
            >
              <div className="max-w-7xl mx-auto flex min-h-[380px]">
                {/* Left Side: Institutional Branding */}
                <div className="w-1/3 bg-slate-50 p-10 flex flex-col justify-between border-r border-slate-100">
                  <div>
                    <div className="w-16 h-16 bg-[#002147] rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl mb-6">
                      SIS
                    </div>
                    <h2 className="text-xl font-black tracking-tighter text-[#002147] mb-4 uppercase">
                      {openMenu === "services" && "Professional Services"}
                      {openMenu === "about" && "Institutional Profile"}
                      {openMenu === "contact" && "Get in Touch"}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                      Providing enterprise-grade ICT solutions designed to power modern educational and corporate infrastructures.
                    </p>
                  </div>
                  <Link 
                    href={`/${openMenu}`} 
                    className="group flex items-center gap-2 text-[#002147] font-black text-[10px] uppercase tracking-[0.2em] hover:text-blue-600 transition-colors"
                  >
                    Explore Full Section <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>

                {/* Right Side: Navigation Grid */}
                <div className="w-2/3 p-10">
                  {openMenu === "services" && <ServicesMenu />}
                  {openMenu === "about" && <AboutMenu />}
                  {openMenu === "contact" && <ContactMenu />}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* SIDEBAR DRAWER */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}

/* ===================== */
/* MENU COMPONENTS */
/* ===================== */

function ServicesMenu() {
  const items = [
    { title: "Website Development", desc: "Institutional Portals & CMS", href: "/services/website-development" },
    { title: "App Development", desc: "Enterprise Web & Desktop Apps", href: "/services/application-development" },
    { title: "Graphic Design", desc: "Corporate Branding & Media", href: "/services/graphic-design" },
    { title: "ICT Teaching", desc: "Institutional Training Programs", href: "/services/ict-teaching" },
    { title: "Hardware Services", desc: "Fleet Maintenance & Repairs", href: "/services/hardware-fixing" },
    { title: "System Support", desc: "Managed ICT Support Services", href: "/services/ict-support" },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-12 gap-y-8">
      {items.map((item, idx) => (
        <DropdownLink key={idx} {...item} />
      ))}
    </div>
  );
}

function AboutMenu() {
  const items = [
    { title: "Corporate Identity", desc: "Vision, Mission & Values", href: "/about/who-we-are" },
    { title: "Our Methodology", desc: "The SIS Project Lifecycle", href: "/about/our-approach" },
    { title: "Client Portfolio", desc: "Institutions We Empower", href: "/about/who-we-serve" },
    { title: "Quality Standards", desc: "Technical Certifications", href: "/about/certs" },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-12 gap-y-8">
      {items.map((item, idx) => (
        <DropdownLink key={idx} {...item} />
      ))}
    </div>
  );
}

function ContactMenu() {
  const items = [
    { title: "Service Request", desc: "Initiate a project inquiry", href: "/contact/request-service" },
    { title: "Media Relations", desc: "Press releases & updates", href: "/news" },
    { title: "Technical Support", desc: "Instant assistance channels", href: "/contact/whatsapp" },
    { title: "Global Offices", desc: "Regional contact information", href: "/contact" },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-12 gap-y-8">
      {items.map((item, idx) => (
        <DropdownLink key={idx} {...item} />
      ))}
    </div>
  );
}

/* ===================== */
/* REUSABLE UI HELPERS */
/* ===================== */

function NavHover({ label, href, onHover, isActive }: { label: string; href: string; onHover: () => void; isActive: boolean }) {
  return (
    <div onMouseEnter={onHover} className="relative py-2 cursor-pointer group">
      <Link href={href} className={`transition-colors ${isActive ? "text-blue-400" : "hover:text-blue-400"}`}>
        {label}
      </Link>
      <motion.div 
        animate={{ width: isActive ? "100%" : "0%" }}
        className="absolute -bottom-1 left-0 h-0.5 bg-blue-400"
      />
    </div>
  );
}

function DropdownLink({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <Link href={href} className="group block">
      <h4 className="text-[11px] font-black text-[#002147] uppercase tracking-wider group-hover:text-blue-600 transition-colors mb-1">
        {title}
      </h4>
      <p className="text-xs text-slate-500 font-medium group-hover:text-slate-700">{desc}</p>
    </Link>
  );
}

/* ===================== */
/* SIDEBAR DRAWER */
/* ===================== */

function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#002147]/60 backdrop-blur-sm z-[200]"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[380px] bg-white shadow-2xl z-[201] overflow-y-auto"
          >
            <div className="bg-[#002147] text-white p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-xl bg-white text-[#002147] flex items-center justify-center font-black text-xl">
                  SIS
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
                  <X size={24} />
                </button>
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tighter">Main Navigation</h2>
              <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest mt-2">Institutional ICT Services</p>
            </div>

            <div className="p-6 md:p-8 space-y-2">
              <SidebarLink href="/" icon={<Home size={20} />} label="Home" onClick={onClose} />
              
              <SidebarSection
                icon={<Briefcase size={20} />}
                label="Services"
                expanded={expandedSection === "services"}
                onToggle={() => setExpandedSection(expandedSection === "services" ? null : "services")}
              >
                <SidebarSubLink href="/services/website-development" label="Website Development" onClick={onClose} />
                <SidebarSubLink href="/services/application-development" label="Application Development" onClick={onClose} />
                <SidebarSubLink href="/services/graphic-design" label="Graphic Design" onClick={onClose} />
                <SidebarSubLink href="/services/ict-teaching" label="ICT Teaching" onClick={onClose} />
                <SidebarSubLink href="/services/hardware-fixing" label="Hardware Fixing" onClick={onClose} />
                <SidebarSubLink href="/services/ict-support" label="ICT Support" onClick={onClose} />
              </SidebarSection>

              <SidebarSection
                icon={<Info size={20} />}
                label="About Us"
                expanded={expandedSection === "about"}
                onToggle={() => setExpandedSection(expandedSection === "about" ? null : "about")}
              >
                <SidebarSubLink href="/about/who-we-are" label="Corporate Identity" onClick={onClose} />
                <SidebarSubLink href="/about/our-approach" label="Our Methodology" onClick={onClose} />
                <SidebarSubLink href="/about/who-we-serve" label="Client Portfolio" onClick={onClose} />
              </SidebarSection>

              <SidebarLink href="/team" icon={<Users size={20} />} label="Our Team" onClick={onClose} />

              <SidebarSection
                icon={<Mail size={20} />}
                label="Contact"
                expanded={expandedSection === "contact"}
                onToggle={() => setExpandedSection(expandedSection === "contact" ? null : "contact")}
              >
                <SidebarSubLink href="/contact/request-service" label="Service Request" onClick={onClose} />
                <SidebarSubLink href="/contact/whatsapp" label="Technical Support" onClick={onClose} />
                <SidebarSubLink href="/contact" label="Global Offices" onClick={onClose} />
              </SidebarSection>
            </div>

            <div className="mt-8 p-8 border-t border-slate-100 bg-slate-50 text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-loose">
                Empowering Institutions Through <br /> Technical Excellence
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SidebarLink({ href, icon, label, onClick }: { href: string; icon: any; label: string; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group">
      <span className="text-blue-600">{icon}</span>
      <span className="font-bold text-slate-800 uppercase text-[11px] tracking-wider group-hover:text-blue-600">{label}</span>
    </Link>
  );
}

function SidebarSection({ icon, label, expanded, onToggle, children }: { icon: any; label: string; expanded: boolean; onToggle: () => void; children: React.ReactNode }) {
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
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pl-12 space-y-2 mt-2 border-l-2 border-blue-100 ml-6">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarSubLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="block py-2 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">
      {label}
    </Link>
  );
}