"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Trash2, Edit3, Save, X, Upload,
  Eye, EyeOff, Loader2, FolderOpen
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import ConfirmDialog from "@/app/components/ui/ConfirmDialog";
import AdminInput from "./AdminInput";
import EmptyState from "./EmptyState";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  tags: string[];
  link: string;
  is_featured: boolean;
  display_order: number;
  created_at: string;
}

interface ProjectForm {
  title: string;
  category: string;
  description: string;
  image_url: string;
  tags: string;
  link: string;
  is_featured: boolean;
  display_order: number;
}

const EMPTY_FORM: ProjectForm = {
  title: "",
  category: "",
  description: "",
  image_url: "",
  tags: "",
  link: "#",
  is_featured: true,
  display_order: 0,
};

interface ProjectsManagerProps {
  showToast: (message: string, type: "success" | "error") => void;
  onRefreshStats: () => void;
}

export default function ProjectsManager({ showToast, onRefreshStats }: ProjectsManagerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectForm>(EMPTY_FORM);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) showToast("Failed to load projects", "error");
    else setProjects(data || []);
    setLoading(false);
  }, [showToast]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleImageUpload = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      showToast("Image must be under 5MB", "error");
      return;
    }
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      showToast("Only JPG, PNG, WebP, GIF allowed", "error");
      return;
    }
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `project-images/${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
    const { error } = await supabase.storage
      .from("projects")
      .upload(path, file, { cacheControl: "3600", upsert: false });
    if (error) {
      showToast("Upload failed: " + error.message, "error");
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("projects").getPublicUrl(path);
    setForm((p) => ({ ...p, image_url: urlData.publicUrl }));
    setImagePreview(urlData.publicUrl);
    setUploading(false);
    showToast("Image uploaded", "success");
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.category.trim() || !form.description.trim()) {
      showToast("Title, category, and description required", "error");
      return;
    }
    if (!form.image_url.trim()) {
      showToast("Please upload a project image", "error");
      return;
    }
    setSaving(true);
    const payload = {
      title: form.title.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      image_url: form.image_url.trim(),
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      link: form.link.trim() || "#",
      is_featured: form.is_featured,
      display_order: form.display_order,
    };
    const { error } = editingId
      ? await supabase.from("projects").update(payload).eq("id", editingId)
      : await supabase.from("projects").insert(payload);
    if (error) showToast(editingId ? "Failed to update" : "Failed to create", "error");
    else showToast(editingId ? "Project updated" : "Project created", "success");
    setSaving(false);
    resetForm();
    fetchProjects();
    onRefreshStats();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    if (deleteTarget.image_url?.includes("projects/project-images/")) {
      const path = deleteTarget.image_url.split("projects/")[1];
      if (path) await supabase.storage.from("projects").remove([path]);
    }
    const { error } = await supabase.from("projects").delete().eq("id", deleteTarget.id);
    if (error) showToast("Failed to delete", "error");
    else {
      showToast("Project deleted", "success");
      fetchProjects();
      onRefreshStats();
    }
    setDeleteTarget(null);
  };

  const toggleFeatured = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from("projects")
      .update({ is_featured: !current })
      .eq("id", id);
    if (!error) {
      fetchProjects();
      onRefreshStats();
      showToast(current ? "Hidden from homepage" : "Now featured", "success");
    }
  };

  const startEdit = (project: Project) => {
    setEditingId(project.id);
    setForm({
      title: project.title,
      category: project.category,
      description: project.description,
      image_url: project.image_url,
      tags: project.tags?.join(", ") || "",
      link: project.link,
      is_featured: project.is_featured,
      display_order: project.display_order,
    });
    setImagePreview(project.image_url);
    setShowForm(true);
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
    setImagePreview(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete project?"
        message={
          deleteTarget
            ? `This will permanently remove "${deleteTarget.title}" and its image. This cannot be undone.`
            : ""
        }
        confirmLabel="Delete project"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-[#FAF9F6] font-black text-lg uppercase tracking-tight">
            Project Portfolio
          </h2>
          <p className="text-[#FAF9F6]/30 text-xs font-bold mt-1">
            {projects.length} project{projects.length !== 1 ? "s" : ""} · Manage your showcase
          </p>
        </div>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all active:scale-[0.97] ${
            showForm
              ? "bg-[#FAF9F6]/10 text-[#FAF9F6]"
              : "bg-[#FAF9F6] text-[#111]"
          }`}
        >
          {showForm ? <X size={14} /> : <Plus size={14} />}
          {showForm ? "Cancel" : "Add Project"}
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
              <h3 className="text-[#FAF9F6] font-black text-sm uppercase tracking-wider mb-6">
                {editingId ? "Edit Project" : "New Project"}
              </h3>

              <div className="grid md:grid-cols-2 gap-5">
                <AdminInput
                  label="Project Title *"
                  value={form.title}
                  onChange={(v) => setForm({ ...form, title: v })}
                  placeholder="e.g. Ghana International School Portal"
                />
                <AdminInput
                  label="Category *"
                  value={form.category}
                  onChange={(v) => setForm({ ...form, category: v })}
                  placeholder="e.g. Student Information System"
                />

                <div className="md:col-span-2">
                  <label className="block text-[9px] font-black text-[#FAF9F6]/40 uppercase tracking-[0.2em] mb-2">
                    Description *
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Describe the project and its impact..."
                    rows={4}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#222] rounded-xl text-[#FAF9F6] text-sm placeholder:text-[#FAF9F6]/20 focus:outline-none focus:border-[#FAF9F6]/30 transition-colors resize-none"
                  />
                </div>

                {/* Image Upload */}
                <div className="md:col-span-2">
                  <label className="block text-[9px] font-black text-[#FAF9F6]/40 uppercase tracking-[0.2em] mb-2">
                    Project Image *
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 border-2 border-dashed border-[#222] hover:border-[#FAF9F6]/20 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors group"
                    >
                      {uploading ? (
                        <Loader2 size={24} className="text-[#FAF9F6]/30 animate-spin mb-2" />
                      ) : (
                        <Upload
                          size={24}
                          className="text-[#FAF9F6]/20 group-hover:text-[#FAF9F6]/40 mb-2 transition-colors"
                        />
                      )}
                      <p className="text-[#FAF9F6]/30 text-xs font-bold uppercase tracking-wider">
                        {uploading ? "Uploading..." : "Click to upload"}
                      </p>
                      <p className="text-[#FAF9F6]/15 text-[10px] mt-1">
                        JPG, PNG, WebP, GIF — Max 5MB
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleImageUpload(f);
                      }}
                    />
                    {imagePreview && (
                      <div className="relative w-full sm:w-48 h-36 rounded-2xl overflow-hidden border border-[#222]">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => {
                            setImagePreview(null);
                            setForm({ ...form, image_url: "" });
                          }}
                          className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/60 hover:bg-black/80 flex items-center justify-center text-white"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex-1 h-px bg-[#222]" />
                    <span className="text-[9px] font-black text-[#FAF9F6]/20 uppercase tracking-widest">
                      or paste URL
                    </span>
                    <div className="flex-1 h-px bg-[#222]" />
                  </div>
                  <input
                    type="text"
                    value={form.image_url}
                    onChange={(e) => {
                      setForm({ ...form, image_url: e.target.value });
                      setImagePreview(e.target.value);
                    }}
                    placeholder="https://example.com/image.jpg"
                    className="mt-3 w-full px-4 py-3 bg-[#0a0a0a] border border-[#222] rounded-xl text-[#FAF9F6] text-sm placeholder:text-[#FAF9F6]/20 focus:outline-none focus:border-[#FAF9F6]/30 transition-colors"
                  />
                </div>

                <AdminInput
                  label="Tags (comma separated)"
                  value={form.tags}
                  onChange={(v) => setForm({ ...form, tags: v })}
                  placeholder="e.g. SIS, Portal, 2024"
                />
                <AdminInput
                  label="Project URL (optional)"
                  value={form.link}
                  onChange={(v) => setForm({ ...form, link: v })}
                  placeholder="https://project-url.com"
                />

                <div>
                  <label className="block text-[9px] font-black text-[#FAF9F6]/40 uppercase tracking-[0.2em] mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={form.display_order}
                    onChange={(e) =>
                      setForm({ ...form, display_order: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#222] rounded-xl text-[#FAF9F6] text-sm focus:outline-none focus:border-[#FAF9F6]/30 transition-colors"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="text-[9px] font-black text-[#FAF9F6]/40 uppercase tracking-[0.2em]">
                    Featured on Homepage
                  </label>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, is_featured: !form.is_featured })}
                    className={`w-12 h-7 rounded-full transition-colors relative ${
                      form.is_featured ? "bg-green-500" : "bg-[#222]"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                        form.is_featured ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-6 pt-5 border-t border-[#222]">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 bg-[#FAF9F6] text-[#111] rounded-xl font-black text-xs uppercase tracking-wider hover:bg-white transition-all disabled:opacity-50"
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  {editingId ? "Update Project" : "Save Project"}
                </button>
                <button
                  onClick={resetForm}
                  className="px-4 py-3 text-[#FAF9F6]/40 text-xs font-bold uppercase tracking-wider hover:text-[#FAF9F6]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 size={24} className="text-[#FAF9F6]/20 animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <EmptyState icon={FolderOpen} title="No Projects" desc="Click 'Add Project' to get started." />
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#111] rounded-2xl border border-[#222] overflow-hidden hover:border-[#FAF9F6]/10 transition-all"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-44 h-32 sm:h-auto flex-shrink-0">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  {!project.is_featured && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <EyeOff size={18} className="text-white/50" />
                    </div>
                  )}
                </div>
                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-[#FAF9F6] font-black text-sm truncate">
                          {project.title}
                        </h4>
                        {project.is_featured && (
                          <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[8px] font-black uppercase rounded-full border border-green-500/20 flex-shrink-0">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-[#FAF9F6]/25 text-[10px] font-bold uppercase tracking-wider">
                        {project.category}
                      </p>
                      <p className="text-[#FAF9F6]/35 text-xs line-clamp-2 mt-1">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="text-[8px] px-2 py-0.5 bg-[#FAF9F6]/5 text-[#FAF9F6]/25 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => toggleFeatured(project.id, project.is_featured)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                          project.is_featured
                            ? "bg-green-500/10 text-green-400"
                            : "bg-[#FAF9F6]/5 text-[#FAF9F6]/20"
                        }`}
                        title={project.is_featured ? "Hide" : "Feature"}
                      >
                        {project.is_featured ? <Eye size={14} /> : <EyeOff size={14} />}
                      </button>
                      <button
                        onClick={() => startEdit(project)}
                        className="w-8 h-8 rounded-lg bg-[#FAF9F6]/5 hover:bg-[#FAF9F6]/10 flex items-center justify-center text-[#FAF9F6]/30 hover:text-[#FAF9F6] transition-all"
                        title="Edit"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(project)}
                        className="w-8 h-8 rounded-lg bg-red-500/5 hover:bg-red-500/10 flex items-center justify-center text-red-400/50 hover:text-red-400 transition-all"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}