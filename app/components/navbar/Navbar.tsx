"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, Bell, ArrowRight, Home, MessageSquare, ChevronRight,
  Briefcase, Users, Mail, Info, Target, Workflow,
  Award, Globe, ShieldCheck, Cpu, Lock, LogIn, LogOut, UserPlus, User
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { isSupportUser } from "@/lib/support";
import Button from "../ui/Button";

/* DATA CONFIGURATION */
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
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileButtonRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const fetchNotificationCount = async (email?: string | null) => {
      if (isSupportUser(email)) {
        const { count, error } = await supabase
          .from("comments")
          .select("id", { count: "exact", head: true })
          .eq("is_reviewed", false);
        setNotificationCount(count ?? 0);
        if (error) console.warn("Error fetching admin notification count:", error.message);
        return;
      }
      const { count, error } = await supabase
        .from("news")
        .select("id", { count: "exact", head: true });
      setNotificationCount(count ?? 0);
      if (error) console.warn("Error fetching news count:", error.message);
    };

    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      await fetchNotificationCount(currentUser?.email ?? null);
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      fetchNotificationCount(currentUser?.email ?? null);
      if (event === "SIGNED_OUT") {
        setShowProfileDropdown(false);
      }
    });

    const handleScroll = () => {
      setOpenMenu(null);
      setShowProfileDropdown(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        showProfileDropdown &&
        profileButtonRef.current &&
        dropdownRef.current &&
        !profileButtonRef.current.contains(target) &&
        !dropdownRef.current.contains(target)
      ) {
        setShowProfileDropdown(false);
      }
    };
    window.addEventListener("click", handleOutsideClick, true);
    return () => window.removeEventListener("click", handleOutsideClick, true);
  }, [showProfileDropdown]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowProfileDropdown(false);
    router.replace("/");
  };

  return (
    <>
      <header
        className="sticky top-0 z-[100] bg-[#FAF9F6] text-[#111111] border-b border-[#e6dcc9] shadow-md transition-colors duration-200"
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#111111] text-[#FAF9F6] flex items-center justify-center font-black text-lg md:text-xl shadow-md transition-transform group-hover:rotate-12">
              NGI
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest">
            <Link href="/" className="hover:text-[#111111]/70 transition-colors">Home</Link>
            <NavTrigger label="Services" id="services" activeMenu={openMenu} setMenu={setOpenMenu} />
            <NavTrigger label="About NGI" id="about" activeMenu={openMenu} setMenu={setOpenMenu} />
            <Link href="/team" className="hover:text-[#111111]/70 transition-colors">Our Team</Link>
            <Link href="/comments" className="hover:text-[#111111]/70 transition-colors">Comment</Link>
            <Link href="/contact" className="hover:text-[#111111]/70 transition-colors">Contact</Link>
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-3 relative">

            {/* NOTIFICATION BELL */}
            <div className="relative">
              <button
                onClick={() => {
                  const destination = user && isSupportUser(user.email) ? "/notifications" : "/news";
                  router.push(destination);
                }}
                className="relative flex items-center justify-center w-10 h-10 bg-[#111111] hover:bg-[#222222] text-[#FAF9F6] rounded-full border border-[#111111] transition-all active:scale-95"
              >
                <Bell size={18} />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] font-black text-white flex items-center justify-center border border-[#FAF9F6]">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </button>
            </div>

            {/* PROFILE DROPDOWN SYSTEM */}
            <div className="relative">
              <Button
                ref={profileButtonRef}
                variant="ghost"
                size="icon"
                onClick={() => setShowProfileDropdown((current) => !current)}
                className="relative flex items-center gap-2 p-1 rounded-full border border-gray-200 hover:bg-gray-100 transition-all active:scale-95 text-[#111111]"
              >
                {user ? (
                  <div className="relative">
                    <img
                      src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.user_metadata?.full_name || user.email)}&background=111111&color=ffffff`}
                      alt="User"
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full border-2 border-gray-200 object-cover"
                    />
                    {isSupportUser(user.email) && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#111111] rounded-full border-2 border-white" />
                    )}
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#111111] flex items-center justify-center text-white">
                    <User size={18} />
                  </div>
                )}
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} />
              </Button>

              <AnimatePresence>
                {showProfileDropdown && (
                  <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                  >
                    {user ? (
                      <div className="p-4">

                        {/* User Info Card */}
                        <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                          <img
                            src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.user_metadata?.full_name || user.email)}&background=111111&color=ffffff`}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-full border-2 border-gray-200 object-cover"
                            alt="User avatar"
                          />
                          <div className="overflow-hidden">
                            <p className="text-[#111111] font-black text-xs truncate">
                              {user.user_metadata?.full_name || user.user_metadata?.name || "Active User"}
                            </p>
                            <p className="text-gray-400 text-[10px] truncate">{user.email}</p>
                          </div>
                        </div>

                        {/* Admin section — only shown for support/admin users */}
                        {isSupportUser(user.email) && (
                          <>
                            {/* Admin Badge */}
                            <div className="mb-3 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100">
                              <div className="flex items-center gap-2">
                                <ShieldCheck size={12} className="text-gray-400" />
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.15em]">
                                  Administrator
                                </p>
                              </div>
                            </div>

                            {/* Admin Portal Button */}
                            <Link
                              href="/admin"
                              onClick={() => setShowProfileDropdown(false)}
                              className="w-full flex items-center gap-3 px-4 py-3 mb-3 bg-[#111111] text-white font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#222222] transition-all active:scale-[0.98] group"
                            >
                              <ShieldCheck size={14} className="text-white flex-shrink-0" />
                              <span className="flex-1 text-left">Admin Portal</span>
                              <ArrowRight
                                size={12}
                                className="text-white/50 group-hover:translate-x-1 transition-transform flex-shrink-0"
                              />
                            </Link>
                          </>
                        )}

                        {/* Sign Out Button */}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-[#111111] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-gray-200 transition-all active:scale-[0.98]"
                        >
                          <LogOut size={14} /> Sign Out
                        </button>
                      </div>
                    ) : (
                      <div className="p-4 space-y-3">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] px-1 mb-2">
                          Account Access
                        </p>
                        <Link
                          href="/login"
                          onClick={() => setShowProfileDropdown(false)}
                          className="flex items-center gap-3 px-4 py-3.5 text-[#111111] font-bold text-xs hover:bg-gray-50 rounded-xl transition-colors border border-gray-200"
                        >
                          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                            <LogIn size={14} className="text-[#111111]" />
                          </div>
                          <div>
                            <span className="block uppercase tracking-wider text-[11px]">Log In</span>
                            <span className="block text-[9px] text-gray-400 font-medium">
                              Access your account
                            </span>
                          </div>
                        </Link>
                        <Link
                          href="/signup"
                          onClick={() => setShowProfileDropdown(false)}
                          className="flex items-center gap-3 px-4 py-3.5 bg-[#111111] text-white font-bold text-xs hover:bg-[#222222] rounded-xl transition-all"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                            <UserPlus size={14} className="text-white" />
                          </div>
                          <div>
                            <span className="block uppercase tracking-wider text-[11px]">Sign Up Free</span>
                            <span className="block text-[9px] text-white/50 font-medium">
                              Create new account
                            </span>
                          </div>
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* MOBILE ONLY MENU BUTTON */}
            <Button
              onClick={() => setSidebarOpen(true)}
              variant="primary"
              size="sm"
              className="md:hidden flex items-center gap-2 bg-[#111111] hover:bg-[#222222] text-[#FAF9F6] border-none"
            >
              <Menu size={18} />
              <span className="hidden sm:inline text-xs uppercase tracking-tighter">Menu</span>
            </Button>

          </div>
        </div>

        {/* MEGA MENU WITH CANVAS */}
        <AnimatePresence>
          {openMenu && (NAVIGATION_DATA[openMenu as keyof typeof NAVIGATION_DATA]) && (
            <MegaMenuContent
              data={NAVIGATION_DATA[openMenu as keyof typeof NAVIGATION_DATA]}
              onClose={() => setOpenMenu(null)}
            />
          )}
        </AnimatePresence>
      </header>

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
      <div className={`flex items-center gap-1 transition-colors ${activeMenu === id ? "text-[#111111]" : "text-[#111111]/70"}`}>
        {label} <ChevronDown size={14} className={`transition-transform duration-300 ${activeMenu === id ? "rotate-180" : ""}`} />
      </div>
      <motion.div
        animate={{ width: activeMenu === id ? "100%" : "0%" }}
        className="absolute -bottom-1 left-0 h-0.5 bg-[#111111]"
      />
    </div>
  );
}

/* Canvas Background Component */
function CanvasBackground({ variant = "light" }: { variant?: "light" | "dark" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number; y: number; vx: number; vy: number; radius: number; opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };

    const initParticles = () => {
      particles = [];
      const count = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 8000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.2 + 0.05,
        });
      }
    };

    const lineColor = variant === "dark" ? "250, 249, 246" : "17, 17, 17";
    const dotColor = variant === "dark" ? "250, 249, 246" : "17, 17, 17";

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${lineColor}, ${0.04 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotColor}, ${p.opacity})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    initParticles();
    draw();

    const resizeHandler = () => {
      resize();
      initParticles();
    };
    window.addEventListener("resize", resizeHandler);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeHandler);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

function MegaMenuContent({ data, onClose }: { data: any; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="hidden md:block absolute left-0 w-full shadow-2xl border-b border-[#e6dcc9] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-12 min-h-[420px]">
        {/* Left Panel - Black */}
        <div className="col-span-4 bg-[#111111] p-12 flex flex-col justify-between relative overflow-hidden">
          <CanvasBackground variant="dark" />
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#FAF9F6]/3 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FAF9F6]/3 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="w-14 h-14 bg-[#FAF9F6]/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-[#FAF9F6] font-black text-xl mb-6 border border-[#FAF9F6]/10">
              NGI
            </div>
            <h2 className="text-2xl font-black text-[#FAF9F6] uppercase tracking-tighter mb-4">{data.title}</h2>
            <p className="text-[#FAF9F6]/40 leading-relaxed text-sm font-medium">{data.tagline}</p>
          </div>
          <Link
            href="/services/service-request"
            onClick={onClose}
            className="relative z-10 group flex items-center gap-3 mt-6"
          >
            <div className="flex items-center gap-2 px-5 py-3 bg-[#FAF9F6] rounded-xl transition-all group-hover:bg-[#f0ece4]">
              <span className="text-[#111111] font-black text-[10px] uppercase tracking-[0.15em]">Start Your Project</span>
              <ArrowRight size={14} className="text-[#111111] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Right Panel - Cream */}
        <div className="col-span-8 bg-[#FAF9F6] p-12 relative overflow-hidden">
          <CanvasBackground variant="light" />
          <div className="relative z-10">
            <p className="text-[9px] font-black text-[#111111]/30 uppercase tracking-[0.25em] mb-8">
              {data.items.length} Solutions Available
            </p>
            <div className="grid grid-cols-2 gap-4">
              {data.items.map((item: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-start gap-4 p-4 rounded-2xl bg-white/60 hover:bg-white border border-[#e6dcc9]/50 hover:border-[#111111]/10 transition-all hover:shadow-lg"
                  >
                    <div className="p-3 bg-[#111111] rounded-xl group-hover:bg-[#222222] transition-all text-[#FAF9F6] flex-shrink-0">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black uppercase tracking-wider text-[#111111] group-hover:text-[#111111]/80 transition-colors mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-[#111111]/40 font-medium leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ===================== */
/* SIDEBAR DRAWER        */
/* ===================== */
function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
  }, []);

  const navLinks = [
    { href: "/team", icon: Users, label: "Our Team", desc: "Meet our experts" },
    { href: "/comments", icon: MessageSquare, label: "Comments", desc: "User feedback" },
    { href: "/contact", icon: Mail, label: "Contact", desc: "Get in touch" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#111111]/70 backdrop-blur-sm z-[200]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-[#FAF9F6] shadow-2xl z-[201] flex flex-col overflow-hidden"
          >
            {/* Header - Black */}
            <div className="bg-[#111111] text-[#FAF9F6] px-6 pt-6 pb-8 relative overflow-hidden flex-shrink-0">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#FAF9F6]/3 rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#FAF9F6]/3 rounded-full" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#FAF9F6]/10 backdrop-blur-sm text-[#FAF9F6] flex items-center justify-center font-black text-lg border border-[#FAF9F6]/10">
                      NGI
                    </div>
                    <div>
                      <h2 className="text-base font-black uppercase tracking-tight leading-none">Navigation</h2>
                      <p className="text-[#FAF9F6]/30 text-[9px] font-bold uppercase tracking-[0.15em] mt-0.5">
                        Menu
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-xl bg-[#FAF9F6]/10 hover:bg-[#FAF9F6]/20 flex items-center justify-center text-[#FAF9F6] transition-all active:scale-90"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#FAF9F6]/40 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-[#FAF9F6]/20 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-[#FAF9F6]/10 rounded-full" />
                  <p className="text-[#FAF9F6]/20 text-[9px] font-bold uppercase tracking-[0.2em] ml-1">
                    Simple Technology · Powerful Results
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Content */}
            <div className="flex-1 overflow-y-auto bg-[#FAF9F6]">
              {/* Home */}
              <div className="px-5 pt-5 pb-2">
                <p className="text-[9px] font-black text-[#111111]/25 uppercase tracking-[0.25em] mb-3 px-1">
                  Quick Access
                </p>
                <Link
                  href="/"
                  onClick={onClose}
                  className="flex items-center gap-4 px-4 py-3.5 rounded-2xl bg-white hover:bg-white/80 border border-[#e6dcc9]/60 transition-all group shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#111111] flex items-center justify-center text-[#FAF9F6] group-hover:scale-105 transition-transform">
                    <Home size={18} />
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-[#111111] text-xs uppercase tracking-wider block">Home</span>
                    <span className="text-[10px] text-[#111111]/30 font-medium">Return to homepage</span>
                  </div>
                  <ChevronRight size={16} className="text-[#111111]/15 group-hover:text-[#111111]/40 group-hover:translate-x-1 transition-all" />
                </Link>
              </div>

              {/* Explore Section */}
              <div className="px-5 pt-4 pb-2">
                <p className="text-[9px] font-black text-[#111111]/25 uppercase tracking-[0.25em] mb-3 px-1">
                  Explore
                </p>

                {/* Services Expandable */}
                <div className="bg-white rounded-2xl border border-[#e6dcc9]/60 overflow-hidden shadow-sm mb-3">
                  <button
                    onClick={() => setExpandedSection(expandedSection === "services" ? null : "services")}
                    className="w-full flex items-center gap-4 px-4 py-3.5 hover:bg-[#FAF9F6] transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#111111] flex items-center justify-center text-[#FAF9F6]">
                      <Briefcase size={18} />
                    </div>
                    <div className="text-left flex-1">
                      <span className="font-bold text-[#111111] text-xs uppercase tracking-wider block">Our Services</span>
                      <span className="text-[10px] text-[#111111]/30 font-medium">{NAVIGATION_DATA.services.items.length} services available</span>
                    </div>
                    <ChevronRight
                      size={16}
                      className={`text-[#111111]/15 transition-transform duration-200 ${expandedSection === "services" ? "rotate-90 text-[#111111]/40" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {expandedSection === "services" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 pb-3 pt-1 border-t border-[#e6dcc9]/40">
                          <div className="grid grid-cols-2 gap-2">
                            {NAVIGATION_DATA.services.items.map((item, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.04 }}
                              >
                                <Link
                                  href={item.href}
                                  onClick={onClose}
                                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#FAF9F6] hover:bg-[#111111] border border-[#e6dcc9]/30 transition-all group text-center"
                                >
                                  <div className="w-9 h-9 rounded-lg bg-[#111111] group-hover:bg-[#FAF9F6]/10 flex items-center justify-center text-[#FAF9F6] transition-all">
                                    <item.icon size={16} />
                                  </div>
                                  <span className="font-bold text-[#111111] group-hover:text-[#FAF9F6] text-[9px] uppercase tracking-wide leading-tight transition-colors">
                                    {item.title}
                                  </span>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* About Expandable */}
                <div className="bg-white rounded-2xl border border-[#e6dcc9]/60 overflow-hidden shadow-sm mb-3">
                  <button
                    onClick={() => setExpandedSection(expandedSection === "about" ? null : "about")}
                    className="w-full flex items-center gap-4 px-4 py-3.5 hover:bg-[#FAF9F6] transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#111111] flex items-center justify-center text-[#FAF9F6]">
                      <Info size={18} />
                    </div>
                    <div className="text-left flex-1">
                      <span className="font-bold text-[#111111] text-xs uppercase tracking-wider block">About NGI</span>
                      <span className="text-[10px] text-[#111111]/30 font-medium">Learn who we are</span>
                    </div>
                    <ChevronRight
                      size={16}
                      className={`text-[#111111]/15 transition-transform duration-200 ${expandedSection === "about" ? "rotate-90 text-[#111111]/40" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {expandedSection === "about" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 pb-3 pt-1 border-t border-[#e6dcc9]/40">
                          <div className="grid grid-cols-2 gap-2">
                            {NAVIGATION_DATA.about.items.map((item, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.04 }}
                              >
                                <Link
                                  href={item.href}
                                  onClick={onClose}
                                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#FAF9F6] hover:bg-[#111111] border border-[#e6dcc9]/30 transition-all group text-center"
                                >
                                  <div className="w-9 h-9 rounded-lg bg-[#111111] group-hover:bg-[#FAF9F6]/10 flex items-center justify-center text-[#FAF9F6] transition-all">
                                    <item.icon size={16} />
                                  </div>
                                  <span className="font-bold text-[#111111] group-hover:text-[#FAF9F6] text-[9px] uppercase tracking-wide leading-tight transition-colors">
                                    {item.title}
                                  </span>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Standard Links */}
                <div className="space-y-2">
                  {navLinks.map((link, i) => (
                    <Link
                      key={i}
                      href={link.href}
                      onClick={onClose}
                      className="flex items-center gap-4 px-4 py-3.5 rounded-2xl bg-white hover:bg-white/80 border border-[#e6dcc9]/60 transition-all group shadow-sm"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#111111] flex items-center justify-center text-[#FAF9F6] group-hover:scale-105 transition-transform">
                        <link.icon size={18} />
                      </div>
                      <div className="flex-1">
                        <span className="font-bold text-[#111111] text-xs uppercase tracking-wider block">{link.label}</span>
                        <span className="text-[10px] text-[#111111]/30 font-medium">{link.desc}</span>
                      </div>
                      <ChevronRight size={16} className="text-[#111111]/15 group-hover:text-[#111111]/40 group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>

                {/* Admin Link - Sidebar */}
                {user && isSupportUser(user.email) && (
                  <Link
                    href="/admin"
                    onClick={onClose}
                    className="flex items-center gap-4 px-4 py-3.5 mt-3 rounded-2xl bg-[#111111] hover:bg-[#1a1a1a] border border-[#222222] transition-all group shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#FAF9F6]/10 flex items-center justify-center text-[#FAF9F6]">
                      <ShieldCheck size={18} />
                    </div>
                    <div className="flex-1">
                      <span className="font-bold text-[#FAF9F6] text-xs uppercase tracking-wider block">Admin Portal</span>
                      <span className="text-[10px] text-[#FAF9F6]/30 font-medium">Management dashboard</span>
                    </div>
                    <ChevronRight size={16} className="text-[#FAF9F6]/20 group-hover:translate-x-1 transition-all" />
                  </Link>
                )}
              </div>

              {/* CTA in Sidebar */}
              <div className="px-5 pt-4 pb-4">
                <Link
                  href="/services/service-request"
                  onClick={onClose}
                  className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-[#111111] hover:bg-[#1a1a1a] rounded-2xl transition-all group"
                >
                  <span className="text-[#FAF9F6] font-black text-[10px] uppercase tracking-[0.15em]">Start Your Project</span>
                  <ArrowRight size={14} className="text-[#FAF9F6] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Footer - Black */}
            <div className="flex-shrink-0 bg-[#111111] px-6 py-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#FAF9F6]/3 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <p className="text-[9px] font-black text-[#FAF9F6]/20 uppercase tracking-[0.2em]">
                    Systems Online
                  </p>
                </div>
                <p className="text-[10px] font-bold text-[#FAF9F6]/10 uppercase tracking-widest">
                  Architecting Institutional Efficiency
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}