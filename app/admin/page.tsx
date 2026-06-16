"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Newspaper, 
  MessageSquare, 
  ChevronLeft, 
  ChevronRight, 
  User, 
  Menu, 
  X, 
  LogOut, 
  ShieldAlert,
  Info
} from "lucide-react";
import AdminHero from "@/app/components/admin/AdminHero";
import AdminStats from "@/app/components/admin/AdminStats";
import AdminCards from "@/app/components/admin/AdminCards";
import AdminNewsModal from "../components/admin/AdminNewsModal";
import AdminCommentsModal from "../components/admin/AdminCommentsModal";
import { supabase } from "@/lib/supabase";
import { isSupportUser } from "@/lib/support";

interface AdminInfo {
  name: string;
  email: string;
  avatarUrl?: string;
}

type AdminSection = "overview" | "news" | "comments";

export default function AdminIndexPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminInfo | null>(null);
  const [counts, setCounts] = useState({ news: 0, comments: 0, pendingComments: 0 });
  const [loading, setLoading] = useState(true);
  
  // Sidebar State Management (Desktop & Mobile)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<AdminSection>("overview");

  // Determine if drawer is open or expanded visually
  const isDrawerExpanded = !isSidebarCollapsed || isSidebarHovered;

  useEffect(() => {
    const init = async () => {
      const result = await supabase.auth.getSession();
      const session = result.data.session;
      const email = session?.user?.email ?? null;
      if (!session?.user || !email || !isSupportUser(email)) {
        router.replace("/");
        return;
      }

      setAdmin({
        name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || "Team Member",
        email,
        avatarUrl: session.user.user_metadata?.avatar_url ?? undefined,
      });

      try {
        const [newsCount, commentsCount, pendingCommentsCount] = await Promise.all([
          supabase.from("news").select("id", { count: "exact", head: true }).then((res) => res.count ?? 0),
          supabase.from("comments").select("id", { count: "exact", head: true }).then((res) => res.count ?? 0),
          supabase.from("comments").select("id", { count: "exact", head: true }).eq("is_reviewed", false).then((res) => res.count ?? 0),
        ]);
        setCounts({ news: newsCount, comments: commentsCount, pendingComments: pendingCommentsCount });
      } catch (error) {
        console.error("Error loading admin stats:", error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  const sideNavItems: Array<{
    id: AdminSection;
    label: string;
    icon: typeof LayoutDashboard;
    badge?: number;
  }> = [
    { id: "overview", label: "Dashboard Home", icon: LayoutDashboard },
    { id: "news", label: "Announcements & News", icon: Newspaper },
    { id: "comments", label: "Customer Reviews", icon: MessageSquare, badge: counts.pendingComments },
  ];

  const handleSectionChange = (section: AdminSection) => {
    setActiveSection(section);
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex">
      
      {/* 1. DESKTOP/TABLET SIDEBAR DRAWER (Supabase Hover-Collapse Architecture) */}
      <motion.aside 
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
        animate={{ width: isDrawerExpanded ? "280px" : "76px" }}
        transition={{ type: "spring", damping: 26, stiffness: 240 }}
        className="hidden flex-col fixed top-0 left-0 h-full bg-slate-900 text-slate-200 border-r border-slate-800 z-40 overflow-hidden shadow-xl"
      >
        {/* Sidebar Header Brand Area */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-9 w-9 min-w-[36px] rounded-xl bg-blue-600 flex items-center justify-center font-black text-white shadow-md shadow-blue-600/20">
              A
            </div>
            {isDrawerExpanded && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="flex flex-col select-none"
              >
                <span className="text-xs font-black tracking-wider uppercase text-white leading-none">Management</span>
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">Control Panel</span>
              </motion.div>
            )}
          </div>

          {/* Explicit Manual Collapse Pin Toggle Button */}
          {isDrawerExpanded && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsSidebarCollapsed(!isSidebarCollapsed);
              }} 
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title={isSidebarCollapsed ? "Pin Sidebar Open" : "Collapse Sidebar"}
            >
              <ChevronLeft size={16} />
            </button>
          )}
        </div>

        {/* Navigation Item List */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {sideNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`w-full flex items-center justify-between rounded-xl p-3 text-xs font-bold uppercase tracking-wider transition-all relative group ${
                  isActive 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/10" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon size={18} className={`shrink-0 ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`} />
                  {isDrawerExpanded && (
                    <motion.span 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="truncate"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </div>

                {/* Badge Monitoring Alert Counters */}
                {item.badge !== undefined && item.badge > 0 && (
                  <>
                    {isDrawerExpanded ? (
                      <span className={`h-5 min-w-[20px] px-1.5 flex items-center justify-center rounded-full text-[10px] font-black ${
                        isActive ? "bg-white text-blue-600" : "bg-amber-500 text-slate-950"
                      }`}>
                        {item.badge}
                      </span>
                    ) : (
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500" />
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Zone containing Account Meta Data */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40 shrink-0">
          <div className="flex items-center justify-between gap-2 overflow-hidden">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 min-w-[36px] rounded-xl bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center shadow-inner">
                {admin?.avatarUrl ? (
                  <img src={admin.avatarUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <User size={16} className="text-slate-400" />
                )}
              </div>
              {isDrawerExpanded && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="truncate min-w-0">
                  <p className="text-xs font-bold text-slate-200 truncate leading-tight">{admin?.name || "Admin User"}</p>
                  <p className="text-[10px] font-medium text-slate-500 truncate mt-0.5">{admin?.email}</p>
                </motion.div>
              )}
            </div>
            
            {isDrawerExpanded && (
              <button 
                onClick={handleSignOut}
                className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition shrink-0"
                title="Sign Out"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Unpinned Float Toggle Handle on Left Edge boundary */}
        {isSidebarCollapsed && !isSidebarHovered && (
          <div className="absolute bottom-6 right-0 left-0 flex justify-center pointer-events-none">
            <div className="p-1 rounded-full bg-slate-800 text-slate-500 border border-slate-700">
              <ChevronRight size={12} />
            </div>
          </div>
        )}
      </motion.aside>

      {/* 2. TABLET / MOBILE NAVIGATION TOP BAR Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 flex items-center justify-between shadow-sm z-50">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-xs">
            A
          </div>
          <div>
            <p className="text-xs font-black text-slate-900 uppercase tracking-wider">Admin Portal</p>
            <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">NGI Management</p>
          </div>
        </div>
        <button
          onClick={() => setIsMobileSidebarOpen((current) => !current)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 shadow-sm hover:bg-slate-100 transition"
          aria-label={isMobileSidebarOpen ? "Close Control Drawer" : "Open Control Drawer"}
        >
          {isMobileSidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* 3. MOBILE DROP SIDEBAR DRAWER MODAL */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            {/* Dark scrim underlay wrapper */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 md:hidden"
            />
            {/* Slide down operational panel */}
            <motion.aside
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 250 }}
              className="md:hidden fixed top-16 left-0 right-0 z-40 border-b border-slate-200 bg-white shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto rounded-b-[2rem]"
            >
              <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Navigation Deck</span>
                <span className="text-[10px] text-slate-400 font-semibold bg-slate-200/60 px-2 py-0.5 rounded-full">Tap to shift view</span>
              </div>
              <div className="p-4 space-y-1.5">
                {sideNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSectionChange(item.id)}
                      className={`w-full flex items-center justify-between rounded-xl p-3.5 text-xs font-bold uppercase tracking-wider transition ${
                        isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-600/10" : "text-slate-600 bg-slate-50 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} className={isActive ? "text-white" : "text-slate-400"} />
                        <span>{item.label}</span>
                      </div>
                      {typeof item.badge === "number" && item.badge > 0 && (
                        <span className={`h-5 px-2 rounded-full flex items-center justify-center text-[10px] font-black ${
                          isActive ? "bg-white text-blue-600" : "bg-amber-500 text-white"
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Mobile Account Details Context */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between rounded-b-[2rem]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-8 w-8 rounded-lg bg-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                    <User size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-slate-900 leading-none">{admin?.name}</p>
                    <p className="truncate text-[10px] text-slate-500 mt-0.5">{admin?.email}</p>
                  </div>
                </div>
                <button 
                  onClick={handleSignOut} 
                  className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 text-[10px] font-black uppercase tracking-wider bg-red-50 hover:bg-red-100/50 transition"
                >
                  Sign Out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 4. MAIN CORE CONTENT DESK LAYOUT */}
      <div 
        className="flex-1 flex flex-col min-w-0 transition-all duration-300"
        style={{ paddingLeft: "0px" }}
      >
        {/* Safe padding spacing container to clear top navigation on small viewpoints */}
        <main className="relative flex-1 bg-slate-50 pt-24 pb-12 md:pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto space-y-8">
          
          {activeSection === "overview" && (
            <div className="flex flex-col gap-8">
              {/* Profile greeting block */}
              <AdminHero name={admin?.name} loading={loading} />
              
              {/* Key system metrics display counter panel */}
              <AdminStats counts={counts} loading={loading} />
              
              {/* Direct feature router action matrices */}
              <AdminCards 
                onNewsClick={() => handleSectionChange("news")} 
                onCommentsClick={() => handleSectionChange("comments")} 
              />
              
              {/* Security configuration policy details information card */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex gap-4 items-start">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600 shrink-0 border border-blue-100">
                  <Info size={18} />
                </div>
                <div>
                  <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">Access Security Policy</h2>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    Only specialized email structures configured securely via system environment variables can utilize this gateway dashboard. If an unvetted account session attempts loading, automated row isolation loops will execute and instantly dispatch access denial procedures.
                  </p>
                </div>
              </section>
            </div>
          )}

          {activeSection === "news" && (
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <AdminNewsModal onClose={() => handleSectionChange("overview")} />
            </div>
          )}

          {activeSection === "comments" && (
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <AdminCommentsModal onClose={() => handleSectionChange("overview")} />
            </div>
          )}
        </main>
      </div>

    </div>
  );
}