---
description: Code quality and security review
---

# Code Review Workflow

Use this workflow to review code for quality, security, and best practices.

## Review Checklist

### 1. TypeScript Type Safety
- [ ] All functions have explicit return types
- [ ] No `any` types (use `unknown` if needed)
- [ ] Proper type guards for runtime validation
- [ ] No type assertions without validation
- [ ] Strict mode enabled and followed

### 2. Next.js Best Practices
- [ ] Server Components used by default
- [ ] Client Components only when necessary (`'use client'`)
- [ ] Proper use of async/await in Server Components
- [ ] ISR configuration appropriate (`revalidate`)
- [ ] Metadata properly configured for SEO
- [ ] Image optimization with Next.js Image component
- [ ] Dynamic imports for heavy components

### 3. Notion API Usage
- [ ] Error handling for API calls
- [ ] Proper data validation and mapping
- [ ] No hardcoded database IDs
- [ ] Efficient query filters
- [ ] Rate limiting considered
- [ ] Graceful fallbacks on errors

### 4. Security
- [ ] No hardcoded secrets or API keys
- [ ] Environment variables properly used
- [ ] Input validation implemented
- [ ] XSS prevention (no dangerouslySetInnerHTML without sanitization)
- [ ] Error messages don't expose sensitive info
- [ ] CORS properly configured (if applicable)

### 5. Code Quality
- [ ] Functions follow single responsibility principle
- [ ] File size within limits (components <200, pages <150, utils <100)
- [ ] Descriptive variable and function names
- [ ] No commented-out code
- [ ] Proper error handling with try-catch
- [ ] Immutable data operations (no mutations)
- [ ] Pure functions where possible

### 6. Testing
- [ ] Unit tests for utilities and helpers
- [ ] Component tests for React components
- [ ] Integration tests for API interactions
- [ ] Test coverage ≥ 80%
- [ ] Edge cases covered
- [ ] Error scenarios tested

### 7. Performance
- [ ] No unnecessary re-renders
- [ ] Memoization used appropriately (useMemo, useCallback)
- [ ] Lazy loading for heavy components
- [ ] Efficient data fetching (parallel when possible)
- [ ] Proper caching strategy

### 8. Accessibility
- [ ] Semantic HTML elements
- [ ] Proper heading hierarchy
- [ ] Alt text for images
- [ ] Keyboard navigation support
- [ ] ARIA labels where needed

### 9. Documentation
- [ ] Complex logic has explanatory comments
- [ ] Public APIs have JSDoc
- [ ] README updated if needed
- [ ] PLANNING.md reflects current state

### 10. Git Workflow
- [ ] Conventional commit format
- [ ] Atomic commits
- [ ] No merge conflicts
- [ ] Branch up to date with main

## Example Usage

```
User: "Review the new PostCard component"

AI Response:
Reviewing PostCard.tsx...

✅ Type Safety:
- Props properly typed with PostCardProps interface
- All functions have explicit return types

✅ Next.js Best Practices:
- Server Component (no 'use client')
- Uses Next.js Image for optimization

⚠️ Code Quality Issues:
- File is 215 lines (exceeds 200 line limit)
- Suggestion: Extract PostMeta into separate component

✅ Performance:
- No unnecessary re-renders
- Proper use of Next.js Image

❌ Testing:
- Missing unit tests
- Action: Create PostCard.test.tsx

✅ Accessibility:
- Semantic HTML (<article>, <time>)
- Alt text present for images

Recommendations:
1. Split PostCard into smaller components
2. Add unit tests
3. Consider memoization if used in large lists
```

## When to Use

- Before committing code
- During pull request review
- After implementing a feature
- When refactoring existing code
- Regular code quality audits
