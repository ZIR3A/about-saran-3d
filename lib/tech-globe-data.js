/** Tech stacks for 3D globe — sourced from skills, projects, and experience */

const PALETTE = {
  react: "#61DAFB",
  next: "#F5F5F5",
  typescript: "#3178C6",
  javascript: "#F7DF1E",
  html: "#E44D26",
  tailwind: "#38BDF8",
  node: "#68A063",
  mongo: "#47A248",
  postgres: "#336791",
  docker: "#2496ED",
  gsap: "#88CE02",
  motion: "#FF0080",
  express: "#888888",
  angular: "#DD0031",
  mui: "#007FFF",
  sql: "#F80000",
  ssr: "#00F0FF",
  figma: "#A259FF",
  git: "#F05032",
  ai: "#8000FF",
  accent: "#E50914",
  cyan: "#00F0FF",
  violet: "#8000FF",
  muted: "#A1A1A1",
};

export const globeTechStacks = [
  { label: "React", color: PALETTE.react },
  { label: "Next.js", color: PALETTE.next },
  { label: "TypeScript", color: PALETTE.typescript },
  { label: "JavaScript", color: PALETTE.javascript },
  { label: "HTML/CSS", color: PALETTE.html },
  { label: "Tailwind CSS", color: PALETTE.tailwind },
  { label: "Node.js", color: PALETTE.node },
  { label: "MongoDB", color: PALETTE.mongo },
  { label: "PostgreSQL", color: PALETTE.postgres },
  { label: "Docker", color: PALETTE.docker },
  { label: "GSAP", color: PALETTE.gsap },
  { label: "Framer Motion", color: PALETTE.motion },
  { label: "Express.js", color: PALETTE.express },
  { label: "Angular", color: PALETTE.angular },
  { label: "Material-UI", color: PALETTE.mui },
  { label: "SQL", color: PALETTE.sql },
  { label: "SSR", color: PALETTE.ssr },
  { label: "Figma", color: PALETTE.figma },
  { label: "Git", color: PALETTE.git },
  { label: "AI/LLM", color: PALETTE.ai },
  { label: "Performance", color: PALETTE.accent },
  { label: "Accessibility", color: PALETTE.cyan },
  { label: "UI/UX", color: PALETTE.violet },
  { label: "Flowbite", color: PALETTE.muted },
  { label: "SCSS", color: "#CD6799" },
];

export function fibonacciSphere(index, total, radius) {
  if (total <= 1) return [0, 0, radius];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - (index / (total - 1)) * 2;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = goldenAngle * index;
  return [
    Math.cos(theta) * r * radius,
    y * radius,
    Math.sin(theta) * r * radius,
  ];
}

export function getTechLabelSize(label) {
  if (label.length > 16) return 0.045;
  if (label.length > 10) return 0.052;
  return 0.06;
}

/** Inner + surface radii so labels fill the transparent globe */
export function getTechRadius(index, total) {
  const layer = index % 4;
  const layers = [0.55, 0.75, 0.92, 1.08];
  return layers[layer] * 1.15;
}
