"use client";

import { motion } from "framer-motion";
import { Rocket, Code, Brain, Database } from "lucide-react";

const placeholders = [
  {
    icon: Brain,
    title: "GenAI Solutions",
    description: "AI-powered applications and agents built with LangChain, RAG, and prompt engineering.",
    tag: "Coming Soon",
  },
  {
    icon: Database,
    title: "Data Pipelines",
    description: "End-to-end data engineering projects featuring ETL, SQL optimization, and analytics dashboards.",
    tag: "Coming Soon",
  },
  {
    icon: Code,
    title: "ML Models",
    description: "Machine learning models for classification, clustering, and anomaly detection in financial services.",
    tag: "Coming Soon",
  },
  {
    icon: Rocket,
    title: "Open Source",
    description: "Contributions and tools for the data science and AI community.",
    tag: "Coming Soon",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="text-muted max-w-lg mx-auto">
            Showcasing projects and contributions. Stay tuned — exciting work is on the way.
          </p>
          <div className="w-20 h-1 bg-gradient-accent mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {placeholders.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 hover-lift group relative overflow-hidden"
            >
              <div className="absolute top-4 right-4">
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-accent/10 text-accent border border-accent/20">
                  {item.tag}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-gradient-accent text-white w-fit mb-4 group-hover:scale-110 transition-transform">
                <item.icon size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
