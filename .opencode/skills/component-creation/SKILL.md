---
name: component-creation
description: Use for creating new React components following project conventions. Covers Next.js 16 patterns, React 19, Tailwind CSS 4, and accessibility best practices.
---

## Component Structure (Next.js 16 + React 19)

### Server Component (Default)
```javascript
// app/components/ComponentName.js
export function ComponentName({ prop1, prop2 }) {
  // Can access: DB, file system, cookies, headers
  // Cannot use: hooks, browser APIs, event handlers
  
  return (
    <div className="flex gap-4">
      {prop1}
    </div>
  )
}
```

### Client Component ('use client')
```javascript
'use client'

import { useState, useEffect } from 'react'
import { clsx } from 'clsx'
import { tw } from '@/lib/utils'

export function ComponentName({ initialValue }) {
  const [state, setState] = useState(initialValue)

  return (
    <div className={tw('p-4', state && 'bg-accent')}>
      <button onClick={() => setState(!state)} />
    </div>
  )
}
```

## File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase.js | `HeroSection.js` |
| Pages | page.js | `page.js` |
| Layouts | layout.js | `layout.js` |
| Utils | camelCase.js | `formatDate.js` |
| Hooks | useCamelCase.js | `useScrollPosition.js` |
| Constants | UPPER_SNAKE_CASE.js | `API_ENDPOINTS.js` |
| Types | *.types.js | `user.types.js` |

## Import Order

```javascript
// 1. React / Next.js
import React from 'react'
import dynamic from 'next/dynamic'

// 2. External libraries
import { clsx } from 'clsx'
import { motion } from 'framer-motion'

// 3. Internal components/hooks
import { Navbar } from './Navbar'
import { useScrollPosition } from '@/hooks/useScrollPosition'

// 4. Utils / styles
import { tw } from '@/lib/utils'
```

## Tailwind CSS 4 Patterns

Tailwind CSS 4 uses `@import "tailwindcss"` and CSS-first configuration:

### Conditional Classes with clsx + tailwind-merge
```javascript
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function tw(...classes) {
  return twMerge(clsx(classes))
}

// Usage:
<div className={tw(
  'p-4',
  isActive && 'bg-primary',
  size === 'lg' && 'text-xl'
)} />
```

### CSS Variables for Theming
```css
/* globals.css */
@theme {
  --color-primary: #3b82f6;
  --color-accent: #f59e0b;
}
```

### Responsive Design (Mobile-First)
```javascript
// Base: mobile, scale up with md:, lg:, xl:
<div className="p-4 md:p-8 lg:p-12 xl:p-16">
```

## React 19 Patterns

### Server Actions
```javascript
'use server'

export async function submitForm(formData) {
  // Server-side logic
  await db.insert({ ... })
  revalidatePath('/')
}
```

### use() Hook
```javascript
import { use } from 'react'

// For promises in components
function UserData({ promise }) {
  const data = use(promise)
  return <div>{data.name}</div>
}
```

### Metadata (Next.js 16)
```javascript
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'My 3D portfolio',
  openGraph: {
    title: 'Portfolio',
    images: ['/og-image.jpg']
  }
}
```

## Component Patterns

### Compound Components
```javascript
export function Tabs({ children, defaultValue }) {
  const [active, setActive] = useState(defaultValue)
  
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      {children}
    </TabsContext.Provider>
  )
}

export function TabsList({ children }) {
  return <div className="flex gap-2">{children}</div>
}

export function TabsContent({ value, children }) {
  const { active } = useContext(TabsContext)
  return active === value ? children : null
}
```

### Props with Defaults
```javascript
export function Button({ 
  variant = 'primary', 
  size = 'md',
  children 
}) {
  return (
    <button className={tw(
      'rounded font-medium',
      variant === 'primary' && 'bg-primary text-white',
      variant === 'secondary' && 'bg-gray-200',
      size === 'sm' && 'px-3 py-1',
      size === 'md' && 'px-4 py-2'
    )}>
      {children}
    </button>
  )
}
```

## Accessibility (A11y)

### Semantic HTML
```javascript
// Good
<main>
  <nav aria-label="Main navigation">
    <header>
      <button aria-label="Open menu" />
    </header>
  </nav>
</main>

// Bad
<div className="main">
  <div className="nav" />
</div>
```

### Focus Management
```javascript
// Visible focus ring
<button className="focus:outline-none focus:ring-2 focus:ring-primary">

// Skip link
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to content
</a>
```

### ARIA Attributes
```javascript
<button 
  aria-label="Close dialog"
  aria-expanded={isOpen}
  aria-controls="dialog-content"
>
  <X />
</button>
```

### Color Contrast
- Text: minimum 4.5:1 (WCAG AA)
- Large text: minimum 3:1
- Use `contrast-*` utilities

## Error Handling

### Error Boundary
```javascript
'use client'

export function ErrorFallback({ error, reset }) {
  return (
    <div className="p-4 bg-red-100">
      <p>Something went wrong</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

### Loading States
```javascript
{isLoading ? (
  <Skeleton className="h-4 w-32" />
) : (
  <Content />
)}
```

## Performance Considerations

1. **Dynamic imports** for heavy components
2. **Memoization** with `useMemo`, `useCallback` for expensive computations
3. **Code splitting** per route (automatic in Next.js 16)
4. **Server Components** by default