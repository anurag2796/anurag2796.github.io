import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router";
import type { GitHubRepo } from "../services/github";
import { getLanguageColor } from "../services/github";

const KYBER = "#00C8FF";
const CARD_HEIGHT = 360;
const DESC_HEIGHT = 72; // fixed px — ~3 lines at 0.84rem × 1.7

interface TiltCardProps {
  repo: GitHubRepo;
  index: number;
  description: string; // pre-resolved, already trimmed to ≤120 chars
}

export function TiltCard({ repo, index, description }: TiltCardProps) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const ry = ((e.clientX - cx) / (rect.width / 2)) * 11;
    const rx = -((e.clientY - cy) / (rect.height / 2)) * 11;
    setTilt({ rx, ry });
    setGlare({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 0.1,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
    setHovered(false);
  };

  const langColor = getLanguageColor(repo.language);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{
        perspective: "1000px",
        flexShrink: 0,
        width: "clamp(280px, 85vw, 320px)",
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setHovered(true)}
        onClick={() => navigate(`/project/${repo.name}`)}
        whileTap={{ scale: 0.97 }}
        animate={{
          rotateX: tilt.rx,
          rotateY: tilt.ry,
          boxShadow: hovered
            ? "0 24px 64px rgba(0,0,0,0.6), 0 0 40px rgba(0,200,255,0.08)"
            : "0 6px 24px rgba(0,0,0,0.35)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: `1px solid ${hovered ? "rgba(0,200,255,0.32)" : "rgba(0,200,255,0.11)"}`,
          borderRadius: 12,
          padding: "26px 26px 24px",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          transformStyle: "preserve-3d",
          height: CARD_HEIGHT,
          display: "flex",
          flexDirection: "column",
          transition: "border-color 0.3s",
        }}
      >
        {/* ── Metallic glare overlay ──────────────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 12,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 65%)`,
            pointerEvents: "none",
            transition: "opacity 0.15s",
          }}
        />

        {/* ── Top-right HUD corner ─────────────────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            opacity: hovered ? 0.7 : 0.25,
            transition: "opacity 0.3s",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M36 0 L36 14 M36 0 L22 0" stroke={KYBER} strokeWidth="1.2" />
          </svg>
        </div>

        {/* ── Bottom-left HUD corner ───────────────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            opacity: hovered ? 0.7 : 0.25,
            transition: "opacity 0.3s",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M0 36 L0 22 M0 36 L14 36" stroke={KYBER} strokeWidth="1.2" />
          </svg>
        </div>

        {/* ── Language badge ───────────────────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          {repo.language && (
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: langColor,
                boxShadow: `0 0 7px ${langColor}`,
                flexShrink: 0,
              }}
            />
          )}
          <span
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "0.62rem",
              color: "rgba(0,200,255,0.55)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {repo.language || "Repository"}
          </span>
        </div>

        {/* ── Repo name ────────────────────────────────────────────────────── */}
        <h3
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "clamp(0.88rem, 1.8vw, 1.02rem)",
            color: hovered ? "#FFFFFF" : "#E8EAED",
            margin: "12px 0 0",
            lineHeight: 1.35,
            transition: "color 0.2s",
            wordBreak: "break-word",
            flexShrink: 0,
            // clamp to 2 lines max
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {repo.name}
        </h3>

        {/* ── Description with fade-out gradient ──────────────────────────── */}
        <div
          style={{
            position: "relative",
            height: DESC_HEIGHT,
            flexShrink: 0,
            overflow: "hidden",
            marginTop: 10,
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "0.84rem",
              color: "#8892A4",
              lineHeight: 1.72,
              margin: 0,
            }}
          >
            {description}
          </p>
          {/* Fade-out gradient anchored to bottom of description container */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 34,
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(6,7,18,0.96) 100%)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* ── Topics ───────────────────────────────────────────────────────── */}
        {repo.topics && repo.topics.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 5,
              marginTop: 12,
              flexShrink: 0,
            }}
          >
            {repo.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "0.56rem",
                  color: KYBER,
                  background: "rgba(0,200,255,0.07)",
                  border: "1px solid rgba(0,200,255,0.18)",
                  padding: "2px 8px",
                  borderRadius: 3,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* ── Spacer — pushes stats to the very bottom ─────────────────────── */}
        <div style={{ flex: 1 }} />

        {/* ── Stats footer ─────────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(0,200,255,0.07)",
            paddingTop: 13,
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", gap: 16 }}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                color: "#8892A4",
                fontSize: "0.8rem",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <Star size={12} style={{ color: "#FFE81F" }} />
              {repo.stargazers_count}
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                color: "#8892A4",
                fontSize: "0.8rem",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <GitFork size={12} />
              {repo.forks_count}
            </span>
          </div>
          <motion.span
            animate={{ x: hovered ? 5 : 0, opacity: hovered ? 1 : 0.5 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              color: KYBER,
              fontSize: "0.68rem",
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: "0.1em",
            }}
          >
            EXPLORE <ExternalLink size={10} />
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}
