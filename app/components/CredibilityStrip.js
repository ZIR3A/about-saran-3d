"use client";

import { motion } from "framer-motion";
import { credibilityMetrics } from "@/lib/portfolio-data";

export default function CredibilityStrip() {
  return (
    <section
      id="credibility"
      className="relative z-20 border-y border-line bg-surface/40 backdrop-blur-sm"
      aria-label="Professional credibility metrics"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {credibilityMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <p className="text-2xl md:text-3xl font-bold text-main tracking-tight">
                {metric.value}
              </p>
              <p className="text-sm font-medium text-main mt-1">{metric.label}</p>
              <p className="text-xs text-muted mt-1 leading-relaxed">{metric.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
