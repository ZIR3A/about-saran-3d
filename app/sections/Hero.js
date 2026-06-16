"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Download } from "lucide-react";
import { useScrollTo } from "@/lib/lenis-context";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { heroExpertise, personalProfile } from "@/lib/portfolio-data";
import { RESUME_PDF, RESUME_PDF_DOWNLOAD_NAME } from "@/lib/constants";
import Button from "../components/ui/Button";

export default function Hero() {
  const scrollTo = useScrollTo();
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 py-24 md:py-28 overflow-hidden"
    >
      <div className="scanlines scanlines-hero" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-base via-base/95 to-transparent z-10 pointer-events-none md:max-w-[65%]" />

      <div className="relative z-20 max-w-7xl mx-auto w-full">
        <div className="max-w-2xl lg:max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.6 }}
            className="mb-5"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-soft border border-accent/30 text-accent text-sm font-medium font-mono">
              <Sparkles size={14} />
              Available for projects
            </span>
          </motion.div>

          <motion.p
            className="section-label text-accent text-sm font-semibold tracking-widest uppercase mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.5 }}
          >
            {personalProfile.role}
          </motion.p>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-main tracking-tight mb-5 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.1 }}
          >
            Hi, I&apos;m{" "}
            <span className="text-accent">Saran Baral</span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl md:text-3xl text-main font-medium max-w-2xl mb-4 text-balance leading-snug"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.15 }}
          >
            {personalProfile.headline}
          </motion.p>

          <motion.p
            className="text-[1rem] sm:text-lg text-muted max-w-xl mb-6 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.2 }}
          >
            {personalProfile.bio}{" "}
            <span className="text-main">{personalProfile.aboutSummary}</span>
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.25 }}
          >
            {heroExpertise.map((item) => (
              <span
                key={item}
                className="px-3 py-1 text-xs font-medium text-muted border border-line rounded-full bg-surface/50"
              >
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.3 }}
          >
            <Button onClick={() => scrollTo("#projects")} variant="primary">
              View Work
              <ArrowRight size={18} />
            </Button>
            <Button
              href={encodeURI(RESUME_PDF)}
              download={RESUME_PDF_DOWNLOAD_NAME}
              variant="secondary"
            >
              <Download size={18} />
              Download Resume
            </Button>
            <Button onClick={() => scrollTo("#contact")} variant="secondary">
              Contact Me
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reducedMotion ? 0 : 1, duration: reducedMotion ? 0 : 0.5 }}
      >
        <span className="text-muted text-xs tracking-widest uppercase font-mono hidden sm:block">
          Scroll
        </span>
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-line flex items-start justify-center p-1.5"
          animate={reducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={reducedMotion ? undefined : { duration: 1.5, repeat: Infinity }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
