# Notion CMS 個人部落格

**演示網址**: [https://www.augustsnow.com/](https://www.augustsnow.com/)

使用 Next.js 16 和 Notion 作為 Headless CMS 打造的極簡優雅個人部落格。支援 Supabase 身份驗證與社群功能，並可在 Vercel 上零成本部署。

[English](README.md) | [繁體中文](README.zh-TW.md)

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?logo=tailwind-css)
![Notion](https://img.shields.io/badge/Notion-API-000000?logo=notion)
![Supabase](https://img.shields.io/badge/Supabase-Auth_&_DB-3ECF8E?logo=supabase)

## ✨ 特色功能

- 📝 **Notion 作為 CMS** - 在 Notion 中管理你的部落格文章
- 🔐 **Supabase 身份驗證** - 支援 GitHub 登入
- 👍 **按讚功能** - 讓讀者對文章按讚
- 💬 **留言系統** - 完整的文章留言討論功能
- 🎨 **雙視圖模式** - 在網格和列表佈局之間切換
- 🖼️ **封面圖片** - 支援文章封面圖片，無圖片時自動顯示佔位符
- 📱 **響應式設計** - 在手機、平板和桌機上都完美運作
- ⚡ **ISR（增量靜態再生成）** - 每小時自動更新
- 🎯 **SEO 友善** - 自動 metadata 和 Open Graph 支援
- 💾 **LocalStorage** - 記住你偏好的視圖模式

## 🛠️ 技術堆疊

- **框架：** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **後端服務：** [Supabase](https://supabase.com/) (Auth, Database)
- **CMS：** [Notion API](https://developers.notion.com/)
- **樣式：** [Tailwind CSS 4](https://tailwindcss.com/)
- **語言：** [TypeScript](https://www.typescriptlang.org/)
- **部署：** [Vercel](https://vercel.com/)

## 📋 前置需求

開始之前，請確保你有：

- 已安裝 **Node.js 18+**
- 一個 **Notion 帳號**（免費）
- 一個 **GitHub 帳號**
- 一個 **Supabase 帳號**（免費）
- 一個 **Vercel 帳號**（免費，用於部署）

## 🚀 快速開始

### 1. 安裝與設定

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/Personal-Blog-linked-to-Notion.git
cd Personal-Blog-linked-to-Notion

# 安裝依賴
npm install
```

### 2. 設定 Notion (請參考原始文件)

> 📘 **詳細指南**: 關於 Notion 的詳細設定步驟，請參考 [guides/NOTION_SETUP_SOP.md](guides/NOTION_SETUP_SOP.md)。

請依照 Notion API 官方說明取得 `NOTION_API_KEY` 與 `NOTION_DATABASE_ID`。

### 3. 設定 Supabase

> 📘 **詳細指南**: 請參考 [guides/SUPABASE_SETUP_SOP.md](guides/SUPABASE_SETUP_SOP.md) 以獲得詳細的圖文設定教學。

1. 建立一個新的 Supabase 專案。
2. 在 **Authentication** -> **Providers** 中啟用 **GitHub**，並填入 Client ID 和 Secret。
3. 在 **SQL Editor** 中執行以下指令以建立資料表：

```sql
-- 建立按讚資料表
create table post_likes (
  id uuid primary key default gen_random_uuid(),
  post_slug text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  unique(post_slug, user_id)
);

-- 建立留言資料表
create table post_comments (
  id uuid primary key default gen_random_uuid(),
  post_slug text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  user_name text,
  avatar_url text,
  created_at timestamp with time zone default now()
);

-- 啟用 RLS (Row Level Security)
alter table post_likes enable row level security;
alter table post_comments enable row level security;

-- 設定存取策略 (Policies)
-- ... (請參考實作計畫中的完整 Policies)
```

### 4. 設定環境變數

在根目錄建立 `.env.local` 檔案：

```env
# Notion 配置
NOTION_API_KEY=your_notion_key
NOTION_DATABASE_ID=your_database_id

# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. 本地運行

```bash
npm run dev
```

## 🌐 部署到 Vercel

> 📘 **詳細指南**: 請參考 [guides/VERCEL_DEPLOYMENT_SOP.md](guides/VERCEL_DEPLOYMENT_SOP.md) 以獲得完整的部署流程說明。

1. 將程式碼推送到 GitHub。
2. 在 Vercel 匯入您的專案。
3. **重要**：在 Vercel 設定中新增以下環境變數 (Environment Variables)：
   - `NOTION_API_KEY`
   - `NOTION_DATABASE_ID`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. 點擊 Deploy！

### 自訂網域

> 📘 **網域設定**: 如果您想使用自己的網域（例如 www.yourname.com），請參考 [guides/DOMAIN_SETUP_SOP.md](guides/DOMAIN_SETUP_SOP.md)。

## 🤝 貢獻

歡迎提交 Pull Request 或開啟 Issue！

## 📄 授權

[MIT License](LICENSE)

---

**由 [AugustSnow](https://github.com/AugustSnow1127) 製作**
