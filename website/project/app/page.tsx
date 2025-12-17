"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  AnimatePresence,
  type Variants,
} from "framer-motion";

// --- COMPONENTS (Keep your existing imports) ---
import Navbar from "./components/navbar";
import NeoButton from "./components/NeoButton";
import NeoCard from "./components/NeoCard";
import Marquee from "./components/Marquee";
import { ProjectModal } from "./components/ProjectModal";

import {
  ArrowRight,
  Download,
  Mail,
  Linkedin,
  Github,
  Globe,
  Database,
  Layout,
  ChevronDown,
} from "lucide-react";

/* =========================
   TYPES
========================= */
type Project = {
  title: string;
  tech: string[];
  description: string;
  imgSrc?: string;
  projectLink?: string;
  code?: string;
};

type Experience = {
  company: string;
  role: string;
  period: string;
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
  date?: string; // keep optional to avoid “wrong dates”
  details: string;
};

/* =========================
   LINKS
========================= */
const LINKS = {
  email: "wasif.zaman1@gmail.com",
  github: "https://github.com/wasif",
  linkedin: "https://www.linkedin.com/in/YOUR_LINKEDIN",
  resume: "/resume.pdf",
};

/* =========================
   DATA
========================= */
const SERVICES: Service[] = [
  {
    title: "Web Development",
    icon: Globe,
    desc: "React, Next.js, and Tailwind builds that are fast, accessible, and brutal.",
  },
  {
    title: "UI/UX Design",
    icon: Layout,
    desc: "High-impact design systems in Figma with strong rules (and selective rule-breaking).",
  },
  {
    title: "Backend Systems",
    icon: Database,
    desc: "APIs, database design, and server-side logic with clean structure and maintainability.",
  },
];

const TOOLBOX = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind",
  "Framer Motion",
  "Node.js",
  "PostgreSQL",
  "Figma",
  "Git",
  "Docker",
  "AWS",
  "Vercel",
];

const PROJECTS: Project[] = [
  {
    title: "Society Website",
    tech: ["Next.js", "TypeScript", "Tailwind", "Firebase", "Framer Motion"],
    description:
      "Society website rebuild with modern UI, responsive pages, and interactive features such as voting and media/gallery experiences.",
    imgSrc: "/project1.png",
    projectLink: "https://utsbdsoc.com",
    code: "#",
  },
  {
    title: "Bridge Control",
    tech: ["Java", "ESP32", "IoT", "Agile"],
    description:
      "Bridge control system project with safety logic concepts, sensor integration, and microcontroller coordination (ESP32/Arduino).",
    code: "https://github.com/wasif/bridge",
  },
  {
    title: "Motion Control",
    tech: ["C++", "Arduino", "Embedded"],
    description:
      "Motion control prototype code focused on serial communication, safety constraints, and modular control flow.",
    code: "#",
  },
];

// Experience: phrased to be truthful without overclaiming metrics.
const EXPERIENCE: Experience[] = [
  {
    company: "Optus",
    role: "Sales Consultant",
    period: "Jul 2025 – Present",
    color: "bg-neo-primary",
    points: [
      "Troubleshot customer connectivity, SIM, and device issues using in-store systems and standard diagnostics.",
      "Completed service activations and account updates through CRM workflows.",
      "Handled escalations appropriately and documented issues clearly for follow-up.",
      "Maintained clear communication under time pressure and high customer volume.",
    ],
    techStack: ["Troubleshooting", "CRM", "Customer Support"],
  },
  {
    company: "UTSBDSOC",
    role: "IT Director",
    period: "May 2025 – Present",
    color: "bg-neo-secondary",
    points: [
      "Led the website revamp direction and coordinated implementation tasks across the committee.",
      "Built and maintained frontend structure, components, and styling standards for consistency.",
      "Translated the society’s branding direction into UI patterns and reusable layouts.",
      "Created setup notes / handover documentation to support ongoing maintenance.",
    ],
    techStack: ["Next.js", "TypeScript", "UI System"],
  },
  {
    company: "Woolworths",
    role: "Sales Assistant",
    period: "Feb 2023 – Present",
    color: "bg-neo-accent",
    points: [
      "Assisted customers with checkout, self-serve, and everyday store operations.",
      "Supported basic troubleshooting for POS / kiosk issues and escalated when required.",
      "Worked efficiently in high-volume periods while maintaining accuracy.",
    ],
    techStack: ["POS", "Customer Service", "Ops"],
  },
];

const EDUCATION: EducationItem[] = [
  {
    institution: "Macquarie University",
    degree: "Bachelor of Engineering (Honours) in Software Engineering",
    period: "Feb 2022 – Present",
    details:
      "Relevant Coursework: Data Structures, Algorithms, Database Systems, Operating Systems, Embedded Systems, Cloud Computing.",
  },
];

// Dates removed/optional to avoid incorrect claims.
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
    details: "DOM basics, JSON, async patterns, debugging fundamentals.",
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

// Stable “random” per character (no re-randomizing every render)
const StaggeredText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const chars = useMemo(
    () =>
      text.split("").map((char, i) => ({
        char,
        rot: ((i * 7) % 11) - 5, // deterministic rotation: -5..+5-ish
      })),
    [text]
  );

  return (
    <span className={`inline-flex flex-wrap justify-center ${className || ""}`}>
      {chars.map(({ char, rot }, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.05, ease: "backOut" }}
          whileHover={{
            y: -15,
            rotate: rot,
            color: "#FF5D01",
            scale: 1.08,
            transition: { duration: 0.12 },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

// Custom Cursor (desktop only). Fix: don’t hide cursor on mobile.
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });

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
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  </div>
);

/* =========================
   PAGE
========================= */
export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Parallax for Hero
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((event.clientX - centerX) / 40);
    y.set((event.clientY - centerY) / 40);
  }

  const openModal = (project: Project) => {
    setActiveProject(project);
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
    <main className="min-h-screen bg-neo-bg text-neo-text overflow-x-hidden selection:bg-black selection:text-white cursor-auto md:cursor-none">
      <CustomCursor />
      <Navbar />
      <GrainOverlay />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-neo-primary origin-left z-[90] border-b-2 border-black"
        style={{ scaleX }}
      />

      {/* --- HERO --- */}
      <section
        onMouseMove={handleMouseMove}
        className="relative flex min-h-screen flex-col justify-center border-b-[4px] border-black bg-white/50 pt-20 overflow-hidden"
      >
        {/* Floating Elements */}
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
              className="inline-block max-w-2xl text-lg md:text-2xl font-mono font-bold leading-tight mb-10 bg-white border-[3px] border-black p-4 md:p-6 shadow-neo transform rotate-1 hover:-rotate-1 transition-transform duration-300 text-left md:text-center"
            >
              Software Engineer creating{" "}
              <span className="bg-neo-accent text-white px-1 mx-1">raw</span> &{" "}
              <span className="bg-neo-secondary text-white px-1 mx-1">robust</span>{" "}
              digital experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a href={`mailto:${LINKS.email}`} className="w-full sm:w-auto group">
                <NeoButton
                  variant="primary"
                  size="lg"
                  className="w-full justify-center flex items-center group-hover:-translate-y-1 group-hover:shadow-neo-lg transition-all"
                  type="button"
                >
                  <Mail className="w-5 h-5 mr-2" /> Contact Me
                </NeoButton>
              </a>
              <a href={LINKS.resume} download className="w-full sm:w-auto group">
                <NeoButton
                  variant="base"
                  size="lg"
                  className="w-full justify-center flex items-center group-hover:-translate-y-1 group-hover:shadow-neo-lg transition-all"
                  type="button"
                >
                  <Download className="w-5 h-5 mr-2" /> CV / Resume
                </NeoButton>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-24 right-4 md:right-10 flex flex-col items-center gap-2 z-20"
        >
          <span className="font-mono text-xs font-bold">SCROLL</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="bg-black text-white p-2"
          >
            <ChevronDown />
          </motion.div>
        </motion.div>

        <div className="mt-auto border-t-[4px] border-black bg-neo-primary relative z-20">
          <Marquee
            text="SCROLL FOR MORE • WEB DEV • UI/UX • FULL STACK • "
            className="font-black text-xl py-3 text-black"
          />
        </div>
      </section>

      {/* --- SERVICES --- */}
      <section id="services" className="py-20 border-b-[4px] border-black bg-white relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-end justify-between gap-6 mb-16"
          >
            <h2 className="text-5xl md:text-8xl font-black uppercase leading-none">
              What I Do
            </h2>
            <span className="hidden md:inline-block font-mono font-bold bg-black text-white px-3 py-2 border-2 border-black shadow-neo-sm">
              SERVICES
            </span>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {SERVICES.map((s, i) => (
              <motion.div variants={fadeInUp} key={i}>
                <NeoCard className="h-full bg-neo-bg hover:bg-neo-primary transition-all duration-300 hover:-translate-y-2 group">
                  <div className="bg-black text-white w-14 h-14 flex items-center justify-center border-[3px] border-transparent mb-6 shadow-neo-sm group-hover:bg-white group-hover:text-black group-hover:border-black transition-colors">
                    <s.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black uppercase mb-3">{s.title}</h3>
                  <p className="font-mono font-bold text-sm leading-relaxed opacity-80">
                    {s.desc}
                  </p>
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
            <a href={LINKS.github} target="_blank" rel="noreferrer" className="hidden md:flex">
              <NeoButton variant="secondary" type="button">
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
                  <div
                    className="h-56 bg-gray-200 border-[3px] border-black mb-5 relative overflow-hidden group cursor-pointer"
                    onClick={() => openModal(project)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && openModal(project)}
                    aria-label={`Open ${project.title}`}
                  >
                    {project.imgSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.imgSrc}
                        alt={`${project.title} preview`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-black text-4xl opacity-10 uppercase -rotate-12">
                          {project.title}
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-white border-2 border-black px-3 py-1 font-bold font-mono text-xs uppercase transform rotate-3">
                        View Project
                      </div>
                    </div>
                  </div>

                  <h3 className="text-3xl font-black uppercase mb-2 leading-none">
                    {project.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="bg-black text-white text-[10px] font-mono px-2 py-1 font-bold uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <p className="font-bold text-sm mb-6 flex-grow border-l-4 border-neo-accent pl-3">
                    {project.description}
                  </p>

                  <NeoButton
                    onClick={() => openModal(project)}
                    variant="base"
                    className="w-full mt-auto flex justify-between items-center group"
                    type="button"
                  >
                    Details{" "}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </NeoButton>
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
            {TOOLBOX.map((tool, i) => (
              <motion.span
                key={tool}
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200 } },
                }}
                whileHover={{ scale: 1.07, backgroundColor: "#fff", color: "#000" }}
                className="text-lg md:text-3xl font-black uppercase border-2 border-white px-4 py-2 cursor-default select-none"
              >
                {tool}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- HISTORY (XP_LOG) --- */}
      <section id="history" className="py-24 bg-neo-bg relative border-b-[4px] border-black overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 md:mb-20">
            <h2 className="text-6xl md:text-9xl font-black uppercase leading-[0.8]">
              XP_LOG
            </h2>
            <div className="flex items-center gap-2 font-mono font-bold bg-black text-white px-4 py-2 mt-4 md:mt-0">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span>SYSTEM_ONLINE</span>
            </div>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Central spine */}
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
                    {/* Node */}
                    <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-8 h-8 bg-white border-[4px] border-black z-20 flex items-center justify-center">
                      <div className={`w-3 h-3 ${exp.color}`} />
                    </div>

                    {/* Connector */}
                    <motion.div
                      className={`hidden md:block absolute top-1/2 h-[4px] bg-black z-10 ${isLeft ? "right-1/2 origin-right" : "left-1/2 origin-left"
                        }`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.25, duration: 0.45 }}
                      style={{ width: "50px" }}
                    />

                    {/* Card */}
                    <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                      <motion.div
                        initial={{ opacity: 0, y: 50, rotateX: -10 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.08 }}
                        className="relative group"
                      >
                        {/* Shadow block */}
                        <div className="absolute inset-0 translate-x-2 translate-y-2 bg-black transition-transform duration-200 group-hover:translate-x-3 group-hover:translate-y-3" />

                        <div className="relative bg-white border-[3px] border-black overflow-hidden">
                          <div className="bg-black text-white px-4 py-2 flex items-center justify-between border-b-[3px] border-black">
                            <div className="flex gap-2">
                              <div className="w-3 h-3 rounded-full bg-red-500 border border-white/20" />
                              <div className="w-3 h-3 rounded-full bg-yellow-400 border border-white/20" />
                              <div className="w-3 h-3 rounded-full bg-green-500 border border-white/20" />
                            </div>
                            <span className="font-mono text-xs text-gray-400">
                              ~/work/{exp.company.toLowerCase()}
                            </span>
                          </div>

                          <div className="px-6 py-6 md:px-8 md:py-8">
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
                              <div className="font-mono text-xs md:text-sm font-bold bg-gray-100 px-3 py-1 border border-black whitespace-nowrap">
                                {exp.period}
                              </div>
                            </div>

                            <ul className="space-y-4 mb-8">
                              {exp.points.map((pt, j) => (
                                <li
                                  key={`${exp.company}-pt-${j}`}
                                  className="flex items-start text-sm md:text-base font-bold opacity-90 leading-relaxed"
                                >
                                  <span className="mr-3 text-neo-primary text-lg leading-none">
                                    »
                                  </span>
                                  {pt}
                                </li>
                              ))}
                            </ul>

                            {exp.techStack && (
                              <div className="border-t-2 border-dashed border-black/20 pt-3">
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
      <footer id="contact" className="py-20 bg-black text-neo-bg border-t-[4px] border-black relative overflow-hidden">
        {/* Removed external bg URL to avoid build/CSP issues */}

        {/* Education & Certs */}
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

            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="group">
              <div className="flex items-center justify-center gap-3 bg-white text-black border-[4px] border-transparent p-6 font-black uppercase text-xl group-hover:bg-[#0077b5] group-hover:text-white group-hover:border-black group-hover:-translate-y-2 group-hover:shadow-neo transition-all">
                <Linkedin className="w-6 h-6" /> LinkedIn
              </div>
            </a>

            <a href={LINKS.github} target="_blank" rel="noreferrer" className="group">
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
  );
}
