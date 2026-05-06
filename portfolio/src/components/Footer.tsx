"use client";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-card-border">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Arpit Kulshrestha. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="mailto:arpit.shrestha93@gmail.com"
            className="text-sm text-muted hover:text-accent transition-colors"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/arpit-kulshrestha-4a39a788"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
