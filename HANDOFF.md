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

进入 M2：删除 [components/site/hero-visual.tsx](components/site/hero-visual.tsx)，改造 [components/site/hero-profile-section.tsx](components/site/hero-profile-section.tsx)，更新 [lib/site-data.ts](lib/site-data.ts) 的 hero copy。
