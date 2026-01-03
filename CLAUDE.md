# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A minimal personal blog using Next.js 16 + Notion API as CMS, deployed on Vercel with zero cost.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # ESLint check
```

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

## Notes

- NotionRenderer.tsx supports: paragraph, h1-h3, lists, quote, code, divider, image
- Missing block types (toggle, callout, table) return null with TODO comment
- Path alias: `@/*` maps to `./src/*`
