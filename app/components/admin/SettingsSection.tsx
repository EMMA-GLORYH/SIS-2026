"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";

interface SettingsSectionProps {
  user: any;
}

export default function SettingsSection({ user }: SettingsSectionProps) {
  const systemInfo = [
    { label: "Platform", value: "NGI Admin Dashboard" },
    { label: "Version", value: "1.0.0" },
    { label: "Database", value: "Supabase PostgreSQL" },
    { label: "Storage", value: "Supabase Storage" },
    { label: "Status", value: "All systems operational", isStatus: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="max-w-2xl">
        <h2 className="text-[#FAF9F6] font-black text-lg uppercase tracking-tight mb-6">
          Settings
        </h2>

        {/* Account Info */}
        <div className="bg-[#111] rounded-2xl border border-[#222] p-6 mb-6">
          <p className="text-[9px] font-black text-[#FAF9F6]/20 uppercase tracking-[0.25em] mb-4">
            Account Information
          </p>
          <div className="flex items-center gap-4 p-4 bg-[#0a0a0a] rounded-xl border border-[#1a1a1a]">
            <img
              src={
                user?.user_metadata?.avatar_url ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user?.email || "A"
                )}&background=111111&color=FAF9F6`
              }
              className="w-12 h-12 rounded-xl border border-[#222] object-cover"
              alt=""
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0">
              <p className="text-[#FAF9F6] font-black text-sm">
                {user?.user_metadata?.full_name || "Administrator"}
              </p>
              <p className="text-[#FAF9F6]/30 text-xs truncate">{user?.email}</p>
            </div>
            <div className="ml-auto px-3 py-1 bg-[#FAF9F6]/5 rounded-lg border border-[#FAF9F6]/10 flex-shrink-0">
              <div className="flex items-center gap-1.5">
                <Shield size={12} className="text-[#FAF9F6]/40" />
                <span className="text-[9px] font-black text-[#FAF9F6]/40 uppercase tracking-wider">
                  Admin
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="bg-[#111] rounded-2xl border border-[#222] p-6">
          <p className="text-[9px] font-black text-[#FAF9F6]/20 uppercase tracking-[0.25em] mb-4">
            System Information
          </p>
          <div className="space-y-3">
            {systemInfo.map((info) => (
              <div
                key={info.label}
                className="flex items-center justify-between py-2.5 border-b border-[#1a1a1a] last:border-0"
              >
                <span className="text-[#FAF9F6]/30 text-xs font-bold uppercase tracking-wider">
                  {info.label}
                </span>
                <span
                  className={`text-xs font-bold flex items-center gap-2 ${
                    info.isStatus ? "text-green-400" : "text-[#FAF9F6]/60"
                  }`}
                >
                  {info.isStatus && (
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  )}
                  {info.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}