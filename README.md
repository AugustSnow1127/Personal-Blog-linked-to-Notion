# Personal Blog with Notion CMS

A minimal, elegant personal blog powered by Next.js 16 and Notion as a headless CMS. Now featuring Supabase authentication, likes, and comments. Zero cost deployment on Vercel.

[English](README.md) | [繁體中文](README.zh-TW.md)

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?logo=tailwind-css)
![Notion](https://img.shields.io/badge/Notion-API-000000?logo=notion)
![Supabase](https://img.shields.io/badge/Supabase-Auth_&_DB-3ECF8E?logo=supabase)

## ✨ Features

- 📝 **Notion as CMS** - Manage your blog posts in Notion
- 🔐 **Supabase Auth** - GitHub login support
- 👍 **Likes System** - Let readers like your posts
- 💬 **Comments** - Full featured comment section
- 🎨 **Two View Modes** - Toggle between Grid and List layouts
- 🖼️ **Cover Images** - Support for post cover images with placeholder fallback
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- ⚡ **ISR (Incremental Static Regeneration)** - Auto-updates every hour
- 🎯 **SEO Friendly** - Automatic metadata and Open Graph support
- 💾 **LocalStorage** - Remembers your preferred view mode

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Backend:** [Supabase](https://supabase.com/) (Auth, Database)
- **CMS:** [Notion API](https://developers.notion.com/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Deployment:** [Vercel](https://vercel.com/)

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** installed
- A **Notion account** (free)
- A **GitHub account**
- A **Supabase account** (free)
- A **Vercel account** (free, for deployment)

## 🚀 Quick Start

### 1. Installation

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/Personal-Blog-linked-to-Notion.git
cd Personal-Blog-linked-to-Notion

# Install dependencies
npm install
```

### 2. Configure Notion
Please refer to the official Notion API documentation to get your `NOTION_API_KEY` and `NOTION_DATABASE_ID`.

### 3. Configure Supabase

1. Create a new Supabase project.
2. Enable **GitHub** in **Authentication** -> **Providers**, and enter your Client ID and Secret.
3. Run the following SQL in the **SQL Editor** to create tables:

```sql
-- Create likes table
create table post_likes (
  id uuid primary key default gen_random_uuid(),
  post_slug text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  unique(post_slug, user_id)
);

-- Create comments table
create table post_comments (
  id uuid primary key default gen_random_uuid(),
  post_slug text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  user_name text,
  avatar_url text,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table post_likes enable row level security;
alter table post_comments enable row level security;

-- Add policies (See implementation details for full RLS policies)
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Notion Configuration
NOTION_API_KEY=your_notion_key
NOTION_DATABASE_ID=your_database_id

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your blog!

## 🤝 Contributing

Contributions are welcome!

## 📄 License

[MIT License](LICENSE)

---

**Made with ❤️ by [AugustSnow](https://github.com/AugustSnow1127)**
