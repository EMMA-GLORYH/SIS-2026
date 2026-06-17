"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Loader2, Trash2, RefreshCcw, Eye, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import ConfirmDialog from "@/app/components/ui/ConfirmDialog";
import EmptyState from "./EmptyState";

interface CommentItem {
  id: string;
  name: string;
  email: string;
  message: string;
  rating: number | null;
  created_at: string;
  is_reviewed: boolean;
  is_visible: boolean;
}

interface CommentsManagerProps {
  showToast: (message: string, type: "success" | "error") => void;
  onRefreshStats: () => void;
}

export default function CommentsManager({ showToast, onRefreshStats }: CommentsManagerProps) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "reviewed">("all");
  const [deleteTarget, setDeleteTarget] = useState<CommentItem | null>(null);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    let query = supabase.from("comments").select("*").order("created_at", { ascending: false });
    if (filter === "pending") query = query.eq("is_reviewed", false);
    if (filter === "reviewed") query = query.eq("is_reviewed", true);
    const { data, error } = await query;
    if (error) showToast("Failed to load comments", "error");
    else setComments(data || []);
    setLoading(false);
  }, [filter, showToast]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const markReviewed = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from("comments")
      .update({ is_reviewed: !current })
      .eq("id", id);
    if (error) showToast("Failed to update", "error");
    else {
      fetchComments();
      onRefreshStats();
      showToast(current ? "Marked as pending" : "Marked as reviewed", "success");
    }
  };

  const toggleVisible = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from("comments")
      .update({ is_visible: !current })
      .eq("id", id);
    if (error) showToast("Failed to update visibility", "error");
    else {
      fetchComments();
      showToast(current ? "Comment hidden" : "Comment visible", "success");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from("comments").delete().eq("id", deleteTarget.id);
    if (error) showToast("Failed to delete", "error");
    else {
      showToast("Comment deleted", "success");
      fetchComments();
      onRefreshStats();
    }
    setDeleteTarget(null);
  };

  const filters: { key: typeof filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "reviewed", label: "Reviewed" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete comment?"
        message={
          deleteTarget
            ? `Permanently delete the comment from "${deleteTarget.name}"? This cannot be undone.`
            : ""
        }
        confirmLabel="Delete comment"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-[#FAF9F6] font-black text-lg uppercase tracking-tight">
          Moderate Client Feedback
        </h2>
        <p className="text-[#FAF9F6]/30 text-xs font-bold mt-1">
          Review, moderate, and manage comments. Client content cannot be edited.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                filter === f.key
                  ? "bg-[#FAF9F6] text-[#111]"
                  : "bg-[#111] text-[#FAF9F6]/30 hover:text-[#FAF9F6]/60 border border-[#222]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-[#111] rounded-xl border border-[#222]">
            <p className="text-[9px] font-black text-[#FAF9F6]/30 uppercase tracking-wider">
              {comments.length} comment{comments.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={fetchComments}
            disabled={loading}
            className="w-9 h-9 rounded-xl bg-[#111] border border-[#222] flex items-center justify-center text-[#FAF9F6]/30 hover:text-[#FAF9F6] transition-all disabled:opacity-50"
          >
            <RefreshCcw size={14} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Comments List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 size={24} className="text-[#FAF9F6]/20 animate-spin" />
        </div>
      ) : comments.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No Comments"
          desc="Comments will appear here when users leave feedback."
        />
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-[#111] rounded-2xl border border-[#222] p-5 hover:border-[#FAF9F6]/10 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF9F6]/10 flex items-center justify-center text-[#FAF9F6]/40 text-xs font-black flex-shrink-0">
                      {comment.name?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                    <div>
                      <p className="text-[#FAF9F6] text-xs font-bold">{comment.name}</p>
                      {comment.email && (
                        <p className="text-[#FAF9F6]/20 text-[10px]">{comment.email}</p>
                      )}
                    </div>

                    <span
                      className={`ml-auto px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase border ${
                        comment.is_reviewed
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                      }`}
                    >
                      {comment.is_reviewed ? "Reviewed" : "Pending"}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase border ${
                        comment.is_visible
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          : "bg-[#FAF9F6]/5 text-[#FAF9F6]/20 border-[#FAF9F6]/10"
                      }`}
                    >
                      {comment.is_visible ? "Visible" : "Hidden"}
                    </span>
                  </div>

                  <p className="text-[#FAF9F6]/50 text-sm leading-relaxed whitespace-pre-wrap">
                    {comment.message}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-3 text-[#FAF9F6]/20 text-[10px]">
                    <span>
                      {new Date(comment.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {comment.rating != null && <span>Rating: {comment.rating}/5</span>}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap lg:flex-col gap-2 flex-shrink-0">
                  <button
                    onClick={() => markReviewed(comment.id, comment.is_reviewed)}
                    className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                      comment.is_reviewed
                        ? "bg-[#FAF9F6]/5 text-[#FAF9F6]/40 hover:text-[#FAF9F6] border border-[#222]"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {comment.is_reviewed ? "Unreview" : "Mark Reviewed"}
                  </button>
                  <button
                    onClick={() => toggleVisible(comment.id, comment.is_visible)}
                    className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border ${
                      comment.is_visible
                        ? "bg-[#FAF9F6]/10 text-[#FAF9F6]/60 border-[#FAF9F6]/10 hover:bg-[#FAF9F6]/20"
                        : "bg-[#FAF9F6]/5 text-[#FAF9F6]/30 border-[#222] hover:text-[#FAF9F6]/50"
                    }`}
                  >
                    {comment.is_visible ? "Hide" : "Show"}
                  </button>
                  <button
                    onClick={() => setDeleteTarget(comment)}
                    className="px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider bg-red-500/5 text-red-400/60 border border-red-500/10 hover:bg-red-500/10 hover:text-red-400 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}