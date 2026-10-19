import { Go } from "@/components/links";
import { Pager, SecHead } from "@/components/ui-bits";
import { usePageTitle } from "@/lib/nav";
import { ROUTES } from "@/site";

const PROBLEMS = [
  {
    who: "EY · INVESTMENT BANK",
    title: "Real-time fraud screening",
    text: "A transaction-screening pipeline had to stay fast while the platform expanded from one payment rail to five, and analysts spent too long on manual review.",
  },
  {
    who: "EY · ASSET MANAGER",
    title: "Portfolio data and migration",
    text: "Portfolio services fed a console used by several user groups. Data errors were corrected downstream, and a Java/Spark re-architecture needed proof it matched the legacy system.",
  },
  {
    who: "TCS · US FINANCIAL SERVICES",
    title: "Consumer lending at volume",
    text: "Core-banking and lending APIs carried more than a million transactions a day and needed faster, safer releases and quicker incident recovery.",
  },
];

const THREE = [
  {
    id: "s2",
    n: "02",
    title: "Stakeholders",
    items: [
      "Product stakeholders whose changing needs I turned into requirements",
      "Several distinct user groups of the portfolio console",
      "Junior developers I mentored and reviewed",
    ],
  },
  {
    id: "s3",
    n: "03",
    title: "Constraints",
    items: [
      "Real-time latency targets on screening",
      "99.9% availability on lending APIs",
      "Changes had to match existing systems before migration",
    ],
  },
  {
    id: "s4",
    n: "04",
    title: "What I owned",
    items: [
      "Three screening services: persistence, core enricher, additional enricher",
      "Point of contact and code reviewer for multiple components",
      "On-call production support for lending services",
    ],
  },
];

const OUTCOMES = [
  ["70% lower response time", "Redis-backed distributed caching", "EY"],
  ["75% lower manual-review time", "Automated triage in the fraud-decisioning workflow", "EY"],
  ["1M+ transactions a day at 99.9% uptime", "Spring Boot APIs on Kafka and OpenShift", "TCS"],
  ["40% shorter deployment lead time", "CI/CD and containerized delivery", "TCS"],
  ["35% lower MTTR", "Monitoring plus root-cause fixes", "TCS"],
];

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
            <span>Backend · Data</span>
          </p>
          <h1 id="t-h" className="long">
            Real-time decisioning and backend platforms for financial services
          </h1>
          <p className="cs-lede">
            Five years of production delivery inside client engagements at EY and TCS: fraud screening, portfolio data
            and consumer lending.
          </p>
        </div>
        <dl className="cs-meta">
          <div>
            <dt className="label">EY · 2022 TO 2024</dt>
            <dd>Senior Technology Consultant</dd>
          </div>
          <div>
            <dt className="label">TCS · 2019 TO 2022</dt>
            <dd>Software Engineer</dd>
          </div>
          <div>
            <dt className="label">ENGAGEMENTS</dt>
            <dd>An investment bank, an asset manager, a US financial-services provider</dd>
          </div>
          <div>
            <dt className="label">STACK</dt>
            <dd className="tech" style={{ fontSize: 13 }}>
              Java · Scala · Spring Boot · Kafka · MQ · Redis · MongoDB · MySQL · OpenShift
            </dd>
          </div>
        </dl>
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
            Where the changes landed
          </SecHead>
          <p className="p">
            A simplified view of the screening work, limited to the parts I owned and changed. Internal system names and
            data flows are omitted.
          </p>
        </div>
        <figure>
          <div
            role="img"
            aria-label="Figure 1. Transactions enter the screening pipeline; the three owned services persist and enrich them; Redis caching was added on hot read paths; automated triage queues route cases before manual review."
            className="fs-panel fs-flow"
          >
            <div className="fs-node">
              <span className="label">IN</span>
              <strong>Transactions</strong>
              <span>one rail, then five</span>
            </div>
            <span className="arrow" aria-hidden="true">
              →
            </span>
            <div className="fs-owned">
              <span className="label">OWNED SERVICES</span>
              <div className="svcs">
                <span>Persistence</span>
                <span>Core enricher</span>
                <span>Additional enricher</span>
              </div>
              <span className="cache">+ Redis distributed cache on hot read paths</span>
            </div>
            <span className="arrow" aria-hidden="true">
              →
            </span>
            <div className="fs-node">
              <span className="label">DECISION</span>
              <strong>Automated triage queues</strong>
              <span>before analyst review</span>
            </div>
          </div>
          <figcaption style={{ marginTop: 12, fontSize: 14 }}>Figure 1. Screening pipeline, sanitized.</figcaption>
        </figure>
      </section>

      <section className="wrap sec reveal">
        <div className="split">
          <div className="stack-sm" aria-labelledby="s6">
            <SecHead id="s6" n="06">
              Integration decisions
            </SecHead>
            <ul className="ruled-list">
              <li>
                <strong>Profile first, then cache.</strong> Redis was added on the read paths profiling showed were hot,
                not everywhere.
              </li>
              <li>
                <strong>Fix data where it enters.</strong> Validation and cleansing moved into the portfolio pipeline
                instead of correcting records downstream.
              </li>
              <li>
                <strong>Gate releases on quality.</strong> CI/CD ran behind SonarQube quality gates.
              </li>
            </ul>
          </div>
          <div className="stack-sm" aria-labelledby="s7">
            <SecHead id="s7" n="07">
              Rollout and support
            </SecHead>
            <ul className="ruled-list">
              <li>
                Validated the Java/Spark re-architecture against the legacy baseline across nested portfolio
                hierarchies, finding correctness gaps and regressions before migration.
              </li>
              <li>Set up Prometheus and Grafana monitoring; root-cause fixes followed.</li>
              <li>Released through UrbanCode Deploy and carried on-call support.</li>
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="s8" className="wrap sec reveal">
        <SecHead id="s8" n="08">
          Measured outcomes
        </SecHead>
        <div className="table-scroll boxed stack-mobile">
          <table className="table">
            <caption>Table 1. Outcomes as reported on my résumé; underlying dashboards belong to the clients.</caption>
            <thead>
              <tr>
                <th scope="col">OUTCOME</th>
                <th scope="col">HOW</th>
                <th scope="col">WHERE</th>
              </tr>
            </thead>
            <tbody>
              {OUTCOMES.map(([o, h, w]) => (
                <tr key={o}>
                  <th scope="row">{o}</th>
                  <td className="dim" data-label="HOW">
                    {h}
                  </td>
                  <td className="code" data-label="WHERE">
                    {w}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="s9" className="wrap sec sec-last reveal">
        <div className="read confidential">
          <h2 id="s9" className="label">
            09 · CONFIDENTIALITY
          </h2>
          <p>
            This work was done as an employee of EY and TCS on client engagements. Client systems, data and internal
            names are left out; detail stops at what my résumé already states.
          </p>
        </div>
        <Pager
          prev={{ to: ROUTES.trb, label: "PREVIOUS", title: "TigerResearchBuddy" }}
          next={{ to: ROUTES.experience, label: "NEXT", title: "Full experience" }}
        />
      </section>
    </>
  );
}
