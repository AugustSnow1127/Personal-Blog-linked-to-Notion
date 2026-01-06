# AGENTS.md

This file provides guidance to agentic coding assistants working on this repository.

## Commands

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production (ASK before running)
npm run start        # Run production build
npm run lint         # Run ESLint
```

**Testing**: No test framework is currently configured. When adding tests, set up Jest or Vitest and document the test command here.

## Code Style Guidelines

### Imports
- Use single quotes for all imports
- Use path alias `@/` for src directory imports (e.g., `import { Post } from '@/lib/notion'`)
- External imports at the top, local imports below
- Group related imports together

```typescript
import { Client } from "@notionhq/client";
import Image from 'next/image';
import { Post } from '@/lib/notion';
import PostCard from './PostCard';
```

### Components
- Use functional components with TypeScript interfaces for props
- Define props interfaces above the component when exported
- Use `export default function ComponentName({ ... }: Props)`
- Mark client components with `'use client'` at the very top of the file

```typescript
'use client';

import { useState } from 'react';

interface ComponentProps {
  prop: string;
}

export default function Component({ prop }: ComponentProps) {
  return <div>{prop}</div>;
}
```

### TypeScript
- Strict mode is enabled - use proper types everywhere
- Export types/interfaces when needed by other modules
- Use `interface` for object shapes, `type` for unions/primitives
- Avoid `any` - use proper types or `unknown`
- Use non-null assertion `!` only for environment variables that are guaranteed to exist

```typescript
const databaseId = process.env.NOTION_DATABASE_ID!;
export interface Post {
  id: string;
  title: string;
}
```

### Error Handling
- API functions return `null` for not-found cases
- Use try-catch for async operations that may fail
- Validate data from external APIs before use

```typescript
export async function getPostBySlug(slug: string): Promise<Post | null> {
  // ... fetch logic
  if (response.results.length === 0) {
    return null;
  }
  // ... return data
}
```

### Naming Conventions
- **Components**: PascalCase (`PostCard`, `Header`)
- **Functions/Variables**: camelCase (`getPosts`, `pageTitle`)
- **Types/Interfaces**: PascalCase (`Post`, `ComponentProps`)
- **Constants**: UPPER_SNAKE_CASE for global constants (`databaseId`)
- **Files**: PascalCase for components, camelCase for utilities

### Formatting & Structure
- 2-space indentation
- Max line length: not strictly enforced but keep code readable
- Add blank lines between logical sections
- Use ESLint disable comments sparingly and explain why

```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getRichText(prop: any): string {
  // ...
}
```

### Environment Variables
- Access via `process.env.VARIABLE_NAME`
- Required variables use non-null assertion
- Never commit `.env` files or secrets

```typescript
const apiKey = process.env.NOTION_API_KEY!;
const dbId = process.env.NOTION_DATABASE_ID!;
```

### Comments
- Keep comments minimal - code should be self-documenting
- Add TODO comments for future work: `// TODO: Add support for X`
- Comment complex logic or non-obvious implementation details

### ESLint Rules
- Config: `next/core-web-vitals` and `next/typescript`
- Common warnings that may need disable:
  - `@typescript-eslint/no-explicit-any` for Notion API property extraction
  - `@next/next/no-img-element` when Next.js Image component can't be used
- Run `npm run lint` before committing changes

### Next.js Specific Patterns
- Use App Router with async server components by default
- Add `export const revalidate = 3600` for ISR (1 hour default)
- Use `next/link` for navigation, `next/image` for images
- Server components are async by default, client components need 'use client'

```typescript
export const revalidate = 3600;

export default async function Page() {
  const data = await fetchData();
  return <Component data={data} />;
}
```

### Tailwind CSS
- Use utility classes for styling
- Responsive design: `className="md:lg:xl:..."`
- Component composition preferred over custom classes

### Path Alias
- `@/*` maps to `./src/*`
- Prefer `@/components/...` over `../../components/...`

### Notion Integration Patterns
- Type assertions when working with Notion API responses
- Helper functions for property extraction
- Support progressive enhancement - add new block types as needed
