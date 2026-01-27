"use client";

import { useState } from "react";
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
  Info
} from "lucide-react";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm"
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          {/* BRAND */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold tracking-wide shadow-lg"
            >
              SIS
            </motion.div>
            <span className="hidden sm:inline text-lg font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Solutions & ICT Services
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8 text-base font-medium text-slate-700">
            <Link href="/" className="hover:text-blue-600 transition-colors flex items-center gap-2">
              <Home size={18} />
              Home
            </Link>

            <NavHover
              label="Services"
              href="/services"
              icon={<Briefcase size={18} />}
              onHover={() => setOpenMenu("services")}
            />

            <NavHover
              label="About"
              href="/about"
              icon={<Info size={18} />}
              onHover={() => setOpenMenu("about")}
            />

            <Link href="/team" className="hover:text-blue-600 transition-colors flex items-center gap-2">
              <Users size={18} />
              Our Team
            </Link>

            <NavHover
              label="Contact"
              href="/contact"
              icon={<Mail size={18} />}
              onHover={() => setOpenMenu("contact")}
            />
          </nav>

          {/* SIDEBAR TOGGLE BUTTON (Desktop & Mobile) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
          >
            <Menu size={20} />
            <span className="hidden sm:inline">Menu</span>
          </motion.button>
        </div>

        {/* DESKTOP DROPDOWN */}
        <AnimatePresence>
          {openMenu && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="hidden lg:block absolute left-0 w-full bg-white border-b border-slate-200 shadow-lg"
            >
              <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                {openMenu === "services" && <ServicesMenu />}
                {openMenu === "about" && <AboutMenu />}
                {openMenu === "contact" && <ContactMenu />}
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
/* SIDEBAR DRAWER */
/* ===================== */

function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-linear-to-br from-slate-50 to-white shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-linear-to-r from-blue-600 to-indigo-700 text-white p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-xl shadow-lg"
                >
                  SIS
                </motion.div>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={24} />
                </motion.button>
              </div>
              <h2 className="text-xl font-bold">Navigation Menu</h2>
              <p className="text-blue-100 text-sm mt-1">Explore our services</p>
            </div>

            {/* Navigation Links */}
            <div className="p-6 space-y-2">
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
                <SidebarSubLink href="/about/who-we-are" label="Who We Are" onClick={onClose} />
                <SidebarSubLink href="/about/our-approach" label="Our Approach" onClick={onClose} />
                <SidebarSubLink href="/about/who-we-serve" label="Who We Serve" onClick={onClose} />
              </SidebarSection>

              <SidebarLink href="/team" icon={<Users size={20} />} label="Our Team" onClick={onClose} />

              <SidebarSection
                icon={<Mail size={20} />}
                label="Contact"
                expanded={expandedSection === "contact"}
                onToggle={() => setExpandedSection(expandedSection === "contact" ? null : "contact")}
              >
                <SidebarSubLink href="/contact/request-service" label="Request a Service" onClick={onClose} />
                <SidebarSubLink href="/contact/whatsapp" label="WhatsApp" onClick={onClose} />
                <SidebarSubLink href="/contact" label="Email & Phone" onClick={onClose} />
              </SidebarSection>
            </div>

            {/* Footer */}
            <div className="mt-auto p-6 border-t border-slate-200 bg-slate-100">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-linear-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-2xl shadow-lg mb-3">
                  SIS
                </div>
                <p className="text-sm font-semibold text-slate-900">Solutions & ICT Services</p>
                <p className="text-xs text-slate-600 mt-1">Empowering through Technology</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ===================== */
/* SIDEBAR COMPONENTS */
/* ===================== */

function SidebarLink({ 
  href, 
  icon, 
  label, 
  onClick 
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string; 
  onClick: () => void;
}) {
  return (
    <Link href={href} onClick={onClick}>
      <motion.div
        whileHover={{ x: 4 }}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
      >
        <div className="text-blue-600 group-hover:text-blue-700">
          {icon}
        </div>
        <span className="font-medium text-slate-900 group-hover:text-blue-700">
          {label}
        </span>
      </motion.div>
    </Link>
  );
}

function SidebarSection({
  icon,
  label,
  expanded,
  onToggle,
  children
}: {
  icon: React.ReactNode;
  label: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <motion.button
        whileHover={{ x: 4 }}
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className="text-blue-600 group-hover:text-blue-700">
            {icon}
          </div>
          <span className="font-medium text-slate-900 group-hover:text-blue-700">
            {label}
          </span>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-slate-400 group-hover:text-blue-600"
        >
          <ChevronRight size={18} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="ml-4 mt-1 space-y-1 overflow-hidden border-l-2 border-blue-200"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarSubLink({ 
  href, 
  label, 
  onClick 
}: { 
  href: string; 
  label: string; 
  onClick: () => void;
}) {
  return (
    <Link href={href} onClick={onClick}>
      <motion.div
        whileHover={{ x: 4 }}
        className="pl-4 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded transition-colors"
      >
        {label}
      </motion.div>
    </Link>
  );
}

/* ===================== */
/* NAV HOVER ITEM */
/* ===================== */

function NavHover({
  label,
  href,
  icon,
  onHover,
}: {
  label: string;
  href: string;
  icon: React.ReactNode;
  onHover: () => void;
}) {
  return (
    <Link
      href={href}
      onMouseEnter={onHover}
      className="hover:text-blue-600 transition-colors flex items-center gap-2"
    >
      {icon}
      {label}
    </Link>
  );
}

/* ===================== */
/* DROPDOWNS */
/* ===================== */

function ServicesMenu() {
  return (
    <DropdownGrid>
      <DropdownCard
        title="Website Development"
        description="Modern websites and portals for schools and institutions."
        href="/services/website-development"
        color="from-blue-500 to-cyan-500"
      />
      <DropdownCard
        title="Application Development"
        description="Custom web and desktop systems built to scale."
        href="/services/application-development"
        color="from-indigo-500 to-purple-500"
      />
      <DropdownCard
        title="Graphic Design"
        description="Branding, posters, flyers, and digital creatives."
        href="/services/graphic-design"
        color="from-pink-500 to-rose-500"
      />
      <DropdownCard
        title="ICT Teaching"
        description="Hands-on ICT teaching and project supervision."
        href="/services/ict-teaching"
        color="from-emerald-500 to-teal-500"
      />
      <DropdownCard
        title="Hardware Fixing"
        description="Repairs for mobile phones and laptops."
        href="/services/hardware-fixing"
        color="from-orange-500 to-amber-500"
      />
      <DropdownCard
        title="ICT Support"
        description="System maintenance and technical support."
        href="/services/ict-support"
        color="from-violet-500 to-fuchsia-500"
      />
    </DropdownGrid>
  );
}

function AboutMenu() {
  return (
    <DropdownGrid>
      <DropdownCard
        title="Who We Are"
        description="Education-driven ICT professionals."
        href="/about/who-we-are"
        color="from-blue-500 to-indigo-500"
      />
      <DropdownCard
        title="Our Approach"
        description="Simple, secure, and sustainable solutions."
        href="/about/our-approach"
        color="from-teal-500 to-emerald-500"
      />
      <DropdownCard
        title="Who We Serve"
        description="Schools, NGOs, and institutions."
        href="/about/who-we-serve"
        color="from-purple-500 to-pink-500"
      />
    </DropdownGrid>
  );
}

function ContactMenu() {
  return (
    <DropdownGrid>
      <DropdownCard
        title="Request a Service"
        description="Start a conversation about your project."
        href="/contact/request-service"
        color="from-blue-500 to-cyan-500"
      />
      <DropdownCard
        title="WhatsApp"
        description="Fast enquiries and quick responses."
        href="/contact/whatsapp"
        color="from-green-500 to-emerald-500"
      />
      <DropdownCard
        title="Email & Phone"
        description="Official institutional contact channels."
        href="/contact"
        color="from-indigo-500 to-purple-500"
      />
    </DropdownGrid>
  );
}

/* ===================== */
/* UI HELPERS */
/* ===================== */

function DropdownGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {children}
    </div>
  );
}

function DropdownCard({
  title,
  description,
  href,
  color
}: {
  title: string;
  description: string;
  href: string;
  color: string;
}) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        className="group relative rounded-xl p-5 bg-white hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden"
      >
        {/* Gradient accent bar */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${color}`} />
        
        {/* Hover gradient overlay */}
        <div className={`absolute inset-0 bg-linear-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
        
        <div className="relative z-10">
          <h3 className="font-bold text-slate-900 mb-2 text-base group-hover:text-blue-700 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Arrow icon */}
        <motion.div
          initial={{ x: -5, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
          className="absolute bottom-4 right-4 text-blue-600"
        >
          <ChevronRight size={18} />
        </motion.div>
      </motion.div>
    </Link>
  );
}