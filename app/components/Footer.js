"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, ArrowUp, Link, Globe } from "lucide-react";

const socialLinks = [
  { icon: Globe, href: "https://github.com", label: "GitHub" },
  { icon: Link, href: "https://linkedin.com/in/saranbaral", label: "LinkedIn" },
  { icon: Globe, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:saranbaral@email.com", label: "Email" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
              <span className="text-main">SB</span><span className="gradient-text">.</span>
            </span>
            <p className="text-sm text-muted">
              Frontend Engineer | Building fast web apps
            </p>
          </motion.div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
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
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>

          <motion.button
            onClick={scrollToTop}
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
          <p>&copy; {new Date().getFullYear()} Saran Baral. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}