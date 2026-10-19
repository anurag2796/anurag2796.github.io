import { ContactBand } from "@/components/ContactBand";
import { Go } from "@/components/links";
import { FedLearnMiniArch, Shot, Status } from "@/components/ui-bits";
import { usePageTitle } from "@/lib/nav";
import { FEDLEARN_REPO, GITHUB, LINKEDIN, MAILTO, RESUME, ROUTES, type ImageKey } from "@/site";
import type { StatusKind } from "@/components/ui-bits";

const METRICS = [
  { value: "1M+", label: "transactions per day", how: "Production APIs at 99.9% uptime", where: "TCS" },
  { value: "<500 ms", label: "screening SLA, from 5,000 ms", how: "Redis-backed distributed caching", where: "EY" },
  { value: "75%", label: "lower manual-review time", how: "Fraud-decisioning workflow", where: "EY" },
  { value: "40%", label: "shorter deployment lead time", how: "CI/CD and containerized delivery", where: "TCS" },
];

const CAPABILITIES = [
  {
    n: "01",
    title: "Backend systems",
    line: "Services that stay fast and correct under production load.",
    points: ["Event-driven services and APIs", "Caching, authorization and observability", "On-call support and root-cause fixes"],
    evidence: { to: ROUTES.finserv, label: "Evidence: financial-services delivery →" },
    tech: "Java · Spring Boot · Kafka · Redis · PostgreSQL",
  },
  {
    n: "02",
    title: "Full-stack delivery",
    line: "Operational tools owned from API to interface.",
    points: [
      "Dashboards with live state over WebSocket",
      "Web, desktop and mobile clients on one design system",
      "CI/CD and deployment shipped with the feature",
    ],
    evidence: { to: ROUTES.fedlearn, label: "Evidence: FedLearn clients →" },
    tech: "React · TypeScript · Electron · React Native · AWS",
  },
  {
    n: "03",
    title: "AI systems",
    line: "Training and retrieval that run on real hardware and are measured.",
    points: [
      "Federated learning with privacy and robust aggregation",
      "Hybrid vector and graph retrieval, local inference",
      "Reproducible evaluation that keeps negative results",
    ],
    evidence: { to: ROUTES.trb, label: "Evidence: FedLearn and TigerResearchBuddy →" },
    tech: "PyTorch · gRPC · ExecuTorch · Ollama · Jetson Orin",
  },
];

const ROLES = [
  {
    id: "pe-ey",
    org: "EY",
    title: "Senior Technology Consultant",
    when: "Apr 2022 to Jul 2024 · Bengaluru",
    summary:
      "Backend services for two clients: a real-time transaction-screening platform for fraud decisioning, and portfolio-management services behind a console used by several user groups.",
    owned: [
      "Three screening services (persistence, core enricher, additional enricher) as the platform grew from one payment rail to five",
      "Event-driven pipelines on Kafka and Redis-backed caching on hot read paths",
      "Validation and cleansing built into the portfolio data pipeline",
      "Verification of a Java/Spark re-architecture against the legacy system before migration",
    ],
    results: [
      ["<500 ms", "screening SLA, down from 5,000 ms · Redis-backed caching"],
      ["75%", "lower manual-review time · automated triage queues"],
      ["25%", "lower pipeline latency · profiling-driven fixes"],
      ["15%", "better data accuracy · validation at ingestion"],
      ["100K+", "client artifacts a month from high-throughput services"],
    ],
    how: "Turned changing business needs into requirements with product stakeholders, mentored junior developers, and was the code-review point of contact for several components.",
  },
  {
    id: "pe-tcs",
    org: "TCS",
    title: "Software Engineer",
    when: "Jul 2019 to Apr 2022 · Hyderabad",
    summary:
      "Core-banking and consumer-lending APIs for a US financial-services client, running on Kafka and Docker on OpenShift, with on-call production support.",
    owned: [
      "Spring Boot REST APIs over MySQL and MongoDB",
      "CI/CD pipelines behind SonarQube quality gates, released through UrbanCode Deploy",
      "Prometheus and Grafana monitoring, and the root-cause fixes it surfaced",
      "Schema and index tuning across relational and NoSQL stores",
    ],
    results: [
      ["1M+", "transactions a day at 99.9% uptime"],
      ["40%", "shorter deployment lead time · CI/CD and containers"],
      ["35%", "lower MTTR · monitoring and root-cause fixes"],
      ["50%", "faster queries · indexing and data-model tuning"],
    ],
    how: "Carried on-call support and turned incidents into permanent fixes through root-cause analysis and better monitoring.",
  },
];

const MORE: { name: string; status: StatusKind; statusLabel?: string; blurb: string; image: ImageKey }[] = [
  {
    name: "Hybrid ML Scheduler",
    status: "simulator",
    blurb: "Heuristic, Random Forest and DQN schedulers scored against a brute-force Oracle.",
    image: "hybrid",
  },
  {
    name: "LeafMD",
    status: "coursework",
    blurb: "Plant-disease detection studying the gap between lab images and field photos.",
    image: "leafmd",
  },
  {
    name: "CrimeCastNYC",
    status: "coursework",
    blurb: "Two decades of NYPD 911 data in a partitioned PostgreSQL star schema.",
    image: "crimecast",
  },
  {
    name: "Smart Betting System",
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
    when: "02 · RIT",
    title: "AI infrastructure and federated learning",
    where: "FedLearn · control plane, training runtime, clients",
    carries: "orchestration, evaluation, device runtimes",
  },
  {
    when: "03 · RIT",
    title: "Applied AI on constrained devices",
    where: "TigerResearchBuddy on Jetson Orin · on-device training on Android",
    next: "full-time AI systems and backend roles",
  },
];

export function HomePage() {
  usePageTitle();

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-h" className="wrap hero">
        <div className="hero-main enter">
          <p className="hero-eyebrow">Software engineer · AI systems · Rochester, NY</p>
          <h1 id="hero-h">Five years shipping production backends. Now building AI systems that hold up.</h1>
          <p className="hero-sub">
            From backend services and distributed infrastructure to RAG, evaluation, and full-stack workflows.
          </p>
          <p className="hero-body">
            At EY and TCS I built and supported real-time services for financial-services clients: fraud screening,
            portfolio data and consumer lending. At RIT I now lead development of FedLearn, a federated-learning
            platform, working across architecture, implementation, evaluation, deployment and production debugging.
          </p>
          <p className="hero-target">
            <span className="label-accent">TARGETING</span>
            AI Systems, Backend, Full-stack AI, Applied AI, and Forward-Deployed Engineering roles.
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
            <span>OCT 2026</span>
          </p>
          <dl>
            <div className="profile-row">
              <dt>Now</dt>
              <dd>
                Graduate Research Assistant, RIT
                <br />
                <span className="muted">Primary architect, FedLearn Platform</span>
              </dd>
            </div>
            <div className="profile-row">
              <dt>Industry</dt>
              <dd>5 years at EY and TCS, backend platforms for financial services</dd>
            </div>
            <div className="profile-row">
              <dt>Education</dt>
              <dd>M.S. Computer Science, RIT, December 2026</dd>
            </div>
            <div className="profile-row">
              <dt>Focus</dt>
              <dd>Federated learning, RAG, edge inference, backend platforms</dd>
            </div>
            <div className="profile-row">
              <dt>Available</dt>
              <dd>
                <span className="dot-available" aria-hidden="true" />
                Full-time from January 2027
                <br />
                <span className="muted">Rochester, NY · open to relocation</span>
              </dd>
            </div>
          </dl>
        </aside>
      </section>

      {/* Metrics */}
      <section aria-labelledby="m-h" className="metrics">
        <div className="wrap">
          <h2 id="m-h">PRODUCTION IMPACT · INDUSTRY ROLES, 2019 TO 2024</h2>
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
            production. I owned work end to end, from requirements with stakeholders through release, monitoring and
            on-call.
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
            <dd>Java · Scala · Spring Boot · Kafka · Redis</dd>
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
            <strong>RIT</strong> · Graduate Research Assistant, full-stack lead on FedLearn{" "}
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
              A custom, full-stack federated-learning platform connecting web, desktop, Docker, and native mobile
              clients to a PyTorch/gRPC runtime, with reproducible experiments across heterogeneous hardware.
            </p>
            <p className="muted" style={{ fontSize: 15 }}>
              Primary architect and principal implementer
            </p>
            <ul className="evidence-list">
              <li>
                <span className="label-accent">EVIDENCE</span>
                <span>FedAvg matched Flower within 2.39 × 10⁻⁷ across 200 aggregations</span>
              </li>
              <li>
                <span className="label-accent">EVIDENCE</span>
                <span>One model trained across three physical machines over gRPC</span>
              </li>
              <li>
                <span className="label-accent">DEBUGGING</span>
                <span>Phone training failure traced into an ExecuTorch kernel</span>
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
            <h3 id="fs-h">Real-time decisioning for financial services</h3>
            <div className="stat-strip">
              <div>
                <strong>&lt;500 ms</strong>
                <span>SLA, from 5,000 ms</span>
              </div>
              <div>
                <strong>75%</strong>
                <span>lower manual review</span>
              </div>
              <div>
                <strong>1M+</strong>
                <span>transactions a day</span>
              </div>
            </div>
            <p className="desc">
              Fraud screening, portfolio and lending services built inside client engagements at EY and TCS:
              requirements with stakeholders, integration with existing systems, production support.
            </p>
            <p className="tech">Java · Scala · Spring Boot · Kafka · Redis</p>
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
              <Shot image={m.image} to={ROUTES.work} decorative small />
              <Status kind={m.status} plain label={m.statusLabel} />
              <Go className="name" to={ROUTES.work}>
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
            <span>Expected December 2026</span>
          </div>
          <div className="edu-item">
            <strong>B.Tech Computer Science and Engineering</strong>
            <span>Sikkim Manipal Institute of Technology, 2019</span>
          </div>
          <div className="edu-now">
            <span className="label-accent">CURRENTLY</span>
            <span>
              TLS-by-default and secure-aggregation hardening in FedLearn; a held-out retrieval benchmark for
              TigerResearchBuddy.
            </span>
          </div>
        </div>
      </section>

      <ContactBand body="I'm completing my M.S. in Computer Science at RIT and targeting full-time AI systems, backend, full-stack AI, and forward-deployed engineering roles beginning January 2027." />
    </>
  );
}
