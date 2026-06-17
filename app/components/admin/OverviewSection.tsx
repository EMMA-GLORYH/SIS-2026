"use client";

import { motion } from "framer-motion";
import {
  FolderOpen, MessageSquare, Newspaper, Plus,
  Shield, Star, Clock, ArrowRight
} from "lucide-react";
import AdminCanvas from "./AdminCanvas";

interface Stats {
  totalProjects: number;
  featuredProjects: number;
  totalComments: number;
  pendingComments: number;
  totalNews: number;
}

interface OverviewSectionProps {
  stats: Stats;
  onNavigate: (id: string) => void;
}

export default function OverviewSection({ stats, onNavigate }: OverviewSectionProps) {
  const statCards = [
    { label: "Total Projects", value: stats.totalProjects, icon: FolderOpen, section: "projects", color: "from-blue-500/10 to-blue-500/5 border-blue-500/10" },
    { label: "Featured", value: stats.featuredProjects, icon: Star, section: "projects", color: "from-yellow-500/10 to-yellow-500/5 border-yellow-500/10" },
    { label: "Comments", value: stats.totalComments, icon: MessageSquare, section: "comments", color: "from-green-500/10 to-green-500/5 border-green-500/10" },
    { label: "Pending Review", value: stats.pendingComments, icon: Clock, section: "comments", color: "from-red-500/10 to-red-500/5 border-red-500/10" },
    { label: "News Articles", value: stats.totalNews, icon: Newspaper, section: "news", color: "from-purple-500/10 to-purple-500/5 border-purple-500/10" },
  ];

  const quickActions = [
    { label: "Add Project", icon: Plus, section: "projects" },
    { label: "Review Comments", icon: MessageSquare, section: "comments" },
    { label: "Post News", icon: Newspaper, section: "news" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Welcome Banner */}
      <div className="bg-[#111] rounded-3xl border border-[#1a1a1a] p-8 mb-8 relative overflow-hidden">
        <AdminCanvas />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF9F6]/10 flex items-center justify-center text-[#FAF9F6]">
              <Shield size={24} />
            </div>
            <div>
              <h3 className="text-[#FAF9F6] font-black text-xl uppercase tracking-tight">
                Welcome Back
              </h3>
              <p className="text-[#FAF9F6]/30 text-xs font-medium">
                Here&apos;s your system overview
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <p className="text-[#FAF9F6]/20 text-[9px] font-bold uppercase tracking-[0.2em]">
              All systems operational
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {statCards.map((card, i) => (
          <motion.button
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onNavigate(card.section)}
            className={`p-5 rounded-2xl bg-gradient-to-b ${card.color} border text-left hover:scale-[1.02] transition-all active:scale-[0.98] group`}
          >
            <card.icon
              size={20}
              className="text-[#FAF9F6]/30 mb-3 group-hover:text-[#FAF9F6]/50 transition-colors"
            />
            <p className="text-[#FAF9F6] font-black text-2xl tracking-tight">
              {card.value}
            </p>
            <p className="text-[#FAF9F6]/30 text-[9px] font-bold uppercase tracking-wider mt-1">
              {card.label}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-[#111] rounded-2xl border border-[#1a1a1a] p-6">
        <p className="text-[9px] font-black text-[#FAF9F6]/20 uppercase tracking-[0.25em] mb-4">
          Quick Actions
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => onNavigate(action.section)}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-[#FAF9F6]/5 hover:bg-[#FAF9F6]/10 border border-[#222] text-[#FAF9F6]/50 hover:text-[#FAF9F6] transition-all group"
            >
              <action.icon size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">
                {action.label}
              </span>
              <ArrowRight
                size={12}
                className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
              />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}