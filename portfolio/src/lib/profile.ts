// Centralized profile data - single source of truth
// Used by components AND AI system prompt

export const profile = {
  name: "Arpit Kulshrestha",
  tagline: "Data Scientist & AI Architect",
  location: "Bengaluru, Karnataka, India",
  
  currentRole: {
    title: "Lead Data Science Engineer",
    company: "Fidelity Investments",
    period: "July 2025 — Present",
    location: "Bengaluru",
    description: "Leading data science initiatives and building AI-powered solutions at enterprise scale.",
  },

  contact: {
    email: "arpit.shrestha93@gmail.com",
    linkedin: "https://www.linkedin.com/in/arpit-kulshrestha-4a39a788",
    linkedinHandle: "arpit-kulshrestha-4a39a788",
  },

  summary: `I am a versatile data scientist with a strong foundation in machine learning, data modeling, and data visualization, complemented by hands-on experience in Python, SQL, and advanced ML techniques. My professional journey bridges diverse domains — from leading large teams in the public sector to delivering cutting-edge AI solutions in financial and analytics industries.

I am passionate about leveraging data science and AI to solve real-world problems, optimize processes, and deliver measurable business value.`,

  careers: [
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
  ] as const,

  education: [
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
  ] as const,

  certifications: [
    "Lean Six Sigma Yellow Belt",
    "IISc Certified — Generative AI & Prompt Engineering",
  ] as const,

  skillCategories: [
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
  ] as const,

  highlights: [
    {
      icon: "Brain",
      title: "AI & Data Science",
      description: "Proficient in EDA, clustering, feature engineering, PCA, and advanced regularization. Leveraging LangChain, Databricks, FAISS, and ChromaDB for impactful AI solutions.",
    },
    {
      icon: "Users",
      title: "Leadership",
      description: "Led a team of 20+ professionals in the public sector, demonstrating exceptional coordination, planning, and execution abilities.",
    },
    {
      icon: "Zap",
      title: "Cross-Industry Versatility",
      description: "Transitioned from Electrical Engineer to data-driven problem solver — showcasing adaptability and continuous growth across domains.",
    },
  ] as const,

  portfolio: [
    {
      icon: "Brain",
      title: "GenAI Solutions",
      description: "AI-powered applications and agents built with LangChain, RAG, and prompt engineering.",
      tag: "Coming Soon",
    },
    {
      icon: "Database",
      title: "Data Pipelines",
      description: "End-to-end data engineering projects featuring ETL, SQL optimization, and analytics dashboards.",
      tag: "Coming Soon",
    },
    {
      icon: "Code",
      title: "ML Models",
      description: "Machine learning models for classification, clustering, and anomaly detection in financial services.",
      tag: "Coming Soon",
    },
    {
      icon: "Rocket",
      title: "Open Source",
      description: "Contributions and tools for the data science and AI community.",
      tag: "Coming Soon",
    },
  ] as const,
} as const;

// Type exports for TypeScript
export type Profile = typeof profile;
export type CareerEntry = typeof profile.careers[number];
export type EducationEntry = typeof profile.education[number];
export type SkillCategory = typeof profile.skillCategories[number];
export type Highlight = typeof profile.highlights[number];
export type PortfolioItem = typeof profile.portfolio[number];

// Generate system prompt for AI from profile data
export function generateSystemPrompt(): string {
  return `You are the digital twin of ${profile.name} — a ${profile.currentRole.title} at ${profile.currentRole.company} based in ${profile.location}. You answer questions about Arpit's career, skills, education, and professional background as if you ARE Arpit. Be personable, confident, and professional. Use first person ("I").

Key facts about me:
- Current role: ${profile.currentRole.title} at ${profile.currentRole.company} (${profile.currentRole.period})
- Previous roles:
${profile.careers.slice(1).map(c => `  - ${c.role} at ${c.company} (${c.period})`).join('\n')}

Education:
${profile.education.map(e => `- ${e.institution}: ${e.degree} in ${e.field} (${e.period})`).join('\n')}

Certifications: ${profile.certifications.join(", ")}

Top Skills: ${profile.skillCategories.flatMap(c => c.skills).slice(0, 15).join(", ")}

Contact: ${profile.contact.email}, LinkedIn: ${profile.contact.linkedinHandle}, Location: ${profile.location}

Unique traits: Transitioned from Electrical Engineering to Data Science/AI. Led 20+ person teams. Cross-industry experience (public sector, consulting, banking, investments). Passionate about leveraging AI to solve real-world problems.

Keep answers concise and engaging. If asked something outside my professional context, politely redirect to career-related topics.`;
}
