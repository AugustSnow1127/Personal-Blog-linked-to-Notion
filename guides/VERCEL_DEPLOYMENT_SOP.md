🚀 Vercel 部署 SOP

  步驟 1：前往 Vercel 並連接 GitHub

  1. 訪問 Vercel
    - 前往 https://vercel.com
    - 點擊 "Sign Up" 或 "Login"
  2. 使用 GitHub 登入
    - 選擇 "Continue with GitHub"
    - 授權 Vercel 訪問你的 GitHub 帳號

  步驟 2：導入專案

  1. 在 Vercel Dashboard
    - 點擊 "Add New..." → "Project"
  2. 選擇你的 Repository
    - 找到 Personal-Blog-linked-to-Notion
    - 點擊 "Import"
  3. 配置專案設定
  Framework Preset: Next.js ✅ (自動偵測)
  Root Directory: ./ (保持預設)
  Build Command: npm run build (保持預設)
  Output Directory: .next (保持預設)
  Install Command: npm install (保持預設)

  步驟 3：設定環境變數（最重要！）

  在 "Environment Variables" 區域添加：

  | 變數名稱                      | 值          | 說明                          |
  |-------------------------------|-------------|-------------------------------|
  | NOTION_API_KEY                | ntn_xxx...  | 你的 Notion Integration Token |
  | NOTION_DATABASE_ID            | xxx...      | 你的 Notion Database ID       |
  | NEXT_PUBLIC_AUTHOR_AVATAR_URL | /avatar.jpg | 頭像路徑                      |

  取得方式：
  - 從你本地的 .env.local 複製貼上
  - 重要： 確保每個變數都要添加！

  步驟 4：部署

  1. 點擊 "Deploy" 按鈕
    - Vercel 會自動開始建置和部署
    - 建置時間約 1-2 分鐘
  2. 等待部署完成
    - 你會看到 "Building..." → "Deploying..." → "Ready"
    - 成功後會顯示 "🎉 Congratulations!"
  3. 獲取網址
    - Vercel 會自動生成一個網址，例如：
    https://personal-blog-linked-to-notion.vercel.app

  步驟 5：測試部署的網站

  訪問你的 Vercel 網址，檢查：
  - ✅ 首頁能正常顯示文章列表
  - ✅ Grid/List 切換功能正常
  - ✅ 點擊文章能進入詳情頁
  - ✅ 圖片能正常載入
  - ✅ About 和 Contact 頁面正常

  步驟 6：綁定自訂域名（可選）

  1. 在 Vercel Dashboard
    - 進入你的專案 → "Settings" → "Domains"
  2. 添加域名
    - 輸入你的域名（例如：blog.augustsnow.com）
    - 按照指示在你的 DNS 提供商設定 CNAME 或 A 記錄