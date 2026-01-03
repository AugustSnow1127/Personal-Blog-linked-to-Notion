# Personal Blog - Planning Document

## Project Overview

A minimal personal blog that syncs content from Notion, deployed on Vercel with zero database cost.

## Tech Stack

| Component | Technology | Cost |
|-----------|------------|------|
| Frontend | Next.js 14+ (App Router) | Free |
| CMS | Notion API | Free |
| Hosting | Vercel | Free |
| Styling | Tailwind CSS | Free |
| Domain | xxx.vercel.app | Free |

**Total Cost: $0/month**

---

## Architecture

```
┌─────────────┐      Build/ISR       ┌─────────────┐
│   Notion    │ ──────────────────▶  │   Next.js   │
│  Database   │                      │   (Vercel)  │
└─────────────┘                      └─────────────┘
                                            │
                                            ▼
                                     ┌─────────────┐
                                     │   Visitor   │
                                     │  (Browser)  │
                                     └─────────────┘
```

### Sync Strategy: ISR (Incremental Static Regeneration)

- Pages are generated at build time
- Set `revalidate: 3600` (1 hour) - pages auto-refresh every hour
- No API rate limit issues (Notion API only called during revalidation)
- Fast page loads (static HTML served from CDN)

---

## Pages Structure

```
/                    # Home - Recent posts list
/posts/[slug]        # Individual post page
/about               # About Me page
/contact             # Contact page
```

---

## Notion Setup

### Database Structure

Create a Notion database with these properties:

| Property | Type | Description |
|----------|------|-------------|
| Title | Title | Post title |
| Slug | Text | URL-friendly identifier (e.g., `my-first-post`) |
| Published | Checkbox | Only published posts show on blog |
| Date | Date | Publish date |
| Summary | Text | Short description for post list |
| Tags | Multi-select | Optional categorization |

---

## Project Structure

```
personalblog/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home page
│   │   ├── layout.tsx            # Root layout
│   │   ├── about/
│   │   │   └── page.tsx          # About Me
│   │   ├── contact/
│   │   │   └── page.tsx          # Contact
│   │   └── posts/
│   │       └── [slug]/
│   │           └── page.tsx      # Post detail
│   ├── lib/
│   │   └── notion.ts             # Notion API client
│   └── components/
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── PostCard.tsx
│       └── NotionRenderer.tsx    # Render Notion blocks
├── public/
├── .env.local                    # NOTION_API_KEY, NOTION_DATABASE_ID
├── package.json
├── tailwind.config.ts
└── next.config.js
```

---

## Implementation Steps

### Phase 1: Project Setup
- [ ] Initialize Next.js project with TypeScript
- [ ] Install dependencies (Tailwind CSS, @notionhq/client)
- [ ] Configure environment variables

### Phase 2: Notion Integration
- [ ] Create Notion integration and get API key
- [ ] Create Notion database with required properties
- [ ] Implement Notion API client (`lib/notion.ts`)

### Phase 3: Core Pages
- [ ] Build layout (Header, Footer)
- [ ] Create Home page (post list)
- [ ] Create Post detail page with Notion content rendering
- [ ] Create About Me page
- [ ] Create Contact page

### Phase 4: Styling
- [ ] Design responsive layout
- [ ] Style post cards
- [ ] Style Notion content blocks (headings, paragraphs, code, images, etc.)

### Phase 5: Deployment
- [ ] Push to GitHub
- [ ] Connect to Vercel
- [ ] Set environment variables in Vercel
- [ ] Deploy

---

## Environment Variables

```env
NOTION_API_KEY=secret_xxxxx
NOTION_DATABASE_ID=xxxxx
```

---

## Manual Setup Required

### 1. Create Notion Integration
1. Go to https://www.notion.so/my-integrations
2. Click "New integration"
3. Name it (e.g., "Personal Blog")
4. Copy the "Internal Integration Token"

### 2. Share Database with Integration
1. Open your Notion database
2. Click "..." menu → "Connections" → Add your integration

### 3. Get Database ID
1. Open database in browser
2. Copy ID from URL: `notion.so/{workspace}/{DATABASE_ID}?v=...`

---

## ISR Configuration

```typescript
// In each page that needs auto-refresh
export const revalidate = 3600; // Revalidate every 1 hour
```

**Why 1 hour?**
- Notion API free tier: 3 requests/second
- With ISR, API is only called once per hour per page
- Even with 100 posts, that's only 100 requests/hour = negligible

---

## Future Enhancements (Post-MVP)

- [ ] RSS feed
- [ ] Dark mode toggle
- [ ] Search functionality
- [ ] Custom domain
- [ ] Analytics (Vercel Analytics - free tier)
- [ ] Image optimization

---

## Notes

- All user-facing text should be in English
- Notion content is the single source of truth
- No database needed - Notion handles everything
