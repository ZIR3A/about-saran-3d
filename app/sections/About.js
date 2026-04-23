"use client";

import { motion } from "framer-motion";
import { Code2, Layout, Zap } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Frontend",
    description:
      "Building fast, scalable apps with React & Next.js.",
  },
  {
    icon: Layout,
    title: "UI/UX",
    description:
      "Creating clean interfaces users love.",
  },
  {
    icon: Zap,
    title: "Performance",
    description:
      "Optimizing every millisecond.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-4 block">
            About
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-main mb-6">
            Building things that work
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            Frontend Engineer with 4+ years creating web apps that are fast, accessible, and clean.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              className="group p-6 glass-card hover:border-accent/50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center mb-4 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                <item.icon className="text-accent group-hover:text-white transition-colors" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-main mb-2">{item.title}</h3>
              <p className="text-muted leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 p-6 glass-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-main mb-4">How I work</h3>
          <div className="grid sm:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-muted">Clean code</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-muted">User-centered</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-muted">Modern stack</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-muted">Fast performance</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}