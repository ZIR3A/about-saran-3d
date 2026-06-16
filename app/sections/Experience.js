"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";
import SectionHeader from "../components/ui/SectionHeader";
import { experiences, education } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

const milestones = [
  { icon: Briefcase, title: "20+ Projects", description: "Built web apps for various clients" },
  { icon: Award, title: "4+ Years Exp", description: "Professional frontend development" },
  {
    icon: GraduationCap,
    title: education[0].degree,
    description: education[0].school,
  },
];

function extractTechTerms(description) {
  const terms = description.match(
    /[A-Z][A-Za-z0-9.+#\s-]*(?:\.js|JS|TS|UI|SSR|API|SQL|HTML|CSS|IPTV)?|[A-Z]{2,}/g
  );
  if (!terms) return [];
  return [...new Set(terms.map((t) => t.trim()).filter((t) => t.length > 1))].slice(0, 6);
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 md:py-28 px-4 section-divider">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Journey"
          title="My path so far"
          description="From learning the basics to building production-grade applications."
        />

        <div className="space-y-6">
          {experiences.map((exp, index) => {
            const isCurrent = exp.period.includes("Present");
            const techTerms = extractTechTerms(exp.description);

            return (
              <motion.article
                key={exp.title + exp.period}
                className={cn(
                  "glass-card p-6 md:p-8",
                  isCurrent && "border-accent/40 shadow-lg shadow-accent/5"
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                  <div>
                    {isCurrent && (
                      <span className="inline-block px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-accent-soft text-accent rounded mb-2">
                        Current
                      </span>
                    )}
                    <h3 className="text-xl font-semibold text-main">{exp.title}</h3>
                    <p className="text-muted mt-1">
                      {exp.company}
                      {exp.location ? ` · ${exp.location}` : ""}
                    </p>
                  </div>
                  <span className="section-label text-xs text-accent font-medium shrink-0">
                    {exp.period}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="section-label text-[11px] uppercase tracking-wider text-accent mb-2">
                      Impact
                    </p>
                    <p className="text-sm text-muted leading-relaxed">{exp.description}</p>
                  </div>
                  <div>
                    <p className="section-label text-[11px] uppercase tracking-wider text-accent mb-2">
                      Responsibilities
                    </p>
                    <p className="text-sm text-muted leading-relaxed">
                      {exp.title} at {exp.company}: {exp.description}
                    </p>
                  </div>
                  <div>
                    <p className="section-label text-[11px] uppercase tracking-wider text-accent mb-2">
                      Technical contribution
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {techTerms.length > 0 ? (
                        techTerms.map((term) => (
                          <span
                            key={term}
                            className="px-2 py-0.5 text-[11px] text-muted border border-line rounded-md bg-base/40"
                          >
                            {term}
                          </span>
                        ))
                      ) : (
                        <p className="text-sm text-muted leading-relaxed">{exp.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          className="mt-14 grid sm:grid-cols-3 gap-4 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {milestones.map((milestone) => (
            <div key={milestone.title} className="glass-card p-6 text-center">
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
