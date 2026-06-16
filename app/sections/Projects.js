"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "../components/ui/SectionHeader";
import ProjectCard from "../components/ProjectCard";
import { featuredProjects, otherProjects } from "@/lib/portfolio-data";

export default function Projects() {
  return (
    <section id="projects" className="relative py-20 md:py-28 px-4 section-divider">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Projects"
          title="Personal work"
          description="Projects I've built, each with its own solution."
        />

        <div className="mb-14">
          <h3 className="section-label text-sm font-semibold text-main uppercase tracking-wider mb-6 flex items-center gap-3">
            <span className="h-px flex-1 max-w-12 bg-accent" />
            Featured Projects
          </h3>
          <div className="space-y-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.name} project={project} featured index={index} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="section-label text-sm font-semibold text-main uppercase tracking-wider mb-6 flex items-center gap-3">
            <span className="h-px flex-1 max-w-12 bg-line" />
            Other Projects
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {otherProjects.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index} />
            ))}
          </div>
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <a
            href="https://github.com/ZIR3A"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors font-medium"
          >
            View all projects on GitHub
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
