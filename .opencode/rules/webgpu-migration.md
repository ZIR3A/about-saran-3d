---
name: webgpu-migration
description: WebGPU migration guide for Three.js r171+. WebGPU is now production-ready with automatic WebGL fallback.
paths:
  - "**/components/Scene*.js"
  - "**/components/*Material*.js"
  - "**/shaders/*"
---

# WebGPU Migration Guide (2026)

## Status: Production Ready

As of **Three.js r171+**, WebGPU is production-ready:
- All major browsers supported (Chrome, Edge, Firefox, Safari 26+)
- Automatic fallback to WebGL 2
- No configuration needed

## Current State (Portfolio)

The Canvas component uses automatic WebGPU detection:
```javascript
import { Canvas } from '@react-three/fiber'

// No explicit WebGPU config needed
// Three.js auto-detects and falls back
<Canvas>
```

## TSL (Three Shader Language)

TSL compiles to both GLSL (WebGL) and WGSL (WebGPU):

### Basic TSL Material
```javascript
import { uniform } from 'three/tsl'

const intensity = uniform(1.0)

const material = new MeshPhysicalMaterial()
material.emissiveIntensity = intensity
```

### TSL Functions
```javascript
import { tslFn } from 'three/tsl'

const myFunction = tslFn(({ position, normal }) => {
  return position.add(normal.multiply(0.1))
})
```

## Migration Checklist

- [x] Using Three.js r171+ (automatic WebGPU detection)
- [x] Using R3F v9+ (React 19 compatible)
- [ ] Using Drei v10+ (latest helpers)
- [ ] Considering TSL for new shaders
- [ ] Testing on Safari 26+ (WebGPU required)

## Performance Benefits

| Scenario | WebGL | WebGPU |
|----------|-------|--------|
| 10k+ objects | Baseline | 2.3x faster |
| 4+ post-processing passes | Baseline | 1.8x faster |
| Particle systems | CPU-bound | GPU compute |

## When to Use WebGPU

- 3D portfolio with heavy scenes
- 10k+ objects
- Complex post-processing
- Future-proofing

## Backward Compatibility

Three.js handles this automatically:
- WebGPU available → uses WebGPURenderer
- WebGPU unavailable → falls back to WebGLRenderer

No code changes needed for current setup.