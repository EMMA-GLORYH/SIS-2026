"use client";

import { FormEvent, useEffect, useState } from "react";
import { PlusCircle, RefreshCcw, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Button from "@/app/components/ui/Button";
import ConfirmDialog from "@/app/components/ui/ConfirmDialog";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  author?: string;
  created_at: string;
}

interface AdminNewsModalProps {
  onClose?: () => void;
}

export default function AdminNewsModal({ onClose }: AdminNewsModalProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<NewsItem | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      setNews([]);
    } else {
      setNews(data ?? []);
    }

    setLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const email = session?.user?.email ?? null;
      setCurrentEmail(email);
      fetchNews();
    };

    init();
  }, []);

  const saveNews = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Please enter a title and content for the news item.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const payload = {
      title: title.trim(),
      content: content.trim(),
      author: currentEmail || "Admin",
    };

    let result;
    if (editingId) {
      result = await supabase.from("news").update(payload).eq("id", editingId);
    } else {
      result = await supabase.from("news").insert([payload]);
    }

    if (result.error) {
      setError(result.error.message);
    } else {
      setTitle("");
      setContent("");
      setEditingId(null);
      fetchNews();
    }

    setSubmitting(false);
  };

  const startEditing = (item: NewsItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setContent(item.content);
    setError(null);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
    setError(null);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from("news").delete().eq("id", deleteTarget.id);
    if (error) {
      setError(error.message);
    } else {
      setDeleteTarget(null);
      fetchNews();
      if (editingId === deleteTarget.id) cancelEditing();
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete news item?"
        message={deleteTarget ? `This will permanently remove the news item titled "${deleteTarget.title}". Are you sure you want to continue?` : ""}
        confirmLabel="Delete news"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />

      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold">Admin News Management</p>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-3">Create, edit and publish announcements</h1>
            <p className="mt-3 max-w-2xl text-slate-600 leading-relaxed">
              Save announcements for the public news feed. Editing is available here, while comments are preserved as submitted by clients.
            </p>
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

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-black text-slate-900">{editingId ? "Edit Announcement" : "Publish New Announcement"}</h2>
              <p className="text-sm text-slate-500 mt-2">Use the form below to create or update news items quickly.</p>
            </div>
            {editingId && (
              <button
                onClick={cancelEditing}
                className="px-4 py-2 rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold hover:bg-slate-100 transition"
              >
                Cancel edit
              </button>
            )}
          </div>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={saveNews} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">Title</label>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="News headline"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">Content</label>
              <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                className="w-full min-h-[220px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Write the update or announcement here."
              />
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
              >
                <RefreshCcw size={16} /> {submitting ? "Saving..." : editingId ? "Save changes" : "Publish News"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold hover:bg-slate-100 transition"
                >
                  Discard changes
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400 font-bold">Published items</p>
              <h2 className="text-xl font-black text-slate-900">Current News</h2>
            </div>
            <button
              onClick={fetchNews}
              disabled={loading}
              className="p-2 rounded-lg hover:bg-slate-100 transition disabled:opacity-50"
            >
              <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
            </button>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-slate-400 animate-pulse">Loading news items...</div>
          ) : news.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-slate-500">No news items have been published yet.</div>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {news.map((item) => (
                <article key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">{item.content}</p>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">By {item.author || "Admin"} • {new Date(item.created_at).toLocaleDateString()}</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => startEditing(item)}
                        className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteTarget(item)}
                        className="px-3 py-1.5 text-xs rounded-lg border border-red-200 bg-red-50 text-red-700 font-semibold hover:bg-red-100 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
