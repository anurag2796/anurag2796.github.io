import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  const dotX = useSpring(rawX, { damping: 30, stiffness: 500 });
  const dotY = useSpring(rawY, { damping: 30, stiffness: 500 });
  const ringX = useSpring(rawX, { damping: 28, stiffness: 200 });
  const ringY = useSpring(rawY, { damping: 28, stiffness: 200 });

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-hover]")) setHovering(true);
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-hover]")) setHovering(false);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, [visible]);

  if (!visible) return null;

  const KYBER = "#00C8FF";
  const SITH = "#FF1744";

  return (
    <>
      {/* Main dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99999,
          pointerEvents: "none",
          width: hovering ? 10 : 6,
          height: hovering ? 10 : 6,
          borderRadius: "50%",
          background: hovering ? SITH : KYBER,
          boxShadow: hovering
            ? `0 0 12px ${SITH}, 0 0 24px rgba(255,23,68,0.5)`
            : `0 0 8px ${KYBER}, 0 0 16px rgba(0,200,255,0.4)`,
          transition: "width 0.2s, height 0.2s, background 0.2s, box-shadow 0.2s",
        }}
        animate={{ scale: clicking ? 0.5 : 1 }}
        transition={{ duration: 0.08 }}
      />

      {/* Crosshair ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99998,
          pointerEvents: "none",
        }}
        animate={{
          width: hovering ? 52 : 34,
          height: hovering ? 52 : 34,
          opacity: 0.8,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Horizontal */}
          <line x1="0" y1="26" x2="20" y2="26" stroke={KYBER} strokeWidth="0.8" opacity="0.7" />
          <line x1="32" y1="26" x2="52" y2="26" stroke={KYBER} strokeWidth="0.8" opacity="0.7" />
          {/* Vertical */}
          <line x1="26" y1="0" x2="26" y2="20" stroke={KYBER} strokeWidth="0.8" opacity="0.7" />
          <line x1="26" y1="32" x2="26" y2="52" stroke={KYBER} strokeWidth="0.8" opacity="0.7" />
          {/* Corner brackets on hover */}
          {hovering && (
            <>
              <path d="M4 12 L4 4 L12 4" stroke={SITH} strokeWidth="1.5" />
              <path d="M48 12 L48 4 L40 4" stroke={SITH} strokeWidth="1.5" />
              <path d="M4 40 L4 48 L12 48" stroke={SITH} strokeWidth="1.5" />
              <path d="M48 40 L48 48 L40 48" stroke={SITH} strokeWidth="1.5" />
            </>
          )}
        </svg>
      </motion.div>
    </>
  );
}
