# Building a Professional Portfolio Website with Next.js — A Beginner's Tutorial

This tutorial walks you through every piece of a real, production-quality portfolio website — from the technology choices to the code that makes it work. No prior frontend experience required.

---

## Table of Contents

1. [Technology Summary](#1-technology-summary)
2. [High-Level Walkthrough](#2-high-level-walkthrough)
3. [Detailed Code Review](#3-detailed-code-review)
   - [Project Setup & Configuration](#31-project-setup--configuration)
   - [Global Styles & Theming](#32-global-styles--theming)
   - [Layout & Theme Provider](#33-layout--theme-provider)
   - [Page Composition](#34-page-composition)
   - [Navbar Component](#35-navbar-component)
   - [Hero Component](#36-hero-component)
   - [About Component](#37-about-component)
   - [Career Timeline Component](#38-career-timeline-component)
   - [Skills Component](#39-skills-component)
   - [Education Component](#310-education-component)
   - [Portfolio Placeholder Component](#311-portfolio-placeholder-component)
   - [Contact Component](#312-contact-component)
   - [Digital Twin Chat (AI)](#313-digital-twin-chat-ai)
4. [5 Suggestions for Improvement](#4-5-suggestions-for-improvement)

---

## 1. Technology Summary

| Technology | What It Is | Why We Use It |
|---|---|---|
| **Next.js 16** | A React framework for building full-stack web apps | Gives us file-based routing, server-side API routes, and automatic optimization out of the box |
| **React 19** | A JavaScript library for building user interfaces | Lets us write UI as reusable components that update efficiently |
| **TypeScript** | JavaScript with static type checking | Catches bugs before runtime — the compiler tells you if you pass the wrong type to a function |
| **TailwindCSS v4** | A utility-first CSS framework | Instead of writing custom CSS files, you apply pre-built classes like `px-4`, `text-lg`, `rounded-xl` directly in your HTML |
| **Framer Motion** | An animation library for React | Provides declarative animations — you describe *what* should happen (fade in, slide up) and it handles the *how* |
| **Lucide React** | An icon library | Provides 1000+ clean SVG icons as React components — `<Brain />`, `<Sun />`, etc. |
| **next-themes** | A dark/light mode library for Next.js | Handles theme switching, localStorage persistence, and avoiding the "flash of wrong theme" on page load |
| **OpenRouter** | An AI API gateway | Lets us call large language models (like GPT) through a single API endpoint without managing individual provider accounts |

### Key Concepts for Beginners

- **Component**: A self-contained piece of UI. Think of it like a LEGO brick — each component does one thing, and you snap them together to build the page.
- **Props**: Data you pass *into* a component from its parent. Like function arguments.
- **State** (`useState`): Data that belongs to a component and can change over time (e.g., whether a menu is open or closed). When state changes, React re-renders the component.
- **Effect** (`useEffect`): Code that runs after the component renders — used for side effects like adding event listeners or fetching data.
- **Server vs Client**: Next.js runs some code on the server (API routes, static HTML generation) and some in the browser (interactive components). Components marked `"use client"` run in the browser.
- **API Route**: A server-side function that handles HTTP requests. Our `/api/chat` route receives a message from the browser and forwards it to OpenRouter's AI.

---

## 2. High-Level Walkthrough

Here's the big picture of how the app works:

```
portfolio/
├── src/
│   ├── app/                    # Next.js App Router — defines pages & APIs
│   │   ├── layout.tsx          # Root layout (wraps every page with fonts, theme)
│   │   ├── page.tsx            # Home page (composes all sections)
│   │   ├── globals.css         # Global styles, CSS variables, animations
│   │   └── api/
│   │       └── chat/
│   │           └── route.ts    # POST endpoint — sends messages to OpenRouter AI
│   └── components/             # Reusable UI components
│       ├── ThemeProvider.tsx    # Wraps app in dark/light theme context
│       ├── Navbar.tsx          # Fixed top nav with theme toggle & mobile menu
│       ├── Hero.tsx            # Full-screen landing section with animations
│       ├── About.tsx           # Bio + highlight cards
│       ├── Career.tsx          # Interactive timeline of work history
│       ├── Skills.tsx          # Categorized skill pills
│       ├── Education.tsx       # Degrees + certifications
│       ├── Portfolio.tsx       # "Coming Soon" project placeholders
│       ├── Contact.tsx         # Email, LinkedIn, location cards
│       ├── Footer.tsx          # Copyright + links
│       ├── SectionDivider.tsx  # Gradient line between sections
│       └── DigitalTwin.tsx     # Floating AI chat widget
├── .env.local                  # API key (gitignored — never committed)
├── package.json                # Dependencies & scripts
└── tsconfig.json               # TypeScript configuration
```

### How a Page Request Flows

1. **Browser requests** `http://localhost:3001`
2. **Next.js server** renders `layout.tsx` → loads fonts, wraps children in `ThemeProvider`
3. **`page.tsx`** composes: `Navbar` → `Hero` → `About` → `Career` → `Skills` → `Education` → `Portfolio` → `Contact` → `Footer` → `DigitalTwin`
4. **HTML is sent** to the browser. Client-side components (`"use client"`) hydrate — becoming interactive
5. When the user **clicks the chat bubble**, `DigitalTwin` sends a POST to `/api/chat`
6. **`route.ts`** receives the message, attaches the system prompt (Arpit's career data), calls OpenRouter, and returns the AI's reply

---

## 3. Detailed Code Review

### 3.1 Project Setup & Configuration

**package.json** — Declares all dependencies:

```json
{
  "dependencies": {
    "framer-motion": "^12.38.0",
    "lucide-react": "^1.14.0",
    "next": "16.2.4",
    "next-themes": "^0.4.6",
    "react": "19.2.4",
    "react-dom": "19.2.4"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

- `next`, `react`, `react-dom` — the core framework
- `framer-motion` — animations
- `lucide-react` — icons
- `next-themes` — dark/light mode
- `tailwindcss` + `@tailwindcss/postcss` — styling

**tsconfig.json** — Configures the `@/*` import alias so `@/components/Navbar` maps to `src/components/Navbar`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**.env.local** — Stores the OpenRouter API key securely (this file is gitignored):

```
OPENROUTER_API_KEY=sk-or-v1-...
```

> **Why `.env.local`?** Next.js automatically loads this file and makes the variables available via `process.env`. Because it's listed in `.gitignore`, it never gets committed to version control — keeping your API key safe.

---

### 3.2 Global Styles & Theming

**globals.css** is the design foundation of the entire site. Let's break it down:

#### CSS Custom Properties (Theme Variables)

```css
:root {
  --background: #f8f9fa;
  --foreground: #1a1a2e;
  --accent: #6c63ff;
  --accent-secondary: #00d4aa;
  --card: rgba(255, 255, 255, 0.7);
  --card-border: rgba(108, 99, 255, 0.15);
  --muted: #6b7280;
}

.dark {
  --background: #0a0a1a;
  --foreground: #e8e8f0;
  --accent: #7c73ff;
  --accent-secondary: #00e5b0;
  --card: rgba(20, 20, 40, 0.6);
  --card-border: rgba(124, 115, 255, 0.2);
  --muted: #9ca3af;
}
```

- `:root` defines **light mode** colors
- `.dark` overrides them for **dark mode** — `next-themes` adds/removes this class on `<html>`
- Using CSS variables means every component automatically adapts when the theme changes — no JavaScript needed for color switching

#### TailwindCSS v4 Theme Integration

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-accent: var(--accent);
  --color-accent-secondary: var(--accent-secondary);
  --color-card: var(--card);
  --color-card-border: var(--card-border);
  --color-muted: var(--muted);
}
```

This tells TailwindCSS v4 about our custom colors. Now we can use classes like `bg-background`, `text-accent`, `border-card-border` anywhere — and they'll resolve to the correct CSS variable.

#### Custom Utility Classes

```css
.glass {
  background: var(--card);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--card-border);
}
```

**Glassmorphism** — the frosted-glass effect. `backdrop-filter: blur()` makes whatever is behind the element appear blurred, creating a translucent card look. The semi-transparent `background` + subtle `border` completes the effect.

```css
.text-gradient {
  background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**Gradient text** — applies a gradient as the text's fill color. `background-clip: text` restricts the gradient to the text shape, and `text-fill-color: transparent` makes the actual text transparent so the gradient shows through.

```css
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(108, 99, 255, 0.15);
}
```

**Hover lift** — on hover, the element moves up 4px and gains a purple-tinted shadow, creating a "floating card" effect.

#### Custom Animations

```css
@keyframes pulse-glow {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
```

- `pulse-glow` — fades opacity between 40% and 80%, used for the background blobs
- `float` — moves an element up and down 20px, used for the central background orb

---

### 3.3 Layout & Theme Provider

**ThemeProvider.tsx** — Wraps the entire app so every component can access the current theme:

```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
```

- `"use client"` — this component runs in the browser (needed because it uses React context)
- `attribute="class"` — toggles dark mode by adding/removing the `.dark` class on `<html>`
- `defaultTheme="dark"` — starts in dark mode
- `enableSystem` — respects the user's OS preference if they haven't explicitly chosen

**layout.tsx** — The root layout that wraps every page:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arpit Kulshrestha — Data Scientist & AI Architect",
  description: "Lead Data Science Engineer at Fidelity Investments...",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning
      className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

Key points:
- `Geist` fonts are loaded from Google Fonts with `next/font/google` — this self-hosts the fonts for performance and privacy
- `suppressHydrationWarning` — needed because `next-themes` modifies the `<html>` class on the client, which would otherwise cause a hydration mismatch warning
- `metadata` — sets the browser tab title and SEO description
- `bg-background text-foreground` — applies our theme colors to the entire page

---

### 3.4 Page Composition

**page.tsx** — The home page simply imports and stacks all components:

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Career from "@/components/Career";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import DigitalTwin from "@/components/DigitalTwin";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Career />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Education />
        <SectionDivider />
        <Portfolio />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
      <DigitalTwin />
    </>
  );
}
```

This is the **composition pattern** — each section is an independent component. You could reorder, remove, or add sections by simply changing this file. The `<>...</>` is a React Fragment — an invisible wrapper that lets you return multiple elements without adding an extra DOM node.

---

### 3.5 Navbar Component

The navbar is the most interactive component — it handles theme toggling, mobile menu, scroll-based styling, and smooth scroll to top.

#### Scroll-Based Styling

```tsx
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  setMounted(true);
  const handleScroll = () => setScrolled(window.scrollY > 50);
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

- We listen to the `scroll` event and track whether the user has scrolled past 50px
- The `return` cleanup function removes the listener when the component unmounts — preventing memory leaks

```tsx
className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
  scrolled ? "glass shadow-lg shadow-accent/5" : "bg-transparent"
}`}
```

- When `scrolled` is true → glassmorphism background + shadow
- When at the top → transparent background so the hero shows through

#### Theme Toggle

```tsx
const { theme, setTheme } = useTheme();
const [mounted, setMounted] = useState(false);

useEffect(() => setMounted(true), []);

{mounted && (
  <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
  </button>
)}
```

- `mounted` guards against hydration mismatch — on the server, `theme` is unknown, so we don't render the icon until after the component mounts in the browser
- `useTheme()` from `next-themes` gives us the current theme and a setter

#### Mobile Menu with AnimatePresence

```tsx
<AnimatePresence>
  {mobileOpen && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="md:hidden glass border-t border-card-border"
    >
      {/* nav links */}
    </motion.div>
  )}
</AnimatePresence>
```

- `AnimatePresence` enables **exit animations** — when `mobileOpen` becomes false, the element animates out instead of instantly disappearing
- `initial` → starting state, `animate` → target state, `exit` → state when removed

#### AK Logo Button

```tsx
<button
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="group relative text-xl font-bold text-gradient cursor-pointer hover-lift"
>
  <span className="relative z-10">AK</span>
  <span className="absolute inset-0 rounded-lg bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300 -m-2 p-2" />
</button>
```

- Clicking scrolls smoothly to the top of the page
- `group` + `group-hover` — when you hover the button, the invisible background span fades in with an accent tint
- The `z-10` ensures the text stays above the background overlay

---

### 3.6 Hero Component

The hero is the most visually complex component — layered backgrounds, floating particles, and staggered text animations.

#### Layered Background

```tsx
<div className="absolute inset-0 -z-10">
  {/* Base gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5" />
  {/* Pulsing blob */}
  <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-accent/20 blur-[120px] animate-pulse-glow" />
  {/* Secondary blob */}
  <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-accent-secondary/15 blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
  {/* Central orb */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[150px] animate-float" />
</div>
```

- **4 layers**: base gradient → accent blob → secondary blob → central floating orb
- `blur-[120px]` — massive blur creates the soft, ambient glow effect
- `animate-pulse-glow` / `animate-float` — our custom CSS animations
- `animationDelay: "1.5s"` — offsets the secondary blob's pulse so they don't pulse in sync

#### Grid Pattern Overlay

```tsx
<div
  className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05]"
  style={{
    backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px),
                      linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
    backgroundSize: "60px 60px",
  }}
/>
```

Creates a subtle grid pattern using CSS gradients — two sets of 1px lines (horizontal + vertical) at 60px intervals. The extremely low opacity makes it barely visible but adds texture.

#### Floating Particles

```tsx
const particles = [
  { s: 4, x: "10%", y: "20%", d: 0, dur: 8 },
  { s: 6, x: "80%", y: "15%", d: 1, dur: 10 },
  // ... 8 total
];

{particles.map((p, i) => (
  <motion.div
    key={i}
    className="absolute rounded-full bg-accent/30"
    style={{ width: p.s, height: p.s, left: p.x, top: p.y }}
    animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
    transition={{ duration: p.dur, delay: p.d, repeat: Infinity, ease: "easeInOut" }}
  />
))}
```

- Each particle is a tiny circle (3-6px) positioned absolutely on the page
- Framer Motion animates `y` (bobs up 30px and back) and `opacity` (fades in and out)
- `repeat: Infinity` makes it loop forever
- Different `duration` and `delay` values create organic, unsynchronized movement

#### Staggered Text Animations

```tsx
<motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
  className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
>
  Arpit <span className="text-gradient">Kulshrestha</span>
</motion.h1>
```

- Each element starts 30px below its final position and invisible
- They animate to their final position with increasing `delay` (0 → 0.2 → 0.4 → 0.6s)
- This creates a **staggered reveal** — elements cascade in one after another
- `text-gradient` applies our gradient text effect to the last name

---

### 3.7 About Component

The About section demonstrates **scroll-triggered animations** and the **data-driven component** pattern.

#### Data-Driven Rendering

```tsx
const highlights = [
  { icon: Brain, title: "AI & Data Science", description: "..." },
  { icon: Users, title: "Leadership", description: "..." },
  { icon: Zap, title: "Cross-Industry Versatility", description: "..." },
];
```

Instead of writing three separate cards, we define the data once and `.map()` over it. This is a core React pattern — **render from data, not from repetition**.

#### Scroll-Triggered Animation

```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.7 }}
>
```

- `whileInView` — the animation triggers when the element scrolls into the viewport
- `viewport={{ once: true }}` — only animate once (not every time it scrolls in/out)
- `margin: "-100px"` — trigger 100px before the element actually enters the viewport, so it feels responsive

#### Staggered Cards

```tsx
{highlights.map((item, i) => (
  <motion.div
    transition={{ duration: 0.5, delay: i * 0.15 }}
    // ...
  >
```

Each card has an increasing delay (`0 × 0.15`, `1 × 0.15`, `2 × 0.15`), so they cascade in from the side one after another.

---

### 3.8 Career Timeline Component

The career timeline is the most structurally complex component — an alternating left/right layout with a vertical line.

#### TypeScript Interface

```tsx
interface CareerEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  current?: boolean;  // optional flag for the current job
}
```

TypeScript interfaces act as **contracts** for your data. If you accidentally omit a field or pass the wrong type, the compiler catches it immediately.

#### Alternating Layout

```tsx
className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
}`}
```

- Even-indexed entries align left, odd-indexed entries align right
- On mobile (`flex-col`), everything stacks vertically

#### Timeline Visual Elements

```tsx
{/* Vertical line */}
<div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent-secondary to-accent/20" />

{/* Dot on the line */}
<div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-gradient-accent -translate-x-1/2 mt-6 z-10 ring-4 ring-background">
  {career.current && (
    <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-40" />
  )}
</div>
```

- The vertical line uses a gradient that transitions from accent → secondary → faded
- Each entry has a dot positioned on the line (`left-1/2` on desktop, `left-8` on mobile)
- The current job gets a `animate-ping` ripple effect — a pulsing ring that draws attention

---

### 3.9 Skills Component

The skills section uses a **2D data structure** (categories containing arrays of skills) rendered as a responsive grid.

```tsx
const skillCategories = [
  { title: "AI & GenAI", skills: ["Generative AI", "AI Agents", "LangChain", ...] },
  { title: "Data Science & ML", skills: ["Machine Learning", "EDA", ...] },
  // ... 6 categories
];
```

Each category becomes a glassmorphism card with skill pills inside:

```tsx
<div className="flex flex-wrap gap-2">
  {cat.skills.map((skill) => (
    <span className="px-3 py-1.5 text-sm rounded-lg bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors">
      {skill}
    </span>
  ))}
</div>
```

- `flex-wrap` — pills wrap to the next line if they overflow the container
- `bg-accent/10` — accent color at 10% opacity (subtle tint)
- `hover:bg-accent/20` — doubles the tint on hover for interactivity

---

### 3.10 Education Component

Uses a **two-column layout**: education entries on the left, certifications sidebar on the right.

```tsx
<div className="grid md:grid-cols-2 gap-8">
  {/* Left: Education entries */}
  <div className="space-y-6">
    {education.map((edu, i) => (
      <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
        {/* card content */}
      </motion.div>
    ))}
  </div>

  {/* Right: Certifications */}
  <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}>
    {/* cert list */}
  </motion.div>
</div>
```

- Left column slides in from the left (`x: -30`), right column from the right (`x: 30`) — creating a **split reveal** effect
- `space-y-6` adds consistent vertical spacing between education cards

---

### 3.11 Portfolio Placeholder Component

The portfolio section shows 4 "Coming Soon" cards with different icons. The key pattern here is the **icon-as-prop**:

```tsx
const placeholders = [
  { icon: Brain, title: "GenAI Solutions", description: "...", tag: "Coming Soon" },
  { icon: Database, title: "Data Pipelines", description: "...", tag: "Coming Soon" },
  // ...
];

<div className="p-3 rounded-xl bg-gradient-accent text-white w-fit mb-4 group-hover:scale-110 transition-transform">
  <item.icon size={24} />
</div>
```

- `item.icon` is a React component reference (not an instance) — we store the component class in data and instantiate it in the render
- `group-hover:scale-110` — when you hover the card (the `group`), the icon scales up 10%

---

### 3.12 Contact Component

Three contact cards in a grid, each linking to a different channel:

```tsx
<a href="mailto:arpit.shrestha93@gmail.com"
   className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-accent/5 border border-accent/10 hover-lift">
  <div className="p-3 rounded-xl bg-gradient-accent text-white">
    <Mail size={24} />
  </div>
  <h3 className="font-bold mb-1">Email</h3>
  <p className="text-sm text-muted break-all">arpit.shrestha93@gmail.com</p>
</a>
```

- The entire card is wrapped in an `<a>` tag — clicking anywhere on it opens the email client
- `break-all` ensures long email addresses wrap properly on small screens
- `hover-lift` gives the card the floating effect on hover

---

### 3.13 Digital Twin Chat (AI)

This is the most feature-rich component — a full chat interface backed by an AI API.

#### The API Route (Server-Side)

```tsx
// src/app/api/chat/route.ts
export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b:free",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 512,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  return NextResponse.json({ reply: data.choices[0].message.content });
}
```

How it works:
1. Receives the chat history as `{ messages: [...] }` from the client
2. Prepends a **system prompt** — a detailed description of Arpit's career that instructs the AI to answer as if it IS Arpit
3. Forwards everything to OpenRouter's API (which routes to the specified model)
4. Extracts the AI's reply and returns it as JSON

> **Why a server-side API route?** The API key lives on the server and is never exposed to the browser. If we called OpenRouter directly from the client, anyone could inspect the network tab and steal the key.

#### The System Prompt

The `SYSTEM_PROMPT` is the "brain" of the digital twin — it contains:

- Arpit's current and past roles with dates and descriptions
- Education history
- Certifications
- Skills list
- Contact information
- Personality instructions ("answer as if you ARE Arpit", "use first person")
- Guardrails ("politely redirect non-career questions")

This is a **retrieval-augmented generation (RAG)** pattern in its simplest form — we embed all relevant context directly in the prompt rather than using a vector database.

#### The Chat UI (Client-Side)

```tsx
const [messages, setMessages] = useState<Message[]>([
  { role: "assistant", content: "Hey! I'm Arpit's digital twin..." },
]);
const [input, setInput] = useState("");
const [loading, setLoading] = useState(false);
```

Three pieces of state:
- `messages` — the full conversation history
- `input` — the current text in the input field
- `loading` — whether we're waiting for an AI response

```tsx
const sendMessage = async (text?: string) => {
  const content = text || input.trim();
  if (!content || loading) return;

  const userMsg: Message = { role: "user", content };
  setMessages((prev) => [...prev, userMsg]);
  setInput("");
  setLoading(true);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [...messages, userMsg].map((m) => ({
          role: m.role, content: m.content,
        })),
      }),
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
  } catch {
    setMessages((prev) => [...prev, { role: "assistant", content: "Network error." }]);
  } finally {
    setLoading(false);
  }
};
```

The flow:
1. Create the user message and add it to state (so it appears immediately)
2. Send the **entire conversation history** to the API — this gives the AI context of what was already discussed
3. Add the AI's reply to state
4. `finally` block ensures `loading` is reset even if the request fails

#### Quick Suggestion Chips

```tsx
{messages.length <= 1 && (
  <div className="px-4 pb-2 flex flex-wrap gap-1.5">
    {SUGGESTIONS.map((s) => (
      <button onClick={() => sendMessage(s)}>
        {s}
      </button>
    ))}
  </div>
)}
```

Suggestions only appear when there's just the welcome message (`messages.length <= 1`). Once the user sends their first message, the suggestions disappear — they've served their purpose.

#### Auto-Scroll

```tsx
const bottomRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

// At the bottom of the messages list:
<div ref={bottomRef} />
```

An empty `<div>` at the bottom of the message list acts as a scroll anchor. Every time `messages` changes, we scroll it into view — keeping the latest message visible.

---

## 4. 5 Suggestions for Improvement

After reviewing the entire codebase, here are the most impactful improvements:

### 1. Add Streaming Responses to the Chat

**Current problem**: The user stares at "Thinking..." for 5-10 seconds while waiting for the full AI response. This feels slow.

**Fix**: Use OpenRouter's streaming API (`stream: true`) and render tokens as they arrive using Next.js's `ReadableStream` response. The user would see the reply typing out character-by-character, dramatically improving perceived speed.

```tsx
// In route.ts — enable streaming
body: JSON.stringify({
  model: "openai/gpt-oss-120b:free",
  messages: [...],
  stream: true,  // <-- add this
}),

// Return a ReadableStream instead of JSON
return new Response(stream, {
  headers: { "Content-Type": "text/event-stream" },
});
```

### 2. Extract Hardcoded Data into a Central Config

**Current problem**: Career data, skills, education, and the system prompt all contain the same information duplicated across multiple files. If Arpit gets a new job, you'd need to update `Career.tsx`, `Hero.tsx`, and `route.ts` separately.

**Fix**: Create a single `src/data/profile.ts` file that exports all profile data, and import it everywhere:

```tsx
// src/data/profile.ts
export const profile = {
  name: "Arpit Kulshrestha",
  currentRole: "Lead Data Science Engineer",
  currentCompany: "Fidelity Investments",
  email: "arpit.shrestha93@gmail.com",
  careers: [...],
  skills: [...],
  education: [...],
};

// Then in any component:
import { profile } from "@/data/profile";
```

### 3. Add Markdown Rendering to Chat Responses

**Current problem**: The AI often returns responses with `**bold**` and bullet points, but the chat displays them as raw text.

**Fix**: Install `react-markdown` and render the AI's replies as formatted Markdown:

```tsx
import ReactMarkdown from "react-markdown";

// In the message bubble:
<div className="...">
  <ReactMarkdown>{msg.content}</ReactMarkdown>
</div>
```

This would make AI responses with bold text, lists, and code blocks render beautifully.

### 4. Add Active Section Highlighting in the Navbar

**Current problem**: The navbar links don't indicate which section the user is currently viewing — there's no visual feedback about where you are on the page.

**Fix**: Use the `Intersection Observer API` to detect which section is in view and highlight the corresponding nav link:

```tsx
const [activeSection, setActiveSection] = useState("");

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
  return () => observer.disconnect();
}, []);

// In the nav link:
<a className={`... ${activeSection === link.href.slice(1) ? "text-accent" : ""}`}>
```

### 5. Add Responsive Font Scaling with CSS `clamp()`

**Current problem**: Font sizes use fixed breakpoints (`text-5xl md:text-7xl lg:text-8xl`), which can cause jarring jumps between screen sizes.

**Fix**: Use CSS `clamp()` for fluid typography that scales smoothly across all viewport widths:

```css
/* In globals.css */
.fluid-hero-title {
  font-size: clamp(2.5rem, 5vw + 1rem, 6rem);
}
```

This sets a minimum (2.5rem), a preferred value that scales with viewport (5vw + 1rem), and a maximum (6rem) — creating perfectly smooth scaling with zero breakpoint jumps.

---

*This tutorial covers a real, working portfolio website. Every code sample comes directly from the project. To see it live, run `npm run dev` in the `portfolio/` directory and open http://localhost:3000.*
