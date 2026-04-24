"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const [mobileScrolled, setMobileScrolled] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsScrolled(latest > 0.1);
    setMobileScrolled(latest > 0.05);
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-base/80 backdrop-blur-xl"
            : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.a
              href="#"
              className="text-xl md:text-2xl font-bold tracking-tight"
              whileHover={{ scale: 1.02 }}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="text-main">SB</span><span className="gradient-text">.</span>
            </motion.a>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-muted hover:text-main text-sm font-medium transition-colors relative group"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </div>

            <motion.button
              className="md:hidden p-2 text-main cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-accent"
          style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
        />
      </motion.nav>

      <motion.div
        className={cn(
          "fixed top-16 md:top-20 left-0 right-0 z-40 md:hidden transition-all duration-300",
          mobileScrolled
            ? "bg-base/80 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-accent"
          style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
        />
      </motion.div>

      <motion.div
        className={cn(
          "fixed inset-0 z-40 bg-base/95 backdrop-blur-xl md:hidden transition-transform duration-300",
          isMobileMenuOpen ? "translate-y-0" : "translate-y-full"
        )}
        initial={{ y: "100%" }}
        animate={{ y: isMobileMenuOpen ? 0 : "100%" }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="text-2xl font-semibold text-main"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: isMobileMenuOpen ? 0 : 20 }}
              transition={{ delay: index * 0.1 }}
            >
              {link.name}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </>
  );
}