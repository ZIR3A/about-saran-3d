"use client";

import { useState, useEffect } from "react";
import { Mail, ArrowUp } from "lucide-react";
import { useScrollTo } from "@/lib/lenis-context";
import { CONTACT_EMAIL } from "@/lib/constants";
import Button from "./ui/Button";

export default function MobileCTA() {
  const [visible, setVisible] = useState(false);
  const scrollTo = useScrollTo();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 md:hidden bg-base/90 backdrop-blur-xl border-t border-line safe-area-pb">
      <div className="flex gap-2">
        <Button
          onClick={() => scrollTo("#projects")}
          variant="primary"
          className="flex-1 py-2.5 text-sm rounded-xl"
        >
          View Work
        </Button>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl border border-line text-main"
        >
          <Mail size={16} />
          Email
        </a>
        <button
          onClick={() => scrollTo("#hero", { offset: 0 })}
          className="p-2.5 rounded-xl border border-line text-muted"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </div>
  );
}
