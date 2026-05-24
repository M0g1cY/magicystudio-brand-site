/**
 * v2 portfolio source of truth — 5+1 SHIPPED + IN_PROGRESS works.
 * SPEC §2.3. Static TS, no Notion / 飞书 API by design.
 *
 * v3 extension: optional `workflow` (≤ 5 steps) and `metric` for featured tier.
 * See docs/SPEC-v3.md §3.
 */

export type ProjectStatus = "SHIPPED" | "BUILDING" | "IN_PROGRESS";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectWorkflowStep {
  id: string;     // "01" / "02" / ...
  label: string;  // mono-uppercase friendly: "ideation" / "选题"
}

export interface Project {
  id: string;
  name: string;
  oneLiner: string;
  description?: string;
  tags: string[];
  status: ProjectStatus;
  year: string;
  image: string;
  links?: ProjectLink[];
  caseStudy?: string;
  /** featured = C 位 3，secondary = 第二梯队，inProgress = 加 1 */
  tier: "featured" | "secondary" | "inProgress";
  /** v3: ordered workflow steps, ≤ 5. Required for featured tier. */
  workflow?: ProjectWorkflowStep[];
  /** v3: result metric, e.g. "10× output". One short phrase. */
  metric?: string;
}

export const projects: Project[] = [
  // ============ C 位 3 ============
  {
    id: "medical-content-pipeline",
    name: "医学科普内容智能生产系统",
    oneLiner:
      "5 个 Coze 工作流串联，医学科普选题→文案→配图→脚本→复盘，效率 10×",
    description:
      "为一人内容团队设计的端到端 AI 内容产线。5 个 Coze 工作流串联：热点选题 → 长文文案 → 配图生成 → 短视频口播脚本 → 数据复盘。落库飞书多维表格，三平台分发（公众号 / 小红书 / 视频号）。",
    tags: ["AI Workflow", "Content Automation", "Coze"],
    status: "SHIPPED",
    year: "2026",
    image: "/aimedicalworkflow.png",
    tier: "featured",
    workflow: [
      { id: "01", label: "ideation" },
      { id: "02", label: "copywriting" },
      { id: "03", label: "imagery" },
      { id: "04", label: "scripting" },
      { id: "05", label: "review" },
    ],
    metric: "10× output",
  },
  {
    id: "resume-tool",
    name: "resume-tool",
    oneLiner: "JD 输入 → AI 改写 → ATS 评分 → PDF 导出，一个人全链路",
    description:
      "针对求职场景的端到端全栈 AI 产品。粘 JD、上传简历、AI 重写、ATS 评分、PDF 导出，全流程一人完成（前后端 + 部署 + 运营）。Next.js + Vercel + Railway。",
    tags: ["Full-Stack", "AI Product", "Next.js"],
    status: "SHIPPED",
    year: "2026",
    image: "/workspace.png",
    tier: "featured",
    workflow: [
      { id: "01", label: "paste JD" },
      { id: "02", label: "AI rewrite" },
      { id: "03", label: "ATS score" },
      { id: "04", label: "PDF export" },
      { id: "05", label: "deploy" },
    ],
    metric: "end-to-end / solo",
  },
  {
    id: "harbor-table",
    name: "harbor-table",
    oneLiner: "Next.js 16 + GSAP + Lenis 的 production-ready demo，Lighthouse 95-100",
    description:
      "前端工程硬功夫展示。Next.js 16 + GSAP + Lenis 平滑滚动，Lighthouse Performance/Accessibility 95-100，包含 CASE_STUDY 文档。",
    tags: ["Frontend", "GSAP", "Next.js 16"],
    status: "SHIPPED",
    year: "2026",
    image: "/封面.png",
    tier: "featured",
    workflow: [
      { id: "01", label: "design" },
      { id: "02", label: "implement" },
      { id: "03", label: "optimize" },
      { id: "04", label: "audit" },
      { id: "05", label: "deploy" },
    ],
    metric: "Lighthouse 95-100",
  },

  // ============ 第二梯队 2 个 ============
  {
    id: "magicystudio-workspace",
    name: "MagicYStudio Workspace",
    oneLiner: "本地优先 + IndexedDB + Monaco 的个人开发工作台",
    description:
      "AI-native 个人开发工作台，本地优先 + IndexedDB 持久化 + Monaco 编辑器。聚焦把 AI 真正嵌进日常 dev 流程。",
    tags: ["Next.js", "TypeScript", "Monaco", "IndexedDB"],
    status: "SHIPPED",
    year: "2026",
    image: "/workspace.png",
    tier: "secondary",
  },
  {
    id: "medical-ai-workflow",
    name: "Medical AI Workflow（Dify → Coze 演进）",
    oneLiner: "从单一 Dify 工作流到 5 工作流系统的演进史",
    description:
      "最初的 Dify 单工作流原型，迭代为现在的 5 工作流 Coze 系统（见 medical-content-pipeline）。这一条记录了从 PoC 到生产化的全过程。",
    tags: ["Dify", "Coze", "Workflow", "Iteration"],
    status: "SHIPPED",
    year: "2025",
    image: "/dify2.png",
    tier: "secondary",
  },

  // ============ 加 1：进行中 ============
  {
    id: "lifeos-dashboard",
    name: "lifeos-dashboard",
    oneLiner: "个人 LifeOS 数据面板，进行中——证明持续构建",
    description:
      "整合习惯追踪、阅读、健康、财务的个人 dashboard，目标用 AI agent 替代手工记录。建设中。",
    tags: ["Dashboard", "AI Agent", "Personal"],
    status: "IN_PROGRESS",
    year: "2026",
    image: "/geo.png",
    tier: "inProgress",
  },
];

export const featuredProjects = projects.filter((p) => p.tier === "featured");
export const secondaryProjects = projects.filter((p) => p.tier === "secondary");
export const inProgressProjects = projects.filter((p) => p.tier === "inProgress");

/** /works 页面用：Featured 大图 + Grid 第二梯队 + InProgress */
export const worksFeatured = featuredProjects[0];
export const worksGrid = [
  ...featuredProjects.slice(1),
  ...secondaryProjects,
  ...inProgressProjects,
];

export function projectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
