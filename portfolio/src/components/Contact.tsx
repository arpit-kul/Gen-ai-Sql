"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, ExternalLink } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-muted max-w-lg mx-auto">
            Looking to collaborate on data-driven innovations or discuss how AI can
            revolutionize your business? Let&apos;s connect.
          </p>
          <div className="w-20 h-1 bg-gradient-accent mx-auto rounded-full mt-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <a
              href="mailto:arpit.shrestha93@gmail.com"
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-accent/5 border border-accent/10 hover-lift text-center"
            >
              <div className="p-3 rounded-xl bg-gradient-accent text-white">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold mb-1">Email</h3>
                <p className="text-sm text-muted break-all">
                  arpit.shrestha93@gmail.com
                </p>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/arpit-kulshrestha-4a39a788"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-accent/5 border border-accent/10 hover-lift text-center"
            >
              <div className="p-3 rounded-xl bg-gradient-accent text-white">
                <ExternalLink size={24} />
              </div>
              <div>
                <h3 className="font-bold mb-1">LinkedIn</h3>
                <p className="text-sm text-muted">Connect professionally</p>
              </div>
            </a>

            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-accent/5 border border-accent/10 text-center">
              <div className="p-3 rounded-xl bg-gradient-accent text-white">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold mb-1">Location</h3>
                <p className="text-sm text-muted">Bengaluru, Karnataka, India</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
