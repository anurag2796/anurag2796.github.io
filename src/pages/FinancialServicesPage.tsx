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
  team: "Embedded in a Morgan Stanley fraud-technology team (3 services owned) and a BlackRock portfolio team; TCS USAA Consumer Lending team",
  context: "Production backend engineering for Morgan Stanley & BlackRock (EY, Bengaluru) and USAA (TCS, Hyderabad)",
  status: "Production delivery · proprietary client repositories",
  stack:
    "Java · Scala · Spring Boot · REST · IBM MQ · Kafka · Redis · MySQL · Couchbase · NoSQL · Docker · OpenShift · Jenkins · UrbanCode Deploy · Prometheus · Grafana · Java on a Spark-backed platform",
  links: [],
};

const PROBLEMS = [
  {
    who: "EY · MORGAN STANLEY",
    title: "Real-time fraud screening",
    text: "A real-time fraud-screening pipeline had to stay within its end-to-end SLA as it expanded from one payment type to five, while analysts spent too long manually reviewing suspected cases.",
  },
  {
    who: "EY · BLACKROCK (~6 MONTHS)",
    title: "Portfolio platform migration",
    text: "A re-architected portfolio-management platform (Java on a Spark-backed platform) needed proof it matched or beat the legacy system across nested portfolio hierarchies, alongside cleaner portfolio and position data behind a multi-user console.",
  },
  {
    who: "TCS · USAA (CONSUMER LENDING)",
    title: "Consumer lending decisioning",
    text: "Personal and auto loan applications needed enrichment from internal data and other teams' services, risk checks, rule-based decisioning, persistence and event publishing, plus resilient retries and on-call recovery.",
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
      "Operations teams reviewing cases the automation referred to them, plus junior developers I mentored",
    ],
  },
  {
    id: "s3",
    n: "03",
    title: "Constraints",
    items: [
      "End-to-end SLA on real-time fraud screening as payment types were added",
      "Lending decisions had to stay correct when upstream data was slow or incomplete",
      "Portfolio migration results had to be proven against the legacy baseline across nested hierarchies",
    ],
  },
  {
    id: "s4",
    n: "04",
    title: "What I built and owned",
    items: [
      "Three production Scala services (enrichment and persistence), Redis caching, and pipeline changes as screening grew from 1 to 5 payment types",
      "Validation and cleansing rules plus the hierarchical legacy-vs-new comparison report for BlackRock's portfolio platform",
      "Features, defect fixes, tests, Couchbase/MySQL data access, timeouts/retries, failed-message replay, and the Kafka producer integration across a 6-service pipeline",
      "Point of contact and code reviewer for multiple EY components; Jenkins CI/CD, UrbanCode Deploy releases, on-call diagnosis, and RCAs",
    ],
  },
];

const OUTCOMES = [
  [
    "Screening SLA from 5,000 ms to under 500 ms (10×)",
    "Added Redis caching, taking database round-trips off the critical path",
    "EY · Morgan Stanley",
    "active",
    "● Confirmed (end-to-end SLA)",
  ],
  [
    "Contributed to 75% less manual review time",
    "Contributed to the team's triage automation",
    "EY · Morgan Stanley",
    "demo",
    "◆ Reported (team figure)",
  ],
  [
    "Expanded screening from 1 to 5 payment types",
    "Delivered pipeline changes across enrichment, rules and persistence",
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
    "6-service lending pipeline",
    "Personal and auto loans: queue intake, enrichment, Java rules, MySQL/Couchbase, Kafka publishing",
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
            The lending work at TCS and the fraud-screening work at EY followed the same broad shape: queue intake,
            enrichment, rule-based decisioning, persistence, event publishing and a human-review path. Each stage ran
            as its own service so teams could release changes independently.
          </p>
          <p className="p">
            The figure below shows that general pattern only. Client system designs, service names, rules and data
            stay confidential; I&apos;m happy to talk through the engineering decisions in an interview.
          </p>
        </div>
        <Figure
          src="images/diagrams/fin-pattern.svg"
          width={1200}
          height={400}
          alt="Generalized pipeline pattern: queue intake, enrichment backed by a Redis cache, rule-based decision with a human review queue, persistence to SQL or NoSQL, and Kafka event publishing, with timeouts, retries and replay of failed messages at every stage. No client system is depicted."
          caption="Figure 1. The general pattern I worked in at TCS and EY. Not a diagram of any client system."
        />
      </section>

      <section className="wrap sec reveal">
        <div className="split">
          <div className="stack-sm" aria-labelledby="s6">
            <SecHead id="s6" n="06">
              Integration decisions
            </SecHead>
            <ul className="ruled-list">
              <li>
                <strong>Take database round-trips off the SLA path.</strong> Added Redis caching so end-to-end
                screening dropped from 5,000 ms to under 500 ms without changing screening outcomes.
              </li>
              <li>
                <strong>Validate migrations with reconciliation.</strong> Added validation and cleansing rules on
                BlackRock&apos;s portfolio and position data (+15% accuracy) and built a comparison report separating
                matches, improvements and regressions.
              </li>
              <li>
                <strong>Persist first, then publish.</strong> The lending pipeline stored the final record before
                publishing it to Kafka, and held repeatedly failing messages for replay instead of dropping them.
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
                Diagnosed recurring production incidents on call (dependency slowdowns, malformed input, release
                regressions) using Prometheus and Grafana, shipped fixes, replayed failed messages and wrote RCAs.
              </li>
              <li>
                Released services through IBM UrbanCode Deploy (dev → QA → prod) on Docker and OpenShift, and
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
        <div className="mb-28">
          <Figure
            src="images/diagrams/fin-latency.svg"
            width={1200}
            height={360}
            alt="Bar chart of end-to-end screening time at EY: 5,000 ms before versus under 500 ms after adding Redis caching, labeled < 500 ms."
            caption="Figure 2. End-to-end screening time, EY engagement: 5,000 ms before versus under 500 ms after Redis caching."
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
                Owned 3 production services in a larger platform (not the entire platform), and contributed to triage
                automation rather than claiming sole ownership of the −75% review-time figure.
              </li>
              <li>
                Early-career TCS quantitative impact metrics (volume, latency, uptime) are not recalled and are omitted
                rather than estimated.
              </li>
              <li>
                At BlackRock, worked in core Java services and validation around a Spark-backed platform (platform
                exposure only).
              </li>
            </ul>
          </div>
          <div className="read confidential" aria-labelledby="s10">
            <h2 id="s10" className="label">
              10 · CONFIDENTIALITY
            </h2>
            <p>
              This work was done as an employee of EY and TCS on client engagements (Morgan Stanley, BlackRock, USAA).
              Client system designs, internal project and service names, proprietary rules and client data are left
              out. This page describes my role, the general engineering pattern and my results.
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
