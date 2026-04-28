---
name: nextjs-16-patterns
description: Use for Next.js 16 App Router patterns, breaking changes from v15, Turbopack, async APIs, and Cache Components.
---

## Next.js 16 Breaking Changes (Critical)

### 1. Async Request APIs (params, searchParams)
In Next.js 16, `params` and `searchParams` are **Promises**, not plain objects:

```javascript
// OLD (Next.js 14-15)
export default function Page({ params }) {
  const { slug } = params  // Direct access
}

// NEW (Next.js 16)
export default async function Page({ params }) {
  const { slug } = await params  // Must await!
}
```

### 2. Middleware → Proxy
`middleware.ts` is renamed to `proxy.ts`:

```javascript
// OLD
// middleware.ts
import { NextResponse } from 'next/server'

export function middleware(request) {
  return NextResponse.next()
}

// NEW
// proxy.ts
import { ProxyResponse } from 'next'

export async function proxy(request) {
  return new ProxyResponse()
}
```

### 3. Turbopack Default
Turbopack is now the default bundler (replaces webpack):
```bash
# Development
npm run dev  # Uses Turbopack automatically

# Build
npm run build  # Uses Turbopack

# Opt out (if needed)
npm run build -- --webpack
```

### 4. Cache Components ('use cache')
New caching model replaces implicit fetch caching:

```javascript
// Enable caching for a component
'use cache'

export async function getStaticData() {
  const data = await fetch('https://api.example.com/data')
  return data.json()
}

// With revalidation
'use cache'

export const revalidate = 3600  // Revalidate every hour
```

### 5. Async Metadata
```javascript
// OLD
export const metadata = { title: 'Portfolio' }

// NEW
export async function generateMetadata({ params }) {
  const { slug } = await params
  return { title: slug }
}
```

### 6. Async generateMetadata for Icons/OG
```javascript
import { ImageResponse } from 'next/og'

export async function generateImageMetadata({ params }) {
  const { slug } = await params
  return {
    alt: `Image for ${slug}`,
    width: 1200,
    height: 630
  }
}
```

## Server vs Client Components

### Server Component (Default)
```javascript
// app/components/ServerComponent.js
export async function ServerComponent() {
  // Can: DB access, file system, async data fetching
  // Cannot: useState, useEffect, event handlers, browser APIs
  
  const data = await fetchData()
  
  return <div>{data.name}</div>
}
```

### Client Component
```javascript
'use client'

// app/components/ClientComponent.js
export function ClientComponent() {
  useState()  // Required for hooks
  return <button onClick={() => {}}>Click</button>
}
```

## Data Fetching

### Server-Side (App Router)
```javascript
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }  // ISR
  })
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <div>{data}</div>
}
```

### Route Handlers (API Routes)
```javascript
// app/api/users/route.js
export async function GET(request) {
  return Response.json({ users: [] })
}

export async function POST(request) {
  const body = await request.json()
  return Response.json({ created: true })
}
```

## Dynamic Routes

### generateStaticParams
```javascript
// app/blog/[slug]/page.js
export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function Page({ params }) {
  const { slug } = await params  // Await required!
  const post = await getPost(slug)
  return <Article post={post} />
}
```

## Static Generation

```javascript
// Force static (no SSR)
export const dynamic = 'force-static'

// Revalidate interval
export const revalidate = 3600  // Revalidate hourly

// ISR with on-demand
export const dynamic = 'force-static'
export const revalidate = 0
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
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Local Images with Query Strings (Breaking)
```javascript
// No longer supported in Next.js 16:
<Image src={`/hero.webp?${Date.now()}`} />

// Use import instead:
import heroImage from './hero.webp'
<Image src={heroImage} />
```

## Layouts

### Root Layout
```javascript
// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

### Nested Layouts
```javascript
// app/dashboard/layout.js
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}
```

## Loading & Error

### loading.tsx
```javascript
// app/loading.js
export default function Loading() {
  return <Skeleton />
}
```

### error.tsx
```javascript
'use client'

export default function Error({ error, reset }) {
  return (
    <div>
      <p>Something went wrong</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

## React 19.2 Features in Next.js 16

### View Transitions
```javascript
import { ViewTransition } from 'react'

function Page() {
  return (
    <ViewTransition viewNames={{ hero: 'hero-section' }}>
      <div className="hero">...</div>
    </ViewTransition>
  )
}
```

### use() Hook for Promises
```javascript
import { use } from 'react'

function UserProfile({ userPromise }) {
  const user = use(userPromise)  // Handle async data
  return <div>{user.name}</div>
}
```

## Best Practices

| Practice | Why |
|----------|-----|
| Default to Server Components | Less JS, better SEO |
| Use 'use client' sparingly | Only when needed |
| Await params/searchParams | Next.js 16 requirement |
| Use Turbopack | 5-10x faster builds |
| Implement error/loading | Better UX |