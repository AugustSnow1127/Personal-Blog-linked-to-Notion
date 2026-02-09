---
description: Feature implementation planning workflow
---

# Feature Implementation Planning

Use this workflow when starting a new feature or significant change.

## Steps

1. **Analyze Requirements**
   - Understand the feature request
   - Identify user stories and acceptance criteria
   - Clarify any ambiguities

2. **Review Existing Code**
   - Check current file structure
   - Identify affected components
   - Review related code patterns
   - Check for existing similar implementations

3. **Design Technical Solution**
   - Define new types and interfaces
   - Plan component structure
   - Identify required utilities
   - Consider performance implications
   - Plan for error handling

4. **Create Implementation Checklist**
   - Break down into small, testable tasks
   - Identify dependencies
   - Estimate complexity
   - Plan testing strategy

5. **Identify Risks**
   - Breaking changes
   - Performance concerns
   - Security implications
   - Notion API quota impact

6. **Update PLANNING.md**
   - Document the plan
   - Get user approval if needed
   - Track progress

## Example Usage

```
User: "Add tags filtering to the blog homepage"

AI Response:
1. Requirements Analysis:
   - Display tag filter UI on homepage
   - Filter posts by selected tags
   - Support multiple tag selection
   - Maintain URL state for sharing

2. Existing Code Review:
   - Homepage: app/page.tsx
   - Post data: lib/notion.ts (getPosts)
   - Types: lib/types.ts (NotionPost has tags)

3. Technical Design:
   - Add TagFilter client component
   - Update getPosts to accept tag filter
   - Use URL search params for state
   - Add getUniqueTags utility

4. Implementation Checklist:
   - [ ] Create TagFilter component
   - [ ] Add tag filtering logic to getPosts
   - [ ] Implement URL state management
   - [ ] Add tests for filtering logic
   - [ ] Update homepage to use TagFilter
   - [ ] Add loading states

5. Risks:
   - Need to ensure Notion API supports tag filtering
   - May impact ISR cache strategy
   - URL state needs proper encoding

6. Update PLANNING.md with this plan
```

## When to Use

- Starting a new feature
- Making significant architectural changes
- Refactoring large sections of code
- Before implementing user requests
