---
name: performance-optimization
description: Use for optimizing rendering, bundle size, load times, and Core Web Vitals. Covers 2026 targets, Lighthouse metrics, and 3D-specific optimizations.
---

## Performance Targets (2026)

| Metric | Target | Tool |
|--------|--------|------|
| LCP | < 2.5s | Lighthouse |
| FID | < 100ms | Lighthouse |
| CLS | < 0.1 | Lighthouse |
| FPS | 60 (3D) | stats.gl |
| Draw Calls | < 100 | renderer.info |
| Bundle | < 200KB initial | Bundle analyzer |

## Bundle Optimization

### Code Splitting
```javascript
// Dynamic imports for heavy 3D components
const Scene3D = dynamic(() => import('@/components/Scene3D'), {
  ssr: false,
  loading: () => <LoadingScreen />
})

// Per-route splitting (automatic in Next.js 16)
```

### Tree Shaking
- Use ES modules (default in Next.js 16 with Turbopack)
- Import specific functions: `import { motion } from 'framer-motion'`
- Avoid: `import Framer from 'framer-motion'`

### Bundle Analysis
```bash
# Analyze bundle size
npm run build && npx @next/bundle-analyzer
```

## 3D Asset Optimization (2026)

### Model Compression
| Format | Compression | Size Reduction |
|--------|-------------|----------------|
| GLB | Draco | 75-90% |
| Textures | KTX2/Basis | 60-80% |
| HDR | Basis | 50-70% |

### Draco Compression
```javascript
import { useGLTF } from '@react-three/drei'

// Auto-compressed with Draco decoder
const { scene } = useGLTF('/models/hero.glb')

// Preload for caching
useGLTF.preload('/models/hero.glb')
```

### KTX2 Textures
```javascript
import { useKTX2 } from '@react-three/drei'

const texture = useKTX2('/textures/forest_diffuse.ktx2')
```

## Loading Strategy

### Multi-Tier Loading
```
Tier 1 (0-2s):    Static HTML + CSS + critical JS
Tier 2 (2-4s):    Above-fold content + hero image
Tier 3 (4s+):     3D scene + full assets
```

### Lazy Loading
```javascript
// Intersection Observer based
const loadScene = () => import('@/components/Scene3D')

// Or with Next.js Image + 3D
<Suspense fallback={<LoadingSkeleton />}>
  <Canvas3D />
</Suspense>
```

### Preloading
```javascript
// Preload critical assets
useEffect(() => {
  const preload = [
    '/models/hero.glb',
    '/textures/background.jpg'
  ]
  preload.forEach(src => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = src
    link.as = 'image'
    document.head.appendChild(link)
  })
}, [])
```

## React 3D Fiber Optimization

### Adaptive Performance
```javascript
import { AdaptiveDpr, PerformanceMonitor } from '@react-three/drei'

function Scene() {
  return (
    <>
      <AdaptiveDpr pixelated />
      <PerformanceMonitor
        onIncline={() => setQuality('high')}
        onDecline={() => setQuality('low')}
        flipflop
      />
    </>
  )
}
```

### Demand Rendering
```javascript
const invalidate = useThree((state) => state.invalidate)

useFrame(() => {
  if (needsUpdate) invalidate()
}, 1)  // Priority 1 = only when needed
```

### Frameloop Modes
```javascript
// Always (default) - for animated scenes
<Canvas frameloop="always">

// Demand - static scenes, manual render
<Canvas frameloop="demand">

// Once - for static content
<Canvas frameloop="once">
```

## Memory Management

### Proper Disposal
```javascript
useEffect(() => {
  return () => {
    geometry?.dispose()
    material?.dispose()
    texture?.dispose()
    
    if (groupRef.current) {
      groupRef.current.traverse((child) => {
        if (child.geometry) child.geometry.dispose()
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(m => m.dispose())
          } else {
            child.material.dispose()
          }
        }
      })
    }
  }
}, [])
```

### Monitor Memory
```javascript
const { gl } = useThree()

useEffect(() => {
  const info = gl.info
  console.log('Geometries:', info.memory.geometries)
  console.log('Textures:', info.memory.textures)
  console.log('Draw calls:', info.render.calls)
}, [])
```

## Rendering Optimization

### Instancing (100+ objects)
```javascript
<Instances limit={1000}>
  <boxGeometry />
  <meshStandardMaterial />
  {items.map((props, i) => (
    <Instance key={i} {...props} />
  ))}
</Instances>
```

### Merge Static Geometry
```javascript
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'

const merged = mergeGeometries(geometries)
```

### Texture Atlases
Use single texture atlas for multiple small textures:
```javascript
// 4 icons in 1 texture = 1 draw call instead of 4
```

## Lighthouse Optimization

### Critical Metrics

#### LCP (Largest Contentful Paint)
- Preload hero image
- Use Next.js Image with priority
- Inline critical CSS

```javascript
<Image
  src="/hero.webp"
  alt="Hero"
  width={1920}
  height={1080}
  priority  // For above-fold images
/>
```

#### CLS (Cumulative Layout Shift)
- Always specify image dimensions
- Reserve space with aspect-ratio
- No late-loading content above fold

```javascript
<div style={{ aspectRatio: '16/9' }}>
  <Image src="/hero.webp" fill />
</div>
```

#### FID (First Input Delay)
- Defer non-critical JS
- Use web workers for heavy computation
- Code split aggressively

## Monitoring Tools (2026)

| Tool | Purpose |
|------|---------|
| stats.gl | FPS + GPU monitoring |
| React DevTools | Component profiling |
| Lighthouse | Core Web Vitals |
| WebPageTest | Detailed waterfalls |
| Vercel Speed Insights | Real user metrics |

## Profiling Checklist

- [ ] Draw calls < 100?
- [ ] Geometries disposed on unmount?
- [ ] DPR capped at 1.5-2?
- [ ] Delta time for animations?
- [ ] Instancing for repeated objects?
- [ ] Lazy loading for 3D?
- [ ] Textures compressed (KTX2)?