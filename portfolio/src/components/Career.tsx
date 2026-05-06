"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";

interface CareerEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  current?: boolean;
}

const careers: CareerEntry[] = [
  {
    company: "Fidelity Investments",
    role: "Lead Data Science Engineer",
    period: "July 2025 — Present",
    location: "Bengaluru",
    description: [
      "Leading data science initiatives and building AI-powered solutions at enterprise scale.",
    ],
    current: true,
  },
  {
    company: "HSBC",
    role: "Senior Analyst",
    period: "Nov 2022 — July 2025",
    location: "Bengaluru, Karnataka",
    description: [
      "Leveraged SQL to extract, transform, and analyze large datasets for compliance and financial crime risk management.",
      "Collaborated with Compliance, Risk Management, and IT teams to design analytical solutions and actionable insights.",
      "Experimented with feature engineering to enhance Anti-Money Laundering (AML) model performance.",
      "Ensured model governance by validating and documenting models for regulatory compliance.",
    ],
  },
  {
    company: "Fractal",
    role: "Decision Scientist / Consultant",
    period: "Sep 2021 — Nov 2022",
    location: "India",
    description: [
      "Interfaced with clients to understand problems and worked with delivery teams on solutions addressing client needs.",
      "Provided high-end consulting to help clients sharpen business strategy through analytical implementation.",
      "Developed sophisticated analytical solutions and actionable insights with high business understanding.",
      "Built web scrapers using Beautiful Soup to fetch Pet Nutrition data from chewy.com for client solutions.",
    ],
  },
  {
    company: "Rail Vikas Nigam Limited",
    role: "Electrical Engineer",
    period: "Jan 2018 — Sep 2021",
    location: "India",
    description: [
      "Analyzed site data and provided effective solutions using visualization in Excel.",
      "Maintained site data using Excel and SQL, gaining exposure to SQL.",
      "Coordinated with cross-functional teams for execution of work according to standards and safety protocols.",
      "Handled billing and material management across departments for faster execution of work.",
    ],
  },
  {
    company: "VIKRAN Engineering & Exim Pvt. Ltd.",
    role: "Graduate Engineering Trainee",
    period: "June 2017 — Jan 2018",
    location: "India",
    description: [
      "Management, planning, execution, and testing of 220KV/132KV substation work.",
      "Handled billing and material management of site using Excel.",
      "Analyzed site data for faster execution of work.",
    ],
  },
];

export default function Career() {
  return (
    <section id="career" className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Career <span className="text-gradient">Journey</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-accent mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent-secondary to-accent/20 md:-translate-x-px" />

          {careers.map((career, i) => (
            <motion.div
              key={career.company}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-gradient-accent -translate-x-1/2 mt-6 z-10 ring-4 ring-background">
                {career.current && (
                  <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-40" />
                )}
              </div>

              {/* Spacer for alignment */}
              <div className="hidden md:block md:w-1/2" />

              {/* Card */}
              <div
                className={`ml-16 md:ml-0 md:w-1/2 ${
                  i % 2 === 0 ? "md:pr-12" : "md:pl-12"
                }`}
              >
                <div className="glass rounded-2xl p-6 hover-lift">
                  {career.current && (
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-accent text-white mb-3">
                      Current
                    </span>
                  )}
                  <h3 className="text-xl font-bold mb-1">{career.role}</h3>
                  <p className="text-accent font-semibold mb-3">
                    {career.company}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {career.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {career.location}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {career.description.map((desc, j) => (
                      <li
                        key={j}
                        className="text-sm text-foreground/70 leading-relaxed flex gap-2"
                      >
                        <span className="text-accent mt-1 shrink-0">▹</span>
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
