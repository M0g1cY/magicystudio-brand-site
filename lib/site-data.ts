export const siteConfig = {
  name: "MagicY",
  fullName: "MagicYStudio",
  tagline: "AI Workflow Builder / Independent Developer",
  headline: {
    line1: "探索未知，",
    line2: "创造可能。",
  },
  subheadline:
    "在医学与 AI 的交汇处，构建信息桥梁，用内容连接世界，用技术改变未来。",
  bio: "临床医学背景，关注 AI 如何提升医疗信息处理与全球知识传播。专注于构建 AI 工作流、内容系统与数字化解决方案，连接知识、AI、医学与创造力。",
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

export const featuredProjects = [
  {
    id: "workspace",
    title: "MagicYStudio Workspace",
    description: "个人 AI 工作台，集成 Prompt 管理、自动化流程与知识库。",
    tags: ["Next.js", "AI", "Full-Stack"],
    image: "/workspace.png",
    href: "/works/workspace",
  },
  {
    id: "geo-content",
    title: "GEO Content System",
    description: "基于 AI 的地理内容生成系统，自动化多语言内容生产。",
    tags: ["AI Agent", "Automation", "Content"],
    image: "/geo.png",
    href: "/works/geo-content",
  },
  {
    id: "dify-pipeline",
    title: "Dify Automation Pipeline",
    description: "基于 Dify 平台的自动化工作流管道，连接多模型与外部服务。",
    tags: ["Dify", "Workflow", "Integration"],
    image: "/dify2.png",
    href: "/works/dify-pipeline",
  },
];

export const heroProjects = [
  {
    id: "workspace",
    title: "MagicYStudio Workspace",
    description: "AI 驱动的个人工作台，一站式管理 Prompt、工作流与项目。",
    tag: "即将发布",
    image: "/workspace.png",
    href: "/works/workspace",
  },
  {
    id: "ai-medical",
    title: "AI Medical Workflow",
    description: "医学 AI 工作流系统，结合临床知识图谱与自动化推理。",
    tag: "开发中",
    image: "/aimedicalworkflow.png",
    href: "/works/ai-medical",
  },
];

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
