"use client";

import { motion } from "framer-motion";
import { ArrowUp, Globe, Link, Share2, Mail } from "lucide-react";
import { SOCIAL_LINKS, CONTACT_EMAIL } from "@/lib/constants";
import { useScrollTo } from "@/lib/lenis-context";

const SOCIAL_ICONS = {
  GitHub: Globe,
  LinkedIn: Link,
  Facebook: Share2,
};

export default function Footer() {
  const scrollTo = useScrollTo();

  return (
    <footer className="relative py-12 md:py-16 border-t border-line bg-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            className="flex flex-col items-center md:items-start gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xl font-bold tracking-tight">
              <span className="text-main">SB</span>
              <span className="text-accent">.</span>
            </span>
            <p className="text-sm text-muted">
              Frontend Engineer | Building fast web apps
            </p>
          </motion.div>

          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social, index) => {
              const Icon = SOCIAL_ICONS[social.label] ?? Mail;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted hover:text-main transition-colors"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
            <motion.a
              href={`mailto:${CONTACT_EMAIL}`}
              className="p-2 text-muted hover:text-main transition-colors"
              aria-label="Email"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Mail size={20} />
            </motion.a>
          </div>

          <motion.button
            onClick={() => scrollTo("#hero", { offset: 0 })}
            className="p-3 text-muted hover:text-main transition-colors border border-line hover:border-accent rounded-full cursor-pointer"
            aria-label="Scroll to top"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>

        <motion.div
          className="mt-8 pt-8 border-t border-line flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p>&copy; 2026 Saran Baral. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
