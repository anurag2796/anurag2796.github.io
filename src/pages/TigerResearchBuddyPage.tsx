import { Go } from "@/components/links";
import { Pager, SecHead, Shot } from "@/components/ui-bits";
import { usePageTitle } from "@/lib/nav";
import { ROUTES } from "@/site";

const STEPS = [
  { n: "1 · CRAWL", title: "RIT research crawler", detail: "paper download, vision crawler" },
  { n: "2 · EXTRACT", title: "DeepDistiller", detail: "VLM-validated document extraction" },
  { n: "3 · STRUCTURE", title: "Vector index + knowledge graph", detail: "graph builder, analytics, export" },
  { n: "4 · RETRIEVE", title: "Hybrid retrieval", detail: "query expansion → vector + graph → merged context", hot: true },
  { n: "5 · GENERATE", title: "Ollama (local) or Gemini", detail: "three assistant modes", hot: true },
];

const BUILT = [
  "The hybrid flow: query expansion, vector and graph retrieval, context merging and generation",
  "RIT-focused research crawling, paper download and a vision crawler",
  "Document extraction iterated into the VLM-validated DeepDistiller pipeline",
  "Knowledge-graph builder, analytics, mining and export tooling",
  "Faculty and research matching, and three prompting modes: encouraging, analytical, critical",
];

const FAILURES = [
  ["1 · DOCUMENT", "Write a post-mortem for each failed pipeline run."],
  ["2 · CLASSIFY", "Group failures into categories rather than patching symptoms."],
  ["3 · FIX", "Fix each category at its source."],
  ["4 · PIN", "Add a regression test so it stays fixed."],
];

const PLAN = [
  ["Faculty lookup, topic discovery", "Recall@k, MRR"],
  ["Entity and multi-hop graph questions", "NDCG, answer quality"],
  ["All query types", "Latency on Mac and Jetson Orin"],
];

const DECISIONS = [
  {
    title: "Hybrid retrieval over pure vector search",
    why: "Graph traversal keeps the links between papers, people and topics that similarity search drops.",
    tradeoff: "Two indexes to ingest into and keep consistent.",
  },
  {
    title: "Jetson Orin as the target",
    why: "Proves the system runs locally on constrained hardware, not only on a workstation.",
    tradeoff: "Hardware-specific processing and CUDA setup a cloud deployment would not need.",
  },
];

export function TigerResearchBuddyPage() {
  usePageTitle("TigerResearchBuddy");

  return (
    <>
      <section aria-labelledby="t-h" className="wrap cs-intro">
        <Go to={ROUTES.work} className="back-link">
          ← All work
        </Go>
        <div className="read enter">
          <p className="meta-line">
            <span className="accent">CASE STUDY 02</span>
            <span className="status status--demo">◆ Deployed demo</span>
            <span>AI Systems · Full-stack</span>
          </p>
          <h1 id="t-h">TigerResearchBuddy</h1>
          <p className="cs-lede">
            A local-first RIT research-discovery system combining vector retrieval, knowledge-graph traversal, and
            VLM-validated document extraction, deployed on NVIDIA Jetson Orin for a public demonstration.
          </p>
          <div className="why-note">
            <span className="kicker">WHY I BUILT IT</span>
            <p className="p">
              I wanted to encourage collaboration between students and researchers at RIT and help build a stronger
              research culture on campus. The first barrier is simply knowing who works on what, so TigerResearchBuddy
              makes that easy to find.
            </p>
          </div>
          <p className="p muted">
            Not a chat-with-PDFs demo. It covers the whole path: crawling, extraction, structured knowledge, retrieval,
            generation and deployment on constrained hardware.
          </p>
        </div>
        <dl className="cs-meta">
          <div>
            <dt className="label">ROLE</dt>
            <dd>Developer: retrieval pipeline, extraction and edge deployment</dd>
          </div>
          <div>
            <dt className="label">CONTEXT</dt>
            <dd>Research discovery for RIT: papers, faculty and topics</dd>
          </div>
          <div>
            <dt className="label">DEPLOYMENT</dt>
            <dd>NVIDIA Jetson Orin, public demonstration</dd>
          </div>
          <div>
            <dt className="label">STACK</dt>
            <dd className="tech" style={{ fontSize: 13 }}>
              Python · React · TypeScript · Ollama · Gemini
            </dd>
          </div>
        </dl>
        <figure className="stack-sm" style={{ marginTop: 48 }}>
          <Shot image="trb" eager />
          <figcaption style={{ fontSize: 14 }}>
            Figure 0. From RIT sources to a cited answer. Section 02 details each stage.
          </figcaption>
        </figure>
      </section>

      <section aria-labelledby="s1" className="wrap sec reveal">
        <div className="read stack">
          <SecHead id="s1" n="01">
            Problem
          </SecHead>
          <p className="p">
            Finding who at RIT works on what means reading across papers, faculty pages and topics that rarely link to
            each other. Plain vector search finds similar passages but loses those connections, and research material is
            better processed locally than sent to a hosted model by default.
          </p>
        </div>
      </section>

      <section aria-labelledby="s2" className="wrap sec reveal">
        <div className="read mb-28">
          <SecHead id="s2" n="02">
            Architecture
          </SecHead>
        </div>
        <figure>
          <div className="diagram-scroll">
            <div
              role="img"
              aria-label="Figure 1. TigerResearchBuddy pipeline: crawl, extract, structure, retrieve, generate, all deployable on Jetson Orin."
              className="dk-panel pipeline"
            >
              <div className="pipeline-steps">
                {STEPS.map((s, i) => (
                  <div key={s.n} className={`pipeline-step${s.hot ? " hot" : ""}`}>
                    <span className="n">{s.n}</span>
                    <strong>{s.title}</strong>
                    <span className="detail">{s.detail}</span>
                    {i < STEPS.length - 1 && (
                      <span className="arrow" aria-hidden="true">
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="pipeline-foot">
                <div>
                  <span className="dk-label">INTERFACE</span> · React and TypeScript; faculty and research matching;
                  idea-impact analysis
                </div>
                <div>
                  <span className="dk-label">RUNS ON</span> · NVIDIA Jetson Orin with hardware-aware processing, CUDA
                  setup and profiles
                </div>
              </div>
            </div>
          </div>
          <figcaption style={{ marginTop: 12, fontSize: 14 }}>Figure 1. Pipeline from crawl to generation.</figcaption>
          <details className="disclosure">
            <summary>Read the diagram as a list</summary>
            <ol>
              <li>Crawlers collect RIT research pages and papers.</li>
              <li>DeepDistiller extracts document content and validates it with a vision-language model.</li>
              <li>Content is indexed as vectors and as a knowledge graph.</li>
              <li>Queries are expanded, then answered from both indexes; contexts are merged.</li>
              <li>Ollama generates locally, or Gemini when configured.</li>
            </ol>
          </details>
        </figure>
      </section>

      <section className="wrap sec reveal">
        <div className="split">
          <div className="stack-sm" aria-labelledby="s3">
            <SecHead id="s3" n="03">
              What I built
            </SecHead>
            <ul className="ruled-list">
              {BUILT.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
          <div className="stack-sm" aria-labelledby="s4">
            <SecHead id="s4" n="04">
              Edge deployment
            </SecHead>
            <p className="p">Jetson Orin was a first-class target, not an untested arm64 checkbox.</p>
            <ul className="ruled-list">
              <li>Hardware-aware processing and device profiles</li>
              <li>CUDA-library setup and path handling for the board</li>
              <li>A deployment playbook used for the public demonstration</li>
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="s5" className="wrap sec reveal">
        <SecHead id="s5" n="05">
          How failures became tests
        </SecHead>
        <ol className="steps mt-24">
          {FAILURES.map(([k, v]) => (
            <li key={k}>
              <span className="label-accent">{k}</span>
              <span>{v}</span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="s6" className="wrap sec reveal">
        <div className="read stack">
          <SecHead id="s6" n="06">
            Evaluation status
          </SecHead>
          <p className="p">
            Retrieval and answer quality have not yet been measured against a held-out set. The demonstration shows the
            system works end to end on the board; it does not show how good the answers are. This is the plan:
          </p>
        </div>
        <div className="table-scroll ruled stack-mobile" style={{ maxWidth: 960 }}>
          <table className="table">
            <caption>Table 1. Planned evaluation. No results yet.</caption>
            <thead>
              <tr>
                <th scope="col">QUERY TYPE</th>
                <th scope="col">MEASURE</th>
                <th scope="col">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {PLAN.map(([q, m]) => (
                <tr key={q}>
                  <th scope="row">{q}</th>
                  <td data-label="MEASURE">{m}</td>
                  <td className="planned" data-label="STATUS">
                    ▲ Planned
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="s7" className="wrap sec reveal">
        <SecHead id="s7" n="07">
          Decisions and trade-offs
        </SecHead>
        <div className="decisions">
          {DECISIONS.map((d) => (
            <article className="decision" key={d.title}>
              <h3>{d.title}</h3>
              <p>
                <span className="why-l">WHY</span>
                {d.why}
              </p>
              <p className="tradeoff">
                <span className="to-l">TRADE-OFF</span>
                {d.tradeoff}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap sec sec-last reveal">
        <div className="split">
          <div className="stack-sm" aria-labelledby="s8">
            <SecHead id="s8" n="08">
              Known limitations
            </SecHead>
            <ul className="marked warn">
              <li>No held-out retrieval or answer-quality benchmark yet</li>
              <li>Some functionality sits on a separate development branch</li>
              <li>Substantial tests, but no CI yet</li>
              <li>Proprietary license; not open source</li>
            </ul>
          </div>
          <div className="stack-sm" aria-labelledby="s9">
            <SecHead id="s9" n="09">
              Next steps
            </SecHead>
            <ul className="marked next">
              <li>Unify the development branches</li>
              <li>Build the held-out set and report MRR and NDCG</li>
              <li>Add CI and one-command demo data</li>
              <li>Move datasets and indexes out of Git</li>
            </ul>
          </div>
        </div>
        <Pager
          prev={{ to: ROUTES.fedlearn, label: "PREVIOUS", title: "FedLearn Platform" }}
          next={{ to: ROUTES.finserv, label: "NEXT CASE STUDY", title: "Financial-services delivery" }}
        />
      </section>
    </>
  );
}
