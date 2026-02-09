---
description: Test-driven development workflow
---

# TDD Workflow

Follow this workflow when implementing new features using test-driven development.

// turbo-all

## Steps

### 1. Define Interfaces and Types

Before writing any tests or implementation, define the types and function signatures.

```typescript
// lib/types.ts
export interface NotionPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  summary: string;
  published: boolean;
}

// lib/notion.ts
export async function getPosts(): Promise<NotionPost[]> {
  // Implementation to follow
}
```

### 2. Write Failing Test (RED)

Write a test that defines the desired behavior. The test should fail initially.

```typescript
// __tests__/lib/notion.test.ts
import { getPosts } from '@/lib/notion';

describe('getPosts', () => {
  it('should return an array of published posts', async () => {
    const posts = await getPosts();
    
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every(post => post.published === true)).toBe(true);
  });
});
```

**Run test:** `npm run test`
**Expected:** ❌ Test fails (function not implemented)

### 3. Implement Minimal Code (GREEN)

Write the minimum code needed to make the test pass.

```typescript
// lib/notion.ts
export async function getPosts(): Promise<NotionPost[]> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: 'Published',
      checkbox: { equals: true },
    },
  });
  
  return response.results.map(mapNotionToPost);
}
```

**Run test:** `npm run test`
**Expected:** ✅ Test passes

### 4. Refactor (IMPROVE)

Improve the code while keeping tests green.

```typescript
// lib/notion.ts - Refactored
const PUBLISHED_FILTER = {
  property: 'Published',
  checkbox: { equals: true },
} as const;

const DATE_SORT = {
  property: 'Date',
  direction: 'descending' as const,
};

export async function getPosts(): Promise<NotionPost[]> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: PUBLISHED_FILTER,
      sorts: [DATE_SORT],
    });
    
    return response.results.map(mapNotionToPost);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
}
```

**Run test:** `npm run test`
**Expected:** ✅ Test still passes

### 5. Verify Coverage ≥ 80%

Check test coverage to ensure adequate testing.

```bash
npm run test -- --coverage
```

**Expected output:**
```
File      | % Stmts | % Branch | % Funcs | % Lines
----------|---------|----------|---------|--------
notion.ts |   85.71 |    75.00 |  100.00 |   85.71
```

If coverage < 80%, add more tests.

### 6. Run All Tests

Ensure all tests pass before committing.

```bash
npm run test
```

**Expected:** ✅ All tests pass

## TDD Cycle Summary

```
1. RED    → Write failing test
2. GREEN  → Write minimal code to pass
3. REFACTOR → Improve code quality
4. VERIFY → Check coverage ≥ 80%
5. REPEAT → Next feature
```

## Example: Adding Tag Filtering

### Step 1: Define Interface

```typescript
// lib/notion.ts
export async function getPostsByTag(tag: string): Promise<NotionPost[]> {
  // To be implemented
}
```

### Step 2: Write Failing Test

```typescript
// __tests__/lib/notion.test.ts
describe('getPostsByTag', () => {
  it('should return posts with specified tag', async () => {
    const posts = await getPostsByTag('typescript');
    
    expect(posts.every(post => 
      post.tags?.includes('typescript')
    )).toBe(true);
  });
});
```

**Run:** ❌ Fails

### Step 3: Implement

```typescript
export async function getPostsByTag(tag: string): Promise<NotionPost[]> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        { property: 'Published', checkbox: { equals: true } },
        { property: 'Tags', multi_select: { contains: tag } },
      ],
    },
  });
  
  return response.results.map(mapNotionToPost);
}
```

**Run:** ✅ Passes

### Step 4: Refactor

```typescript
function createTagFilter(tag: string) {
  return {
    and: [
      PUBLISHED_FILTER,
      { property: 'Tags', multi_select: { contains: tag } },
    ],
  };
}

export async function getPostsByTag(tag: string): Promise<NotionPost[]> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: createTagFilter(tag),
      sorts: [DATE_SORT],
    });
    
    return response.results.map(mapNotionToPost);
  } catch (error) {
    console.error(`Failed to fetch posts for tag ${tag}:`, error);
    return [];
  }
}
```

**Run:** ✅ Still passes

### Step 5: Add Edge Case Tests

```typescript
describe('getPostsByTag', () => {
  it('should return posts with specified tag', async () => {
    const posts = await getPostsByTag('typescript');
    expect(posts.every(post => post.tags?.includes('typescript'))).toBe(true);
  });
  
  it('should return empty array for non-existent tag', async () => {
    const posts = await getPostsByTag('nonexistent');
    expect(posts).toEqual([]);
  });
  
  it('should handle API errors gracefully', async () => {
    mockNotion.databases.query.mockRejectedValue(new Error('API Error'));
    const posts = await getPostsByTag('typescript');
    expect(posts).toEqual([]);
  });
});
```

### Step 6: Verify Coverage

```bash
npm run test -- --coverage
```

Coverage should be ≥ 80%.

## Best Practices

1. **Write test first** - Always RED → GREEN → REFACTOR
2. **Small steps** - One test at a time
3. **Descriptive test names** - Clearly state what is being tested
4. **Test behavior, not implementation** - Focus on what, not how
5. **Keep tests simple** - One assertion per test when possible
6. **Mock external dependencies** - Notion API, environment variables
7. **Test edge cases** - Empty arrays, null values, errors
8. **Maintain high coverage** - Minimum 80%

## When to Use

- Implementing new features
- Adding new utilities or helpers
- Refactoring existing code
- Fixing bugs (write test that reproduces bug first)
- Building critical business logic
