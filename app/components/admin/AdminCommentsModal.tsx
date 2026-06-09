"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, RefreshCcw } from "lucide-react";
import ConfirmDialog from "@/app/components/ui/ConfirmDialog";

interface CommentItem {
  id: string;
  name: string;
  message: string;
  rating: number | null;
  created_at: string;
  is_reviewed?: boolean;
  is_visible?: boolean;
}

interface AdminCommentsModalProps {
  onClose?: () => void;
}

export default function AdminCommentsModal({ onClose }: AdminCommentsModalProps) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CommentItem | null>(null);

  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      setComments([]);
    } else {
      setComments(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const markReviewed = async (id: string, reviewed: boolean) => {
    const { error } = await supabase.from("comments").update({ is_reviewed: reviewed }).eq("id", id);
    if (error) return setError(error.message);
    fetchComments();
  };

  const toggleVisible = async (id: string, visible: boolean) => {
    const { error } = await supabase.from("comments").update({ is_visible: visible }).eq("id", id);
    if (error) return setError(error.message);
    fetchComments();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from("comments").delete().eq("id", deleteTarget.id);
    if (error) {
      setError(error.message);
    } else {
      setDeleteTarget(null);
      fetchComments();
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete comment?"
        message={deleteTarget ? `Are you sure you want to permanently delete the comment from ${deleteTarget.name}? This action cannot be undone.` : ""}
        confirmLabel="Delete comment"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />

      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold">Admin / Comments</p>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-3">Moderate Client Feedback</h1>
            <p className="mt-2 text-slate-600 max-w-2xl">Delete or moderate comments; client content remains untouched and cannot be edited.</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold hover:bg-slate-100 transition"
            >
              <ArrowLeft size={16} /> Back to Overview
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400 font-bold">Total comments</p>
          <p className="mt-3 text-3xl font-black text-slate-900">{comments.length}</p>
        </div>
        <button
          onClick={fetchComments}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold hover:bg-slate-100 transition disabled:opacity-50"
        >
          <RefreshCcw size={16} className={loading ? "animate-spin" : ""} /> Refresh list
        </button>
      </div>

      {error && <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

      {loading ? (
        <div className="space-y-4">
          <div className="h-6 bg-slate-200 rounded-full w-1/3 animate-pulse" />
          <div className="h-4 bg-slate-200 rounded-full w-full animate-pulse" />
        </div>
      ) : comments.length === 0 ? (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-slate-500">No comments found.</div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-black text-slate-900">{comment.name}</p>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-500">
                      {comment.is_reviewed ? "Reviewed" : "Pending review"}
                    </span>
                    {comment.is_visible ? (
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-emerald-700">Visible</span>
                    ) : (
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-amber-700">Hidden</span>
                    )}
                  </div>
                  <p className="mt-4 text-slate-600 leading-relaxed whitespace-pre-wrap">{comment.message}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-slate-500 text-sm">
                    <span>{new Date(comment.created_at).toLocaleString()}</span>
                    {comment.rating != null && <span>Rating {comment.rating}/5</span>}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 lg:flex-nowrap lg:flex-col">
                  <button
                    onClick={() => markReviewed(comment.id, !comment.is_reviewed)}
                    className={`px-4 py-2 rounded-2xl font-semibold text-sm transition ${
                      comment.is_reviewed
                        ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {comment.is_reviewed ? "Unreview" : "Mark Reviewed"}
                  </button>
                  <button
                    onClick={() => toggleVisible(comment.id, !comment.is_visible)}
                    className={`px-4 py-2 rounded-2xl font-semibold text-sm transition ${
                      comment.is_visible
                        ? "bg-slate-200 text-slate-900 hover:bg-slate-300"
                        : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {comment.is_visible ? "Hide" : "Show"}
                  </button>
                  <button
                    onClick={() => setDeleteTarget(comment)}
                    className="px-4 py-2 rounded-2xl border border-red-200 bg-red-50 text-red-700 font-semibold hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
