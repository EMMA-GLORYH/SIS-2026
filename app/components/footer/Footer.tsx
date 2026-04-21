import Link from "next/link";
import { NAVIGATION } from "@/app/data/navigation";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { Mail, ShieldCheck } from "lucide-react";

export default function Footer() {
  const { footer } = NAVIGATION;

  return (
    <footer className="bg-[#001529] text-slate-400 mt-24 relative overflow-hidden">
      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[100px] bg-blue-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 text-sm border-b border-white/5 pb-16">
            
          {/* BRAND COLUMN */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-lg shadow-blue-600/20">
                NGI
              </div>
              <span className="text-white font-black tracking-tighter text-lg uppercase">ICT Services</span>
            </div>
            <p className="leading-relaxed text-slate-500 mb-6">
              Engineering professional digital infrastructures and secure hardware communication layers for the modern era.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <FaFacebookF />, href: "#" },
                { icon: <FaXTwitter />, href: "#" },
                { icon: <FaLinkedinIn />, href: "#" },
                { icon: <FaWhatsapp />, href: "#" },
              ].map((social, i) => (
                <Link 
                  key={i} 
                  href={social.href} 
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all active:scale-90"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* DYNAMIC SERVICES COLUMN */}
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-6">Capabilities</h4>
            <ul className="space-y-4">
              {footer.services.map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover:bg-blue-500 transition-colors" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* QUICK LINKS / UTILITY */}
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><Link href="/support" className="hover:text-blue-400 transition-colors">Technical Support</Link></li>
              <li><Link href="/api-docs" className="hover:text-blue-400 transition-colors">Documentation</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Protocols</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Service Terms</Link></li>
            </ul>
          </div>

          {/* NEWSLETTER / CALL TO ACTION */}
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-6">Security Briefing</h4>
            <p className="text-slate-500 mb-4 leading-relaxed">Stay updated with our latest security protocols and ICT patches.</p>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={16} />
              <input 
                type="email" 
                placeholder="Email address"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-xs focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all"
              />
            </div>
            <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs transition-all active:scale-[0.98]">
              Subscribe
            </button>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 gap-6">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">
            <ShieldCheck size={14} className="text-blue-500/50" />
            End-to-End Encryption Enabled
          </div>
          
          <div className="text-[10px] font-medium text-slate-500 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Solutions & ICT Services. All rights reserved.
          </div>

          <div className="flex gap-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <Link href="#" className="hover:text-white transition-colors">Status</Link>
            <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}