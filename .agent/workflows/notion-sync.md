---
description: Notion API synchronization and testing
---

# Notion API Sync Workflow

Use this workflow to test and verify Notion API integration.

## Steps

### 1. Verify Environment Variables

Check that all required environment variables are set.

```bash
# Check .env.local exists
Get-Content .env.local

# Verify required variables
# NOTION_API_KEY=ntn_...
# NOTION_DATABASE_ID=...
```

**Checklist:**
- [ ] `.env.local` file exists
- [ ] `NOTION_API_KEY` is set
- [ ] `NOTION_DATABASE_ID` is set
- [ ] `.env.local` is in `.gitignore`

### 2. Test Notion API Connection

Verify that the Notion API client can connect successfully.

```typescript
// Test in Node.js or create a test file
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function testConnection() {
  try {
    const response = await notion.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ID!,
    });
    console.log('✅ Connection successful');
    console.log('Database title:', response.title);
  } catch (error) {
    console.error('❌ Connection failed:', error);
  }
}

testConnection();
```

**Expected:** ✅ Connection successful

### 3. Check Database Schema

Verify that the Notion database has all required properties.

**Required Properties:**
- [ ] `Title` (Title type)
- [ ] `Slug` (Text type)
- [ ] `Published` (Checkbox type)
- [ ] `Date` (Date type)
- [ ] `Summary` (Text type)
- [ ] `Tags` (Multi-select type) - Optional

```typescript
async function checkSchema() {
  const db = await notion.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID!,
  });
  
  const properties = Object.keys(db.properties);
  console.log('Database properties:', properties);
  
  const required = ['Title', 'Slug', 'Published', 'Date', 'Summary'];
  const missing = required.filter(prop => !properties.includes(prop));
  
  if (missing.length > 0) {
    console.error('❌ Missing properties:', missing);
  } else {
    console.log('✅ All required properties present');
  }
}
```

### 4. Test Data Fetching

Test fetching posts from Notion.

```typescript
import { getPosts } from '@/lib/notion';

async function testFetchPosts() {
  try {
    const posts = await getPosts();
    console.log(`✅ Fetched ${posts.length} posts`);
    
    if (posts.length > 0) {
      console.log('Sample post:', {
        title: posts[0].title,
        slug: posts[0].slug,
        date: posts[0].date,
        published: posts[0].published,
      });
    }
  } catch (error) {
    console.error('❌ Failed to fetch posts:', error);
  }
}
```

**Expected:** ✅ Posts fetched successfully

### 5. Verify ISR Cache Strategy

Check that ISR (Incremental Static Regeneration) is configured correctly.

**Checklist:**
- [ ] `revalidate` export in page components
- [ ] Appropriate revalidation time (3600 = 1 hour)
- [ ] Static generation working in production

```typescript
// app/page.tsx
export const revalidate = 3600; // 1 hour

// app/posts/[slug]/page.tsx
export const revalidate = 3600; // 1 hour
```

### 6. Test Error Handling

Verify graceful error handling for API failures.

```typescript
// Test with invalid API key
process.env.NOTION_API_KEY = 'invalid_key';

async function testErrorHandling() {
  const posts = await getPosts();
  
  if (posts.length === 0) {
    console.log('✅ Error handled gracefully (returned empty array)');
  } else {
    console.error('❌ Error not handled properly');
  }
}
```

**Expected:** ✅ Returns empty array on error

## Common Issues and Solutions

### Issue: "Unauthorized" Error

**Cause:** Invalid or missing API key

**Solution:**
1. Check `.env.local` has correct `NOTION_API_KEY`
2. Verify integration is connected to the database
3. Ensure integration has read permissions

### Issue: "Object not found" Error

**Cause:** Invalid database ID

**Solution:**
1. Check `NOTION_DATABASE_ID` in `.env.local`
2. Verify database ID from Notion URL
3. Ensure integration has access to the database

### Issue: No Posts Returned

**Cause:** No published posts or incorrect filter

**Solution:**
1. Check database has posts with `Published = true`
2. Verify filter in `getPosts()` function
3. Check database properties match expected schema

### Issue: Missing Properties

**Cause:** Database schema doesn't match code expectations

**Solution:**
1. Add missing properties to Notion database
2. Update `mapNotionToPost()` to handle optional properties
3. Provide default values for missing data

## Rate Limiting

Notion API has rate limits:
- **3 requests per second** per integration

**Best Practices:**
- Use ISR to cache data
- Implement exponential backoff on 429 errors
- Batch requests when possible

```typescript
async function fetchWithRetry(fn: () => Promise<any>, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      if (error.code === 'rate_limited' && i < retries - 1) {
        const delay = Math.pow(2, i) * 1000; // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
}
```

## Monitoring

### Check API Usage

Monitor Notion API usage in integration settings:
- https://www.notion.so/my-integrations

### Log API Calls

```typescript
export async function getPosts(): Promise<NotionPost[]> {
  console.log('[Notion API] Fetching posts...');
  const start = Date.now();
  
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: PUBLISHED_FILTER,
    });
    
    const duration = Date.now() - start;
    console.log(`[Notion API] Fetched ${response.results.length} posts in ${duration}ms`);
    
    return response.results.map(mapNotionToPost);
  } catch (error) {
    console.error('[Notion API] Error:', error);
    return [];
  }
}
```

## When to Use

- Setting up Notion integration for the first time
- Debugging Notion API issues
- Verifying database schema changes
- Testing after Notion API updates
- Monitoring API performance
