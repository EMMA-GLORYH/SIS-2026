"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, ChevronDown, Bell, ArrowRight, Home, MessageSquare, ChevronRight, 
  Briefcase, Users, Mail, Info, Target, Workflow, 
  Award, Globe, ShieldCheck, Cpu, Zap, Lock, CheckCircle2, LogIn, LogOut, UserPlus, User
} from "lucide-react";
import { supabase } from "@/lib/supabase";


/* DATA CONFIGURATION    */

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

/* ===================== */
/* TYPES                 */
/* ===================== */
interface AppNotification {
  id: string;
  client_name: string;
  message: string;
  created_at: string;
  is_reviewed?: boolean;
}

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  
  // Navigation State
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Notification State
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [toastAlert, setToastAlert] = useState<AppNotification | null>(null);

  useEffect(() => {
    // --- 1. INITIAL DATA FETCHING ---
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    const fetchLatestMessages = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (data) {
        setNotifications(data);
        setUnreadCount(data.filter(d => !d.is_reviewed).length);
      }
    };

    checkUser();
    fetchLatestMessages();

    // --- 2. AUTH SESSION LISTENER ---
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      
      if (event === 'SIGNED_OUT') {
        setShowProfileDropdown(false);
        setShowNotifications(false);
        router.refresh();
      }
    });

    // --- 3. REAL-TIME NOTIFICATIONS CHANNEL ---
    const channel = supabase
      .channel("realtime-messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comments" },
        (payload) => {
          const newMsg = payload.new as AppNotification;
          
          setNotifications((prev) => [newMsg, ...prev].slice(0, 5));
          setUnreadCount((prev) => prev + 1);
          
          setToastAlert(newMsg);
          setTimeout(() => setToastAlert(null), 5000);
        }
      )
      .subscribe();

    // --- 4. UI EVENT HANDLERS ---
    const handleScroll = () => { 
      setOpenMenu(null); 
      setShowNotifications(false); 
      setShowProfileDropdown(false);
    };
    window.addEventListener("scroll", handleScroll);

    // --- 5. CLEANUP (One consolidated return) ---
    return () => {
      window.removeEventListener("scroll", handleScroll);
      supabase.removeChannel(channel);
      authSubscription.unsubscribe();
    };
  }, [router]);

  // Logout Functionality
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowProfileDropdown(false);
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <header 
        className="sticky top-0 z-[100] bg-[#002147] text-white border-b border-white/10 shadow-xl"
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-[#002147] flex items-center justify-center font-black text-lg md:text-xl shadow-lg transition-transform group-hover:rotate-12">
              NGI
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm md:text-base font-black tracking-tight leading-none uppercase">Solutions & ICT</span>
              <span className="text-[9px] font-bold text-blue-300 tracking-[0.2em] uppercase">Services Limited</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest">
            <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <NavTrigger label="Services" id="services" activeMenu={openMenu} setMenu={setOpenMenu} />
            <NavTrigger label="About NGI" id="about" activeMenu={openMenu} setMenu={setOpenMenu} />
            <Link href="/team" className="hover:text-blue-400 transition-colors">Our Team</Link>
            <Link href="/comments" className="hover:text-blue-400 transition-colors">Comments</Link>
            <Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-3 relative">

            {/* NOTIFICATION BELL — only shown when user is logged in */}
            {user && user.email === 'emmanuelhienwo@gmail.com' && (
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowProfileDropdown(false);
                  }}
                  className="relative flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full border border-white/10 transition-all active:scale-95"
                >
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] font-black flex items-center justify-center border border-[#002147]">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                        <h4 className="text-[10px] font-black text-[#002147] uppercase tracking-widest">Updates & Notifications</h4>
                        {unreadCount > 0 && (
                          <span className="text-[9px] font-bold bg-red-50 text-red-500 px-2 py-0.5 rounded-full">
                            {unreadCount} new
                          </span>
                        )}
                      </div>

                      <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                        {notifications.length === 0 ? (
                          <div className="p-6 text-center">
                            <Bell size={28} className="text-slate-200 mx-auto mb-2" />
                            <p className="text-xs text-slate-400 font-medium">No notifications yet</p>
                          </div>
                        ) : (
                          notifications.map((n) => (
                            <div
                              key={n.id}
                              className={`flex gap-3 px-4 py-3 hover:bg-slate-50 transition-colors ${!n.is_reviewed ? 'bg-blue-50/40' : ''}`}
                            >
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                <MessageSquare size={14} className="text-blue-600" />
                              </div>
                              <div className="overflow-hidden">
                                <p className="text-[11px] font-black text-[#002147] truncate">{n.client_name}</p>
                                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{n.message}</p>
                                <p className="text-[9px] text-slate-300 font-medium mt-1">
                                  {new Date(n.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      <div className="px-4 py-3 border-t border-slate-100">
                        <Link
                          href="/notifications"
                          onClick={() => setShowNotifications(false)}
                          className="flex items-center justify-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                        >
                          View All Updates <ArrowRight size={12} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* PROFILE DROPDOWN SYSTEM — hover to open, hover-leave to close */}
            <div
              className="relative"
              onMouseEnter={() => setShowProfileDropdown(true)}
              onMouseLeave={() => setShowProfileDropdown(false)}
            >
              <button 
                className="flex items-center gap-2 bg-white/10 p-1 rounded-full border border-white/10 hover:bg-white/20 transition-all active:scale-95"
              >
                {user ? (
                  <div className="relative">
                    <img 
                      src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.user_metadata?.full_name || user.email)}&background=0D8ABC&color=fff`} 
                      alt="User" 
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full border border-blue-400 object-cover"
                    />
                    {/* Verification Badge for Admin */}
                    {user.email === 'emmanuelhienwo@gmail.com' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-[#001529]" />
                    )}
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white">
                    <User size={18} />
                  </div>
                )}
                <ChevronDown size={14} className={`text-white/50 transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showProfileDropdown && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50"
                  >
                    {user ? (
                      <div className="p-4">
                        <div className="flex items-center gap-3 mb-4 p-2 bg-slate-50 rounded-xl">
                          <img 
                            src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.user_metadata?.full_name || user.email)}`} 
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-full border border-slate-200 object-cover" 
                            alt="User avatar"
                          />
                          <div className="overflow-hidden">
                            <p className="text-[#002147] font-black text-xs truncate">
                              {user.user_metadata?.full_name || user.user_metadata?.name || "Active User"}
                            </p>
                            <p className="text-slate-400 text-[10px] truncate">{user.email}</p>
                          </div>
                        </div>

                        {/* Admin Badge */}
                        {user.email === 'emmanuelhienwo@gmail.com' && (
                          <div className="mb-4 px-2 py-1 bg-blue-50 rounded-lg border border-blue-100">
                            <p className="text-[9px] font-black text-blue-600 uppercase tracking-tighter">System Administrator</p>
                          </div>
                        )}

                        <button 
                          onClick={async () => {
                            await supabase.auth.signOut();
                            router.push("/");
                            router.refresh();
                          }}
                          className="w-full flex items-center justify-center gap-2 py-2.5 text-red-500 font-bold text-[10px] uppercase tracking-widest hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                        >
                          <LogOut size={14} /> Sign Out
                        </button>
                      </div>
                    ) : (
                      /* GUEST VIEW */
                      <div className="p-3 space-y-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-1">Account Access</p>
                        <Link 
                          href="/login" 
                          className="flex items-center gap-3 px-4 py-3 text-[#002147] font-bold text-xs hover:bg-slate-50 rounded-xl transition-colors"
                        >
                          <LogIn size={16} className="text-blue-600" /> Log In
                        </Link>
                        <Link 
                          href="/signup" 
                          className="flex items-center gap-3 px-4 py-3 bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 rounded-xl transition-all"
                        >
                          <UserPlus size={16} /> Sign Up Free
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* MENU BUTTON (Always visible) */}
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

      {/* TOAST POPUP NOTIFICATION (Triggered on new message) */}
      <AnimatePresence>
        {toastAlert && user && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-80 bg-white rounded-2xl shadow-[0_20px_50px_-10px_rgba(0,33,71,0.2)] border border-slate-100 p-4 z-[200] cursor-pointer group"
            onClick={() => {
              setToastAlert(null);
              router.push('/notifications');
            }}
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setToastAlert(null); }}
              className="absolute top-2 right-2 p-1 text-slate-300 hover:text-slate-500 transition-colors"
            >
              <X size={14} />
            </button>
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                <MessageSquare size={18} className="text-blue-600" />
              </div>
              <div>
                <h4 className="text-[11px] font-black text-[#002147] uppercase tracking-wider mb-1">New Message Received</h4>
                <p className="text-xs text-slate-600 font-medium mb-1">From: <span className="font-bold">{toastAlert.client_name}</span></p>
                <p className="text-[11px] text-slate-400 line-clamp-1 italic">"{toastAlert.message}"</p>
              </div>
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
            <div className="w-14 h-14 bg-[#002147] rounded-xl flex items-center justify-center text-white font-black text-xl mb-6">NGI</div>
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
  
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

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
                <div className="w-12 h-12 rounded-xl bg-white text-[#002147] flex items-center justify-center font-black text-xl">NGI</div>
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
                icon={<Info size={20} />} label="About NGI"
                expanded={expandedSection === "about"}
                onToggle={() => setExpandedSection(expandedSection === "about" ? null : "about")}
              >
                {NAVIGATION_DATA.about.items.map((item, i) => (
                  <SidebarSubLink key={i} href={item.href} label={item.title} onClick={onClose} />
                ))}
              </SidebarSection>

              <SidebarLink href="/team" icon={<Users size={20} />} label="Our Team" onClick={onClose} />
              <SidebarLink href="/comments" icon={<MessageSquare size={20} />} label="Comments" onClick={onClose} />
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