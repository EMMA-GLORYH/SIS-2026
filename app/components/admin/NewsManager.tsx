"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Trash2, Edit3, Save, X, Loader2, Newspaper
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import ConfirmDialog from "@/app/components/ui/ConfirmDialog";
import AdminInput from "./AdminInput";
import EmptyState from "./EmptyState";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  author?: string;
  created_at: string;
}

interface NewsManagerProps {
  showToast: (message: string, type: "success" | "error") => void;
  onRefreshStats: () => void;
}

export default function NewsManager({ showToast, onRefreshStats }: NewsManagerProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<NewsItem | null>(null);
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentEmail(session?.user?.email ?? null);
    });
  }, []);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) showToast("Failed to load news", "error");
    else setNews(data || []);
    setLoading(false);
  }, [showToast]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      showToast("Title and content required", "error");
      return;
    }
    setSaving(true);
    const payload = {
      title: title.trim(),
      content: content.trim(),
      author: currentEmail || "Admin",
    };
    const { error } = editingId
      ? await supabase.from("news").update(payload).eq("id", editingId)
      : await supabase.from("news").insert(payload);
    if (error) showToast("Failed to save", "error");
    else showToast(editingId ? "Article updated" : "Article published", "success");
    setSaving(false);
    resetForm();
    fetchNews();
    onRefreshStats();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from("news").delete().eq("id", deleteTarget.id);
    if (error) showToast("Failed to delete", "error");
    else {
      showToast("Article deleted", "success");
      fetchNews();
      onRefreshStats();
    }
    if (editingId === deleteTarget?.id) resetForm();
    setDeleteTarget(null);
  };

  const startEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setContent(item.content);
    setShowForm(true);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete news article?"
        message={
          deleteTarget
            ? `Permanently remove "${deleteTarget.title}"? This cannot be undone.`
            : ""
        }
        confirmLabel="Delete article"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-[#FAF9F6] font-black text-lg uppercase tracking-tight">
            News & Announcements
          </h2>
          <p className="text-[#FAF9F6]/30 text-xs font-bold mt-1">
            {news.length} article{news.length !== 1 ? "s" : ""} published
          </p>
        </div>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${
            showForm
              ? "bg-[#FAF9F6]/10 text-[#FAF9F6]"
              : "bg-[#FAF9F6] text-[#111]"
          }`}
        >
          {showForm ? <X size={14} /> : <Plus size={14} />}
          {showForm ? "Cancel" : "Post News"}
        </button>
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="bg-[#111] rounded-2xl border border-[#222] p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#FAF9F6] font-black text-sm uppercase tracking-wider">
                  {editingId ? "Edit Article" : "New Article"}
                </h3>
                {editingId && (
                  <button
                    onClick={resetForm}
                    className="px-4 py-2 rounded-xl bg-[#FAF9F6]/5 text-[#FAF9F6]/40 text-xs font-bold uppercase tracking-wider hover:text-[#FAF9F6] border border-[#222] transition-all"
                  >
                    Cancel edit
                  </button>
                )}
              </div>
              <div className="space-y-5">
                <AdminInput
                  label="Title *"
                  value={title}
                  onChange={setTitle}
                  placeholder="Article headline"
                />
                <div>
                  <label className="block text-[9px] font-black text-[#FAF9F6]/40 uppercase tracking-[0.2em] mb-2">
                    Content *
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write the news article content..."
                    rows={8}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#222] rounded-xl text-[#FAF9F6] text-sm placeholder:text-[#FAF9F6]/20 focus:outline-none focus:border-[#FAF9F6]/30 transition-colors resize-none"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 mt-5 pt-4 border-t border-[#222]">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 bg-[#FAF9F6] text-[#111] rounded-xl font-black text-xs uppercase tracking-wider hover:bg-white transition-all disabled:opacity-50"
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  {editingId ? "Update Article" : "Publish"}
                </button>
                <button
                  onClick={resetForm}
                  className="text-[#FAF9F6]/40 text-xs font-bold uppercase tracking-wider hover:text-[#FAF9F6]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* News List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 size={24} className="text-[#FAF9F6]/20 animate-spin" />
        </div>
      ) : news.length === 0 ? (
        <EmptyState
          icon={Newspaper}
          title="No News"
          desc="Click 'Post News' to publish your first article."
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-[#111] rounded-2xl border border-[#222] p-5 hover:border-[#FAF9F6]/10 transition-all"
            >
              <h4 className="text-[#FAF9F6] font-black text-sm mb-2">{item.title}</h4>
              <p className="text-[#FAF9F6]/40 text-xs line-clamp-4 leading-relaxed whitespace-pre-wrap">
                {item.content}
              </p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#1a1a1a]">
                <p className="text-[#FAF9F6]/15 text-[10px] font-medium">
                  By {item.author || "Admin"} ·{" "}
                  {new Date(item.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => startEdit(item)}
                    className="w-8 h-8 rounded-lg bg-[#FAF9F6]/5 hover:bg-[#FAF9F6]/10 flex items-center justify-center text-[#FAF9F6]/30 hover:text-[#FAF9F6] transition-all"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="w-8 h-8 rounded-lg bg-red-500/5 hover:bg-red-500/10 flex items-center justify-center text-red-400/50 hover:text-red-400 transition-all"
                  >
                    <Trash2 size={14} />
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