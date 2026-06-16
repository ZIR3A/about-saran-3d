"use client";

import { motion } from "framer-motion";
import { Gauge, Layers, Users, Accessibility, FileCode2, Expand } from "lucide-react";
import SectionHeader from "../components/ui/SectionHeader";
import { engineeringPrinciples } from "@/lib/portfolio-data";

const icons = [Gauge, Layers, Users, Accessibility, FileCode2, Expand];

export default function EngineeringPrinciples() {
  return (
    <section id="principles" className="relative py-20 md:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Principles"
          title="Engineering principles"
          description="The standards I apply when building professional digital products."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {engineeringPrinciples.map((principle, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={principle.title}
                className="glass-card p-6 group"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <div className="w-10 h-10 rounded-lg bg-accent-soft flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                  <Icon className="text-accent group-hover:text-white transition-colors" size={20} />
                </div>
                <h3 className="text-[1rem] font-semibold text-main mb-2">{principle.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{principle.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
