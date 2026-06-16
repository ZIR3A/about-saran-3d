"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import ProjectPreview from "./ProjectPreview";

function CaseStudyBlock({ label, children }) {
  return (
    <div>
      <p className="section-label text-[11px] uppercase tracking-wider text-accent mb-1.5">
        {label}
      </p>
      <div className="text-sm text-muted leading-relaxed">{children}</div>
    </div>
  );
}

export default function ProjectCard({ project, featured = false, index = 0 }) {
  if (featured) {
    return (
      <motion.article
        className="group glass-card overflow-hidden"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        <div className="grid lg:grid-cols-2 gap-0">
          <ProjectPreview project={project} featured className="rounded-none border-0 border-r border-line lg:min-h-[320px]" />
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs text-accent font-medium font-mono">{project.year}</span>
              <span className="px-2 py-0.5 text-xs font-medium bg-accent-soft text-accent rounded-full">
                {project.highlight}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-main mb-4 group-hover:text-accent transition-colors">
              {project.name}
            </h3>
            <div className="space-y-4 mb-6">
              <CaseStudyBlock label="Overview">{project.description}</CaseStudyBlock>
              <CaseStudyBlock label="Focus Area">{project.highlight}</CaseStudyBlock>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((tech) => (
                <span key={tech} className="px-2.5 py-1 text-xs text-muted border border-line rounded-md bg-base/50">
                  {tech}
                </span>
              ))}
            </div>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-main transition-colors w-fit"
            >
              <ExternalLink size={16} />
              View live product
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      className="group glass-card overflow-hidden flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <ProjectPreview project={project} className="rounded-none border-0 border-b border-line" />
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className="text-xs text-accent font-mono">{project.year}</span>
            <h3 className="text-lg font-semibold text-main mt-1 group-hover:text-accent transition-colors">
              {project.name}
            </h3>
          </div>
          <span className="shrink-0 px-2 py-0.5 text-[10px] font-medium bg-accent-soft text-accent rounded-full">
            {project.highlight}
          </span>
        </div>
        <p className="text-sm text-muted mb-4 line-clamp-3 flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((tech) => (
            <span key={tech} className="px-2 py-0.5 text-[11px] text-muted border border-line rounded-md">
              {tech}
            </span>
          ))}
        </div>
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors mt-auto"
          )}
        >
          <ExternalLink size={14} />
          Live
          <ArrowUpRight size={12} />
        </a>
      </div>
    </motion.article>
  );
}
