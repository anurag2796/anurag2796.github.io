import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const KYBER = "#00C8FF";
const ORBITRON = "'Orbitron', sans-serif";

const lines = [
  "INITIALIZING JEDI ARCHIVES...",
  "CONNECTING TO GITHUB ALLIANCE...",
  "CALIBRATING FORCE SENSORS...",
  "SYSTEM ONLINE",
];

interface IntroSplashProps {
  onComplete: () => void;
}

export function IntroSplash({ onComplete }: IntroSplashProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Animate progress bar
    const duration = 2200;
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);

    // Cycle through status lines
    const intervals: ReturnType<typeof setTimeout>[] = [];
    lines.forEach((_, i) => {
      if (i === 0) return;
      intervals.push(
        setTimeout(() => setLineIndex(i), (i / lines.length) * duration)
      );
    });

    // Exit after completion
    const exit = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 600);
    }, duration + 200);

    return () => {
      cancelAnimationFrame(raf);
      intervals.forEach(clearTimeout);
      clearTimeout(exit);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            background: "#04050E",
            zIndex: 99999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
          }}
        >
          {/* Star-dot background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `
                radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 2px),
                radial-gradient(white, rgba(255,255,255,.08) 1px, transparent 2px)
              `,
              backgroundSize: "300px 300px, 200px 200px",
              backgroundPosition: "0 0, 60px 80px",
              opacity: 0.4,
              pointerEvents: "none",
            }}
          />

          {/* Central content */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 32,
              padding: "0 24px",
              maxWidth: 480,
              width: "100%",
            }}
          >
            {/* Logo / Identity */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ textAlign: "center" }}
            >
              {/* Hexagon icon */}
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                style={{ marginBottom: 20 }}
              >
                {/* Outer hex */}
                <polygon
                  points="32,4 58,18 58,46 32,60 6,46 6,18"
                  stroke={KYBER}
                  strokeWidth="1"
                  fill="none"
                  opacity="0.4"
                />
                {/* Inner hex */}
                <polygon
                  points="32,14 50,24 50,44 32,54 14,44 14,24"
                  stroke={KYBER}
                  strokeWidth="0.8"
                  fill="rgba(0,200,255,0.04)"
                  opacity="0.7"
                />
                {/* Center crosshair */}
                <line x1="32" y1="24" x2="32" y2="40" stroke={KYBER} strokeWidth="1" opacity="0.6" />
                <line x1="24" y1="32" x2="40" y2="32" stroke={KYBER} strokeWidth="1" opacity="0.6" />
                <circle cx="32" cy="32" r="2.5" fill={KYBER} opacity="0.9" />
                {/* Blinking dot */}
                <motion.circle
                  cx="32"
                  cy="32"
                  r="5"
                  stroke={KYBER}
                  strokeWidth="1"
                  fill="none"
                  animate={{ opacity: [0.8, 0.2, 0.8], r: [5, 7, 5] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              </svg>

              <div
                style={{
                  fontFamily: ORBITRON,
                  fontSize: "clamp(1.4rem, 6vw, 2rem)",
                  fontWeight: 900,
                  color: "#FFFFFF",
                  letterSpacing: "0.15em",
                  marginBottom: 6,
                }}
              >
                A.LNU
              </div>
              <div
                style={{
                  fontFamily: ORBITRON,
                  fontSize: "0.6rem",
                  color: "rgba(0,200,255,0.45)",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                }}
              >
                PORTFOLIO&nbsp;&nbsp;◆&nbsp;&nbsp;2026
              </div>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ width: "100%" }}
            >
              {/* Track */}
              <div
                style={{
                  width: "100%",
                  height: 2,
                  background: "rgba(0,200,255,0.1)",
                  borderRadius: 2,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <motion.div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    background: `linear-gradient(to right, ${KYBER}, rgba(0,200,255,0.5))`,
                    boxShadow: `0 0 10px ${KYBER}`,
                    width: `${progress}%`,
                    borderRadius: 2,
                  }}
                />
              </div>

              {/* Percentage & label row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 12,
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={lines[lineIndex]}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      fontFamily: ORBITRON,
                      fontSize: "0.6rem",
                      color: "rgba(0,200,255,0.5)",
                      letterSpacing: "0.18em",
                    }}
                  >
                    {lines[lineIndex]}
                  </motion.span>
                </AnimatePresence>
                <span
                  style={{
                    fontFamily: ORBITRON,
                    fontSize: "0.65rem",
                    color: KYBER,
                    letterSpacing: "0.1em",
                    minWidth: 40,
                    textAlign: "right",
                  }}
                >
                  {Math.round(progress)}%
                </span>
              </div>
            </motion.div>

            {/* Bottom decorative schematic lines */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: "linear-gradient(to right, transparent, rgba(0,200,255,0.15))",
                }}
              />
              <span
                style={{
                  fontFamily: ORBITRON,
                  fontSize: "0.52rem",
                  color: "rgba(0,200,255,0.2)",
                  letterSpacing: "0.2em",
                  whiteSpace: "nowrap",
                }}
              >
                GALACTIC STANDARD TIME
              </span>
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: "linear-gradient(to left, transparent, rgba(0,200,255,0.15))",
                }}
              />
            </motion.div>
          </div>

          {/* Corner brackets */}
          {[
            { top: 24, left: 24 },
            { top: 24, right: 24 },
            { bottom: 24, left: 24 },
            { bottom: 24, right: 24 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.4 + i * 0.06 }}
              style={{ position: "absolute", ...pos }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                {i === 0 && <path d="M0 8 L0 0 L8 0" stroke={KYBER} strokeWidth="1.5" />}
                {i === 1 && <path d="M20 8 L20 0 L12 0" stroke={KYBER} strokeWidth="1.5" />}
                {i === 2 && <path d="M0 12 L0 20 L8 20" stroke={KYBER} strokeWidth="1.5" />}
                {i === 3 && <path d="M20 12 L20 20 L12 20" stroke={KYBER} strokeWidth="1.5" />}
              </svg>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
