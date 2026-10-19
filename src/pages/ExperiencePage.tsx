import type { ReactNode } from "react";
import { Go } from "@/components/links";
import { usePageTitle } from "@/lib/nav";
import { RESUME, ROUTES } from "@/site";

type Group = { heading: string; items: string[] };

type Role = {
  key: string;
  when: string;
  org: string;
  title?: string;
  scope?: string;
  summary?: string;
  bullets?: string[];
  groups?: Group[];
  links?: { to: string; label: string }[];
  tech?: string;
};

const ROLES: Role[] = [
  {
    key: "rit",
    when: "Mar 2026 to present · Rochester, NY",
    org: "Rochester Institute of Technology",
    title: "Graduate Research Assistant",
    scope: "Scope: full-stack lead, FedLearn Platform",
    bullets: [
      "Lead development across the platform's web dashboard (React 19, TypeScript, Vite), Spring Boot 3 API, and Electron and React Native clients.",
      "Built the live dashboard: run state, results and logs pushed over WebSocket, with HttpOnly SameSite cookie auth.",
      "Generate design tokens from one source for the web, desktop and mobile clients.",
      "Set the test strategy: Jest, pytest and JUnit coverage floors, cross-language golden-fixture contract tests, and a CI guard that fails on skipped tests.",
      "Own CI/CD and deployment: path-filtered GitHub Actions, an API breaking-change gate, AWS EC2 behind nginx with PostgreSQL under versioned migrations.",
    ],
    links: [
      { to: ROUTES.fedlearn, label: "FedLearn case study →" },
      { to: ROUTES.fedlearn, label: "ExecuTorch debugging story →" },
    ],
    tech: "React · TypeScript · Java 21 · Spring Boot 3 · Python · PyTorch · gRPC · Electron · React Native · AWS EC2 · nginx · PostgreSQL",
  },
  {
    key: "ey",
    when: "Apr 2022 to Jul 2024 · Bengaluru, India",
    org: "Ernst & Young (EY)",
    title: "Senior Technology Consultant",
    scope: "Client engagements: Morgan Stanley (fraud screening), BlackRock (portfolio management)",
    summary:
      "Built and operated Java, Scala and Spring Boot services for two financial-services clients. For an investment bank's real-time fraud-screening platform I owned services in the transaction pipeline as it grew from one payment rail to five. For an asset manager's portfolio platform I built services behind a console used by several distinct user groups, and verified a large re-architecture before it went live.",
    groups: [
      {
        heading: "FRAUD SCREENING",
        items: [
          "Owned three services in the real-time transaction-screening pipeline: persistence, core enricher and additional enricher.",
          "Profiled hot read paths and added Redis-backed distributed caching, cutting the screening SLA from 5,000 ms to under 500 ms.",
          "Built automated triage queues for the fraud-decisioning workflow, lowering manual-review time 75%.",
          "Delivered profiling-driven fixes that lowered pipeline latency 25%.",
        ],
      },
      {
        heading: "PORTFOLIO DATA",
        items: [
          "Built high-throughput backend services generating 100,000+ client artifacts a month, with streaming validation and automated quality checks.",
          "Designed event-driven pipelines on Kafka for the portfolio platform.",
          "Built validation and cleansing into the pipeline instead of correcting records downstream, improving data accuracy 15%.",
          "Verified a Java/Spark re-architecture against the legacy baseline across nested portfolio hierarchies, catching correctness gaps and regressions before migration.",
        ],
      },
      {
        heading: "HOW I WORKED",
        items: [
          "Worked directly with product stakeholders to turn changing business needs into requirements.",
          "Point of contact and code reviewer for several components; mentored junior developers.",
          "Covered production delivery, support and design work across both engagements.",
        ],
      },
    ],
    links: [{ to: ROUTES.finserv, label: "Financial-services case study →" }],
    tech: "Java · Scala · Spring Boot · Kafka · MQ · Redis · Spark · SQL · Jenkins",
  },
  {
    key: "tcs",
    when: "Jul 2019 to Apr 2022 · Hyderabad, India",
    org: "Tata Consultancy Services",
    title: "Software Engineer",
    scope: "Client engagement: USAA (core banking and consumer lending)",
    summary:
      "Started my career on the core-banking and consumer-lending platform of a US financial-services client. I built REST APIs that carried more than a million transactions a day, then worked on what kept them reliable: delivery pipelines, monitoring, data-model tuning and on-call support.",
    groups: [
      {
        heading: "APIS AND DATA",
        items: [
          "Built core-banking and consumer-lending REST APIs on Spring Boot over MySQL and MongoDB, serving 1M+ transactions a day at 99.9% uptime.",
          "Integrated Kafka event streams and Cassandra for high-concurrency workloads.",
          "Tuned relational and NoSQL schemas and indexes, making queries 50% faster.",
        ],
      },
      {
        heading: "DELIVERY AND RELIABILITY",
        items: [
          "Built CI/CD pipelines behind SonarQube quality gates and containerized workloads on Docker and OpenShift, shortening deployment lead time 40%.",
          "Set up Prometheus and Grafana monitoring; the root-cause fixes it surfaced lowered MTTR 35%.",
          "Released through UrbanCode Deploy and carried on-call production support.",
        ],
      },
    ],
    tech: "Java · Spring Boot · Kafka · Cassandra · MySQL · MongoDB · Docker · OpenShift · Jenkins · Prometheus · Grafana",
  },
  {
    key: "infosys",
    when: "2019",
    org: "Infosys · Intern",
    summary: "Adapted a speech-to-text proof of concept with phrase hints for domain-specific vocabulary.",
  },
];

const SKILLS: { tier: string; where: string; list: ReactNode }[] = [
  {
    tier: "Production",
    where: "EY and TCS, in live systems",
    list: "Java, Scala, Spring Boot, Kafka, MQ, Redis, MySQL, MongoDB, Docker, OpenShift (Kubernetes), Jenkins, UrbanCode Deploy, SonarQube, Prometheus, Grafana",
  },
  {
    tier: "Recently shipped",
    where: "FedLearn, TigerResearchBuddy, Hybrid ML Scheduler",
    list: "Python, FastAPI, PyTorch, gRPC, React 19, TypeScript, Vite, Electron, React Native, WebSocket and STOMP, PostgreSQL with Flyway, GitHub Actions, AWS EC2, nginx, Jest, pytest, JUnit, Ollama, XGBoost",
  },
  {
    tier: "Research",
    where: "Methods backed by experiments",
    list: "Federated optimization (FedAvg, FedProx, FedAdam, DeComFL), differential privacy with RDP accounting, Byzantine-robust and secure aggregation, hybrid vector and graph retrieval, VLM-validated extraction, on-device training with ExecuTorch, domain-shift evaluation",
  },
  {
    tier: "Familiar",
    where: "Used, without a strong project to point to",
    list: "AWS S3, Lambda and SQS, Cassandra, Spark, Tailwind, scikit-learn, Hugging Face Transformers",
  },
];

export function ExperiencePage() {
  usePageTitle("Experience");

  return (
    <>
      <section aria-labelledby="x-h" className="wrap page-intro">
        <div className="enter">
          <p className="kicker">EXPERIENCE</p>
          <h1 id="x-h">Five years in production, then a platform build at RIT.</h1>
        </div>
        <div className="intro-aside enter-late">
          <p>
            Five years at EY and TCS building backend services for financial-services clients: fraud screening,
            portfolio data and consumer lending. Design, delivery, on-call support, code review and mentoring
            throughout.
          </p>
          <a className="btn btn-secondary" href={RESUME}>
            Download résumé (PDF)
          </a>
        </div>
      </section>

      <section aria-label="At a glance" className="wrap">
        <dl className="glance">
          <div>
            <dt className="label">INDUSTRY</dt>
            <dd>5 years, 2019 to 2024</dd>
            <dd>EY and TCS, client engagements</dd>
          </div>
          <div>
            <dt className="label">DOMAINS</dt>
            <dd>Fraud, portfolio, lending</dd>
            <dd>Real-time and high-volume systems</dd>
          </div>
          <div>
            <dt className="label">OWNERSHIP</dt>
            <dd>Design to on-call</dd>
            <dd>Requirements, build, release, support</dd>
          </div>
          <div>
            <dt className="label">NOW</dt>
            <dd>M.S. at RIT, Dec 2026</dd>
            <dd>Graduate Research Assistant, FedLearn</dd>
          </div>
        </dl>
      </section>

      <section aria-label="Roles" className="wrap">
        <ol className="roles" style={{ listStyle: "none" }}>
          {ROLES.map((r) => (
            <li key={r.key} className="role reveal">
              <div className="role-side">
                <p className="label">{r.when}</p>
                <h2>{r.org}</h2>
                {r.title && <p className="title">{r.title}</p>}
                {r.scope && <p className="scope">{r.scope}</p>}
              </div>
              <div className="role-main">
                {r.summary && <p>{r.summary}</p>}
                {r.bullets && (
                  <ul className="bullets">
                    {r.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                {r.groups?.map((g) => (
                  <div className="block" key={g.heading}>
                    <h3>{g.heading}</h3>
                    <ul className="bullets">
                      {g.items.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                {r.links && (
                  <p className="role-links">
                    {r.links.map((l) => (
                      <Go key={l.label} className="link" to={l.to}>
                        {l.label}
                      </Go>
                    ))}
                  </p>
                )}
                {r.tech && <p className="tech">{r.tech}</p>}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="sk-h" className="wrap section reveal">
        <div className="section-head">
          <h2 id="sk-h" className="h-section" style={{ flex: "1 1 420px" }}>
            Skills, by strength of evidence
          </h2>
          <p>Grouped by where each skill was actually used, not by how much I like it.</p>
        </div>
        <dl className="skills">
          {SKILLS.map((s) => (
            <div key={s.tier}>
              <dt>
                <span>{s.tier}</span>
                <span>{s.where}</span>
              </dt>
              <dd>{s.list}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="ed-h" className="wrap section reveal" style={{ paddingBottom: 112 }}>
        <h2 id="ed-h" className="h-section" style={{ marginBottom: 28 }}>
          Education and certifications
        </h2>
        <div className="edu-list">
          <div>
            <strong>M.S. Computer Science · Rochester Institute of Technology</strong>
            <span className="when">Aug 2024 to Dec 2026 (expected)</span>
            <span className="courses">
              Machine Learning, Artificial Intelligence, Deep Learning, Advanced Computer Vision, Big Data Analytics
            </span>
          </div>
          <div>
            <strong>B.Tech Computer Science and Engineering · Sikkim Manipal Institute of Technology</strong>
            <span className="when">2015 to 2019</span>
          </div>
          <div>
            <strong>AWS Certified Cloud Practitioner · Oracle Certified Associate, Java SE 8 Programmer</strong>
          </div>
        </div>
      </section>
    </>
  );
}
