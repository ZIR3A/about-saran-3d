"use client";

import { cn } from "@/lib/utils";

export default function Button({
  children,
  variant = "primary",
  className,
  href,
  onClick,
  type = "button",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-full transition-all duration-200 cursor-pointer text-sm sm:text-[1rem]";

  const variants = {
    primary: "bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/20",
    secondary:
      "border border-white/20 text-main hover:border-accent hover:text-accent bg-white/5 hover:bg-white/10",
    ghost: "text-muted hover:text-main px-4 py-2",
  };

  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
}
