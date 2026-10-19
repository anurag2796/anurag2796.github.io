import { Go, JumpLink } from "@/components/links";
import { FedLearnMiniArch, Pager, SecHead, Shot } from "@/components/ui-bits";
import { usePageTitle } from "@/lib/nav";
import { EXECUTORCH_ISSUE, FEDLEARN_REPO, ROUTES } from "@/site";

const TOC = [
  ["s-arch", "03 Architecture"],
  ["s-eval", "06 Methodology"],
  ["s-evidence", "07 Evidence"],
  ["s-security", "08 Security"],
  ["s-negative", "10 Negative results"],
  ["s-executorch", "11 ExecuTorch debugging"],
  ["s-limits", "12 Limits"],
] as const;

const MILESTONES = [
  ["Aug 2026", "Audited snapshot: migration-owned schema, seeded benchmark harnesses and committed raw results across nine languages."],
  ["Sep 2026", "Secure aggregation moved from an internal implementation to externally reachable flows, with cohort freeze, dropout handling and caller-index verification."],
  ["15 Sep 2026", "ExecuTorch max-pool backward fix prepared on a contribution branch (section 11)."],
  ["16 Sep 2026", "Canonical main at 006c6e1, the version this case study describes."],
];

const SURFACES = [
  ["Orchestrator", "Java 21 · Spring Boot 3 · Flyway", "Multi-tenant access, project visibility, audit, run lifecycle"],
  ["Training runtime", "Python · PyTorch · gRPC", "Strategies, coordinator, simulator, privacy, aggregation"],
  ["Web client", "React 19 · TypeScript · Vite", "Live dashboard; HttpOnly SameSite cookie auth"],
  ["Desktop client", "Electron", "Local training orchestration; OS-keychain auth"],
  ["Docker client", "Multi-architecture images", "Training on Apple Silicon, x86/NVIDIA and Jetson ARM64"],
  ["Mobile client", "React Native TurboModule", "On-device training via ExecuTorch on a physical Android handset"],
  ["Native layer", "C++", "Safetensors decoder matching the Python encoder byte for byte"],
];

const BUILT = [
  {
    title: "Backend",
    items: [
      "Spring Boot 3 API with multi-tenant access control and audit events",
      "Schema owned by versioned Flyway migrations",
      "gRPC model transfer with typed messages, streaming and version checks",
    ],
  },
  {
    title: "Full-stack and delivery",
    items: [
      "React dashboard with run state pushed over WebSocket, not polled",
      "Design tokens generated once for web, desktop and mobile",
      "Path-filtered CI per deployable unit and an API breaking-change gate",
    ],
  },
  {
    title: "AI systems",
    items: [
      "FedAvg, FedProx, FedAdam/FedYogi and DeComFL, not delegated to Flower or FedML",
      "Central DP with a pure-Python Rényi accountant",
      "Byzantine-robust and secure aggregation",
    ],
  },
];

const RULES = [
  ["a", "Check against a reference.", "Custom code is compared with Flower and Opacus before it is trusted."],
  ["b", "Use real hardware.", "Apple Silicon, NVIDIA x86, Jetson ARM64 and a physical Android handset, not only host-side proxies."],
  ["c", "State the scope.", "Simulator scale is reported as simulator scale; single-seed runs say so."],
  ["d", "Keep the record.", "Raw per-run data, missing cells, failures and retractions stay in the repository."],
];

const EVIDENCE = [
  {
    q: "Is the custom FedAvg correct?",
    setup: "200 weighted aggregations and training trajectories against Flower 1.20.0",
    result: "Max absolute difference 2.39 × 10⁻⁷",
    scope: "FedAvg only; other strategies validated separately",
  },
  {
    q: "Does it train across real machines?",
    setup: "FedAvg, CIFAR-10, 10 rounds on Apple M4 Max, Jetson AGX Orin and RTX 4060",
    result: "All rounds completed, no dropped clients",
    scope: "One LAN, one seed, IID partitions, small CNN, development transport",
  },
  {
    q: "How far does the coordinator scale?",
    setup: "20 rounds, 3 seeds, 10% participation, tiny linear model",
    result: "5,000 simulated clients",
    scope: "In-process CPU simulator, not networked device capacity",
  },
  {
    q: "Is privacy accounting right?",
    setup: "From-scratch RDP accountant compared with Opacus",
    result: "Matches across 154 orders",
    scope: "Accountant only, not end-to-end privacy",
  },
  {
    q: "Does central DP keep utility?",
    setup: "Eight-client SST-2 experiment",
    result: "No: 48.7 to 49.2% with DP, 57.9% without",
    scope: "Negative result at this cohort size; see section 10",
  },
];

const SECURITY = [
  ["Defect classes fixed", "Authorization, token-boundary and resource-exhaustion issues"],
  ["Web sessions", "HttpOnly SameSite cookies; no token readable from JavaScript"],
  ["Desktop credentials", "Stored in the operating-system keychain"],
  ["Secure aggregation", "Cohort freeze, dropout handling and caller-index verification"],
  ["Transport", "TLS is implemented for gRPC but is not yet the default in every deployment"],
];

const DECISIONS = [
  {
    k: "DECISION A",
    title: "Own the FL core instead of using Flower",
    why: "Control over custom strategies like DeComFL, and a simulator that shares production strategy objects.",
    tradeoff: "More to maintain, so correctness is pinned by equivalence tests against Flower.",
  },
  {
    k: "DECISION B",
    title: "gRPC and safetensors for weights",
    why: "Typed, streamable transfer with deterministic encoding a C++ decoder can verify.",
    tradeoff: "Generated clients and harder debugging than REST and JSON.",
  },
  {
    k: "DECISION C",
    title: "A Java control plane",
    why: "A mature model for access control, web auth and versioned migrations, kept apart from training.",
    tradeoff: "A JVM service in an otherwise Python and TypeScript codebase.",
  },
];

const RECORD = [
  ["neg", "NEGATIVE", "Central DP collapsed utility to near chance at realistic cohort sizes. Published as a negative result, not tuned away."],
  ["fix", "CORRECTED", "A zeroth-order versus first-order conclusion reversed once both arms were tuned fairly."],
  ["fix", "CORRECTED", "Earlier DeComFL communication-cost claims were revised."],
  ["fix", "SCOPED", "Backbone findings were narrowed to the configurations actually tested."],
];

const DEBUG_STEPS = [
  ["SYMPTOM", "On-device CNN training in FedLearn produced NaN losses; a larger ResNet-18 silently failed to converge."],
  ["INVESTIGATION", "Isolated with identical flags and a minimal Conv2d → MaxPool2d → Linear model; compared the kernel with ATen."],
  ["ROOT CAUSE", "The backward kernel scatter-added only into argmax positions; recycled arena memory left every other position stale."],
  ["MINIMAL FIX", "Zero-initialize the destination before accumulation, as ATen does. One file changed."],
];

export function FedLearnPage() {
  usePageTitle("FedLearn Platform");

  return (
    <>
      <section aria-labelledby="t-h" className="wrap cs-intro">
        <Go to={ROUTES.work} className="back-link">
          ← All work
        </Go>
        <div className="read enter">
          <p className="meta-line">
            <span className="accent">CASE STUDY 01</span>
            <span className="status status--active">● Active research</span>
            <span>Backend · Full-stack · AI Systems</span>
          </p>
          <h1 id="t-h">FedLearn Platform</h1>
          <p className="cs-lede">
            A custom, full-stack federated-learning platform connecting web, desktop, Docker, and native mobile clients
            to a PyTorch/gRPC runtime, with reproducible experiments across heterogeneous hardware.
          </p>
          <p className="p muted">
            Rather than wrapping an existing framework, FedLearn treats federated learning as a complete systems
            problem: algorithms, orchestration, wire formats, access control, secure aggregation, device runtimes, and
            empirical validation share one tested platform.
          </p>
        </div>
        <dl className="cs-meta">
          <div>
            <dt className="label">ROLE</dt>
            <dd>Primary architect and principal implementer</dd>
          </div>
          <div>
            <dt className="label">CONTEXT</dt>
            <dd>Graduate research at RIT with Prof. Haibo Yang</dd>
          </div>
          <div>
            <dt className="label">COLLABORATORS</dt>
            <dd>Chinmay Lokare, early-stage contributions</dd>
          </div>
          <div>
            <dt className="label">LINKS</dt>
            <dd>
              <a href={FEDLEARN_REPO}>Repository ↗</a>
              <br />
              <span className="mono muted" style={{ fontSize: 12.5 }}>
                reviewed at main · 006c6e1
              </span>
            </dd>
          </div>
        </dl>
        <nav aria-label="On this page" className="toc">
          {TOC.map(([id, label]) => (
            <JumpLink key={id} to={id}>
              {label}
            </JumpLink>
          ))}
        </nav>
      </section>

      <section aria-label="Platform overview" className="wrap cs-figure">
        <figure>
          <Shot image="fedlearn" eager />
          <figcaption style={{ fontSize: 14 }}>
            Figure 0. Platform overview: how a training run travels from the dashboard to devices and back. Section 03
            breaks down the two planes.
          </figcaption>
        </figure>
      </section>

      <section aria-labelledby="s1" className="wrap sec reveal">
        <div className="read stack">
          <SecHead id="s1" n="01">
            Role and context
          </SecHead>
          <p className="p">
            Federated-learning research code often stops at an algorithm notebook. That hides the parts that decide
            whether it works outside the lab: deployment, security, hardware heterogeneity and reproducibility.
          </p>
          <p className="p">
            I designed and primarily implemented FedLearn so that each of those is real and testable: custom training
            strategies, a Java control plane, a Python training runtime, four kinds of client, and benchmark
            infrastructure across Java, Python, TypeScript and C++.
          </p>
        </div>
      </section>

      <section aria-labelledby="s2" className="wrap sec reveal">
        <SecHead id="s2" n="02">
          Recent milestones
        </SecHead>
        <ol className="timeline">
          {MILESTONES.map(([when, what]) => (
            <li key={when}>
              <span className="when">{when}</span>
              <span>{what}</span>
            </li>
          ))}
        </ol>
      </section>

      <section id="s-arch" aria-labelledby="s3" className="wrap sec reveal">
        <div className="read stack mb-28">
          <SecHead id="s3" n="03">
            Architecture
          </SecHead>
          <p className="p">
            Two planes with a hard boundary. The control plane owns people, projects and runs. The training plane owns
            models, strategies and measurements. They talk over gRPC; nothing in the browser touches model weights.
          </p>
        </div>
        <figure>
          <div className="diagram-scroll has-alt">
            <div
              role="img"
              aria-label="Figure 1. FedLearn architecture. Clients: React web, Electron desktop, Docker and React Native with C++ mobile. Web and desktop reach the Spring Boot control plane over REST and WebSocket/STOMP. The control plane, backed by PostgreSQL with Flyway migrations, drives the Python/PyTorch runtime over gRPC. The runtime holds the coordinator, an in-process simulator and the aggregation and evaluation layer, and writes experiment artifacts. Training clients exchange model updates with the runtime over gRPC as versioned safetensors with chunk hashes."
              className="dk-panel fl-arch draw"
            >
              <div className="dk-group">
                <span className="dk-label">CLIENTS</span>
                <div className="dk-box">
                  <strong>React web client</strong>
                  <span>dashboard, live run logs</span>
                </div>
                <div className="dk-box">
                  <strong>Electron desktop client</strong>
                  <span>OS-keychain auth, local training</span>
                </div>
                <div className="dk-box">
                  <strong>Docker client</strong>
                  <span>Apple Silicon, x86/NVIDIA, Jetson</span>
                </div>
                <div className="dk-box">
                  <strong>React Native + C++ mobile</strong>
                  <span>ExecuTorch on-device training</span>
                </div>
              </div>
              <div className="dk-wire">
                <span className="line" aria-hidden="true" />
                <span className="proto">
                  REST
                  <br />
                  WebSocket / STOMP
                </span>
                <span className="what">
                  run control,
                  <br />
                  live logs
                </span>
              </div>
              <div className="control">
                <span className="dk-label">CONTROL PLANE</span>
                <div className="dk-box hot">
                  <strong style={{ fontSize: 15 }}>Spring Boot orchestrator</strong>
                  <span>Java 21 · access control, project visibility, audit events, run lifecycle</span>
                </div>
                <span className="vline" aria-hidden="true" />
                <div className="dk-box dashed">
                  <strong>PostgreSQL</strong>
                  <span>Flyway-owned schema</span>
                </div>
              </div>
              <div className="dk-wire">
                <span className="line" aria-hidden="true" />
                <span className="proto">gRPC</span>
                <span className="what">orchestration</span>
              </div>
              <div className="dk-group">
                <span className="dk-label">TRAINING PLANE · PYTHON / PYTORCH</span>
                <div className="pair">
                  <div className="dk-box hot">
                    <strong>Coordinator</strong>
                    <span>networked rounds</span>
                  </div>
                  <div className="dk-box">
                    <strong>In-process simulator</strong>
                    <span>same strategy objects</span>
                  </div>
                </div>
                <div className="dk-box hot">
                  <strong>Aggregation and evaluation layer</strong>
                  <span>
                    FedAvg, FedProx, FedAdam/FedYogi, DeComFL · central DP with RDP accounting · median, trimmed mean,
                    Krum, Bulyan · secure aggregation
                  </span>
                </div>
                <div className="dk-box dashed">
                  <strong>Experiment artifacts</strong>
                  <span>seeded harnesses, raw per-run results, generated reports</span>
                </div>
              </div>
              <div className="bus">
                <span className="proto">TRAINING CLIENTS ⇄ RUNTIME</span>
                <span className="line" aria-hidden="true" />
                <span>gRPC · versioned safetensors with chunk hashes, decoded identically in Python and C++</span>
              </div>
            </div>
          </div>
          <FedLearnMiniArch className="diagram-alt" />
          <figcaption style={{ marginTop: 12, fontSize: 14 }}>
            Figure 1. FedLearn architecture, control plane and training plane.
          </figcaption>
          <details className="disclosure">
            <summary>Read the diagram as a list</summary>
            <ol>
              <li>
                Web and desktop clients call the Spring Boot orchestrator over REST and receive live run logs over
                WebSocket/STOMP.
              </li>
              <li>The orchestrator stores users, projects, audit events and runs in PostgreSQL under Flyway migrations.</li>
              <li>The orchestrator starts and controls runs in the Python runtime over gRPC.</li>
              <li>
                The runtime's coordinator and simulator share the same strategy objects; aggregation and evaluation
                apply strategies, privacy and robust aggregation.
              </li>
              <li>
                Docker, desktop and mobile training clients exchange model updates with the runtime over gRPC as
                versioned safetensors.
              </li>
              <li>Every run writes seeded, provenance-tagged artifacts.</li>
            </ol>
          </details>
        </figure>
      </section>

      <section aria-labelledby="s4" className="wrap sec reveal">
        <SecHead id="s4" n="04">
          System surfaces
        </SecHead>
        <div className="table-scroll ruled stack-mobile">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" style={{ width: "26%" }}>
                  SURFACE
                </th>
                <th scope="col" style={{ width: "26%" }}>
                  TECHNOLOGY
                </th>
                <th scope="col">RESPONSIBILITY</th>
              </tr>
            </thead>
            <tbody>
              {SURFACES.map(([s, t, r]) => (
                <tr key={s}>
                  <th scope="row">{s}</th>
                  <td className="code" data-label="TECHNOLOGY">
                    {t}
                  </td>
                  <td data-label="RESPONSIBILITY">{r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="s5" className="wrap sec reveal">
        <SecHead id="s5" n="05">
          What I built
        </SecHead>
        <div className="cols">
          {BUILT.map((b) => (
            <div key={b.title}>
              <h3>{b.title}</h3>
              <ul>
                {b.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="s-eval" aria-labelledby="s6" className="wrap sec reveal">
        <div className="read stack">
          <SecHead id="s6" n="06">
            Evaluation methodology
          </SecHead>
          <p className="p">Every claim is tied to a harness, a seed, a hardware class and a commit. Four rules applied throughout:</p>
          <ol className="lettered">
            {RULES.map(([k, b, t]) => (
              <li key={k}>
                <span className="mono">{k}</span>
                <span>
                  <strong>{b}</strong> {t}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="s-evidence" aria-labelledby="s7" className="wrap sec reveal">
        <SecHead id="s7" n="07">
          Evidence
        </SecHead>
        <div className="table-scroll boxed stack-mobile">
          <table className="table table-wide">
            <caption>Table 1. Recorded results with setup and scope. These are research measurements, not production traffic.</caption>
            <thead>
              <tr>
                <th scope="col">QUESTION</th>
                <th scope="col">SETUP</th>
                <th scope="col">RESULT</th>
                <th scope="col">SCOPE</th>
              </tr>
            </thead>
            <tbody>
              {EVIDENCE.map((e) => (
                <tr key={e.q}>
                  <th scope="row">{e.q}</th>
                  <td className="dim" data-label="SETUP">
                    {e.setup}
                  </td>
                  <td className="strong" data-label="RESULT">
                    {e.result}
                  </td>
                  <td className="dim" data-label="SCOPE">
                    {e.scope}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="s-security" aria-labelledby="s8" className="wrap sec reveal">
        <div className="split split-wide">
          <div className="stack-sm">
            <SecHead id="s8" n="08">
              Security work
            </SecHead>
            <p className="p">
              Security defects were closed through numbered tickets, each pinned by a regression test so it cannot
              quietly return.
            </p>
          </div>
          <ul className="defs">
            {SECURITY.map(([k, v]) => (
              <li key={k}>
                <span>{k}</span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="s9" className="wrap sec reveal">
        <SecHead id="s9" n="09">
          Decisions and trade-offs
        </SecHead>
        <div className="decisions">
          {DECISIONS.map((d) => (
            <article className="decision" key={d.k}>
              <span className="label">{d.k}</span>
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

      <section id="s-negative" aria-labelledby="s10" className="wrap sec reveal">
        <div className="read stack-sm">
          <SecHead id="s10" n="10">
            Negative and corrected results
          </SecHead>
          <p className="p">Results that did not hold up stay in the record, next to the ones that did.</p>
          <ul className="record">
            {RECORD.map(([kind, tag, text]) => (
              <li key={text}>
                <span className={kind === "neg" ? "tag-neg" : "tag-fix"}>{tag}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="s-executorch" aria-labelledby="s11" className="wrap sec reveal">
        <div className="read stack-sm mb-28">
          <SecHead id="s11" n="11">
            Debugging story: a kernel three layers down
          </SecHead>
          <p className="p">
            Diagnosed and prepared a fix for an ExecuTorch max-pooling backward bug that reused stale gradient memory,
            then validated the correction on macOS arm64 and a Snapdragon 845 handset with affected and
            negative-control models.
          </p>
        </div>
        <ol className="steps">
          {DEBUG_STEPS.map(([k, v]) => (
            <li key={k}>
              <span className="label-accent">{k}</span>
              <span>{v}</span>
            </li>
          ))}
        </ol>
        <div className="figure-pair">
          <figure>
            <pre className="code-block" aria-label="Simplified shape of the change">
              <span className="c">{"  // portable kernel: max_pool2d_with_indices_backward\n"}</span>
              <span className="c">{"  // grad_input lives in a reused memory arena\n"}</span>
              <span className="add">{"+ fill grad_input with zeros            // as ATen does"}</span>
              {"  for each output position p:\n      grad_input[argmax[p]] += grad_output[p]"}
            </pre>
            <figcaption>
              Figure 2. Shape of the change, simplified. The exact patch is commit efc8221 on the contribution branch.
            </figcaption>
          </figure>
          <figure className="bars draw">
            <span className="label">NaN STEPS OUT OF 300 · SMALL CNN</span>
            <div className="bar-row">
              <span>Before</span>
              <span className="bar-track" aria-hidden="true">
                <span className="bar-fill" style={{ width: "97%" }} />
              </span>
              <span className="bar-num">291</span>
            </div>
            <div className="bar-row">
              <span>After</span>
              <span className="bar-track" aria-hidden="true" />
              <span className="bar-num">0</span>
            </div>
            <dl className="kv">
              <div>
                <dt>Loss after fix</dt>
                <dd>2.309544 → 0.003952</dd>
              </div>
              <div>
                <dt>Negative controls</dt>
                <dd>5 unaffected models, byte-identical loss curves</dd>
              </div>
              <div>
                <dt>Hardware</dt>
                <dd>macOS arm64 · Snapdragon 845 handset</dd>
              </div>
              <div>
                <dt>Latency overhead</dt>
                <dd>+0.06% in the recorded setup</dd>
              </div>
            </dl>
            <figcaption>
              Figure 3. Before and after, from the commit record. <a href={EXECUTORCH_ISSUE}>Upstream issue #21686 ↗</a>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="s-limits" className="wrap sec reveal">
        <div className="split">
          <div className="stack-sm" aria-labelledby="s12">
            <SecHead id="s12" n="12">
              Known limitations
            </SecHead>
            <ul className="marked warn">
              <li>TLS is not yet the default for every gRPC deployment.</li>
              <li>Simulator scale is not networked deployment capacity.</li>
              <li>Federation-over-Text has not yet run a real LLM end to end.</li>
              <li>The multi-machine run used one seed and IID partitions.</li>
            </ul>
          </div>
          <div className="stack-sm" aria-labelledby="s13">
            <SecHead id="s13" n="13">
              Next steps
            </SecHead>
            <ul className="marked next">
              <li>Enforce TLS by default across all gRPC transports.</li>
              <li>Run an LLM through the Federation-over-Text backend.</li>
              <li>Measure networked capacity beyond the simulator.</li>
              <li>Publish a benchmark index mapping each claim to its harness and commit.</li>
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="s14" className="wrap sec sec-last">
        <SecHead id="s14" n="14">
          Links
        </SecHead>
        <div className="link-buttons">
          <a className="btn btn-secondary" href={FEDLEARN_REPO}>
            Repository ↗
          </a>
          <a className="btn btn-secondary" href={EXECUTORCH_ISSUE}>
            ExecuTorch issue #21686 ↗
          </a>
        </div>
        <Pager
          prev={{ to: ROUTES.work, label: "BACK", title: "All work" }}
          next={{ to: ROUTES.trb, label: "NEXT CASE STUDY", title: "TigerResearchBuddy" }}
        />
      </section>
    </>
  );
}
