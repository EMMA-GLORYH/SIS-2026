"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, ChangeEvent, FormEvent } from "react";
import { 
  User, Briefcase, Mail, Linkedin, Github, 
  Globe, Send, Code, GraduationCap, CheckCircle2, ChevronRight, ChevronLeft, AlertCircle
} from "lucide-react";

export default function CareerJoinPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    personal: { fullName: "", email: "", location: "", phone: "" },
    expertise: { discipline: "Frontend Engineering", years: "", stack: "" },
    work: { github: "", portfolio: "", linkedin: "" },
    intent: { whySis: "" }
  });

  const totalSteps = 4;

  // Validation logic per step
  const isStepValid = () => {
    setError(null);
    if (step === 1) {
      const { fullName, email, location, phone } = formData.personal;
      return fullName && email && location && phone;
    }
    if (step === 2) {
      return formData.expertise.years !== "" && formData.expertise.stack !== "";
    }
    if (step === 3) {
      return formData.work.linkedin !== "";
    }
    if (step === 4) {
      return formData.intent.whySis.length > 20;
    }
    return true;
  };

  const handleNext = () => {
    if (isStepValid()) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    } else {
      setError("Please fill in all required fields to continue.");
    }
  };
  
  const handleBack = () => {
    setError(null);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isStepValid()) return;
    
    setLoading(true);
    try {
      const res = await fetch("/api/send-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) setSubmitted(true);
      else alert("Something went wrong. Please try again.");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-8 md:p-12 bg-white rounded-[2rem] md:rounded-[3rem] shadow-xl max-w-md">
          <CheckCircle2 size={60} className="text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-black text-[#002147]">Application Sent!</h2>
          <p className="text-slate-500 mt-4 text-sm md:text-base">Our recruitment team has been notified. We will review your profile shortly.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-16 md:py-32 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        
        {/* STEP DOT INDICATOR */}
        <div className="flex flex-col items-center mb-8 md:mb-12">
            <div className="flex items-center gap-3">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center">
                        <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${step >= i ? 'bg-blue-600 shadow-lg shadow-blue-200' : 'bg-slate-300'}`} />
                        {i !== 4 && <div className={`w-6 md:w-10 h-[2px] ${step > i ? 'bg-blue-600' : 'bg-slate-200'}`} />}
                    </div>
                ))}
            </div>
            <span className="mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Step {step} of {totalSteps}</span>
        </div>

        <motion.div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-xl md:shadow-2xl p-6 md:p-10 border border-slate-100">
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <FormStep key="step1" title="Personal Info" icon={<User size={20}/>}>
                  <Input label="Full Name" placeholder="Required" value={formData.personal.fullName} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, personal: {...formData.personal, fullName: e.target.value}})} required />
                  <Input label="Email" type="email" placeholder="Required" value={formData.personal.email} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, personal: {...formData.personal, email: e.target.value}})} required />
                  <Input label="Location" placeholder="City, Country" value={formData.personal.location} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, personal: {...formData.personal, location: e.target.value}})} required />
                  <Input label="Phone" placeholder="Contact number" value={formData.personal.phone} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, personal: {...formData.personal, phone: e.target.value}})} required />
                </FormStep>
              )}

              {step === 2 && (
                <FormStep key="step2" title="Expertise" icon={<Code size={20}/>}>
                  <Select label="Discipline" value={formData.expertise.discipline} onChange={(e: ChangeEvent<HTMLSelectElement>) => setFormData({...formData, expertise: {...formData.expertise, discipline: e.target.value}})}>
                    <option>Frontend Engineering</option>
                    <option>Backend & Infrastructure</option>
                    <option>Fullstack Development</option>
                    <option>UI/UX Design</option>
                  </Select>
                  <Input label="Experience (Years)" type="number" value={formData.expertise.years} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, expertise: {...formData.expertise, years: e.target.value}})} required />
                  <Textarea label="Technical Stack" value={formData.expertise.stack} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, expertise: {...formData.expertise, stack: e.target.value}})} placeholder="React, Node, etc. (Required)" />
                </FormStep>
              )}

              {step === 3 && (
                <FormStep key="step3" title="Professional Links" icon={<Briefcase size={20}/>}>
                  <Input label="GitHub" icon={<Github size={14}/>} placeholder="Optional" value={formData.work.github} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, work: {...formData.work, github: e.target.value}})} />
                  <Input label="LinkedIn" icon={<Linkedin size={14}/>} placeholder="Required URL" value={formData.work.linkedin} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, work: {...formData.work, linkedin: e.target.value}})} required />
                  <Input label="Portfolio" icon={<Globe size={14}/>} placeholder="Optional" value={formData.work.portfolio} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, work: {...formData.work, portfolio: e.target.value}})} />
                </FormStep>
              )}

              {step === 4 && (
                <FormStep key="step4" title="Final Words" icon={<GraduationCap size={20}/>}>
                  <Textarea label="Why join SIS Solutions?" value={formData.intent.whySis} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, intent: {...formData.intent, whySis: e.target.value}})} placeholder="Tell us about your motivation..." rows={5} required />
                </FormStep>
              )}
            </AnimatePresence>

            {/* ERROR MESSAGE */}
            {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 flex items-center gap-2 text-red-500 text-xs font-bold">
                    <AlertCircle size={14} /> {error}
                </motion.div>
            )}

            {/* NAVIGATION */}
            <div className="mt-8 md:mt-12 pt-6 border-t border-slate-50 flex justify-between items-center">
              {step > 1 ? (
                <button type="button" onClick={handleBack} className="text-xs md:text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1">
                  <ChevronLeft size={16} /> Back
                </button>
              ) : <div />}

              {step < totalSteps ? (
                <button type="button" onClick={handleNext} className="bg-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-sm md:text-base flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                  Next Step <ChevronRight size={18} />
                </button>
              ) : (
                <button type="submit" disabled={loading} className="bg-[#002147] text-white px-8 md:px-12 py-3 md:py-4 rounded-xl font-bold text-sm md:text-base flex items-center gap-2 hover:bg-blue-600 transition-all shadow-xl">
                  {loading ? "Sending..." : "Submit"} <Send size={18} />
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </main>
  );
}

/* --- RESPONSIVE COMPONENTS --- */

function FormStep({ title, icon, children }: any) {
  return (
    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">{icon}</div>
        <h2 className="text-lg md:text-xl font-black text-[#002147] tracking-tight">{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">{children}</div>
    </motion.div>
  );
}

function Input({ label, icon, ...props }: any) {
  return (
    <label className="block">
      <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">{label}</span>
      <div className="mt-1.5 relative">
        {icon && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>}
        <input {...props} className={`w-full h-11 md:h-14 rounded-xl border border-slate-100 bg-slate-50/50 px-4 ${icon ? "pl-10" : ""} focus:border-blue-600 focus:bg-white outline-none transition-all text-sm md:text-base`} />
      </div>
    </label>
  );
}

function Textarea({ label, ...props }: any) {
  return (
    <label className="block md:col-span-2">
      <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">{label}</span>
      <textarea {...props} className="mt-1.5 w-full rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3 md:py-4 focus:border-blue-600 focus:bg-white outline-none transition-all text-sm md:text-base min-h-[100px]" />
    </label>
  );
}

function Select({ label, children, ...props }: any) {
  return (
    <label className="block">
      <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">{label}</span>
      <select {...props} className="mt-1.5 w-full h-11 md:h-14 rounded-xl border border-slate-100 bg-slate-50/50 px-4 focus:border-blue-600 outline-none text-sm md:text-base appearance-none bg-no-repeat">{children}</select>
    </label>
  );
}