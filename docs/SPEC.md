# SPEC v1.1 — MagicYStudio Brand Site v2

> 本 plan 文件 = SPEC v1.1 完整内容
> 用户批准后，新会话第一步：把本文件拷贝到 `Desktop/MagicYStudio Brand Site v2/docs/SPEC.md` 作为执行依据
> 受 plan mode 约束，本会话内不会再编辑除本文件以外的任何文件

---

## Context — 为什么改

旧版 (`Desktop/MagicYStudio Brand Site`, localhost:3000) 是模板感的米白橙 SaaS 站，存在三个具体问题需要在 v2 解决：

1. **首屏廉价 AI 感**：`hero-visual.tsx` 用 sci-fi-body.png + 轨道环 + 双 radial-gradient blur，触发"AI 默认审美"反应
2. **作品池与简历错配**：`lib/site-data.ts` / `lib/works-data.ts` 里的 featuredProjects 是 workspace / geo-content / dify-pipeline，和真实战斗力（医学 Coze 系统 / resume-tool / harbor-table）不一致
3. **Hero copy 自我标榜**：`headline.line1+line2 = "探索未知，创造可能。"` + bio "在医学与 AI 的交汇处，构建信息桥梁..."——HR 看不出能做什么

v2 目标：在不破坏 v1（保留在 :3000）的前提下，用同一套技术栈（Next.js 16.2.6 / React 19.2.4 / Tailwind v4 / framer-motion 12 / shadcn）改造为 **AI-native studio 风格**，让 HR 3 秒钟产生「咦，这个人不太一样——叫产品那边的同事也来看一下」的反应。

---

## 1. 北极星与 Audience

> **"咦，这个人不太一样——叫产品那边的同事也来看一下。"**

- **"咦"** = 首屏 3 秒有意外感（黑底 + Hazard Orange + Mono 标签 + 大字版式）
- **"不太一样"** = 和 AI 转型应届生标准作品集明显区分（临床医学 Timeline + 5 工作流系统真实截图）
- **"叫同事来看"** = HR 主动转发——从初筛升级到推荐

**主要受众**：海外 AI/全栈方向 HR、技术 founder、产品负责人（停留 15-30s）
**次要受众**：需要 AI 工作流 / 内容自动化的中小企业团队

**失败信号（反向校准）**：
| HR 心里想的是… | 问题 |
|---|---|
| "好看但他到底能做什么？" | 视觉盖过内容 = La Revoltosa 病 |
| "技术不错但有点冷" | 纯 Boron 病 |
| "AI 转型应届生" | 只剩标签 |

---

## 2. 内容范围（替换现有数据）

### 2.1 Hero Copy（覆盖 `lib/site-data.ts` 的 `siteConfig.headline / subheadline / bio`）

```
旧：headline = { line1: "探索未知，", line2: "创造可能。" }
新：headline.rotating = [
      "Building AI workflows that ship.",
      "From clinical medicine to AI-native systems.",
      "Independent. Full-stack. Workflow-first."
    ]
    headline.fixed = "MagicY"   // 不再做大字 line1/line2，固定锚点放小一号

旧：subheadline = "在医学与 AI 的交汇处，构建信息桥梁..."
新：subheadline = "临床医学背景的独立创作者。一个人完成工作流搭建、全栈开发、内容生产——目前已上线 5 个 AI 工作流，把医学科普生产效率提到 10×。"

旧：tagline = "AI Workflow Builder / Independent Developer"
新：tagline = "AI-native Studio / Solo Builder"
```

> Hero copy 原则：**只说做了什么，不说我是什么**。删除"探索未知/创造可能/构建信息桥梁"这类自我标榜词。

### 2.2 Timeline（覆盖 `site-data.ts` 的 `timeline`）

```
2024  Clinical Medicine, B.S.       临床医学毕业，跨界起点
2025  Building in quiet              （无文字解释，用作品时间戳填充：右侧挂 medical-ai-workflow + resume-tool 截图）
2026  Shipping AI products           5 工作流医学内容系统 / resume-tool / harbor-table 上线
NOW   Looking for AI-native teams   开放远程 / 海外协作机会
```

**空白期处理原则**：不撒谎不解释，用作品发布时间戳代替叙事。2025 节点不写"学习 AI"。

### 2.3 作品池 5+1（覆盖 `site-data.ts` 的 `featuredProjects` + `lib/works-data.ts`）

#### C 位 3 个（首页 Featured Works，大图深度展示）

**① 医学科普内容智能生产系统（Coze 5 工作流）**
- id: `medical-content-pipeline`
- tags: `AI Workflow` `Content Automation` `Coze`
- one-liner: "5 个工作流串联，医学科普选题→文案→配图→脚本→复盘，效率 10×"
- 展示物：飞书表格截图 + Coze 工作流画布 + 三平台输出对比
- 状态：`SHIPPED`

**② resume-tool（端到端全栈 AI 产品）**
- id: `resume-tool`
- tags: `Full-Stack` `AI Product` `Next.js`
- one-liner: "JD 输入→AI 改写→ATS 评分→PDF 导出，一个人全链路"
- 展示物：30-60s 录屏 demo + 关键流程截图
- 状态：`SHIPPED`（**前置条件：必须部署到 Vercel + Railway，本地跑等于没有**）

**③ harbor-table（前端工程硬功夫）**
- id: `harbor-table`
- tags: `Frontend` `GSAP` `Next.js 16`
- one-liner: "Next.js 16 + GSAP + Lenis production-ready demo，Lighthouse 95-100"
- 展示物：Live URL + CASE_STUDY 文档
- 状态：`SHIPPED`

#### 第二梯队 2 个（/works 页面，增加厚度）

**④ magicystudio-workspace** — 本地优先 + IndexedDB + Monaco
**⑤ medical-ai-workflow（旧 Dify）+ Coze 新版** — 一个故事：从单工作流到 5 工作流系统的演进

#### 加 1：进行中

**⑥ lifeos-dashboard** — 标 `In Progress`，证明持续构建

### 2.4 Services（覆盖 `services`）

保留 6 项，新增 `available` 字段：

```
01 AI Workflow Design       available: true   (Coze/Dify 真实案例)
02 AI Automation            available: true
03 Prompt Engineering       available: true
04 AI Content Systems       available: true
05 Research Pipeline        available: false  (无强案例，标"limited")
06 Creative Frontend        available: true   (harbor-table)
```

---

## 3. 视觉系统（设计 token 锁定后不可改）

### 3.1 色板（写到 `app/globals.css`）

```css
/* 强制 dark mode 单一主题，删除 :root light 主题 */
:root {
  --background:        oklch(0.145 0.01 250);   /* #0E0E0F off-black */
  --foreground:        oklch(0.96 0.01 80);     /* #F5F1EA paper white */
  --card:              oklch(0.18 0.01 250);    /* #1A1A1C subtle elevated */
  --card-foreground:   oklch(0.96 0.01 80);
  --muted:             oklch(0.18 0.01 250);
  --muted-foreground:  oklch(0.62 0.005 250);   /* #8A8A92 secondary text */
  --border:            oklch(0.22 0.005 250);   /* #2A2A2D divider */
  --input:             oklch(0.22 0.005 250);
  --ring:              oklch(0.66 0.24 38);

  --primary:           oklch(0.66 0.24 38);     /* #FF4500 Hazard Orange */
  --primary-foreground: oklch(0.145 0.01 250);
  --accent:            oklch(0.66 0.24 38 / 0.10);
  --accent-foreground: oklch(0.66 0.24 38);

  --destructive:       oklch(0.577 0.245 27.325);
  --radius:            0.375rem;                 /* 6px max — 锐利感来源，不再用 rounded-2xl */
}
```

> 删除 `.dark` 选择器。layout.tsx 上 html 加 `className="dark"` 锁定（避免触发 light 默认）。
> 删除 navbar 的 toggleTheme（同时删除 FiSun/FiMoon 切换按钮）。

### 3.2 字体

```ts
// app/layout.tsx 新增 next/font/local 引入 PP Editorial New
// public/fonts/PPEditorialNew-{Regular,Italic,Ultralight}.woff2
const editorial = localFont({
  src: [
    { path: "../public/fonts/PPEditorialNew-Ultralight.woff2", weight: "200" },
    { path: "../public/fonts/PPEditorialNew-Italic.woff2",     weight: "400", style: "italic" },
    { path: "../public/fonts/PPEditorialNew-Regular.woff2",    weight: "400" },
  ],
  variable: "--font-display",
});

// Geist Sans / Geist Mono 已装，保留
```

```css
@theme inline {
  --font-display: var(--font-display);     /* PP Editorial — Hero 大字 */
  --font-sans:    var(--font-sans);        /* Geist Sans — body */
  --font-mono:    var(--font-geist-mono);  /* Geist Mono — 状态标签/年份 */
}
```

### 3.3 版式

| 项 | 值 |
|---|---|
| Body 字号 | ≥ 18px（旧版 0.78rem 太小，违反 [[design-20-rules]] Body≥24px 底线，body 主体改 18px，副文字最小 14px） |
| Hero Display | 96-160px（`clamp(6rem, 12vw, 10rem)`），PP Editorial Ultralight |
| Section 间距 | 上下 ≥ 160px（旧版 py-28 = 112px，改 py-40 = 160px） |
| 网格 | 12 col, gutter 32px, max-w 1280px |
| 圆角 | rounded-md (6px) 上限，禁止 rounded-2xl/3xl/4xl |

### 3.4 AI-native studio 标志元素（成本接近 0，效果拉满）

1. **Mono 状态标签**：项目卡角落 `[● SHIPPED]` `[● BUILDING]` `[v0.2.1]`（Geist Mono + primary 色圆点）
2. **Section 编号**：每屏左上角 `01 / 06 — Work` `02 / 06 — About`（archive 感）
3. **底部时间戳水印**：`last deployed: 2026.05.24` `built with claude code`

---

## 4. 交互（按 Q6 最终方案）

| 交互 | 优先级 | 实现方案 |
|---|---|---|
| Lenis 平滑滚动 | P0 必做 | 新装 `lenis@1.x`，`app/layout.tsx` body 顶层挂全局 hook |
| HeroText 切换 | P1 | framer-motion `AnimatePresence` + setInterval 4s 循环 3 句 |
| Project Card Hover | P1 | framer-motion `whileHover`：颜色反转（bg → primary, text → background）+ tech tag 浮现 + 缩略图轻微视差 |
| Narrative Timeline | P1 | framer-motion `useInView` + `useScroll`，节点逐个亮起，每节点配项目截图入口（轻量 ScrollStory） |

**禁止 P3 backlog**（Cursor 跟随 / ScrollStory）：v1.1 不实现，避免炫技。
**不引入 GSAP**：framer-motion 12 + lenis 已覆盖所有需求。

---

## 5. 关键文件改造清单

### 必改（覆盖式重写）

| 文件 | 改动 |
|---|---|
| `app/globals.css` | 改 :root 色板（§3.1），删除 .dark 块 |
| `app/layout.tsx` | 加 `className="dark"` 锁主题；新增 `localFont` 引入 PP Editorial |
| `lib/site-data.ts` | 替换 `siteConfig.headline / subheadline / bio / tagline`、`timeline`（§2.1+§2.2）、`featuredProjects`（§2.3 C 位 3）、`heroProjects`（删除或改为 C 位前 2）、`services`（加 available 字段） |
| `lib/works-data.ts` | 替换 `featuredProject` 为医学 Coze 系统、`projects` 改为第二梯队 + In Progress |
| `components/site/hero-profile-section.tsx` | **删除** sci-fi-body 引入 + ambient glow + 3 列布局；改造为：左大字（PP Editorial + HeroText 切换）+ 右 Mono 状态卡（avatar 缩到 48px，整体克制化） |
| `components/site/hero-visual.tsx` | **删除文件**（含 sci-fi-body.png + orbital ring） |
| `components/site/about-timeline.tsx` | 横向 grid 改为竖向滚动叙事；接入 useScroll 节点逐个亮起；每节点右侧挂项目截图 |
| `components/site/featured-projects.tsx` | section 加左上 `01 / 06 — Work`；卡片改为大图杂志式布局（不是 3 列 bento） |
| `components/site/project-card.tsx` | hover 改为颜色反转 + Mono 状态标签；删除 `aspect-[16/10]` 改 `aspect-[4/3]`；Status badge 改 Mono 字体 |
| `components/site/services-section.tsx` | 把不可交付的 `05 Research Pipeline` 标 `[LIMITED]`；section 加 `04 / 06 — Services` |
| `components/site/contact-section.tsx` | 删除 `text-amber-800`（旧色调）；底部水印加 `last deployed:` `built with claude code` |
| `components/site/navbar.tsx` | 删除 `toggleTheme` + `FiSun/FiMoon` + `theme` state；保留 scrolled 行为 |

### 新增

| 文件 | 用途 |
|---|---|
| `lib/projects.ts` | 静态 5+1 作品池数据，类型 `Project { id, name, oneLiner, tags, status: 'SHIPPED' \| 'BUILDING' \| 'IN_PROGRESS', year, image, links?, caseStudy? }` |
| `components/lenis-provider.tsx` | client component，`useEffect` 挂 lenis 实例 + raf 循环 |
| `components/site/section-marker.tsx` | 复用组件 `<SectionMarker n={1} total={6} label="Work" />` |
| `components/site/mono-status.tsx` | 复用组件 `<MonoStatus state="SHIPPED" />`，Geist Mono + 圆点 |
| `public/fonts/PPEditorialNew-*.woff2` | 用户需自行放入字体文件（License: Pangram Pangram Foundry，Personal Use 免费） |

### 不动（保持原样）

- `components/ui/*`（shadcn 基础组件）
- `app/works/page.tsx` / `components/site/works-hero.tsx` / `works-cta.tsx` / `projects-grid.tsx` / `featured-project.tsx`（/works 子页本期不改，v1.2 再处理）
- `next.config.ts` / `tsconfig.json` / `eslint.config.mjs`
- `.env`（用户已配置邮箱/GitHub 等）

---

## 6. 技术约束

- **Next.js 16.2.6 + React 19.2.4 + Tailwind v4**：不降版本。每改一处涉及新 API（如 `next/font/local`、Tailwind v4 的 `@theme inline`、React 19 form actions）的代码，**先读 `node_modules/next/dist/docs/` 对应文档再写**（AGENTS.md 强制要求）
- **新增依赖只允许 `lenis`**：`npm install lenis`。不引入 GSAP、不引入 next-themes、不引入其他动效库
- **所有数据层为静态 TS 对象**：不接 Notion / 飞书 API（避免部署时多一层故障点）
- **L3 流程合规**：本任务符合 L3 项目级，`docs/SPEC.md` 用本 plan 内容生成，每个 module 完成后单 commit + HANDOFF.md
- **Hydration 警告优先级 P2**：`hero-visual.tsx` 删除后该警告自动消失。如果仍有 SVG 浮点数 hydration 警告，统一用 `Number(v.toFixed(2))` 修复

---

## 7. 执行顺序（按 5 个 Module 切，每个 module 单 commit）

```
M1  Design Tokens（半天）
    └ globals.css 色板 + layout.tsx 锁 dark + 引入 PP Editorial
    └ 验收：开 v2 (:3001) 看到 #0E0E0F 黑底 + Paper White 字 + 锐利圆角
    └ commit: "feat(v2/m1): lock dark theme + hazard orange + editorial font"

M2  Hero 改造（1 天）
    └ 删 hero-visual.tsx + 删 sci-fi-body 引用
    └ 改 hero-profile-section.tsx：左大字 PP Editorial + HeroText 3 句切换 + 右 Mono 状态卡
    └ 改 site-data.ts 的 hero copy（§2.1）
    └ 验收：首屏 3 秒看到 3 句切换 + 无 sci-fi 元素
    └ commit: "feat(v2/m2): replace hero with editorial display + rotating headline"

M3  Lenis + 数据层（半天）
    └ npm install lenis
    └ 新增 lenis-provider.tsx 挂载到 layout.tsx
    └ 新增 lib/projects.ts，site-data.ts/works-data.ts 替换为新作品池（§2.3）
    └ 验收：滚动质感丝滑 + 项目数据已替换
    └ commit: "feat(v2/m3): integrate lenis + load 5+1 portfolio data"

M4  Project Card + Featured Works（1 天）
    └ 改 project-card.tsx：hover 反转 + Mono 状态标签
    └ 改 featured-projects.tsx：杂志式大图布局 + section 编号
    └ 新增 mono-status.tsx + section-marker.tsx
    └ 验收：3 张 C 位项目卡显示 SHIPPED 状态，hover 有反转
    └ commit: "feat(v2/m4): magazine-style featured works + mono status badges"

M5  Timeline + 收尾（1 天）
    └ 改 about-timeline.tsx：竖向滚动驱动 + 节点亮起 + 项目截图入口
    └ 改 timeline 数据（§2.2）
    └ navbar 删除主题切换
    └ services-section.tsx 加 LIMITED 标记
    └ contact-section.tsx 加水印
    └ npm run lint && npm run build → 部署到 Vercel
    └ commit: "feat(v2/m5): narrative timeline + portfolio polish"
```

---

## 8. Verification（端到端验收）

### 8.1 自动化验收（每个 M 完成执行）

```bash
cd "Desktop/MagicYStudio Brand Site v2"
npm run lint     # 必须 0 error
npm run build    # 必须成功
npx next dev -p 3001
# 访问 http://localhost:3001，对比 :3000 原版
```

### 8.2 验收清单（最终交付前逐项打勾）

**L1 视觉**
- [ ] 首屏背景 `#0E0E0F`，文字 `#F5F1EA`，强调色仅出现在关键词和 CTA
- [ ] 整站零紫蓝渐变、零玻璃拟态、零 sci-fi-body
- [ ] PP Editorial 在 Hero 大字处可见，Geist Mono 在状态标签处可见

**L2 交互**
- [ ] Lenis 平滑滚动无卡顿，整站 60fps
- [ ] HeroText 3 句切换循环正常
- [ ] 项目卡片 Hover 颜色反转 + tech tag 浮现
- [ ] Timeline 滚到节点时该节点亮起

**L3 内容**
- [ ] 3 个 C 位项目（医学 Coze / resume-tool / harbor-table）有完整截图
- [ ] resume-tool 已部署到 Vercel + Railway，有可点击 Live URL
- [ ] Timeline 不出现"2025 学习 AI"，改为 "Building in quiet" + 作品时间戳
- [ ] Services `05 Research Pipeline` 标 `[LIMITED]`

**L4 工程**
- [ ] `npm run build` 成功，Vercel 部署成功
- [ ] design token 锁定，globals.css :root 不再改动
- [ ] Lighthouse Performance ≥ 90 / Accessibility ≥ 95

**L5 北极星（主观）**
- [ ] 找 3 个非技术朋友打开站，3 秒后能说出"这个人不太一样"——任意一个说"和普通简历站差不多"则 M2/M5 返工

### 8.3 失败回滚

每个 module 单 commit。出错回滚命令：
```bash
git log --oneline | head -10
git reset --hard <previous-module-commit>
```
原版 :3000 始终保留作为视觉对比基准。

---

## 9. 新会话执行交接

本会话受 plan mode 约束，无法编辑任何源码文件。用户批准本 plan 后，按 [[CLAUDE.md L3 流程]]：

1. **关闭当前会话**
2. **`cd "Desktop/MagicYStudio Brand Site v2"` 起新会话**
3. 新会话第一条指令：「按 `~/.claude/plans/valiant-leaping-quokka.md` 内容生成 `docs/SPEC.md`，然后从 M1 开始执行」
4. 新会话主 Claude 按 [[hermes-workflow-rule]] 分发：power-design 出 token / web-design-engineer 写代码 / QA Agent 跑 lint+build / Reality Check 看 :3001 实际渲染
5. 每个 module 完成后写 `HANDOFF.md` 段落，全部完成后部署 Vercel
