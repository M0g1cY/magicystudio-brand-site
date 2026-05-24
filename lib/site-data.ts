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
    title: "临床医学毕业",
    description: "完成临床医学学业，开始探索职业与技术的交汇方向。",
  },
  {
    year: "2025",
    title: "学习 AI 工具与自动化",
    description: "系统学习 Prompt Engineering、AI 自动化、工作流设计与工具链。",
  },
  {
    year: "2026",
    title: "构建个人品牌与产品",
    description: "打造 MagicYStudio Workspace 与个人品牌网站，沉淀知识体系。",
  },
  {
    year: "未来",
    title: "持续构建 AI Native 产品",
    description: "聚焦 AI 原生应用与自动化系统，持续输出工具与内容。",
  },
];

export const services = [
  {
    id: "01",
    title: "AI Workflow Design",
    highlight: ["AI", "Workflow"],
    description: "设计端到端的 AI 工作流，从需求分析到系统落地，让 AI 真正融入业务流程。",
  },
  {
    id: "02",
    title: "AI Automation",
    highlight: ["AI", "Automation"],
    description: "构建自动化管道，连接多模型与外部服务，减少重复性人工操作。",
  },
  {
    id: "03",
    title: "Prompt Engineering",
    highlight: ["Prompt"],
    description: "结构化 Prompt 设计与优化，提升 AI 输出质量与可控性。",
  },
  {
    id: "04",
    title: "AI Content Systems",
    highlight: ["AI", "Content"],
    description: "搭建 AI 驱动的内容生产系统，实现多语言、多平台的内容自动化。",
  },
  {
    id: "05",
    title: "Research Pipeline",
    highlight: ["Research"],
    description: "构建 AI 辅助研究管道，加速文献检索、信息提取与知识整合。",
  },
  {
    id: "06",
    title: "Creative Frontend",
    highlight: ["Creative"],
    description: "打造简洁、高效的产品界面，平衡美学与功能。",
  },
];

export const contactInfo = [
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { label: "GitHub", value: process.env.NEXT_PUBLIC_GITHUB_DISPLAY || siteConfig.github, href: siteConfig.github },
  { label: "微信", value: siteConfig.wechat },
  { label: "电话", value: siteConfig.phone },
  { label: "Location", value: siteConfig.location },
  { label: "Available Time", value: siteConfig.availableTime },
];
