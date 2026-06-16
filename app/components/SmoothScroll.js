"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LenisContext } from "@/lib/lenis-context";
import { useReducedMotion } from "@/lib/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

const NAV_OFFSET = -80;

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const reducedMotion = useReducedMotion();

  const scrollTo = useCallback(
    (href, options = {}) => {
      const target =
        typeof href === "string" ? document.querySelector(href) : href;
      if (!target) return;

      const offset = options.offset ?? NAV_OFFSET;

      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, {
          offset,
          duration: reducedMotion ? 0 : options.duration ?? 1.2,
        });
      } else {
        const top =
          target.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({
          top,
          behavior: reducedMotion ? "auto" : "smooth",
        });
      }
    },
    [reducedMotion]
  );

  useEffect(() => {
    if (reducedMotion) {
      const handleScroll = () => setScrollY(window.scrollY);
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    const onScroll = ({ scroll }) => setScrollY(scroll);
    lenis.on("scroll", onScroll);
    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(ticker);
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  return (
    <LenisContext.Provider value={{ scrollTo, scrollY, reducedMotion }}>
      {children}
    </LenisContext.Provider>
  );
}
