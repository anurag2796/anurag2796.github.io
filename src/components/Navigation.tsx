import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion, useMotionValue, useSpring } from "motion/react";

const KYBER = "#00C8FF";

function MagneticLink({
  children,
  href,
  onClick,
  active,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 20, stiffness: 400 });
  const sy = useSpring(y, { damping: 20, stiffness: 400 });

  const onMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const style = {
    x: sx,
    y: sy,
    display: "inline-block",
    color: active ? KYBER : "#8892A4",
    fontSize: "0.8rem",
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: "0.12em",
    textDecoration: "none",
    transition: "color 0.2s",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: "6px 12px",
    textTransform: "uppercase" as const,
  };

  if (href) {
    return (
      <motion.a
        href={href}
        style={style}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClick}
        whileHover={{ color: KYBER }}
      >
        {children}
        {active && (
          <motion.div
            layoutId="nav-underline"
            style={{
              height: 1,
              background: KYBER,
              boxShadow: `0 0 6px ${KYBER}`,
              marginTop: 2,
            }}
          />
        )}
      </motion.a>
    );
  }

  return (
    <motion.button
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      whileHover={{ color: KYBER }}
    >
      {children}
      {active && (
        <motion.div
          layoutId="nav-underline"
          style={{
            height: 1,
            background: KYBER,
            boxShadow: `0 0 6px ${KYBER}`,
            marginTop: 2,
          }}
        />
      )}
    </motion.button>
  );
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    if (!isHome) {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Command Center", action: () => scrollTo("hero") },
    { label: "Holocron", action: () => scrollTo("projects") },
    { label: "Abilities", action: () => scrollTo("skills") },
    { label: "Contact", action: () => scrollTo("contact") },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "0 24px",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled
          ? "rgba(4, 5, 14, 0.88)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(0, 200, 255, 0.1)"
          : "1px solid transparent",
        transition: "background 0.4s, backdrop-filter 0.4s, border-color 0.4s",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          color: KYBER,
          fontSize: "1.1rem",
          fontWeight: 900,
          letterSpacing: "0.18em",
          textDecoration: "none",
          textShadow: `0 0 10px rgba(0,200,255,0.5)`,
        }}
      >
        A.LNU
      </Link>

      {/* Desktop Links */}
      <div
        style={{
          display: "flex",
          gap: 4,
          alignItems: "center",
        }}
        className="hidden md:flex"
      >
        {navLinks.map((link) => (
          <MagneticLink key={link.label} onClick={link.action}>
            {link.label}
          </MagneticLink>
        ))}
        <a
          href="https://github.com/anurag2796"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginLeft: 12,
            padding: "7px 18px",
            border: `1px solid ${KYBER}`,
            borderRadius: 4,
            color: KYBER,
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "0.72rem",
            letterSpacing: "0.1em",
            textDecoration: "none",
            textTransform: "uppercase",
            boxShadow: `0 0 8px rgba(0,200,255,0.2)`,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.background = "rgba(0,200,255,0.1)";
            (e.target as HTMLElement).style.boxShadow = `0 0 16px rgba(0,200,255,0.4)`;
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.background = "transparent";
            (e.target as HTMLElement).style.boxShadow = `0 0 8px rgba(0,200,255,0.2)`;
          }}
        >
          GitHub
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="flex md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 8,
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              rotate: mobileOpen
                ? i === 0 ? 45 : i === 2 ? -45 : 0
                : 0,
              y: mobileOpen
                ? i === 0 ? 10 : i === 2 ? -10 : 0
                : 0,
              opacity: mobileOpen && i === 1 ? 0 : 1,
              width: mobileOpen ? 20 : i === 1 ? 14 : 20,
            }}
            style={{
              height: 1.5,
              background: KYBER,
              transformOrigin: "center",
            }}
          />
        ))}
      </button>

      {/* Mobile Dropdown */}
      <motion.div
        initial={false}
        animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          background: "rgba(4, 5, 14, 0.96)",
          backdropFilter: "blur(20px)",
          overflow: "hidden",
          borderBottom: "1px solid rgba(0,200,255,0.1)",
        }}
      >
        <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.action}
              style={{
                background: "none",
                border: "none",
                color: "#8892A4",
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "10px 0",
                textAlign: "left",
                cursor: "pointer",
                borderBottom: "1px solid rgba(0,200,255,0.05)",
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
