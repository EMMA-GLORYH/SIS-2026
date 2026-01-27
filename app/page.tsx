"use client";

import Link from "next/link";
import Card from "./components/ui/Card";
import HeroSlider from "./components/HeroSlider";
import { services } from "./data/service";
import { motion, Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.2, 0.8, 0.2, 1]
    } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

// Service card colors - vibrant gradients
const serviceColors = [
  "#3B82F6", // Blue
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#6366F1", // Indigo
];

export default function HomePage() {
  const heroImages = [
    "/images/tech-1.jpg",
    "/images/tech-2.jpg",
    "/images/tech-3.jpg",
    "/images/tech-4.jpg",
  ];

  return (
    <main className="bg-linear-to-b from-slate-50 to-white text-slate-900 overflow-x-hidden">
      {/* =================== */}
      {/* HERO SECTION */}
      {/* =================== */}
      <section className="relative">
        <HeroSlider
          images={heroImages}
          overlay={true}
          title="ICT Solutions for Schools & Institutions"
          subtitle="Turning digital ideas into reality through professional web development, software engineering, and community-focused ICT support."
        />
        {/* Absolute CTA button positioned over the slider */}
        <div className="absolute bottom-20 left-0 right-0 z-20 flex justify-center pointer-events-none">
           <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 1.5, duration: 0.5 }}
             className="pointer-events-auto"
           >
             <Link
               href="/services"
               className="relative group bg-white text-blue-900 font-bold px-12 py-5 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105 overflow-hidden"
             >
               <span className="relative z-10">Explore Our Services</span>
               <div className="absolute inset-0 bg-linear-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
             </Link>
           </motion.div>
        </div>
      </section>

      {/* =================== */}
      {/* SERVICES HIGHLIGHT */}
      {/* =================== */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-6 py-24"
      >
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-linear-to-r from-blue-600 to-indigo-600 mx-auto mb-4"
          />
          <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">
            Capabilities
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Our Core Services
          </h3>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-lg">
            Comprehensive ICT solutions tailored for educational institutions and organizations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div key={service.slug} variants={fadeInUp}>
              <Link href={`/services/${service.slug}`}>
                <Card 
                  variant="gradient" 
                  accentColor={serviceColors[index % serviceColors.length]}
                  className="h-full"
                >
                  {/* Icon container with gradient */}
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="mb-5"
                  >
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-white text-xl shadow-lg"
                      style={{ 
                        background: `linear-gradient(135deg, ${serviceColors[index % serviceColors.length]}, ${serviceColors[(index + 1) % serviceColors.length]})` 
                      }}
                    >
                      {service.title.charAt(0)}
                    </div>
                  </motion.div>

                  <h3 className="font-bold text-xl mb-3 text-slate-900 group-hover:text-blue-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {service.description}
                  </p>

                  {/* Read more indicator */}
                  <div className="mt-4 flex items-center gap-2 text-blue-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* =================== */}
      {/* STATS SECTION */}
      {/* =================== */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-linear-to-r from-blue-600 to-indigo-700 text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "20+", label: "Projects Completed" },
            { number: "10+", label: "Happy Clients" },
            { number: "9", label: "Years Experience" },
            { number: "24/7", label: "Support Available" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: index * 0.1, type: "spring" }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-white/20 backdrop-blur-sm rounded-lg py-4">
                {stat.number}
              </div>
              <div className="text-blue-100 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* =================== */}
      {/* ABOUT SECTION (Tech Layout) */}
      {/* =================== */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Decorative code background */}
        <div className="absolute inset-0 opacity-5 font-mono text-xs select-none pointer-events-none p-10 leading-loose">
          {`<html><body><h1>Innovating Communities</h1><p>Digital Transformation</p></body></html>`}
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              transition={{ duration: 0.8 }}
              className="h-1 bg-linear-to-r from-blue-500 to-indigo-500 mb-6"
            />
            <h2 className="text-4xl font-bold mb-6 bg-linear-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Empowering through Technology and Creativity
            </h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              We focus on practical, affordable, and innovative solutions. Whether it's a school management system or an NGO portal, our code is built to last and scale with your needs.
            </p>
            <Link
              href="/about"
              className="inline-block border-2 border-blue-500 text-blue-400 font-semibold px-8 py-4 rounded-xl hover:bg-blue-500 hover:text-white transition-all hover:scale-105 shadow-lg hover:shadow-blue-500/50"
            >
              The Full Story
            </Link>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden"
          >
             {/* Window controls */}
             <div className="flex space-x-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
             </div>
             
             {/* Code content */}
             <div className="space-y-3">
               <p className="text-blue-400 font-mono text-sm">// Our Vision</p>
               <motion.p 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.5 }}
                 className="text-slate-300 font-mono text-sm leading-relaxed"
               >
                 "To bridge the digital divide in local institutions through high-performance, scalable software solutions and Designs."
               </motion.p>
               <p className="text-emerald-400 font-mono text-sm mt-4">// Our Mission</p>
               <motion.p 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.7 }}
                 className="text-slate-300 font-mono text-sm leading-relaxed"
               >
                 "Making technology accessible and empowering communities through innovation and Graphics."
               </motion.p>
             </div>

             {/* Glow effect */}
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
          </motion.div>
        </motion.div>
      </section>

      {/* =================== */}
      {/* TEAM SECTION */}
      {/* =================== */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-6 py-24"
      >
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 0.8 }}
            className="h-1 bg-linear-to-r from-blue-600 to-indigo-600 mx-auto mb-4"
          />
          <h2 className="text-4xl font-bold mb-4 bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Meet The Experts
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Talented professionals dedicated to delivering excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Elijah Emmanuel Hienwo", role: "Lead Developer", color: "#3B82F6" },
            { name: "Stephen ", role: "UI/UX Designer", color: "#8B5CF6" },
            { name: "Theo Awuah", role: "Project Manager", color: "#EC4899" },
            { name: "Nana Ado", role: "Hardware Technician", color: "#10B981" }
          ].map((member, index) => (
            <motion.div key={member.name} variants={fadeInUp}>
              <Card variant="elevated" accentColor={member.color}>
                <div className="text-center group">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-24 h-24 mx-auto rounded-full mb-6 overflow-hidden shadow-xl relative"
                    style={{
                      background: `linear-gradient(135deg, ${member.color}, ${serviceColors[(index + 1) % serviceColors.length]})`
                    }}
                  >
                    {/* Placeholder for actual image */}
                    <div className="w-full h-full flex items-center justify-center text-white font-bold text-2xl">
                      {member.name.charAt(0)}
                    </div>
                  </motion.div>
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-sm font-medium mb-3" style={{ color: member.color }}>
                    {member.role}
                  </p>
                  <p className="text-xs text-slate-600">
                    Passionate about creating innovative solutions
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* =================== */}
      {/* CALL TO ACTION */}
      {/* =================== */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700 text-white mx-6 mb-20 py-20 rounded-3xl text-center shadow-2xl overflow-hidden"
      >
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-white/5 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to scale your digital presence?
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-10 text-xl opacity-90 max-w-2xl mx-auto leading-relaxed"
          >
            Contact us today to discuss your ICT solutions or software needs. Let's build something amazing together.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-600 font-bold px-12 py-5 rounded-full shadow-xl hover:shadow-2xl hover:bg-slate-50 transition-all hover:scale-105"
            >
              Start a Conversation
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}