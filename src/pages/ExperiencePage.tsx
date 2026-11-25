import type { ReactNode } from "react";
import { Figure } from "@/components/Figure";
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
    when: "Mar 2026 to present",
    org: "Rochester Institute of Technology · Learning Optimization Group",
    title: "Graduate Research Assistant, Lead Developer - FedLearn",
    scope: "FedLearn Platform · 800 of 856 public commits (M.S. capstone; manuscript in preparation)",
    bullets: [
      "Primary implementation contributor on FedLearn, a federated learning platform spanning a Java 21 / Spring Boot 3 control plane, a Python/PyTorch gRPC framework, and web (React 19, TypeScript), Electron, Docker and Android clients.",
      "Built the Spring Boot and PostgreSQL control plane orchestrating Python training servers with checkpoints, resume, execution-attempt fencing and retry-safe result ingestion, plus a content-addressed artifact registry.",
      "Designed gRPC/Protocol Buffer execution contracts and a byte-exact Python/C++ safetensors wire format, enforced in CI with breaking-change, drift and cross-language fixture checks.",
      "Implemented native on-device training on Android with ExecuTorch and C++ behind a React Native TurboModule, and diagnosed and fixed a delayed-share secure-aggregation race with round guards and a live gRPC comparison harness.",
      "Fixed cross-project authorization bypasses in model-artifact access and STOMP subscriptions; ran a 360-configuration, 7,200-round NIH ChestX-ray14 study and qualified gRPC training across 3 hosts with up to 80 logical clients.",
    ],
    links: [
      { to: ROUTES.fedlearn, label: "FedLearn case study →" },
      { to: ROUTES.fedlearn, label: "ExecuTorch debugging story →" },
    ],
    tech: "Java 21 · Spring Boot 3 · PostgreSQL · Flyway · Python · PyTorch · C++ · ExecuTorch · gRPC · Protocol Buffers · Buf · React 19 · TypeScript · Electron · React Native · Docker · GitHub Actions · AWS EC2 · nginx",
  },
  {
    key: "ey",
    when: "Apr 2022 to Jul 2024 · Bengaluru, India",
    org: "Ernst & Young (EY)",
    title: "Senior Technology Consultant (Software Engineering)",
    scope: "Clients: Morgan Stanley (Fraud Hub, ~18 months), BlackRock (portfolio platform, ~6 months)",
    summary:
      "Embedded as a software engineer with two financial-services client engineering teams. At Morgan Stanley's Fraud Hub (~18 months) I owned 3 production Scala services in the real-time fraud-screening pipeline as it expanded from 1 payment rail to 5. At BlackRock (~6 months) I worked in Java on a Spark-backed portfolio-management platform, validating a re-architecture against the legacy system and building services behind a multi-user console.",
    groups: [
      {
        heading: "MORGAN STANLEY · FRAUD HUB (~18 MONTHS)",
        items: [
          "Embedded as a software engineer in Morgan Stanley's fraud-technology team; owned 3 production Scala services (core enrichment, additional enrichment, persistence) in Fraud Hub, a real-time fraud-screening pipeline on IBM MQ, Kafka and Redis.",
          "Cut end-to-end transaction screening time from 5,000 ms to under 500 ms (10x) by caching inbound transactions in Redis and taking database round-trips off the SLA path.",
          "Helped expand Fraud Hub from 1 to 5 payment rails (P2P, ACH, branch ACH, wire, branch wire), delivering changes across enrichment, rules and persistence with design documents.",
          "Contributed to triage automation (auto-routing, pre-filled evidence, auto-clearing low-risk cases) that cut analysts' manual review time by 75%.",
        ],
      },
      {
        heading: "BLACKROCK · PORTFOLIO PLATFORM (~6 MONTHS)",
        items: [
          "Validated BlackRock's re-architected portfolio platform (Java on a Spark-backed platform) against the legacy system with a comparison report separating matches, improvements and regressions across nested portfolio hierarchies.",
          "Added validation and cleansing rules on portfolio and position data, improving data accuracy by 15% (measured by before/after reconciliation).",
          "Built backend services behind a portfolio console used by several user groups and translated business needs into technical requirements with stakeholders.",
        ],
      },
      {
        heading: "HOW I WORKED",
        items: [
          "Supported production, reviewed code, maintained Jenkins CI/CD and mentored junior developers.",
          "Point of contact and code reviewer for several components; wrote design documents across engagements.",
        ],
      },
    ],
    links: [{ to: ROUTES.finserv, label: "Financial-services case study →" }],
    tech: "Scala · Java · Spring Boot · IBM MQ · Kafka · Redis · NoSQL · Jenkins · Java on a Spark-backed platform (BlackRock)",
  },
  {
    key: "tcs",
    when: "Jul 2019 to Apr 2022 · Hyderabad, India",
    org: "Tata Consultancy Services (TCS)",
    title: "Senior Systems Engineer (promoted from Systems Engineer)",
    scope: "Client engagement: USAA (Consumer Lending)",
    summary:
      "Started my career on USAA's Consumer Lending team, working across a 6-service Spring Boot pipeline for personal and auto loans: IBM MQ intake, cross-team enrichment (credit bureau, credit card, LDAP directory), risk checks, rule-based decisioning, MySQL and Couchbase persistence and Kafka publishing, alongside on-call production support.",
    groups: [
      {
        heading: "LENDING PIPELINE AND DATA",
        items: [
          "Built and maintained Spring Boot microservices in USAA's 6-service consumer-lending pipeline (personal and auto loans), consuming applications from IBM MQ, enriching them through 3 cross-team integrations (credit bureau, credit card, LDAP directory) and routing each to auto-approval, underwriter review or a risk flag.",
          "Implemented features across retrieval, risk-check and decision services, where Java rules combined with credit-bureau scores to auto-approve, refer to underwriters or flag risk.",
          "Built the Kafka producer integration that published each persisted application record to downstream teams, and added timeouts, retries and MQ backout-queue reprocessing across services on MySQL and Couchbase.",
        ],
      },
      {
        heading: "DELIVERY AND ON-CALL SUPPORT",
        items: [
          "Resolved recurring production incidents on call (dependency slowdowns, malformed input, release regressions) using Prometheus and Grafana; root-caused, shipped fixes, replayed backout-queue messages and wrote RCAs.",
          "Released through UrbanCode Deploy across dev, QA and prod, running containerized services with Docker on OpenShift.",
        ],
      },
    ],
    tech: "Java · Spring Boot · REST · IBM MQ · Kafka · MySQL · Couchbase · LDAP · Docker · OpenShift · UrbanCode Deploy · Prometheus · Grafana",
  },
  {
    key: "infosys",
    when: "Jan to Jun 2019 · Mysuru, India",
    org: "Infosys · Intern",
    summary: "Adapted a speech-to-text proof of concept with phrase hints for domain-specific vocabulary; also worked with HTML5, CSS3 and JavaScript.",
  },
];

const SKILLS: { tier: string; where: string; list: ReactNode }[] = [
  {
    tier: "Production",
    where: "EY and TCS, in live systems",
    list: "Java, Scala, Spring Boot, REST, IBM MQ, Kafka, Redis, MySQL, Couchbase, NoSQL, LDAP, Docker, OpenShift, Jenkins, UrbanCode Deploy, Prometheus, Grafana",
  },
  {
    tier: "Recently shipped",
    where: "FedLearn (RIT) and coursework/lab projects",
    list: "Python, C++, FastAPI, PyTorch, ExecuTorch, gRPC, Protocol Buffers, Buf, React 19, TypeScript, Vite, Electron, React Native, WebSocket and STOMP, PostgreSQL with Flyway, Alembic, GitHub Actions, AWS EC2, nginx, Testcontainers, pytest, Ollama, XGBoost",
  },
  {
    tier: "Research",
    where: "FedLearn (RIT) and applied ML projects",
    list: "Federated optimization (FedAvg, FedProx, FedAdam, DeComFL), differential privacy with RDP accounting, Byzantine-robust and secure aggregation (LightSecAgg), on-device training with ExecuTorch, hybrid vector and graph retrieval, VLM-validated extraction, domain-shift evaluation",
  },
  {
    tier: "Exposure and short-term",
    where: "Platform exposure or short-term project use",
    list: "Apache Spark (platform exposure at BlackRock), Rust (Tauri core, ~3 weeks), Next.js, Streamlit, GCP (Cloud Run, Cloud Tasks, GCS deployment scripts), scikit-learn, Hugging Face datasets, YOLO, DQN (simulated)",
  },
];

export function ExperiencePage() {
  usePageTitle("Experience");

  return (
    <>
      <section aria-labelledby="x-h" className="wrap page-intro">
        <div className="enter">
          <p className="kicker">EXPERIENCE</p>
          <h1 id="x-h">Five years in backend production, then ML infrastructure at RIT.</h1>
        </div>
        <div className="intro-aside enter-late">
          <p>
            Software engineer · Backend & ML infrastructure. Five years at TCS and EY building backend services for
            financial-services clients (2019–2024), followed by AI/ML research and platform engineering at RIT from Aug
            2024. Moving to Sunnyvale, CA on Dec 20, 2026; open to relocation and available full-time January 2027.
          </p>
          <a className="btn btn-secondary" href={RESUME}>
            Download résumé (PDF)
          </a>
        </div>
      </section>

      <section aria-label="At a glance" className="wrap">
        <dl className="glance">
          <div>
            <dt className="label">BACKEND INDUSTRY</dt>
            <dd>5 years, 2019 to 2024</dd>
            <dd>TCS and EY, client engagements</dd>
          </div>
          <div>
            <dt className="label">DOMAINS</dt>
            <dd>Lending, fraud, portfolios</dd>
            <dd>Decisioning & data platforms</dd>
          </div>
          <div>
            <dt className="label">AI/ML & RESEARCH</dt>
            <dd>Began at RIT, Aug 2024</dd>
            <dd>GRA, Lead Developer - FedLearn</dd>
          </div>
          <div>
            <dt className="label">AVAILABILITY</dt>
            <dd>Sunnyvale, CA (from Dec 20, 2026)</dd>
            <dd>M.S. CS Dec 2026 · Full-time Jan 2027</dd>
          </div>
        </dl>
      </section>

      <section aria-label="Career timeline" className="wrap" style={{ marginTop: 32 }}>
        <Figure
          src="images/diagrams/fin-career-timeline.svg"
          width={1200}
          height={290}
          alt="Career and academic timeline: TCS Senior Systems Engineer on USAA Consumer Lending from Jul 2019 to Apr 2022, EY Senior Technology Consultant in Software Engineering for Morgan Stanley and BlackRock from Apr 2022 to Jul 2024, RIT M.S. in Computer Science from Aug 2024 to Dec 2026 expected, and RIT Graduate Research Assistant, Lead Developer - FedLearn from Mar 2026 to present."
          caption="Timeline: five years of backend production (TCS, EY) followed by AI/ML coursework and ML infrastructure at RIT (Aug 2024 onward)."
        />
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
              Parallel Computing, Machine Learning, Artificial Intelligence, Deep Learning, Advanced Computer Vision,
              Big Data Analytics
            </span>
          </div>
          <div>
            <strong>B.Tech Computer Science and Engineering · Sikkim Manipal Institute of Technology</strong>
            <span className="when">Jun 2015 to Jul 2019</span>
          </div>
          <div>
            <strong>AWS Certified Cloud Practitioner · Oracle Certified Associate, Java Programmer</strong>
          </div>
        </div>
      </section>
    </>
  );
}
