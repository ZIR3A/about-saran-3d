---
name: animation-rules
description: Rules for Framer Motion, GSAP, and scroll animations. Covers 2026 patterns for Lenis smooth scroll and View Transitions.
paths:
  - "**/sections/*.js"
  - "**/components/*Scroll*.js"
  - "**/components/*Motion*.js"
---

# Animation Rules (2026)

## Library Selection

| Use Case | Library | Version |
|----------|---------|---------|
| UI transitions | Framer Motion | 12+ |
| Scroll-triggered | Framer Motion `whileInView` | 12+ |
| Complex timelines | GSAP | 3.15+ |
| Smooth scroll | Lenis | 1.3+ |
| 3D animations | GSAP + useFrame | 3.15+ |

## Framer Motion Patterns

### Page Transitions
```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
/>
```

### Scroll-Triggered
```javascript
<motion.div
  whileInView={{ opacity: 1, x: 0 }}
  initial={{ opacity: 0, x: -50 }}
  viewport={{ once: true, margin: "-100px" }}
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
```

## GSAP Patterns

### Timeline
```javascript
const tl = gsap.timeline()
tl.to(target, { duration: 1, x: 100 })
  .to(target, { duration: 0.5, rotation: 45 }, "-=0.5")
```

### ScrollTrigger
```javascript
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

useGSAP(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.to(target, {
    scrollTrigger: {
      trigger: target,
      start: "top center",
      scrub: true
    }
  })
}, [])
```

## Lenis Smooth Scroll (2026)

```javascript
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

## 3D Animation (useFrame + GSAP)

```javascript
useFrame(() => {
  gsap.to(meshRef.current.rotation, {
    y: Math.sin(time) * 0.5,
    duration: 0.1,
    ease: "power2.out"
  })
})
```

## Best Practices

| Practice | Why |
|----------|-----|
| Use `delta` in useFrame | Frame-independent animation |
| Throttle scroll callbacks | Prevent jank |
| Respect `prefers-reduced-motion` | Accessibility |
| Use `will-change` sparingly | Memory cost |
| Preload animated assets | No layout shift |

## Reduced Motion

```javascript
import { useReducedMotion } from 'framer-motion'

const shouldAnimate = useReducedMotion() === false
```

## Performance Tips

1. **Prefer `transform`** over position properties (GPU accelerated)
2. **Avoid layout thrash** - batch DOM reads/writes
3. **Use GSAP `gsap.context()`** for cleanup
4. **Lenis `raf` integration** - sync with RAF