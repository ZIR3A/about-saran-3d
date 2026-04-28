---
name: general-rules
description: General coding rules and conventions for this 3D portfolio project
paths:
  - "*.js"
  - "*.jsx"
  - "*.ts"
  - "*.tsx"
---

# General Rules

## Project Overview

This is a **3D Portfolio** built with:
- **Next.js 16** (App Router, Turbopack)
- **React 19** (Server Components by default)
- **React Three Fiber v9** + Three.js (WebGPU-ready)
- **Framer Motion 12** + GSAP (animations)
- **Tailwind CSS 4** (styling)

## Component Architecture

1. **Use React Server Components by default**
   - Add `'use client'` only when needed (interactivity, hooks, browser APIs)
   - 3D Canvas components MUST be client components with dynamic import

2. **File Naming**
   | Type | Convention | Example |
   |------|------------|---------|
   | Components | PascalCase.js | HeroSection.js |
   | Pages | page.js | page.js |
   | Utils | camelCase.js | formatDate.js |
   | Hooks | useCamelCase.js | useScrollPosition.js |

3. **Import Order**
   ```
   1. React/Next.js imports
   2. External libraries
   3. Internal components/hooks
   4. Utils/styles
   ```

## Styling Rules

1. **ALWAYS use Tailwind CSS** - no custom CSS unless required for 3D/shaders
2. **Use `tw()` utility** for conditional classes:
   ```javascript
   import { tw } from '@/lib/utils'
   <div className={tw('p-4', isActive && 'bg-accent')} />
   ```
3. **Use `@` path alias** for all imports

## 3D Components (Critical)

```javascript
// MUST use dynamic import with ssr: false
import dynamic from 'next/dynamic'
const Scene3D = dynamic(() => import('@/components/Scene3D'), { ssr: false })
```

## Key Commands

```bash
npm run dev    # Start dev server (port 3000)
npm run build  # Production build with Turbopack
npm run lint  # ESLint check
```

## Prohibited

- ❌ `setState` in useFrame (causes 60fps re-renders)
- ❌ Custom CSS for non-3D elements
- ❌ Default exports for components
- ❌ Inline styles (use Tailwind)