---
name: frontend-patterns
description: Next.js 16 + React 19 + Tailwind CSS best practices and patterns for the personal blog project
---

# Frontend Patterns for Personal Blog

This skill provides comprehensive guidance on frontend development patterns for the Next.js + Notion blog project.

## Next.js App Router Patterns

### File Structure
- Use App Router (`app/` directory) for all pages
- Colocate components with their routes when route-specific
- Keep shared components in `src/components/`
- Keep utilities and helpers in `src/lib/`

### Server Components (Default)
```typescript
// app/page.tsx - Server Component by default
export default async function HomePage() {
  const posts = await getPosts(); // Direct async/await
  return <PostList posts={posts} />;
}
```

**When to use Server Components:**
- Fetching data from APIs (Notion API)
- Accessing backend resources
- Keeping sensitive information on server
- Reducing client-side JavaScript

### Client Components
```typescript
'use client';

// Only use when you need:
// - useState, useEffect, or other React hooks
// - Event listeners (onClick, onChange, etc.)
// - Browser-only APIs
```

### ISR (Incremental Static Regeneration)
```typescript
// Revalidate every hour
export const revalidate = 3600;

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  return <PostContent post={post} />;
}
```

**ISR Strategy for this project:**
- Home page: `revalidate = 3600` (1 hour)
- Post pages: `revalidate = 3600` (1 hour)
- Static pages (About, Contact): `revalidate = 86400` (24 hours)

## React 19 Patterns

### Async Components
```typescript
// ✅ Good - Direct async/await in Server Components
async function PostList() {
  const posts = await getPosts();
  return posts.map(post => <PostCard key={post.id} post={post} />);
}
```

### Error Boundaries
```typescript
// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### Loading States
```typescript
// app/loading.tsx
export default function Loading() {
  return <div>Loading posts...</div>;
}
```

## TypeScript Best Practices

### Type Safety for Notion Data
```typescript
// lib/types.ts
export interface NotionPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  summary: string;
  tags?: string[];
  published: boolean;
}

export interface NotionBlock {
  type: string;
  [key: string]: any;
}
```

### Strict Type Checking
```typescript
// ✅ Good - Explicit return types
async function getPosts(): Promise<NotionPost[]> {
  // implementation
}

// ❌ Avoid - Implicit any
async function getData() {
  // TypeScript can't infer the return type
}
```

## Tailwind CSS Patterns

### Design System
Use consistent spacing, colors, and typography:

```typescript
// ✅ Good - Use Tailwind utilities
<div className="max-w-4xl mx-auto px-4 py-8">
  <h1 className="text-3xl font-bold text-gray-900 mb-4">
    {post.title}
  </h1>
</div>

// ❌ Avoid - Inline styles
<div style={{ maxWidth: '896px', margin: '0 auto' }}>
```

### Responsive Design
```typescript
// Mobile-first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {posts.map(post => <PostCard key={post.id} post={post} />)}
</div>
```

### Dark Mode (if implemented)
```typescript
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
```

## Component Patterns

### Composition over Props Drilling
```typescript
// ✅ Good - Composition
<Layout>
  <Header />
  <main>{children}</main>
  <Footer />
</Layout>

// ❌ Avoid - Props drilling
<Layout header={<Header />} footer={<Footer />}>
```

### Single Responsibility
```typescript
// ✅ Good - Each component does one thing
function PostCard({ post }: { post: NotionPost }) {
  return (
    <article>
      <PostTitle title={post.title} />
      <PostMeta date={post.date} tags={post.tags} />
      <PostSummary summary={post.summary} />
    </article>
  );
}
```

## Performance Optimization

### Image Optimization
```typescript
import Image from 'next/image';

// ✅ Good - Use Next.js Image component
<Image
  src={imageUrl}
  alt={alt}
  width={800}
  height={400}
  priority={isAboveFold}
/>
```

### Dynamic Imports
```typescript
// For heavy client components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // Disable SSR if not needed
});
```

### Metadata for SEO
```typescript
// app/posts/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
    },
  };
}
```

## Error Handling

### Graceful Degradation
```typescript
// ✅ Good - Handle errors gracefully
async function getPosts(): Promise<NotionPost[]> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
    });
    return response.results.map(mapNotionToPost);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return []; // Return empty array instead of throwing
  }
}
```

### Type Guards
```typescript
function isNotionPost(obj: any): obj is NotionPost {
  return (
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.slug === 'string'
  );
}
```

## File Size Limits

- Components: Max 200 lines
- Pages: Max 150 lines
- Utilities: Max 100 lines

If exceeding limits, split into smaller modules.

## Naming Conventions

- Components: PascalCase (`PostCard.tsx`)
- Utilities: camelCase (`notion.ts`)
- Types: PascalCase with Interface/Type prefix (`NotionPost`)
- Constants: UPPER_SNAKE_CASE (`REVALIDATE_TIME`)
