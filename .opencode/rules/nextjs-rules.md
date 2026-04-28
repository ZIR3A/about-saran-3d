---
name: nextjs-rules
description: Next.js 16 specific patterns, breaking changes from v15, Turbopack default, and async APIs.
paths:
  - "app/**/*.js"
  - "next.config.*"
  - "proxy.ts"
---

# Next.js 16 Rules

## Critical Breaking Changes

### 1. Async params/searchParams
```javascript
// MUST await params in Next.js 16
export default async function Page({ params }) {
  const { slug } = await params  // No longer direct access!
}
```

### 2. Middleware → Proxy
```javascript
// middleware.ts → proxy.ts
export async function proxy(request) {
  return new ProxyResponse()
}
```

### 3. Turbopack Default
Turbopack is now default for dev and build:
```bash
npm run dev   # Uses Turbopack
npm run build # Uses Turbopack
```

### 4. Cache Components ('use cache')
```javascript
'use cache'
export async function getData() {
  // Cached by default
}
```

### 5. Async Metadata
```javascript
export async function generateMetadata({ params }) {
  const { slug } = await params
  return { title: slug }
}
```

## Server vs Client Components

```javascript
// Server Component (default)
export default function Page() {
  // Can: DB, file system, async fetch
  // Cannot: hooks, event handlers
}

// Client Component
'use client'
export function ClientComponent() {
  useState()  // Required for hooks
}
```

## 3D Components (SSR)

```javascript
// MUST be client component with dynamic import
'use client'

import dynamic from 'next/dynamic'

const Scene3D = dynamic(() => import('@/components/Scene3D'), {
  ssr: false,
  loading: () => <LoadingScreen />
})
```

## Static Generation

```javascript
export const dynamic = 'force-static'
export const revalidate = 3600  // Hourly revalidation
```

## Image Optimization

```javascript
import Image from 'next/image'

<Image
  src="/hero.webp"
  alt="Hero"
  width={1920}
  height={1080}
  priority  // Above-fold images
/>
```

## Commands

```bash
npm run dev    # Start dev (port 3000)
npm run build  # Turbopack build
npm run lint   # ESLint
```

## Prohibited in Server Components

- ❌ useState, useEffect
- ❌ Event handlers
- ❌ Browser APIs
- ❌ 'use client' (explicit marker)