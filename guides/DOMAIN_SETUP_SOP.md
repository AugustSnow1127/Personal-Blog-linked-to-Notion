# Cloudflare 網域連接 Vercel SOP

本指南將協助你將從 Cloudflare 購買的網域連接到已部署在 Vercel 的 Next.js 部落格。

## 先決條件

在開始之前，請確認：
- ✅ 你的專案已成功部署到 Vercel
- ✅ 你已在 Cloudflare 購買並擁有網域
- ✅ 你有 Vercel 和 Cloudflare 的登入權限

---

## 步驟 1：在 Vercel 新增自訂網域

1. **前往 Vercel Dashboard**
   - 訪問 https://vercel.com/dashboard
   - 登入你的帳號

2. **選擇專案**
   - 在專案列表中找到你的部落格專案
   - 點擊進入專案頁面

3. **進入網域設定**
   - 點擊頂部導覽列的 **"Settings"**
   - 在左側選單選擇 **"Domains"**

4. **新增網域**
   - 在 "Add a domain" 輸入框中輸入你的網域，例如：`example.com`
   - 點擊 **"Add"** 按鈕

5. **查看 DNS 設定說明**
   - Vercel 會顯示需要設定的 DNS 記錄
   - 保持此頁面開啟，接下來會在 Cloudflare 設定這些記錄

> **提示：** Vercel 會顯示類似以下的訊息：
> - "Add the following A record to your DNS provider"
> - "Type: A, Name: @, Value: 76.76.21.21"

---

## 步驟 2：在 Cloudflare 設定 DNS 記錄

1. **登入 Cloudflare Dashboard**
   - 訪問 https://dash.cloudflare.com
   - 使用你的帳號登入

2. **選擇網域**
   - 在網域列表中點擊你要設定的網域

3. **進入 DNS 管理**
   - 在左側選單選擇 **"DNS"** → **"Records"**

4. **新增 A 記錄（Root Domain）**
   - 點擊 **"Add record"** 按鈕
   - 填寫以下資訊：

   | 欄位 | 值 | 說明 |
   |------|-----|------|
   | Type | A | DNS 記錄類型 |
   | Name | @ | 代表 root domain (example.com) |
   | IPv4 address | 76.76.21.21 | Vercel 的 IP 位址 |
   | Proxy status | DNS only (灰色雲朵) ☁️ | **重要：請關閉 Proxy** |
   | TTL | Auto | 自動設定 |

   - 點擊 **"Save"**

5. **新增 CNAME 記錄（www 子網域，可選）**

   如果你想讓 `www.example.com` 也能訪問你的網站：
   - 點擊 **"Add record"** 按鈕
   - 填寫以下資訊：

   | 欄位 | 值 | 說明 |
   |------|-----|------|
   | Type | CNAME | DNS 記錄類型 |
   | Name | www | www 子網域 |
   | Target | cname.vercel-dns.com | Vercel 的 CNAME 目標 |
   | Proxy status | DNS only (灰色雲朵) ☁️ | **重要：請關閉 Proxy** |
   | TTL | Auto | 自動設定 |

   - 點擊 **"Save"**

### ⚠️ 關於 Cloudflare Proxy Status

**建議設定：DNS only (灰色雲朵)**

| Proxy Status | 說明 | 建議 |
|--------------|------|------|
| **DNS only** (灰色 ☁️) | 直接指向 Vercel，不經過 Cloudflare CDN | ✅ **建議使用** |
| Proxied (橘色 🟠) | 流量經過 Cloudflare CDN 和 DDoS 防護 | ⚠️ 不建議（可能與 Vercel CDN 衝突） |

**原因：**
- Vercel 已經提供全球 CDN 和邊緣優化
- 雙重 CDN 可能導致延遲增加或快取問題
- Vercel 的 SSL 憑證在 Proxied 模式下可能無法正常運作

---

## 步驟 3：驗證網域連接

1. **等待 DNS 傳播**
   - DNS 變更通常需要 **5-30 分鐘** 生效
   - Cloudflare DNS 通常較快（約 5-15 分鐘）

2. **在 Vercel 檢查驗證狀態**
   - 回到 Vercel Dashboard → Settings → Domains
   - 查看你的網域狀態

   | 狀態 | 說明 |
   |------|------|
   | **Pending** | 等待 DNS 生效，繼續等待 |
   | **Valid** ✅ | 成功驗證，可以使用 |
   | **Error** ❌ | DNS 設定錯誤，檢查 Troubleshooting |

3. **使用 DNS 檢查工具（可選）**
   - 訪問 https://www.whatsmydns.net
   - 輸入你的網域
   - 選擇 "A" 記錄類型
   - 檢查全球各地的 DNS 是否已指向 76.76.21.21

---

## 步驟 4：SSL/HTTPS 自動配置

1. **等待 SSL 憑證生成**
   - Vercel 會自動為你的網域申請 Let's Encrypt SSL 憑證
   - 通常需要 **1-5 分鐘**

2. **檢查 SSL 狀態**
   - 在 Vercel Dashboard → Settings → Domains
   - 確認網域旁邊顯示 **綠色鎖頭圖示** 🔒

> **提示：** SSL 憑證會自動續期，你不需要手動管理。

---

## 步驟 5：測試網域連接

完成所有設定後，請進行以下測試：

1. **訪問 Root Domain**
   - 在瀏覽器開啟 `https://example.com`（替換成你的網域）
   - 確認頁面能正常載入

2. **檢查 HTTPS**
   - 確認網址列顯示 🔒 鎖頭圖示
   - 點擊鎖頭查看憑證資訊，應顯示由 Let's Encrypt 簽發

3. **測試 www 子網域（如果有設定）**
   - 訪問 `https://www.example.com`
   - 確認自動重定向到主網域或正常載入

4. **測試功能**
   - ✅ 首頁文章列表正常顯示
   - ✅ 點擊文章能進入詳情頁
   - ✅ About 和 Contact 頁面正常
   - ✅ 圖片和樣式正常載入

---

## Checklist

完成設定後，請確認以下項目：

- [ ] 在 Vercel 成功新增自訂網域
- [ ] 在 Cloudflare 新增 A 記錄指向 76.76.21.21
- [ ] 設定 Proxy status 為 DNS only (灰色雲朵)
- [ ] （可選）新增 www CNAME 記錄
- [ ] 等待 DNS 傳播完成（5-30 分鐘）
- [ ] Vercel 顯示網域狀態為 Valid ✅
- [ ] SSL 憑證已自動生成 🔒
- [ ] 成功訪問 https://example.com
- [ ] 網站所有功能運作正常

---

## Troubleshooting

### ❌ DNS 未生效 / Vercel 顯示 Pending

**可能原因：**
- DNS 傳播尚未完成

**解決方案：**
1. 繼續等待（最多可能需要 48 小時，但通常 30 分鐘內完成）
2. 使用 https://www.whatsmydns.net 檢查全球 DNS 傳播狀態
3. 確認 Cloudflare DNS 記錄設定正確（Type: A, Name: @, Value: 76.76.21.21）

---

### ❌ Vercel 顯示 "Invalid Configuration"

**可能原因：**
- DNS 記錄設定錯誤
- Proxy status 設定為 Proxied（橘色雲朵）

**解決方案：**
1. 檢查 Cloudflare DNS 記錄：
   - Type 是否為 **A**
   - Name 是否為 **@**（root domain）
   - Value 是否為 **76.76.21.21**
2. 確認 Proxy status 為 **DNS only (灰色雲朵)**，不是 Proxied
3. 如果剛修改，等待 5-10 分鐘讓變更生效

---

### ❌ SSL 憑證未生成 / 顯示不安全

**可能原因：**
- DNS 尚未完全生效
- Cloudflare Proxy 模式干擾

**解決方案：**
1. 確認 Vercel 網域狀態為 Valid
2. 等待 5-10 分鐘讓 Vercel 自動申請 SSL 憑證
3. 確認 Cloudflare Proxy status 為 DNS only
4. 如果仍然失敗，在 Vercel Dashboard 點擊 "Refresh SSL Certificate"

---

### ❌ www 子網域無法訪問

**可能原因：**
- 未設定 CNAME 記錄
- CNAME 記錄設定錯誤

**解決方案：**
1. 在 Cloudflare 新增 CNAME 記錄：
   - Type: CNAME
   - Name: www
   - Target: cname.vercel-dns.com
   - Proxy status: DNS only
2. 在 Vercel Dashboard → Settings → Domains 也要新增 `www.example.com`
3. 等待 DNS 傳播

---

### ❌ 網站載入緩慢或快取問題

**可能原因：**
- Cloudflare Proxy 與 Vercel CDN 衝突

**解決方案：**
1. 確認 Cloudflare DNS 記錄的 Proxy status 為 **DNS only (灰色雲朵)**
2. 清除瀏覽器快取
3. 使用無痕模式測試

---

## 額外資訊

### 設定 www 重定向

如果你希望 `www.example.com` 自動重定向到 `example.com`：

1. 在 Vercel 新增兩個網域：
   - `example.com`
   - `www.example.com`
2. Vercel 會自動將 www 重定向到 root domain

### DNS 記錄類型說明

| 記錄類型 | 用途 | 範例 |
|----------|------|------|
| **A** | 將網域指向 IPv4 位址 | example.com → 76.76.21.21 |
| **CNAME** | 將網域指向另一個網域 | www.example.com → cname.vercel-dns.com |
| **ALIAS** | 類似 CNAME，但可用於 root domain | 部分 DNS 提供商支援 |

> **注意：** Cloudflare 不支援在 root domain 使用 ALIAS，因此我們使用 A 記錄。

### Cloudflare Proxy 模式比較

| 功能 | DNS only (灰色) | Proxied (橘色) |
|------|-----------------|----------------|
| 直接連線 Vercel CDN | ✅ 是 | ❌ 否（經過 Cloudflare） |
| Vercel Edge Functions | ✅ 正常運作 | ⚠️ 可能受影響 |
| Vercel SSL 憑證 | ✅ 正常運作 | ⚠️ 需額外設定 |
| Cloudflare DDoS 防護 | ❌ 無 | ✅ 有 |
| 建議 | ✅ **推薦用於 Vercel** | ❌ 不建議 |

---

## 完成 🎉

恭喜！你已成功將 Cloudflare 網域連接到 Vercel 專案。

**下一步：**
- 定期更新 Notion 內容，Vercel 會自動同步（根據你的 ISR 設定）
- 考慮設定 Google Analytics 或其他分析工具
- 在社群媒體分享你的新部落格網址

**相關文件：**
- [Notion Setup SOP](./NOTION_SETUP_SOP.md)
- [Vercel Deployment SOP](./VERCEL_DEPLOYMENT_SOP.md)
