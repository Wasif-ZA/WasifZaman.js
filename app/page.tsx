"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useReducedMotion,
  MotionConfig,
  AnimatePresence,
  type Variants,
} from "framer-motion";

// --- COMPONENTS ---
import Navbar from "./components/navbar";
import NeoButton from "./components/NeoButton";
import NeoCard from "./components/NeoCard";
import Marquee from "./components/Marquee";
import ArchDiagram from "./components/ArchDiagram";

const ProjectModal = dynamic(
  () => import("./components/ProjectModal").then((m) => m.ProjectModal),
  { ssr: false }
);

import {
  ArrowRight,
  Download,
  Mail,
  Linkedin,
  Github,
  Globe,
  Database,
  Cpu,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

/* =========================
   TYPES
========================= */
// A stage is one node, or an array of nodes that run in parallel.
type ArchStage = string | string[];

type ArchSpec = {
  stages: ArchStage[];
  note?: string;
};

type Project = {
  title: string;
  blurb: string;
  tech: string[];
  description: string;

  imgSrc?: string;
  imgNote?: string;   // caption stating what the screenshot actually is
  arch?: ArchSpec;    // drawn instead of a screenshot when there is no UI

  projectLink?: string; // live site (best)
  code?: string;        // repo link
  altCode?: string;     // second repo, when the work spans two
  altCodeLabel?: string;

  previewUrl?: string;
  previewMode?: "iframe" | "none";
};

type Experience = {
  company: string;
  fullName: string;
  role: string;
  period: string;
  location: string;
  color: string;
  points: string[];
  techStack?: string[];
};

type Service = {
  title: string;
  icon: React.ElementType;
  desc: string;
};

type EducationItem = {
  institution: string;
  degree: string;
  period: string;
  details: string;
};

type CertItem = {
  name: string;
  issuer: string;
  date?: string;
  details: string;
};

/* =========================
   LINKS
========================= */
const LINKS = {
  email: "wasif.zaman1@gmail.com",
  github: "https://github.com/Wasif-ZA",
  linkedin: "https://www.linkedin.com/in/wasif-zaman-4228b5245/",
  resume: "/resume.pdf",
};

/* =========================
   PREVIEW HELPERS
========================= */
function resolvePreview(project: Project) {
  if (project.previewMode === "none") return null;
  if (project.previewUrl) return project.previewUrl;
  if (project.projectLink) return project.projectLink;
  return null;
}

/* =========================
   DATA

   Every claim below is checked against resume.pdf. Every URL returned 200 when
   last verified; repo links are never inferred from a project name.
========================= */
const FOCUS_AREAS: Service[] = [
  {
    title: "Backend & Data Pipelines",
    icon: Database,
    desc: "Python on Azure Functions rendering participant PDF reports from longitudinal survey data, where thousands have to come out correct without a human checking each one.",
  },
  {
    title: "Full-Stack Product",
    icon: Globe,
    desc: "Next.js and TypeScript on Supabase and Prisma. Row-level security, queue-backed jobs and OAuth, shipped to real users rather than to a demo.",
  },
  {
    title: "Systems & Embedded",
    icon: Cpu,
    desc: "C++20 bin-packing and real-time ESP32 control logic, both built against a written contract other teams could work from before the code existed.",
  },
];

// Each line is a fact a reader can go and check, not a self-description.
const HERO_PROOF = [
  "C++20 3D bin-packing solver",
  "Awards voting platform, ~300 members",
  "4-agent BullMQ pipeline",
  "Real-time ESP32 control",
];

const TOOLBOX = [
  "TypeScript",
  "Python",
  "C++20",
  "Java",
  "SQL",
  "React",
  "Next.js",
  "Node.js",
  "three.js",
  "Tailwind",
  "Prisma",
  "PostgreSQL",
  "Supabase",
  "Azure Functions",
  "Redis",
  "Docker",
  "GitHub Actions",
];

const PROJECTS: Project[] = [
  {
    title: "DynamicFit",
    blurb: "3D bin-packing solver with a browser visualiser",
    tech: ["C++20", "three.js", "JSON Schema", "React", "Python"],
    description:
      "Three-dimensional bin packing, an NP-hard problem, solved in C++20 and handed back as a real-time three.js scene. I designed the JSON-Schema contract two other teams built against before the solver existed, then pinned it with 11 render fixtures over 7 invariants so a solver change cannot silently break the 3D view.",
    imgSrc: "/projects/dynamicfit.jpg",
    imgNote: "Real solver output: a 250-item order packed into 11 cartons.",
    code: "https://github.com/Wasif-ZA/dynamic-fit",
    altCode: "https://github.com/Wasif-ZA/DynamicSolver",
    altCodeLabel: "Solver",
    previewMode: "none",
  },

  {
    title: "Korvo",
    blurb: "Agentic job-outreach platform",
    tech: ["Next.js", "TypeScript", "Supabase", "Claude API", "BullMQ", "Redis", "Stripe"],
    description:
      "Four Claude agents run as a BullMQ DAG: a contact finder, an email guesser and a research agent feed a drafter, with the two middle agents in parallel before the drafter consolidates their output. Row-level security for per-user data isolation, Stripe subscriptions, and Gmail OAuth so paying users send from their own inbox.",
    arch: {
      stages: ["Contact Finder", ["Email Guesser", "Research Agent"], "Drafter", "Gmail Send"],
      note: "BullMQ DAG on Redis · 4 Claude agents",
    },
    code: "https://github.com/Wasif-ZA/Korvo",
    previewMode: "none",
  },

  {
    title: "UTSBDSOC Platform",
    blurb: "Society site and the Graamys awards voting flow",
    tech: ["Next.js", "TypeScript", "Supabase", "Prisma", "Headless CMS"],
    description:
      "The society website and internal tooling for roughly 300 members. Shipped the Graamys awards platform end to end in a two-week sprint: nine categories, a voting flow with duplicate-vote prevention, and an audit trail the committee reviews after each cycle. A headless CMS lets non-technical committee members publish updates without a developer in the loop.",
    imgSrc: "/projects/utsbdsoc.jpg",
    imgNote: "The live site. The Graamys voting entry point sits top right.",
    projectLink: "https://utbdsoc-website.vercel.app/home",
    code: "https://github.com/UTBDSOC/UTBDSOC-website",
    previewMode: "iframe",
  },

  {
    title: "Bridge Opening System",
    blurb: "Engineering capstone, scale-model drawbridge",
    tech: ["C++", "ESP32", "Arduino", "Next.js", "Real-time control"],
    description:
      "Control logic coordinating six sensors and four actuators across two microcontrollers, polling sensors and driving motors in real time. Built the safety layer: collision detection, positional limit enforcement, weight-based load sensing and an emergency stop, all inside the real-time response budget. Owned the whole software side alongside mechanical and electrical engineering students.",
    imgSrc: "/projects/bridge-opening.jpg",
    imgNote: "The live console. Next.js edge API to ESP32 gateway to Arduino.",
    projectLink: "https://bridge-opening-project.vercel.app",
    code: "https://github.com/Wasif-ZA/BridgeOpeningProject",
    previewMode: "iframe",
  },

  {
    title: "BladeRunner",
    blurb: "Distributed carriage control system",
    tech: ["Java", "Next.js", "ESP32-S3", "UDP / JSON"],
    description:
      "A distributed control system where a Java carriage control program drives ESP32-S3 hardware over a UDP/JSON protocol, coordinated by a master orchestrator and operated from a Next.js console.",
    imgSrc: "/projects/bladerunner.jpg",
    imgNote: "The live operator console and its control chain.",
    projectLink: "https://blade-runner-flax.vercel.app",
    code: "https://github.com/Wasif-ZA/BladeRunner",
    previewMode: "iframe",
  },

  {
    title: "AutoDocs",
    blurb: "AI documentation pipeline for TypeScript",
    tech: ["TypeScript", "AST analysis", "GitHub Actions", "Docker", "OpenAI API"],
    description:
      "A CI pipeline that parses TypeScript source into an AST, prompts a model from the structure it finds, and validates every response against a JSON schema before it lands, retrying when it does not. Incremental processing and token-aware chunking re-document only changed files per commit, which is what makes it cheap enough to run on every push.",
    arch: {
      stages: ["TS Source", "AST Parse", "Model Prompt", "Schema Check", "Commit Docs"],
      note: "Retries on schema failure · only changed files per commit",
    },
    code: "https://github.com/Wasif-ZA/AutoDocs",
    previewMode: "none",
  },

  {
    title: "DecisionLog",
    blurb: "Architecture decision record tracker",
    tech: ["Next.js", "TypeScript", "Supabase", "Prisma", "Tailwind"],
    description:
      "Full-stack tool for tracking architecture decisions with version history, stakeholder tagging and impact assessments, built for the problem of teams losing the reasoning when people rotate off. Full-text search with fuzzy matching and filters, so a past decision surfaces in seconds instead of an archaeology dig through old documents and chat threads.",
    arch: {
      stages: ["Decision", "Version History", "Stakeholder Tags", "Fuzzy Search"],
      note: "Postgres full-text search · Prisma on Supabase",
    },
    code: "https://github.com/Wasif-ZA/decision.log",
    previewMode: "none",
  },

  {
    title: "GearBoxStudio",
    blurb: "UI component library and design system",
    tech: ["Next.js", "TypeScript", "Supabase", "Prisma", "Tailwind"],
    description:
      "Base primitives and a layered component hierarchy, so a new page layout comes together without duplicating styles across the codebase. Supabase on the backend with Prisma on the data layer, OAuth for authentication, and real-time subscriptions so connected clients see changes without a manual refresh.",
    arch: {
      stages: ["Primitives", "Composites", "Layouts", "Realtime Sync"],
      note: "OAuth · Supabase realtime subscriptions",
    },
    code: "https://github.com/Wasif-ZA/Gearboxstudio",
    previewMode: "none",
  },
];

const EXPERIENCE: Experience[] = [
  {
    company: "ACU",
    fullName: "Australian Catholic University",
    role: "Research Software Engineer Intern",
    period: "Apr 2026 – Present",
    location: "Institute for Positive Psychology and Education, Sydney",
    color: "bg-neo-primary",
    points: [
      "Build and extend a Python service on Azure Functions that renders individual participant PDF reports from longitudinal survey data, where thousands must come out correct without a human checking each one.",
      "Set the requirements for a redesigned participant report with the research team, then put a mockup in front of them before writing code, so feedback landed while changes were still cheap.",
      "Drafting the software requirements and design specifications for the aggregate reporting track, so the build has a document to be checked against rather than a conversation to remember.",
      "Work under a research ethics protocol that keeps identifiable data off external services, and to a team rule that AI writes either the implementation or the tests but never both.",
    ],
    techStack: ["Python", "Azure Functions", "PDF Rendering", "Requirements"],
  },
  {
    company: "UTSBDSOC",
    fullName: "UTS Bangladeshi Society",
    role: "Technical Lead / IT Director",
    period: "May 2025 – Present",
    location: "Sydney",
    color: "bg-neo-secondary",
    points: [
      "Shipped the Graamys awards platform end to end in a two-week sprint: nine categories, a voting flow with duplicate-vote prevention, and an audit trail the committee reviews after each cycle.",
      "Own the society Next.js website and internal tooling for roughly 300 members, with a headless CMS so non-technical committee members publish event updates without a developer in the loop.",
      "Turn what the Events, Marketing and Creative teams ask for into scoped features, holding the line on scope so the codebase does not fill up with work nobody asked for.",
    ],
    techStack: ["Next.js", "TypeScript", "Supabase", "Prisma"],
  },
  {
    company: "Lenovo",
    fullName: "Lenovo",
    role: "Desktop Rollout Engineer",
    period: "Apr 2026 – Present",
    location: "Sydney",
    color: "bg-neo-accent",
    points: [
      "Deploy and configure enterprise desktop hardware on a client site in the Sydney CBD, scheduling rollouts with the service team so the business keeps running through the change.",
      "Provision workstations from standardised images and keep the asset inventory accurate across the client fleet, tracking every deployment and replacement.",
      "Triage hardware faults with the service coordinator and write up the resolutions, so the same fault costs the next technician minutes instead of an afternoon.",
    ],
    techStack: ["Imaging", "Asset Management", "Fault Triage"],
  },
  {
    company: "Optus",
    fullName: "Optus",
    role: "Sales Consultant",
    period: "Jul – Dec 2025",
    location: "Sydney",
    color: "bg-neo-primary",
    points: [
      "Sold Optus products and services by reviewing each customer existing account and combining current offers, plans and bundles into something that actually fit what they used.",
      "Grew accounts through consultative upsell and cross-sell on inbound interactions, consistently beating shift targets.",
    ],
    techStack: ["Consultative Sales", "CRM"],
  },
];

const EDUCATION: EducationItem[] = [
  {
    institution: "Macquarie University",
    degree: "Bachelor of Engineering (Honours), Software Engineering",
    period: "Feb 2022 – Jun 2027",
    details:
      "Degree conferred Sep 2027. Coursework: Data Structures & Algorithms, Distributed Systems, Operating Systems, Computer Networks, Database Systems, Object-Oriented Programming, Cloud Computing, Software Engineering Practices, Embedded Systems, Agile Project Management, Honours Research Thesis.",
  },
];

const CERTIFICATES: CertItem[] = [
  {
    name: "Data Analytics Professional Certificate",
    issuer: "Google",
    details: "Data cleaning, SQL fundamentals, dashboards, and analytics workflow.",
  },
  {
    name: "Cloud Computing",
    issuer: "IBM",
    details: "Cloud fundamentals, deployment concepts, and container basics.",
  },
  {
    name: "Programming with JavaScript",
    issuer: "Meta",
    details: "DOM basics, JSON, async patterns, and debugging fundamentals.",
  },
];

/* =========================
   ANIMATION VARIANTS
========================= */
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

/* =========================
   SUB-COMPONENTS
========================= */
const StaggeredText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const reduce = useReducedMotion();
  const chars = useMemo(
    () =>
      text.split("").map((char, i) => ({
        char,
        rot: ((i * 7) % 11) - 5,
      })),
    [text]
  );

  return (
    <span className={`inline-flex flex-wrap justify-center ${className || ""}`}>
      {chars.map(({ char, rot }, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          initial={reduce ? false : { y: "100%" }}
          animate={{ y: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.5, delay: i * 0.05, ease: "backOut" }}
          whileHover={
            reduce
              ? undefined
              : {
                  y: -15,
                  rotate: rot,
                  color: "#FF5D01",
                  scale: 1.08,
                  transition: { duration: 0.12 },
                }
          }
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

const CustomCursor = () => {
  const reduce = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) =>
      setMousePosition({ x: e.clientX, y: e.clientY });

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const hover =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        !!target.closest("a") ||
        !!target.closest("button");
      setIsHovering(hover);
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (reduce) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border-2 border-black bg-neo-primary pointer-events-none z-[100] hidden md:block mix-blend-difference"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 2.2 : 1,
        borderRadius: isHovering ? "50%" : "0%",
        rotate: isHovering ? 45 : 0,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    />
  );
};

const GrainOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[40] opacity-[0.045] mix-blend-overlay">
    <svg className="w-full h-full">
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="4"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  </div>
);

/* =========================
   PAGE
========================= */
export default function Home() {
  const reduceMotion = useReducedMotion();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((event.clientX - centerX) / 40);
    y.set((event.clientY - centerY) / 40);
  }

  const openModal = (project: Project) => {
    const preview = resolvePreview(project);
    setActiveProject({ ...project, previewUrl: preview || undefined });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setActiveProject(null), 180);
  };

  useEffect(() => {
    if (!modalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [modalOpen]);

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <MotionConfig reducedMotion="user">
    <main className="min-h-screen bg-neo-bg text-neo-text overflow-x-hidden selection:bg-black selection:text-white cursor-auto md:cursor-none">
      <CustomCursor />
      <Navbar />
      <GrainOverlay />

      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-neo-primary origin-left z-[90] border-b-2 border-black"
        style={{ scaleX }}
      />

      {/* --- HERO --- */}
      <section
        id="top"
        onMouseMove={handleMouseMove}
        className="relative flex min-h-screen flex-col justify-center border-b-[4px] border-black bg-white/50 pt-20 overflow-hidden"
      >
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 500]) }}
          className="absolute top-20 right-[5%] w-24 h-24 md:w-32 md:h-32 border-[4px] border-black bg-neo-secondary z-0 rotate-12 opacity-80"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -300]) }}
          className="absolute bottom-40 left-[5%] w-20 h-20 md:w-24 md:h-24 border-[4px] border-black bg-neo-accent rounded-full z-0 opacity-80"
        />

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <motion.div style={{ rotateX, rotateY, perspective: 1000 }} className="w-full max-w-5xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-6 bg-black px-4 py-2 transform -rotate-2 hover:rotate-0 transition-transform cursor-default border-2 border-transparent hover:border-neo-primary"
            >
              <span className="font-mono text-sm md:text-lg font-bold text-neo-primary animate-pulse">
                ● AVAILABLE FOR WORK
              </span>
            </motion.div>

            <div className="relative mb-8 flex flex-col items-center justify-center">
              <h1 className="text-[15vw] md:text-[10rem] font-black uppercase tracking-tight leading-[0.9] md:leading-[0.85] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] md:drop-shadow-[6px_6px_0px_rgba(0,0,0,1)] break-words select-none text-black">
                <div className="block">
                  <StaggeredText text="WASIF" />
                </div>
                <div className="block mt-2 md:mt-4">
                  <StaggeredText text="ZAMAN" />
                </div>
              </h1>
            </div>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="mx-auto mb-6 inline-block max-w-3xl border-[3px] border-black bg-white p-4 text-left font-mono text-base font-bold leading-snug shadow-neo md:p-6 md:text-center md:text-xl"
            >
              Software Engineering{" "}
              <span className="bg-neo-primary px-1 text-black">(Honours)</span> at Macquarie
              University, graduating 2027. Currently a research software engineer intern at{" "}
              <span className="bg-neo-primary px-1 text-black">ACU</span>, building the Python
              pipeline that renders participant reports from longitudinal survey data.
            </motion.p>

            <motion.ul
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="mx-auto mb-8 flex max-w-3xl flex-wrap justify-center gap-2"
            >
              {HERO_PROOF.map((p) => (
                <li
                  key={p}
                  className="border-2 border-black bg-neo-bg px-3 py-1.5 font-mono text-[11px] font-black uppercase tracking-tight md:text-xs"
                >
                  {p}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col justify-center gap-4 sm:flex-row"
            >
              <a href={LINKS.github} target="_blank" rel="noreferrer noopener" className="group w-full sm:w-auto">
                <NeoButton
                  variant="primary"
                  size="lg"
                  className="flex w-full items-center justify-center transition-all group-hover:-translate-y-1 group-hover:shadow-neo-lg"
                  as="span"
                >
                  <Github className="mr-2 h-5 w-5" /> View the code
                </NeoButton>
              </a>
              <a href={LINKS.resume} download className="group w-full sm:w-auto">
                <NeoButton
                  variant="base"
                  size="lg"
                  className="flex w-full items-center justify-center transition-all group-hover:-translate-y-1 group-hover:shadow-neo-lg"
                  as="span"
                >
                  <Download className="mr-2 h-5 w-5" /> CV / Resume
                </NeoButton>
              </a>
              <a href={`mailto:${LINKS.email}`} className="group w-full sm:w-auto">
                <NeoButton
                  variant="base"
                  size="lg"
                  className="flex w-full items-center justify-center transition-all group-hover:-translate-y-1 group-hover:shadow-neo-lg"
                  as="span"
                >
                  <Mail className="mr-2 h-5 w-5" /> Email
                </NeoButton>
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-24 right-4 md:right-10 flex flex-col items-center gap-2 z-20"
        >
          <span className="font-mono text-xs font-bold">SCROLL</span>
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
            transition={reduceMotion ? undefined : { repeat: Infinity, duration: 2 }}
            className="bg-black text-white p-2"
          >
            <ChevronDown />
          </motion.div>
        </motion.div>

        <div className="mt-auto border-t-[4px] border-black bg-neo-primary relative z-20">
          <Marquee
            text="C++20 • PYTHON • TYPESCRIPT • AZURE FUNCTIONS • THREE.JS • ESP32 • SUPABASE • "
            className="font-black text-xl py-3 text-black"
          />
        </div>
      </section>

      {/* --- FOCUS AREAS --- */}
      <section id="focus" className="py-20 border-b-[4px] border-black bg-white relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-end justify-between gap-6 mb-16"
          >
            <h2 className="text-5xl md:text-8xl font-black uppercase leading-none">What I Build</h2>
            <span className="hidden md:inline-block font-mono font-bold bg-black text-white px-3 py-2 border-2 border-black shadow-neo-sm">
              FOCUS
            </span>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {FOCUS_AREAS.map((s, i) => (
              <motion.div variants={fadeInUp} key={i}>
                <NeoCard className="h-full bg-neo-bg hover:bg-neo-primary transition-all duration-300 hover:-translate-y-2 group">
                  <div className="bg-black text-white w-14 h-14 flex items-center justify-center border-[3px] border-transparent mb-6 shadow-neo-sm group-hover:bg-white group-hover:text-black group-hover:border-black transition-colors">
                    <s.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black uppercase mb-3">{s.title}</h3>
                  <p className="font-mono font-bold text-sm leading-relaxed opacity-80">{s.desc}</p>
                </NeoCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- WORK --- */}
      <section id="work" className="py-20 border-b-[4px] border-black bg-neo-bg overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-16 gap-6">
            <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none">
              Works
            </h2>
            <a href={LINKS.github} target="_blank" rel="noreferrer noopener" className="hidden md:flex">
              <NeoButton variant="secondary" as="span">
                <Github className="w-5 h-5 mr-2" /> GitHub
              </NeoButton>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={`${project.title}-${index}`}
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <NeoCard
                  title={`0${index + 1}`}
                  className="flex flex-col h-full bg-white hover:shadow-neo-lg transition-shadow duration-300"
                >
                  {/* Not focusable: the Details button below opens the same modal,
                      and two tab stops per card made keyboard nav twice as long. */}
                  <div
                    className="group relative mb-3 h-56 cursor-pointer overflow-hidden border-[3px] border-black bg-neo-bg"
                    onClick={() => openModal(project)}
                    aria-hidden="true"
                  >
                    {project.imgSrc ? (
                      <Image
                        src={project.imgSrc}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover object-left-top transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : project.arch ? (
                      <ArchDiagram spec={project.arch} />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="-rotate-12 text-4xl font-black uppercase opacity-10">
                          {project.title}
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/20 group-hover:opacity-100">
                      <div className="rotate-3 border-2 border-black bg-white px-3 py-1 font-mono text-xs font-bold uppercase">
                        View Project
                      </div>
                    </div>
                  </div>

                  {project.imgNote && (
                    <p className="mb-4 font-mono text-[10px] leading-snug text-black/55">
                      {project.imgNote}
                    </p>
                  )}

                  <h3 className="mb-1 text-3xl font-black uppercase leading-none">{project.title}</h3>
                  <p className="mb-4 font-mono text-xs font-bold uppercase tracking-tight text-black/60">
                    {project.blurb}
                  </p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="bg-black px-2 py-1 font-mono text-[10px] font-bold uppercase text-white"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <p className="mb-5 flex-grow border-l-4 border-neo-accent pl-3 text-sm font-bold">
                    {project.description}
                  </p>

                  {/* Every project exposes a real destination, so no claim here is
                      unverifiable from the card itself. */}
                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.projectLink && (
                      <a
                        href={project.projectLink}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex items-center gap-1.5 border-[3px] border-black bg-neo-primary px-3 py-2 font-mono text-xs font-black uppercase text-black shadow-neo-sm transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neo-accent focus-visible:ring-offset-2"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> Live
                      </a>
                    )}
                    {project.code && (
                      <a
                        href={project.code}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex items-center gap-1.5 border-[3px] border-black bg-white px-3 py-2 font-mono text-xs font-black uppercase text-black shadow-neo-sm transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neo-accent focus-visible:ring-offset-2"
                      >
                        <Github className="h-3.5 w-3.5" /> Code
                      </a>
                    )}
                    {project.altCode && (
                      <a
                        href={project.altCode}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex items-center gap-1.5 border-[3px] border-black bg-white px-3 py-2 font-mono text-xs font-black uppercase text-black shadow-neo-sm transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neo-accent focus-visible:ring-offset-2"
                      >
                        <Github className="h-3.5 w-3.5" /> {project.altCodeLabel ?? "Alt"}
                      </a>
                    )}
                    <button
                      onClick={() => openModal(project)}
                      type="button"
                      className="group flex flex-grow items-center justify-between gap-1.5 border-[3px] border-black bg-black px-3 py-2 font-mono text-xs font-black uppercase text-white shadow-neo-sm transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neo-accent focus-visible:ring-offset-2"
                    >
                      Details
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </NeoCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TOOLBOX --- */}
      <section className="py-20 border-b-[4px] border-black bg-black text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between gap-6 mb-12">
            <h2 className="text-4xl md:text-6xl font-black uppercase text-neo-primary">
              The Toolbox
            </h2>
            <span className="hidden md:inline-block font-mono font-bold bg-white text-black px-3 py-2 border-2 border-white shadow-neo-sm transform rotate-2">
              STACK
            </span>
          </div>

          <motion.div
            className="flex flex-wrap gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {TOOLBOX.map((tool) => (
              <motion.span
                key={tool}
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { type: "spring", stiffness: 200 },
                  },
                }}
                whileHover={{ scale: 1.07, backgroundColor: "#fff", color: "#000" }}
                className="text-sm sm:text-lg md:text-2xl font-black uppercase border-2 border-white px-3 py-2 md:px-4 cursor-default select-none"
              >
                {tool}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- HISTORY (XP_LOG) --- */}
      <section
        id="history"
        className="py-24 bg-neo-bg relative border-b-[4px] border-black overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 md:mb-20">
            <h2 className="text-6xl md:text-9xl font-black uppercase leading-[0.8]">XP_LOG</h2>
            <div className="flex items-center gap-2 font-mono font-bold bg-black text-white px-4 py-2 mt-4 md:mt-0">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span>SYSTEM_ONLINE</span>
            </div>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[4px] bg-black/10 -translate-x-1/2">
              <motion.div
                className="w-full bg-black origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                style={{ height: "100%" }}
              />
            </div>

            <div className="space-y-16 md:space-y-24">
              {EXPERIENCE.map((exp, i) => {
                const isLeft = i % 2 === 0;

                return (
                  <div
                    key={`${exp.company}-${i}`}
                    className={`relative flex flex-col md:flex-row items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                  >
                    <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-8 h-8 bg-white border-[4px] border-black z-20 flex items-center justify-center">
                      <div className={`w-3 h-3 ${exp.color}`} />
                    </div>

                    <motion.div
                      className={`hidden md:block absolute top-1/2 h-[4px] bg-black z-10 ${isLeft ? "right-1/2 origin-right" : "left-1/2 origin-left"
                        }`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.25, duration: 0.45 }}
                      style={{ width: "50px" }}
                    />

                    <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                      <motion.div
                        initial={{ opacity: 0, y: 50, rotateX: -10 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          damping: 20,
                          delay: i * 0.08,
                        }}
                        className="relative group"
                      >
                        <div className="absolute inset-0 translate-x-2 translate-y-2 bg-black transition-transform duration-200 group-hover:translate-x-3 group-hover:translate-y-3" />

                        <div className="relative bg-white border-[3px] border-black overflow-hidden flex flex-col md:min-h-[500px]">
                          <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b-[3px] border-black bg-black px-4 py-2 text-white">
                            <span className="font-mono text-xs font-bold uppercase tracking-wide">
                              {exp.fullName}
                            </span>
                            <span className="font-mono text-[11px] text-white/70">
                              {exp.location}
                            </span>
                          </div>

                          <div className="px-6 py-6 md:px-8 md:py-8 flex flex-col flex-grow">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                              <div>
                                <h3 className="text-3xl md:text-4xl font-black uppercase leading-none mb-2">
                                  {exp.company}
                                </h3>
                                <span
                                  className={`inline-block px-3 py-1 text-sm font-bold font-mono border border-black ${exp.color} text-black`}
                                >
                                  {exp.role}
                                </span>
                              </div>
                              <div className="font-mono text-xs md:text-sm font-bold bg-gray-100 px-3 py-1 border border-black text-center sm:text-right w-full sm:w-auto">
                                {exp.period}
                              </div>
                            </div>

                            <ul className="space-y-4 mb-8">
                              {exp.points.map((pt, j) => (
                                <li
                                  key={`${exp.company}-pt-${j}`}
                                  className="flex items-start text-sm md:text-base font-bold opacity-90 leading-relaxed"
                                >
                                  <span className="mr-3 text-neo-primary text-lg leading-none">»</span>
                                  {pt}
                                </li>
                              ))}
                            </ul>

                            {exp.techStack && (
                              <div className="border-t-2 border-dashed border-black/20 pt-3 mt-auto">
                                <p className="font-mono text-[10px] uppercase opacity-50 mb-2">
                                  Technicals:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {exp.techStack.map((tech) => (
                                    <span
                                      key={`${exp.company}-${tech}`}
                                      className="bg-neo-bg border border-black px-2 py-1.5 text-[11px] md:text-xs font-black uppercase hover:bg-black hover:text-white transition-colors cursor-default"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer
        id="contact"
        className="py-20 bg-black text-neo-bg border-t-[4px] border-black relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10 mb-20 border-b-4 border-white/20 pb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase text-center text-white mb-12">
            Education & Certs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white text-black border-4 border-neo-primary p-6 shadow-neo">
              <h3 className="text-2xl font-black uppercase mb-4 bg-black text-white inline-block px-2">
                Education
              </h3>
              {EDUCATION.map((edu, i) => (
                <div key={i}>
                  <h4 className="text-xl font-bold">{edu.institution}</h4>
                  <p className="font-mono text-sm opacity-70 mb-2">{edu.degree}</p>
                  <span className="bg-neo-primary text-black text-xs font-bold px-2 py-1 border border-black">
                    {edu.period}
                  </span>
                  <p className="mt-3 text-sm font-bold border-l-2 border-black pl-3">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {CERTIFICATES.map((cert, i) => (
                <div
                  key={`${cert.name}-${i}`}
                  className="bg-black text-white p-5 border-l-4 border-neo-accent hover:border-white transition-colors"
                >
                  <div className="flex justify-between items-start gap-4">
                    <h4 className="text-lg font-bold uppercase">{cert.name}</h4>
                    {cert.date ? (
                      <span className="text-xs font-mono opacity-50 whitespace-nowrap">
                        {cert.date}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-neo-primary font-bold text-sm mb-1">{cert.issuer}</p>
                  <p className="text-xs opacity-70 font-mono">{cert.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block border-2 border-neo-primary px-4 py-1 rounded-full mb-8"
          >
            <span className="text-neo-primary font-mono font-bold animate-pulse">
              ● OPEN FOR OPPORTUNITIES
            </span>
          </motion.div>

          <h2 className="text-[12vw] font-black uppercase leading-none mb-12 text-white hover:text-neo-primary transition-colors cursor-default select-none">
            Let&apos;s Talk
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
            <a href={`mailto:${LINKS.email}`} className="group">
              <div className="flex items-center justify-center gap-3 bg-white text-black border-[4px] border-transparent p-6 font-black uppercase text-xl group-hover:bg-neo-primary group-hover:border-black group-hover:-translate-y-2 group-hover:shadow-neo transition-all">
                <Mail className="w-6 h-6" /> Email Me
              </div>
            </a>

            <a href={LINKS.linkedin} target="_blank" rel="noreferrer noopener" className="group">
              <div className="flex items-center justify-center gap-3 bg-white text-black border-[4px] border-transparent p-6 font-black uppercase text-xl group-hover:bg-[#0077b5] group-hover:text-white group-hover:border-black group-hover:-translate-y-2 group-hover:shadow-neo transition-all">
                <Linkedin className="w-6 h-6" /> LinkedIn
              </div>
            </a>

            <a href={LINKS.github} target="_blank" rel="noreferrer noopener" className="group">
              <div className="flex items-center justify-center gap-3 bg-white text-black border-[4px] border-transparent p-6 font-black uppercase text-xl group-hover:bg-[#333] group-hover:text-white group-hover:border-black group-hover:-translate-y-2 group-hover:shadow-neo transition-all">
                <Github className="w-6 h-6" /> GitHub
              </div>
            </a>
          </div>

          <div className="flex justify-between items-end border-t border-white/20 pt-8">
            <p className="font-mono text-xs opacity-50">© {year} WASIF ZAMAN.</p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-white font-mono text-xs underline hover:text-neo-primary"
              type="button"
            >
              BACK TO TOP
            </button>
          </div>
        </div>
      </footer>

      {/* MODAL */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            isOpen={modalOpen}
            setIsOpen={(open) => (open ? setModalOpen(true) : closeModal())}
            {...activeProject}
          />
        )}
      </AnimatePresence>
    </main>
    </MotionConfig>
  );
}