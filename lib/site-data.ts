export const siteConfig = {
  name: "MagicY",
  fullName: "MagicYStudio",
  tagline: "AI-native Studio / Solo Builder",
  headline: {
    fixed: "MagicY",
    rotating: [
      "Building AI workflows that ship.",
      "From clinical medicine to AI-native systems.",
      "Independent. Full-stack. Workflow-first.",
    ] as const,
  },
  subheadline:
    "临床医学背景的独立创作者。一个人完成工作流搭建、全栈开发、内容生产——目前已上线 5 个 AI 工作流，把医学科普生产效率提到 10×。",
  bio: "Clinical medicine grad turned independent AI builder. I design workflows, ship full-stack products, and run a one-person content system end-to-end.",
  email: process.env.NEXT_PUBLIC_EMAIL || "",
  github: process.env.NEXT_PUBLIC_GITHUB_URL || "",
  wechat: process.env.NEXT_PUBLIC_WECHAT || "",
  phone: process.env.NEXT_PUBLIC_PHONE || "",
  location: process.env.NEXT_PUBLIC_LOCATION || "",
  availableTime: process.env.NEXT_PUBLIC_AVAILABLE_TIME || "",
  statusText: process.env.NEXT_PUBLIC_STATUS_TEXT || "",
};

export const navLinks = [
  { label: "首页", href: "#hero" },
  { label: "作品", href: "/works" },
  { label: "关于", href: "#about" },
  { label: "服务", href: "#services" },
  { label: "联系", href: "#contact" },
];

// v2 portfolio source of truth lives in lib/projects.ts (SPEC §2.3).
// Re-exported here so existing imports from "@/lib/site-data" keep working.
export { featuredProjects } from "./projects";

export const timeline = [
  {
    year: "2024",
    title: "Clinical Medicine, B.S.",
    description: "临床医学毕业。跨界起点。",
    projectIds: [],
  },
  {
    year: "2025",
    title: "Building in quiet",
    description: "",
    projectIds: ["medical-ai-workflow"],
  },
  {
    year: "2026",
    title: "Shipping AI products",
    description:
      "5 工作流医学内容系统、resume-tool、harbor-table 相继上线。",
    projectIds: ["medical-content-pipeline", "resume-tool", "harbor-table"],
  },
  {
    year: "NOW",
    title: "Looking for AI-native teams",
    description: "开放远程 / 海外协作机会。",
    projectIds: [],
  },
] as const;

export const services = [
  {
    id: "01",
    title: "AI Workflow Design",
    highlight: ["AI", "Workflow"],
    description:
      "设计端到端的 AI 工作流，从需求分析到系统落地——已在 Coze 上跑通医学科普 5 工作流体系。",
    available: true,
  },
  {
    id: "02",
    title: "AI Automation",
    highlight: ["AI", "Automation"],
    description:
      "构建自动化管道，连接多模型与外部服务，把重复人工动作替换为可观测的 pipeline。",
    available: true,
  },
  {
    id: "03",
    title: "Prompt Engineering",
    highlight: ["Prompt"],
    description: "结构化 Prompt 设计与优化，提升 AI 输出质量与可控性。",
    available: true,
  },
  {
    id: "04",
    title: "AI Content Systems",
    highlight: ["AI", "Content"],
    description:
      "AI 驱动的内容生产系统，多语言、多平台分发——医学科普 10× 效率即来自该体系。",
    available: true,
  },
  {
    id: "05",
    title: "Research Pipeline",
    highlight: ["Research"],
    description:
      "AI 辅助研究管道，文献检索、信息提取与知识整合。当前案例较少，按 limited 接单。",
    available: false,
  },
  {
    id: "06",
    title: "Creative Frontend",
    highlight: ["Creative"],
    description:
      "Next.js / framer-motion / lenis 的高质感前端实现——见 harbor-table。",
    available: true,
  },
] as const;

export const contactInfo = [
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { label: "GitHub", value: process.env.NEXT_PUBLIC_GITHUB_DISPLAY || siteConfig.github, href: siteConfig.github },
  { label: "微信", value: siteConfig.wechat },
  { label: "电话", value: siteConfig.phone },
  { label: "Location", value: siteConfig.location },
  { label: "Available Time", value: siteConfig.availableTime },
];
