"use client";

import { motion } from "framer-motion";
import { Code2, Layout, Zap } from "lucide-react";
import SectionHeader from "../components/ui/SectionHeader";
import { aboutHighlights, personalProfile } from "@/lib/portfolio-data";

const icons = [Code2, Layout, Zap];

export default function About() {
  return (
    <section id="about" className="relative py-20 md:py-28 px-4 section-divider">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="About"
          title="Building things that work"
          description={personalProfile.aboutSummary}
        />

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {aboutHighlights.map((item, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={item.title}
                className="group glass-card p-6 md:p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center mb-5 group-hover:bg-accent transition-colors">
                  <Icon className="text-accent group-hover:text-white transition-colors" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-main mb-2">{item.title}</h3>
                <p className="text-muted leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
