# HANDOFF — MagicYStudio Brand Site v2

按 [docs/SPEC.md](docs/SPEC.md) 的 M1-M5 顺序执行，每个 module 单 commit + 此处一个段落。

---

## M1 — Design Tokens（已完成）

### 改动

- [app/globals.css](app/globals.css) 锁定为 dark 单一主题：
  - 删除原 light `:root` 与 `.dark` 块、删除 `@custom-variant dark`
  - 新色板：`#0E0E0F` 背景 / `#F5F1EA` paper white / `#FF4500` Hazard Orange
  - `--radius: 0.375rem`（6px 上限），所有 `--radius-*` 钳制到 6px 以下，移除 rounded-2xl/3xl/4xl 的视觉空间
  - 新增 `--font-display` token，`--font-heading` 切到 display 字体
- [app/layout.tsx](app/layout.tsx) 处理：
  - `<html className="dark ...">` 强制锁定，避免触发 light 默认
  - 通过 `next/font/local` 引入 PP Editorial New（Ultralight 200 / Regular 400 / Ultrabold 800，含 italic 三组），暴露 `--font-display`
  - metadata 同步替换为 v2 文案（"AI-native Studio / Solo Builder"）
- [public/fonts/](public/fonts/) 已放置 6 个 .otf（next/font/local 原生支持 .otf，未做 woff2 转换以避免引入构建依赖）

### 验收

- `npm run lint` 0 error
- `npm run build` 成功，5 静态页全部 prerender 通过
- 待用户在浏览器肉眼验收：`#0E0E0F` 黑底 + Paper White 字 + 6px 锐利圆角

### 注意

- shadcn 既有组件继续走 `bg-card / text-foreground / border-border` token，无需逐个改类名
- `@custom-variant dark (&:is(.dark *))` 已删除——后续 component 中残留的 `dark:` 类名将不会生效；M2-M5 在 touch 各 component 时清理掉无用 `dark:` 前缀
- `next.config.ts` / `eslint.config.mjs` / `tsconfig.json` 未动

### 下一步

进入 M3：`npm install lenis`、新增 [components/lenis-provider.tsx](components/lenis-provider.tsx) 挂到 layout、新建 [lib/projects.ts](lib/projects.ts) 静态作品池数据并替换 site-data.ts/works-data.ts 引用。

---

## M2 — Hero 改造（已完成）

### 改动

- **删除** [components/site/hero-visual.tsx](components/site/hero-visual.tsx)（sci-fi-body + 轨道环 + radial blur 全部砍掉）
- [lib/site-data.ts](lib/site-data.ts) `siteConfig`：
  - `tagline` → `"AI-native Studio / Solo Builder"`
  - `headline` 从 `{ line1, line2 }` 改为 `{ fixed: "MagicY", rotating: [3 句] as const }`
  - `subheadline` / `bio` 替换为 SPEC §2.1 文案，删掉"探索未知/创造可能/构建信息桥梁"自我标榜
- [components/site/hero-profile-section.tsx](components/site/hero-profile-section.tsx) 完整重写：
  - 删除中栏 sci-fi-body 视觉、删除左右双 radial blur、删除原 3 列布局
  - Hero 改为 8/4 分栏：左侧 PP Editorial Ultralight + 斜体的 `RotatingHeadline`（framer-motion `AnimatePresence` 4s 循环 3 句），右侧 Mono 状态卡（avatar 48px + role/stack/based 数据行 + GitHub/Email/Contact CTA）
  - 顶部加 `00 / 06 — Index` archive 标记 + 右上 `MagicYstudio` mono 锚点
  - 状态指示器从 emoji ping 改为 mono 大写 `[● status]` 风格
  - 删除右栏圆形 avatar ring/blur、删除 `rounded-3xl/2xl`，改用方框 + `border-border`
  - 字号底线 ≥ 18px（subheadline `text-lg`），状态条/数据行 mono 12-13px
- 公共 `heroProjects` 数组保留在 [lib/site-data.ts](lib/site-data.ts) 不再被 hero 消费——M3 会随 `lib/projects.ts` 一起整体重构

### 验收

- `npm run lint` 0 error
- `npm run build` 成功，5 静态页全部 prerender 通过
- 待用户在 :3001 肉眼验收：首屏 4s 切换 3 句 hero copy / 无任何 sci-fi 元素 / 黑底 + Hazard Orange 强调 / 右上 mono 锚点

### 注意

- `RotatingHeadline` 用 `useEffect + setInterval`，CSR 接管后启动，SSR 不闪首句外的内容（避免 hydration mismatch）
- `aria-live="polite"` 让屏幕阅读器读出切换内容
- 顶部 `pt-40` 留出 ≥ 160px 上间距，符合 SPEC §3.3 Section 间距要求
- Hazard Orange 仅出现在状态点 + Contact hover 反转，没有大面积铺色——避免变成"橙色 SaaS"

### 下一步

进入 M3：`npm install lenis`、新增 [components/lenis-provider.tsx](components/lenis-provider.tsx) 挂到 layout、新建 [lib/projects.ts](lib/projects.ts) 静态作品池数据并替换 site-data.ts/works-data.ts 引用。
