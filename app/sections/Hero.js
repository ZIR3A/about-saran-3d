"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-transparent z-10" />

      <div className="relative z-20 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-soft border border-accent/30 text-accent text-sm font-medium">
            <Sparkles size={14} />
            Available for projects
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl lg:text-7xl font-bold text-main tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Hi, I&apos;m{" "}
          <span className="text-accent">
            Saran Baral
          </span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-muted max-w-3xl mx-auto mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Frontend Engineer building{" "}
          <span className="text-main">fast, intuitive web experiences</span>.
        </motion.p>

        <motion.p
          className="text-base sm:text-lg text-muted/70 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          4+ years crafting modern web apps with React & Next.js.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            onClick={() => scrollToSection("#projects")}
            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-full overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              View Work
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </span>
            <motion.div
              className="absolute inset-0 bg-accent/80"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            onClick={() => scrollToSection("#contact")}
            className="inline-flex items-center gap-2 px-6 py-3 border border-line text-main font-semibold rounded-full hover:border-accent hover:text-accent transition-colors cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Me
          </motion.button>
        </motion.div>

        
      </div>

      <motion.div
          className="absolute bottom-8 sm:bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <span className="text-muted text-xs sm:text-sm tracking-widest uppercase">Scroll down</span>
          <motion.div
            className="w-6 sm:w-8 h-10 sm:h-14 rounded-full border-2 border-line flex items-start justify-center p-1 sm:p-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-accent" />
          </motion.div>
          <motion.div
            className="absolute -bottom-8 sm:-bottom-12 left-1/2 -translate-x-1/2 w-px h-6 sm:h-8 bg-line"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          />
        </motion.div>
    </section>
  );
}