"use client";

import { motion } from "framer-motion";
import { Code2, Layout, Zap } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Frontend Development",
    description:
      "Building performant, scalable applications with React, Next.js, and modern JavaScript. Optimizing for speed and user experience.",
  },
  {
    icon: Layout,
    title: "UI/UX Design",
    description:
      "Creating intuitive, accessible interfaces that users love. Focusing on clean design systems and seamless interactions.",
  },
  {
    icon: Zap,
    title: "Performance",
    description:
      "Optimizing every millisecond. From bundle size to runtime performance, ensuring lightning-fast experiences.",
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
            About Me
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-main mb-6">
            Crafting digital experiences that matter
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            I&apos;m a Frontend Engineer with over 4+ years of experience building
            web applications. I specialize in creating clean, efficient, and
            user-centered digital products that solve real problems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              className="group p-6 rounded-2xl bg-surface border border-line hover:border-accent/50 transition-colors"
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
          className="mt-12 p-6 rounded-2xl bg-surface border border-line"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-main mb-4">My Approach</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-muted">Clean architecture</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-muted">User-first design</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-muted">Modern tech stack</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}