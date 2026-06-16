"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const LOADING_KEY = "portfolio-loaded";
const LOADING_DURATION = 1800;

const LoadingCanvas = dynamic(
  () => import("./LoadingCanvas"),
  { ssr: false, loading: () => null }
);

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (sessionStorage.getItem(LOADING_KEY)) {
      setIsLoading(false);
      return;
    }

    const duration = reducedMotion ? 400 : LOADING_DURATION;
    const interval = 40;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min((currentStep / steps) * 100, 100));

      if (currentStep >= steps) {
        clearInterval(timer);
        sessionStorage.setItem(LOADING_KEY, "1");
        setTimeout(() => setIsLoading(false), reducedMotion ? 0 : 200);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [mounted, reducedMotion]);

  if (!mounted || !isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-base">
      {!reducedMotion && (
        <div className="absolute inset-0">
          <LoadingCanvas />
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold tracking-wider font-mono">
            <span>LOADING</span>
          </h1>
          {!reducedMotion && (
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full bg-accent animate-pulse"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="w-64 h-1 bg-surface rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm text-muted font-mono">{Math.round(progress)}%</p>
      </div>

      <div className="absolute bottom-8 text-center">
        <p className="text-xs text-muted font-mono tracking-widest">
          PREPARING EXPERIENCE
        </p>
      </div>
    </div>
  );
}
