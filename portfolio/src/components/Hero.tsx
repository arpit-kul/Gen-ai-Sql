"use client";

import { motion } from "framer-motion";
import { ArrowDown, FolderOpen } from "lucide-react";

const particles = [
  { s: 4, x: "10%", y: "20%", d: 0, dur: 8 },
  { s: 6, x: "80%", y: "15%", d: 1, dur: 10 },
  { s: 3, x: "70%", y: "60%", d: 2, dur: 7 },
  { s: 5, x: "20%", y: "70%", d: 0.5, dur: 9 },
  { s: 4, x: "50%", y: "80%", d: 1.5, dur: 8 },
  { s: 3, x: "90%", y: "45%", d: 3, dur: 11 },
  { s: 5, x: "30%", y: "40%", d: 2.5, dur: 9 },
  { s: 4, x: "60%", y: "25%", d: 1.8, dur: 10 },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5" />
        <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-accent/20 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-accent-secondary/15 blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[150px] animate-float" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-accent/30"
          style={{ width: p.s, height: p.s, left: p.x, top: p.y }}
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: p.dur, delay: p.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-block mb-6 px-5 py-2.5 rounded-full glass text-sm font-mono text-accent tracking-wide">
            <span className="inline-block w-2 h-2 rounded-full bg-accent-secondary mr-2 animate-pulse" />
            Lead Data Science Engineer @ Fidelity Investments
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          Arpit{" "}
          <span className="text-gradient">Kulshrestha</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Data Scientist &amp; AI Architect — transforming complex data into
          actionable intelligence. Building the future with{" "}
          <span className="text-accent font-medium">Generative AI</span>,{" "}
          <span className="text-accent-secondary font-medium">ML</span>, and data-driven innovation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="https://www.linkedin.com/in/arpit-kulshrestha-4a39a788"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-accent text-white font-semibold hover-lift"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            Connect on LinkedIn
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full glass font-semibold hover-lift text-foreground"
          >
            <FolderOpen size={20} />
            View Portfolio
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a href="#about" className="text-muted hover:text-accent transition-colors">
            <ArrowDown size={24} className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
