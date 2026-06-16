"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Code2, TrendingUp } from "lucide-react";
import SectionHeader from "../components/ui/SectionHeader";
import { workProcess } from "@/lib/portfolio-data";

const icons = [Search, PenTool, Code2, TrendingUp];

export default function HowIWork() {
  return (
    <section id="how-i-work" className="relative py-20 md:py-28 px-4 section-divider">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Process"
          title="How I work"
          description="A product-minded approach — from understanding requirements to shipping polished frontend systems."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {workProcess.map((item, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={item.step}
                className="glass-card p-6 relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="section-label text-4xl font-bold text-accent/20 absolute top-4 right-4">
                  {item.step}
                </span>
                <div className="w-11 h-11 rounded-xl bg-accent-soft flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                  <Icon className="text-accent group-hover:text-white transition-colors" size={22} />
                </div>
                <h3 className="text-lg font-semibold text-main mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed mb-3">{item.description}</p>
                <p className="text-xs text-muted/70 font-mono">{item.anchor}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
