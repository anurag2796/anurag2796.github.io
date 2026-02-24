import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import {
  Code2,
  Monitor,
  Server,
  Brain,
  Database,
  Workflow,
  Mail,
  Github,
  FileText,
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  Zap,
} from "lucide-react";
import {
  fetchRepos,
  type GitHubRepo,
} from "@/services/github";
import { fetchRepoDescription } from "@/services/github";
import { TiltCard } from "@/components/TiltCard";

const KYBER = "#00C8FF";
const SITH = "#FF1744";
const ORBITRON = "'Orbitron', sans-serif";
const INTER = "'Inter', system-ui, sans-serif";

// ─── Shared animation variants ───────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

// ─── Section header ───────────────────────────────────────────────────────────
function SectionLabel({
  index,
  label,
}: {
  index: string;
  label: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        marginBottom: 16,
      }}
    >
      <span
        style={{
          fontFamily: ORBITRON,
          fontSize: "0.65rem",
          color: "rgba(0,200,255,0.5)",
          letterSpacing: "0.25em",
        }}
      >
        {index}
      </span>
      <div
        style={{
          flex: 1,
          height: 1,
          background:
            "linear-gradient(to right, rgba(0,200,255,0.35), transparent)",
        }}
      />
      <span
        style={{
          fontFamily: ORBITRON,
          fontSize: "0.62rem",
          color: "rgba(0,200,255,0.4)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Magnetic CTA button ──────────────────────────────────────────────────────
function CtaButton({
  children,
  href,
  variant = "outline",
  color = KYBER,
  icon,
  download,
}: {
  children: React.ReactNode;
  href: string;
  variant?: "outline" | "solid";
  color?: string;
  icon?: React.ReactNode;
  download?: boolean;
}) {
  const [mag, setMag] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    setMag({
      x: (e.clientX - r.left - r.width / 2) * 0.25,
      y: (e.clientY - r.top - r.height / 2) * 0.25,
    });
  };
  const onLeave = () => {
    setMag({ x: 0, y: 0 });
    setHov(false);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={download ? undefined : "_blank"}
      rel="noopener noreferrer"
      download={download}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={() => setHov(true)}
      animate={{ x: mag.x, y: mag.y }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        padding: "12px 26px",
        borderRadius: 6,
        fontFamily: ORBITRON,
        fontSize: "0.72rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        textDecoration: "none",
        cursor: "pointer",
        border: `1px solid ${color}`,
        color: variant === "solid" ? "#000" : color,
        background:
          variant === "solid"
            ? hov
              ? color
              : `${color}dd`
            : hov
              ? `${color}18`
              : "transparent",
        boxShadow: hov
          ? `0 0 24px ${color}40, 0 0 8px ${color}20`
          : `0 0 8px ${color}18`,
        transition: "background 0.25s, box-shadow 0.25s",
      }}
    >
      {icon && <span style={{ display: "flex" }}>{icon}</span>}
      {children}
    </motion.a>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 700], [0, -120]);
  const contentOpacity = useTransform(
    scrollY,
    [0, 500],
    [1, 0],
  );

  const words = ["ANURAG", "LNU."];

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Schematic grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,200,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,200,255,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Left structural line */}
      <div
        style={{
          position: "absolute",
          left: "clamp(20px, 4vw, 60px)",
          top: 0,
          bottom: 0,
          width: 1,
          background:
            "linear-gradient(to bottom, transparent, rgba(0,200,255,0.25) 20%, rgba(0,200,255,0.25) 80%, transparent)",
          zIndex: 2,
        }}
      >
        {/* Measurement ticks */}
        {[20, 35, 50, 65, 80].map((pct) => (
          <div
            key={pct}
            style={{
              position: "absolute",
              top: `${pct}%`,
              left: 0,
              width: 8,
              height: 1,
              background: "rgba(0,200,255,0.3)",
            }}
          />
        ))}
      </div>

      {/* Rotated side label */}
      <div
        className="hidden lg:flex"
        style={{
          position: "absolute",
          right: 32,
          top: "50%",
          transform: "rotate(90deg) translateX(50%)",
          transformOrigin: "right center",
          fontFamily: ORBITRON,
          fontSize: "0.6rem",
          color: "rgba(0,200,255,0.25)",
          letterSpacing: "0.3em",
          whiteSpace: "nowrap",
          zIndex: 2,
        }}
      >
        PORTFOLIO // 2026 // ANURAG2796 // READY
      </div>

      {/* Floating schematic shapes (parallax) */}
      <motion.div
        style={{
          position: "absolute",
          top: "15%",
          right: "8%",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,200,255,0.04) 0%, transparent 70%)",
          zIndex: 1,
          pointerEvents: "none",
          y: useTransform(scrollY, [0, 800], [0, 80]),
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "5%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,23,68,0.04) 0%, transparent 70%)",
          zIndex: 1,
          pointerEvents: "none",
          y: useTransform(scrollY, [0, 800], [0, -60]),
        }}
      />

      {/* Main content */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 3,
          paddingLeft: "clamp(48px, 10vw, 140px)",
          paddingRight: "clamp(20px, 5vw, 80px)",
          paddingTop: 80,
          width: "100%",
          y: contentY,
          opacity: contentOpacity,
        }}
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 32,
            padding: "7px 16px",
            border: "1px solid rgba(0,200,255,0.18)",
            borderRadius: 4,
            background: "rgba(0,200,255,0.05)",
          }}
        >
          <motion.div
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: KYBER,
              boxShadow: `0 0 8px ${KYBER}`,
            }}
          />
          <span
            style={{
              fontFamily: ORBITRON,
              fontSize: "0.62rem",
              color: KYBER,
              letterSpacing: "0.2em",
            }}
          >
            SYSTEM ONLINE
          </span>
          <div
            style={{
              width: 1,
              height: 12,
              background: "rgba(0,200,255,0.2)",
            }}
          />
          <span
            style={{
              fontFamily: ORBITRON,
              fontSize: "0.62rem",
              color: "rgba(0,200,255,0.5)",
              letterSpacing: "0.15em",
            }}
          >
            DEVELOPER
          </span>
        </motion.div>

        {/* Giant name — text mask reveal */}
        <div style={{ overflow: "hidden", marginBottom: 8 }}>
          {words.map((word, i) => (
            <div key={word} style={{ overflow: "hidden" }}>
              <motion.h1
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{
                  delay: 0.45 + i * 0.14,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  fontFamily: ORBITRON,
                  fontSize: "clamp(3.5rem, 13vw, 10rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.01em",
                  lineHeight: 0.95,
                  margin: 0,
                  color: i === 0 ? "#FFFFFF" : "transparent",
                  WebkitTextStroke:
                    i === 1
                      ? "1px rgba(0,200,255,0.6)"
                      : undefined,
                  textShadow:
                    i === 0
                      ? `0 0 60px rgba(255,255,255,0.08)`
                      : undefined,
                }}
              >
                {word}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Sub-title stagger */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          style={{ marginTop: 28, maxWidth: 640 }}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: ORBITRON,
              fontSize: "clamp(0.75rem, 2vw, 1rem)",
              color: "rgba(0,200,255,0.7)",
              letterSpacing: "0.25em",
              margin: "0 0 16px",
              textTransform: "uppercase",
            }}
          >
            AI / ML Engineer&nbsp;&nbsp;+&nbsp;&nbsp;Full-Stack
            Developer
          </motion.p>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: INTER,
              fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)",
              color: "#8892A4",
              lineHeight: 1.75,
              margin: "0 0 40px",
              maxWidth: 520,
            }}
          >
            Building production-grade systems at the
            intersection of modern web engineering and
            artificial intelligence. Rebel developer striking
            from a hidden base.
          </motion.p>

          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
            }}
          >
            <CtaButton
              href="/resume.pdf"
              icon={<FileText size={14} />}
              color={KYBER}
              download
            >
              View Resume
            </CtaButton>
            <CtaButton
              href="https://github.com/anurag2796"
              icon={<Github size={14} />}
              color="#E8EAED"
            >
              GitHub Alliance
            </CtaButton>
            <CtaButton
              href="mailto:contact@example.com"
              icon={<Mail size={14} />}
              color={SITH}
            >
              Initiate Contact
            </CtaButton>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          style={{
            position: "absolute",
            bottom: -80,
            left: "clamp(48px, 10vw, 140px)",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowDown size={14} color={KYBER} />
          </motion.div>
          <span
            style={{
              fontFamily: ORBITRON,
              fontSize: "0.58rem",
              color: "rgba(0,200,255,0.4)",
              letterSpacing: "0.3em",
            }}
          >
            SCROLL TO EXPLORE
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── PROJECTS SECTION ─────────────────────────────────────────────────────────

/** Pinned slugs in exact display order (normalized: lowercase, no separators) */
const PINNED_SLUGS = [
  "tigerresearchbuddy",
  "nyccrimecast",
  "smartbetting",
  "hybridmlscheduler",
  "leafmd",
  "slidespeak",
];

function normalize(name: string): string {
  return name.toLowerCase().replace(/[-_\s]/g, "");
}

function trimTo120(text: string): string {
  const t = text.trim();
  return t.length <= 120 ? t : t.slice(0, 120).trimEnd() + "…";
}

function sortRepos(repos: GitHubRepo[]): GitHubRepo[] {
  const pinnedMap = new Map<string, GitHubRepo>();
  const rest: GitHubRepo[] = [];

  for (const repo of repos) {
    const norm = normalize(repo.name);
    if (PINNED_SLUGS.includes(norm)) pinnedMap.set(norm, repo);
    else rest.push(repo);
  }

  const pinned = PINNED_SLUGS.map((s) =>
    pinnedMap.get(s),
  ).filter(Boolean) as GitHubRepo[];

  rest.sort((a, b) => {
    if (b.stargazers_count !== a.stargazers_count)
      return b.stargazers_count - a.stargazers_count;
    return (
      new Date(b.updated_at).getTime() -
      new Date(a.updated_at).getTime()
    );
  });

  return [...pinned, ...rest];
}

function ProjectsSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [descriptions, setDescriptions] = useState<
    Record<number, string>
  >({});
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, {
    once: true,
    margin: "-80px 0px",
  });

  useEffect(() => {
    fetchRepos().then(async (raw) => {
      const sorted = sortRepos(raw);
      setRepos(sorted);
      setLoading(false);

      // Fetch README fallback descriptions for repos with no GitHub description
      const needsFallback = sorted.filter(
        (r) => !r.description?.trim(),
      );
      const results = await Promise.all(
        needsFallback.map(async (repo) => ({
          id: repo.id,
          desc: await fetchRepoDescription(repo.name),
        })),
      );
      const map: Record<number, string> = {};
      for (const { id, desc } of results)
        if (desc) map[id] = desc;
      setDescriptions(map);
    });
  }, []);

  /** Returns a trimmed ≤120-char description for any repo */
  const resolveDescription = (repo: GitHubRepo): string => {
    const gh = repo.description?.trim();
    if (gh) return trimTo120(gh);
    const fallback = descriptions[repo.id]?.trim();
    if (fallback) return trimTo120(fallback);
    return "Explore this project in the archives — source code and documentation available on GitHub.";
  };

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "right" ? 360 : -360,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        padding: "clamp(80px, 12vw, 140px) 0",
        position: "relative",
      }}
    >
      {/* Horizontal rule with label */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(to right, transparent, rgba(0,200,255,0.12) 20%, rgba(0,200,255,0.12) 80%, transparent)",
        }}
      />

      <div
        style={{
          paddingLeft: "clamp(24px, 6vw, 100px)",
          paddingRight: "clamp(24px, 6vw, 100px)",
        }}
      >
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel index="02" label="Project Holocron" />
          </motion.div>

          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
              marginBottom: 48,
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: ORBITRON,
                  fontSize: "clamp(1.6rem, 5vw, 3.2rem)",
                  fontWeight: 900,
                  color: "#E8EAED",
                  margin: "0 0 12px",
                  letterSpacing: "-0.01em",
                }}
              >
                JEDI ARCHIVES
              </h2>
              <p
                style={{
                  fontFamily: INTER,
                  fontSize: "0.92rem",
                  color: "#8892A4",
                  margin: 0,
                  maxWidth: 460,
                  lineHeight: 1.7,
                }}
              >
                Live repository data pulled directly from the
                GitHub Alliance. Each holocron stores a complete
                mission record.
              </p>
            </div>

            {/* Nav arrows (desktop) */}
            <div
              className="hidden sm:flex"
              style={{ display: "flex", gap: 10 }}
            >
              <button
                onClick={() => scroll("left")}
                data-hover
                style={{
                  width: 44,
                  height: 44,
                  border: "1px solid rgba(0,200,255,0.2)",
                  borderRadius: 4,
                  background: "rgba(0,200,255,0.04)",
                  color: KYBER,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (
                    e.currentTarget as HTMLButtonElement
                  ).style.background = "rgba(0,200,255,0.12)";
                  (
                    e.currentTarget as HTMLButtonElement
                  ).style.borderColor = "rgba(0,200,255,0.5)";
                }}
                onMouseLeave={(e) => {
                  (
                    e.currentTarget as HTMLButtonElement
                  ).style.background = "rgba(0,200,255,0.04)";
                  (
                    e.currentTarget as HTMLButtonElement
                  ).style.borderColor = "rgba(0,200,255,0.2)";
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll("right")}
                data-hover
                style={{
                  width: 44,
                  height: 44,
                  border: "1px solid rgba(0,200,255,0.2)",
                  borderRadius: 4,
                  background: "rgba(0,200,255,0.04)",
                  color: KYBER,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (
                    e.currentTarget as HTMLButtonElement
                  ).style.background = "rgba(0,200,255,0.12)";
                  (
                    e.currentTarget as HTMLButtonElement
                  ).style.borderColor = "rgba(0,200,255,0.5)";
                }}
                onMouseLeave={(e) => {
                  (
                    e.currentTarget as HTMLButtonElement
                  ).style.background = "rgba(0,200,255,0.04)";
                  (
                    e.currentTarget as HTMLButtonElement
                  ).style.borderColor = "rgba(0,200,255,0.2)";
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Horizontal scrollable carousel */}
      <div style={{ position: "relative" }}>
        {/* Left fade */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 60,
            background:
              "linear-gradient(to right, #04050E, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        {/* Right fade */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 80,
            background:
              "linear-gradient(to left, #04050E, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <div
          ref={scrollRef}
          style={
            {
              display: "flex",
              gap: 20,
              overflowX: "auto",
              paddingLeft: "clamp(24px, 6vw, 100px)",
              paddingRight: "clamp(24px, 6vw, 100px)",
              paddingBottom: 24,
              paddingTop: 8,
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
            } as React.CSSProperties
          }
        >
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
            : repos.map((repo, i) => (
              <div
                key={repo.id}
                style={{
                  scrollSnapAlign: "start",
                  flexShrink: 0,
                }}
              >
                <TiltCard
                  repo={repo}
                  index={i}
                  description={resolveDescription(repo)}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

function SkeletonCard() {
  return (
    <motion.div
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      style={{
        width: "clamp(280px, 85vw, 320px)",
        minHeight: 300,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(0,200,255,0.06)",
        borderRadius: 12,
        padding: 28,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div
        style={{
          width: 80,
          height: 10,
          background: "rgba(0,200,255,0.1)",
          borderRadius: 4,
        }}
      />
      <div
        style={{
          width: "75%",
          height: 16,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 4,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          flex: 1,
        }}
      >
        <div
          style={{
            width: "100%",
            height: 10,
            background: "rgba(255,255,255,0.04)",
            borderRadius: 4,
          }}
        />
        <div
          style={{
            width: "90%",
            height: 10,
            background: "rgba(255,255,255,0.04)",
            borderRadius: 4,
          }}
        />
        <div
          style={{
            width: "70%",
            height: 10,
            background: "rgba(255,255,255,0.04)",
            borderRadius: 4,
          }}
        />
      </div>
    </motion.div>
  );
}

// ─── SKILLS SECTION ───────────────────────────────────────────────────────────
const skillCategories = [
  {
    icon: Code2,
    category: "Languages",
    items: [
      "Python",
      "TypeScript",
      "JavaScript",
      "SQL",
      "HTML / CSS",
    ],
    color: "#3178C6",
  },
  {
    icon: Monitor,
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Motion",
      "Three.js",
    ],
    color: KYBER,
  },
  {
    icon: Server,
    category: "Backend",
    items: [
      "Node.js",
      "FastAPI",
      "Django",
      "PostgreSQL",
      "REST APIs",
    ],
    color: "#2EF8A0",
  },
  {
    icon: Brain,
    category: "AI / ML",
    items: [
      "LangChain",
      "RAG Systems",
      "Multi-Agent",
      "PyTorch",
      "NLP",
    ],
    color: SITH,
  },
  {
    icon: Database,
    category: "Data & Analytics",
    items: [
      "Pandas",
      "NumPy",
      "Backtesting",
      "Data Pipelines",
      "Analytics",
    ],
    color: "#FFE81F",
  },
  {
    icon: Workflow,
    category: "DevOps & Tools",
    items: [
      "Docker",
      "Git / GitHub",
      "AWS",
      "Vercel",
      "CI / CD",
    ],
    color: "#7F52FF",
  },
];

function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-80px 0px",
  });

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        padding:
          "clamp(80px, 12vw, 140px) clamp(24px, 6vw, 100px)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(to right, transparent, rgba(0,200,255,0.12) 20%, rgba(0,200,255,0.12) 80%, transparent)",
        }}
      />

      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <SectionLabel index="01" label="Force Abilities" />
        </motion.div>

        <motion.div
          variants={fadeUp}
          style={{ marginBottom: 56 }}
        >
          <h2
            style={{
              fontFamily: ORBITRON,
              fontSize: "clamp(1.6rem, 5vw, 3.2rem)",
              fontWeight: 900,
              color: "#E8EAED",
              margin: "0 0 12px",
            }}
          >
            TECHNICAL ARSENAL
          </h2>
          <p
            style={{
              fontFamily: INTER,
              fontSize: "0.92rem",
              color: "#8892A4",
              margin: 0,
              maxWidth: 480,
              lineHeight: 1.7,
            }}
          >
            Mastery in sensing disturbances in the code. Each
            discipline refined through galactic-scale production
            deployments.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: 20,
          }}
        >
          {skillCategories.map((cat, i) => (
            <SkillCard key={cat.category} cat={cat} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function SkillCard({
  cat,
  index,
}: {
  cat: (typeof skillCategories)[0];
  index: number;
}) {
  const [hov, setHov] = useState(false);
  const Icon = cat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.07,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov
          ? "rgba(255,255,255,0.06)"
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${hov ? `${cat.color}40` : "rgba(255,255,255,0.06)"}`,
        borderRadius: 10,
        padding: "26px 24px",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow blob behind */}
      <div
        style={{
          position: "absolute",
          top: -30,
          right: -30,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${cat.color}18 0%, transparent 70%)`,
          pointerEvents: "none",
          transition: "opacity 0.3s",
          opacity: hov ? 1 : 0.4,
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 18,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 8,
            background: `${cat.color}14`,
            border: `1px solid ${cat.color}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={18} color={cat.color} />
        </div>
        <h3
          style={{
            fontFamily: ORBITRON,
            fontSize: "0.78rem",
            color: "#E8EAED",
            margin: 0,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {cat.category}
        </h3>
      </div>

      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 7 }}
      >
        {cat.items.map((item, j) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.05 + j * 0.05,
              duration: 0.3,
            }}
            style={{
              fontFamily: INTER,
              fontSize: "0.78rem",
              color: hov ? "#C8D0DC" : "#8892A4",
              background: hov
                ? "rgba(255,255,255,0.07)"
                : "rgba(255,255,255,0.04)",
              border: `1px solid ${hov ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)"}`,
              padding: "4px 11px",
              borderRadius: 4,
              transition: "all 0.25s",
            }}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── CONTACT SECTION ──────────────────────────────────────────────────────────

// Expanding radar ring used in the LinkedIn module
function RadarRing({
  index,
  active,
}: {
  index: number;
  active: boolean;
}) {
  return (
    <motion.div
      animate={
        active
          ? { scale: [1, 3.2 + index * 0.6], opacity: [0.6, 0] }
          : { scale: 1, opacity: 0 }
      }
      transition={
        active
          ? {
            duration: 1.7 + index * 0.15,
            delay: index * 0.42,
            repeat: Infinity,
            ease: "easeOut",
          }
          : { duration: 0.18 }
      }
      style={{
        position: "absolute",
        width: 88,
        height: 88,
        borderRadius: "50%",
        border: "1px solid rgba(0,200,255,0.65)",
        top: "50%",
        left: "50%",
        marginLeft: -44,
        marginTop: -44,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

// LinkedIn "Holo-Net Connection" module
function LinkedInModule() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href="https://www.linkedin.com/in/anurag2796"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        textDecoration: "none",
        width: "100%",
        maxWidth: 380,
      }}
      data-hover
    >
      <motion.div
        animate={{
          boxShadow: hovered
            ? "0 0 60px rgba(0,200,255,0.32), 0 0 120px rgba(0,200,255,0.12), 0 8px 48px rgba(0,0,0,0.55)"
            : "0 0 18px rgba(0,200,255,0.06), 0 8px 32px rgba(0,0,0,0.4)",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{
          position: "relative",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: `1px solid ${hovered ? "rgba(0,200,255,0.42)" : "rgba(0,200,255,0.12)"}`,
          borderLeft: `3px solid ${hovered ? KYBER : "rgba(0,200,255,0.35)"}`,
          borderRadius: 14,
          padding: "36px 32px 30px",
          overflow: "hidden",
          cursor: "pointer",
          minHeight: 380,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 0,
          transition: "border-color 0.4s ease",
        }}
      >
        {/* ── Scan-line texture ──────────────────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,200,255,0.012) 3px, rgba(0,200,255,0.012) 4px)",
            pointerEvents: "none",
          }}
        />

        {/* ── HUD corner brackets ─────────────────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            opacity: hovered ? 0.7 : 0.22,
            transition: "opacity 0.35s",
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M32 0 L32 12 M32 0 L20 0"
              stroke={KYBER}
              strokeWidth="1.2"
            />
          </svg>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            opacity: hovered ? 0.7 : 0.22,
            transition: "opacity 0.35s",
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M0 32 L0 20 M0 32 L12 32"
              stroke={KYBER}
              strokeWidth="1.2"
            />
          </svg>
        </div>

        {/* ── Status beacon ──────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 28,
            zIndex: 1,
          }}
        >
          <motion.div
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: KYBER,
              boxShadow: `0 0 8px ${KYBER}`,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: ORBITRON,
              fontSize: "0.52rem",
              color: "rgba(0,200,255,0.45)",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
            }}
          >
            Secure Channel Available
          </span>
        </div>

        {/* ── LinkedIn icon + radar rings ────────────────────────────────── */}
        <div
          style={{
            position: "relative",
            width: 88,
            height: 88,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            flexShrink: 0,
            zIndex: 1,
          }}
        >
          {/* Radar rings */}
          {[0, 1, 2].map((i) => (
            <RadarRing key={i} index={i} active={hovered} />
          ))}

          {/* Icon container */}
          <motion.div
            animate={{
              boxShadow: hovered
                ? `0 0 32px rgba(0,200,255,0.7), 0 0 64px rgba(0,200,255,0.3)`
                : `0 0 14px rgba(0,200,255,0.2)`,
              background: hovered
                ? "rgba(0,200,255,0.18)"
                : "rgba(0,200,255,0.08)",
            }}
            transition={{ duration: 0.4 }}
            style={{
              position: "relative",
              zIndex: 2,
              width: 72,
              height: 72,
              borderRadius: 16,
              border: `1px solid ${hovered ? "rgba(0,200,255,0.55)" : "rgba(0,200,255,0.28)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "border-color 0.4s",
            }}
          >
            {/* LinkedIn SVG — custom neon-blue styled */}
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                animate={{ fill: hovered ? "#FFFFFF" : KYBER }}
                transition={{ duration: 0.3 }}
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              />
            </svg>
          </motion.div>
        </div>

        {/* ── Heading ─────────────────────────────────────────────────────── */}
        <motion.h3
          animate={{ color: hovered ? "#FFFFFF" : "#E8EAED" }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: ORBITRON,
            fontSize: "clamp(1rem, 2.2vw, 1.15rem)",
            fontWeight: 900,
            margin: "0 0 10px",
            letterSpacing: "0.04em",
            lineHeight: 1.25,
            zIndex: 1,
          }}
        >
          ACCESS PROFESSIONAL
          <br />
          <span style={{ color: KYBER }}>HOLOCRON</span>
        </motion.h3>

        {/* ── Subtitle ────────────────────────────────────────────────────── */}
        <p
          style={{
            fontFamily: INTER,
            fontSize: "0.82rem",
            color: "rgba(0,200,255,0.5)",
            margin: "0 0 24px",
            letterSpacing: "0.05em",
            lineHeight: 1.55,
            zIndex: 1,
          }}
        >
          Establish Secure LinkedIn Connection
        </p>

        {/* ── Signal strength bars ─────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 4,
            marginBottom: 20,
            zIndex: 1,
          }}
        >
          {[10, 16, 22, 28].map((h, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: hovered
                  ? [0.6, 1, 0.6]
                  : [0.25, 0.45, 0.25],
                boxShadow: hovered
                  ? [
                    `0 0 6px ${KYBER}`,
                    `0 0 12px ${KYBER}`,
                    `0 0 6px ${KYBER}`,
                  ]
                  : "none",
              }}
              transition={{
                duration: 0.9 + i * 0.15,
                repeat: Infinity,
                delay: i * 0.18,
              }}
              style={{
                width: 5,
                height: h,
                borderRadius: 2,
                background: KYBER,
                flexShrink: 0,
              }}
            />
          ))}
          <span
            style={{
              fontFamily: ORBITRON,
              fontSize: "0.52rem",
              color: hovered
                ? "rgba(0,200,255,0.7)"
                : "rgba(0,200,255,0.35)",
              letterSpacing: "0.2em",
              marginLeft: 8,
              transition: "color 0.3s",
              alignSelf: "center",
            }}
          >
            SIGNAL: OPTIMAL
          </span>
        </div>

        {/* ── Divider ──────────────────────────────────────────────────────── */}
        <div
          style={{
            width: "100%",
            height: 1,
            background:
              "linear-gradient(to right, transparent, rgba(0,200,255,0.18), transparent)",
            marginBottom: 18,
            zIndex: 1,
          }}
        />

        {/* ── Hover-reveal CTA ─────────────────────────────────────────────── */}
        <motion.div
          animate={{
            opacity: hovered ? 1 : 0.28,
            y: hovered ? 0 : 3,
          }}
          transition={{ duration: 0.25 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: ORBITRON,
            fontSize: "0.65rem",
            color: KYBER,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            zIndex: 1,
          }}
        >
          <span>Initiate Connection</span>
          <motion.span
            animate={{ x: hovered ? [0, 4, 0] : 0 }}
            transition={{
              duration: 0.9,
              repeat: hovered ? Infinity : 0,
            }}
          >
            →
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.a>
  );
}

function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-80px 0px",
  });

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding:
          "clamp(80px, 12vw, 140px) clamp(24px, 6vw, 100px)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(to right, transparent, rgba(0,200,255,0.12) 20%, rgba(0,200,255,0.12) 80%, transparent)",
        }}
      />

      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={stagger}
      >
        {/* Section label — full width */}
        <motion.div
          variants={fadeUp}
          style={{ marginBottom: 48 }}
        >
          <SectionLabel index="03" label="Comms Channel" />
        </motion.div>

        {/* ── Two-column grid ─────────────────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: "clamp(40px, 6vw, 80px)",
            alignItems: "center",
          }}
        >
          {/* ── LEFT: existing contact content ──────────────────────────── */}
          <motion.div variants={stagger}>
            <motion.div variants={fadeUp}>
              <h2
                style={{
                  fontFamily: ORBITRON,
                  fontSize: "clamp(1.8rem, 6vw, 4rem)",
                  fontWeight: 900,
                  color: "#E8EAED",
                  margin: "0 0 20px",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.0,
                }}
              >
                INITIATE
                <br />
                <span
                  style={{
                    WebkitTextStroke:
                      "1px rgba(0,200,255,0.55)",
                    color: "transparent",
                  }}
                >
                  CONTACT
                </span>
              </h2>
            </motion.div>

            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: INTER,
                fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
                color: "#8892A4",
                lineHeight: 1.75,
                maxWidth: 440,
                margin: "0 0 40px",
              }}
            >
              Open to new missions, full-time positions, and
              galactic-scale collaborations. May the code be
              with you.
            </motion.p>

            <motion.div
              variants={fadeUp}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
              }}
            >
              <CtaButton
                href="mailto:contact@example.com"
                icon={<Mail size={15} />}
                color={SITH}
              >
                Send Transmission
              </CtaButton>
              <CtaButton
                href="https://github.com/anurag2796"
                icon={<Github size={15} />}
                color={KYBER}
              >
                GitHub Alliance
              </CtaButton>
              <CtaButton
                href="/resume.pdf"
                icon={<FileText size={15} />}
                color="#2EF8A0"
                download
              >
                Download Resume
              </CtaButton>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: LinkedIn Holo-Net module ─────────────────────────── */}
          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <LinkedInModule />
          </motion.div>
        </div>
      </motion.div>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        style={{
          marginTop: 80,
          paddingTop: 32,
          borderTop: "1px solid rgba(0,200,255,0.07)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: ORBITRON,
            fontSize: "0.65rem",
            color: "rgba(0,200,255,0.35)",
            letterSpacing: "0.15em",
          }}
        >
          A.LNU
        </span>
        <span
          style={{
            fontFamily: INTER,
            fontSize: "0.78rem",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          © 2026 Anurag Lnu. May the Code be with you.
        </span>
        <span
          style={{
            fontFamily: ORBITRON,
            fontSize: "0.6rem",
            color: "rgba(0,200,255,0.25)",
            letterSpacing: "0.2em",
          }}
        >
          <Zap
            size={9}
            style={{
              display: "inline",
              marginRight: 5,
              verticalAlign: "middle",
            }}
          />
          PORTFOLIO v2.0
        </span>
      </motion.div>
    </section>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
export function HomePage() {
  return (
    <div>
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}