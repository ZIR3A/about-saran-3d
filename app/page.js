"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/lib/lenis-context";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import CredibilityStrip from "./components/CredibilityStrip";
import MobileCTA from "./components/MobileCTA";
import Hero from "./sections/Hero";
import About from "./sections/About";
import HowIWork from "./sections/HowIWork";
import EngineeringPrinciples from "./sections/EngineeringPrinciples";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";

gsap.registerPlugin(ScrollTrigger);

const LoadingScreen = dynamic(() => import("./components/LoadingScreen"), {
  ssr: false,
  loading: () => null,
});

const Scene3D = dynamic(() => import("./components/Scene3D"), {
  ssr: false,
  loading: () => null,
});

function AnimatedSection({ children, className }) {
  const sectionRef = useRef(null);
  const lenis = useLenis();
  const reducedMotion = lenis?.reducedMotion ?? false;

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <SmoothScroll>
      <LoadingScreen />
      <div className="relative min-h-screen">
        <Scene3D />
        <Navbar />
        <main className="relative z-10 content-scrim">
          <Hero />
          <CredibilityStrip />
          <AnimatedSection>
            <About />
          </AnimatedSection>
          <AnimatedSection>
            <HowIWork />
          </AnimatedSection>
          <AnimatedSection>
            <EngineeringPrinciples />
          </AnimatedSection>
          <AnimatedSection>
            <Skills />
          </AnimatedSection>
          <AnimatedSection>
            <Projects />
          </AnimatedSection>
          <AnimatedSection>
            <Experience />
          </AnimatedSection>
          <AnimatedSection>
            <Contact />
          </AnimatedSection>
        </main>
        <Footer />
        <MobileCTA />
      </div>
    </SmoothScroll>
  );
}
