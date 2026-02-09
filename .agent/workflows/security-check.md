---
description: Security audit and vulnerability check
---

# Security Check Workflow

Use this workflow to perform a comprehensive security audit of the codebase.

## Security Audit Checklist

### 1. Environment Variables

- [ ] No hardcoded secrets in source code
- [ ] All API keys in `.env.local`
- [ ] `.env.local` in `.gitignore`
- [ ] Environment variables validated at runtime
- [ ] No secrets exposed in client-side code

```bash
# Search for potential hardcoded secrets
grep -r "ntn_" src/
grep -r "secret_" src/
grep -r "api_key" src/

# Expected: No results (all in .env.local)
```

### 2. Dependency Vulnerabilities

```bash
# Check for known vulnerabilities
npm audit

# View detailed report
npm audit --json

# Fix automatically (if possible)
npm audit fix
```

**Action:** Fix all HIGH and CRITICAL vulnerabilities

### 3. Code Security Scan

- [ ] No `eval()` or `Function()` usage
- [ ] No `dangerouslySetInnerHTML` without sanitization
- [ ] Input validation on all user inputs
- [ ] Proper error handling (no sensitive info in errors)
- [ ] CORS configured correctly

```bash
# Search for dangerous patterns
grep -r "eval(" src/
grep -r "dangerouslySetInnerHTML" src/
grep -r "innerHTML" src/
```

### 4. API Security

- [ ] Rate limiting implemented
- [ ] Error messages don't expose internals
- [ ] API responses validated
- [ ] Notion API errors handled gracefully

```typescript
// Check lib/notion.ts for proper error handling
export async function getPosts(): Promise<NotionPost[]> {
  try {
    // API call
  } catch (error) {
    console.error('Notion API error:', error); // ✅ Log server-side
    return []; // ✅ Safe fallback
    // ❌ Don't: throw error; (exposes internals)
  }
}
```

### 5. Authentication & Authorization

Currently not implemented. If adding:

- [ ] Use established auth library (NextAuth.js, Clerk)
- [ ] HTTPS only
- [ ] Secure session cookies
- [ ] Password hashing (bcrypt, Argon2)
- [ ] Rate limiting on auth endpoints
- [ ] CSRF protection

### 6. Content Security Policy

```typescript
// Check next.config.ts for security headers
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; ..."
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ];
  }
};
```

### 7. XSS Prevention

- [ ] React's automatic escaping used
- [ ] No user input directly in HTML
- [ ] Notion content validated before rendering
- [ ] Sanitization library used if needed (DOMPurify)

```typescript
// Check components/NotionRenderer.tsx
export function NotionRenderer({ blocks }: { blocks: NotionBlock[] }) {
  return blocks.map(block => {
    // ✅ React automatically escapes
    return <p>{block.paragraph.rich_text[0]?.plain_text}</p>;
    
    // ❌ Dangerous
    // return <div dangerouslySetInnerHTML={{ __html: block.html }} />;
  });
}
```

### 8. HTTPS and SSL

- [ ] Vercel automatically provides HTTPS
- [ ] Custom domain has SSL certificate
- [ ] No mixed content warnings
- [ ] HSTS header configured

### 9. Git Security

```bash
# Check git history for accidentally committed secrets
git log -p | grep -i "api_key\|secret\|password"

# Check current branch for secrets
git diff main | grep -i "api_key\|secret\|password"
```

**If secrets found:**
1. Rotate the compromised keys immediately
2. Use `git filter-branch` or BFG Repo-Cleaner to remove from history
3. Force push (if safe to do so)

### 10. Vercel Deployment Security

- [ ] Environment variables set in Vercel dashboard
- [ ] Different keys for preview/production
- [ ] "Encrypted" option enabled for sensitive vars
- [ ] Deployment protection enabled (if needed)

## Automated Security Checks

### GitHub Actions (Optional)

```yaml
# .github/workflows/security.yml
name: Security Audit

on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm audit
      - run: npm run lint
```

### Pre-commit Hook

```bash
# .husky/pre-commit
#!/bin/sh
npm audit
npm run lint
```

## Security Incident Response

If a security issue is discovered:

1. **Assess Impact**
   - Determine scope and severity
   - Identify affected users/data

2. **Contain**
   - Rotate compromised keys immediately
   - Deploy fix to production ASAP

3. **Investigate**
   - Review logs and access patterns
   - Identify root cause

4. **Fix**
   - Implement security patch
   - Add tests to prevent regression

5. **Notify**
   - Inform affected users if necessary
   - Update security documentation

6. **Document**
   - Record incident details
   - Document response actions
   - Update security procedures

## Security Best Practices

### Regular Tasks

**Weekly:**
- [ ] Run `npm audit`
- [ ] Check for outdated dependencies

**Monthly:**
- [ ] Rotate API keys
- [ ] Review access logs
- [ ] Update dependencies

**Quarterly:**
- [ ] Full security audit
- [ ] Review and update security policies
- [ ] Penetration testing (if applicable)

### Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security)
- [Notion API Security](https://developers.notion.com/docs/authorization)
- [Vercel Security](https://vercel.com/docs/security)

## When to Use

- Before every deployment
- After adding new dependencies
- When implementing new features
- After security vulnerability announcements
- Regular monthly audits
- Before going to production
