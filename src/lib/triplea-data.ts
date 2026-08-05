import {
  Bot,
  Braces,
  Bell,
  Cog,
  FileText,
  Github,
  Globe,
  HardDrive,
  Home,
  Image as ImageIcon,
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  MessageCircle,
  MessageSquare,
  Mic,
  Rocket,
  Search,
  Sparkle,
  Users,
  Workflow,
  Database,
  Brain,
  FolderKanban,
  Triangle,
  AudioLines,
  type LucideIcon,
} from "lucide-react";

export type NavItem = { label: string; icon: LucideIcon; to: string; badge?: string };

export const navItems: NavItem[] = [
  { label: "Home", icon: Home, to: "/" },
  { label: "AI Chat", icon: MessageSquare, to: "/chat", badge: "3" },
  { label: "Website Builder", icon: Braces, to: "/builder" },
  { label: "Lead Finder", icon: Users, to: "/leads" },
  { label: "Automations", icon: Workflow, to: "/automations" },
  { label: "Projects", icon: FolderKanban, to: "/projects" },
  { label: "Memory", icon: Brain, to: "/memory" },
  { label: "Browser", icon: Globe, to: "/browser" },
  { label: "Voice Assistant", icon: Mic, to: "/voice" },
  { label: "Integrations", icon: Cog, to: "/integrations" },
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

export type CommandAction = { label: string; icon: LucideIcon; to: string };

export const commandActions: CommandAction[] = [
  { label: "Build Website", icon: Braces, to: "/builder" },
  { label: "Find Leads", icon: Users, to: "/leads" },
  { label: "Write Code", icon: Sparkle, to: "/chat" },
  { label: "Generate Image", icon: ImageIcon, to: "/chat" },
  { label: "Automate Task", icon: Workflow, to: "/automations" },
  { label: "Open Browser", icon: Search, to: "/browser" },
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

/* ---------------------------------- Chat ---------------------------------- */

export type Conversation = {
  id: string;
  title: string;
  preview: string;
  updated: string;
  pinned?: boolean;
};

export const conversations: Conversation[] = [
  {
    id: "c1",
    title: "Sales data analysis",
    preview: "Top 3 regions by revenue + seasonality",
    updated: "2m ago",
    pinned: true,
  },
  {
    id: "c2",
    title: "Landing page for Lumen Dental",
    preview: "Hero, pricing, booking form",
    updated: "1h ago",
  },
  { id: "c3", title: "Cold email sequence", preview: "5-step sequence for gym owners", updated: "3h ago" },
  { id: "c4", title: "Competitor research — Lagos", preview: "12 agencies compared", updated: "Yesterday" },
  { id: "c5", title: "Brand voice guidelines", preview: "Tone, vocabulary, do/don't", updated: "2d ago" },
  { id: "c6", title: "Stripe webhook debugging", preview: "Signature verification failing", updated: "4d ago" },
];

export const chatSuggestions: string[] = [
  "Build a landing page for my agency",
  "Find 50 dentists in Lagos with emails",
  "Summarize this article and extract stats",
  "Draft a 5-step outreach sequence",
];

/* ------------------------------ Website builder ---------------------------- */

export type GeneratedSite = {
  id: string;
  name: string;
  prompt: string;
  status: "draft" | "preview" | "published";
  pages: number;
  updated: string;
  stack: string;
};

export const generatedSites: GeneratedSite[] = [
  {
    id: "s1",
    name: "Lumen Dental",
    prompt: "Modern dental clinic site with booking and pricing",
    status: "published",
    pages: 6,
    updated: "12m ago",
    stack: "React • Tailwind",
  },
  {
    id: "s2",
    name: "NorthPeak Fitness",
    prompt: "Bold gym landing page with membership tiers",
    status: "preview",
    pages: 4,
    updated: "2h ago",
    stack: "React • Tailwind",
  },
  {
    id: "s3",
    name: "Vela Coffee",
    prompt: "Warm coffee roastery store with shop grid",
    status: "draft",
    pages: 3,
    updated: "Yesterday",
    stack: "React • Tailwind",
  },
];

export const builderSteps: { label: string; detail: string }[] = [
  { label: "Describe", detail: "Tell TripleA what you want to build" },
  { label: "Generate", detail: "Pages, copy and components are created" },
  { label: "Preview", detail: "Inspect responsive breakpoints live" },
  { label: "Ship", detail: "Export code, push to GitHub or deploy" },
];

/* -------------------------------- Lead finder ------------------------------ */

export type Lead = {
  id: string;
  business: string;
  niche: string;
  location: string;
  website?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  facebook?: boolean;
  instagram?: boolean;
  linkedin?: boolean;
  score: number;
};

export const leads: Lead[] = [
  {
    id: "l1",
    business: "Lumen Dental Clinic",
    niche: "Dentists",
    location: "Lagos, NG",
    website: "lumendental.ng",
    email: "hello@lumendental.ng",
    phone: "+234 812 555 0143",
    whatsapp: "+234 812 555 0143",
    facebook: true,
    instagram: true,
    linkedin: true,
    score: 92,
  },
  {
    id: "l2",
    business: "NorthPeak Fitness",
    niche: "Gyms",
    location: "Abuja, NG",
    website: "northpeak.fit",
    email: "team@northpeak.fit",
    phone: "+234 809 221 7745",
    instagram: true,
    facebook: true,
    score: 87,
  },
  {
    id: "l3",
    business: "Bright Path Academy",
    niche: "Schools",
    location: "Accra, GH",
    website: "brightpath.edu.gh",
    email: "admin@brightpath.edu.gh",
    phone: "+233 24 118 9032",
    whatsapp: "+233 24 118 9032",
    linkedin: true,
    score: 81,
  },
  {
    id: "l4",
    business: "Vela Coffee Roasters",
    niche: "Cafes",
    location: "Nairobi, KE",
    website: "velacoffee.co.ke",
    email: "orders@velacoffee.co.ke",
    instagram: true,
    score: 74,
  },
  {
    id: "l5",
    business: "Skyline Realty Partners",
    niche: "Real estate",
    location: "Lagos, NG",
    website: "skylinerealty.ng",
    phone: "+234 701 664 2210",
    whatsapp: "+234 701 664 2210",
    linkedin: true,
    facebook: true,
    score: 89,
  },
  {
    id: "l6",
    business: "Harmony Dental Studio",
    niche: "Dentists",
    location: "Ibadan, NG",
    email: "care@harmonydental.ng",
    phone: "+234 703 900 1188",
    facebook: true,
    score: 68,
  },
  {
    id: "l7",
    business: "Iron Forge Gym",
    niche: "Gyms",
    location: "Lagos, NG",
    website: "ironforge.ng",
    email: "info@ironforge.ng",
    whatsapp: "+234 815 220 7710",
    instagram: true,
    score: 78,
  },
  {
    id: "l8",
    business: "Crestwood Law Group",
    niche: "Lawyers",
    location: "Accra, GH",
    website: "crestwoodlaw.gh",
    email: "contact@crestwoodlaw.gh",
    linkedin: true,
    score: 84,
  },
];

export const leadChannels: { key: keyof Lead; label: string; icon: LucideIcon }[] = [
  { key: "website", label: "Website", icon: Globe },
  { key: "email", label: "Email", icon: Mail },
  { key: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { key: "facebook", label: "Facebook", icon: Facebook },
  { key: "instagram", label: "Instagram", icon: Instagram },
  { key: "linkedin", label: "LinkedIn", icon: Linkedin },
];

/* -------------------------------- Automations ------------------------------ */

export type Automation = {
  id: string;
  name: string;
  trigger: string;
  action: string;
  cadence: string;
  lastRun: string;
  nextRun: string;
  active: boolean;
  runs: number;
};

export const automations: Automation[] = [
  {
    id: "a1",
    name: "Daily lead harvest",
    trigger: "Every day at 07:00",
    action: "Find 25 new dentists in Lagos → enrich → export CSV",
    cadence: "Daily",
    lastRun: "Today, 07:00",
    nextRun: "Tomorrow, 07:00",
    active: true,
    runs: 148,
  },
  {
    id: "a2",
    name: "Weekly competitor digest",
    trigger: "Mondays at 09:00",
    action: "Browse 10 competitor sites → summarize changes",
    cadence: "Weekly",
    lastRun: "Mon, 09:00",
    nextRun: "Mon, 09:00",
    active: true,
    runs: 22,
  },
  {
    id: "a3",
    name: "Site health sweep",
    trigger: "Every 6 hours",
    action: "Check published sites for broken links + Lighthouse",
    cadence: "Interval",
    lastRun: "3h ago",
    nextRun: "In 3h",
    active: false,
    runs: 412,
  },
  {
    id: "a4",
    name: "Outreach follow-up drafts",
    trigger: "Weekdays at 16:00",
    action: "Draft follow-ups for leads with no reply in 3 days",
    cadence: "Weekdays",
    lastRun: "Yesterday, 16:00",
    nextRun: "Today, 16:00",
    active: true,
    runs: 63,
  },
];

export type JobRun = { id: string; name: string; status: "queued" | "running" | "done" | "failed"; duration: string; when: string };

export const jobRuns: JobRun[] = [
  { id: "j1", name: "Daily lead harvest", status: "running", duration: "00:42", when: "Now" },
  { id: "j2", name: "Vela Coffee — build pages", status: "queued", duration: "—", when: "Queued" },
  { id: "j3", name: "Weekly competitor digest", status: "done", duration: "03:18", when: "2h ago" },
  { id: "j4", name: "Site health sweep", status: "failed", duration: "00:09", when: "3h ago" },
  { id: "j5", name: "Outreach follow-up drafts", status: "done", duration: "01:05", when: "Yesterday" },
];

/* --------------------------------- Projects -------------------------------- */

export type ProjectFolder = { id: string; name: string; items: number; kind: "sites" | "chats" | "mixed" };

export const projectFolders: ProjectFolder[] = [
  { id: "f1", name: "Client websites", items: 8, kind: "sites" },
  { id: "f2", name: "Lead campaigns", items: 5, kind: "mixed" },
  { id: "f3", name: "Research threads", items: 14, kind: "chats" },
  { id: "f4", name: "Personal experiments", items: 6, kind: "mixed" },
];

export type ProjectItem = {
  id: string;
  name: string;
  type: "website" | "conversation" | "lead list";
  folder: string;
  updated: string;
};

export const projectItems: ProjectItem[] = [
  { id: "p1", name: "Lumen Dental", type: "website", folder: "Client websites", updated: "12m ago" },
  { id: "p2", name: "Sales data analysis", type: "conversation", folder: "Research threads", updated: "2m ago" },
  { id: "p3", name: "Lagos dentists — 240 leads", type: "lead list", folder: "Lead campaigns", updated: "1h ago" },
  { id: "p4", name: "NorthPeak Fitness", type: "website", folder: "Client websites", updated: "2h ago" },
  { id: "p5", name: "Brand voice guidelines", type: "conversation", folder: "Personal experiments", updated: "2d ago" },
  { id: "p6", name: "Vela Coffee", type: "website", folder: "Personal experiments", updated: "Yesterday" },
];

/* ---------------------------------- Memory --------------------------------- */

export type MemoryEntry = {
  id: string;
  label: string;
  value: string;
  category: "Preference" | "Project" | "Person" | "Fact";
  source: string;
};

export const memoryEntries: MemoryEntry[] = [
  {
    id: "me1",
    label: "Preferred tone",
    value: "Direct, confident, no filler. Short paragraphs.",
    category: "Preference",
    source: "Brand voice guidelines",
  },
  {
    id: "me2",
    label: "Design taste",
    value: "Dark futuristic glassmorphism, cyan + violet accents.",
    category: "Preference",
    source: "Website builder sessions",
  },
  {
    id: "me3",
    label: "Primary market",
    value: "Small businesses in Lagos, Abuja, Accra and Nairobi.",
    category: "Fact",
    source: "Lead Finder searches",
  },
  {
    id: "me4",
    label: "Active client",
    value: "Lumen Dental — booking flow is the top priority.",
    category: "Project",
    source: "Lumen Dental thread",
  },
  {
    id: "me5",
    label: "Preferred stack",
    value: "React, TypeScript, Tailwind, deploy to Netlify.",
    category: "Preference",
    source: "Builder exports",
  },
  {
    id: "me6",
    label: "Collaborator",
    value: "Ada handles copywriting reviews before publishing.",
    category: "Person",
    source: "Chat mentions",
  },
];

/* --------------------------------- Browser --------------------------------- */

export type BrowsePage = {
  id: string;
  url: string;
  title: string;
  summary: string;
  extracted: string[];
  visited: string;
};

export const browsePages: BrowsePage[] = [
  {
    id: "b1",
    url: "https://competitor-agency.com/pricing",
    title: "Competitor Agency — Pricing",
    summary:
      "Three tiers from $499 to $2,900/mo. Website builds bundled with SEO retainers. No free tier; 14-day pilot instead.",
    extracted: ["Starter $499", "Growth $1,200", "Scale $2,900", "14-day pilot"],
    visited: "8m ago",
  },
  {
    id: "b2",
    url: "https://industryreport.io/ai-tools-2026",
    title: "State of AI Tools 2026",
    summary:
      "AI site builders grew 3.4x YoY. Buyers rank export/ownership of code as the #1 purchase factor, ahead of price.",
    extracted: ["3.4x YoY growth", "Code ownership #1", "62% want voice control"],
    visited: "1h ago",
  },
  {
    id: "b3",
    url: "https://lumendental.ng",
    title: "Lumen Dental — Home",
    summary:
      "Live client site. Booking CTA above the fold, 6 pages indexed, contact email and WhatsApp both exposed.",
    extracted: ["hello@lumendental.ng", "+234 812 555 0143", "6 pages"],
    visited: "Yesterday",
  },
];

/* ---------------------------------- Voice ---------------------------------- */

export type VoiceOption = { id: string; name: string; style: string; accent: string };

export const voiceOptions: VoiceOption[] = [
  { id: "v1", name: "Nova", style: "Warm • conversational", accent: "American" },
  { id: "v2", name: "Atlas", style: "Deep • authoritative", accent: "British" },
  { id: "v3", name: "Zara", style: "Bright • energetic", accent: "Nigerian" },
  { id: "v4", name: "Kai", style: "Calm • narration", accent: "Neutral" },
];

export const voiceCommands: string[] = [
  "“TripleA, build a landing page for a dental clinic.”",
  "“Find 30 gyms in Abuja with WhatsApp numbers.”",
  "“Summarize the last page I browsed.”",
  "“Run the daily lead harvest now.”",
];

/* ------------------------------- Integrations ------------------------------ */

export type Integration = {
  id: string;
  name: string;
  category: string;
  detail: string;
  icon: LucideIcon;
  status: "planned" | "beta";
};

export const integrations: Integration[] = [
  { id: "i1", name: "GitHub", category: "Code", detail: "Push generated sites to a repo and sync commits.", icon: Github, status: "beta" },
  { id: "i2", name: "Supabase", category: "Backend", detail: "Auth, database and storage for generated apps.", icon: Database, status: "beta" },
  { id: "i3", name: "ElevenLabs", category: "Voice", detail: "Realtime voice conversations and narration.", icon: AudioLines, status: "beta" },
  { id: "i4", name: "Gmail", category: "Outreach", detail: "Send and track lead outreach from your inbox.", icon: Mail, status: "planned" },
  { id: "i5", name: "WhatsApp", category: "Outreach", detail: "Message leads and receive replies in-app.", icon: MessageCircle, status: "planned" },
  { id: "i6", name: "Google Drive", category: "Files", detail: "Import assets and export lead exports.", icon: HardDrive, status: "planned" },
  { id: "i7", name: "Netlify", category: "Deploy", detail: "One-click deploys with instant preview URLs.", icon: Rocket, status: "planned" },
  { id: "i8", name: "Vercel", category: "Deploy", detail: "Production hosting with edge previews.", icon: Triangle, status: "planned" },
];
