import { Figure } from "@/components/Figure";
import { Go } from "@/components/links";
import { ProjectGlance } from "@/components/ProjectGlance";
import { Pager, SecHead } from "@/components/ui-bits";
import { usePageTitle } from "@/lib/nav";
import { RESUME, ROUTES } from "@/site";
import type { Glance } from "@/types/content";

const GLANCE: Glance = {
  role: "Senior Technology Consultant (Software Engineering) at EY · Senior Systems Engineer (promoted from Systems Engineer) at TCS",
  period: "Jul 2019 – Jul 2024 (TCS Jul 2019 – Apr 2022 · EY Apr 2022 – Jul 2024)",
  team: "Embedded in Morgan Stanley Fraud Hub (~8 services, 3 owned) and BlackRock portfolio teams; TCS USAA Consumer Lending (6-service pipeline)",
  context: "Production backend engineering for Morgan Stanley & BlackRock (EY, Bengaluru) and USAA (TCS, Hyderabad)",
  status: "Production delivery · proprietary client repositories",
  stack:
    "Java · Scala · Spring Boot · REST · IBM MQ · Kafka · Redis · MySQL · Couchbase · NoSQL · LDAP · Docker · OpenShift · Jenkins · UrbanCode Deploy · Prometheus · Grafana · Java on a Spark-backed platform",
  links: [],
};

const PROBLEMS = [
  {
    who: "EY · MORGAN STANLEY (FRAUD HUB)",
    title: "Real-time fraud screening",
    text: "A real-time fraud-screening pipeline had to stay within its end-to-end SLA as payment rails expanded from one (P2P) to five (P2P, ACH, branch ACH, wire, branch wire), while analysts spent too long manually reviewing suspected cases.",
  },
  {
    who: "EY · BLACKROCK (~6 MONTHS)",
    title: "Portfolio platform migration",
    text: "A re-architected portfolio-management platform (Java on a Spark-backed platform) needed proof it matched or beat the legacy system across nested portfolio hierarchies, alongside cleaner portfolio and position data behind a multi-user console.",
  },
  {
    who: "TCS · USAA (CONSUMER LENDING)",
    title: "Consumer lending decisioning",
    text: "Thin personal and auto loan applications arrived on IBM MQ and needed enrichment from internal stores and three cross-team systems, risk checks, rule-based decisioning, persistence and Kafka publishing, plus resilient retries and on-call recovery.",
  },
];

const THREE = [
  {
    id: "s2",
    n: "02",
    title: "Stakeholders",
    items: [
      "Product stakeholders whose changing needs I turned into technical requirements",
      "Distinct user groups using BlackRock's portfolio console and USAA teams consuming Kafka loan records",
      "Fraud analysts and loan underwriters handling referred cases, plus junior developers I mentored",
    ],
  },
  {
    id: "s3",
    n: "03",
    title: "Constraints",
    items: [
      "End-to-end SLA on real-time fraud screening across 5 payment rails",
      "Fail-safe lending decisions: incomplete bureau or address data went to underwriter review, never auto-approval",
      "Portfolio migration results had to be proven against the legacy baseline across nested hierarchies",
    ],
  },
  {
    id: "s4",
    n: "04",
    title: "What I built and owned",
    items: [
      "Three production Scala services in Fraud Hub (core enricher, additional enricher, persistence), Redis SLA caching, and pipeline changes across 1 → 5 payment rails",
      "Validation and cleansing rules plus the hierarchical legacy-vs-new comparison report for BlackRock's portfolio platform",
      "Features, defect fixes, tests, Couchbase/MySQL data access, timeouts/retries, backout replay, and the Kafka producer integration across USAA's 6-service pipeline",
      "Point of contact and code reviewer for multiple EY components; Jenkins CI/CD, UrbanCode Deploy releases, on-call diagnosis, and RCAs",
    ],
  },
];

const OUTCOMES = [
  [
    "Screening SLA from 5,000 ms to under 500 ms (10×)",
    "Cached inbound transactions in Redis, taking database round-trips off the SLA path",
    "EY · Morgan Stanley",
    "active",
    "● Confirmed (end-to-end SLA)",
  ],
  [
    "Contributed to 75% less manual review time",
    "Triage automation: auto-routing, pre-filled evidence and auto-clearing low-risk cases",
    "EY · Morgan Stanley",
    "demo",
    "◆ Reported (team figure)",
  ],
  [
    "Expanded Fraud Hub from 1 to 5 payment rails",
    "Delivered pipeline changes across enrichment, rules and persistence (P2P to ACH, branch ACH, wire, branch wire)",
    "EY · Morgan Stanley",
    "active",
    "● Confirmed",
  ],
  [
    "+15% portfolio data accuracy",
    "Validation and cleansing rules plus legacy-vs-new comparison report (measured by before/after reconciliation)",
    "EY · BlackRock",
    "active",
    "● Confirmed (reconciliation)",
  ],
  [
    "6-service lending pipeline across 3 cross-team integrations",
    "Personal and auto loans: IBM MQ intake, credit bureau, credit card, LDAP directory, Java rules, MySQL/Couchbase, Kafka publishing",
    "TCS · USAA",
    "active",
    "● Confirmed scope",
  ],
] as const;

export function FinancialServicesPage() {
  usePageTitle("Financial-services delivery");

  return (
    <>
      <section aria-labelledby="t-h" className="wrap cs-intro">
        <Go to={ROUTES.work} className="back-link">
          ← All work
        </Go>
        <div className="read enter">
          <p className="meta-line">
            <span className="accent">CASE STUDY 03</span>
            <span className="status status--production">■ Production experience</span>
            <span>Backend · Decisioning</span>
          </p>
          <h1 id="t-h" className="long">
            Financial-services delivery
          </h1>
          <p className="cs-lede">
            Five years of backend engineering across TCS and EY, including building transaction-decisioning pipelines
            twice: consumer lending for USAA (TCS) and real-time fraud screening for Morgan Stanley (EY), plus
            portfolio-platform validation for BlackRock (EY).
          </p>
        </div>
        <ProjectGlance glance={GLANCE} />
      </section>

      <section aria-labelledby="s1" className="wrap sec reveal">
        <SecHead id="s1" n="01">
          Business problems
        </SecHead>
        <div className="problem-grid">
          {PROBLEMS.map((p) => (
            <article className="problem" key={p.title}>
              <span className="label">{p.who}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap sec reveal">
        <div className="three-up">
          {THREE.map((t) => (
            <div key={t.id} aria-labelledby={t.id}>
              <SecHead id={t.id} n={t.n}>
                {t.title}
              </SecHead>
              <ul className="ruled-list">
                {t.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="s5" className="wrap sec reveal">
        <div className="read stack mb-28">
          <SecHead id="s5" n="05">
            Decisioning pipelines twice
          </SecHead>
          <p className="p">
            Both USAA consumer lending (TCS) and Morgan Stanley Fraud Hub (EY) share the same pipeline shape: IBM MQ
            intake, enrichment, rule-based decisioning, persistence and a manual-review path. Internal repository names
            and proprietary rules are omitted.
          </p>
          <p className="p">
            Both pipelines were split across independent services—six Spring Boot repositories at USAA and roughly eight
            services at Morgan Stanley—so teams could release changes without redeploying the entire flow. At BlackRock,
            hierarchical comparison runs across nested portfolios sorted every legacy-vs-new difference into matches,
            improvements, and regressions.
          </p>
        </div>
        <div className="stack" style={{ gap: 20 }}>
          <Figure
            src="images/diagrams/fin-fraudhub-pipeline.svg"
            width={1200}
            height={590}
            alt="Morgan Stanley Fraud Hub pipeline: transactions across five payment rails arrive over IBM MQ, enter the orchestrator where the SLA clock starts and inbound transactions are cached in Redis, pass over Kafka through the owned core enricher, rule-based decision engine, optional owned additional enricher looping back to the decision engine, and owned persistence to NoSQL where the SLA clock stops, with suspected cases routed to automated triage queues."
            caption="Figure 1. EY / Morgan Stanley Fraud Hub: IBM MQ intake, Kafka between services, owned enrichment and persistence services, Redis SLA cache, and triage queues."
          />
          <Figure
            src="images/diagrams/fin-tcs-pipeline.svg"
            width={1200}
            height={660}
            alt="TCS USAA Consumer Lending 6-service pipeline: thin personal and auto loan requests arrive on IBM MQ and flow through six Spring Boot services (descriptive names: intake, context retrieval, credit retrieval, risk check, decision, data/publish) with other-team calls to credit-card service, LDAP directory, and credit-bureau gateway, MQ backout queue replay on failures, MySQL and Couchbase storage, and Kafka publishing."
            caption="Figure 2. TCS / USAA Consumer Lending 6-service pipeline (descriptive service names): IBM MQ intake, cross-team lookups, Java decision rules, MySQL and Couchbase, and Kafka output."
          />
        </div>
      </section>

      <section className="wrap sec reveal">
        <div className="split">
          <div className="stack-sm" aria-labelledby="s6">
            <SecHead id="s6" n="06">
              Integration decisions
            </SecHead>
            <ul className="ruled-list">
              <li>
                <strong>Take database round-trips off the SLA path.</strong> Cached inbound transactions in Redis so
                end-to-end Fraud Hub screening dropped from 5,000 ms to under 500 ms without changing screening
                outcomes.
              </li>
              <li>
                <strong>Validate migrations with reconciliation.</strong> Added validation and cleansing rules on
                BlackRock&apos;s portfolio and position data (+15% accuracy) and built a comparison report separating
                matches, improvements and regressions.
              </li>
              <li>
                <strong>Persist first, fail safe on missing data.</strong> USAA&apos;s lending pipeline persisted the
                final record to MySQL/Couchbase before publishing to Kafka, routed incomplete data to underwriter review,
                and held repeated failures on an IBM MQ backout queue for replay.
              </li>
            </ul>
          </div>
          <div className="stack-sm" aria-labelledby="s7">
            <SecHead id="s7" n="07">
              Rollout and support
            </SecHead>
            <ul className="ruled-list">
              <li>
                Validated BlackRock&apos;s re-architected portfolio platform (Java on a Spark-backed platform) against
                the legacy baseline across nested portfolio hierarchies before migration.
              </li>
              <li>
                Diagnosed recurring USAA production incidents on call (dependency slowdowns, malformed input, release
                regressions) using Prometheus and Grafana, shipped fixes, replayed backout-queue messages and wrote
                RCAs.
              </li>
              <li>
                Released USAA services through IBM UrbanCode Deploy (dev → QA → prod) on Docker and OpenShift, and
                maintained Jenkins CI/CD and production support at EY.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="s8" className="wrap sec reveal">
        <SecHead id="s8" n="08">
          Results (with scope)
        </SecHead>
        <div className="stack mb-28" style={{ gap: 20 }}>
          <Figure
            src="images/diagrams/fin-latency.svg"
            width={1200}
            height={360}
            alt="Bar chart of end-to-end pipeline SLA for Morgan Stanley Fraud Hub: 5,000 ms before with database round-trips on the SLA path versus under 500 ms after caching inbound transactions in Redis, labeled < 500 ms."
            caption="Figure 3. End-to-end pipeline SLA, Morgan Stanley Fraud Hub: 5,000 ms before versus under 500 ms after Redis caching."
          />
          <Figure
            src="images/diagrams/fin-rails.svg"
            width={1200}
            height={360}
            alt="Payment rail expansion at Morgan Stanley Fraud Hub: 1 rail at join (P2P) expanded to 5 payment rails (P2P, ACH, branch ACH, wire, branch wire)."
            caption="Figure 4. Morgan Stanley Fraud Hub expansion from 1 payment rail (P2P) to 5 rails (ACH, branch ACH, wire, branch wire added)."
          />
        </div>
        <div className="table-scroll boxed stack-mobile">
          <table className="table table-wide">
            <caption>
              Table 1. Outcomes and verified scope from EY and TCS engagements; underlying dashboards belong to the
              clients.
            </caption>
            <thead>
              <tr>
                <th scope="col">OUTCOME</th>
                <th scope="col">HOW</th>
                <th scope="col">WHERE</th>
                <th scope="col">SCOPE</th>
              </tr>
            </thead>
            <tbody>
              {OUTCOMES.map(([o, h, w, scopeKind, scopeLabel]) => (
                <tr key={o}>
                  <th scope="row">{o}</th>
                  <td className="dim" data-label="HOW">
                    {h}
                  </td>
                  <td className="code" data-label="WHERE">
                    {w}
                  </td>
                  <td data-label="SCOPE">
                    <span className={`status status--${scopeKind}`}>{scopeLabel}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="s9" className="wrap sec reveal">
        <div className="split">
          <div className="stack-sm">
            <SecHead id="s9" n="09">
              Known limitations
            </SecHead>
            <ul className="marked warn">
              <li>
                Client repositories, internal repository names, proprietary decision rules, and monitoring dashboards
                belong to EY, TCS, Morgan Stanley, BlackRock, and USAA and cannot be linked publicly.
              </li>
              <li>
                Owned 3 of ~8 production services in Fraud Hub (not the entire platform), and contributed to triage
                automation rather than claiming sole ownership of the −75% review-time figure (case counts not recalled).
              </li>
              <li>
                Early-career TCS/USAA quantitative impact metrics (transaction volume, latency, uptime) are not recalled
                and are omitted rather than estimated; service labels describe function rather than exact internal
                repository names.
              </li>
              <li>
                At BlackRock, worked in core Java services and validation around a Spark-backed platform (platform
                exposure only); the specific NoSQL product behind Fraud Hub persistence is not recalled.
              </li>
            </ul>
          </div>
          <div className="read confidential" aria-labelledby="s10">
            <h2 id="s10" className="label">
              10 · CONFIDENTIALITY
            </h2>
            <p>
              This work was done as an employee of EY and TCS on client engagements (Morgan Stanley, BlackRock, USAA).
              Internal repository names, proprietary rules and client data are left out; detail stops at what my
              authoritative work record already states.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="s11" className="wrap sec sec-last">
        <SecHead id="s11" n="11">
          Evidence links
        </SecHead>
        <p className="p read" style={{ marginTop: 12 }}>
          No public source-code or telemetry links exist for client engagements. Verification sits in the employment
          timeline and approved resume record.
        </p>
        <div className="link-buttons">
          <Go className="btn btn-secondary" to={ROUTES.experience}>
            Full experience timeline →
          </Go>
          <a className="btn btn-secondary" href={RESUME}>
            Approved resume (PDF) ↗
          </a>
        </div>
        <Pager
          prev={{ to: ROUTES.trb, label: "PREVIOUS", title: "TigerResearchBuddy" }}
          next={{ to: ROUTES.experience, label: "NEXT", title: "Full experience" }}
        />
      </section>
    </>
  );
}
