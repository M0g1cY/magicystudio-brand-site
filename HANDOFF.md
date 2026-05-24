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

---

## M3 — Lenis + 数据层（已完成）

### 改动

- `npm install lenis@1.3.23`（唯一新增依赖，符合 SPEC §6 约束）
- 新增 [components/lenis-provider.tsx](components/lenis-provider.tsx)：client component，`useEffect` 内挂 Lenis 实例 + RAF 循环；`prefers-reduced-motion: reduce` 时直接返回不挂 lenis；卸载时 cancelAnimationFrame + lenis.destroy()
- [app/layout.tsx](app/layout.tsx) 顶层挂入 `<LenisProvider />`（在 children 之前），保证全站平滑滚动
- 新增 [lib/projects.ts](lib/projects.ts) 作为 v2 作品池单一数据源（SPEC §2.3）：
  - `Project` 类型：`id / name / oneLiner / description? / tags / status: 'SHIPPED' | 'BUILDING' | 'IN_PROGRESS' / year / image / links? / caseStudy? / tier`
  - 5+1 项目数据：medical-content-pipeline / resume-tool / harbor-table（C 位 3）+ magicystudio-workspace / medical-ai-workflow（第二梯队）+ lifeos-dashboard（IN_PROGRESS）
  - 暴露 `featuredProjects` / `secondaryProjects` / `inProgressProjects` / `worksFeatured` / `worksGrid` / `projectById()`
- [lib/site-data.ts](lib/site-data.ts) 删除旧 `featuredProjects` / `heroProjects` 字面量，改为 `export { featuredProjects } from "./projects"` re-export，避免 component import 路径大面积重写
- [lib/works-data.ts](lib/works-data.ts) 完整重写为 lib/projects.ts 的薄 shim：通过 `toLegacy()` 把新字段映射到 `featuredProject.tagline` / `techStack` / `status` 旧字段，让 [components/site/featured-project.tsx](components/site/featured-project.tsx) / [components/site/projects-grid.tsx](components/site/projects-grid.tsx) M3 不需要触动也能编译
- [components/site/featured-projects.tsx](components/site/featured-projects.tsx) import 从 `@/lib/site-data` 切到 `@/lib/projects`，字段从 `title/description` 改为 `name/oneLiner`（视觉重写留 M4）

### 验收

- `npm run lint` 0 error
- `npm run build` 成功，5 静态页全部 prerender 通过
- 待用户在 :3001 肉眼验收：滚动是 lenis 平滑滚而非原生跳动 / 首屏 Featured Works 三张卡显示真实作品（医学 Coze / resume-tool / harbor-table）

### 注意

- lenis 1.3 默认开启 RAF；若将来想暂停（modal 打开时），可用 `lenis.stop()` / `lenis.start()`，或在 LenisProvider 暴露 ref 给 context
- works-data.ts 是过渡 shim，M4 / M5 完成后应被删除：所有 component 都直接读 lib/projects.ts
- /works 子页（works-hero / featured-project / projects-grid / works-cta）M3 暂未触动，按 SPEC §5 列在 v1.2 处理；shim 让数据是新的、视觉还是旧的——这是合规折衷
- lib/projects.ts 中部分 `image` 还指向旧资源（resume-tool 用 /workspace.png、harbor-table 用 /封面.png）——M4 验收时由用户提供真实截图替换，不在 code 上预留 placeholder

### 下一步

进入 M5：竖向滚动驱动的 Timeline（useScroll/useInView 节点逐个亮起）+ navbar 删主题切换 + services LIMITED 标 + contact 水印 + 最终 lint/build/部署。

---

## M4 — Project Card + Featured Works（已完成）

### 改动

- 新增 [components/site/section-marker.tsx](components/site/section-marker.tsx)：`<SectionMarker n={1} total={6} label="Work" />`，Geist Mono + zfill `01 / 06 — Work` 风格
- 新增 [components/site/mono-status.tsx](components/site/mono-status.tsx)：`<MonoStatus state="SHIPPED" />`，把 `ProjectStatus | LIMITED | AVAILABLE` 映射到小写 mono 标签 + 圆点（SHIPPED/BUILDING/AVAILABLE 用 primary 橙点，IN_PROGRESS/LIMITED 用 muted 灰点）
- 重写 [components/site/project-card.tsx](components/site/project-card.tsx)：
  - 类型签名从旧 `{ id, name, description, techStack, status, year, image }` 改为 `Project`（来自 lib/projects.ts），新增 `variant: 'featured' | 'grid'`、`index`
  - featured 卡占 12 列（aspect 16/9 + 5xl 标题），grid 卡占 6 列（aspect 4/3 + 2xl 标题）
  - 删除 `rounded-2xl/`、`shadow-md`、`-translate-y-1`，改用方框 `border border-border` + hover **整卡颜色反转**（`bg-card → bg-primary` / `text → primary-foreground`）
  - 图片左上角 absolute 定位 MonoStatus 浮标，右上角 mono 年份戳
  - tag 改为 mono 大写边框胶囊，hover 时边框跟随反转
  - 整卡支持 `<a>` 包裹（`project.links[0].href` 存在则渲染外链）
- 重写 [components/site/featured-projects.tsx](components/site/featured-projects.tsx)：
  - section 顶部加 `<SectionMarker n={1} total={6} label="Work" />` + 杂志大字 `Selected works.`（PP Editorial Display + 斜体 italic 200）
  - 数据布局：`featuredProjects[0]` 渲染为 `variant="featured"` 大卡，`rest` 渲染为 `variant="grid"` 小卡
  - 删除原 sm:2 lg:3 等距 grid + bg-muted/30 段落底色
  - 右上角加 mono `view all →` CTA（hover 反转到 primary）
- 重写 [components/site/projects-grid.tsx](components/site/projects-grid.tsx)：直接读 `worksGrid` from lib/projects.ts（不再走 works-data 旧 shim 字段映射），用新 ProjectCard
- [components/site/featured-project.tsx](components/site/featured-project.tsx) 与 [components/site/works-hero.tsx](components/site/works-hero.tsx) / [components/site/works-cta.tsx](components/site/works-cta.tsx) 暂未触动（仍用 works-data shim），按 SPEC §5 留 v1.2

### 验收

- `npm run lint` 0 error
- `npm run build` 成功，5 静态页全部 prerender 通过
- 待用户在 :3001 肉眼验收：3 张 Featured Work 卡显示真实作品 + Mono 状态标签可见 + hover 整卡橙色反转 + Featured 大卡是 16:9 杂志式，下面 2 张是 4:3 grid

### 注意

- ProjectCard 用 `Wrapper = Link href ? "a" : "div"` 模式：lib/projects.ts 当前条目都没填 `links`，所以渲染为 `<div>`；后续填了 Live URL 后自动升级为 `<a target="_blank">`。
- hover 反转包括 image overlay 渐隐——image 本身未反色（保留视觉信息），但下面文字区整体橙底白字
- mono 字体走 `--font-mono`（Geist Mono），display 字体走 `--font-display`（PP Editorial）；body 仍是 Geist Sans
- 用了 `aspect-[16/9]` / `aspect-[4/3]`（SPEC §5 删掉 `aspect-[16/10]`）
- /works 子页 `FeaturedProject` / `WorksHero` / `WorksCTA` 仍是旧设计 + works-data shim——M5 收尾时补全或留 v1.2

### 下一步

进入 M5：竖向滚动驱动的 Timeline（useScroll/useInView 节点逐个亮起）+ navbar 删主题切换 + services LIMITED 标 + contact 水印 + 最终 lint/build/部署。

---

## M5 — Timeline + 收尾（已完成）

### 改动

- [lib/site-data.ts](lib/site-data.ts)：
  - `timeline` 完整重写为 SPEC §2.2 内容（2024 / 2025 Building in quiet / 2026 / NOW），新增 `projectIds: string[]` 字段把节点和作品挂钩；2025 节点 description 留空，避免"学习 AI"叙事
  - `services` 全部条目加 `available: boolean`，`05 Research Pipeline` 设为 `false`
  - 把 `timeline` 和 `services` 都标为 `as const` 让消费方拿到 readonly 推断（`renderTitle` 同步收 `readonly string[]`）
- 重写 [components/site/about-timeline.tsx](components/site/about-timeline.tsx)：
  - 横向 4 列改为竖向 12 列叙事，每节点一行 `border-b border-border`（最后一行除外）
  - `useInView` + `margin: "-30% 0px -30% 0px"`，节点滚到屏幕中段时圆点从 border 灰切到 primary 橙 + ping 动画
  - 右侧挂 `projectIds` 对应的作品缩略图入口（链接到 `/works#<id>`），`projectById()` 解析
  - 顶部 `<SectionMarker n={3} total={6} label="About" />` + 杂志大字 `How I got here.`
- 重写 [components/site/navbar.tsx](components/site/navbar.tsx)：
  - 删除 `theme` state、`toggleTheme()`、`FiSun/FiMoon` 引入、`FiSearch`、`Button` shadcn 引入
  - logo 改为 mono `MAGICY` + muted `studio` 后缀，nav links 全 mono 12px uppercase tracking 0.18，contact CTA 改 mono 边框反转按钮
  - mobile menu 同步 mono 化，去掉主题切换按钮
- 重写 [components/site/services-section.tsx](components/site/services-section.tsx)：
  - 顶部 `<SectionMarker n={4} total={6} label="Services" />` + 杂志大字 `What I'm taking on.`
  - 6 卡片改为 `gap-px bg-border` 的网格分割线（无圆角，像 archive grid），icon 改为方框 + 1.4 stroke
  - 每卡底部加 `<MonoStatus state={service.available ? 'AVAILABLE' : 'LIMITED'} />`
- 重写 [components/site/contact-section.tsx](components/site/contact-section.tsx)：
  - `<SectionMarker n={5} total={6} label="Contact" />` + 杂志大字 `Let's build something.`
  - 4 联系方式改为 2×2 grid，方框 icon + mono label + 大字 value
  - 删除原 `text-amber-800` 旧色调
  - 底部 footer 加 `last deployed: 2026.05.24` + `built with claude code` mono 水印（可被 `NEXT_PUBLIC_DEPLOY_STAMP` 环境变量覆盖，部署到 Vercel 时由 build 期注入）

### 验收

- `npm run lint` 0 error
- `npm run build` 成功，5 静态页全部 prerender 通过
- 待用户在 :3001 肉眼验收：
  - About: timeline 节点滚到中段时圆点点亮 + 右侧项目缩略图入口
  - Services: 5 项 AVAILABLE + 05 LIMITED
  - Contact: 4 个联系卡 + footer 双水印
  - Navbar: 无主题切换按钮，mono 风格
  - 整站滚动通过 lenis 平滑

### 注意

- `NEXT_PUBLIC_DEPLOY_STAMP` 环境变量：默认用当前 ISO 日期；部署到 Vercel 时建议在 project env 加 `NEXT_PUBLIC_DEPLOY_STAMP=$(date -u +%Y.%m.%d)` 或在 `next.config.ts` 里 `process.env` 注入构建时间——本期未做，由用户部署时按需配置
- `services as const` + `highlight: readonly string[]`：`renderTitle` 已同步类型，但若以后从 DB / CMS 读 services 需放开 readonly
- /works 子页（works-hero / featured-project / projects-grid / works-cta）的 hero / cta / featured-project 仍用旧风格 + works-data shim——按 SPEC §5 留 v1.2 处理，不是 v1.1 范围
- 旧 `personal-skills.html` 在 public/ 下未删，about-timeline 不再链接它，留作历史
- Timeline `description` 留空时不渲染 `<p>` 节点，2025 节点视觉上只剩年份 + "Building in quiet" 标题——符合"不撒谎不解释"原则

### 部署

- 上 Vercel 前再执行一次 `npm run lint && npm run build`
- 部署后人工检查：
  - L5 北极星：找 3 个非技术朋友打开站，3 秒后能不能说出"这个人不太一样"
  - resume-tool 必须先部署到 Vercel + Railway 才能让 C 位 3 之一真正可点
  - 医学 Coze 工作流截图、resume-tool 录屏需替换 lib/projects.ts 中的占位 image（目前 resume-tool 用 /workspace.png、harbor-table 用 /封面.png）

### v1.1 完结

5 个 module 全部 commit：M1 → M2 → M3 → M4 → M5。worktree 流程合规（feature 分支 v2-rebrand），SPEC §6 依赖约束遵守（只新增 lenis）。下一阶段是 v1.2：补 /works 子页视觉一致性 + 接入真实媒体资产。

---

## v3 Cockpit 升级 — 框架就位（Claude Code 完成，Codex 接手）

v2 是「安静的高级模板」，v3 不换风格，**换记忆机制**。新增 4 个强记忆点：Token Assembler / Card hover Workflow Steps / Sticky 5-beat ProcessStory / Custom Cursor Cockpit。

### 完整契约

- [docs/SPEC-v3.md](docs/SPEC-v3.md) — codex 蓝本
- [docs/TASKS-v3.md](docs/TASKS-v3.md) — 5 module 线性清单（M2-M5 由 codex 实现）

### 已就位的脚手架（master Claude Code 完成）

- 分支 `v3-cockpit` 起自 v2 HEAD，与 `v2-rebrand` 平行
- [app/globals.css](app/globals.css) 新增 `--acid` (~#B5FF3D) + `--electric` (~#3D9CFF) token，`@theme inline` 暴露 `--color-acid` / `--color-electric`，**v2 既有色板不动**
- [lib/projects.ts](lib/projects.ts) `Project` 类型扩展 `workflow?: ProjectWorkflowStep[]` + `metric?: string`，3 个 C 位项目数据填入：
  - medical-content-pipeline → 5 步 ideation/copywriting/imagery/scripting/review，metric `10× output`
  - resume-tool → 5 步 paste JD/AI rewrite/ATS score/PDF export/deploy，metric `end-to-end / solo`
  - harbor-table → 5 步 design/implement/optimize/audit/deploy，metric `Lighthouse 95-100`
- [components/site/mono-status.tsx](components/site/mono-status.tsx) 扩展状态：`LIVE` (acid) / `LINK` (electric) / `INTERACTIVE` (electric)，原状态保持不变
- 新增 3 个 stub 文件，顶部都有 `// TODO(codex):` 行为契约：
  - [components/site/token-assembler.tsx](components/site/token-assembler.tsx) — 当前是 v2 风格 fade swap 占位，codex 替换为 token 拆解重组
  - [components/site/process-story.tsx](components/site/process-story.tsx) — 当前是单段占位 section，codex 替换为 sticky 5 节拍
  - [components/site/cursor-cockpit.tsx](components/site/cursor-cockpit.tsx) — 当前 `return null`，codex 实现 RAF 跟随 + data-cursor 状态机

### 三色信号铁律（任何人不可破）

| 颜色 | 仅用于 |
|---|---|
| Hazard Orange `--primary` | SHIPPED / primary CTA / hover 反转底色 / cursor BUILD |
| Acid Green `--acid` | AVAILABLE / LIVE / cursor SELECT / ProcessStory SHIPPED 节拍点 |
| Electric Blue `--electric` | LINK / INTERACTIVE / Token Assembler 闪烁边框 / cursor VIEW |

任意一处把 acid / electric 当装饰色铺面积 → 视觉系统崩塌。SPEC-v3 §2 写明。

### 验收

- `npm run lint` 0 error
- `npm run build` 成功，5 静态页全部 prerender 通过
- v2 视觉零回归：脚手架仅扩展 token 与类型，token-assembler 的 fade 占位、process-story 的占位段不破坏现有页面流；codex M2-M5 完成后才会出现 v3 体验

### Codex 执行入口

新会话第一条指令应是：

> 按 [docs/TASKS-v3.md](docs/TASKS-v3.md) 从 M2 开始执行。规范是 [docs/SPEC-v3.md](docs/SPEC-v3.md)。每个 module 单 commit + 在 HANDOFF.md 末尾追加段落。每个 commit 前 `npm run lint && npm run build` 必须通过。

### v3 完成后的合并路径

```
master  →  v2-rebrand (M1-M5 v2 改造)
              ↓
            v3-cockpit (Claude Code 脚手架 + Codex M2-M5 实现)
              ↓
            合并回 master + 部署 Vercel
```
