---
name: 3d-development
description: Use for any task involving React Three Fiber, Three.js, WebGPU, or WebGL. Covers 2026 best practices including instancing, performance optimization, and TSL shaders.
---

## Core Patterns (R3F v9 + React 19)

### SSR with dynamic import (Next.js 16)
```javascript
import dynamic from 'next/dynamic'

const Scene3D = dynamic(() => import('@/components/Scene3D'), {
  ssr: false,
  loading: () => <LoadingScreen />
})
```

### Canvas Setup with Performance
```javascript
<Canvas
  dpr={[1, 2]}                    // Cap pixel ratio at 2
  shadows
  camera={{ position: [0, 0, 5], fov: 50 }}
  frameloop="demand"             // For static scenes
  gl={{                         // WebGPU with WebGL fallback
    antialias: true,
    powerPreference: 'high-performance'
  }}
>
```

### Suspense for Async 3D
```javascript
<Suspense fallback={<LoadingScreen />}>
  <Model />
  <GLTFModel />
</Suspense>
```

## WebGPU (2026 Production Ready)

As of Three.js r171+, WebGPU is production-ready with automatic WebGL 2 fallback.

### Enable WebGPU
```javascript
// No config needed - Three.js auto-detects and falls back
import { Canvas } from '@react-three/fiber'
// Uses WebGPURenderer when available, WebGLRenderer otherwise
```

### TSL (Three Shader Language)
TSL compiles to both GLSL (WebGL) and WGSL (WebGPU):
```javascript
import { uniform, tslFn } from 'three/tsl'

const myMaterial = new MeshPhysicalMaterial()

// TSL function
const intensity = uniform(1.0)
```

## Critical Performance Rules

| Rule | Why |
|------|-----|
| **NEVER use setState in useFrame** | Triggers 60fps React re-renders |
| **USE refs for animation state** | Refs don't trigger re-renders |
| **TARGET < 100 draw calls** | GPU bottleneck |
| **DISPOSE all resources** | Prevents memory leaks |
| **USE delta time** | Frame-independent animation |

### Correct Animation Pattern
```javascript
const meshRef = useRef()

useFrame((state, delta) => {
  meshRef.current.rotation.y += delta  // Delta = frame-independent
})
```

### WRONG - Never Do This
```javascript
const [rotation, setRotation] = useState(0)

useFrame(() => {
  setRotation(prev => prev + 0.01)  // CRASH: 60 re-renders/second!
})
```

## State Management (Zustand)

```javascript
// GOOD - Select specific state
const position = useStore((state) => state.meshPosition)

// BAD - Entire store causes re-render every frame
const store = useStore()
```

## Instancing (Drei)

For 100+ similar objects, use `Instances`:
```javascript
import { Instances, Instance } from '@react-three/drei'

<Instances limit={1000}>
  <boxGeometry />
  <meshStandardMaterial />
  {data.map((props, i) => (
    <Instance key={i} {...props} />
  ))}
</Instances>
```

## BatchedMesh (Varied Geometries)

For objects with same material but different shapes:
```javascript
import { BatchedMesh } from 'three'
```

## Memory Management

```javascript
useEffect(() => {
  return () => {
    geometry.dispose()
    material.dispose()
    if (texture) texture.dispose()
  }
}, [])
```

## Performance Targets (2026)

| Metric | Target |
|--------|--------|
| FPS | 60 |
| Draw Calls | < 100 |
| DPR | 1.5-2 |
| 3D Assets | < 2MB total |

## Asset Optimization

- **Models**: glTF/GLB with Draco compression (25MB → 3MB typical)
- **Textures**: KTX2 with Basis Universal compression
- **Use `useGLTF.preload()`** for caching
- **Use `useTexture`** with proper caching

## File Organization

```
app/
├── components/
│   ├── Scene3D.js           # Canvas wrapper (client only)
│   ├── Shared3DModel.js     # Reusable 3D models
│   └── *.js                 # Other components
└── sections/
    └── *.js                 # Page sections
```

## Key Libraries (2026 Versions)

- `three`: ^0.184+ (WebGPU support)
- `@react-three/fiber`: ^9+ (React 19 compatible)
- `@react-three/drei`: ^10+ (Performance helpers)
- `@react-three/postprocessing`: For effects

## Anti-Patterns to Avoid

1. Inline objects in JSX: `<mesh position={[0,0,0]} />` creates new ref every render
2. Creating geometries in render: Use `useMemo` or external references
3. Shared mutable state: Three.js objects are mutable, but React state isn't
4. Not using `useLoader` caching: Fetches models/textures every render