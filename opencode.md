# Portfolio 3D - Project Specification

3D interactive portfolio built with Next.js 16, React Three Fiber, and modern web technologies.

---

## Project Overview

| Attribute | Value |
|-----------|-------|
| **Name** | Portfolio 3D |
| **Stack** | Next.js 16, React 19, R3F v9, Three.js, Tailwind CSS 4 |
| **Purpose** | Interactive 3D developer portfolio showcasing projects and skills |
| **Target Users** | Recruiters, hiring managers, fellow developers |

---

## Technology Stack

### Core Framework
- **Next.js 16** - App Router, Turbopack bundler, React Server Components
- **React 19.2** - Latest features including View Transitions, use() hook
- **TypeScript** - Not currently used (JSDoc for types)

### 3D Engine
- **Three.js 0.184+** - WebGPU-ready (production-ready since r171)
- **React Three Fiber v9** - React renderer for Three.js
- **@react-three/drei v10** - 100+ helpers (OrbitControls, Environment, etc.)
- **@react-three/postprocessing** - Effects (Bloom, SSAO, etc.)

### Animation
- **Framer Motion 12+** - UI transitions, scroll-triggered animations
- **GSAP 3.15+** - Complex timelines, ScrollTrigger
- **Lenis** - Smooth scroll (60fps), R3F compatible

### Styling
- **Tailwind CSS 4** - Utility-first with @theme configuration
- **clsx + tailwind-merge** - Conditional classes via `tw()` utility

### State Management
- **Zustand** - Lightweight, React 19 compatible

---

## Project Structure

```
portfolio-3d/
├── app/
│   ├── components/          # Reusable components
│   │   ├── Scene3D.js       # 3D Canvas wrapper (client, dynamic)
│   │   ├── Shared3DModel.js  # Reusable 3D models
│   │   ├── Navbar.js         # Navigation
│   │   ├── Footer.js         # Footer
│   │   ├── LoadingScreen.js  # Loading state
│   │   └── SmoothScroll.js   # Lenis integration
│   ├── sections/            # Page sections
│   │   ├── Hero.js          # Hero with 3D
│   │   ├── About.js         # About section
│   │   ├── Experience.js    # Work experience
│   │   ├── Skills.js        # Skills display
│   │   ├── Projects.js      # Projects showcase
│   │   └── Contact.js       # Contact form
│   ├── globals.css         # Tailwind + custom styles
│   ├── layout.js           # Root layout
│   └── page.js             # Home page
├── lib/
│   └── utils.js            # clsx + tailwind-merge
├── .opencode/              # OpenCode configuration
│   ├── opencode.json       # Main config
│   ├── agents/             # Custom agents
│   ├── skills/             # Task skills
│   └── rules/              # Coding rules
├── next.config.mjs
├── package.json
└── README.md
```

---

## Critical Patterns

### 3D Components (MUST FOLLOW)

```javascript
// 1. Client component with dynamic import
'use client'
import dynamic from 'next/dynamic'

// 2. ALWAYS ssr: false for Canvas
const Scene3D = dynamic(() => import('@/components/Scene3D'), {
  ssr: false,
  loading: () => <LoadingScreen />
})

// 3. Wrap async 3D in Suspense
<Suspense fallback={<LoadingScreen />}>
  <Scene3D />
</Suspense>
```

### Canvas Setup

```javascript
<Canvas
  dpr={[1, 2]}                    // Cap pixel ratio
  shadows
  camera={{ position: [0, 0, 5], fov: 50 }}
  gl={{ powerPreference: 'high-performance' }}
>
```

### Animation (useFrame)

```javascript
// CORRECT - Use refs + delta
const meshRef = useRef()

useFrame((state, delta) => {
  meshRef.current.rotation.y += delta  // Frame-independent!
})

// WRONG - NEVER setState in useFrame
useFrame(() => setState(s => s + 0.01))  // CRASHES PERFORMANCE
```

---

## Performance Targets

### 3D Rendering

| Metric | Target | Critical |
|--------|--------|----------|
| FPS | 60 | ✅ |
| Draw Calls | < 100 | ✅ |
| DPR | 1.5-2 | ✅ |
| 3D Assets | < 2MB total | ✅ |

### Core Web Vitals

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |

### Bundle Size

| Asset | Target |
|-------|--------|
| Initial JS | < 200KB |
| 3D Assets | < 2MB |

---

## Next.js 16 Breaking Changes

### 1. Async params (MUST AWAIT)
```javascript
// Next.js 15: params.slug
// Next.js 16:
export default async function Page({ params }) {
  const { slug } = await params
}
```

### 2. Turbopack Default
```bash
npm run dev   # Uses Turbopack (5-10x faster)
npm run build # Uses Turbopack
```

### 3. middleware.ts → proxy.ts
```javascript
// Renamed file and function
export async function proxy(request) { }
```

### 4. Cache Components
```javascript
'use cache'
export async function getData() { }
```

---

## Commands

```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Production build
npm run lint      # ESLint check
npm run start     # Start production server
```

---

## WebGPU Status

**Status**: Production Ready ✅

As of Three.js r171+ (September 2025):
- All browsers support WebGPU (Safari 26+ September 2025)
- Automatic fallback to WebGL 2
- No code changes required - auto-detection enabled

**Current Setup**: Already WebGPU-ready via R3F automatic detection.

---

## Development Guidelines

### File Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase.js | HeroSection.js |
| Pages | page.js | page.js |
| Utils | camelCase.js | formatDate.js |
| Hooks | useCamelCase.js | useScrollPosition.js |

### Import Order

```javascript
// 1. React / Next.js
import React from 'react'
import dynamic from 'next/dynamic'

// 2. External libraries
import { clsx } from 'clsx'
import { motion } from 'framer-motion'

// 3. Internal components/hooks
import { Navbar } from './Navbar'

// 4. Utils / styles
import { tw } from '@/lib/utils'
```

### Styling with tw()

```javascript
import { tw } from '@/lib/utils'

// Conditional classes
<div className={tw('p-4', isActive && 'bg-accent')} />

// Multiple conditions
<div className={tw('p-4', condition1 && 'bg-primary', condition2 && 'text-white')} />
```

---

## Prohibited Patterns

| Pattern | Why | Fix |
|---------|-----|-----|
| `setState` in useFrame | 60 re-renders/sec | Use refs |
| Inline objects in JSX | New ref every render | `useMemo` |
| No disposal of resources | Memory leaks | useEffect cleanup |
| Default exports | Poor DX | Named exports |
| Custom CSS (non-3D) | Inconsistency | Tailwind only |

---

## Skills Reference

Load these skills for specific tasks:

| Task | Skill |
|------|-------|
| 3D development | `/skill 3d-development` |
| Animation | `/skill animation` |
| Component creation | `/skill component-creation` |
| Performance optimization | `/skill performance-optimization` |
| Next.js 16 patterns | `/skill nextjs-16-patterns` |

---

## Agents Reference

| Task | Agent |
|------|-------|
| Find files, understand structure | `/agent explore` |
| Implement features, fix bugs | `/agent general` |
| Code quality review | `/agent code-review` |

---

## Key Dependencies

```json
{
  "next": "16.2.4",
  "react": "19.2.4",
  "@react-three/fiber": "^9.6.0",
  "@react-three/drei": "^10.7.7",
  "three": "^0.184.0",
  "framer-motion": "^12.38.0",
  "gsap": "^3.15.0",
  "lenis": "^1.3.23",
  "tailwindcss": "^4",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.5.0"
}
```

---

## Resources

- [React Three Fiber Docs](https://r3f.docs.pmnd.rs)
- [Drei Helpers](https://drei.docs.pmnd.rs)
- [Three.js WebGPU Guide](https://threejs.org/docs/pages/WebGPURenderer.html)
- [Next.js 16 Migration](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [Framer Motion](https://framer.com/motion)
- [GSAP](https://gsap.com/docs)
- [Lenis](https://lenis.studio)

---

*Last updated: 2026-04-25*