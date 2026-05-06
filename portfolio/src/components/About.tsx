"use client";

import { motion } from "framer-motion";
import { Brain, Users, Zap } from "lucide-react";

const highlights = [
  {
    icon: Brain,
    title: "AI & Data Science",
    description:
      "Proficient in EDA, clustering, feature engineering, PCA, and advanced regularization. Leveraging LangChain, Databricks, FAISS, and ChromaDB for impactful AI solutions.",
  },
  {
    icon: Users,
    title: "Leadership",
    description:
      "Led a team of 20+ professionals in the public sector, demonstrating exceptional coordination, planning, and execution abilities.",
  },
  {
    icon: Zap,
    title: "Cross-Industry Versatility",
    description:
      "Transitioned from Electrical Engineer to data-driven problem solver — showcasing adaptability and continuous growth across domains.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="glass rounded-2xl p-8 hover-lift">
              <p className="text-lg leading-relaxed text-foreground/80 mb-6">
                I am a versatile <strong>data scientist</strong> with a strong
                foundation in <strong>machine learning, data modeling, and data
                visualization</strong>, complemented by hands-on experience in{" "}
                <strong>Python, SQL</strong>, and advanced{" "}
                <strong>ML techniques</strong>.
              </p>
              <p className="text-lg leading-relaxed text-foreground/80 mb-6">
                My professional journey bridges diverse domains — from leading
                large teams in the public sector to delivering cutting-edge AI
                solutions in financial and analytics industries.
              </p>
              <p className="text-lg leading-relaxed text-foreground/80">
                I am passionate about leveraging <strong>data science and
                AI</strong> to solve real-world problems, optimize processes, and
                deliver measurable business value. Whether it&apos;s enhancing
                compliance models, automating workflows, or building AI-powered
                systems, my focus remains on creating impactful solutions that
                drive success.
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col gap-6">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="glass rounded-2xl p-6 hover-lift"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-accent text-white shrink-0">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
