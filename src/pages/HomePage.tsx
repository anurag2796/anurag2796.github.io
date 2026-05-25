import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router";

// ─── smooth scroll util ────────────────────────────────────────────────────────
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 70;
  window.scrollTo({ top, behavior: "smooth" });
}

// ─── SVG icons ────────────────────────────────────────────────────────────────
const IconBuilding = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" />
  </svg>
);
const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2a8 8 0 0 0-8 8c0 5.4 8 12 8 12s8-6.6 8-12a8 8 0 0 0-8-8z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="m9 11 3 3L22 4" />
  </svg>
);
const IconArrowUpRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);
const IconGithub = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const IconLinkedIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 7 10-7" />
  </svg>
);
const IconList = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 6h16M4 12h16M4 18h7" />
  </svg>
);
const IconSend = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="m22 2-7 20-4-9-9-4 20-7z" />
  </svg>
);
const IconChat = () => (
  <svg id="chat-icon-open" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const IconX = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
const IconMoon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const IconSun = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

// ─── Chat message type ─────────────────────────────────────────────────────────
interface ChatMsg { text: string; role: "bot" | "user" }

const PERSONA = `You are the AI assistant on Anurag Lnu's personal portfolio website. You speak on Anurag's behalf — use "Anurag" in third person, be warm, professional, and concise. Keep answers under 150 words. For questions unrelated to Anurag, gently redirect.

## Who is Anurag?
Anurag Lnu is an AI/ML Researcher Engineer with 5+ years of industry experience (EY, TCS) and currently pursuing an MS in Computer Science at Rochester Institute of Technology (RIT), Rochester, NY (Aug 2024 – Present). He is open to new opportunities in AI/ML engineering, distributed systems, and research roles.

## Current Role
Research Assistant at RIT under Prof. Haibo Yang (Aug 2024 – Present).
Building FedLearn Platform — a production-grade, open-source federated learning system. Key contributions:
- Implemented DeComFL Byzantine-robust aggregation algorithm
- Built parameter chunking pipeline for models >300MB over gRPC
- Developed parallel heartbeat system to prevent gRPC timeout disconnections
- Full stack: Spring Boot 3 backend, React 19 frontend, Docker, AWS EC2
- Live at: fedlearn.duckdns.org
- GitHub: github.com/Learning-Optimization-Group/FedLearn-Platform

## Industry Experience
**Ernst & Young — Senior Technology Consultant** (Apr 2022 – Jul 2024, Bengaluru, India)
- Built high-throughput backend services generating 100,000+ monthly client artifacts
- Designed Kafka event-driven pipelines, cutting reconciliation effort by 30%
- Implemented Redis distributed caching, reducing response times by 70%
- Built real-time fraud decisioning workflows, cutting review time by 75%
- Stack: Java, Scala, Spring Boot, Kafka, Redis, SQL, Microservices

**Tata Consultancy Services — Software Engineer** (Jul 2019 – Apr 2022, Hyderabad, India)
- Engineered APIs processing 1M+ daily transactions at 99.9% uptime
- Integrated Kafka + Cassandra, reducing data retrieval latency by 20%
- Built CI/CD pipelines with Docker/OpenShift, cutting deployment lead time by 40%
- Stack: Spring Boot, Kafka, Cassandra, Docker, OpenShift, Prometheus, Grafana

## Education
- MS Computer Science — RIT (Aug 2024 – Present) | Focus: AI, RAG, Computer Vision, Distributed Systems
- B.Tech CS&E — Sikkim Manipal Institute of Technology (2015–2019)
- Certifications: AWS Certified Cloud Practitioner, Oracle Certified Java SE 8

## Key Projects
1. **FedLearn Platform** — RA project. Open-source FL system, DeComFL aggregation, Spring Boot 3, React 19, gRPC, Docker, AWS EC2
2. **FamineSight** — Famine early warning; fuses ACLED, WFP, CHIRPS, NDVI, UNHCR, IPC data; XGBoost forecasting + hybrid Groq/Ollama AI narrative generation; FastAPI + React + Docker
3. **TigerResearchBuddy** — AI research discovery for RIT; hybrid RAG (BM25 + ChromaDB vector search + RRF fusion), knowledge graph traversal, local Ollama LLMs, Dagster pipelines, Streamlit UI
4. **Hybrid ML Scheduler** — Benchmarks 6 CPU/GPU scheduling strategies including a live RL DQN agent; WebSocket performance dashboard; online learning
5. **LeafMD** — Plant disease detection; YOLOv8 + Apple Silicon MPS training; INT8 CoreML export for on-device inference; PlantVillage + PlantDoc datasets
6. **CrimeCastNYC** — 20 years of NYPD 911 data; Apache Spark ETL, PostgreSQL star schema, Apriori pattern mining
7. **Smart Betting System** — XGBoost + Kelly Criterion on 16K Premier League matches; FastAPI + React; backtesting engine
8. **dART** — Distributed ART-1 neural network in Scala Akka actors
9. **Image Similarity Engine** — DINOv2 + CLIP for CBIR; modular PyTorch pipeline

## Technical Skills
- **AI/ML:** PyTorch, YOLOv8, LangChain, LangGraph, LlamaIndex, RAG, Embeddings, Fine-tuning, Federated Learning, Reinforcement Learning
- **Languages:** Python, Java, Scala, TypeScript/React
- **Backend:** Spring Boot 3, FastAPI, gRPC, Kafka, Redis, Cassandra, PostgreSQL
- **Infra/MLOps:** Docker, OpenShift, AWS EC2, Dagster, Prometheus, Grafana
- **Research interests:** Federated learning, agentic AI systems, edge inference, RAG

## Contact
- Email: anuragpandey2796@gmail.com
- GitHub: github.com/anurag2796
- LinkedIn: linkedin.com/in/anurag-pandey-lnu`;

// ─── Main component ────────────────────────────────────────────────────────────
export function HomePage() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(
    () => document.documentElement.getAttribute("data-theme") === "dark"
  );
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMin, setChatMin] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([
    { text: "Hi! I'm Anurag's AI assistant. Ask me about his projects, experience, or technical background. 👋", role: "bot" },
  ]);
  const [suggestionsShown, setSuggestionsShown] = useState(true);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Theme toggle ──────────────────────────────────────────────────────────
  const toggleTheme = useCallback(() => {
    const next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("al-theme", next);
    setIsDark(!isDark);
  }, [isDark]);

  // ── All DOM interactions (scroll, observers, card effects) ────────────────
  useEffect(() => {
    // Scroll progress + nav border + orb parallax + active links
    const progressEl = document.getElementById("scroll-progress");
    const navbar = document.getElementById("navbar");
    const orb1 = document.querySelector<HTMLElement>(".hero-orb-1");
    const orb2 = document.querySelector<HTMLElement>(".hero-orb-2");
    const orb3 = document.querySelector<HTMLElement>(".hero-orb-3");
    const sections = [...document.querySelectorAll<HTMLElement>("section[id]")];
    const navLinkEls = document.querySelectorAll<HTMLAnchorElement>(".nav-links a");
    let ticking = false;

    const onScroll = () => {
      const y = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (progressEl) progressEl.style.width = ((y / docH) * 100) + "%";
      if (navbar) navbar.classList.toggle("scrolled", y > 20);
      if (y < window.innerHeight * 1.4) {
        if (orb1) orb1.style.translate = `0px ${y * 0.22}px`;
        if (orb2) orb2.style.translate = `0px ${y * 0.12}px`;
        if (orb3) orb3.style.translate = `0px ${y * 0.18}px`;
      }
      let cur = "";
      sections.forEach(s => { if (y >= s.offsetTop - 130) cur = s.id; });
      navLinkEls.forEach(a => a.classList.toggle("active", a.dataset.section === cur));
      ticking = false;
    };

    const onScrollThrottled = () => {
      if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    };
    window.addEventListener("scroll", onScrollThrottled, { passive: true });

    // Section title clip-path reveal
    document.querySelectorAll(".section-title").forEach(el => {
      const wrap = document.createElement("div");
      wrap.className = "section-title-wrap";
      el.parentNode?.insertBefore(wrap, el);
      wrap.appendChild(el);
    });

    // IntersectionObserver factory
    function makeObserver(sel: string, threshold: number, cb: (el: Element) => void) {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { cb(e.target); obs.unobserve(e.target); } });
      }, { threshold });
      document.querySelectorAll(sel).forEach(el => obs.observe(el));
      return obs;
    }

    const o1 = makeObserver(".section-header", 0.1, el => el.classList.add("visible"));
    const o2 = makeObserver(".reveal", 0, el => el.classList.add("visible"));
    const o3 = makeObserver(".exp-item", 0.05, el => el.classList.add("visible"));
    const o4 = makeObserver(".edu-card", 0.15, el => el.classList.add("visible"));

    // Stat cards staggered
    const statCards = document.querySelectorAll<HTMLElement>(".stat-card");
    const statObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const idx = [...statCards].indexOf(e.target as HTMLElement);
        setTimeout(() => e.target.classList.add("visible"), idx * 80);
        statObs.unobserve(e.target);
      });
    }, { threshold: 0.15 });
    statCards.forEach(c => statObs.observe(c));

    // Project cards staggered
    const projCards = document.querySelectorAll<HTMLElement>(".project-card");
    const projObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const idx = [...projCards].indexOf(e.target as HTMLElement);
        setTimeout(() => e.target.classList.add("visible"), idx * 90);
        projObs.unobserve(e.target);
      });
    }, { threshold: 0.05 });
    projCards.forEach(c => projObs.observe(c));

    // Stat counters
    const counterObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        const raw = el.textContent?.trim() ?? "";
        const num = parseInt(raw);
        if (isNaN(num)) return;
        const suffix = raw.slice(String(num).length);
        let step = 0; const steps = 40; const dur = 1100;
        const t = setInterval(() => {
          step++;
          const ease = 1 - Math.pow(1 - step / steps, 3);
          el.textContent = Math.round(num * ease) + suffix;
          if (step >= steps) { el.textContent = num + suffix; clearInterval(t); }
        }, dur / steps);
        counterObs.unobserve(el);
      });
    }, { threshold: 0.6 });
    document.querySelectorAll(".stat-num").forEach(el => counterObs.observe(el));

    // Skill tag wave
    const waveObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll<HTMLElement>(".skill-tag").forEach((tag, i) => {
          tag.style.transitionDelay = (i * 0.04) + "s";
        });
        e.target.classList.add("wave-done");
        waveObs.unobserve(e.target);
      });
    }, { threshold: 0.1 });
    document.querySelectorAll(".skill-tags").forEach(el => waveObs.observe(el));

    // Project card spotlight + 3D tilt
    projCards.forEach(card => {
      const sp = document.createElement("div");
      sp.className = "spotlight";
      card.insertBefore(sp, card.firstChild);
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        sp.style.setProperty("--x", (e.clientX - r.left) + "px");
        sp.style.setProperty("--y", (e.clientY - r.top) + "px");
        card.style.transition = "transform 0.08s, box-shadow 0.25s, border-color 0.25s, opacity 0.6s";
        card.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 5}deg) translateY(-3px)`;
      };
      const onLeave = () => {
        card.style.transition = "transform 0.55s var(--ease), box-shadow 0.25s, border-color 0.25s, opacity 0.6s";
        card.style.transform = "";
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
    });

    // Hero cursor glow
    const glow = document.getElementById("hero-cursor-glow");
    const hero = document.getElementById("hero");
    const onHeroMove = (e: MouseEvent) => {
      if (!glow || !hero) return;
      const r = hero.getBoundingClientRect();
      glow.style.left = (e.clientX - r.left) + "px";
      glow.style.top = (e.clientY - r.top) + "px";
    };
    hero?.addEventListener("mousemove", onHeroMove);

    // Magnetic buttons
    const btns = document.querySelectorAll<HTMLElement>(".btn");
    const btnHandlers: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];
    btns.forEach(btn => {
      const move = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) * 0.28;
        const dy = (e.clientY - r.top - r.height / 2) * 0.28;
        btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-1px)`;
      };
      const leave = () => { btn.style.transform = ""; };
      btn.addEventListener("mousemove", move);
      btn.addEventListener("mouseleave", leave);
      btnHandlers.push({ el: btn, move, leave });
    });

    return () => {
      window.removeEventListener("scroll", onScrollThrottled);
      [o1, o2, o3, o4, statObs, projObs, counterObs, waveObs].forEach(o => o.disconnect());
      hero?.removeEventListener("mousemove", onHeroMove);
      btnHandlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  // ── Chat scroll ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [chatMessages]);

  // ── Send chat message ─────────────────────────────────────────────────────
  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || chatLoading) return;
    setSuggestionsShown(false);
    setChatMessages(prev => [...prev, { text, role: "user" }]);
    setChatInput("");
    setChatLoading(true);

    // Typing indicator
    setChatMessages(prev => [...prev, { text: "...", role: "bot" }]);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("no key");

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: PERSONA }] },
            contents: [{ role: "user", parts: [{ text }] }],
          }),
        }
      );
      if (!res.ok) throw new Error(`gemini ${res.status}`);
      const data = await res.json();
      const reply: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
      if (!reply) throw new Error("empty");
      setChatMessages(prev => [...prev.slice(0, -1), { text: reply, role: "bot" }]);
    } catch {
      setChatMessages(prev => [
        ...prev.slice(0, -1),
        {
          text: "I'm not available right now — drop me a line at anuragpandey2796@gmail.com and I'll reply shortly!",
          role: "bot",
        },
      ]);
    }
    setChatLoading(false);
  }, [chatLoading]);

  const openChat = () => { setChatOpen(true); setChatMin(false); setTimeout(() => inputRef.current?.focus(), 300); };
  const closeChat = () => { setChatOpen(false); setChatMin(false); };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      <div id="scroll-progress" />
      <div id="grain" />

      {/* ── NAV ── */}
      <nav id="navbar">
        <div className="nav-inner">
          <span className="nav-logo" onClick={() => scrollToSection("hero")}>AL</span>
          <ul className="nav-links">
            {[["about","About"],["experience","Experience"],["projects","Projects"],["skills","Skills"],["contact","Contact"]].map(([id, label]) => (
              <li key={id}>
                <a data-section={id} onClick={e => { e.preventDefault(); scrollToSection(id); }} href="#">{label}</a>
              </li>
            ))}
          </ul>
          <button id="theme-toggle" aria-label="Toggle dark mode" onClick={toggleTheme}>
            {isDark ? <IconSun /> : <IconMoon />}
          </button>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-resume">Resume ↗</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="hero">
        <div id="hero-cursor-glow" />
        <div className="container hero-content">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            <span>Open to new opportunities</span>
          </div>
          <h1 className="hero-name" id="hero-name-el">
            Anurag<br />
            <span className="line2">Lnu.</span>
          </h1>
          <div className="hero-meta">
            <span className="hero-meta-item">
              <IconBuilding />
              Research Assistant at <strong>RIT</strong>
            </span>
            <span className="hero-meta-sep" />
            <span className="hero-meta-item">
              <IconPin />
              Rochester, NY
            </span>
            <span className="hero-meta-sep" />
            <span className="hero-meta-item">
              <IconCheck />
              <strong>MSCS</strong> · AWS Certified
            </span>
          </div>
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
          <p className="hero-tagline">
            AI/ML Researcher Engineer building <em>production-grade distributed AI</em> —
            from federated learning systems to RAG pipelines and agentic intelligence.
          </p>
          <div className="hero-cta" style={{ marginBottom: 16, alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <a href="https://github.com/anurag2796/" target="_blank" rel="noopener noreferrer"
              className="btn btn-primary" style={{ padding: "13px 28px", fontSize: 15 }}>
              <IconGithub /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/anurag2796/" target="_blank" rel="noopener noreferrer"
              className="btn btn-primary" style={{ background: "oklch(0.30 0.12 250)" }}>
              <IconLinkedIn /> LinkedIn
            </a>
            <a href="#" onClick={e => { e.preventDefault(); scrollToSection("contact"); }} className="btn btn-ghost">
              <IconMail /> Contact
            </a>
            <a href="#" onClick={e => { e.preventDefault(); scrollToSection("projects"); }} className="btn btn-ghost">
              <IconList /> Projects
            </a>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about">
        <div className="container">
          <div className="section-header reveal">
            <p className="label">01 — About</p>
            <h2 className="section-title">Who I am</h2>
            <div className="section-line" />
          </div>
          <div className="about-grid">
            <div className="about-text reveal">
              <p>
                I'm an <strong>AI/ML Researcher Engineer with 5 years</strong> of experience building
                high-scale distributed systems and production AI. Currently pursuing an MSCS at RIT and
                working as a <strong>Research Assistant under Prof. Haibo Yang</strong> on the FedLearn Platform —
                an open-source federated learning system with custom Byzantine-robust aggregation.
              </p>
              <p>
                My work spans the full stack of modern AI — from designing federated learning infrastructure
                to deploying production-grade <strong>RAG pipelines</strong>, LLM evaluation frameworks,
                and agentic workflows. I care deeply about evaluation, grounding, and making AI systems
                trustworthy and scalable.
              </p>
              <p>
                Previously at <strong>Ernst &amp; Young</strong> (Senior Technology Consultant) and
                <strong> Tata Consultancy Services</strong> (Software Engineer). I hold a B.Tech in CS&amp;E
                from Sikkim Manipal Institute of Technology and am AWS Certified.
              </p>
              <br />
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div className="cert-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#f90">
                    <path d="M13.527.099C6.955-.744.949 3.77.099 10.421c-.85 6.651 3.671 12.65 10.241 13.48a12.01 12.01 0 0 0 6.357-.784l-2.408-1.286c-1.155.356-2.4.504-3.672.372-4.506-.488-7.99-4.194-8.02-8.734-.029-4.96 4.007-8.956 8.987-8.956a8.87 8.87 0 0 1 8.866 8.866c0 2.462-1.016 4.695-2.657 6.299l-4.05-4.05a.5.5 0 0 0-.708 0l-.708.707a.5.5 0 0 0 0 .707l4.95 4.95.707-.707.707-.707 3.536-3.536A10.9 10.9 0 0 0 22 12c0-6.62-5.38-12-12-12z" />
                  </svg>
                  AWS Cloud Practitioner
                </div>
                <div className="cert-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#f90">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#f90" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Oracle Java SE 8 Certified
                </div>
              </div>
            </div>
            <div className="about-stats reveal reveal-d2">
              <div className="stat-row">
                <div className="stat-card">
                  <div className="stat-num">5+</div>
                  <div className="stat-label">Years in AI/ML</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num accent">11</div>
                  <div className="stat-label">Projects built</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num">RIT</div>
                  <div className="stat-label">Current affiliation</div>
                </div>
              </div>
              <div className="stat-card" style={{ marginTop: 4 }}>
                <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
                  Focused on <strong style={{ color: "var(--text)" }}>federated learning, production RAG &amp; agentic AI</strong> — closing the gap
                  between research prototypes and distributed systems that actually work at scale.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience">
        <div className="container">
          <div className="section-header reveal">
            <p className="label">02 — Experience</p>
            <h2 className="section-title">Where I've worked</h2>
            <div className="section-line" />
          </div>
          <div className="exp-list">

            <div className="exp-item reveal">
              <div className="exp-meta">
                <div className="exp-period">Aug 2024 — Present</div>
                <div className="exp-company">Rochester Institute of Technology</div>
                <div className="exp-location">Rochester, NY</div>
              </div>
              <div className="exp-detail">
                <div className="exp-role">Research Assistant <span className="accent">·</span> Prof. Haibo Yang</div>
                <p className="exp-desc">
                  Building FedLearn Platform — an open-source, full-stack federated learning system under
                  Prof. Haibo Yang at RIT. Implemented DeComFL Byzantine-robust aggregation, parameter chunking
                  for models &gt;300MB, and a parallel heartbeat system to prevent gRPC timeouts. Live at
                  fedlearn.duckdns.org.
                </p>
                <div className="exp-tags">
                  <span className="tag tag-accent">Federated Learning</span>
                  <span className="tag tag-accent">DeComFL</span>
                  <span className="tag tag-accent">Research</span>
                  <span className="tag">Spring Boot 3</span>
                  <span className="tag">React 19</span>
                  <span className="tag">gRPC</span>
                  <span className="tag">Docker</span>
                  <span className="tag">AWS EC2</span>
                </div>
              </div>
            </div>

            <div className="exp-item reveal reveal-d1">
              <div className="exp-meta">
                <div className="exp-period">Apr 2022 — Jul 2024</div>
                <div className="exp-company">Ernst &amp; Young</div>
                <div className="exp-location">Bengaluru, India</div>
              </div>
              <div className="exp-detail">
                <div className="exp-role">Senior Technology Consultant</div>
                <p className="exp-desc">
                  Built and operated high-throughput backend services generating 100,000+ monthly client artifacts.
                  Designed event-driven data pipelines using Kafka, reducing reconciliation effort by 30%.
                  Implemented distributed caching with Redis, reducing response times by 70%.
                  Built real-time fraud decisioning workflows reducing review time by 75%.
                </p>
                <div className="exp-tags">
                  <span className="tag tag-accent">Production Systems</span>
                  <span className="tag tag-accent">Event-Driven</span>
                  <span className="tag">Java</span>
                  <span className="tag">Scala</span>
                  <span className="tag">Spring Boot</span>
                  <span className="tag">Kafka</span>
                  <span className="tag">Redis</span>
                  <span className="tag">SQL</span>
                </div>
              </div>
            </div>

            <div className="exp-item reveal reveal-d2">
              <div className="exp-meta">
                <div className="exp-period">Jul 2019 — Apr 2022</div>
                <div className="exp-company">Tata Consultancy Services</div>
                <div className="exp-location">Hyderabad, India</div>
              </div>
              <div className="exp-detail">
                <div className="exp-role">Software Engineer</div>
                <p className="exp-desc">
                  Engineered resilient APIs processing 1M+ daily transactions with 99.9% uptime.
                  Integrated Kafka event streams and Cassandra clusters, reducing data retrieval latency by 20%.
                  Built CI/CD pipelines and containerized workloads with Docker/OpenShift, reducing deployment
                  lead time by 40%.
                </p>
                <div className="exp-tags">
                  <span className="tag">Spring Boot</span>
                  <span className="tag">Kafka</span>
                  <span className="tag">Cassandra</span>
                  <span className="tag">Docker</span>
                  <span className="tag">OpenShift</span>
                  <span className="tag">Prometheus</span>
                  <span className="tag">Grafana</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects">
        <div className="container">
          <div className="section-header reveal">
            <p className="label">03 — Projects</p>
            <h2 className="section-title">Things I've built</h2>
            <div className="section-line" />
          </div>
          <div className="projects-grid">

            {/* Featured — FedLearn */}
            <div className="project-card featured reveal"
              onClick={() => window.open("https://github.com/Learning-Optimization-Group/FedLearn-Platform", "_blank")}>
              <div className="project-info">
                <div className="project-header">
                  <div className="project-icon">🔗</div>
                  <IconArrowUpRight />
                </div>
                <div className="project-name">FedLearn Platform</div>
                <p className="project-desc">
                  Open-source full-stack federated learning platform built as a <strong>Research Assistant under
                  Prof. Haibo Yang at RIT</strong>. Custom FL framework (not Flower-based) with DeComFL
                  Byzantine-robust aggregation, parameter chunking for models &gt;300MB, and a parallel heartbeat
                  system to prevent gRPC timeouts. Live at fedlearn.duckdns.org.
                </p>
                <div className="exp-tags" style={{ marginTop: "auto" }}>
                  <span className="tag tag-accent">Federated Learning</span>
                  <span className="tag tag-accent">DeComFL</span>
                  <span className="tag tag-accent">Research · RA Project</span>
                  <span className="tag">Spring Boot 3</span>
                  <span className="tag">React 19</span>
                  <span className="tag">gRPC</span>
                  <span className="tag">Docker</span>
                  <span className="tag">AWS EC2</span>
                </div>
              </div>
              <div className="project-visual">
                <div className="mono-line"><span className="mono-cm"># DeComFL Byzantine-robust aggregation</span></div>
                <div className="mono-line"><span className="mono-kw">from</span> fedlearn <span className="mono-kw">import</span> FLServer</div>
                <div className="mono-line" style={{ marginTop: 8 }}><span className="mono-fn">server</span> = FLServer(</div>
                <div className="mono-line">&nbsp;&nbsp;aggregator=<span className="mono-str">"DeComFL"</span>,</div>
                <div className="mono-line">&nbsp;&nbsp;chunk_size=<span className="mono-str">"300MB"</span>,</div>
                <div className="mono-line">&nbsp;&nbsp;heartbeat=<span className="mono-str">"parallel"</span>,</div>
                <div className="mono-line">)</div>
                <div className="mono-line" style={{ marginTop: 8 }}><span className="mono-fn">round</span> = server.<span className="mono-fn">aggregate</span>(clients=8)</div>
                <div className="mono-line" style={{ marginTop: 4, color: "var(--accent)" }}>→ Byzantine clients filtered: 2</div>
                <div className="mono-line" style={{ color: "var(--accent)" }}>→ Model convergence: 94.2% accuracy</div>
              </div>
            </div>

            {/* FamineSight */}
            <div className="project-card reveal reveal-d1"
              onClick={() => navigate("/project/faminesight")}>
              <div className="project-header">
                <div className="project-icon">🌾</div>
                <IconArrowUpRight />
              </div>
              <div className="project-name">FamineSight</div>
              <p className="project-desc">
                End-to-end famine early warning system fusing 6 humanitarian data sources — ACLED conflict,
                WFP prices, CHIRPS rainfall, NDVI, UNHCR displacement, IPC phases — with XGBoost forecasting
                and hybrid Groq/Ollama AI narrative generation.
              </p>
              <div className="exp-tags" style={{ marginTop: "auto" }}>
                <span className="tag tag-accent">AI for Good</span>
                <span className="tag tag-accent">XGBoost</span>
                <span className="tag">FastAPI</span>
                <span className="tag">Ollama</span>
                <span className="tag">Docker</span>
              </div>
            </div>

            {/* TigerResearchBuddy */}
            <div className="project-card reveal reveal-d2"
              onClick={() => navigate("/project/tiger_research_buddy")}>
              <div className="project-header">
                <div className="project-icon">🐯</div>
                <IconArrowUpRight />
              </div>
              <div className="project-name">TigerResearchBuddy</div>
              <p className="project-desc">
                AI-powered research discovery for RIT — hybrid RAG with BM25 + vector search, local LLMs via
                Ollama, knowledge graph traversal, and a multi-persona AI assistant.
              </p>
              <div className="exp-tags" style={{ marginTop: "auto" }}>
                <span className="tag tag-accent">RAG</span>
                <span className="tag tag-accent">LLM</span>
                <span className="tag">ChromaDB</span>
                <span className="tag">Ollama</span>
                <span className="tag">FastAPI</span>
              </div>
            </div>

            {/* Hybrid ML Scheduler */}
            <div className="project-card reveal reveal-d3"
              onClick={() => navigate("/project/hybrid-ml-scheduler")}>
              <div className="project-header">
                <div className="project-icon">⚙️</div>
                <IconArrowUpRight />
              </div>
              <div className="project-name">Hybrid ML Scheduler</div>
              <p className="project-desc">
                Real-time CPU/GPU scheduler benchmarking 6 strategies — including a live RL agent (DQN) —
                with online learning and a WebSocket performance dashboard.
              </p>
              <div className="exp-tags" style={{ marginTop: "auto" }}>
                <span className="tag tag-accent">RL · DQN</span>
                <span className="tag tag-accent">GPU Optimization</span>
                <span className="tag">Python</span>
                <span className="tag">WebSocket</span>
                <span className="tag">FastAPI</span>
              </div>
            </div>

          </div>
          <p style={{ marginTop: 32, fontSize: 14, color: "var(--muted)", textAlign: "center" }}>
            <a href="https://github.com/anurag2796" target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: 3, fontWeight: 500 }}>
              View all 11+ projects on GitHub →
            </a>
          </p>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills">
        <div className="container">
          <div className="section-header reveal">
            <p className="label">04 — Skills</p>
            <h2 className="section-title">What I work with</h2>
            <div className="section-line" />
          </div>
          <div className="skills-grid">
            <div className="reveal">
              <div className="skill-group-title">AI / ML</div>
              <div className="skill-tags">
                {["LLMs","RAG","Fine-tuning","Embeddings","Agents","Prompt Eng.","Evals","NLP","Computer Vision"].map(s => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </div>
            <div className="reveal reveal-d1">
              <div className="skill-group-title">Frameworks &amp; Tools</div>
              <div className="skill-tags">
                {["LangChain","LangGraph","LlamaIndex","HuggingFace","FastAPI","PyTorch","Spring Boot","Streamlit"].map(s => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </div>
            <div className="reveal reveal-d2">
              <div className="skill-group-title">Infrastructure</div>
              <div className="skill-tags">
                {["AWS","Docker","Kafka","Redis","FAISS","ChromaDB","PostgreSQL","gRPC","OpenShift"].map(s => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </div>
            <div className="reveal reveal-d1">
              <div className="skill-group-title">Languages</div>
              <div className="skill-tags">
                {["Python","Java","Scala","TypeScript","SQL","JavaScript","C"].map(s => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </div>
            <div className="reveal reveal-d2">
              <div className="skill-group-title">Frontend</div>
              <div className="skill-tags">
                {["React","Next.js","Vite","Tailwind","WebSockets"].map(s => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </div>
            <div className="reveal reveal-d3">
              <div className="skill-group-title">Focus Areas</div>
              <div className="skill-tags">
                {["Federated Learning","Production AI","RAG Systems","MLOps","System Design","Distributed Systems"].map(s => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education">
        <div className="container">
          <div className="section-header reveal">
            <p className="label">05 — Education</p>
            <h2 className="section-title">Background</h2>
            <div className="section-line" />
          </div>
          <div className="edu-card reveal">
            <div className="edu-logo">RIT</div>
            <div>
              <div className="edu-degree">Rochester Institute of Technology</div>
              <div className="edu-school">Master of Science, Computer Science · Rochester, NY</div>
              <div style={{ fontSize: 13, color: "var(--accent)", marginTop: 6, fontFamily: "var(--ff-mono)" }}>
                Focus: AI, RAG, Computer Vision · RA under Prof. Haibo Yang
              </div>
            </div>
            <div className="edu-year">
              <div style={{ marginBottom: 4 }}>Aug 2024 – Present</div>
              <div>Rochester, NY</div>
            </div>
          </div>
          <div className="edu-card reveal reveal-d1" style={{ marginTop: 16 }}>
            <div className="edu-logo" style={{ fontSize: 10 }}>SMIT</div>
            <div>
              <div className="edu-degree">Sikkim Manipal Institute of Technology</div>
              <div className="edu-school">B.Tech, Computer Science &amp; Engineering · India</div>
            </div>
            <div className="edu-year">
              <div style={{ marginBottom: 4 }}>Jun 2015 – Jul 2019</div>
              <div>India</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GITHUB STRIP ── */}
      <section id="github-strip" style={{ background: "var(--canvas-bg)", padding: "48px 0" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
            <div>
              <div style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(247,246,242,0.4)", marginBottom: 10 }}>Open Source</div>
              <div style={{ fontFamily: "var(--ff-head)", fontSize: 22, fontWeight: 700, color: "var(--canvas-fg)", letterSpacing: "-0.03em" }}>21+ public repositories on GitHub</div>
              <div style={{ fontSize: 14, color: "rgba(247,246,242,0.5)", marginTop: 6 }}>Python · Java · Scala · TypeScript — across AI, CV, data engineering &amp; distributed systems</div>
            </div>
            <a href="https://github.com/anurag2796/" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 24px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "var(--canvas-fg)", fontSize: 14, fontWeight: 500, fontFamily: "var(--ff-body)", textDecoration: "none", whiteSpace: "nowrap" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
              View all repositories →
            </a>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 28 }}>
            {["FedLearn-Platform","tiger_research_buddy","FamineSight","hybrid-ml-scheduler","leafMD","dART","smart-betting-system","crimeCastNYC","image-similarity"].map(repo => (
              <a key={repo} href={`https://github.com/anurag2796/${repo}`} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "var(--ff-mono)", fontSize: 12, padding: "6px 14px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.12)", color: "rgba(247,246,242,0.6)", textDecoration: "none" }}>
                {repo}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact">
        <div className="container">
          <div className="section-header reveal">
            <p className="label">06 — Contact</p>
            <div className="section-line" />
          </div>
          <div className="contact-grid">
            <div className="reveal">
              <div className="contact-headline">Let's build<br />something real.</div>
              <p className="contact-sub" style={{ marginBottom: 24 }}>
                Interested in federated learning, production AI, LLM systems, or just want to talk
                about evaluation frameworks? I'm always up for a good conversation.
              </p>
              <a href="mailto:al5150@rit.edu"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--ff-mono)", fontSize: 15, color: "var(--accent)", letterSpacing: "0.02em" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" />
                </svg>
                al5150@rit.edu
              </a>
            </div>
            <div className="contact-links reveal reveal-d1">
              <a href="mailto:al5150@rit.edu" className="contact-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" /></svg>
                al5150@rit.edu
              </a>
              <a href="https://www.linkedin.com/in/anurag2796/" target="_blank" rel="noopener noreferrer" className="contact-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                linkedin.com/in/anurag2796
              </a>
              <a href="https://github.com/anurag2796/" target="_blank" rel="noopener noreferrer" className="contact-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
                github.com/anurag2796
              </a>
            </div>
          </div>
        </div>
        <footer>
          <div className="footer-inner">
            <span>© 2026 Anurag Lnu</span>
            <span>Rochester, NY · Built with care</span>
          </div>
        </footer>
      </section>

      {/* ── CHATBOT ── */}
      <div id="chat-trigger-wrap">
        <button id="chat-trigger" className={chatOpen ? "hidden" : ""}
          aria-label="Chat with Anurag's AI assistant"
          onClick={openChat}>
          <IconChat />
          <span id="chat-label">Ask me anything</span>
        </button>
      </div>
      <div id="chat-panel" className={`${chatOpen ? "open" : ""} ${chatMin ? "minimized" : ""}`} aria-hidden={!chatOpen}>
        <div id="chat-header">
          <div id="chat-avatar">AL</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div id="chat-title">Anurag's AI Assistant</div>
            <div id="chat-subtitle">Ask about projects &amp; experience</div>
          </div>
          <div id="chat-controls">
            <button className="chat-ctrl" id="btn-minimize" title="Minimize"
              onClick={() => setChatMin(m => !m)} />
            <button className="chat-ctrl" id="btn-close" title="Close"
              onClick={closeChat} />
          </div>
        </div>
        <div id="chat-body">
          <div id="chat-messages" ref={messagesRef}>
            {chatMessages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.role}`}>
                <div className={`chat-bubble${msg.text === "..." ? " typing" : ""}`}>
                  {msg.text === "..." ? <><span /><span /><span /></> : msg.text}
                </div>
              </div>
            ))}
            {suggestionsShown && (
              <div className="chat-suggestions">
                {[
                  ["What is FedLearn Platform?", "FedLearn Platform"],
                  ["What is Anurag's experience with LLMs and RAG?", "LLM / RAG"],
                  ["What is Anurag's current role?", "Current role"],
                  ["What makes Anurag stand out?", "Why hire?"],
                ].map(([q, label]) => (
                  <button key={label} className="chat-chip" onClick={() => sendMessage(q)}>{label}</button>
                ))}
              </div>
            )}
          </div>
          <div id="chat-input-row">
            <input
              id="chat-input"
              ref={inputRef}
              type="text"
              placeholder="Ask about projects, skills..."
              autoComplete="off"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") sendMessage(chatInput); }}
            />
            <button id="chat-send" onClick={() => sendMessage(chatInput)} disabled={chatLoading}>
              <IconSend />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
