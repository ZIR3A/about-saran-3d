"use client";

import { createContext, useContext } from "react";

export const LenisContext = createContext(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function useScrollTo() {
  const ctx = useContext(LenisContext);
  return (href, options = {}) => {
    ctx?.scrollTo(href, options);
  };
}
