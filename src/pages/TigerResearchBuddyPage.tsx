import { Figure } from "@/components/Figure";
import { Go } from "@/components/links";
import { ProjectGlance } from "@/components/ProjectGlance";
import { Pager, SecHead, Shot } from "@/components/ui-bits";
import { usePageTitle } from "@/lib/nav";
import { ROUTES } from "@/site";
import type { Glance } from "@/types/content";

const GLANCE: Glance = {
  role: "Developer: retrieval pipeline, DeepDistiller extraction, knowledge graph and Jetson Orin deployment",
  period: "Feb – Apr 2026 (continued as Research Circle in Oct – Nov 2026)",
  team: "Effectively solo on TigerResearchBuddy (52 of 55 commits on dev; 3 bot commits); Research Circle continued with Prakyat and Isha (75 of 83 Oct–Nov commits)",
  context: "RIT research discovery (papers, faculty, topics); Imagine RIT public demo",
  status: "Deployed demo on NVIDIA Jetson Orin · proprietary license · no retrieval benchmark yet",
  stack: "Python · React · TypeScript · LanceDB / ChromaDB · Ollama · Gemini · NVIDIA Jetson Orin",
  links: [],
};

const BUILT = [
  "Hybrid retrieval flow: query expansion, vector search (LanceDB / ChromaDB) and TigerBrain graph traversal, context merging and generation",
  "RIT-focused crawlers (smart, scholar, PDF, vision) and paper download across ~22,700 lines of Python in 7 subsystem packages",
  "Document extraction iterated into the VLM-validated DeepDistiller pipeline",
  "Knowledge-graph builder, analytics, mining and export tooling",
  "Faculty and research matching, UN SDG impact scoring, and three prompting modes (encouraging, analytical, critical), backed by 37 test files",
];

const FAILURES = [
  ["1 · DOCUMENT", "Write a post-mortem for each failed pipeline run."],
  ["2 · CLASSIFY", "Group failures into categories rather than patching symptoms."],
  ["3 · FIX", "Fix each category at its source."],
  ["4 · PIN", "Add a regression test so it stays fixed."],
];

const RESULTS = [
  {
    scopeKind: "active" as const,
    scopeLabel: "● Confirmed (hardware demo)",
    claim: "End-to-end pipeline deployed and demonstrated live on NVIDIA Jetson Orin at Imagine RIT using hardware-aware profiles and CUDA setup scripts.",
  },
  {
    scopeKind: "active" as const,
    scopeLabel: "● Confirmed (repo record)",
    claim: "37 test files on the dev branch, including categorized regression tests pinned after pipeline post-mortems and pre-Jetson bug fixes.",
  },
  {
    scopeKind: "demo" as const,
    scopeLabel: "◆ Reported (Research Circle)",
    claim: "Team continuation (Oct–Nov 2026) ingested 2,100+ PDF paper records (linking 850+ publications to faculty), expanded the graph up to 2,500 nodes, and deployed privately over HTTPS.",
  },
  {
    scopeKind: "prototype" as const,
    scopeLabel: "▲ Not measured",
    claim: "Held-out retrieval quality (Recall@k, MRR, NDCG), answer quality, and Mac vs Jetson Orin latency benchmarks have not been run or committed.",
  },
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
    title: "Local Ollama primary, Gemini optional",
    why: "Keeps research material on-device and works offline on constrained hardware without mandatory cloud API calls.",
    tradeoff: "Bound by local model capacity and board memory compared with hosted models.",
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
            generation and deployment on constrained hardware. Active work here ran Feb–Apr 2026; in Oct–Nov 2026 the
            project continued as Research Circle in a team repository with two teammates.
          </p>
        </div>
        <ProjectGlance glance={GLANCE} />
        <figure className="stack-sm" style={{ marginTop: 48 }}>
          <Shot image="trb" eager />
          <figcaption style={{ fontSize: 14 }}>
            Figure 0. From RIT sources to an assistant response. Section 02 details each stage.
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
        <div className="read stack mb-28">
          <SecHead id="s2" n="02">
            Architecture and how it works
          </SecHead>
          <p className="p">
            The pipeline indexes crawled RIT faculty pages and papers into both a vector store and the TigerBrain
            knowledge graph, supporting three assistant personas (encouraging, analytical, critical), faculty matching,
            and UN SDG idea scoring. Development continued in Oct–Nov 2026 in a team repository as Research Circle.
          </p>
        </div>
        <Figure
          src="images/diagrams/trb-hld.svg"
          alt="TigerResearchBuddy architecture: RIT web crawlers and research PDFs feed VLM-validated DeepDistiller into research cards, indexing into a LanceDB/ChromaDB vector store and the TigerBrain knowledge graph. User queries expand and run through hybrid retrieval across both indexes into local Ollama or optional Gemini for answers, faculty matches, and UN SDG scores. Supporting panels show the confirmed NVIDIA Jetson Orin demo at Imagine RIT and the Oct–Nov 2026 Research Circle team continuation."
          caption="Figure 1. Pipeline from crawl and VLM distillation to hybrid retrieval, Jetson Orin demo, and Research Circle continuation."
          width={1200}
          height={660}
        />
        <details className="disclosure">
          <summary>Read the diagram as a list</summary>
          <ol>
            <li>Crawlers and PDF downloaders collect RIT research pages and papers.</li>
            <li>DeepDistiller extracts document content and validates it with a vision-language model into research cards.</li>
            <li>Cards are indexed into LanceDB / ChromaDB vectors and the TigerBrain knowledge graph.</li>
            <li>Queries expand and pull merged context from both vector search and graph traversal.</li>
            <li>Ollama generates locally (or Gemini optionally), running on NVIDIA Jetson Orin for the Imagine RIT demo; Oct–Nov work continued in Research Circle.</li>
          </ol>
        </details>
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
            Results and evaluation status
          </SecHead>
          <p className="p">
            The demonstration shows the pipeline works end to end on NVIDIA Jetson Orin; retrieval and answer quality
            have not yet been benchmarked against a held-out query set.
          </p>
        </div>
        <ul className="defs mt-24" style={{ marginBottom: 32 }}>
          {RESULTS.map((r) => (
            <li key={r.claim}>
              <span>
                <span className={`status status--${r.scopeKind}`}>{r.scopeLabel}</span>
              </span>
              <span>{r.claim}</span>
            </li>
          ))}
        </ul>
        <div className="table-scroll ruled stack-mobile" style={{ maxWidth: 960 }}>
          <table className="table">
            <caption>Table 1. Planned evaluation. No retrieval-quality results yet.</caption>
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

      <section className="wrap sec reveal">
        <div className="split">
          <div className="stack-sm" aria-labelledby="s8">
            <SecHead id="s8" n="08">
              Known limitations
            </SecHead>
            <ul className="marked warn">
              <li>No held-out retrieval or answer-quality benchmark yet (Recall@k, MRR, and NDCG remain unmeasured).</li>
              <li>
                Branch sprawl: <code>main</code> is 24 commits behind <code>dev</code>, and conversational memory plus a
                dedicated hybrid-retrieval module live on an unmerged agent branch, so no single checkout holds every
                feature.
              </li>
              <li>37 test files exist on dev, but there is no CI workflow gating changes yet.</li>
              <li>
                Proprietary license (All rights reserved; not open source). Active TigerResearchBuddy feature work
                stopped in April 2026 before continuing as Research Circle in Oct–Nov 2026.
              </li>
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
      </section>

      <section aria-labelledby="s10" className="wrap sec sec-last">
        <SecHead id="s10" n="10">
          Evidence links
        </SecHead>
        <p className="p read" style={{ marginTop: 12 }}>
          The TigerResearchBuddy repository (<code>dev</code> branch head <code>7e39237</code>) is proprietary and not
          publicly linked. Its Oct–Nov 2026 continuation is documented on the Nexus + Research Circle case study.
        </p>
        <div className="link-buttons">
          <Go className="btn btn-secondary" to={ROUTES.nexus}>
            Nexus + Research Circle continuation →
          </Go>
        </div>
        <Pager
          prev={{ to: ROUTES.fedlearn, label: "PREVIOUS", title: "FedLearn Platform" }}
          next={{ to: ROUTES.finserv, label: "NEXT CASE STUDY", title: "Financial-services delivery" }}
        />
      </section>
    </>
  );
}
