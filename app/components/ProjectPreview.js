"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProjectPreview({ project, featured = false, className }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-line bg-surface group/preview",
        featured ? "aspect-[16/10]" : "aspect-[16/9]",
        className
      )}
    >
      <div className="absolute top-0 left-0 right-0 h-8 bg-base/90 border-b border-line flex items-center gap-1.5 px-3 z-10">
        <span className="w-2.5 h-2.5 rounded-full bg-accent/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-muted/40" />
        <span className="w-2.5 h-2.5 rounded-full bg-muted/40" />
        <span className="ml-2 text-[10px] text-muted font-mono truncate flex-1">
          {project.live.replace(/^https?:\/\//, "")}
        </span>
      </div>

      {project.image && !imgError ? (
        <Image
          src={project.image}
          alt={`${project.name} preview`}
          fill
          sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
          className="object-cover object-top pt-8 transition-transform duration-500 group-hover/preview:scale-[1.02]"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="absolute inset-0 pt-8 flex flex-col items-center justify-center bg-gradient-to-br from-accent/10 via-surface to-base p-6">
          <span className="text-4xl font-bold text-accent/30 mb-2">
            {project.name.charAt(0)}
          </span>
          <p className="text-sm text-muted text-center">{project.name}</p>
        </div>
      )}

      <a
        href={project.live}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-20 flex items-center justify-center bg-base/60 opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300"
        aria-label={`View ${project.name} live`}
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-white text-sm font-medium">
          <ExternalLink size={16} />
          View Live
        </span>
      </a>
    </div>
  );
}
