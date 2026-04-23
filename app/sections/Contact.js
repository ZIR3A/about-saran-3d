"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone, Globe, Link } from "lucide-react";

const socialLinks = [
  { icon: Globe, href: "https://github.com/ZIR3A", label: "GitHub" },
  { icon: Link, href: "https://www.linkedin.com/in/saran-baral-708046210/", label: "LinkedIn" },
  { icon: Globe, href: "https://www.facebook.com/sharanbrl", label: "Facebook" },
];

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", email: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div className="mb-16 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
          <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-4 block">Contact</span>
          <h2 className="text-3xl md:text-5xl font-bold text-main mb-6">Let&apos;s build something great</h2>
          <p className="text-lg text-muted max-w-xl mx-auto">Have an idea or project? I&apos;d love to hear about it. Let&apos;s create something amazing together.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center flex-shrink-0">
                  <Mail className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-main mb-1">Email</h3>
                  <a href="mailto:saranbrl35@gmail.com" className="text-muted hover:text-accent transition-colors">saranbrl35@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-main mb-1">Location</h3>
                  <p className="text-muted">available for remote work worldwide</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center flex-shrink-0">
                  <Phone className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-main mb-1">Social</h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors" aria-label={social.label}>
                        <social.icon size={20} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <motion.div className="mt-8 p-6 rounded-2xl bg-surface border border-line" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <h3 className="text-lg font-semibold text-main mb-2">Availability</h3>
              <p className="text-muted text-sm mb-3">Currently available for freelance projects and full-time positions.</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-muted">Ready to discuss your project</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.1 }}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted mb-2">Name</label>
                <input type="text" id="name" name="name" value={formState.name} onChange={handleChange} required className="w-full px-4 py-3 bg-surface border border-line rounded-xl text-main placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors" placeholder="Your name" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted mb-2">Email</label>
                <input type="email" id="email" name="email" value={formState.email} onChange={handleChange} required className="w-full px-4 py-3 bg-surface border border-line rounded-xl text-main placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors" placeholder="your@email.com" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted mb-2">Message</label>
                <textarea id="message" name="message" value={formState.message} onChange={handleChange} required rows={5} className="w-full px-4 py-3 bg-surface border border-line rounded-xl text-main placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors resize-none" placeholder="Tell me about your project..." />
              </div>

              <motion.button type="submit" disabled={isSubmitting} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" whileHover={{ scale: isSubmitting ? 1 : 1.02 }} whileTap={{ scale: isSubmitting ? 1 : 0.98 }}>
                {isSubmitting ? (
                  <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>
                ) : isSubmitted ? (
                  <><span className="text-green-400">Message sent!</span></>
                ) : (
                  <>Send Message<Send size={18} /></>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}