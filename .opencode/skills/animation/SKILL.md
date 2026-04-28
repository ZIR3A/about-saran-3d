---
name: animation
description: Use for Framer Motion, GSAP, scroll-triggered animations, and smooth scroll integration. Covers 2026 patterns for Lenis, view transitions, and 3D animations.
---

## Animation Library Selection (2026)

| Use Case | Library | Notes |
|----------|---------|-------|
| UI transitions | Framer Motion 12+ | View Transitions API support |
| Scroll-triggered | Framer Motion `whileInView` | SSR-safe |
| Complex timelines | GSAP 3.15+ | Core plugins included |
| Smooth scroll | Lenis | 60fps scroll, R3F compatible |
| 3D object animation | GSAP + useFrame | Delta-time based |

## Framer Motion Patterns (v12+)

### Page/Section Transitions
```javascript
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
/>
```

### Scroll-Triggered (whileInView)
```javascript
<motion.div
  whileInView={{ opacity: 1, x: 0 }}
  initial={{ opacity: 0, x: -50 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6 }}
/>
```

### Hover/Tap Interactions
```javascript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400 }}
/>
```

### Staggered Children
```javascript
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

// In component:
<motion.div variants={container} initial="hidden" animate="show">
  <motion.div variants={item} />
  <motion.div variants={item} />
</motion.div>
```

## GSAP Patterns (v3.15+)

### Timeline Orchestration
```javascript
import { gsap } from 'gsap'

const tl = gsap.timeline()

tl.to(target, { duration: 1, x: 100 })
  .to(target, { duration: 0.5, rotation: 45 }, "-=0.5")
  .to(target, { duration: 1, opacity: 0 })
```

### ScrollTrigger Integration
```javascript
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

useGSAP(() => {
  gsap.registerPlugin(ScrollTrigger)
  
  gsap.to(target, {
    x: 100,
    scrollTrigger: {
      trigger: target,
      start: "top center",
      end: "bottom center",
      scrub: true  // Smooth scrubbing
    }
  })
}, [])
```

### 3D Object Animation (with useFrame)
```javascript
useFrame(() => {
  gsap.to(meshRef.current.rotation, {
    y: Math.sin(time) * 0.5,
    duration: 0.1,
    ease: "power2.out"
  })
})
```

## Lenis Smooth Scroll (2026)

Lenis provides buttery smooth scrolling, essential for 3D portfolio experiences:

```javascript
// lib/smooth-scroll.js
import Lenis from 'lenis'

export const initLenis = () => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 2
  })

  const raf = (time) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  return lenis
}
```

### Integrate with GSAP ScrollTrigger
```javascript
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

useEffect(() => {
  const lenis = new Lenis({ duration: 1.2 })
  
  lenis.on('scroll', ScrollTrigger.update)
  
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  
  gsap.ticker.lagSmoothing(0)
  
  return () => lenis.destroy()
}, [])
```

## View Transitions API (2026)

React 19.2 + Framer Motion support native View Transitions:

```javascript
import { ViewTransition } from 'react'

<div style={{ viewTransitionName: 'hero' }}>
  <motion.div
    initial={{ viewTransitionName: 'hero' }}
    animate={{ viewTransitionName: 'hero' }}
  />
</div>
```

## Animation Best Practices (2026)

| Practice | Benefit |
|----------|---------|
| Use `delta` in useFrame | Frame-independent animation |
| Prefer `lerp` for smoothing | 60fps interpolation |
| Throttle scroll callbacks | Prevent jank |
| Use `will-change` CSS | GPU layer promotion |
| Preload animations | No layout shift |
| Respect `prefers-reduced-motion` | Accessibility |

### Reduced Motion Support
```javascript
import { useReducedMotion } from 'framer-motion'

const shouldAnimate = useReducedMotion() === false

// Or conditionally set variants
const variants = shouldAnimate ? animatedVariants : staticVariants
```

## Spring Physics (Framer Motion)

```javascript
const spring = {
  type: "spring",
  stiffness: 260,
  damping: 20
}

// Use for bouncy feel
<motion.div transition={spring} />
```

## Performance Tips

1. **Avoid layout thrash**: Batch DOM reads/writes
2. **Use `transform` over `top/left`**: GPU accelerated
3. **Leverage `will-change`**: But don't overuse (memory cost)
4. **GSAP `gsap.context()`**: For cleanup and scoping
5. **Lenis `raf` integration**: Sync with RAF for consistent 60fps