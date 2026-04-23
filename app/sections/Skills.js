"use client";

import { motion } from "framer-motion";
import { Code2, Wrench, Lightbulb } from "lucide-react";

const skillCategories = [
  {
    category: "Frontend",
    icon: Code2,
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "HTML/CSS", level: 95 },
    ],
  },
  {
    category: "Tools",
    icon: Wrench,
    skills: [
      { name: "Git", level: 85 },
      { name: "Figma", level: 80 },
      { name: "VS Code", level: 95 },
      { name: "Chrome DevTools", level: 90 },
      { name: "npm/yarn", level: 90 },
    ],
  },
  {
    category: "Concepts",
    icon: Lightbulb,
    skills: [
      { name: "Performance Optimization", level: 85 },
      { name: "UI/UX Principles", level: 90 },
      { name: "Responsive Design", level: 95 },
      { name: "Web Accessibility", level: 85 },
      { name: "Clean Code", level: 90 },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-4 block">
            Skills
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-main mb-6">
            Technologies I work with
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            A curated set of tools and technologies I use to bring ideas to life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.category}
              className="group p-6 rounded-2xl bg-base border border-line hover:border-accent/50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center group-hover:bg-accent transition-colors">
                  <cat.icon className="text-accent group-hover:text-white" size={20} />
                </div>
                <h3 className="text-xl font-semibold text-main">{cat.category}</h3>
              </div>

              <div className="space-y-4">
                {cat.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="space-y-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: catIndex * 0.1 + skillIndex * 0.05,
                    }}
                  >
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">{skill.name}</span>
                      <span className="text-muted/60">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-line overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-accent to-accent/60"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.8,
                          delay: catIndex * 0.1 + skillIndex * 0.05,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="text-muted text-sm self-center mr-2">Also familiar with:</span>
          {["TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker"].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 text-sm text-muted bg-base border border-line rounded-full hover:border-accent/50 transition-colors"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}