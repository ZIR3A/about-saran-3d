---
name: 3d-performance-rules
description: Critical performance rules for React Three Fiber and Three.js. MUST FOLLOW to prevent 60fps re-renders and memory leaks.
paths:
  - "**/components/*.js"
  - "**/Scene*.js"
  - "**/Model*.js"
---

# 3D Performance Rules (CRITICAL)

## The Golden Rules

| Rule | Violation Consequence |
|------|----------------------|
| **NEVER** use setState in useFrame | 60fps React re-renders, performance death |
| **ALWAYS** use refs for animation | Refs don't trigger React reconciliation |
| **DISPOSE** all resources on unmount | Memory leaks, browser crashes |
| **TARGET** < 100 draw calls | GPU bottleneck |
| **USE** delta time | Frame-independent animation |

## Canvas Setup (Correct)

```javascript
<Canvas
  dpr={[1, 2]}                    // Cap pixel ratio
  shadows
  camera={{ position: [0, 0, 5], fov: 50 }}
  gl={{ powerPreference: 'high-performance' }}
>
```

## Animation Patterns

### ✅ CORRECT: Refs + Delta
```javascript
const meshRef = useRef()

useFrame((state, delta) => {
  meshRef.current.rotation.y += delta  // Frame-independent!
})
```

### ❌ WRONG: setState in useFrame
```javascript
// NEVER DO THIS
const [rotation, setRotation] = useState(0)

useFrame(() => {
  setRotation(prev => prev + 0.01)  // CRASHES PERFORMANCE!
})
```

## Zustand State (Performance Critical)

```javascript
// ✅ GOOD - Select specific state
const position = useStore((state) => state.meshPosition)

// ❌ BAD - Entire store on every frame
const store = useStore()  // Re-renders every frame!
```

## Memory Management

```javascript
useEffect(() => {
  // Setup
  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshStandardMaterial()

  return () => {
    // MUST dispose on unmount
    geometry.dispose()
    material.dispose()
    // Also dispose textures if used
    if (texture) texture.dispose()
  }
}, [])
```

## Draw Call Targets

- **Target**: < 100 draw calls per frame
- **Instancing**: Use for 100+ similar objects
- **Batching**: Use `BatchedMesh` for varied geometries, same material
- **Merge**: Static geometry with `BufferGeometryUtils.mergeGeometries()`

## Instancing (Drei)

```javascript
<Instances limit={1000}>
  <boxGeometry />
  <meshStandardMaterial />
  {data.map((props, i) => (
    <Instance key={i} {...props} />
  ))}
</Instances>
```

## Anti-Patterns

| Anti-Pattern | Why | Fix |
|-------------|-----|-----|
| Inline objects | New ref every render | `useMemo` |
| setState in useFrame | 60 re-renders/sec | Use refs |
| No disposal | Memory leaks | useEffect cleanup |
| DPR > 2 | Excessive GPU load | Cap at [1, 2] |

## Performance Monitoring

```javascript
// Check in useFrame or dev console
const { gl } = useThree()
console.log('Draw calls:', gl.info.render.calls)
console.log('Geometries:', gl.info.memory.geometries)
```

## Performance Targets

| Metric | Target |
|--------|--------|
| FPS | 60 |
| Draw Calls | < 100 |
| DPR | 1.5-2 |
| 3D Assets Total | < 2MB |