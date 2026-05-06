"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "AI & GenAI",
    skills: ["Generative AI", "AI Agents", "LangChain", "Prompt Engineering", "FAISS", "ChromaDB", "RAG"],
  },
  {
    title: "Data Science & ML",
    skills: ["Machine Learning", "EDA", "Clustering", "Feature Engineering", "PCA", "Regularization", "NLP"],
  },
  {
    title: "Data Engineering",
    skills: ["SQL", "Python", "Databricks", "ETL Pipelines", "Web Scraping", "Beautiful Soup"],
  },
  {
    title: "Visualization & Tools",
    skills: ["Data Visualization", "Excel", "Power BI", "Jupyter", "Git"],
  },
  {
    title: "Domain & Compliance",
    skills: ["AML Modeling", "Financial Crime", "Regulatory Compliance", "Model Governance", "Risk Management"],
  },
  {
    title: "Leadership & Soft Skills",
    skills: ["Team Leadership", "Cross-functional Coordination", "Client Consulting", "Stakeholder Management"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 hover-lift"
            >
              <h3 className="text-lg font-bold mb-4 text-gradient">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm rounded-lg bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
