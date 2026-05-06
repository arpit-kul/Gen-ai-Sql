// Animation timing constants
export const ANIMATION = {
  duration: {
    fast: 0.3,
    normal: 0.5,
    slow: 0.8,
  },
  delay: {
    stagger: 0.1,
    cascade: 0.15,
    heroStagger: 0.2,
  },
  easing: {
    smooth: "easeOut" as const,
    bouncy: "easeInOut" as const,
  },
} as const;

// Scroll behavior constants
export const SCROLL = {
  navbarThreshold: 50,
  smoothBehavior: "smooth" as const,
} as const;

// Layout spacing
export const SPACING = {
  sectionPadding: "py-24 md:py-32",
  container: "max-w-7xl mx-auto px-6",
  divider: "w-20 h-1",
} as const;

// API configuration
export const API = {
  timeout: 10000, // 10 seconds
  maxMessageLength: 1000,
  maxMessages: 20,
  rateLimit: {
    requests: 10,
    window: "1 m" as const,
  },
} as const;

// Chat suggestions
export const CHAT_SUGGESTIONS = [
  "What's your current role?",
  "Tell me about your AI skills",
  "Describe your career journey",
  "What's your educational background?",
] as const;

// Particles configuration
export const HERO_PARTICLES = [
  { s: 4, x: "10%", y: "20%", d: 0, dur: 8 },
  { s: 6, x: "80%", y: "15%", d: 1, dur: 10 },
  { s: 3, x: "70%", y: "60%", d: 2, dur: 7 },
  { s: 5, x: "20%", y: "70%", d: 0.5, dur: 9 },
  { s: 4, x: "50%", y: "80%", d: 1.5, dur: 8 },
  { s: 3, x: "90%", y: "45%", d: 3, dur: 11 },
  { s: 5, x: "30%", y: "40%", d: 2.5, dur: 9 },
  { s: 4, x: "60%", y: "25%", d: 1.8, dur: 10 },
] as const;
