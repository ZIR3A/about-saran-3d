"use client";

import { motion } from "framer-motion";

export default function SectionHeader({
  label,
  title,
  description,
  align = "left",
  className = "",
}) {
  const alignClass =
    align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.div
      className={`mb-12 md:mb-16 max-w-3xl ${alignClass} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {label && (
        <span className="section-label text-accent text-sm font-semibold tracking-wider uppercase mb-4 block">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-main mb-4 tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted leading-relaxed text-pretty">{description}</p>
      )}
    </motion.div>
  );
}
