# GEMINI.md

This file provides guidance to Google Antigravity (Gemini) when working with code in this repository.

## Project Overview

A minimal personal blog using Next.js 16 + Notion API as CMS, deployed on Vercel with zero cost.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # ESLint check
```

## Antigravity Workflows

This project uses Antigravity workflows for common development tasks. Invoke them with slash commands:

### `/plan` - Feature Implementation Planning
Guides you through planning a new feature:
1. Analyze requirements
2. Review existing code
3. Design technical solution
4. Create implementation checklist
5. Identify risks
6. Update PLANNING.md

### `/code-review` - Code Quality Review
Comprehensive code review covering:
- TypeScript type safety
- Next.js best practices
- Notion API usage patterns
- Security vulnerabilities
- Code quality and maintainability
- Testing coverage
- Performance optimization

### `/tdd` - Test-Driven Development
Follows the RED-GREEN-REFACTOR cycle:
1. Define interfaces and types
2. Write failing test (RED)
3. Implement minimal code (GREEN)
4. Refactor and improve
5. Verify coverage ≥ 80%
6. Run all tests

### `/notion-sync` - Notion API Testing
Verifies Notion integration:
1. Check environment variables
2. Test API connection
3. Validate database schema
4. Test data fetching
5. Verify ISR cache strategy
6. Test error handling

### `/security-check` - Security Audit
Performs comprehensive security audit:
- Environment variable security
- Dependency vulnerabilities
- Code security scan
- API security review
- XSS prevention
- Content Security Policy

## Antigravity Skills

Skills provide domain knowledge and best practices. Reference them when needed:

### `frontend-patterns`
- Next.js App Router patterns
- React 19 Server/Client Components
- ISR (Incremental Static Regeneration)
- TypeScript best practices
- Tailwind CSS patterns
- Performance optimization

### `tdd-workflow`
- TDD methodology (RED-GREEN-REFACTOR)
- Testing pyramid (Unit/Integration/E2E)
- Coverage requirements (≥ 80%)
- Mocking strategies
- Test organization

### `security-review`
- Environment variable security
- API security best practices
- XSS prevention
- CSRF protection
- Content Security Policy
- Incident response plan

### `coding-standards`
- TypeScript strict mode
- Functional programming patterns
- Immutability principles
- Code organization
- Naming conventions
- Error handling

## Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home (post list)
│   ├── layout.tsx          # Root layout with Header/Footer
│   ├── posts/[slug]/       # Dynamic post pages
│   ├── about/              # About page
│   └── contact/            # Contact page
├── components/
│   ├── NotionRenderer.tsx  # Renders Notion blocks to React
│   ├── PostCard.tsx        # Post preview card
│   ├── Header.tsx          # Navigation
│   └── Footer.tsx          # Footer
└── lib/
    └── notion.ts           # Notion API client wrapper
```

## Key Patterns

### Notion Integration (lib/notion.ts)
- `getPosts()` - Fetch all published posts (filtered by Published=true, sorted by Date desc)
- `getPostBySlug(slug)` - Fetch single post by slug
- `getPageContent(pageId)` - Fetch Notion blocks for rendering

### ISR Strategy
All pages use `export const revalidate = 3600` (1 hour) for Incremental Static Regeneration.

### Notion Database Properties
| Property | Type | Required |
|----------|------|----------|
| Title | Title | Yes |
| Slug | Text | Yes |
| Published | Checkbox | Yes |
| Date | Date | Yes |
| Summary | Text | Yes |
| Tags | Multi-select | No |

## Environment Variables

```env
NOTION_API_KEY=ntn_xxx      # From notion.com/my-integrations
NOTION_DATABASE_ID=xxx      # From Notion database URL
```

## Tech Stack

- Next.js 16.1.1 (App Router, Turbopack)
- React 19
- TypeScript 5.9
- Tailwind CSS 4.x (via @tailwindcss/postcss)
- @notionhq/client 2.x

## Development Best Practices

- **TDD First**: Use `/tdd` workflow for new features
- **Code Review**: Run `/code-review` before committing
- **Security**: Run `/security-check` before deployment
- **Planning**: Use `/plan` for significant changes
- **Testing**: Maintain ≥ 80% code coverage
- **Type Safety**: No `any` types, use strict TypeScript

## Notes

- NotionRenderer.tsx supports: paragraph, h1-h3, lists, quote, code, divider, image
- Missing block types (toggle, callout, table) return null with TODO comment
- Path alias: `@/*` maps to `./src/*`
- All workflows are in `.agent/workflows/`
- All skills are in `.agent/skills/`
