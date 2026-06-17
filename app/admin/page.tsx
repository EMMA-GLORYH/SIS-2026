"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, MessageSquare, Newspaper,
  Settings, ChevronLeft, ChevronRight, LogOut,
  Loader2, Menu, Home, X
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { isSupportUser } from "@/lib/support";

/* ── Admin Section Components ── */
/* ── Admin Section Components ── */
import AdminToast from "@/app/components/admin/AdminToast";
import OverviewSection from "@/app/components/admin/OverviewSection";
import ProjectsManager from "@/app/components/admin/ProjectsManager";
import CommentsManager from "@/app/components/admin/CommentsManager";
import NewsManager from "@/app/components/admin/NewsManager";
import SettingsSection from "@/app/components/admin/SettingsSection";

/* ═══════════════════════════════════════════ */
/*  TYPES & CONFIG                             */
/* ═══════════════════════════════════════════ */
type AdminView = "overview" | "projects" | "comments" | "news" | "settings";
type CountKey = "pendingComments";

type NavItem = {
  id: AdminView;
  label: string;
  icon: React.ElementType;
  description: string;
  countKey?: CountKey;
};

const NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, description: "Dashboard summary & quick actions" },
  { id: "projects", label: "Projects", icon: FolderOpen, description: "Manage featured project showcase" },
  { id: "comments", label: "Comments", icon: MessageSquare, description: "Moderate client feedback", countKey: "pendingComments" },
  { id: "news", label: "News & Updates", icon: Newspaper, description: "Publish announcements" },
  { id: "settings", label: "Settings", icon: Settings, description: "Account & system info" },
];

/* ═══════════════════════════════════════════ */
/*  MAIN ADMIN PAGE                            */
/* ═══════════════════════════════════════════ */
export default function AdminDashboard() {
  const router = useRouter();

  /* Auth */
  const [user, setUser] = useState<any>(null);
  const [authorized, setAuthorized] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  /* Sidebar */
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeView, setActiveView] = useState<AdminView>("overview");

  /* Toast */
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const showToast = useCallback((message: string, type: "success" | "error") => {
    setToast({ message, type });
  }, []);

  /* Counts */
  const [counts, setCounts] = useState<Record<CountKey, number>>({ pendingComments: 0 });
  const prevCountsRef = useRef<Record<CountKey, number>>({ pendingComments: 0 });

  /* Stats */
  const [stats, setStats] = useState({
    totalProjects: 0,
    featuredProjects: 0,
    totalComments: 0,
    pendingComments: 0,
    totalNews: 0,
  });

  const activeNav = NAV_ITEMS.find((n) => n.id === activeView)!;

  /* ── Auth Check ── */
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (!currentUser || !isSupportUser(currentUser.email)) {
        router.replace("/");
        return;
      }
      setAuthorized(true);
      setAuthLoading(false);
    };
    checkAuth();
  }, [router]);

  /* ── Fetch Stats ── */
  const fetchStats = useCallback(async () => {
    const [projectsRes, featuredRes, commentsRes, pendingRes, newsRes] = await Promise.all([
      supabase.from("projects").select("id", { count: "exact", head: true }),
      supabase.from("projects").select("id", { count: "exact", head: true }).eq("is_featured", true),
      supabase.from("comments").select("id", { count: "exact", head: true }),
      supabase.from("comments").select("id", { count: "exact", head: true }).eq("is_reviewed", false),
      supabase.from("news").select("id", { count: "exact", head: true }),
    ]);
    setStats({
      totalProjects: projectsRes.count ?? 0,
      featuredProjects: featuredRes.count ?? 0,
      totalComments: commentsRes.count ?? 0,
      pendingComments: pendingRes.count ?? 0,
      totalNews: newsRes.count ?? 0,
    });
  }, []);

  useEffect(() => {
    if (authorized) fetchStats();
  }, [authorized, activeView, fetchStats]);

  /* ── Real-time pending comments ── */
  useEffect(() => {
    if (!authorized) return;

    const fetchPendingCount = async () => {
      const { count } = await supabase
        .from("comments")
        .select("id", { count: "exact", head: true })
        .eq("is_reviewed", false);
      const newCount = count || 0;
      const prev = prevCountsRef.current.pendingComments;
      if (newCount > prev) {
        setCounts((p) => ({ ...p, pendingComments: newCount }));
      }
      prevCountsRef.current.pendingComments = newCount;
    };

    fetchPendingCount();

    const channel = supabase
      .channel("admin_comments_count")
      .on("postgres_changes", { event: "*", schema: "public", table: "comments" }, fetchPendingCount)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [authorized]);

  /* ── Handle Nav ── */
  const handleNav = (id: AdminView | string) => {
    const navItem = NAV_ITEMS.find((n) => n.id === id);
    if (navItem?.countKey) {
      setCounts((prev) => ({ ...prev, [navItem.countKey!]: 0 }));
      prevCountsRef.current[navItem.countKey!] = 0;
    }
    setActiveView(id as AdminView);
    setMobileOpen(false);
  };

  /* ── Logout ── */
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  /* ── Auth Guard ── */
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={32} className="text-[#FAF9F6]/20 animate-spin mx-auto mb-4" />
          <p className="text-[#FAF9F6]/20 text-xs font-bold uppercase tracking-widest">
            Verifying Access
          </p>
        </div>
      </div>
    );
  }
  if (!authorized) return null;

  /* ═══════════════════════════════════════════ */
  /*  RENDER                                     */
  /* ═══════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <AdminToast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      {/* ═══ MOBILE OVERLAY ═══ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* ═══ SIDEBAR ═══ */}
      <aside
        className={`
          fixed top-0 left-0 z-[160] h-full flex flex-col
          bg-[#111111] border-r border-[#1a1a1a]
          transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? "w-[72px]" : "w-[268px]"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Sidebar Header */}
        <div
          className={`flex items-center h-16 shrink-0 px-4 border-b border-[#1a1a1a] ${
            sidebarCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          <AnimatePresence mode="wait">
            {sidebarCollapsed ? (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-10 h-10 rounded-xl bg-[#FAF9F6]/10 flex items-center justify-center text-[#FAF9F6] font-black text-sm border border-[#FAF9F6]/10"
              >
                N
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FAF9F6]/10 flex items-center justify-center text-[#FAF9F6] font-black text-sm border border-[#FAF9F6]/10">
                  NGI
                </div>
                <div>
                  <p className="text-[#FAF9F6] font-black text-sm uppercase tracking-tight leading-none">
                    Admin
                  </p>
                  <p className="text-[#FAF9F6]/20 text-[9px] font-bold uppercase tracking-[0.15em] mt-0.5">
                    Management Suite
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex w-7 h-7 items-center justify-center text-[#FAF9F6]/30 hover:text-[#FAF9F6] transition-colors"
            >
              {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden w-8 h-8 rounded-lg bg-[#FAF9F6]/5 hover:bg-[#FAF9F6]/10 flex items-center justify-center text-[#FAF9F6]/40"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Accent line */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#FAF9F6]/10 to-transparent shrink-0" />

        {/* Navigation */}
        <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[8px] font-black text-[#FAF9F6]/15 uppercase tracking-[0.25em] px-3 pt-2 pb-3"
              >
                Management
              </motion.p>
            )}
          </AnimatePresence>

          {NAV_ITEMS.map(({ id, label, icon: Icon, description, countKey }) => {
            const isActive = activeView === id;
            const currentCount = countKey ? counts[countKey] : 0;

            return (
              <button
                key={id}
                onClick={() => handleNav(id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-3 text-left
                  transition-all duration-200 group relative rounded-xl
                  ${
                    isActive
                      ? "bg-[#FAF9F6] text-[#111111]"
                      : "text-[#FAF9F6]/40 hover:text-[#FAF9F6]/70 hover:bg-[#FAF9F6]/5"
                  }
                `}
                title={sidebarCollapsed ? label : undefined}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isActive ? "bg-[#111111]/10" : ""
                  }`}
                >
                  <Icon size={18} />
                </div>

                <AnimatePresence>
                  {!sidebarCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="min-w-0 flex items-center justify-between flex-grow overflow-hidden"
                    >
                      <div className="min-w-0">
                        <p className="text-[11px] uppercase tracking-[0.15em] font-bold leading-none whitespace-nowrap">
                          {label}
                        </p>
                        {!isActive && (
                          <p className="text-[9px] mt-1 truncate text-[#FAF9F6]/20 group-hover:text-[#FAF9F6]/30">
                            {description}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {currentCount > 0 && (
                  <span
                    className={`
                    ${sidebarCollapsed ? "absolute top-1 right-1" : "ml-auto"}
                    flex h-5 min-w-5 items-center justify-center rounded-full
                    bg-red-500 text-[9px] font-black text-white leading-none px-1.5
                  `}
                  >
                    {currentCount > 9 ? "9+" : currentCount}
                  </span>
                )}

                {sidebarCollapsed && (
                  <div className="absolute left-full ml-3 px-3 py-2 text-[10px] uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50 bg-[#111] border border-[#222] text-[#FAF9F6] rounded-xl shadow-lg">
                    {label}
                    {currentCount > 0 && ` (${currentCount})`}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="shrink-0 p-3 border-t border-[#1a1a1a] space-y-1">
          <Link
            href="/"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#FAF9F6]/30 hover:text-[#FAF9F6]/60 hover:bg-[#FAF9F6]/5 transition-all"
          >
            <Home size={18} />
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs font-bold uppercase tracking-wider"
                >
                  Back to Site
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400/40 hover:text-red-400 hover:bg-red-500/5 transition-all"
          >
            <LogOut size={18} />
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs font-bold uppercase tracking-wider"
                >
                  Sign Out
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {!sidebarCollapsed && user && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 p-3 bg-[#0a0a0a] rounded-xl border border-[#1a1a1a]"
            >
              <div className="flex items-center gap-2">
                <img
                  src={
                    user.user_metadata?.avatar_url ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.email
                    )}&background=111111&color=FAF9F6`
                  }
                  className="w-7 h-7 rounded-lg object-cover border border-[#222]"
                  alt=""
                  referrerPolicy="no-referrer"
                />
                <div className="overflow-hidden">
                  <p className="text-[#FAF9F6]/60 text-[10px] font-bold truncate">
                    {user.user_metadata?.full_name || "Administrator"}
                  </p>
                  <p className="text-[#FAF9F6]/20 text-[9px] truncate">{user.email}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </aside>

      {/* ═══ MAIN CONTENT ═══ */}
      <main
        className={`flex-1 min-w-0 transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-[72px]" : "lg:ml-[268px]"
        }`}
      >
        {/* Top Bar */}
        <div className="sticky top-0 z-[50] bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#1a1a1a]">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden w-10 h-10 rounded-xl bg-[#111] border border-[#222] flex items-center justify-center text-[#FAF9F6]/40 hover:text-[#FAF9F6] transition-all"
              >
                <Menu size={18} />
              </button>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
                <span className="text-[#FAF9F6]/20">Admin</span>
                <ChevronRight size={10} className="text-[#FAF9F6]/10" />
                <span className="text-[#FAF9F6]">{activeNav.label}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p className="hidden sm:block text-[9px] uppercase tracking-widest text-[#FAF9F6]/15">
                {activeNav.description}
              </p>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#111] rounded-xl border border-[#222]">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-[9px] font-black text-[#FAF9F6]/20 uppercase tracking-widest hidden sm:inline">
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area — Component Switching */}
        <div className="p-6 md:p-10">
          <AnimatePresence mode="wait">
            {activeView === "overview" && (
              <OverviewSection
                key="overview"
                stats={stats}
                onNavigate={handleNav}
              />
            )}
            {activeView === "projects" && (
              <ProjectsManager
                key="projects"
                showToast={showToast}
                onRefreshStats={fetchStats}
              />
            )}
            {activeView === "comments" && (
              <CommentsManager
                key="comments"
                showToast={showToast}
                onRefreshStats={fetchStats}
              />
            )}
            {activeView === "news" && (
              <NewsManager
                key="news"
                showToast={showToast}
                onRefreshStats={fetchStats}
              />
            )}
            {activeView === "settings" && (
              <SettingsSection key="settings" user={user} />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}