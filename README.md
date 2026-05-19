# Nursing Vital Signs Practice Records / 護理生命體徵練習記錄系統

A bilingual Next.js + TypeScript app for nursing teachers to teach adult patient vital signs procedures and collect student practice records.

這是一個使用 Next.js + TypeScript 製作的中英雙語網站，讓護理教師教授成人病人生命體徵測量程序，並收集學生練習記錄。

## Features / 功能

- Learning page with vital signs procedures and checklists / 生命體徵程序及清單學習頁
- Interactive complete vital signs checklist / 互動式完整生命體徵清單
- Full student practice submission form / 學生完整練習提交表格
- Required field, number, and pain score validation / 必填、數字及疼痛分數驗證
- Abnormal value warnings before submission / 提交前異常數值提示
- Password-protected teacher dashboard / 教師密碼保護管理頁
- Search by student name or ID / 依學生姓名或學號搜尋
- Filter by class/group, date, and abnormal readings / 依班別、日期及異常讀數篩選
- View one student's full record / 查看單一學生完整記錄
- Summary statistics, CSV export, and styled Excel export / 摘要統計、CSV 匯出及格式化 Excel 匯出
- Supabase database schema included / 已包含 Supabase 資料庫 SQL

Disclaimer / 免責聲明：

This platform is for nursing education and practice documentation only. It is not intended for medical diagnosis or treatment.

本平台只作護理教學及練習記錄用途，並非醫療診斷或治療。

## Tech Stack / 技術

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Postgres
- ExcelJS for browser-based `.xlsx` export

## Project Structure / 專案結構

```text
src/
  app/
    api/
      admin/
        login/route.ts
        logout/route.ts
        records/route.ts
      records/route.ts
    admin/page.tsx
    page.tsx
    layout.tsx
    globals.css
  lib/
    admin-auth.ts
    supabase/server.ts
    types.ts
    validation.ts
supabase/
  schema.sql
.env.example
```

## Local Setup / 本機設定

1. Install dependencies / 安裝套件

```bash
npm install
```

2. Create a Supabase project / 建立 Supabase 專案

Open the Supabase dashboard, create a project, then run the SQL in:

請在 Supabase dashboard 建立專案，然後執行以下 SQL 檔案：

```text
supabase/schema.sql
```

The schema creates `public.vital_signs_records` with Row Level Security enabled. Student records are accessed only through server-side API routes using the Supabase service role key.

SQL 會建立 `public.vital_signs_records`，並啟用 Row Level Security。學生記錄只會透過伺服器端 API 使用 Supabase service role key 存取。

3. Create environment variables / 建立環境變數

Copy `.env.example` to `.env.local` and fill in the values:

複製 `.env.example` 為 `.env.local`，並填入資料：

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_PASSWORD=change-this-teacher-password
AUTH_SECRET=replace-with-a-long-random-string-at-least-32-characters
```

Important / 重要：

- `SUPABASE_SERVICE_ROLE_KEY` must stay server-side only. Do not expose it in browser code.
- `SUPABASE_SERVICE_ROLE_KEY` 只可在伺服器端使用，不要放在前端公開程式碼。
- Use a strong `ADMIN_PASSWORD` and a long random `AUTH_SECRET`.
- 請使用強密碼及長隨機字串作為 `AUTH_SECRET`。

4. Run locally / 本機啟動

```bash
npm run dev
```

Open:

- Learning page and student form / 學習頁及學生表格: `http://localhost:3000`
- Admin dashboard / 教師管理頁: `http://localhost:3000/admin`

## Deployment / 部署

Recommended deployment: Vercel + Supabase.

建議部署：Vercel + Supabase。

1. Push this project to GitHub.
2. Import the repository into Vercel.
3. Add the same environment variables in Vercel Project Settings.
4. Deploy.
5. Confirm the Supabase SQL schema has been run before collecting records.
6. Test one student submission and admin login after deployment.

中文步驟：

1. 將專案推送到 GitHub。
2. 在 Vercel 匯入 repository。
3. 在 Vercel Project Settings 加入相同環境變數。
4. 部署網站。
5. 收集資料前，確認已在 Supabase 執行 `supabase/schema.sql`。
6. 部署後測試一次學生提交及教師登入。

## Privacy / 私隱

Student records are not displayed publicly. Students can only submit data. Teachers must log in before viewing, filtering, opening full records, or exporting CSV files.

學生資料不會公開顯示。學生只能提交資料；教師必須登入後才能查看、篩選、打開完整記錄或匯出 CSV。

Only collect data needed for the teaching activity. Avoid unnecessary personal data.

只收集教學活動所需資料，避免收集不必要個人資料。
