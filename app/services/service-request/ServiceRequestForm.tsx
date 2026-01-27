"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, MapPin, Briefcase, Clock } from "lucide-react";

// Main Export
export default function ServiceRequestForm() {
  return (
    <Suspense fallback={<div className="p-20 text-center animate-pulse text-[#002147] font-bold">Initializing Portal...</div>}>
      <FormFields />
    </Suspense>
  );
}

// Internal Component to handle logic
function FormFields() {
  const searchParams = useSearchParams();
  const serviceFromUrl = searchParams.get("service");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    region: "",
    town: "",
    serviceType: "",
    priority: "standard",
    timeline: "flexible",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    if (serviceFromUrl) {
      setFormData((prev) => ({ ...prev, serviceType: serviceFromUrl }));
    }
  }, [serviceFromUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/send-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setTimeout(() => {
        window.location.href = "/services/service-request/success";
      }, 1500);
    } catch {
      setStatus("error");
    }
  };

  const labelStyle = "text-[10px] font-black uppercase tracking-widest text-[#002147] mb-2 block ml-1";
  const inputStyle = "w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-4 text-[#002147] font-medium placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none transition-all appearance-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      
      {/* SECTION 1: IDENTITY */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
           <Briefcase size={16} className="text-blue-600" />
           <h4 className="text-xs font-black uppercase tracking-tighter text-slate-400">Client Identification</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Full Name / Institution *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className={inputStyle} />
          </div>
          <div>
            <label className={labelStyle}>Email Address *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className={inputStyle} />
          </div>
        </div>
        <div>
          <label className={labelStyle}>Phone Number *</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required className={inputStyle} />
        </div>
      </div>

      {/* SECTION 2: LOCATION */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
           <MapPin size={16} className="text-blue-600" />
           <h4 className="text-xs font-black uppercase tracking-tighter text-slate-400">Location Details</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Region *</label>
            <select name="region" value={formData.region} onChange={handleChange} required className={inputStyle}>
              <option value="">Select Region</option>
              <option value="Greater Accra">Greater Accra</option>
              <option value="Ashanti">Ashanti</option>
              <option value="Eastern">Eastern</option>
              <option value="Central">Central</option>
              <option value="Western">Western</option>
            </select>
          </div>
          <div>
            <label className={labelStyle}>Town / City *</label>
            <input type="text" name="town" value={formData.town} onChange={handleChange} placeholder="Town" required className={inputStyle} />
          </div>
        </div>
      </div>

      {/* SECTION 3: TECHNICAL */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
           <Clock size={16} className="text-blue-600" />
           <h4 className="text-xs font-black uppercase tracking-tighter text-slate-400">Technical Details</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className={labelStyle}>Service Type *</label>
            <select name="serviceType" value={formData.serviceType} onChange={handleChange} required className={inputStyle}>
              <option value="">Select Service</option>
              <option value="website">Website Development</option>
              <option value="application">Application Development</option>
              <option value="ict-teaching">ICT Teaching</option>
              <option value="graphic-design">Graphic Design</option>
              <option value="hardware-fixing">Hardware Fixing</option>
            </select>
          </div>
          <div>
            <label className={labelStyle}>Priority *</label>
            <select name="priority" value={formData.priority} onChange={handleChange} className={inputStyle}>
              <option value="standard">Standard</option>
              <option value="high">High</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
          <div>
            <label className={labelStyle}>Timeline</label>
            <select name="timeline" value={formData.timeline} onChange={handleChange} className={inputStyle}>
              <option value="flexible">Flexible</option>
              <option value="immediate">Immediate</option>
              <option value="1-month">1 Month</option>
            </select>
          </div>
        </div>
        <div>
          <label className={labelStyle}>Message *</label>
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Description" required rows={5} className={inputStyle} />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-[#002147] hover:bg-blue-600 text-white font-black px-8 py-6 rounded-2xl transition-all shadow-2xl flex items-center justify-center gap-4 uppercase text-sm tracking-[0.3em] disabled:opacity-50"
      >
        {status === "sending" ? "Processing..." : "Authorize Request"}
      </button>

      <AnimatePresence>
        {status === "error" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-red-50 text-red-700 rounded-xl text-center font-bold">
            <AlertCircle className="inline mr-2" size={18} /> Request failed. Please try again.
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}