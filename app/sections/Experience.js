"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "Frontend Developer | Intern",
    company: "Aarambha IT Research Center",
    period: "Mar 2021 to Apr 2021",
    description: "Built a responsive food order system dashboard using HTML, CSS, and JavaScript.",
  },
  {
    type: "work",
    title: "Fullstack Developer | JavaScript",
    company: "Suryaghat Organization",
    period: "Apr 2021 to Sep 2021",
    description: "Developed an E-Library Platform with React.js and Express.js, designed SQL databases.",
  },
  {
    type: "learning",
    title: "Frontend Developer (React JS)",
    company: "DCube Solutions Pvt. Ltd",
    period: "Sep 2021 to Dec 2021",
    description: "Migrated Angular CRM portal to React with Material-UI and TypeScript.",
  },
  {
    type: "learning",
    title: "Full Stack Engineer (Next.js)",
    company: "Kush Tech Nepal",
    period: "Oct 2025 to Present",
    description: "Building full-stack web apps with SSR, API routes, auth, and state management.",
  },
  {
    type: "learning",
    title: "Software Engineer",
    company: "Genius Systems Pvt. Ltd.",
    period: "Feb 2022 to Present",
    description: "Delivered IPTV portals, ticketing systems, and support platforms.",
  },
];

const milestones = [
  { icon: Briefcase, title: "20+ Projects", description: "Built web apps for various clients" },
  { icon: Award, title: "4+ Years Exp", description: "Professional frontend development" },
  { icon: GraduationCap, title: "Always Learning", description: "Staying updated with web tech" },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div className="mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
          <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-4 block">Journey</span>
          <h2 className="text-3xl md:text-5xl font-bold text-main mb-6">My path so far</h2>
          <p className="text-lg text-muted max-w-2xl">From learning the basics to building production-grade applications.</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-line md:-translate-x-px" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div key={exp.title + exp.period} className="relative flex items-start gap-6 md:gap-8" initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-accent md:-translate-x-px -translate-y-1" />
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"}`}>
                  <div className="p-6 glass-card hover:border-accent/50 transition-colors">
                    <span className="text-xs text-accent font-medium block mb-2">{exp.period}</span>
                    <h3 className="text-lg font-semibold text-main mb-1">{exp.title}</h3>
                    <p className="text-muted text-sm mb-2">{exp.company}</p>
                    <p className="text-muted text-sm">{exp.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div className="mt-16 grid sm:grid-cols-3 gap-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.3 }}>
          {milestones.map((milestone, index) => (
            <div key={milestone.title} className="p-6 glass-card text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-accent-soft flex items-center justify-center">
                <milestone.icon className="text-accent" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-main mb-2">{milestone.title}</h3>
              <p className="text-sm text-muted">{milestone.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}