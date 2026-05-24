# SPEC v3 — MagicYStudio Cockpit

> v2 是「高级模板」。v3 不换风格，**换记忆机制**。
> 让访客 3 秒后说「咦这个站对鼠标有反应」「这是个工作台不是简历」。
>
> Claude Code 负责框架（类型、token、stub、SPEC）；Codex 负责实现。

---

## 0. 北极星

**v2 反应**：好看 / 高级 / 像作品集模板
**v3 反应**：「这站在工作」「我在操作一个面板」「他真的在 ship workflow」

**保留**：dark + Hazard Orange + PP Editorial 大字 + 整站信息架构（Hero / Work / About / Services / Contact）+ lenis 平滑滚动 + v2 已有的 mono 风格。

**注入 4 个强记忆点**：
1. Hero 的 token 拆解重组动画
2. 项目卡 hover 颜色反转 + workflow steps 浮入
3. 中段 sticky 5 节拍 ScrollStory（idea → workflow → prototype → automation → shipped）
4. Custom cursor + 三色信号灯系统

---

## 1. 四个记忆点契约（codex 严格按此实现）

### 1.1 Hero — Token Assembler（替换 v2 的 RotatingHeadline）

**位置**：`components/site/token-assembler.tsx`（已 stub）
**消费方**：`components/site/hero-profile-section.tsx`

**行为**：
1. 首次加载（仅一次，500ms 延迟后启动）：
   - 把 `Building AI workflows that ship.` 拆成 token：`[Build] [ing] [▒AI] [▒work] [flows] [▒that] [▒ship.]`
   - 每个 token 错位 + 透明度 0 + 略微随机抖动（±8px）入场
   - 200ms 内 token 飞回正确位置组装成完整句子（stagger 30ms / token）
   - 期间 token 背景闪一下 `--electric`（电蓝）边框
2. 进入循环态（assembly 完成后 1500ms 延迟）：
   - 切到下一句（`From clinical medicine to AI-native systems.`）时，老句子先反向拆解再消失，新句直接 token 入场
   - 4s 一句，三句循环

**Props 契约**：
```ts
interface TokenAssemblerProps {
  phrases: readonly string[];      // ≥ 1 句
  initialDelayMs?: number;         // default 500
  cycleMs?: number;                // default 4000
  staggerMs?: number;              // default 30
}
```

**约束**：
- 必须 client component，SSR 时只渲染 `phrases[0]` 全字符串避免 hydration mismatch
- `prefers-reduced-motion: reduce` 时退化为 v2 风格 fade 切换
- 拆 token 用空格 split + 保留前导空格（`▒` 表示空格槽位，渲染时是 `&nbsp;`）

### 1.2 Project Card — 颜色反转 + Workflow Steps 浮入

**位置**：`components/site/project-card.tsx`（v2 已有，扩展）
**前置**：`lib/projects.ts` 的 `Project` 类型扩展（见 §3）

**行为**：
- 默认态：v2 现状（border + 图 + 标题 + oneLiner + tags）
- Hover 态：
  1. 整卡 `bg-card → bg-primary` 反转（v2 已有，保留）
  2. **新增**：图片下方区域底部 5 行 workflow steps 从下而上 stagger 浮入（每行 mono uppercase tracking 0.14，1.5 size，60ms / 行）
  3. **新增**：右下角浮出 `metric` 行，PP Editorial 36px italic 显示 `10× output` / `Lighthouse 95-100` 等结果数字
  4. tags 颜色跟随反转（v2 已有，保留）

**Props 扩展**：
```ts
// project-card.tsx 内消费的 Project 字段新增 workflow + metric
// 仅 featured tier 必填，secondary / inProgress 可省（不渲染步骤区）
```

**约束**：
- 步骤行用 `aria-hidden="true"`，hover 才出现，键盘导航只播 :focus-visible
- Hover 区域是整卡，不是图片
- 禁止用 GSAP，stagger 用 framer-motion `staggerChildren`

### 1.3 ProcessStory — 竖直 Sticky 5 节拍（新 Section）

**位置**：`components/site/process-story.tsx`（已 stub）
**消费方**：`app/page.tsx` 中插入到 `<FeaturedProjects />` 与 `<AboutTimeline />` 之间，section index `02 / 06`（其余 section 编号顺延：Work=01 / Process=02 / About=03 / Services=04 / Contact=05）

**行为**：
- 容器 height = `500vh`（5 个节拍）
- 内层 `position: sticky; top: 0; height: 100vh` 撑满屏
- 5 节拍内容（写死在组件内，不走数据层）：
  1. `IDEA` — 一句话 + 一个手稿气质的 SVG/纹理
  2. `WORKFLOW` — Coze 工作流连线示意图（mono ASCII 风或简单 SVG node graph）
  3. `PROTOTYPE` — 代码片段 + Next.js 项目脚手架感
  4. `AUTOMATION` — 飞书表格 + 定时任务 cron 示意
  5. `SHIPPED` — 三个 C 位项目缩略图浮现 + `[● SHIPPED]` 状态点
- 滚动驱动：用 framer-motion `useScroll` + `useTransform`，scrollYProgress 0→1 映射到节拍 0→5
- 每节拍切换时：
  - 上节拍 fade-out + 上移 -20px
  - 下节拍 fade-in + 下移 0（from +20px）
  - 节拍编号 mono `01/05 — IDEA` 在左上 + primary 圆点
  - 节拍底部进度条 0-100% 平滑推进

**约束**：
- mobile（< 768px）退化为 5 个不 sticky 的纵向卡（堆叠），不破坏阅读
- `prefers-reduced-motion: reduce` 时也走 mobile 退化版
- 节拍切换不用懒加载，5 节拍同时 mount，opacity 切换

### 1.4 Cursor Cockpit — Custom Cursor + 状态信号

**位置**：`components/site/cursor-cockpit.tsx`（已 stub）
**消费方**：`app/layout.tsx` 顶层挂载（与 `<LenisProvider />` 同级）

**行为**：
- 默认隐藏系统光标（仅在 `pointer: fine` 媒体下生效，触屏不挂）
- 自定义 cursor：14px 圆环 + 中心 mono 文字 label
- 检测当前 hover 元素的 `data-cursor` 属性切换状态：
  - `data-cursor="view"` → 圆环放大 56px，label `VIEW`，颜色 `--electric`（电蓝）
  - `data-cursor="build"` → 圆环 56px，label `BUILD`，颜色 `--primary`（橙）
  - `data-cursor="select"` → 圆环 40px，label `SELECT`，颜色 `--acid`（酸绿）
  - 无 attr → 14px 默认环，无 label
- 跟随用 `requestAnimationFrame` + `transform: translate3d`，50ms 缓动滞后
- 数据属性已知出现位置：
  - 项目卡：`data-cursor="view"`
  - Hero / Contact CTA：`data-cursor="build"`
  - Service 卡：`data-cursor="select"`

**约束**：
- 必须 client，`useEffect` 内挂 `pointermove`
- `pointer: coarse`（触屏）/ `prefers-reduced-motion: reduce` → return null（保留系统光标）
- 不破坏 a/button 的 native :hover 状态
- z-index 9999，pointer-events: none

---

## 2. 信号色 Token（在 v2 基础上扩展）

写到 `app/globals.css`，**不改既有 token，只新增**：

```css
:root {
  /* v2 已有 */
  --primary: oklch(0.66 0.24 38);          /* #FF4500 hazard orange */

  /* v3 新增 */
  --acid:    oklch(0.88 0.27 130);         /* ~#B5FF3D acid green */
  --electric: oklch(0.7 0.21 252);         /* ~#3D9CFF electric blue */
}
```

`@theme inline` 暴露 Tailwind utility：
```css
@theme inline {
  --color-acid: var(--acid);
  --color-electric: var(--electric);
}
```

**分工铁律**：
| 颜色 | token | 仅用于 |
|---|---|---|
| Hazard Orange | `--primary` | SHIPPED 状态 / primary CTA / hover 颜色反转底色 / `data-cursor="build"` |
| Acid Green | `--acid` | AVAILABLE / LIVE 服务可用 / `data-cursor="select"` / Process Story SHIPPED 节拍点亮 |
| Electric Blue | `--electric` | LINK / INTERACTIVE / token assembler 闪烁边框 / `data-cursor="view"` |

任意一处用错色 → 系统视觉崩塌。**禁止把 acid/electric 当装饰色铺面积**，仅状态点 + 边框 + cursor + 1 字以内文字。

---

## 3. Project 类型扩展（lib/projects.ts）

新增字段到 `Project` 类型：

```ts
export interface ProjectWorkflowStep {
  id: string;            // "01" / "02"...
  label: string;         // "选题" / "ideation"
}

export interface Project {
  // ... v2 已有字段
  workflow?: ProjectWorkflowStep[];   // 5 步以内，仅 featured tier 必填
  metric?: string;                     // e.g. "10× output", "Lighthouse 95-100"
}
```

**3 个 C 位项目数据填入**（v3 范围只填 featured，secondary/inProgress 不动）：
- `medical-content-pipeline`：5 步（选题 → 文案 → 配图 → 脚本 → 复盘），metric `"10× output"`
- `resume-tool`：5 步（粘 JD → AI 改写 → ATS 评分 → PDF 导出 → 部署），metric `"end-to-end / solo"`
- `harbor-table`：5 步（设计 → 实现 → 优化 → 测试 → 部署），metric `"Lighthouse 95-100"`

---

## 4. MonoStatus 状态扩展

`components/site/mono-status.tsx` 新增状态：

```ts
type MonoStatusState =
  | "SHIPPED" | "BUILDING" | "IN_PROGRESS"     // v2 已有，保留
  | "LIMITED" | "AVAILABLE"                      // v2 已有
  | "LIVE"        // 新：服务/系统正在运行 → acid 点
  | "LINK"        // 新：可点外链 → electric 点
  | "INTERACTIVE" // 新：可交互节点 → electric 点
```

**点颜色映射**：
| state | dot color | label |
|---|---|---|
| SHIPPED / BUILDING | `bg-primary` (橙) | shipped / building |
| AVAILABLE | `bg-acid` (酸绿) | available |
| LIVE | `bg-acid` (酸绿) | live |
| LINK / INTERACTIVE | `bg-electric` (电蓝) | link / interactive |
| IN_PROGRESS / LIMITED | `bg-muted-foreground` (灰) | in progress / limited |

---

## 5. 文件清单（codex 据此修改）

### 新增

| 文件 | 用途 | claude code 已 stub |
|---|---|---|
| [components/site/token-assembler.tsx](../components/site/token-assembler.tsx) | Hero 拆解重组动画 | ✓ |
| [components/site/process-story.tsx](../components/site/process-story.tsx) | 竖直 sticky 5 节拍 | ✓ |
| [components/site/cursor-cockpit.tsx](../components/site/cursor-cockpit.tsx) | Custom cursor + 状态 | ✓ |

### 修改

| 文件 | 改动要点 |
|---|---|
| [app/globals.css](../app/globals.css) | 新增 `--acid` / `--electric` token + `@theme inline` 暴露 |
| [app/layout.tsx](../app/layout.tsx) | 挂 `<CursorCockpit />`（与 LenisProvider 同级） |
| [app/page.tsx](../app/page.tsx) | 在 `<FeaturedProjects />` 与 `<AboutTimeline />` 之间插 `<ProcessStory />` |
| [components/site/hero-profile-section.tsx](../components/site/hero-profile-section.tsx) | 删 inline `RotatingHeadline`，换为 `<TokenAssembler phrases={...} />`；hero CTA 加 `data-cursor="build"` |
| [components/site/project-card.tsx](../components/site/project-card.tsx) | 整卡加 `data-cursor="view"`；hover 时底部展开 workflow steps + metric（仅 featured tier） |
| [components/site/mono-status.tsx](../components/site/mono-status.tsx) | 加 LIVE / LINK / INTERACTIVE 状态 + acid / electric 点颜色 |
| [components/site/section-marker.tsx](../components/site/section-marker.tsx) | 总数从 6 改为 5（v2 是 5 个真实 section + Hero index = 5），ProcessStory 占编号 02 |
| [components/site/featured-projects.tsx](../components/site/featured-projects.tsx) | section 编号 01 不变，但 `total` 改为 5 |
| [components/site/about-timeline.tsx](../components/site/about-timeline.tsx) | 编号 03（之前 03） |
| [components/site/services-section.tsx](../components/site/services-section.tsx) | 编号 04 + LIVE/AVAILABLE 切回 acid 点 |
| [components/site/contact-section.tsx](../components/site/contact-section.tsx) | 编号 05 + Email href 加 `data-cursor="build"` |
| [lib/projects.ts](../lib/projects.ts) | `Project` 加 `workflow?` `metric?`；3 个 featured 填入 §3 数据 |

### 不动

- v2 所有色板既有 token、radius、字体、布局栅格
- shadcn 组件库
- /works 子页（仍走 v1.2 backlog）
- next.config.ts / eslint.config.mjs / tsconfig.json
- 不引入新 npm 依赖（lenis 已装够用，cursor 用原生 RAF）

---

## 6. 执行顺序（5 个 module，每 module 单 commit）

```
M1 Tokens + 类型扩展（半天，纯框架）
   ├ globals.css 加 acid/electric token
   ├ lib/projects.ts 加 workflow + metric 字段并填 3 个 C 位
   ├ mono-status.tsx 加 LIVE / LINK / INTERACTIVE
   └ commit: "feat(v3/m1): cockpit color tokens + project workflow type"

M2 TokenAssembler（1 天）
   ├ token-assembler.tsx 实现
   ├ hero-profile-section.tsx 替换 RotatingHeadline
   └ commit: "feat(v3/m2): hero token assembler animation"

M3 Project Card hover steps（1 天）
   ├ project-card.tsx 加 workflow + metric hover 区
   ├ data-cursor 属性挂上
   └ commit: "feat(v3/m3): project card workflow steps + metric on hover"

M4 ProcessStory（1.5 天）
   ├ process-story.tsx 实现 sticky 5 节拍 + scroll progress
   ├ app/page.tsx 插入
   ├ section-marker total 改 5，编号顺延
   └ commit: "feat(v3/m4): vertical sticky 5-beat process story"

M5 Cursor Cockpit + 收尾（0.5 天）
   ├ cursor-cockpit.tsx 实现
   ├ layout.tsx 挂载
   ├ data-cursor 全站补齐
   ├ npm run lint && npm run build
   └ commit: "feat(v3/m5): custom cursor + status signal cockpit"
```

每 module 完成后写 `HANDOFF.md` 段落，全部完成后用户验收 + Vercel 部署。

---

## 7. 验收（v3 北极星检验）

### 7.1 自动化

```bash
npm run lint    # 0 error
npm run build   # 5 静态页 prerender 通过
```

### 7.2 视觉手测

- [ ] Hero 进入页面：500ms 后 token 飞入组装出第一句，1500ms 后开始循环切换
- [ ] 项目卡 hover：整卡橙底白字 + 底部 5 行 workflow 浮入 + 右下 metric 大字
- [ ] 滚到 Process section：sticky 撑满屏，5 节拍随滚动平滑切换，节拍编号 + 进度条同步
- [ ] 鼠标移到项目卡：cursor 变 14px → 56px 蓝环 + `VIEW` 文字
- [ ] 鼠标移到 Hero CTA：cursor 变 56px 橙环 + `BUILD`
- [ ] 鼠标移到 Service 卡：cursor 变 40px 绿环 + `SELECT`
- [ ] 触屏设备：cursor cockpit 不出现，系统光标正常

### 7.3 主观信号（找 3 个非技术朋友）

- [ ] 「这站对鼠标有反应」→ cursor cockpit 生效
- [ ] 「他真的是搞 workflow 的」→ ProcessStory + 卡片 steps 生效
- [ ] 「比一般作品集多了点什么」→ token assembler + 三色信号灯生效

任意 2 项落空 → 重做对应 module。

---

## 8. 给 Codex 的备忘

- 不要新增 npm 依赖
- 不要动 v2 已稳定的色板和布局栅格
- 每个 stub 文件顶部都有 `// TODO(codex):` 注释，按注释实现即可
- 改完每个 module 跑一次 `npm run build`
- 三色信号铁律不可破
- 避免「特效」式实现：每个动效都要服务于「这个站在工作」的认知，不是炫技
