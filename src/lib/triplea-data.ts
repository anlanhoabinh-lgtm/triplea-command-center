import {
  Bot,
  Braces,
  Bell,
  Cog,
  FileText,
  Globe,
  Home,
  Image as ImageIcon,
  Mail,
  MessageSquare,
  Search,
  Sparkle,
  Users,
  Workflow,
  Wrench,
  Brain,
  type LucideIcon,
} from "lucide-react";

export type NavItem = { label: string; icon: LucideIcon; badge?: string };

export const navItems: NavItem[] = [
  { label: "Home", icon: Home },
  { label: "Chat", icon: MessageSquare, badge: "3" },
  { label: "Memory", icon: Brain },
  { label: "Documents", icon: FileText },
  { label: "Tools", icon: Wrench },
  { label: "Automations", icon: Workflow },
  { label: "Browser", icon: Globe },
  { label: "Settings", icon: Cog },
];

export type RunningTask = {
  name: string;
  agent: string;
  progress: number;
  state: "running" | "complete";
  tone: "cyan" | "violet" | "lime";
};

export const runningTasks: RunningTask[] = [
  { name: "Web Scraping", agent: "TripleA", progress: 78, state: "running", tone: "cyan" },
  { name: "Code Generation", agent: "TripleA", progress: 100, state: "complete", tone: "lime" },
  { name: "Image Rendering", agent: "TripleA", progress: 42, state: "running", tone: "violet" },
];

export type CommandAction = { label: string; icon: LucideIcon };

export const commandActions: CommandAction[] = [
  { label: "Build Website", icon: Braces },
  { label: "Find Leads", icon: Users },
  { label: "Write Code", icon: Sparkle },
  { label: "Generate Image", icon: ImageIcon },
  { label: "Read Email", icon: Mail },
  { label: "Open Browser", icon: Search },
];

export type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  author: string;
  text: string;
  attachment?: string;
};

export const initialMessages: ChatMessage[] = [
  {
    id: "m1",
    role: "assistant",
    author: "TripleA",
    text: "I can analyze your dataset and generate insights. Please provide the data source (CSV/JSON) and specify what you'd like to extract (trends, correlations, outliers).",
  },
  {
    id: "m2",
    role: "user",
    author: "You",
    text: "Analyze the quarterly sales CSV attached. Find the top 3 regions by revenue and highlight any seasonal patterns.",
    attachment: "Quarterly sales CSV • 128k rows",
  },
  {
    id: "m3",
    role: "assistant",
    author: "TripleA",
    text: "Top 3 regions: North America (+18%), EMEA (+12%), APAC (+9%). Seasonal spike detected in Q4 (holiday season). Recommendation: increase inventory in NA by 15% for Q4.",
  },
];

export type Telemetry = { label: string; value: string; percent?: number };

export const telemetry: Telemetry[] = [
  { label: "CPU", value: "62%", percent: 62 },
  { label: "Memory", value: "34%", percent: 34 },
  { label: "Latency", value: "12ms" },
  { label: "VRAM", value: "2.4GB / 8GB", percent: 30 },
];

export type Notification = { title: string; detail: string; icon: LucideIcon; tone: string };

export const notifications: Notification[] = [
  {
    title: "Code generation complete",
    detail: "Output saved to /projects/website",
    icon: Braces,
    tone: "text-lime",
  },
  { title: "New dataset uploaded", detail: "Quarterly sales CSV", icon: FileText, tone: "text-cyan" },
  {
    title: "System update available",
    detail: "v4.3 • Performance + stability",
    icon: Bell,
    tone: "text-amber",
  },
  { title: "System ready", detail: "TripleA v4.2 • Core online", icon: Bot, tone: "text-violet" },
];
