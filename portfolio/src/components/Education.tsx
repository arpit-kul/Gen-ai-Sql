"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

const education = [
  {
    institution: "Indian Institute of Science (IISc)",
    degree: "Advanced Certification Programme in Generative AI and Prompt Engineering",
    field: "Generative AI",
    period: "Aug 2024 — Dec 2024",
    highlight: true,
  },
  {
    institution: "Great Lakes Institute of Management",
    degree: "PGP-DSE Course",
    field: "Data Science",
    period: "2021",
    highlight: false,
  },
  {
    institution: "Jaipur Engineering College & Research Center",
    degree: "Bachelor of Technology (BTech)",
    field: "Electrical Engineering",
    period: "2013 — 2017",
    highlight: false,
  },
];

const certifications = [
  "Lean Six Sigma Yellow Belt",
  "IISc Certified — Generative AI & Prompt Engineering",
];

export default function Education() {
  return (
    <section id="education" className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Education & <span className="text-gradient">Certifications</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {education.map((edu, i) => (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="glass rounded-2xl p-6 hover-lift"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-accent text-white shrink-0">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">
                      {edu.institution}
                    </h3>
                    <p className="text-accent font-medium text-sm mb-1">
                      {edu.degree}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-muted">
                      <span>{edu.field}</span>
                      <span>•</span>
                      <span>{edu.period}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass rounded-2xl p-8 hover-lift h-fit"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-accent text-white">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-bold">Certifications</h3>
            </div>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div
                  key={cert}
                  className="flex items-center gap-3 p-3 rounded-xl bg-accent/5 border border-accent/10"
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-accent shrink-0" />
                  <span className="text-foreground/80">{cert}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
