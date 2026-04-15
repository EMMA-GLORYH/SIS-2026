"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trash2, CheckCircle, Clock, User, 
  ChevronLeft, AlertCircle, RefreshCcw, Eye, EyeOff, ShieldCheck,
  Mail, Star
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface AppComment {
  id: string;
  name: string;      // CHANGED: Matches your SQL 'name'
  email: string;     // ADDED: Matches your SQL 'email'
  message: string;
  rating: number;    // ADDED: Matches your SQL 'rating'
  created_at: string;
  is_reviewed: boolean;
  is_visible: boolean; 
}

export default function NotificationsPage() {
  const [comments, setComments] = useState<AppComment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setComments(data);
    setLoading(false);
  };

  useEffect(() => { fetchComments(); }, []);

  const toggleVisibility = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("comments")
      .update({ is_visible: !currentStatus })
      .eq("id", id);

    if (!error) {
      setComments(comments.map(c => c.id === id ? { ...c, is_visible: !currentStatus } : c));
    } else {
      alert("Error updating visibility: " + error.message);
    }
  };

  const deleteComment = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    const { error } = await supabase.from("comments").delete().eq("id", id);
    if (!error) setComments(comments.filter(c => c.id !== id));
  };

  const markAsReviewed = async (id: string) => {
    await supabase.from("comments").update({ is_reviewed: true }).eq("id", id);
    setComments(comments.map(c => c.id === id ? { ...c, is_reviewed: true } : c));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <ChevronLeft size={20} className="text-slate-500" />
            </Link>
            <h1 className="text-xl font-black text-[#002147] tracking-tight uppercase">Comment Management</h1>
          </div>
          <button onClick={fetchComments} className="flex items-center gap-2 bg-[#002147] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-900 transition-all">
            <RefreshCcw size={14} className={loading ? "animate-spin" : ""} /> Sync
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* TABLE HEADER */}
          <div className="grid grid-cols-12 gap-4 px-8 py-4 bg-slate-50 border-b border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <div className="col-span-3">Sender Details</div>
            <div className="col-span-4">Comment</div>
            <div className="col-span-1 text-center">Rating</div>
            <div className="col-span-2 text-center">Display</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          <div className="divide-y divide-slate-100">
            {loading ? (
              <div className="p-20 text-center text-slate-400 animate-pulse">Loading Database...</div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className={`grid grid-cols-12 gap-4 px-8 py-6 items-start transition-colors hover:bg-slate-50 ${!comment.is_reviewed ? 'bg-blue-50/40' : ''}`}>
                  
                  {/* SENDER INFO (NAME & EMAIL) */}
                  <div className="col-span-3">
                    <div className="flex items-center gap-2 mb-1">
                      <User size={14} className="text-blue-600" />
                      <p className="font-bold text-slate-800 text-sm">{comment.name}</p>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium lowercase">
                      <Mail size={12} /> {comment.email}
                    </div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-2 italic">
                      {new Date(comment.created_at).toLocaleString()}
                    </p>
                  </div>

                  {/* MESSAGE CONTENT */}
                  <div className="col-span-4">
                    <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap italic">
                      "{comment.message}"
                    </p>
                  </div>

                  {/* RATING */}
                  <div className="col-span-1 flex flex-col items-center justify-center">
                    <div className="flex items-center gap-1 text-amber-500">
                      <span className="text-sm font-black">{comment.rating}</span>
                      <Star size={14} fill="currentColor" />
                    </div>
                  </div>

                  {/* VISIBILITY TOGGLE */}
                  <div className="col-span-2 flex justify-center">
                    <button 
                      onClick={() => toggleVisibility(comment.id, comment.is_visible)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all border ${
                        comment.is_visible 
                        ? 'bg-green-50 text-green-700 border-green-200 shadow-sm' 
                        : 'bg-slate-50 text-slate-400 border-slate-200 opacity-60'
                      }`}
                    >
                      {comment.is_visible ? <><Eye size={12}/> Public</> : <><EyeOff size={12}/> Hidden</>}
                    </button>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="col-span-2 flex justify-end gap-1">
                    {!comment.is_reviewed && (
                      <button 
                        onClick={() => markAsReviewed(comment.id)}
                        className="p-2.5 text-blue-600 hover:bg-blue-100 rounded-xl transition-all"
                        title="Mark Reviewed"
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}
                    <button 
                      onClick={() => deleteComment(comment.id)}
                      className="p-2.5 text-red-400 hover:bg-red-50 rounded-xl transition-all"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}