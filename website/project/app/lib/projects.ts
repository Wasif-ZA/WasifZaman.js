export type ProjectStatus = "shipped" | "in-progress" | "archived";
export type ProjectAccess = "public" | "private";
export type ProjectCategory = "Web" | "AI" | "Embedded" | "Internal Tools";
export type ProjectAccent = "primary" | "secondary" | "accent";

export type ProjectLinks = {
  live?: string;
  repo?: string;
  preview?: string;
  caseStudy?: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  category: ProjectCategory;
  featured: boolean;
  year: number;
  status: ProjectStatus;
  access: ProjectAccess;
  links: ProjectLinks;
  imgSrc?: string;
  accent: ProjectAccent;
};

export const PROJECTS: Project[] = [
  {
    slug: "korvo",
    title: "Korvo",
    tagline: "AI-powered job outreach SaaS",
    description:
      "Automates personalised recruiter outreach end-to-end. Parses your CV, ranks roles against a vector profile, drafts tailored messages with Claude, and queues send schedules through a BullMQ worker. Stripe billing, Supabase auth, Prisma schema — private beta.",
    tech: [
      "Next.js 14",
      "TypeScript",
      "Supabase",
      "Prisma",
      "Claude API",
      "BullMQ",
      "Redis",
      "Stripe",
    ],
    category: "AI",
    featured: true,
    year: 2026,
    status: "in-progress",
    access: "private",
    links: {
      repo: "https://github.com/Wasif-ZA/Korvo",
    },
    imgSrc: "/projects/korvo.svg",
    accent: "primary",
  },
  {
    slug: "autodocs",
    title: "AutoDocs",
    tagline: "AST → LLM documentation pipeline",
    description:
      "Generates high-signal markdown docs from TypeScript and TSX source files using AST extraction plus schema-validated LLM output. Incremental changed-file detection via content hashing, token-aware chunking, GitHub Actions CI, Docker-ready.",
    tech: [
      "TypeScript",
      "Node.js",
      "Docker",
      "OpenAI",
      "GitHub Actions",
      "AST",
    ],
    category: "AI",
    featured: true,
    year: 2026,
    status: "shipped",
    access: "public",
    links: {
      repo: "https://github.com/Wasif-ZA/AutoDocs",
    },
    imgSrc: "/projects/autodocs.svg",
    accent: "accent",
  },
  {
    slug: "bridge-opening",
    title: "Bridge Opening System",
    tagline: "Full-stack IoT bridge control",
    description:
      "Operator console for a model opening bridge with safety-minded UI interlocks, command logging with round-trip timing, and a connectivity heartbeat. Next.js operator UI fronts an API proxy that hides device URLs; ESP32 gateway + Arduino actuator firmware handles actuation.",
    tech: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "ESP32",
      "Arduino",
      "UDP",
    ],
    category: "Embedded",
    featured: true,
    year: 2026,
    status: "shipped",
    access: "public",
    links: {
      live: "https://bridge-opening-project.vercel.app",
      repo: "https://github.com/Wasif-ZA/BridgeOpeningProject",
    },
    imgSrc: "/projects/bridge-opening.svg",
    accent: "secondary",
  },
  {
    slug: "blade-runner",
    title: "BladeRunner",
    tagline: "Carriage control prototype",
    description:
      "End-to-end carriage control demo that ties a Next.js ops UI, a Java-based carriage control processor, and ESP32 firmware together over UDP. Includes a state manager, encoded JSON command protocol, and engineering decision notes under /docs.",
    tech: ["Next.js 16", "Java", "ESP32", "UDP", "Tailwind"],
    category: "Embedded",
    featured: false,
    year: 2026,
    status: "shipped",
    access: "public",
    links: {
      live: "https://blade-runner-flax.vercel.app",
      repo: "https://github.com/Wasif-ZA/BladeRunner",
    },
    imgSrc: "/projects/blade-runner.svg",
    accent: "primary",
  },
  {
    slug: "decision-log",
    title: "DecisionLog",
    tagline: "ADR-style decision capture",
    description:
      "Personal tool for logging product and engineering decisions in an ADR-style format — designed for fast entry, clean reads, and future automation hooks. Typed schema, keyboard-first UX.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    category: "Internal Tools",
    featured: false,
    year: 2026,
    status: "in-progress",
    access: "public",
    links: {
      repo: "https://github.com/Wasif-ZA/decision.log",
    },
    imgSrc: "/projects/decision-log.svg",
    accent: "accent",
  },
  {
    slug: "utsbdsoc-election",
    title: "UTSBDSOC Election System",
    tagline: "Secure online voting for ~300 members",
    description:
      "Committee election platform for UTSBDSOC. Members authenticate through the society website, receive a one-time ballot token, and cast votes through a tamper-audit-logged interface. Private org repo — access on request.",
    tech: ["Next.js", "Supabase", "Postgres", "Auth"],
    category: "Internal Tools",
    featured: false,
    year: 2025,
    status: "shipped",
    access: "private",
    links: {},
    imgSrc: "/projects/utsbdsoc-election.svg",
    accent: "secondary",
  },
  {
    slug: "utsbdsoc-events",
    title: "UTSBDSOC Event Dashboard",
    tagline: "Internal event ops",
    description:
      "Internal dashboard for running society events: attendee check-in, Discord webhook notifications, Resend transactional mail, and an admin view over Supabase. Private org repo — access on request.",
    tech: ["Next.js", "Supabase", "Prisma", "Resend", "Discord Webhooks"],
    category: "Internal Tools",
    featured: false,
    year: 2025,
    status: "shipped",
    access: "private",
    links: {},
    imgSrc: "/projects/utsbdsoc-events.svg",
    accent: "primary",
  },
  {
    slug: "scms",
    title: "SCMS (TechMqSoc)",
    tagline: "Smart campus management society",
    description:
      "Multidisciplinary society project building campus tooling — room booking, attendance, and finance modules. I led the frontend direction and reusable component baseline.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    category: "Web",
    featured: false,
    year: 2025,
    status: "archived",
    access: "public",
    links: {
      repo: "https://github.com/Wasif-ZA/TechMqsoc",
    },
    imgSrc: "/projects/scms.svg",
    accent: "secondary",
  },
  {
    slug: "refillable",
    title: "Refillable",
    tagline: "RFID reusable-cup loyalty",
    description:
      "Sustainability web app tracking reusable coffee cups via RFID. Users sign up, track their subscription, scan cups into their account, and accrue loyalty points — nudging the switch away from disposable cups.",
    tech: ["Next.js", "TypeScript", "RFID"],
    category: "Web",
    featured: false,
    year: 2024,
    status: "archived",
    access: "public",
    links: {
      repo: "https://github.com/Wasif-ZA/Refillable",
    },
    imgSrc: "/projects/refillable.svg",
    accent: "accent",
  },
];

export const PROJECT_CATEGORIES: ("All" | ProjectCategory)[] = [
  "All",
  "Web",
  "AI",
  "Embedded",
  "Internal Tools",
];

export function getSortedProjects(): Project[] {
  return [...PROJECTS].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.year - a.year;
  });
}
