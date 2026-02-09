---
name: security-review
description: Security checklist and best practices for the personal blog project
---

# Security Review Checklist

This skill provides a comprehensive security review checklist for the Next.js + Notion blog.

## Environment Variables Security

### ✅ Required Checks

- [ ] **No hardcoded secrets** in source code
- [ ] All API keys in `.env.local` file
- [ ] `.env.local` is in `.gitignore`
- [ ] Environment variables validated at runtime
- [ ] No secrets in client-side code

### Implementation

```typescript
// lib/env.ts - Environment variable validation
export function validateEnv() {
  const required = ['NOTION_API_KEY', 'NOTION_DATABASE_ID'];
  
  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }
}

// Call in server-side code only
validateEnv();
```

### ❌ Common Mistakes

```typescript
// ❌ NEVER do this
const API_KEY = 'ntn_abc123...'; // Hardcoded secret

// ❌ NEVER expose in client components
'use client';
const key = process.env.NOTION_API_KEY; // Exposed to browser!

// ✅ CORRECT - Server-side only
// app/api/posts/route.ts
export async function GET() {
  const key = process.env.NOTION_API_KEY; // Safe - server-side
  // ...
}
```

## API Security

### Notion API Best Practices

- [ ] **Rate limiting** - Handle 429 responses
- [ ] **Error handling** - Don't expose internal errors
- [ ] **Input validation** - Validate all user inputs
- [ ] **CORS configuration** - Restrict origins if needed

```typescript
// lib/notion.ts - Secure API wrapper
export async function getPosts(): Promise<NotionPost[]> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: 'Published',
        checkbox: { equals: true },
      },
    });
    
    return response.results.map(mapNotionToPost);
  } catch (error) {
    // ✅ Log error server-side
    console.error('Notion API error:', error);
    
    // ❌ Don't expose internal error details
    // throw error;
    
    // ✅ Return safe fallback
    return [];
  }
}
```

### Rate Limiting

```typescript
// lib/rateLimit.ts
const RATE_LIMIT = 3; // requests per second
const cache = new Map<string, number[]>();

export function rateLimit(identifier: string): boolean {
  const now = Date.now();
  const timestamps = cache.get(identifier) || [];
  
  // Remove timestamps older than 1 second
  const recent = timestamps.filter(t => now - t < 1000);
  
  if (recent.length >= RATE_LIMIT) {
    return false; // Rate limit exceeded
  }
  
  recent.push(now);
  cache.set(identifier, recent);
  return true;
}
```

## XSS Prevention

### Content Sanitization

- [ ] **Sanitize user input** (if accepting comments/forms)
- [ ] **Escape HTML** in dynamic content
- [ ] **Use React's built-in escaping** (automatic)
- [ ] **Validate Notion content** before rendering

```typescript
// components/NotionRenderer.tsx
export function NotionRenderer({ blocks }: { blocks: NotionBlock[] }) {
  return blocks.map(block => {
    switch (block.type) {
      case 'paragraph':
        // ✅ React automatically escapes text
        return <p>{block.paragraph.rich_text[0]?.plain_text}</p>;
      
      case 'code':
        // ✅ Use proper code highlighting library
        return <SyntaxHighlighter>{block.code.rich_text[0]?.plain_text}</SyntaxHighlighter>;
      
      default:
        return null;
    }
  });
}
```

### ❌ Dangerous Patterns

```typescript
// ❌ NEVER use dangerouslySetInnerHTML with unsanitized content
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ If you must use it, sanitize first
import DOMPurify from 'isomorphic-dompurify';

<div dangerouslySetInnerHTML={{ 
  __html: DOMPurify.sanitize(content) 
}} />
```

## CSRF Protection

Next.js provides built-in CSRF protection for Server Actions.

```typescript
// app/actions.ts
'use server';

export async function submitForm(formData: FormData) {
  // ✅ Automatically protected by Next.js
  const email = formData.get('email');
  // Process form...
}
```

## SQL Injection Prevention

Not applicable for this project (using Notion API), but if adding a database:

```typescript
// ✅ Use parameterized queries
const result = await db.query(
  'SELECT * FROM posts WHERE slug = $1',
  [slug]
);

// ❌ NEVER concatenate user input
const result = await db.query(
  `SELECT * FROM posts WHERE slug = '${slug}'` // VULNERABLE!
);
```

## Authentication & Authorization

Currently not implemented, but if adding:

### Checklist
- [ ] Use established auth library (NextAuth.js, Clerk, etc.)
- [ ] Implement HTTPS only
- [ ] Use secure session cookies
- [ ] Implement proper password hashing (bcrypt, Argon2)
- [ ] Add rate limiting to login endpoints
- [ ] Implement CSRF tokens
- [ ] Use secure password reset flow

## Content Security Policy (CSP)

```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://api.notion.com",
            ].join('; '),
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
```

## Dependency Security

### Regular Audits

```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Check for outdated packages
npm outdated
```

### Dependabot Configuration

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

## Vercel Deployment Security

### Environment Variables
- [ ] Set environment variables in Vercel dashboard
- [ ] Use different keys for preview/production
- [ ] Enable "Encrypted" option for sensitive vars

### Security Headers
- [ ] Enable HTTPS only
- [ ] Configure security headers in `next.config.ts`
- [ ] Set up custom domain with SSL

## Notion Integration Security

### API Key Management
- [ ] Use integration token (not personal token)
- [ ] Limit integration permissions to minimum required
- [ ] Rotate keys periodically
- [ ] Monitor API usage

### Data Validation

```typescript
// lib/notion.ts - Validate Notion data
function mapNotionToPost(page: any): NotionPost {
  // ✅ Validate required fields
  if (!page.properties.Title?.title?.[0]?.plain_text) {
    throw new Error('Invalid post: missing title');
  }
  
  if (!page.properties.Slug?.rich_text?.[0]?.plain_text) {
    throw new Error('Invalid post: missing slug');
  }
  
  return {
    id: page.id,
    title: page.properties.Title.title[0].plain_text,
    slug: page.properties.Slug.rich_text[0].plain_text,
    // ... other fields
  };
}
```

## Security Review Workflow

### Before Every Deployment

- [ ] Run `npm audit`
- [ ] Check `.env.local` not committed
- [ ] Review new dependencies
- [ ] Test error handling
- [ ] Verify environment variables in Vercel
- [ ] Check security headers
- [ ] Review Notion API permissions

### Monthly Security Tasks

- [ ] Update dependencies
- [ ] Rotate API keys
- [ ] Review access logs
- [ ] Check for new vulnerabilities
- [ ] Update security policies

## Incident Response Plan

If a security issue is discovered:

1. **Assess Impact** - Determine scope and severity
2. **Contain** - Rotate compromised keys immediately
3. **Investigate** - Review logs and access patterns
4. **Fix** - Deploy security patch
5. **Notify** - Inform affected users if necessary
6. **Document** - Record incident and response

## Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/configuring/security)
- [Notion API Security](https://developers.notion.com/docs/authorization)
- [Vercel Security](https://vercel.com/docs/security)
