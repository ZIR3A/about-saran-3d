"use client";

import { motion } from "framer-motion";
import { Code2, Layers, Lightbulb, Wrench } from "lucide-react";
import SectionHeader from "../components/ui/SectionHeader";
import { skillCategories, skillsFamiliarWith } from "@/lib/portfolio-data";

const icons = [Code2, Layers, Lightbulb, Wrench];

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 md:py-28 px-4 section-divider">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Skills"
          title="What I work with"
          description="Tools I use to build great web experiences."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {skillCategories.map((cat, catIndex) => {
            const Icon = icons[catIndex];
            return (
              <motion.div
                key={cat.category}
                className="glass-card p-6 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: catIndex * 0.08 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center group-hover:bg-accent transition-colors">
                    <Icon className="text-accent group-hover:text-white transition-colors" size={20} />
                  </div>
                  <h3 className="text-[1rem] font-semibold text-main leading-tight">{cat.category}</h3>
                </div>
                <ul className="space-y-2">
                  {cat.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2 text-sm text-muted"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          className="mt-10 text-center text-sm text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Also familiar with: {skillsFamiliarWith}
        </motion.p>
      </div>
    </section>
  );
}
