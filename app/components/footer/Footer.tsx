import Link from "next/link";
import { NAVIGATION } from "@/app/data/navigation";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";

export default function Footer() {
  const { footer } = NAVIGATION;

  return (
    <footer className="bg-slate-950 text-slate-400 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10 text-sm">

        <div>
          <h4 className="text-white font-semibold mb-3">ICT Services</h4>
          <p>
            Professional ICT solutions, digital systems, and technical support
            tailored for schools, businesses, and individuals.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Services</h4>
          <ul className="space-y-2">
            {footer.services.map((service) => (
              <li key={service.href}>
                <Link href={service.href} className="hover:text-sky-400">
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Connect</h4>
          <div className="flex gap-4 text-lg">
            <Link href="#"><FaFacebookF /></Link>
            <Link href="#"><FaXTwitter /></Link>
            <Link href="#"><FaLinkedinIn /></Link>
            <Link href="#"><FaWhatsapp /></Link>
          </div>
        </div>

      </div>

      <div className="border-t border-slate-800 text-center text-xs py-4">
        © {new Date().getFullYear()} ICT Services. All rights reserved.
      </div>
    </footer>
  );
}
