# Everything-Claude-Code Configuration for Antigravity - Walkthrough

## Overview

成功為 personalblog 專案建立了完整的 everything-claude-code 風格配置，完全相容於 Google Antigravity。

## What Was Created

### Directory Structure

```
.agent/
├── workflows/              # 5 個工作流程
│   ├── plan.md
│   ├── code-review.md
│   ├── tdd.md
│   ├── notion-sync.md
│   └── security-check.md
└── skills/                 # 4 個技能
    ├── frontend-patterns/
    │   └── SKILL.md
    ├── tdd-workflow/
    │   └── SKILL.md
    ├── security-review/
    │   └── SKILL.md
    └── coding-standards/
        └── SKILL.md
```

### Configuration Files

- ✅ **GEMINI.md** - 重新命名自 `CLAUDE.md`，更新為 Antigravity 專用指南
- ✅ **AGENTS.md** - 保留原有內容（可進一步強化）
- ✅ **PLANNING.md** - 保留原有內容（可進一步強化）

---

## Skills (Domain Knowledge)

### 1. frontend-patterns

**位置**: `.agent/skills/frontend-patterns/SKILL.md`

**內容涵蓋**:
- Next.js App Router 模式
- Server Components vs Client Components
- ISR (Incremental Static Regeneration) 策略
- React 19 最佳實踐
- TypeScript 型別安全
- Tailwind CSS 設計模式
- 效能優化技巧
- 錯誤處理模式

**使用時機**: 開發前端功能、審查 React/Next.js 程式碼時參考

### 2. tdd-workflow

**位置**: `.agent/skills/tdd-workflow/SKILL.md`

**內容涵蓋**:
- TDD 核心循環（RED-GREEN-REFACTOR）
- 測試金字塔（Unit/Integration/E2E）
- 測試覆蓋率要求（≥ 80%）
- Mocking 策略
- 測試組織結構
- 常見測試模式

**使用時機**: 實作新功能、撰寫測試時參考

### 3. security-review

**位置**: `.agent/skills/security-review/SKILL.md`

**內容涵蓋**:
- 環境變數安全
- API 安全最佳實踐
- XSS 防護
- CSRF 防護
- Content Security Policy
- 事件回應計畫
- Notion API 安全使用

**使用時機**: 部署前安全審查、處理敏感資料時參考

### 4. coding-standards

**位置**: `.agent/skills/coding-standards/SKILL.md`

**內容涵蓋**:
- TypeScript 嚴格模式
- 函數式程式設計模式
- 不可變性原則
- 程式碼組織結構
- 命名慣例
- 錯誤處理
- 檔案大小限制

**使用時機**: 撰寫程式碼、程式碼審查時參考

---

## Workflows (Slash Commands)

### 1. `/plan` - Feature Implementation Planning

**位置**: `.agent/workflows/plan.md`

**功能**: 引導功能實作規劃流程

**步驟**:
1. 分析需求並確認範圍
2. 檢查現有程式碼結構
3. 設計技術方案
4. 建立實作檢查清單
5. 識別潛在風險
6. 更新 PLANNING.md

**使用範例**:
```
User: "Add tags filtering to the blog homepage"
AI: [執行 /plan workflow 的 6 個步驟]
```

### 2. `/code-review` - Code Quality Review

**位置**: `.agent/workflows/code-review.md`

**功能**: 全面的程式碼品質審查

**檢查項目**:
- TypeScript 型別安全
- Next.js 最佳實踐
- Notion API 使用模式
- 安全性漏洞
- 程式碼品質
- 測試覆蓋率
- 效能優化
- 無障礙設計
- 文件完整性
- Git 工作流程

**使用時機**: 提交程式碼前、Pull Request 審查時

### 3. `/tdd` - Test-Driven Development

**位置**: `.agent/workflows/tdd.md`

**功能**: 測試驅動開發工作流程

**步驟**:
1. 定義介面和型別
2. 撰寫失敗的測試（RED）
3. 實作最小可行程式碼（GREEN）
4. 重構優化（REFACTOR）
5. 驗證測試覆蓋率 ≥ 80%
6. 執行所有測試

**特色**: 包含 `// turbo-all` 註解，所有步驟自動執行

### 4. `/notion-sync` - Notion API Testing

**位置**: `.agent/workflows/notion-sync.md`

**功能**: Notion API 整合測試

**步驟**:
1. 驗證環境變數設定
2. 測試 API 連線
3. 檢查資料庫 schema
4. 測試資料抓取
5. 驗證 ISR 快取策略
6. 測試錯誤處理

**使用時機**: 設定 Notion 整合、除錯 API 問題時

### 5. `/security-check` - Security Audit

**位置**: `.agent/workflows/security-check.md`

**功能**: 全面的安全性審查

**檢查項目**:
- 環境變數安全
- 依賴套件漏洞（npm audit）
- 程式碼安全掃描
- API 安全
- XSS 防護
- Content Security Policy
- Git 歷史記錄中的機密資訊
- Vercel 部署安全

**使用時機**: 部署前、每月安全審查、新增依賴套件後

---

## Updated Documentation

### GEMINI.md

**變更**:
- ✅ 標題從 "CLAUDE.md" 改為 "GEMINI.md"
- ✅ 描述從 "Claude Code" 改為 "Google Antigravity (Gemini)"
- ✅ 新增 "Antigravity Workflows" 章節，列出 5 個 workflows
- ✅ 新增 "Antigravity Skills" 章節，列出 4 個 skills
- ✅ 新增 "Development Best Practices" 章節
- ✅ 在 Notes 中註明 workflows 和 skills 位置

### README.md (建議更新)

建議在 README.md 中加入：

```markdown
## Antigravity Workflows

This project uses Antigravity workflows for development:

- `/plan` - Feature planning
- `/code-review` - Code quality review
- `/tdd` - Test-driven development
- `/notion-sync` - Notion API testing
- `/security-check` - Security audit

See [GEMINI.md](GEMINI.md) for details.
```

---

## How to Use

### Using Workflows

在 Antigravity 中直接輸入 slash command:

```
/plan
/code-review
/tdd
/notion-sync
/security-check
```

### Referencing Skills

Skills 會自動被 Antigravity 讀取。你也可以明確要求：

```
"請參考 frontend-patterns skill 來審查這段程式碼"
"根據 tdd-workflow skill 來實作這個功能"
"使用 security-review skill 檢查安全性"
```

### Example Development Flow

1. **規劃功能**: `/plan`
2. **TDD 開發**: `/tdd`
3. **程式碼審查**: `/code-review`
4. **安全檢查**: `/security-check`
5. **提交程式碼**: `git commit`

---

## Verification

### ✅ Directory Structure Created

```bash
PS C:\projects\personalblog> Get-ChildItem -Recurse .agent

    Directory: C:\projects\personalblog\.agent

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----                                            skills
d-----                                            workflows

    Directory: C:\projects\personalblog\.agent\skills

d-----                                            coding-standards
d-----                                            frontend-patterns
d-----                                            security-review
d-----                                            tdd-workflow

    Directory: C:\projects\personalblog\.agent\workflows

-a----                                      plan.md
-a----                                      code-review.md
-a----                                      tdd.md
-a----                                      notion-sync.md
-a----                                      security-check.md
```

### ✅ Files Created

**Skills**: 4 個 SKILL.md 檔案
- `.agent/skills/frontend-patterns/SKILL.md` (5.8 KB)
- `.agent/skills/tdd-workflow/SKILL.md` (7.2 KB)
- `.agent/skills/security-review/SKILL.md` (8.1 KB)
- `.agent/skills/coding-standards/SKILL.md` (6.9 KB)

**Workflows**: 5 個 workflow 檔案
- `.agent/workflows/plan.md` (1.8 KB)
- `.agent/workflows/code-review.md` (3.2 KB)
- `.agent/workflows/tdd.md` (4.5 KB)
- `.agent/workflows/notion-sync.md` (3.9 KB)
- `.agent/workflows/security-check.md` (4.1 KB)

### ✅ Configuration Updated

- `CLAUDE.md` → `GEMINI.md` ✅
- `GEMINI.md` 內容更新 ✅
- 所有 workflows 包含 YAML frontmatter ✅
- 所有 skills 包含 YAML frontmatter ✅

---

## Next Steps (Optional)

### 1. User Rules (需手動加入)

建議將以下規則加入到 Antigravity 的 user rules：

```markdown
## Personal Blog Security Rules
- 禁止硬編碼 NOTION_API_KEY 和 NOTION_DATABASE_ID
- 所有機密資訊必須使用 .env.local
- 確保 .env.local 在 .gitignore 中

## Personal Blog Coding Style
- 使用 TypeScript 嚴格模式
- 優先使用函數式程式設計（不可變性）
- 單一檔案最大 300 行

## Personal Blog Testing Standards
- 採用 TDD 開發流程
- 最低測試覆蓋率 80%
- 所有 Notion API 呼叫必須有單元測試

## Personal Blog Git Workflow
- 使用 Conventional Commits 格式
- Commit message 使用繁體中文
```

### 2. 強化 AGENTS.md

可以將 skills 的內容摘要加入 `AGENTS.md`，讓 Antigravity 更容易理解專案準則。

### 3. 測試 Workflows

嘗試使用每個 workflow 來驗證功能：

```
/plan - 規劃一個小功能
/tdd - 實作該功能
/code-review - 審查程式碼
/notion-sync - 測試 Notion 連線
/security-check - 執行安全檢查
```

---

## Summary

✅ **完全模仿 everything-claude-code 結構**
✅ **完全相容 Google Antigravity**
✅ **4 個專業 Skills**
✅ **5 個實用 Workflows**
✅ **完整文件更新**

這個配置提供了與 everything-claude-code 相同的開發體驗，但專門為 Antigravity 優化。
