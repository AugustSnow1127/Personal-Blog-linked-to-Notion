---
name: tdd-workflow
description: Test-driven development methodology and workflow for the personal blog project
---

# TDD Workflow

This skill defines the test-driven development process for building features in the personal blog.

## Core TDD Cycle

### 1. RED - Write Failing Test
Write a test that defines the desired behavior **before** writing implementation code.

```typescript
// __tests__/lib/notion.test.ts
import { getPosts } from '@/lib/notion';

describe('getPosts', () => {
  it('should return an array of published posts', async () => {
    const posts = await getPosts();
    
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.every(post => post.published === true)).toBe(true);
  });
});
```

**Run the test - it should FAIL** ❌

### 2. GREEN - Write Minimal Code
Write the **minimum** code needed to make the test pass.

```typescript
// lib/notion.ts
export async function getPosts(): Promise<NotionPost[]> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: 'Published',
      checkbox: {
        equals: true,
      },
    },
  });
  
  return response.results.map(mapNotionToPost);
}
```

**Run the test - it should PASS** ✅

### 3. REFACTOR - Improve Code
Refactor the code while keeping tests green.

```typescript
// lib/notion.ts - Refactored
const PUBLISHED_FILTER = {
  property: 'Published',
  checkbox: { equals: true },
} as const;

export async function getPosts(): Promise<NotionPost[]> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: PUBLISHED_FILTER,
    sorts: [{ property: 'Date', direction: 'descending' }],
  });
  
  return response.results.map(mapNotionToPost);
}
```

**Run the test - it should still PASS** ✅

## Testing Pyramid

```
        /\
       /  \      E2E Tests (Few)
      /____\     - Critical user flows
     /      \    
    /        \   Integration Tests (Some)
   /__________\  - API interactions, component integration
  /            \ 
 /______________\ Unit Tests (Many)
                  - Pure functions, utilities, helpers
```

### Unit Tests (80% of tests)
Test individual functions and components in isolation.

```typescript
// __tests__/lib/utils.test.ts
import { formatDate } from '@/lib/utils';

describe('formatDate', () => {
  it('should format ISO date to readable format', () => {
    expect(formatDate('2024-01-15')).toBe('January 15, 2024');
  });
  
  it('should handle invalid dates gracefully', () => {
    expect(formatDate('invalid')).toBe('Invalid Date');
  });
});
```

### Integration Tests (15% of tests)
Test how components work together.

```typescript
// __tests__/components/PostCard.test.tsx
import { render, screen } from '@testing-library/react';
import PostCard from '@/components/PostCard';

describe('PostCard', () => {
  const mockPost = {
    id: '1',
    title: 'Test Post',
    slug: 'test-post',
    date: '2024-01-15',
    summary: 'Test summary',
    published: true,
  };
  
  it('should render post information correctly', () => {
    render(<PostCard post={mockPost} />);
    
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Test summary')).toBeInTheDocument();
    expect(screen.getByText('January 15, 2024')).toBeInTheDocument();
  });
});
```

### E2E Tests (5% of tests)
Test critical user flows end-to-end.

```typescript
// e2e/blog.spec.ts (Playwright)
import { test, expect } from '@playwright/test';

test('user can view blog post', async ({ page }) => {
  await page.goto('/');
  await page.click('text=My First Post');
  await expect(page).toHaveURL(/\/posts\/.+/);
  await expect(page.locator('h1')).toContainText('My First Post');
});
```

## Coverage Requirements

**Minimum Coverage: 80%**

```bash
# Run tests with coverage
npm run test -- --coverage

# Coverage thresholds in package.json
{
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

## Mocking Strategies

### Mock External APIs
```typescript
// __tests__/lib/notion.test.ts
import { Client } from '@notionhq/client';

jest.mock('@notionhq/client');

const mockNotion = {
  databases: {
    query: jest.fn(),
  },
};

(Client as jest.Mock).mockImplementation(() => mockNotion);

describe('getPosts', () => {
  beforeEach(() => {
    mockNotion.databases.query.mockResolvedValue({
      results: [
        {
          id: '1',
          properties: {
            Title: { title: [{ plain_text: 'Test' }] },
            // ... other properties
          },
        },
      ],
    });
  });
  
  it('should fetch posts from Notion', async () => {
    const posts = await getPosts();
    expect(mockNotion.databases.query).toHaveBeenCalled();
    expect(posts).toHaveLength(1);
  });
});
```

### Mock Environment Variables
```typescript
// __tests__/lib/notion.test.ts
const originalEnv = process.env;

beforeEach(() => {
  process.env = {
    ...originalEnv,
    NOTION_API_KEY: 'test-key',
    NOTION_DATABASE_ID: 'test-db-id',
  };
});

afterEach(() => {
  process.env = originalEnv;
});
```

## Test Organization

### File Structure
```
__tests__/
├── lib/
│   ├── notion.test.ts
│   └── utils.test.ts
├── components/
│   ├── PostCard.test.tsx
│   ├── Header.test.tsx
│   └── NotionRenderer.test.tsx
└── app/
    └── page.test.tsx

e2e/
├── blog.spec.ts
└── navigation.spec.ts
```

### Naming Conventions
- Test files: `*.test.ts` or `*.test.tsx`
- E2E files: `*.spec.ts`
- Test suites: `describe('ComponentName', () => {})`
- Test cases: `it('should do something', () => {})`

## TDD Workflow Checklist

For each new feature:

- [ ] **Define Interface** - Create types and function signatures
- [ ] **Write Test** - Write a failing test (RED)
- [ ] **Run Test** - Verify it fails for the right reason
- [ ] **Implement** - Write minimal code to pass (GREEN)
- [ ] **Run Test** - Verify it passes
- [ ] **Refactor** - Improve code quality
- [ ] **Run Test** - Verify it still passes
- [ ] **Check Coverage** - Ensure ≥ 80% coverage
- [ ] **Commit** - Commit with descriptive message

## Common Testing Patterns

### Testing Async Functions
```typescript
it('should fetch data asynchronously', async () => {
  const data = await fetchData();
  expect(data).toBeDefined();
});
```

### Testing Error Handling
```typescript
it('should handle errors gracefully', async () => {
  mockNotion.databases.query.mockRejectedValue(new Error('API Error'));
  
  const posts = await getPosts();
  expect(posts).toEqual([]);
});
```

### Testing React Components
```typescript
import { render, screen, fireEvent } from '@testing-library/react';

it('should handle user interactions', () => {
  render(<SearchBar />);
  
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'test' } });
  
  expect(input).toHaveValue('test');
});
```

## Testing Tools

- **Jest**: Unit and integration testing
- **React Testing Library**: Component testing
- **Playwright**: E2E testing
- **MSW (Mock Service Worker)**: API mocking

## Best Practices

1. **Test Behavior, Not Implementation**
   - ✅ Test what the function does
   - ❌ Don't test how it does it

2. **Keep Tests Simple**
   - One assertion per test (when possible)
   - Clear test names
   - Minimal setup

3. **Avoid Test Interdependence**
   - Each test should run independently
   - Use `beforeEach` for setup
   - Use `afterEach` for cleanup

4. **Test Edge Cases**
   - Empty arrays
   - Null/undefined values
   - Error conditions
   - Boundary values

5. **Fast Tests**
   - Mock external dependencies
   - Avoid real network calls
   - Keep tests under 100ms each
