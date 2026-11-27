import { ContactBand } from "@/components/ContactBand";
import { Go } from "@/components/links";
import { FedLearnMiniArch, Shot, Status } from "@/components/ui-bits";
import { usePageTitle } from "@/lib/nav";
import { FEDLEARN_REPO, GITHUB, LINKEDIN, MAILTO, RESUME, ROUTES, type ImageKey } from "@/site";
import type { StatusKind } from "@/components/ui-bits";

const METRICS = [
  {
    value: "<500 ms",
    label: "end-to-end SLA, from 5,000 ms (10×)",
    how: "Added Redis caching",
    where: "EY · Morgan Stanley",
  },
  {
    value: "1 → 5",
    label: "payment types screened",
    how: "Pipeline changes across enrichment, rules, persistence",
    where: "EY · Morgan Stanley",
  },
  {
    value: "−75%",
    label: "manual review time",
    how: "Contributed to triage automation (reported)",
    where: "EY · Morgan Stanley",
  },
  {
    value: "800 / 856",
    label: "public FedLearn commits",
    how: "Primary implementation contributor",
    where: "RIT · FedLearn",
  },
];

const CAPABILITIES = [
  {
    n: "01",
    title: "Backend systems",
    line: "Services that stay fast and correct under production load.",
    points: ["Event-driven services and APIs", "Caching, authorization and observability", "On-call support and root-cause fixes"],
    evidence: { to: ROUTES.finserv, label: "Evidence: financial-services delivery →" },
    tech: "Java · Scala · Spring Boot · Kafka · Redis · PostgreSQL",
  },
  {
    n: "02",
    title: "Full-stack delivery",
    line: "Operational tools owned from API to interface.",
    points: [
      "Dashboards with live state over WebSocket",
      "Web, desktop and Android clients on shared design tokens",
      "CI/CD and deployment shipped with the feature",
    ],
    evidence: { to: ROUTES.fedlearn, label: "Evidence: FedLearn clients →" },
    tech: "React · TypeScript · Electron · React Native · AWS EC2",
  },
  {
    n: "03",
    title: "AI systems",
    line: "Federated training, evaluation, and local retrieval built for real hardware.",
    points: [
      "Federated learning with privacy and robust aggregation",
      "Hybrid vector and graph retrieval, local inference",
      "Reproducible evaluation that keeps negative results",
    ],
    evidence: { to: ROUTES.trb, label: "Evidence: TigerResearchBuddy →" },
    tech: "PyTorch · gRPC · ExecuTorch · Ollama · Jetson Orin",
  },
];

const ROLES = [
  {
    id: "pe-ey",
    org: "EY",
    title: "Senior Technology Consultant (Software Engineering)",
    when: "Apr 2022 to Jul 2024 · Bengaluru",
    summary:
      "Embedded software developer for two clients: a Morgan Stanley real-time transaction-screening platform (~18 months) and BlackRock's Java on Spark portfolio-management platform (~6 months).",
    owned: [
      "Three production Scala services (enrichment and persistence) as screening grew from 1 payment type to 5",
      "Event-driven pipelines on IBM MQ and Kafka, with Redis caching to take database round-trips off the critical path",
      "Contributed to triage automation and wrote design documents",
      "Validated BlackRock's re-architected Java on a Spark-backed portfolio platform against the legacy system and added validation rules",
    ],
    results: [
      ["<500 ms", "end-to-end screening SLA, from 5,000 ms (10×) · Redis caching"],
      ["−75%", "manual review time · contributed to triage automation"],
      ["1 → 5", "payment types screened"],
      ["+15%", "data accuracy at BlackRock · reconciliation before vs after"],
    ],
    how: "Translated business needs into technical requirements with stakeholders, maintained Jenkins CI/CD, mentored junior developers, and served as code-review point of contact for several components.",
  },
  {
    id: "pe-tcs",
    org: "TCS",
    title: "Senior Systems Engineer (promoted from Systems Engineer)",
    when: "Jul 2019 to Apr 2022 · Hyderabad",
    summary:
      "Spring Boot microservices in USAA's 6-service Consumer Lending pipeline (personal and auto loans), running with IBM MQ, Kafka and Docker on OpenShift, with on-call production support.",
    owned: [
      "Features, unit/integration tests and fixes across retrieval, risk-check, decision and data services on MySQL and Couchbase",
      "Enrichment via 3 cross-team service integrations and rule-based decisioning",
      "Kafka producer integration publishing persisted final application records downstream, with timeouts, retries and failed-message replay",
      "Releases and rollbacks via IBM UrbanCode Deploy (dev → QA → prod) on OpenShift; on-call monitoring with Prometheus and Grafana",
    ],
    results: [
      ["6", "Spring Boot services in USAA's Consumer Lending pipeline, each in its own repository"],
      ["3", "cross-team service integrations"],
      ["2", "loan products · personal and auto loans, routed to 3 decision outcomes"],
      ["3", "recurring incident classes resolved on call · dependency slowdowns, bad input, release regressions"],
    ],
    how: "Carried on-call support, diagnosed incidents with logs and Grafana, shipped fixes, replayed failed messages and wrote RCAs.",
  },
];

const MORE: { name: string; slug: string; status: StatusKind; statusLabel?: string; blurb: string; image: ImageKey }[] = [
  {
    name: "Hybrid ML Scheduler",
    slug: "hybrid-ml-scheduler",
    status: "simulator",
    blurb: "Heuristic, Random Forest and DQN schedulers scored against a brute-force Oracle.",
    image: "hybrid",
  },
  {
    name: "LeafMD",
    slug: "leafmd",
    status: "coursework",
    blurb: "Plant-disease detection studying the gap between lab images and field photos.",
    image: "leafmd",
  },
  {
    name: "CrimeCastNYC",
    slug: "crimecastnyc",
    status: "coursework",
    blurb: "Two decades of NYPD 911 data in a partitioned PostgreSQL star schema.",
    image: "crimecast",
  },
  {
    name: "Smart Betting System",
    slug: "smart-betting-system",
    status: "simulator",
    statusLabel: "◇ Simulator · virtual money",
    blurb: "XGBoost edge, Kelly sizing and settlement, with no real wagering.",
    image: "smart",
  },
];

const CAREER = [
  {
    when: "01 · 2019 to 2024",
    title: "Production backend systems",
    where: "EY and TCS · fraud screening, portfolio data, consumer lending",
    carries: "reliability, API design, on-call, stakeholder delivery",
  },
  {
    when: "02 · RIT (2024 to 2026)",
    title: "Applied AI and edge systems",
    where: "RIT AI/ML coursework and projects · TigerResearchBuddy on Jetson Orin",
    carries: "hybrid retrieval, hardware-aware pipelines, evaluation discipline",
  },
  {
    when: "03 · RIT (2026)",
    title: "ML infrastructure and federated learning",
    where: "FedLearn · control plane, training runtime, desktop and Android clients",
    next: "full-time backend, ML infrastructure, and AI systems roles",
  },
];

export function HomePage() {
  usePageTitle();

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-h" className="wrap hero">
        <div className="hero-main enter">
          <p className="hero-eyebrow">Software engineer · Backend &amp; ML infrastructure · Sunnyvale, CA</p>
          <h1 id="hero-h">Five years shipping production backends. Now building ML infrastructure and AI systems.</h1>
          <p className="hero-sub">
            From financial transaction pipelines and distributed infrastructure to federated learning, evaluation, and
            full-stack workflows.
          </p>
          <p className="hero-body">
            From 2019 to 2024 at EY and TCS I built and supported real-time backend services for Morgan Stanley,
            BlackRock and USAA. Since starting my M.S. at RIT in August 2024, I have focused on AI/ML systems and now
            serve as Graduate Research Assistant and lead developer of FedLearn, working across architecture,
            implementation, evaluation and deployment.
          </p>
          <p className="hero-target">
            <span className="label-accent">TARGETING</span>
            Backend, ML Infrastructure, Distributed Systems, and Applied AI roles.
          </p>
          <div className="hero-actions">
            <Go className="btn btn-primary" to={ROUTES.work}>
              View case studies
            </Go>
            <a className="btn btn-secondary" href={RESUME}>
              Download résumé
            </a>
            <span className="hero-socials">
              <a href={GITHUB}>GitHub</a>
              <a href={LINKEDIN}>LinkedIn</a>
              <a href={MAILTO}>Email</a>
            </span>
          </div>
        </div>

        <aside aria-label="Profile" className="profile enter-late">
          <p className="profile-head">
            <span>PROFILE</span>
            <span>NOV 2026</span>
          </p>
          <dl>
            <div className="profile-row">
              <dt>Now</dt>
              <dd>
                Graduate Research Assistant, RIT (Mar 2026–present)
                <br />
                <span className="muted">Lead Developer - FedLearn · Learning Optimization Group</span>
              </dd>
            </div>
            <div className="profile-row">
              <dt>Industry</dt>
              <dd>5 years (2019–2024) at EY and TCS, backend platforms for financial services</dd>
            </div>
            <div className="profile-row">
              <dt>Education</dt>
              <dd>M.S. Computer Science, RIT (Aug 2024–Dec 2026, expected)</dd>
            </div>
            <div className="profile-row">
              <dt>Focus</dt>
              <dd>Backend platforms, ML infrastructure, federated learning, local RAG</dd>
            </div>
            <div className="profile-row">
              <dt>Available</dt>
              <dd>
                <span className="dot-available" aria-hidden="true" />
                Full-time from January 2027
                <br />
                <span className="muted">Sunnyvale, CA (moving Dec 20, 2026) · open to relocation</span>
              </dd>
            </div>
          </dl>
        </aside>
      </section>

      {/* Metrics */}
      <section aria-labelledby="m-h" className="metrics">
        <div className="wrap">
          <h2 id="m-h">IMPACT AND SCOPE · 2019 TO PRESENT</h2>
          <div className="metrics-grid">
            {METRICS.map((m) => (
              <div className="metric" key={m.label}>
                <span className="metric-value">{m.value}</span>
                <span className="metric-label">{m.label}</span>
                <span className="metric-how">{m.how}</span>
                <span className="metric-where">{m.where}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section aria-labelledby="cap-h" className="wrap section reveal">
        <h2 id="cap-h" className="h-section" style={{ marginBottom: 36 }}>
          What I deliver
        </h2>
        <div className="cap-grid">
          {CAPABILITIES.map((c) => (
            <article className="cap" key={c.n} aria-labelledby={`cap-${c.n}`}>
              <span className="label-accent">{c.n}</span>
              <h3 id={`cap-${c.n}`}>{c.title}</h3>
              <p>{c.line}</p>
              <ul>
                {c.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <Go className="link" to={c.evidence.to}>
                {c.evidence.label}
              </Go>
              <p className="tech">{c.tech}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Production experience */}
      <section aria-labelledby="pe-h" className="wrap section reveal">
        <div className="section-head" style={{ marginBottom: 32 }}>
          <div style={{ flex: "1.3 1 520px", display: "flex", flexDirection: "column", gap: 14 }}>
            <p className="kicker">PRODUCTION EXPERIENCE · 2019 TO 2024</p>
            <h2 id="pe-h" className="h-section">
              Five years building backend systems for financial-services clients.
            </h2>
          </div>
          <p>
            Two firms, three client engagements, one constant: services that had to be fast, correct and supported in
            production. I delivered work from requirements with stakeholders through release, monitoring and on-call.
          </p>
        </div>

        <dl className="facts">
          <div>
            <dt>EMPLOYERS</dt>
            <dd>EY · Tata Consultancy Services</dd>
          </div>
          <div>
            <dt>DOMAINS</dt>
            <dd>Fraud screening · portfolio data · consumer lending</dd>
          </div>
          <div>
            <dt>RESPONSIBILITIES</dt>
            <dd>Design · delivery · on-call · code review · mentoring</dd>
          </div>
          <div>
            <dt>CORE STACK</dt>
            <dd>Java · Scala · Spring Boot · Kafka · IBM MQ · Redis</dd>
          </div>
        </dl>

        <div className="role-cols">
          {ROLES.map((r) => (
            <article key={r.id} aria-labelledby={r.id} className="role-card">
              <div className="role-head">
                <h3 id={r.id}>
                  {r.org} <span>· {r.title}</span>
                </h3>
                <span className="role-when">{r.when}</span>
              </div>
              <p className="role-summary">{r.summary}</p>
              <div className="block">
                <span className="label-accent">WHAT I OWNED</span>
                <ul className="bullets">
                  {r.owned.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>
              <div className="results">
                <span className="label-accent">RESULTS</span>
                {r.results.map(([v, t]) => (
                  <div className="result-row" key={t}>
                    <strong>{v}</strong>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
              <p className="how-worked">
                <span className="label">HOW I WORKED</span>
                {r.how}
              </p>
            </article>
          ))}
        </div>

        <div className="now-bar">
          <span>
            <span className="label">NOW</span>
            <strong>RIT</strong> · Graduate Research Assistant, Lead Developer - FedLearn (Mar 2026–present){" "}
            <span className="muted">· earlier: Infosys intern, 2019</span>
          </span>
          <span className="now-links">
            <Go className="link" to={ROUTES.finserv}>
              Financial-services case study →
            </Go>
            <Go className="link" to={ROUTES.experience} style={{ fontWeight: 600 }}>
              Full experience →
            </Go>
          </span>
        </div>
      </section>

      {/* Case studies */}
      <section id="case-studies" aria-labelledby="cs-h" className="wrap section reveal">
        <div className="section-head">
          <h2 id="cs-h" className="h-section">
            Case studies
          </h2>
          <Go className="link" to={ROUTES.work} style={{ fontSize: 16 }}>
            All work →
          </Go>
        </div>

        <article aria-labelledby="fl-h" className="flagship">
          <div className="flagship-copy">
            <p className="meta-line">
              <span className="accent">CASE STUDY 01 · FLAGSHIP</span>
              <span className="green">● Active research</span>
              <span>RIT</span>
            </p>
            <h3 id="fl-h">FedLearn Platform</h3>
            <p className="desc">
              A custom, full-stack federated-learning platform connecting web, desktop, Docker, and native Android
              clients to a PyTorch/gRPC runtime, with reproducible experiments across heterogeneous hardware.
            </p>
            <p className="muted" style={{ fontSize: 15 }}>
              Primary implementation contributor (800 of 856 public commits)
            </p>
            <ul className="evidence-list">
              <li>
                <span className="label-accent">EVIDENCE</span>
                <span>360-configuration, 7,200-round NIH ChestX-ray14 study; FedAvg reported within 2.38 × 10⁻⁷ of Flower</span>
              </li>
              <li>
                <span className="label-accent">EVIDENCE</span>
                <span>Qualified gRPC training across 3 physical hosts (up to 80 logical clients)</span>
              </li>
              <li>
                <span className="label-accent">DEBUGGING</span>
                <span>Fixed an ExecuTorch max_pool2d bug on Android (reported); 21 of 24 full-arm plans verified with live receipts</span>
              </li>
            </ul>
            <div className="cta-row">
              <Go className="btn btn-primary" to={ROUTES.fedlearn}>
                Read the FedLearn case study
              </Go>
              <a className="link" href={FEDLEARN_REPO}>
                Repository ↗
              </a>
            </div>
          </div>
          <figure className="flagship-figure">
            <Shot image="fedlearn" to={ROUTES.fedlearn} label="Open the FedLearn case study" />
            <figcaption>Platform overview. Detailed architecture and a text version are in the case study.</figcaption>
            <FedLearnMiniArch />
          </figure>
        </article>

        <div className="feature-grid">
          <article aria-labelledby="trb-h" className="card lift">
            <p className="meta-line">
              <span className="accent">CASE STUDY 02</span>
              <span className="blue">◆ Deployed demo</span>
            </p>
            <Shot image="trb" to={ROUTES.trb} decorative small />
            <h3 id="trb-h">TigerResearchBuddy</h3>
            <p className="desc">
              Local-first research discovery for RIT: vector retrieval, knowledge-graph traversal and VLM-validated
              extraction, deployed on NVIDIA Jetson Orin for a public demonstration.
            </p>
            <p className="tech">Python · React · TypeScript · Ollama · Jetson Orin</p>
            <Go className="link-strong" to={ROUTES.trb}>
              Read the case study →
            </Go>
          </article>

          <article aria-labelledby="fs-h" className="card lift">
            <p className="meta-line">
              <span className="accent">CASE STUDY 03</span>
              <span className="ink">■ Production experience</span>
            </p>
            <h3 id="fs-h">Financial-services delivery</h3>
            <div className="stat-strip">
              <div>
                <strong>&lt;500 ms</strong>
                <span>end-to-end SLA, from 5,000 ms</span>
              </div>
              <div>
                <strong>−75%</strong>
                <span>manual review time</span>
              </div>
              <div>
                <strong>1 → 5</strong>
                <span>payment types screened</span>
              </div>
            </div>
            <p className="desc">
              Fraud screening, portfolio and lending services built inside client engagements at EY and TCS:
              requirements with stakeholders, integration with existing systems, production support.
            </p>
            <p className="tech">Java · Scala · Spring Boot · Kafka · IBM MQ · Redis</p>
            <Go className="link-strong" to={ROUTES.finserv}>
              Read the case study →
            </Go>
          </article>
        </div>

        <div className="more-head">
          <h3>MORE WORK</h3>
          <Go className="link" to={ROUTES.work}>
            Full project index →
          </Go>
        </div>
        <ul className="more-grid">
          {MORE.map((m) => (
            <li key={m.name}>
              <Shot image={m.image} to={`${ROUTES.work}/${m.slug}`} decorative small />
              <Status kind={m.status} plain label={m.statusLabel} />
              <Go className="name" to={`${ROUTES.work}/${m.slug}`}>
                {m.name}
              </Go>
              <span className="blurb">{m.blurb}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* How the experience connects */}
      <section aria-labelledby="career-h" className="wrap section reveal">
        <div className="section-head">
          <h2 id="career-h" className="h-section" style={{ flex: "1 1 420px" }}>
            How the experience connects
          </h2>
          <p>Production backend habits are what make the AI work hold up.</p>
        </div>
        <ol className="career" aria-label="Career as a system">
          {CAREER.map((c) => (
            <li key={c.title}>
              <span className="label">{c.when}</span>
              <h3>{c.title}</h3>
              <p className="where">{c.where}</p>
              <p className="carries">
                {c.carries ? (
                  <>
                    <span className="label-accent">CARRIES →</span> {c.carries}
                  </>
                ) : (
                  <>
                    <span className="label-accent next">NEXT →</span> {c.next}
                  </>
                )}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Education */}
      <section aria-labelledby="ed-h" className="wrap edu-section reveal">
        <div className="edu">
          <h2 id="ed-h">Education and focus</h2>
          <div className="edu-item">
            <strong>M.S. Computer Science, RIT</strong>
            <span>Aug 2024 – Dec 2026 (expected)</span>
          </div>
          <div className="edu-item">
            <strong>B.Tech Computer Science and Engineering</strong>
            <span>Sikkim Manipal Institute of Technology, Jun 2015 – Jul 2019</span>
          </div>
          <div className="edu-now">
            <span className="label-accent">CAPSTONE</span>
            <span>
              FedLearn platform and 360-configuration, 7,200-round NIH ChestX-ray14 federated study (manuscript in
              preparation).
            </span>
          </div>
        </div>
      </section>

      <ContactBand body="I'm completing my M.S. in Computer Science at RIT (Dec 2026), relocating to Sunnyvale, CA on December 20, 2026, and targeting full-time backend, ML infrastructure, distributed systems, and applied AI roles starting January 2027." />
    </>
  );
}
