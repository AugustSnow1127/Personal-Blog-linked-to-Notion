---
name: coding-standards
description: TypeScript and JavaScript coding standards for the personal blog project
---

# Coding Standards

This skill defines the coding standards and best practices for TypeScript/JavaScript in the personal blog project.

## TypeScript Configuration

### Strict Mode (Required)

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Type Safety Rules

```typescript
// ✅ Good - Explicit types
function getPosts(): Promise<NotionPost[]> {
  // implementation
}

// ❌ Avoid - Implicit any
function getData() {
  // TypeScript can't infer return type
}

// ✅ Good - Type guards
function isNotionPost(obj: unknown): obj is NotionPost {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'title' in obj
  );
}

// ❌ Avoid - Type assertions without validation
const post = data as NotionPost; // Unsafe!
```

## Code Organization

### File Structure

```
src/
├── app/              # Next.js pages (App Router)
├── components/       # Reusable React components
├── lib/             # Utilities and helpers
│   ├── notion.ts    # Notion API client
│   ├── utils.ts     # General utilities
│   └── types.ts     # Shared types
└── styles/          # Global styles (if any)
```

### File Size Limits

- **Components**: Max 200 lines
- **Pages**: Max 150 lines
- **Utilities**: Max 100 lines
- **Types**: Max 50 lines per file

**If exceeding limits, split into smaller modules.**

### Single Responsibility Principle

```typescript
// ✅ Good - Each file has one clear purpose
// lib/notion.ts - Notion API interactions only
export async function getPosts() { }
export async function getPostBySlug() { }

// lib/formatters.ts - Formatting utilities only
export function formatDate() { }
export function formatTags() { }

// ❌ Avoid - Mixed responsibilities
// lib/utils.ts - Too many unrelated functions
export function getPosts() { }
export function formatDate() { }
export function validateEmail() { }
```

## Naming Conventions

### Files and Directories

```
✅ Components:     PostCard.tsx, Header.tsx
✅ Utilities:      notion.ts, utils.ts, formatters.ts
✅ Types:          types.ts, notion-types.ts
✅ Tests:          PostCard.test.tsx, notion.test.ts
✅ Directories:    components/, lib/, app/
```

### Variables and Functions

```typescript
// ✅ camelCase for variables and functions
const postCount = 10;
function getPostBySlug(slug: string) { }

// ✅ PascalCase for components and types
function PostCard() { }
interface NotionPost { }
type PostStatus = 'draft' | 'published';

// ✅ UPPER_SNAKE_CASE for constants
const MAX_POSTS_PER_PAGE = 10;
const API_BASE_URL = 'https://api.notion.com';

// ✅ Descriptive names
const publishedPosts = posts.filter(p => p.published);

// ❌ Avoid abbreviations
const psts = getPsts(); // What does this mean?
```

## Functional Programming

### Immutability

```typescript
// ✅ Good - Immutable operations
const newPosts = [...posts, newPost];
const updatedPost = { ...post, title: 'New Title' };

// ❌ Avoid - Mutations
posts.push(newPost);
post.title = 'New Title';

// ✅ Good - Immutable array methods
const publishedPosts = posts.filter(p => p.published);
const titles = posts.map(p => p.title);

// ❌ Avoid - Mutating loops
const publishedPosts = [];
for (let i = 0; i < posts.length; i++) {
  if (posts[i].published) {
    publishedPosts.push(posts[i]);
  }
}
```

### Pure Functions

```typescript
// ✅ Good - Pure function
function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ❌ Avoid - Side effects
let formattedDate = '';
function formatDate(date: string): void {
  formattedDate = new Date(date).toLocaleDateString(); // Side effect!
}
```

### Function Composition

```typescript
// ✅ Good - Composable functions
const getPublishedPosts = (posts: NotionPost[]) =>
  posts.filter(p => p.published);

const sortByDate = (posts: NotionPost[]) =>
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const getRecentPublishedPosts = (posts: NotionPost[]) =>
  sortByDate(getPublishedPosts(posts)).slice(0, 5);
```

## Error Handling

### Explicit Error Handling

```typescript
// ✅ Good - Explicit try-catch
async function getPosts(): Promise<NotionPost[]> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
    });
    return response.results.map(mapNotionToPost);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return []; // Graceful fallback
  }
}

// ❌ Avoid - Unhandled errors
async function getPosts(): Promise<NotionPost[]> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
  }); // What if this fails?
  return response.results.map(mapNotionToPost);
}
```

### Type-Safe Error Handling

```typescript
// ✅ Good - Type-safe error handling
class NotionError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'NotionError';
  }
}

function handleNotionError(error: unknown): void {
  if (error instanceof NotionError) {
    console.error(`Notion API error [${error.code}]:`, error.message);
  } else if (error instanceof Error) {
    console.error('Unexpected error:', error.message);
  } else {
    console.error('Unknown error:', error);
  }
}
```

## Async/Await

### Prefer async/await over Promises

```typescript
// ✅ Good - async/await
async function getPostWithContent(slug: string) {
  const post = await getPostBySlug(slug);
  const content = await getPageContent(post.id);
  return { post, content };
}

// ❌ Avoid - Promise chains
function getPostWithContent(slug: string) {
  return getPostBySlug(slug)
    .then(post => getPageContent(post.id)
      .then(content => ({ post, content }))
    );
}
```

### Parallel Async Operations

```typescript
// ✅ Good - Parallel execution
async function getPostsAndTags() {
  const [posts, tags] = await Promise.all([
    getPosts(),
    getTags(),
  ]);
  return { posts, tags };
}

// ❌ Avoid - Sequential when not needed
async function getPostsAndTags() {
  const posts = await getPosts(); // Waits unnecessarily
  const tags = await getTags();
  return { posts, tags };
}
```

## Comments and Documentation

### When to Comment

```typescript
// ✅ Good - Explain WHY, not WHAT
// Revalidate every hour to balance freshness and API quota
export const revalidate = 3600;

// ✅ Good - Document complex logic
/**
 * Maps Notion page object to our Post type.
 * Handles missing properties gracefully by providing defaults.
 */
function mapNotionToPost(page: NotionPage): NotionPost {
  // implementation
}

// ❌ Avoid - Obvious comments
// Get posts
const posts = await getPosts();

// ❌ Avoid - Commented-out code
// const oldFunction = () => { ... }
```

### JSDoc for Public APIs

```typescript
/**
 * Fetches all published posts from Notion database.
 * Posts are sorted by date in descending order.
 * 
 * @returns Array of published posts
 * @throws {NotionError} If API request fails
 */
export async function getPosts(): Promise<NotionPost[]> {
  // implementation
}
```

## Import Organization

```typescript
// 1. External dependencies
import { Client } from '@notionhq/client';
import { notFound } from 'next/navigation';

// 2. Internal absolute imports (using @/ alias)
import { getPosts } from '@/lib/notion';
import { formatDate } from '@/lib/utils';
import PostCard from '@/components/PostCard';

// 3. Types
import type { NotionPost } from '@/lib/types';

// 4. Relative imports (if any)
import { helper } from './helper';
```

## React Component Standards

### Function Components Only

```typescript
// ✅ Good - Function component
export default function PostCard({ post }: { post: NotionPost }) {
  return <article>{post.title}</article>;
}

// ❌ Avoid - Class components
export default class PostCard extends React.Component {
  render() {
    return <article>{this.props.post.title}</article>;
  }
}
```

### Props Destructuring

```typescript
// ✅ Good - Destructure props
function PostCard({ post, showSummary = true }: PostCardProps) {
  return <article>{post.title}</article>;
}

// ❌ Avoid - Props object
function PostCard(props: PostCardProps) {
  return <article>{props.post.title}</article>;
}
```

### Component Organization

```typescript
// 1. Imports
import { formatDate } from '@/lib/utils';

// 2. Types
interface PostCardProps {
  post: NotionPost;
  showSummary?: boolean;
}

// 3. Component
export default function PostCard({ post, showSummary = true }: PostCardProps) {
  // 3a. Hooks
  const [isExpanded, setIsExpanded] = useState(false);
  
  // 3b. Derived state
  const formattedDate = formatDate(post.date);
  
  // 3c. Event handlers
  const handleClick = () => setIsExpanded(!isExpanded);
  
  // 3d. Render
  return (
    <article onClick={handleClick}>
      <h2>{post.title}</h2>
      <time>{formattedDate}</time>
      {showSummary && <p>{post.summary}</p>}
    </article>
  );
}

// 4. Helper functions (if component-specific)
function formatPostTitle(title: string): string {
  return title.toUpperCase();
}
```

## ESLint and Prettier

### Required Rules

```json
// .eslintrc.json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "no-console": ["warn", { "allow": ["error", "warn"] }],
    "prefer-const": "error",
    "no-var": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "error"
  }
}
```

### Code Formatting

- Use Prettier for consistent formatting
- 2 spaces for indentation
- Single quotes for strings
- Semicolons required
- Trailing commas in multi-line

## Performance Considerations

### Avoid Unnecessary Re-renders

```typescript
// ✅ Good - Memoize expensive computations
const sortedPosts = useMemo(
  () => posts.sort((a, b) => b.date.localeCompare(a.date)),
  [posts]
);

// ✅ Good - Memoize callbacks
const handleClick = useCallback(() => {
  setIsExpanded(!isExpanded);
}, [isExpanded]);
```

### Lazy Loading

```typescript
// ✅ Good - Dynamic imports for heavy components
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false,
});
```

## Code Review Checklist

Before submitting code:

- [ ] No TypeScript errors or warnings
- [ ] ESLint passes with no errors
- [ ] All functions have explicit return types
- [ ] No `any` types (use `unknown` if needed)
- [ ] No hardcoded values (use constants)
- [ ] Error handling implemented
- [ ] Comments explain WHY, not WHAT
- [ ] File size within limits
- [ ] Tests written and passing
- [ ] No console.log statements (use proper logging)
