# Personal Blog with Notion CMS

A minimal, elegant personal blog powered by Next.js 16 and Notion as a headless CMS. Zero cost deployment on Vercel.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?logo=tailwind-css)
![Notion](https://img.shields.io/badge/Notion-API-000000?logo=notion)

## ✨ Features

- 📝 **Notion as CMS** - Manage your blog posts in Notion
- 🎨 **Two View Modes** - Toggle between Grid and List layouts
- 🖼️ **Cover Images** - Support for post cover images with placeholder fallback
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- ⚡ **ISR (Incremental Static Regeneration)** - Auto-updates every hour
- 🎯 **SEO Friendly** - Automatic metadata and Open Graph support
- 🌐 **Next.js 16** - Built with the latest Next.js App Router
- 💨 **Tailwind CSS** - Fast and customizable styling
- 🔒 **Type-Safe** - Full TypeScript support
- 💾 **LocalStorage** - Remembers your preferred view mode

## 📸 Screenshots

### Grid View
Blog posts displayed in a beautiful card grid layout with cover images.

### List View
Traditional list layout for focused reading experience.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **CMS:** [Notion API](https://developers.notion.com/)
- **Fonts:** [Google Fonts (Open Sans)](https://fonts.google.com/)
- **Deployment:** [Vercel](https://vercel.com/)

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** installed
- A **Notion account** (free)
- A **GitHub account**
- A **Vercel account** (free, for deployment)

## 🚀 Quick Start

### 1. Fork this Repository

Click the "Fork" button at the top right of this page to create your own copy.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/Personal-Blog-linked-to-Notion.git
cd Personal-Blog-linked-to-Notion
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Set Up Notion

#### 4.1 Create a Notion Integration

1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click "+ New integration"
3. Name it (e.g., "My Blog")
4. Select the workspace where you'll create your blog database
5. Click "Submit"
6. Copy the **Internal Integration Token** (starts with `secret_` or `ntn_`)

#### 4.2 Create a Notion Database

1. In Notion, create a new **full-page database**
2. Add the following properties:

| Property Name | Type | Required | Description |
|---------------|------|----------|-------------|
| `Title` | Title | ✅ Yes | Post title |
| `Slug` | Text | ✅ Yes | URL slug (e.g., "my-first-post") |
| `Published` | Checkbox | ✅ Yes | Whether to publish the post |
| `Date` | Date | ✅ Yes | Publication date |
| `Summary` | Text | ✅ Yes | Short description |
| `Tags` | Multi-select | ❌ No | Post categories |
| `Cover` | Files & media | ❌ No | Cover image |

3. **Share the database with your integration:**
   - Click the "..." menu at the top right of your database
   - Click "Add connections"
   - Select your integration

4. **Copy the Database ID:**
   - Your database URL looks like: `https://notion.so/yourworkspace/DATABASE_ID?v=...`
   - Copy the `DATABASE_ID` part (32 characters, no dashes)

### 5. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Notion Configuration
NOTION_API_KEY=your_notion_integration_token
NOTION_DATABASE_ID=your_database_id

# Author Avatar (optional)
NEXT_PUBLIC_AUTHOR_AVATAR_URL=/avatar.jpg
```

**Important:** Never commit `.env.local` to git (it's already in `.gitignore`)

### 6. Add Your Avatar

Replace `public/avatar.jpg` with your own photo:
- Recommended size: 256x256px or larger
- Format: JPG, PNG, or WebP

### 7. Run Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your blog!

## 📝 Creating Your First Post

1. In your Notion database, click "+ New"
2. Fill in the required fields:
   - **Title:** Your post title
   - **Slug:** URL-friendly version (e.g., "my-first-post")
   - **Published:** ✅ Check this box
   - **Date:** Publication date
   - **Summary:** Brief description
   - **Cover:** (Optional) Upload a cover image
   - **Tags:** (Optional) Add tags
3. Write your post content using Notion's editor
4. Your post will appear on your blog within 1 hour (or immediately on localhost)

## 🌐 Deploy to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial setup"
git push
```

### 2. Deploy on Vercel

1. Visit [https://vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Import your forked repository
5. **Configure Environment Variables:**
   - Add `NOTION_API_KEY`
   - Add `NOTION_DATABASE_ID`
   - Add `NEXT_PUBLIC_AUTHOR_AVATAR_URL` (optional)
6. Click "Deploy"
7. Wait ~2 minutes for deployment to complete
8. Your blog is live! 🎉

### Auto-Deploy

Every time you push to the `main` branch, Vercel will automatically redeploy your blog.

## ⚙️ Customization

### Update Site Title

Edit `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Your Name",  // Change this
  description: "Your blog description",  // Change this
};
```

### Update Header Title

Edit `src/components/Header.tsx`:

```typescript
<Link href="/" className="text-xl font-bold...">
  Your Name  // Change "AugustSnow" to your name
</Link>
```

### Change Colors

Edit Tailwind classes in components, or extend `tailwind.config.ts`.

### Update Contact Info

Edit `src/app/contact/page.tsx` with your own contact details.

### Adjust Update Frequency

In `src/app/page.tsx` and `src/app/posts/[slug]/page.tsx`:

```typescript
export const revalidate = 3600;  // Change to your preferred interval (in seconds)
```

- `3600` = 1 hour (default)
- `600` = 10 minutes
- `60` = 1 minute

**Note:** Lower values = more Notion API calls

## 🔧 Configuration

### Allowed Image Domains

If your Notion cover images come from specific domains, add them to `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-image-cdn.com',
    },
  ],
},
```

## 📚 Supported Notion Blocks

- ✅ Paragraphs
- ✅ Headings (H1, H2, H3)
- ✅ Bulleted lists
- ✅ Numbered lists
- ✅ Quotes
- ✅ Code blocks
- ✅ Dividers
- ✅ Images

## 🐛 Troubleshooting

### Posts Not Showing

1. Ensure the `Published` checkbox is checked
2. Verify your Notion database is shared with the integration
3. Check environment variables are correct
4. Wait up to 1 hour for ISR to update (or redeploy on Vercel)

### Images Not Loading

1. Check `next.config.ts` includes the image hostname
2. Verify the image URL is accessible
3. Try re-uploading the image to Notion

### Build Errors on Vercel

1. Check environment variables are set correctly
2. Ensure `NOTION_API_KEY` and `NOTION_DATABASE_ID` are not swapped
3. Verify your Notion database has all required properties

## 📖 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Notion API Reference](https://developers.notion.com/reference)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vercel Deployment Docs](https://vercel.com/docs)

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Notion](https://notion.so/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Deployed on [Vercel](https://vercel.com/)

## 💬 Questions?

If you have questions or run into issues, please [open an issue](https://github.com/YOUR_USERNAME/Personal-Blog-linked-to-Notion/issues).

---

**Made with ❤️ by [AugustSnow](https://github.com/AugustSnow1127)**

Happy blogging! ✨

---
---

# 個人部落格 with Notion CMS

使用 Next.js 16 和 Notion 作為 Headless CMS 打造的極簡優雅個人部落格。在 Vercel 上零成本部署。

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?logo=tailwind-css)
![Notion](https://img.shields.io/badge/Notion-API-000000?logo=notion)

## ✨ 特色功能

- 📝 **Notion 作為 CMS** - 在 Notion 中管理你的部落格文章
- 🎨 **雙視圖模式** - 在網格和列表佈局之間切換
- 🖼️ **封面圖片** - 支援文章封面圖片，無圖片時自動顯示佔位符
- 📱 **響應式設計** - 在手機、平板和桌機上都完美運作
- ⚡ **ISR（增量靜態再生成）** - 每小時自動更新
- 🎯 **SEO 友善** - 自動 metadata 和 Open Graph 支援
- 🌐 **Next.js 16** - 使用最新的 Next.js App Router
- 💨 **Tailwind CSS** - 快速且可自訂的樣式
- 🔒 **型別安全** - 完整的 TypeScript 支援
- 💾 **LocalStorage** - 記住你偏好的視圖模式

## 📸 截圖

### 網格視圖
以精美的卡片網格佈局展示部落格文章和封面圖片。

### 列表視圖
傳統列表佈局，提供專注的閱讀體驗。

## 🛠️ 技術堆疊

- **框架：** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **語言：** [TypeScript](https://www.typescriptlang.org/)
- **樣式：** [Tailwind CSS 4](https://tailwindcss.com/)
- **CMS：** [Notion API](https://developers.notion.com/)
- **字體：** [Google Fonts (Open Sans)](https://fonts.google.com/)
- **部署：** [Vercel](https://vercel.com/)

## 📋 前置需求

開始之前，請確保你有：

- 已安裝 **Node.js 18+**
- 一個 **Notion 帳號**（免費）
- 一個 **GitHub 帳號**
- 一個 **Vercel 帳號**（免費，用於部署）

## 🚀 快速開始

### 1. Fork 這個 Repository

點擊頁面右上角的 "Fork" 按鈕來創建你自己的副本。

### 2. Clone 你的 Fork

```bash
git clone https://github.com/YOUR_USERNAME/Personal-Blog-linked-to-Notion.git
cd Personal-Blog-linked-to-Notion
```

### 3. 安裝依賴

```bash
npm install
```

### 4. 設定 Notion

#### 4.1 建立 Notion Integration

1. 前往 [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. 點擊 "+ New integration"
3. 命名（例如："My Blog"）
4. 選擇你要建立部落格資料庫的工作區
5. 點擊 "Submit"
6. 複製 **Internal Integration Token**（以 `secret_` 或 `ntn_` 開頭）

#### 4.2 建立 Notion Database

1. 在 Notion 中，建立一個新的**全頁資料庫**
2. 新增以下屬性：

| 屬性名稱 | 類型 | 必填 | 說明 |
|---------|------|------|------|
| `Title` | Title | ✅ 是 | 文章標題 |
| `Slug` | Text | ✅ 是 | URL slug（例如："my-first-post"） |
| `Published` | Checkbox | ✅ 是 | 是否發布文章 |
| `Date` | Date | ✅ 是 | 發布日期 |
| `Summary` | Text | ✅ 是 | 簡短描述 |
| `Tags` | Multi-select | ❌ 否 | 文章分類 |
| `Cover` | Files & media | ❌ 否 | 封面圖片 |

3. **分享資料庫給你的 integration：**
   - 點擊資料庫右上角的 "..." 選單
   - 點擊 "Add connections"
   - 選擇你的 integration

4. **複製 Database ID：**
   - 你的資料庫 URL 看起來像：`https://notion.so/yourworkspace/DATABASE_ID?v=...`
   - 複製 `DATABASE_ID` 部分（32 個字元，沒有破折號）

### 5. 配置環境變數

在根目錄建立 `.env.local` 檔案：

```env
# Notion 配置
NOTION_API_KEY=your_notion_integration_token
NOTION_DATABASE_ID=your_database_id

# 作者頭像（可選）
NEXT_PUBLIC_AUTHOR_AVATAR_URL=/avatar.jpg
```

**重要：** 永遠不要將 `.env.local` 提交到 git（在 `.gitignore` 中排除）

### 6. 新增你的頭像

用你自己的照片替換 `public/avatar.jpg`：
- 建議尺寸：256x256px 或更大
- 格式：JPG、PNG 或 WebP

### 7. 本地運行

```bash
npm run dev
```

訪問 [http://localhost:3000](http://localhost:3000) 查看你的部落格！

## 📝 建立你的第一篇文章

1. 在你的 Notion 資料庫中，點擊 "+ New"
2. 填寫必填欄位：
   - **Title：** 你的文章標題
   - **Slug：** URL 友善版本（例如："my-first-post"）
   - **Published：** ✅ 勾選此框
   - **Date：** 發布日期
   - **Summary：** 簡短描述
   - **Cover：**（可選）上傳封面圖片
   - **Tags：**（可選）新增標籤
3. 使用 Notion 的編輯器撰寫你的文章內容
4. 你的文章會在 1 小時內出現在部落格上（在 localhost 上會立即顯示）

## 🌐 部署到 Vercel

### 1. 推送到 GitHub

```bash
git add .
git commit -m "Initial setup"
git push
```

### 2. 在 Vercel 上部署

1. 訪問 [https://vercel.com](https://vercel.com)
2. 使用 GitHub 登入
3. 點擊 "Add New..." → "Project"
4. 匯入你 fork 的 repository
5. **配置環境變數：**
   - 新增 `NOTION_API_KEY`
   - 新增 `NOTION_DATABASE_ID`
   - 新增 `NEXT_PUBLIC_AUTHOR_AVATAR_URL`（可選）
6. 點擊 "Deploy"
7. 等待約 2 分鐘完成部署
8. 你的部落格上線了！🎉

### 自動部署

每次你推送到 `main` 分支，Vercel 會自動重新部署你的部落格。

## ⚙️ 自訂設定

### 更新網站標題

編輯 `src/app/layout.tsx`：

```typescript
export const metadata: Metadata = {
  title: "你的名字",  // 修改這裡
  description: "你的部落格描述",  // 修改這裡
};
```

### 更新 Header 標題

編輯 `src/components/Header.tsx`：

```typescript
<Link href="/" className="text-xl font-bold...">
  你的名字  // 將 "AugustSnow" 改成你的名字
</Link>
```

### 更改顏色

在組件中編輯 Tailwind class，或擴展 `tailwind.config.ts`。

### 更新聯絡資訊

使用你自己的聯絡資訊編輯 `src/app/contact/page.tsx`。

### 調整更新頻率

在 `src/app/page.tsx` 和 `src/app/posts/[slug]/page.tsx` 中：

```typescript
export const revalidate = 3600;  // 改成你偏好的間隔時間（秒）
```

- `3600` = 1 小時（預設）
- `600` = 10 分鐘
- `60` = 1 分鐘

**注意：** 數值越小 = Notion API 呼叫次數越多

## 🔧 配置

### 允許的圖片域名

如果你的 Notion 封面圖片來自特定域名，請將它們新增到 `next.config.ts`：

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-image-cdn.com',
    },
  ],
},
```

## 📚 支援的 Notion 區塊

- ✅ 段落
- ✅ 標題（H1、H2、H3）
- ✅ 項目列表
- ✅ 編號列表
- ✅ 引用
- ✅ 程式碼區塊
- ✅ 分隔線
- ✅ 圖片

## 🐛 疑難排解

### 文章沒有顯示

1. 確保 `Published` 核取方塊已勾選
2. 驗證你的 Notion 資料庫已與 integration 分享
3. 檢查環境變數是否正確
4. 等待最多 1 小時讓 ISR 更新（或在 Vercel 上重新部署）

### 圖片無法載入

1. 檢查 `next.config.ts` 是否包含圖片主機名稱
2. 驗證圖片 URL 是否可訪問
3. 嘗試重新上傳圖片到 Notion

### Vercel 上的建置錯誤

1. 檢查環境變數設定是否正確
2. 確保 `NOTION_API_KEY` 和 `NOTION_DATABASE_ID` 沒有互換
3. 驗證你的 Notion 資料庫是否有所有必要的屬性

## 📖 文件

- [Next.js 文件](https://nextjs.org/docs)
- [Notion API 參考](https://developers.notion.com/reference)
- [Tailwind CSS 文件](https://tailwindcss.com/docs)
- [Vercel 部署文件](https://vercel.com/docs)

## 🤝 貢獻

歡迎貢獻！請隨意：

1. Fork repository
2. 建立功能分支（`git checkout -b feature/amazing-feature`）
3. 提交你的更改（`git commit -m 'Add amazing feature'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 開啟 Pull Request

## 📄 授權

本專案是開源的，並在 [MIT License](LICENSE) 下可用。

## 🙏 致謝

- 使用 [Next.js](https://nextjs.org/) 建置
- 由 [Notion](https://notion.so/) 驅動
- 使用 [Tailwind CSS](https://tailwindcss.com/) 設計樣式
- 部署在 [Vercel](https://vercel.com/)

## 💬 問題？

如果你有問題或遇到問題，請[開啟一個 issue](https://github.com/YOUR_USERNAME/Personal-Blog-linked-to-Notion/issues)。

---

**用 ❤️ 製作，由 [AugustSnow](https://github.com/AugustSnow1127)**

祝你寫作愉快！✨
