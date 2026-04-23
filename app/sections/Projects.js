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
    name: "E-Learing SaaS Platform",
    description:
      "An interactive e-learning platform built with Next.js and MongoDB, featuring three distinct dashboards for students, teachers, and admins. The platform includes a student enrollment system with secure payment integration (eSewa and Khalti). It leverages Next.js optimizations like SSR and ISR for fast, dynamic pages. Students can track their course progress, while all users benefit from a modern, responsive interface.",
    tech: ["Next.js", "Node.js", "MongoDB"],
    highlight: "Scalability",
    year: "2025",
    live: "https://lms-chi-six.vercel.app/",
    github: null,
  },
  {
    name: "Eye Wear-SaaS Platform",
    description:
      "Eye Wear-SaaS is a modern web application offering a seamless eyewear shopping experience. It features a virtual glass try-on capability, allowing users to visually sample eyewear online before making a purchase. Leveraging Next.js for server-side rendering and static site generation, Tailwind CSS for rapid styling, and Motion for fluid animations.",
    tech: ["Next.js", "MongoDB", "Tailwind CSS", "Framer Motion", "Virtual Glass Try-On"],
    highlight: "UI System",
    year: "2025",
    live: "https://eye-can-see-you.vercel.app/",
    github: null,
  },
  {
    name: "Oneplus Pad Site Clone",
    description:
      "This project is a sleek and responsive with attractive visuals and UI experiences. It features a modern UI with smooth animations and is fully responsive across devices.",
    tech: ["HTML", "SCSS", "GSAP.js"],
    highlight: "Performance",
    year: "2025",
    live: "https://oneplus-clone-mu.vercel.app/",
    github: null,
  },
  {
    name: "Modern House Interior",
    description:
      "Explore cutting-edge smart home interior designs with our HTML & CSS development services. We create responsive, visually stunning web pages showcasing modern, automated home solutions. Our designs feature interactive layouts, sleek animations, and user-friendly navigation to highlight innovative interiors. Perfect for designers, developers, and tech enthusiasts.",
    tech: ["HTML", "SCSS"],
    highlight: "Performance",
    year: "2025",
    live: "https://smart-home-designs.vercel.app/",
    github: null,
  },
  {
    name: "E-Commerce Template",
    description:
      "This project is a modern E-Commerce Homepage built with Next.js and styled using Tailwind CSS. It features a product search functionality and leverages Server-Side Rendering (SSR) for enhanced performance and SEO. The homepage is designed to provide a seamless user experience, with a clean and responsive layout suitable for online stores.",
    tech: ["Next.js", "Tailwind CSS", "SSR"],
    highlight: "Performance",
    year: "2025",
    live: "https://new-ecom-kappa.vercel.app/",
    github: null,
  },
  {
    name: "Admin Dashboard Panel",
    description:
      "This project is a sleek and responsive Admin Panel Dashboard Template built with React.js and styled using Tailwind CSS. It incorporates Flowbite, a UI component library, to deliver a modern and intuitive user interface. The template is designed for ease of use and customization, making it ideal for managing data, analytics, or backend operations. Fully responsive and optimized for performance, it ensures a seamless experience across devices.",
    tech: ["React.js", "Tailwind CSS", "Flowbite"],
    highlight: "Performance",
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
            Featured work
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            A selection of projects I&apos;ve worked on, each solving unique challenges
            with thoughtful solutions.
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