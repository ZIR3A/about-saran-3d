"use client";

import { motion } from "framer-motion";
import { ExternalLink, Globe, ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "Portfolio Website",
    description:
      "A personal portfolio showcasing my work as a frontend engineer. Features smooth animations, responsive design, and optimized performance.",
    tech: ["GSAP"],
    highlight: "Performance",
    year: "2024",
    live: "https://saranbaral.com.np/",
    github: null,
  },
{
    name: "LMS Platform",
    description:
      "E-learning platform with student, teacher & admin dashboards. Features course enrollment with eSewa/Khalti payments and progress tracking.",
    tech: ["Next.js", "Node.js", "MongoDB"],
    highlight: "Scalability",
    year: "2025",
    live: "https://lms-chi-six.vercel.app/",
    github: null,
  },
  {
    name: "Eye Wear-SaaS",
    description:
      "Modern eyewear shopping with virtual try-on. SSR & SSG for fast loading with smooth animations.",
    tech: ["Next.js", "MongoDB", "Tailwind CSS", "Framer Motion"],
    highlight: "UI System",
    year: "2025",
    live: "https://eye-can-see-you.vercel.app/",
    github: null,
  },
  {
    name: "Oneplus Pad Clone",
    description:
      "Responsive product site with smooth animations and attractive visuals.",
    tech: ["HTML", "SCSS", "GSAP.js"],
    highlight: "Performance",
    year: "2025",
    live: "https://oneplus-clone-mu.vercel.app/",
    github: null,
  },
  {
    name: "Smart Home Interior",
    description:
      "Modern smart home showcase with interactive layouts and sleek animations.",
    tech: ["HTML", "SCSS"],
    highlight: "UI Design",
    year: "2025",
    live: "https://smart-home-designs.vercel.app/",
    github: null,
  },
  {
    name: "E-Commerce Template",
    description:
      "Modern e-commerce homepage with product search. SSR for fast performance & SEO.",
    tech: ["Next.js", "Tailwind CSS", "SSR"],
    highlight: "Performance",
    year: "2025",
    live: "https://new-ecom-kappa.vercel.app/",
    github: null,
  },
  {
    name: "Admin Dashboard",
    description:
      "Clean admin panel template built with React & Tailwind. Responsive and optimized.",
    tech: ["React.js", "Tailwind CSS", "Flowbite"],
    highlight: "UI Design",
    year: "2025",
    live: "https://dashboard-saran.vercel.app/",
    github: null,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-20 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-4 block">
            Projects
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-main mb-6">
            Selected work
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            Projects I&apos;ve built, each with its own solution.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              className="group relative p-6 glass-card hover:border-accent/50 transition-colors overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-colors" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs text-accent font-medium">{project.year}</span>
                    <h3 className="text-xl font-semibold text-main group-hover:text-accent transition-colors mt-1">
                      {project.name}
                    </h3>
                  </div>
                  <div className="px-2 py-1 text-xs font-medium bg-accent-soft text-accent rounded-full">
                    {project.highlight}
                  </div>
                </div>

                <p className="text-muted mb-4 line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs text-muted glass-card"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors"
                    >
                      <ExternalLink size={14} />
                      Live
                      <ArrowUpRight size={12} />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-main transition-colors"
                    >
                      <Globe size={14} />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="https://github.com/ZIR3A"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors"
          >
            View all projects on GitHub
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}