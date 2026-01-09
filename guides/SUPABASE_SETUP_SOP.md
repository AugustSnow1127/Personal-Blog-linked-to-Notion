# Supabase Setup SOP

本文件將引導您完成 Supabase 專案的建立與設定，以支援部落格的登入、按讚與留言功能。

## 1. 建立專案

1. 前往 [Supabase Dashboard](https://supabase.com/dashboard)
2. 點擊 **"New project"**
3. 選擇您的 Organization
4. 填寫 **Name** (例如: `my-personal-blog`)
5. 設定 **Database Password** (請務必妥善保存)
6. 選擇最近的 **Region** (例如: `Tokyo` 或 `Singapore`)
7. 點擊 **"Create new project"**

## 1.5 設定 正式網域 Redirect (重要！)

為了避免登入後跳轉回 localhost，您必須設定 URL Configuration：

1. 在左側選單點擊 **Authentication** -> **URL Configuration**
2. **Site URL**: 將其改為您的正式網址，例如 `https://www.augustsnow.com`
3. **Redirect URLs**: 點擊 "Add URL"，確保加入以下網址：
   - `http://localhost:3000/api/auth/callback` (本地開發用)
   - `https://www.augustsnow.com/api/auth/callback` (正式上線用 - **請換成您的實際網域**)
4. 點擊 **Save**

## 2. 設定 Authentication (GitHub Login)

為了讓使用者能透過 GitHub 登入：

1. 在 Supabase Dashboard 左側選單點擊 **Authentication** -> **Providers**
2. 找到 **GitHub** 並點擊啟用
3. 您需要填入 **Client ID** 和 **Client Secret**。這需要到 GitHub 申請：
   - 前往 [GitHub Developer Settings](https://github.com/settings/developers)
   - 點擊 **"New OAuth App"**
   - **Application name**: `My Blog Login` (或您喜歡的名字)
   - **Homepage URL**: `http://localhost:3000` (上線後請改為您的 Vercel 網址)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback` (上線後請改為 `https://您的網域/api/auth/callback`)
   - 點擊 **"Register application"**
   - 複製 **Client ID**
   - 點擊 "Generate a new client secret" 並複製 **Client Secret**
4. 回到 Supabase，填入剛剛複製的 ID 和 Secret 並儲存

### 設定 Google Login (可選)

1. 在 Supabase Dashboard 左側選單點擊 **Authentication** -> **Providers**
2. 找到 **Google** 并點擊啟用
3. 前往 [Google Cloud Console](https://console.cloud.google.com/)
4. 建立新專案或選擇現有專案
5. 前往 **APIs & Services** -> **OAuth consent screen**，設定應用程式名稱與支援信箱
6. 前往 **Credentials** -> **Create Credentials** -> **OAuth client ID**
7. 應用程式類型選擇 **Web application**
8. 設定 **Authorized redirect URIs**：
   - 本地開發填入：`http://localhost:3000/api/auth/callback`
   - 上線後填入：`https://您的網域/api/auth/callback`
   - 同時也需要填入 Supabase 的 Callback URL (可在 Supabase Provider 設定頁面上方找到)
9. 複製 **Client ID** 與 **Client Secret**
10. 回到 Supabase，填入 ID 和 Secret 並儲存

> 💡 **注意**: 上線後，您需要在 GitHub/Google OAuth App 設定中新增您的正式網域 Callback URL。

## 3. 建立資料庫表格 (SQL Setup)

請前往 Supabase Dashboard 左側的 **SQL Editor**，點擊 **"New query"**，貼上並執行以下 SQL：

```sql
-- 1. 建立按讚資料表 (post_likes)
create table post_likes (
  id uuid primary key default gen_random_uuid(),
  post_slug text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  unique(post_slug, user_id)
);

-- 2. 建立留言資料表 (post_comments)
create table post_comments (
  id uuid primary key default gen_random_uuid(),
  post_slug text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  user_name text,
  avatar_url text,
  created_at timestamp with time zone default now()
);

-- 3. 啟用 Row Level Security (RLS) - 非常重要！
alter table post_likes enable row level security;
alter table post_comments enable row level security;

-- 4. 設定 post_likes 的存取權限 (Policies)

-- 允許任何人查看按讚數
create policy "Anyone can view likes"
  on post_likes for select
  using (true);

-- 允許已登入用戶按讚
create policy "Authenticated users can like"
  on post_likes for insert
  with check (auth.uid() = user_id);

-- 允許用戶取消自己的讚
create policy "Users can unlike their own likes"
  on post_likes for delete
  using (auth.uid() = user_id);

-- 5. 設定 post_comments 的存取權限 (Policies)

-- 允許任何人查看留言
create policy "Anyone can view comments"
  on post_comments for select
  using (true);

-- 允許已登入用戶新增留言
create policy "Authenticated users can comment"
  on post_comments for insert
  with check (auth.uid() = user_id);

-- 允許用戶刪除自己的留言
create policy "Users can delete their own comments"
  on post_comments for delete
  using (auth.uid() = user_id);
```

## 4. 取得環境變數

1. 前往 **Project Settings** (左下角齒輪圖示) -> **API**
2. 複製 **Project URL** (這是您的 `NEXT_PUBLIC_SUPABASE_URL`)
3. 複製 **anon / public** Key (這是您的 `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## 5. 設定專案環境變數

在您的專案根目錄 `.env.local` (本地開發) 或 Vercel Environment Variables (正式環境) 中設定：

```env
NEXT_PUBLIC_SUPABASE_URL=您的Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=您的anon Key
```

完成以上步驟後，您的部落格就具備完整的社群功能了！ 🎉

> ⚠️ **部署提醒**: 當您部署到 Vercel 時，請務必在 Vercel 的 **Settings** -> **Environment Variables** 中設定 `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY`，否則網站會發生 500 錯誤。
