import { Figure } from "@/components/Figure";
import { Go, JumpLink } from "@/components/links";
import { ProjectGlance } from "@/components/ProjectGlance";
import { Pager, SecHead, Shot } from "@/components/ui-bits";
import { usePageTitle } from "@/lib/nav";
import { FEDLEARN_REPO, ROUTES } from "@/site";
import type { Glance } from "@/types/content";

const FEDLEARN_SNAPSHOT = `${FEDLEARN_REPO}/tree/89dbef3`;
const LATE_SHARE_COMMIT = `${FEDLEARN_REPO}/commit/ce124b9dd86e9f454c9ddaed11e3c43271c63549`;
const WIRE_CODEC_COMMIT = `${FEDLEARN_REPO}/commit/4ea8bc03240b7819e35c7f676aad7cc3fee0cd01`;
const FEDPROX_FIX_COMMIT = `${FEDLEARN_REPO}/commit/f3067c992364a437aed48fc5c0ebe090bbd7eaee`;
const AUTH_FIX_COMMIT = `${FEDLEARN_REPO}/commit/d6fb77d26822819bc20e613d8aa9d1fa4da0a1dd`;

const GLANCE: Glance = {
  role: "Graduate Research Assistant, Lead Developer - FedLearn",
  period: "Mar 2026 – present (commits from Jan 2026)",
  team: "Primary implementation contributor (800 of 856 public commits); early platform work, DeComFL/ECG integration, client scripts, and docs by Chinmay Lokare",
  context: "Learning Optimization Group, RIT · Advisor: Prof. Haibo Yang · M.S. capstone",
  status: "Active research · manuscript in preparation (not yet submitted)",
  stack:
    "Java 21 · Spring Boot 3 · PostgreSQL · Flyway · Python 3.12 · PyTorch · gRPC · Buf · React 19 · TypeScript · Electron · React Native · Kotlin/JNI · C++ · ExecuTorch · Docker · GitHub Actions · AWS EC2",
  links: [
    { label: "Repository (snapshot 89dbef3)", url: FEDLEARN_SNAPSHOT },
    { label: "Late-share race commit (ce124b9)", url: LATE_SHARE_COMMIT },
  ],
};

const TOC = [
  ["s-arch", "03 How it works"],
  ["s-eval", "06 Methodology"],
  ["s-evidence", "07 Results"],
  ["s-security", "08 Security"],
  ["s-negative", "10 Negative results"],
  ["s-executorch", "11 ExecuTorch debugging"],
  ["s-limits", "12 Limits"],
  ["s-links", "14 Evidence links"],
] as const;

const MILESTONES = [
  ["Jan – Mar 2026", "Initial FedLearn commits began in January 2026; formal Graduate Research Assistant appointment in RIT's Learning Optimization Group started in March 2026."],
  ["Sep 2026", "Public branch snapshot (89dbef3): 800 of 856 reachable commits are mine (git identity anurag2796), alongside early platform work, DeComFL/ECG integration, client scripts, and docs by Chinmay Lokare."],
  ["Autumn 2026", "Confirmed milestones: 360-configuration NIH ChestX-ray14 simulation study, 3-host gRPC qualification (up to 80 logical clients), Android FULL-arm qualification (21 of 24 plans with live receipts), and the late-share secure-aggregation race fix (ce124b9)."],
  ["Current", "FedLearn serves as the M.S. capstone; a paper is drafted as a manuscript in preparation and is not yet submitted."],
];

const SURFACES = [
  ["Orchestrator", "Java 21 · Spring Boot 3 · PostgreSQL · Flyway", "Identity, multi-tenant organizations, project membership, run orchestration, execution contracts, audit, artifact registry"],
  ["FL framework & runtime", "Python 3.12 · PyTorch · gRPC · Buf", "Coordinator, in-process simulator, FedAvg/FedProx/FedOpt/DeComFL, DP, robust and secure aggregation, XGBoost, recipe catalog"],
  ["Web dashboard", "React 19 · TypeScript · Vite", "Project/admin views, run config, live STOMP telemetry, Simulation Lab, artifact registry, marketplace"],
  ["Desktop client", "Electron · TypeScript · dockerode", "Enrolls, runs natively or in Docker, OS-keychain JWT, dialog-restricted dataset mounts, log streaming"],
  ["Docker client", "Multi-architecture images", "One Python runtime packaged for CPU, x86 NVIDIA CUDA, and Jetson ARM64/L4T"],
  ["Android client", "React Native · Kotlin/JNI · C++ · ExecuTorch", "Native on-device training via TurboModule and C++ gRPC (iOS is an app shell only)"],
  ["Native wire layer", "C++ (libtorch-free)", "Safetensors decoder pinned to Python fixtures byte for byte"],
];

const BUILT = [
  {
    title: "Control plane & reliability",
    items: [
      "Spring Boot 3 and PostgreSQL control plane with multi-tenant roles, audit logs, and Flyway-owned schema",
      "Checkpoint save/restore, resume, port-reservation ownership, execution-attempt fencing, and retry-safe callback ingestion",
      "Content-addressed artifact registry with lineage, digests, deduplication, and warm starts, plus gRPC/Buf protobuf contracts",
    ],
  },
  {
    title: "Clients & delivery",
    items: [
      "React dashboard with live WebSocket/STOMP telemetry, Simulation Lab, and shared design tokens",
      "Electron desktop client (native/Docker, OS-keychain JWT) and multi-arch Docker images (CPU, CUDA, Jetson ARM64)",
      "Android native training via ExecuTorch, Kotlin/JNI, C++ TurboModule, and a libtorch-free C++ safetensors codec; path-filtered GitHub Actions CI",
    ],
  },
  {
    title: "ML systems & evaluation",
    items: [
      "Custom FL framework integrating FedAvg, FedProx, FedAdam/FedYogi, and DeComFL (Flower dependency removed)",
      "Sampled-Gaussian Rényi DP accountant, LightSecAgg on DeComFL, and Krum/Bulyan/median/trimmed-mean robust aggregation",
      "In-process simulator reusing production coordinator and strategy objects, plus seeded benchmark harnesses",
    ],
  },
];

const RULES = [
  ["a", "Check against references.", "Implementations are compared with Flower and frozen Opacus reference vectors before trusting results."],
  ["b", "Use real hardware.", "Apple Silicon, x86 Linux/NVIDIA, Jetson ARM64, and a physical Android handset — not only host-side simulators."],
  ["c", "State the scope.", "Simulator scale is reported as in-process simulation; negative results and scope limits are explicitly labeled."],
  ["d", "Keep the record.", "Seeded harnesses, raw per-run outputs, anomalies, and retracted/narrowed findings stay in the record."],
];

const EVIDENCE = [
  {
    q: "How do privacy and robust aggregation interact?",
    setup: "NIH ChestX-ray14 study: 360 qualified simulation configurations, 7,200 rounds on frozen ResNet-18 features with patient-level partitions and matched controls",
    result: "Matched privacy × trimmed-aggregation interaction ≈ +0.00227 AUROC (paired 95% CI ≈ +0.00070 to +0.00383)",
    scopeKind: "active" as const,
    scopeLabel: "● Confirmed (receipt in repo)",
    scope: "In-process simulation on frozen ResNet-18 features with fixed cohorts; not clinical validation",
  },
  {
    q: "Does gRPC training reconcile across real machines?",
    setup: "Three-host qualification (commit 21de32b): 52 configurations, 320 rounds, 13,180 client fits, up to 80 logical clients across Apple Silicon, x86 Linux, and Jetson",
    result: "All 26 placement pairs met tolerance; multi-host was 1.87–2.93× slower end to end than single-host",
    scopeKind: "active" as const,
    scopeLabel: "● Confirmed (21de32b)",
    scope: "Measured over real gRPC; multi-host slowdown reported explicitly as a negative result",
  },
  {
    q: "Does full-model training run natively on Android?",
    setup: "24 declared FULL-arm plans across 6 recipes; bounded full-model ResNet-18 on a physical phone, signed build over TLS",
    result: "Live receipts recorded for 21 of 24 plans",
    scopeKind: "active" as const,
    scopeLabel: "● Confirmed (hardware)",
    scope: "Measured on physical Android hardware; 3 of 24 plans lacked live receipts",
  },
  {
    q: "How far is in-process simulation regression verified?",
    setup: "In-process CPU simulator driving the production coordinator and strategy objects",
    result: "1,000-client in-process regression committed in the repository",
    scopeKind: "active" as const,
    scopeLabel: "● Confirmed (simulation)",
    scope: "In-process simulation only, not networked device capacity",
  },
  {
    q: "Does tree-based FL run across hosts?",
    setup: "Federated XGBoost across 2 CPU hosts training an 8-tree Iris ensemble in 4 rounds",
    result: "Completed 4 rounds across 2 CPU hosts with exact replay",
    scopeKind: "active" as const,
    scopeLabel: "● Confirmed (integration check)",
    scope: "Small CPU integration check only",
  },
  {
    q: "Does the custom FL core match Flower?",
    setup: "FedAvg aggregation over 200 trials and end-to-end trajectory over 3 seeds",
    result: "Max difference 2.384 × 10⁻⁷ (aggregation) and 5.96 × 10⁻⁸ (trajectory)",
    scopeKind: "demo" as const,
    scopeLabel: "◆ Reported",
    scope: "Reported cross-validation against Flower; FedProx proximal term was separately corrected and tested",
  },
  {
    q: "Is privacy accounting right?",
    setup: "From-scratch sampled-Gaussian RDP accountant compared against frozen Opacus 1.6.0 reference vectors",
    result: "Within 1.76 × 10⁻¹⁰ across 154 orders (test file public)",
    scopeKind: "demo" as const,
    scopeLabel: "◆ Reported",
    scope: "Validates per-order RDP against frozen reference vectors, not full Opacus equivalence or an end-to-end privacy proof",
  },
  {
    q: "Does central DP keep utility at small cohorts?",
    setup: "Central-DP utility evaluation at ε = 8, 4, and 1 (d = 26,112)",
    result: "Utility fell to chance across tested budgets (SNR 0.023 / 0.012 / 0.003)",
    scopeKind: "demo" as const,
    scopeLabel: "◆ Reported (negative)",
    scope: "Reported negative result at small cohort sizes and high update dimension",
  },
];

const SECURITY = [
  ["Defect classes fixed", "Wildcard STOMP subscription bypass, org-scoped private artifact BOLA, private-project existence oracle, small-blob memory exhaustion, streamed upload DoS"],
  ["Auth & tokens", "Separate audiences for web credentials, run-scoped callbacks, connection tokens bound to client ID (preventing Sybil reuse), Java↔Python token fixtures"],
  ["Desktop credentials", "Electron stores the JWT in the OS keychain; dataset mounts restricted to dialog-selected paths"],
  ["Secure aggregation", "LightSecAgg integrated on the DeComFL scalar path; session/round equality guard fixed the late-share race (commit ce124b9)"],
  ["Transport", "Fail-closed TLS configuration and per-client certificate enrollment exist; plaintext gRPC remains the default outside configured deployment profiles"],
];

const DECISIONS = [
  {
    k: "DECISION A",
    title: "Own the FL core instead of wrapping Flower",
    why: "Control over custom strategies like DeComFL, execution contracts, and an in-process simulator that shares production strategy objects.",
    tradeoff: "More to maintain, so implementations are cross-validated against Flower and frozen Opacus reference vectors.",
  },
  {
    k: "DECISION B",
    title: "gRPC and float32 safetensors for weights",
    why: "Typed, streamable transfer replacing pickle, with a libtorch-free C++ codec pinned to Python by byte-identical fixtures and size/integrity checks.",
    tradeoff: "Requires Buf protobuf governance and separate tolerance-based numerical trajectory checks across runtimes.",
  },
  {
    k: "DECISION C",
    title: "A Java control plane",
    why: "Separates multi-tenant access control, execution contracts, checkpoints, fencing, and Flyway-owned migrations from the Python training runtime.",
    tradeoff: "A JVM service in an otherwise Python, TypeScript, and C++ codebase.",
  },
];

const RECORD = [
  ["neg", "NEGATIVE", "Central DP collapsed utility to chance across tested budgets (ε = 8, 4, 1; d = 26,112) in the reported evaluation. Kept as a negative result."],
  ["neg", "NEGATIVE", "Three-host gRPC qualification (52 configs, 320 rounds, up to 80 logical clients) was 1.87–2.93× slower end to end than single-host. Reported explicitly."],
  ["fix", "CORRECTED", "A FedProx benchmark that silently omitted the proximal term (comparing FedAvg with itself) was fixed with zero- and nonzero-penalty checks (commits f3067c9, 7302274)."],
  ["fix", "CORRECTED", "A zeroth-order versus first-order quality conclusion reversed once both arms were tuned fairly (reported)."],
  ["fix", "SCOPED", "Frozen-backbone findings were narrowed to tested configurations, and DeComFL communication-cost claims were revised once local epochs were counted (reported)."],
];

const DEBUG_STEPS = [
  ["SYMPTOM", "On-device CNN training in FedLearn was blocked on a physical Android handset (reported)."],
  ["INVESTIGATION", "Traced the gradient failure down through the mobile stack to ExecuTorch's portable max_pool2d backward kernel."],
  ["ROOT CAUSE", "ExecuTorch's max_pool2d backward kernel did not zero grad_input before accumulating gradients."],
  ["FIX & CHECK", "Zero-initialized grad_input and confirmed on-device CNN training on a physical handset (reported); Android FULL-arm qualification later confirmed 21 of 24 plans with live receipts."],
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
            A custom, full-stack federated-learning platform connecting web, desktop, Docker, and native Android clients
            to a PyTorch/gRPC runtime, with reproducible experiments across heterogeneous hardware.
          </p>
          <p className="p muted">
            Rather than wrapping an existing framework like Flower or FedML, FedLearn treats federated learning as a
            complete systems problem: strategy implementations (integrating published FL, privacy, and robust-aggregation
            methods), orchestration, wire formats, access control, secure aggregation, device runtimes, and empirical
            validation share one tested platform.
          </p>
        </div>
        <ProjectGlance glance={GLANCE} />
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
            Problem, role and context
          </SecHead>
          <p className="p">
            Federated-learning research code often stops at an algorithm notebook, leaving out the systems layers that
            decide whether it works outside a single workstation: multi-tenant orchestration, typed wire contracts,
            access control, secure aggregation, heterogeneous device runtimes, and reproducible evaluation.
          </p>
          <p className="p">
            FedLearn is my M.S. capstone and Graduate Research Assistant work in RIT&apos;s Learning Optimization Group
            (formal appointment from March 2026, following project commits starting January 2026; advised by Prof. Haibo
            Yang), with a paper drafted as a manuscript in preparation (not yet submitted).
          </p>
          <p className="p">
            As primary implementation contributor (800 of 856 commits on the public snapshot, building alongside early
            platform work, DeComFL/ECG integration, client scripts, and documentation from Chinmay Lokare), I built and
            hardened the Java control plane, the Python/PyTorch gRPC training runtime, desktop, Docker, and native
            Android clients, and seeded benchmark harnesses across Java, Python, TypeScript, Kotlin, and C++. Published
            FL and privacy algorithms are integrated, not invented.
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
            Architecture and how it works
          </SecHead>
          <p className="p">
            Two planes with a hard boundary: nothing in the browser touches model weights. Spring Boot launches the
            Python FL server on a reserved port, and a separate in-process simulator reuses the same coordinator and
            strategy objects for controlled experiments.
          </p>
        </div>
        <Figure
          src="images/diagrams/fedlearn-hld.svg"
          width={1200}
          height={660}
          alt="FedLearn high-level architecture: browser connects through nginx to the Spring Boot control plane backed by PostgreSQL and a content-addressed artifact registry; Spring Boot launches the Python FL server over gRPC, which coordinates Python/Docker (CPU, x86 and Jetson CUDA), Electron desktop, and Android ExecuTorch clients while streaming STOMP live logs back to the browser."
          caption="Figure 1. High-level architecture across control plane, gRPC FL server, clients, artifact registry, and STOMP live logs."
        />
        <Figure
          src="images/diagrams/fedlearn-round.svg"
          width={1200}
          height={540}
          className="mt-24"
          alt="Six-step federated training round: client enrolls and receives an execution contract, fetches model artifacts by SHA hash, trains locally under FULL, FROZEN_HEAD, or OVA_LP, uploads round-tagged deterministic float32 safetensors updates, aggregates on the Python coordinator, and persists checkpoints, timing, and lineage-registered models."
          caption="Figure 2. One federated training round from execution contract and hash-verified fetch to checkpoint and lineage."
        />
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
          Results and evidence
        </SecHead>
        <Figure
          src="images/diagrams/fedlearn-results.svg"
          width={1200}
          height={500}
          className="mb-28"
          alt="FedLearn evidence summary: 800 of 856 public commits (93.5%), NIH ChestX-ray14 study with 360 configurations and 7,200 rounds measured in simulation, three-host gRPC qualification across 3 hosts and up to 80 logical clients measured 1.87 to 2.93 times slower end to end than single-host as a negative result, and 21 of 24 Android plans with live receipts."
          caption="Figure 3. Headline measurements with explicit scope labels; Table 1 lists full experimental setups and caveats."
        />
        <div className="table-scroll boxed stack-mobile">
          <table className="table table-wide">
            <caption>Table 1. Recorded results with setup, scope label (confirmed vs reported), and boundary (simulation vs physical hardware).</caption>
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
                    <span className={`status status--${e.scopeKind}`} style={{ marginBottom: 6, display: "inline-block" }}>
                      {e.scopeLabel}
                    </span>
                    <br />
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
        <Figure
          src="images/diagrams/fedlearn-race.svg"
          width={1200}
          height={610}
          className="mt-24"
          alt="Late-share secure-aggregation race: before commit ce124b9, a delayed Round N share arriving during Round N+1 applied recovered scalars against wrong perturbation seeds, producing a well-formed but numerically wrong model. After ce124b9, a session and round equality guard under the coordinator lock rejects stale shares; live gRPC comparison ran with 3 clients."
          caption="Figure 4. Late-share secure-aggregation race and the session/round guard in commit ce124b9 (3-client live gRPC scope)."
        />
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
            Debugging story: a kernel in the mobile runtime
          </SecHead>
          <p className="p">
            Diagnosed and fixed an ExecuTorch <code>max_pool2d</code> backward bug that failed to zero{" "}
            <code>grad_input</code> before gradient accumulation, unblocking on-device CNN training on a physical Android
            handset (reported in the project record; Android FULL-arm qualification later confirmed 21 of 24 plans with
            live receipts).
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
              <span className="c">{"  // portable kernel: max_pool2d backward\n"}</span>
              <span className="add">{"+ zero-initialize grad_input before accumulation"}</span>
              {"\n  // unblocked on-device CNN training on Android handset"}
            </pre>
            <figcaption>
              Figure 5. Shape of the ExecuTorch max_pool2d backward fix (reported in the project record).
            </figcaption>
          </figure>
          <figure className="bars draw">
            <span className="label">ANDROID ON-DEVICE TRAINING · RECORD</span>
            <dl className="kv">
              <div>
                <dt>ExecuTorch fix</dt>
                <dd>Zero-initialized grad_input in max_pool2d backward, confirmed on handset (reported)</dd>
              </div>
              <div>
                <dt>Android qualification</dt>
                <dd>21 of 24 declared FULL-arm plans with live receipts across 6 recipes (confirmed)</dd>
              </div>
              <div>
                <dt>Physical device run</dt>
                <dd>Bounded full-model ResNet-18 on a physical phone, signed build over TLS (confirmed)</dd>
              </div>
              <div>
                <dt>Native stack</dt>
                <dd>ExecuTorch · Kotlin/JNI · React Native TurboModule · libtorch-free C++ safetensors</dd>
              </div>
            </dl>
            <figcaption>
              Figure 6. On-device debugging and physical Android qualification record.{" "}
              <a href={FEDLEARN_REPO}>FedLearn repository ↗</a>
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
              <li>Plaintext gRPC remains the default outside configured deployment profiles (TLS exists, not default everywhere).</li>
              <li>Simulator scale is an in-process floor on cost, not networked deployment capacity or a device fleet.</li>
              <li>The FoT module is present in the framework, but an end-to-end LLM run is not confirmed.</li>
              <li>
                Deployment is a single VM; iOS is an app shell only (no on-device training); the NIH study is not clinical
                validation; most result files remain private or untracked beyond the public snapshot receipts.
              </li>
            </ul>
          </div>
          <div className="stack-sm" aria-labelledby="s13">
            <SecHead id="s13" n="13">
              Next steps
            </SecHead>
            <ul className="marked next">
              <li>Enforce TLS by default across all gRPC deployment profiles.</li>
              <li>Confirm an end-to-end LLM run through the FoT module.</li>
              <li>Submit the M.S. capstone manuscript (currently drafted, not yet submitted).</li>
              <li>Measure larger networked cohorts beyond the 3-host, 80-client qualification and 1,000-client simulator regression.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="s-links" aria-labelledby="s14" className="wrap sec sec-last">
        <SecHead id="s14" n="14">
          Evidence links
        </SecHead>
        <div className="link-buttons">
          <a className="btn btn-secondary" href={FEDLEARN_SNAPSHOT}>
            Repository (89dbef3) ↗
          </a>
          <a className="btn btn-secondary" href={LATE_SHARE_COMMIT}>
            Late-share race (ce124b9) ↗
          </a>
          <a className="btn btn-secondary" href={WIRE_CODEC_COMMIT}>
            Safetensors codec (4ea8bc0) ↗
          </a>
          <a className="btn btn-secondary" href={FEDPROX_FIX_COMMIT}>
            FedProx fix (f3067c9) ↗
          </a>
          <a className="btn btn-secondary" href={AUTH_FIX_COMMIT}>
            Auth defect fixes (d6fb77d) ↗
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
