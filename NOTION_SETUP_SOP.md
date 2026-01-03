# Notion Setup SOP

完成以下步驟後，請將取得的資訊填入專案的 `.env.local` 檔案。

---

## Step 1: Create Notion Integration

1. 開啟瀏覽器，前往 **https://www.notion.com/my-integrations**

2. 點擊 **"+ New integration"** 按鈕

3. 填寫以下資訊：
   - **Name**: `Personal Blog` (或任何你喜歡的名稱)
   - **Associated workspace**: 選擇你的 workspace

   > **Internal vs Public 差異：**
   > | Type | 說明 |
   > |------|------|
   > | **Internal** ✅ | 只能存取你自己 workspace 的內容，設置簡單，適合個人使用 |
   > | Public | 給其他 Notion 用戶使用的應用，需要 OAuth 流程，設置複雜 |
   >
   > 個人部落格選 **Internal** 即可。

4. 點擊 **"Submit"** 或 **"Save"**

5. 進入 **"Configuration"** 頁籤，找到 **Internal Integration Secret**

6. 點擊 **"Show"** 然後複製 API Secret
   - 格式像這樣: `ntn_xxxxxxxxxxxxxxxxxxxxxxx`
   - ⚠️ **重要：請妥善保存，不要外洩**

```
✅ 記下來：
NOTION_API_KEY = ntn_xxxxxxxxxxxxxxxxxxxxxx
```

---

## Step 2: Create Notion Database

1. 開啟 Notion，新建一個 Page

2. 輸入 `/database` 然後選擇 **"Database - Full page"**

3. 將資料庫命名為 **"Blog Posts"** (或任何名稱)

4. 設定以下欄位 (Properties)：

| Property Name | Type | 說明 |
|---------------|------|------|
| Title | Title | (預設就有) 文章標題 |
| Slug | Text | URL 識別碼，例如 `my-first-post` |
| Published | Checkbox | 打勾才會顯示在網站 |
| Date | Date | 發布日期 |
| Summary | Text | 文章摘要（顯示在首頁列表） |
| Tags | Multi-select | 標籤分類（選填） |

### 如何新增 Property：
1. 點擊表格最右邊的 **"+"**
2. 輸入 Property 名稱
3. 選擇對應的 Type

---

## Step 3: Share Database with Integration

1. 開啟你剛建立的 Blog Posts 資料庫

2. 點擊右上角 **"..."** (三個點) 按鈕

3. 找到 **"Connections"** 區塊

4. 點擊 **"+ Add connections"**

5. 搜尋並選擇你在 Step 1 建立的 Integration（例如 `Personal Blog`）

6. 點擊 **"Confirm"**

```
✅ 完成後，Integration 就能存取這個資料庫了
```

---

## Step 4: Get Database ID

1. 在瀏覽器中開啟你的 Blog Posts 資料庫

2. 看網址列，格式如下：
   ```
   https://www.notion.so/yourworkspace/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx?v=...
                                       └──────────── 這段就是 Database ID ────────────┘
   ```

3. 複製 `?v=` 之前的那串 32 個字元的 ID

```
✅ 記下來：
NOTION_DATABASE_ID = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Step 5: Create Test Post

在資料庫中建立一篇測試文章：

| Property | Value |
|----------|-------|
| Title | `Hello World` |
| Slug | `hello-world` |
| Published | ✅ (打勾) |
| Date | 今天日期 |
| Summary | `This is my first blog post.` |

然後在文章內容區域隨便寫一些內容。

---

## Step 6: Save Environment Variables

完成後，你應該有以下兩個值：

```env
NOTION_API_KEY=ntn_xxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

等專案初始化後，這些值會填入 `.env.local` 檔案。

---

## Checklist

- [ ] 建立 Notion Integration
- [ ] 複製 Integration Secret (API Key)
- [ ] 建立 Blog Posts 資料庫
- [ ] 設定 6 個 Properties (Title, Slug, Published, Date, Summary, Tags)
- [ ] 將資料庫分享給 Integration
- [ ] 複製 Database ID
- [ ] 建立一篇測試文章

---

## Troubleshooting

### ❌ API 回傳 "unauthorized"
→ 確認資料庫有分享給 Integration (Step 3)

### ❌ API 回傳 "object_not_found"
→ 確認 Database ID 正確，且資料庫有分享給 Integration

### ❌ 文章沒有顯示
→ 確認 `Published` checkbox 有打勾
