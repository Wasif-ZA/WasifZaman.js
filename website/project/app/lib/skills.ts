export type SkillGroup = {
  label: string;
  items: { name: string; note: string }[];
};

export const SKILLS: SkillGroup[] = [
  {
    label: "Languages",
    items: [
      { name: "TypeScript", note: "4 yrs · daily driver" },
      { name: "JavaScript", note: "5 yrs · browser & node" },
      { name: "Python", note: "3 yrs · ML, scripting" },
      { name: "Java", note: "3 yrs · uni + embedded" },
      { name: "C / C++", note: "2 yrs · ESP32, firmware" },
      { name: "SQL", note: "3 yrs · postgres mostly" },
    ],
  },
  {
    label: "Frameworks",
    items: [
      { name: "Next.js", note: "App Router, RSC, edge" },
      { name: "React", note: "Hooks-first, 19" },
      { name: "Tailwind", note: "utility-first, v4" },
      { name: "Framer Motion", note: "micro-interactions" },
      { name: "Prisma", note: "typed DB layer" },
      { name: "Node.js", note: "runtime + workers" },
    ],
  },
  {
    label: "Infra",
    items: [
      { name: "Supabase", note: "auth + postgres + storage" },
      { name: "PostgreSQL", note: "schema design" },
      { name: "Redis", note: "BullMQ queues" },
      { name: "Docker", note: "containerised builds" },
      { name: "Vercel", note: "prod hosting" },
      { name: "GitHub Actions", note: "CI + release" },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Claude API", note: "agent workflows" },
      { name: "Stripe", note: "billing + webhooks" },
      { name: "Figma", note: "design handoff" },
      { name: "Git", note: "worktrees, rebase" },
      { name: "ESP32 / Arduino", note: "hardware prototyping" },
      { name: "Resend", note: "transactional mail" },
    ],
  },
];
