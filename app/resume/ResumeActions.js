"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import { RESUME_PDF, RESUME_PDF_DOWNLOAD_NAME } from "@/lib/constants";

export default function ResumeActions() {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-4 py-3 bg-base/95 border-b border-line backdrop-blur-sm">
      <Link
        href="/"
        className="inline-flex items-center px-4 py-2 border border-line text-sm font-medium text-main rounded-lg hover:border-accent hover:text-accent transition-colors"
      >
        Back to Portfolio
      </Link>
      <a
        href={encodeURI(RESUME_PDF)}
        download={RESUME_PDF_DOWNLOAD_NAME}
        className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent/90 transition-colors"
      >
        <Download size={16} />
        Download PDF
      </a>
    </div>
  );
}
