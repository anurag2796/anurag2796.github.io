import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowLeft,
  Star,
  GitFork,
  Eye,
  AlertCircle,
  ExternalLink,
  Github,
  Code2,
  Calendar,
  GitBranch,
  ChevronRight,
  Loader2,
  FileText,
  Radio,
  Cpu,
  Zap,
} from "lucide-react";
import {
  fetchRepo,
  fetchReadme,
  fetchLanguages,
  type GitHubRepo,
  type GitHubLanguages,
  getLanguageColor,
} from "@/services/github";
import { MarkdownRenderer, slugify } from "@/components/MarkdownRenderer";

// ─── Constants ────────────────────────────────────────────────────────────────
const KYBER = "#00C8FF";
const SITH = "#FF1744";
const GOLD = "#FFE81F";
const GREEN = "#2EF8A0";
const ORBITRON = "'Orbitron', sans-serif";
const INTER = "'Inter', system-ui, sans-serif";
const MONO = "'JetBrains Mono', 'Fira Code', 'Courier New', monospace";

const BANNER_URL =
  "https://images.unsplash.com/photo-1627645812426-67ce7b0a7a81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2ktZmklMjBob2xvZ3JhcGhpYyUyMGJsdWVwcmludCUyMG5lb24lMjBjeWFuJTIwc3BhY2UlMjBibGFja3xlbnwxfHx8fDE3NzE5NjkxNTh8MA&ixlib=rb-4.1.0&q=80&w=1920";

// ─── Types ────────────────────────────────────────────────────────────────────
interface TocItem {
  level: 1 | 2 | 3;
  text: string;
  id: string;
}

// ─── Utilities ────────────────────────────────────────────────────────────────
function extractToc(markdown: string): TocItem[] {
  const lines = markdown.split("\n");
  const items: TocItem[] = [];
  for (const line of lines) {
    const h1 = line.match(/^# (.*)/);
    const h2 = line.match(/^## (.*)/);
    const h3 = line.match(/^### (.*)/);
    if (h1) items.push({ level: 1, text: h1[1], id: slugify(h1[1]) });
    else if (h2) items.push({ level: 2, text: h2[1], id: slugify(h2[1]) });
    else if (h3) items.push({ level: 3, text: h3[1], id: slugify(h3[1]) });
  }
  return items;
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ value, color = KYBER }: { value: number; color?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 1200;
    const steps = 50;
    const inc = value / steps;
    let cur = 0;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= value) { setCount(value); clearInterval(t); }
      else setCount(Math.floor(cur));
    }, duration / steps);
    return () => clearInterval(t);
  }, [value]);

  return (
    <span
      style={{
        fontFamily: MONO,
        fontSize: "1.6rem",
        color,
        fontWeight: 700,
        letterSpacing: "-0.02em",
        textShadow: `0 0 20px ${color}60`,
      }}
    >
      {count.toLocaleString()}
    </span>
  );
}

// ─── Console Button (Tactile) ─────────────────────────────────────────────────
function ConsoleButton({
  href,
  icon,
  children,
  color = KYBER,
  fullWidth = false,
}: {
  href: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  color?: string;
  fullWidth?: boolean;
}) {
  const [pressed, setPressed] = useState(false);
  const [hov, setHov] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      animate={{
        y: pressed ? 2 : 0,
        scale: pressed ? 0.98 : 1,
      }}
      transition={{ type: "spring", stiffness: 600, damping: 30 }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 9,
        padding: "13px 20px",
        borderRadius: 7,
        fontFamily: ORBITRON,
        fontSize: "0.68rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        textDecoration: "none",
        cursor: "pointer",
        width: fullWidth ? "100%" : undefined,
        border: `1px solid ${hov ? `${color}70` : `${color}35`}`,
        color: hov ? "#fff" : color,
        background: hov
          ? `linear-gradient(180deg, ${color}30 0%, ${color}12 100%)`
          : `linear-gradient(180deg, ${color}14 0%, ${color}06 100%)`,
        boxShadow: pressed
          ? `inset 0 3px 6px rgba(0,0,0,0.6), inset 0 1px 0 rgba(0,0,0,0.4)`
          : hov
            ? `inset 0 1px 0 ${color}40, inset 0 -2px 0 rgba(0,0,0,0.5), 0 0 24px ${color}35, 0 4px 12px rgba(0,0,0,0.4)`
            : `inset 0 1px 0 ${color}20, inset 0 -2px 0 rgba(0,0,0,0.4), 0 0 10px ${color}15, 0 2px 8px rgba(0,0,0,0.3)`,
        transition: "all 0.18s ease",
      }}
    >
      {icon && <span style={{ display: "flex", opacity: hov ? 1 : 0.8 }}>{icon}</span>}
      {children}
    </motion.a>
  );
}

// ─── Glowing Circuit Divider ──────────────────────────────────────────────────
function CircuitDivider({ vertical = false }: { vertical?: boolean }) {
  if (vertical) {
    return (
      <div
        style={{
          width: 1,
          alignSelf: "stretch",
          background: `linear-gradient(to bottom,
            transparent 0%,
            rgba(0,200,255,0.15) 10%,
            rgba(0,200,255,0.08) 50%,
            rgba(0,200,255,0.15) 90%,
            transparent 100%
          )`,
          boxShadow: "0 0 8px rgba(0,200,255,0.06)",
          flexShrink: 0,
          position: "relative",
        }}
      >
        {/* Circuit nodes */}
        {[20, 50, 80].map((pct) => (
          <div
            key={pct}
            style={{
              position: "absolute",
              top: `${pct}%`,
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: KYBER,
              boxShadow: `0 0 6px ${KYBER}`,
              opacity: 0.5,
            }}
          />
        ))}
      </div>
    );
  }
  return (
    <div
      style={{
        height: 1,
        background: `linear-gradient(to right,
          transparent 0%,
          rgba(0,200,255,0.15) 20%,
          rgba(0,200,255,0.08) 50%,
          rgba(0,200,255,0.15) 80%,
          transparent 100%
        )`,
        boxShadow: "0 0 6px rgba(0,200,255,0.04)",
        margin: "0",
      }}
    />
  );
}

// ─── Nav Computer (Left ToC Sidebar) ─────────────────────────────────────────
function NavComputer({
  items,
  activeId,
  onSelect,
}: {
  items: TocItem[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <aside
      className="hidden xl:flex"
      style={{
        width: 230,
        flexShrink: 0,
        position: "sticky",
        top: 80,
        alignSelf: "flex-start",
        height: "calc(100vh - 100px)",
        overflowY: "auto",
        scrollbarWidth: "none",
        paddingTop: 40,
        paddingBottom: 40,
        paddingRight: 20,
        flexDirection: "column",
      }}
    >
      {/* Panel header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 24,
          paddingBottom: 14,
          borderBottom: "1px solid rgba(0,200,255,0.08)",
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 5,
            background: "rgba(0,200,255,0.08)",
            border: "1px solid rgba(0,200,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Radio size={12} color={KYBER} />
        </div>
        <span
          style={{
            fontFamily: ORBITRON,
            fontSize: "0.58rem",
            color: "rgba(0,200,255,0.5)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          Nav-Computer
        </span>
      </div>

      {items.length === 0 ? (
        <p
          style={{
            fontFamily: INTER,
            fontSize: "0.8rem",
            color: "rgba(0,200,255,0.25)",
            lineHeight: 1.6,
          }}
        >
          No sections detected.
        </p>
      ) : (
        <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {items.map((item, idx) => {
            const isActive = activeId === item.id;
            const indent = item.level === 1 ? 0 : item.level === 2 ? 14 : 26;

            return (
              <button
                key={`${item.id}-${idx}`}
                onClick={() => onSelect(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: `7px 10px 7px ${10 + indent}px`,
                  background: isActive ? "rgba(0,200,255,0.07)" : "transparent",
                  border: isActive
                    ? "1px solid rgba(0,200,255,0.18)"
                    : "1px solid transparent",
                  borderRadius: 5,
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                  transition: "all 0.2s ease",
                  boxShadow: isActive ? `0 0 12px rgba(0,200,255,0.08)` : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(0,200,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {/* Imperial rank cylinder bullet */}
                <div
                  style={{
                    width: item.level === 1 ? 12 : item.level === 2 ? 9 : 6,
                    height: item.level === 1 ? 6 : 4,
                    borderRadius: 2,
                    background: isActive ? KYBER : `rgba(0,200,255,${item.level === 1 ? 0.4 : 0.22})`,
                    boxShadow: isActive ? `0 0 8px ${KYBER}80` : "none",
                    flexShrink: 0,
                    transition: "all 0.2s ease",
                  }}
                />
                <span
                  style={{
                    fontFamily: INTER,
                    fontSize: item.level === 1 ? "0.78rem" : "0.72rem",
                    color: isActive ? "#C8D0DC" : "rgba(136,146,164,0.7)",
                    lineHeight: 1.4,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: 160,
                    transition: "color 0.2s ease",
                  }}
                >
                  {item.text}
                </span>
                {isActive && (
                  <div
                    style={{
                      marginLeft: "auto",
                      width: 3,
                      height: 3,
                      borderRadius: "50%",
                      background: KYBER,
                      boxShadow: `0 0 6px ${KYBER}`,
                      flexShrink: 0,
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      )}

      {/* Bottom decoration */}
      <div
        style={{
          marginTop: "auto",
          paddingTop: 20,
          borderTop: "1px solid rgba(0,200,255,0.06)",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <Zap size={10} color="rgba(0,200,255,0.2)" />
        <span
          style={{
            fontFamily: ORBITRON,
            fontSize: "0.5rem",
            color: "rgba(0,200,255,0.2)",
            letterSpacing: "0.2em",
          }}
        >
          SCROLL TO NAVIGATE
        </span>
      </div>
    </aside>
  );
}

// ─── Telemetry Panel (Right Sidebar) ─────────────────────────────────────────
function TelemetryPanel({
  repo,
  languages,
}: {
  repo: GitHubRepo;
  languages: GitHubLanguages;
}) {
  const totalBytes = Object.values(languages).reduce((s, v) => s + v, 0);
  const langBreakdown = Object.entries(languages)
    .map(([lang, bytes]) => ({
      lang,
      pct: totalBytes > 0 ? Math.round((bytes / totalBytes) * 100) : 0,
      color: getLanguageColor(lang),
    }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 6);

  const updatedDate = new Date(repo.updated_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <aside
      className="hidden lg:flex"
      style={{
        width: 250,
        flexShrink: 0,
        position: "sticky",
        top: 80,
        alignSelf: "flex-start",
        height: "calc(100vh - 100px)",
        overflowY: "auto",
        scrollbarWidth: "none",
        paddingTop: 40,
        paddingBottom: 40,
        paddingLeft: 24,
        flexDirection: "column",
        gap: 20,
      }}
    >
      {/* Panel header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          paddingBottom: 14,
          borderBottom: "1px solid rgba(0,200,255,0.08)",
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 5,
            background: "rgba(0,200,255,0.08)",
            border: "1px solid rgba(0,200,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Cpu size={12} color={KYBER} />
        </div>
        <span
          style={{
            fontFamily: ORBITRON,
            fontSize: "0.58rem",
            color: "rgba(0,200,255,0.5)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          Telemetry
        </span>
      </div>

      {/* Stats grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {[
          { Icon: Star, value: repo.stargazers_count, label: "Stars", color: GOLD },
          { Icon: GitFork, value: repo.forks_count, label: "Forks", color: GREEN },
          { Icon: Eye, value: repo.watchers_count, label: "Watchers", color: KYBER },
        ].map(({ Icon, value, label, color }) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 14px",
              background: "rgba(255,255,255,0.02)",
              border: `1px solid rgba(255,255,255,0.04)`,
              borderRadius: 7,
              marginBottom: 6,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icon size={13} color={color} />
              <span
                style={{
                  fontFamily: ORBITRON,
                  fontSize: "0.58rem",
                  color: "rgba(136,146,164,0.6)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </span>
            </div>
            <AnimatedCounter value={value} color={color} />
          </div>
        ))}
      </div>

      <CircuitDivider />

      {/* Language breakdown */}
      {langBreakdown.length > 0 && (
        <div>
          <p
            style={{
              fontFamily: ORBITRON,
              fontSize: "0.56rem",
              color: "rgba(0,200,255,0.4)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Language Matrix
          </p>

          {/* Multi-color bar */}
          <div
            style={{
              display: "flex",
              height: 6,
              borderRadius: 4,
              overflow: "hidden",
              marginBottom: 14,
              gap: 1,
            }}
          >
            {langBreakdown.map((l) => (
              <div
                key={l.lang}
                style={{
                  width: `${l.pct}%`,
                  background: l.color,
                  boxShadow: `0 0 8px ${l.color}80`,
                  transition: "width 1s ease",
                }}
              />
            ))}
          </div>

          {/* Legend */}
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {langBreakdown.map((l) => (
              <div
                key={l.lang}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: l.color,
                      boxShadow: `0 0 5px ${l.color}`,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: INTER,
                      fontSize: "0.78rem",
                      color: "#8892A4",
                    }}
                  >
                    {l.lang}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: "0.72rem",
                    color: l.color,
                  }}
                >
                  {l.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <CircuitDivider />

      {/* Meta info */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { icon: <Calendar size={11} color={KYBER} />, text: `Updated ${updatedDate}` },
          { icon: <GitBranch size={11} color={KYBER} />, text: `Branch: ${repo.default_branch}` },
          { icon: <AlertCircle size={11} color={SITH} />, text: `${repo.open_issues_count} open issues` },
          { icon: <FileText size={11} color="rgba(0,200,255,0.5)" />, text: `${(Math.round(repo.size / 1024 * 10) / 10) || "<1"} MB` },
        ].map(({ icon, text }) => (
          <div
            key={text}
            style={{ display: "flex", alignItems: "center", gap: 9 }}
          >
            {icon}
            <span
              style={{ fontFamily: INTER, fontSize: "0.76rem", color: "#8892A4" }}
            >
              {text}
            </span>
          </div>
        ))}
      </div>

      {/* Topics */}
      {repo.topics?.length > 0 && (
        <div>
          <p
            style={{
              fontFamily: ORBITRON,
              fontSize: "0.56rem",
              color: "rgba(0,200,255,0.4)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Tech Stack
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {repo.topics.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: ORBITRON,
                  fontSize: "0.55rem",
                  color: KYBER,
                  background: "rgba(0,200,255,0.06)",
                  border: "1px solid rgba(0,200,255,0.18)",
                  padding: "3px 8px",
                  borderRadius: 3,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      <CircuitDivider />

      {/* CTA Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <ConsoleButton
          href={repo.html_url}
          icon={<Github size={13} />}
          color={KYBER}
          fullWidth
        >
          Access GitHub
        </ConsoleButton>
        {repo.homepage ? (
          <ConsoleButton
            href={repo.homepage}
            icon={<ExternalLink size={13} />}
            color={GREEN}
            fullWidth
          >
            Deploy Demo
          </ConsoleButton>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "12px 20px",
              borderRadius: 7,
              border: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(255,255,255,0.02)",
              opacity: 0.4,
              cursor: "not-allowed",
            }}
          >
            <ExternalLink size={13} color="#8892A4" />
            <span
              style={{
                fontFamily: ORBITRON,
                fontSize: "0.68rem",
                color: "#8892A4",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              No Demo
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}

// ─── Datapad Hero ────────────────────────────────────────────────────────────
function DatapadHero({ repo }: { repo: GitHubRepo }) {
  const { scrollY } = useScroll();
  const bannerY = useTransform(scrollY, [0, 500], [0, 100]);
  const bannerOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);
  const langColor = getLanguageColor(repo.language);

  return (
    <div
      style={{
        position: "relative",
        height: "clamp(340px, 45vh, 480px)",
        overflow: "hidden",
      }}
    >
      {/* Parallax background image */}
      <motion.div
        style={{
          position: "absolute",
          inset: -60,
          backgroundImage: `url(${BANNER_URL})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          y: bannerY,
          opacity: bannerOpacity,
          filter: "brightness(0.35) hue-rotate(10deg) saturate(1.4)",
        }}
      />

      {/* Layered overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(to bottom, rgba(4,5,14,0.2) 0%, rgba(4,5,14,0.85) 100%),
            linear-gradient(to right, rgba(0,200,255,0.04) 0%, transparent 60%)
          `,
        }}
      />

      {/* Scan-line texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0,200,255,0.012) 3px,
            rgba(0,200,255,0.012) 4px
          )`,
          pointerEvents: "none",
        }}
      />

      {/* HUD corner decorations */}
      {[
        { top: 20, left: 20, borderTop: `2px solid ${KYBER}`, borderLeft: `2px solid ${KYBER}` },
        { top: 20, right: 20, borderTop: `2px solid ${KYBER}`, borderRight: `2px solid ${KYBER}` },
        { bottom: 20, left: 20, borderBottom: `2px solid ${KYBER}`, borderLeft: `2px solid ${KYBER}` },
        { bottom: 20, right: 20, borderBottom: `2px solid ${KYBER}`, borderRight: `2px solid ${KYBER}` },
      ].map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 28,
            height: 28,
            opacity: 0.4,
            ...s,
          }}
        />
      ))}

      {/* Main hero content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "clamp(20px, 4vw, 60px)",
        }}
      >
        {/* Status row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 16,
          }}
        >
          {repo.language && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "5px 12px",
                background: `${langColor}14`,
                border: `1px solid ${langColor}40`,
                borderRadius: 4,
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: langColor,
                  boxShadow: `0 0 7px ${langColor}`,
                }}
              />
              <span
                style={{
                  fontFamily: ORBITRON,
                  fontSize: "0.58rem",
                  color: langColor,
                  letterSpacing: "0.18em",
                }}
              >
                {repo.language}
              </span>
            </div>
          )}
          <span
            style={{
              fontFamily: ORBITRON,
              fontSize: "0.56rem",
              color: "rgba(0,200,255,0.35)",
              letterSpacing: "0.2em",
            }}
          >
            DATAPAD // MISSION RECORD
          </span>
        </motion.div>

        {/* Glassmorphism title card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "inline-block",
            maxWidth: "clamp(320px, 70%, 800px)",
            padding: "clamp(16px, 2vw, 24px) clamp(20px, 3vw, 36px)",
            background: "rgba(4,5,14,0.7)",
            backdropFilter: "blur(24px) saturate(160%)",
            WebkitBackdropFilter: "blur(24px) saturate(160%)",
            border: "1px solid rgba(0,200,255,0.12)",
            borderRadius: 10,
            borderLeft: `3px solid ${KYBER}`,
            boxShadow: `0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,200,255,0.06)`,
          }}
        >
          <h1
            style={{
              fontFamily: ORBITRON,
              fontSize: "clamp(1.4rem, 4vw, 2.8rem)",
              fontWeight: 900,
              color: "#E8EAED",
              margin: 0,
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
              textShadow: `0 0 40px rgba(0,200,255,0.2)`,
            }}
          >
            {repo.name.toUpperCase()}
          </h1>
          {repo.description && (
            <p
              style={{
                fontFamily: INTER,
                fontSize: "clamp(0.8rem, 1.5vw, 0.95rem)",
                color: "#8892A4",
                margin: "10px 0 0",
                lineHeight: 1.6,
                maxWidth: 560,
              }}
            >
              {repo.description}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// ─── Loading Screen ───────────────────────────────────────────────────────────
function DatapadLoading() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: 20,
      }}
    >
      <div style={{ position: "relative" }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 size={36} color={KYBER} />
        </motion.div>
        <div
          style={{
            position: "absolute",
            inset: -8,
            borderRadius: "50%",
            border: `1px solid rgba(0,200,255,0.15)`,
          }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <span
          style={{
            fontFamily: ORBITRON,
            fontSize: "0.68rem",
            color: "rgba(0,200,255,0.5)",
            letterSpacing: "0.3em",
            display: "block",
            marginBottom: 6,
          }}
        >
          ACCESSING DATAPAD…
        </span>
        <motion.span
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          style={{
            fontFamily: ORBITRON,
            fontSize: "0.55rem",
            color: "rgba(0,200,255,0.25)",
            letterSpacing: "0.2em",
          }}
        >
          DECRYPTING HOLOCRON DATA
        </motion.span>
      </div>
    </div>
  );
}

// ─── Error Screen ─────────────────────────────────────────────────────────────
function DatapadError({ name, onBack }: { name?: string; onBack: () => void }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: 24,
        padding: "0 24px",
        textAlign: "center",
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <AlertCircle size={52} color={SITH} style={{ filter: `drop-shadow(0 0 12px ${SITH}60)` }} />
      </motion.div>
      <div>
        <h2
          style={{
            fontFamily: ORBITRON,
            fontSize: "1.4rem",
            color: "#E8EAED",
            margin: "0 0 10px",
          }}
        >
          HOLOCRON NOT FOUND
        </h2>
        <p style={{ fontFamily: INTER, color: "#8892A4", margin: 0 }}>
          The repository "{name}" could not be retrieved from the Archives.
        </p>
      </div>
      <button
        onClick={onBack}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          padding: "13px 24px",
          borderRadius: 7,
          fontFamily: ORBITRON,
          fontSize: "0.68rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          cursor: "pointer",
          border: `1px solid ${KYBER}35`,
          color: KYBER,
          background: `linear-gradient(180deg, ${KYBER}14 0%, ${KYBER}06 100%)`,
          boxShadow: `inset 0 1px 0 ${KYBER}20, 0 0 10px ${KYBER}15`,
        }}
      >
        <ArrowLeft size={13} />
        Return to Archives
      </button>
    </div>
  );
}

// ─── Project Page ─────────────────────────────────────────────────────────────
export function ProjectPage() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  const [repo, setRepo] = useState<GitHubRepo | null>(null);
  const [readme, setReadme] = useState<string | null>(null);
  const [languages, setLanguages] = useState<GitHubLanguages>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const [tocItems, setTocItems] = useState<TocItem[]>([]);

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Fetch data
  useEffect(() => {
    if (!name) return;
    setLoading(true);
    setError(false);
    Promise.all([fetchRepo(name), fetchReadme(name), fetchLanguages(name)]).then(
      ([r, rm, langs]) => {
        if (!r) { setError(true); }
        else {
          setRepo(r);
          setReadme(rm);
          setLanguages(langs);
          if (rm) setTocItems(extractToc(rm));
        }
        setLoading(false);
      }
    );
  }, [name]);

  // Scroll-spy via IntersectionObserver
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!tocItems.length || !readme) return;

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-64px 0px -65% 0px", threshold: 0 }
    );

    // Wait for DOM to settle
    const timer = setTimeout(() => {
      tocItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) observerRef.current?.observe(el);
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
    };
  }, [tocItems, readme]);

  const handleTocSelect = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  }, []);

  // ── States ────────────────────────────────────────────────────────────────
  if (loading) return <DatapadLoading />;
  if (error || !repo) return <DatapadError name={name} onBack={() => navigate("/")} />;

  // ── Page ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", paddingTop: 64 }}>
      {/* Reading progress bar */}
      <div
        style={{
          position: "fixed",
          top: 63,
          left: 0,
          right: 0,
          height: 2,
          background: "rgba(0,200,255,0.06)",
          zIndex: 500,
        }}
      >
        <motion.div
          style={{
            height: "100%",
            background: `linear-gradient(to right, ${SITH}, ${KYBER}, ${GREEN})`,
            width: progressWidth,
            boxShadow: `0 0 10px ${KYBER}80`,
          }}
        />
      </div>

      {/* Background schematic grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,200,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,200,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Back nav & breadcrumb */}
        <div
          style={{
            padding: "16px clamp(20px, 5vw, 60px)",
            borderBottom: "1px solid rgba(0,200,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <motion.button
            onClick={() => navigate("/")}
            whileHover={{ x: -4 }}
            data-hover
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              background: "none",
              border: "none",
              color: "rgba(0,200,255,0.55)",
              fontFamily: ORBITRON,
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              cursor: "pointer",
              padding: 0,
              textTransform: "uppercase",
            }}
          >
            <ArrowLeft size={13} />
            Return to Archives
          </motion.button>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span
              style={{
                fontFamily: ORBITRON,
                fontSize: "0.56rem",
                color: "rgba(0,200,255,0.25)",
                letterSpacing: "0.14em",
              }}
            >
              HOLOCRON
            </span>
            <ChevronRight size={9} color="rgba(0,200,255,0.2)" />
            <span
              style={{
                fontFamily: ORBITRON,
                fontSize: "0.56rem",
                color: "rgba(0,200,255,0.5)",
                letterSpacing: "0.14em",
              }}
            >
              {repo.name.toUpperCase()}
            </span>
          </div>
        </div>

        {/* ── Cinematic Hero Banner ─────────────────────────────────────────── */}
        <DatapadHero repo={repo} />

        <CircuitDivider />

        {/* ── Mobile stats (below hero) ─────────────────────────────────────── */}
        <div
          className="flex lg:hidden"
          style={{
            padding: "20px clamp(16px, 4vw, 40px)",
            gap: 10,
            flexWrap: "wrap",
            borderBottom: "1px solid rgba(0,200,255,0.06)",
          }}
        >
          {[
            { Icon: Star, v: repo.stargazers_count, c: GOLD },
            { Icon: GitFork, v: repo.forks_count, c: GREEN },
            { Icon: Eye, v: repo.watchers_count, c: KYBER },
          ].map(({ Icon, v, c }) => (
            <div
              key={c}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "8px 14px",
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${c}25`,
                borderRadius: 6,
              }}
            >
              <Icon size={12} color={c} />
              <span style={{ fontFamily: MONO, fontSize: "0.9rem", color: c }}>
                {v}
              </span>
            </div>
          ))}
          <ConsoleButton href={repo.html_url} icon={<Github size={12} />} color={KYBER}>
            GitHub
          </ConsoleButton>
          {repo.homepage && (
            <ConsoleButton href={repo.homepage} icon={<ExternalLink size={12} />} color={GREEN}>
              Demo
            </ConsoleButton>
          )}
        </div>

        {/* ── 3-Column Command Console ──────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            maxWidth: 1480,
            margin: "0 auto",
            padding: "0 clamp(16px, 4vw, 48px)",
          }}
        >
          {/* LEFT — Nav Computer */}
          <NavComputer
            items={tocItems}
            activeId={activeId}
            onSelect={handleTocSelect}
          />

          {/* Vertical divider (left) */}
          <div className="hidden xl:flex" style={{ paddingTop: 40 }}>
            <CircuitDivider vertical />
          </div>

          {/* CENTER — Main Readout */}
          <motion.main
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{
              flex: 1,
              minWidth: 0,
              paddingTop: 40,
              paddingBottom: 80,
              paddingLeft: "clamp(0px, 2vw, 36px)",
              paddingRight: "clamp(0px, 2vw, 36px)",
            }}
          >
            {/* Section label */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 28,
                paddingBottom: 16,
                borderBottom: "1px solid rgba(0,200,255,0.07)",
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 6,
                  background: "rgba(0,200,255,0.07)",
                  border: "1px solid rgba(0,200,255,0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Code2 size={14} color={KYBER} />
              </div>
              <div>
                <span
                  style={{
                    fontFamily: ORBITRON,
                    fontSize: "0.65rem",
                    color: "rgba(0,200,255,0.45)",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    display: "block",
                  }}
                >
                  Main Readout
                </span>
                <span
                  style={{
                    fontFamily: ORBITRON,
                    fontSize: "0.52rem",
                    color: "rgba(0,200,255,0.22)",
                    letterSpacing: "0.15em",
                  }}
                >
                  README.md — DATAPAD RECORD
                </span>
              </div>
            </div>

            {readme ? (
              <MarkdownRenderer content={readme} />
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 320,
                  gap: 16,
                  border: "1px dashed rgba(0,200,255,0.10)",
                  borderRadius: 12,
                  padding: 48,
                  textAlign: "center",
                  background: "rgba(0,200,255,0.01)",
                }}
              >
                <Code2 size={48} color="rgba(0,200,255,0.15)" />
                <h3
                  style={{
                    fontFamily: ORBITRON,
                    fontSize: "0.9rem",
                    color: "#8892A4",
                    margin: 0,
                    letterSpacing: "0.1em",
                  }}
                >
                  NO DATAPAD FOUND
                </h3>
                <p
                  style={{
                    fontFamily: INTER,
                    fontSize: "0.84rem",
                    color: "rgba(0,200,255,0.3)",
                    margin: 0,
                  }}
                >
                  This repository has no README.md in the archives.
                </p>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginTop: 8,
                    fontFamily: ORBITRON,
                    fontSize: "0.68rem",
                    color: KYBER,
                    textDecoration: "none",
                    letterSpacing: "0.1em",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  View on GitHub <ExternalLink size={12} />
                </a>
              </div>
            )}
          </motion.main>

          {/* Vertical divider (right) */}
          <div className="hidden lg:flex" style={{ paddingTop: 40 }}>
            <CircuitDivider vertical />
          </div>

          {/* RIGHT — Telemetry Panel */}
          <TelemetryPanel repo={repo} languages={languages} />
        </div>
      </div>
    </div>
  );
}