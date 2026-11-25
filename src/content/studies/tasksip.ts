import type { Study } from "@/types/content";

export const tasksip: Study = {
  slug: "tasksip",
  name: "TaskSip",
  status: "prototype",
  statusLabel: "▲ Hosted prototype",
  areas: "Full-stack · Backend · AI Systems",
  lede: "A multi-provider AI gateway and team workspace with browser chat, document processing, Cloud Run agent jobs, a Tauri/Rust desktop app for local coding sessions, and workspace-level usage governance.",
  context:
    "PhD lab work in RIT's Computer Science department (Nov 2 – Nov 20, 2026; not employment). Repository is private.",
  glance: {
    role: "Developer (Tauri/Rust desktop, local Code sessions, gateway governance, migrations)",
    period: "Nov 2 – Nov 20, 2026 (evidenced branch window)",
    team: "Team (with ZidongLiu and xiaxin)",
    context: "PhD lab, RIT Computer Science",
    stack: "Rust · Tauri 2 · React · TypeScript · Python · FastAPI · SQLAlchemy · PostgreSQL · Alembic · Cloud Run",
    links: [],
    status: "Hosted prototype · Tauri 0.3.1 · 2-student pilot",
  },
  blocks: [
    {
      kind: "prose",
      title: "Problem",
      paras: [
        "Research groups sharing OpenAI, Anthropic, and self-hosted endpoints need one gateway and workspace for browser chat, documents, and local Claude Code or Codex sessions without distributing raw provider keys.",
        "Running local coding CLIs on members' machines also requires isolating spawned process trees, configuring tool routing without clobbering user edits, and enforcing workspace rate limits and mid-stream revocation.",
      ],
    },
    {
      kind: "figure",
      title: "System architecture",
      src: "images/diagrams/tasksip-hld.svg",
      alt: "TaskSip full-system architecture distinguishing ownership: teammate-built components (ZidongLiu and xiaxin) cover the React browser workspace, core CLI gateway proxy and protocol translation, pooled routing, document ingestion, team conversations, Cloud Run agent jobs, GCS uploads, and cost reporting. Anurag's highlighted scope covers the Tauri 2 Rust desktop app (v0.3.1), local Code sessions runner with Windows Job Objects and macOS watchdog, opt-in routing switch with selective Undo, database-backed workspace-wide rate limit (migration 0022), send-time IP SSRF protection, in-flight stream revocation with heuristic metering, and reconciled Alembic migrations. A local verification note records 95 backend and 253 frontend tests passed at commit fcc4df7.",
      caption: "Figure 1. Full TaskSip architecture highlighting Anurag's desktop, routing, rate-limit, and revocation components against teammate-built gateway core and workspace.",
      width: 1200,
      height: 680,
    },
    {
      kind: "steps",
      title: "How it works",
      intro:
        "Teammates built the core gateway, pooled routing, protocol translation, and React workspace; my changes connect the desktop client, process isolation, routing switch, and streaming governance.",
      steps: [
        [
          "1 · PAIR & ROUTE",
          "Tauri 2 pairs via atomic codes, saves a refresh credential in the OS credential store (hashed server-side) for short-lived bearer tokens, and applies opt-in CLI routing with previews and selective Undo.",
        ],
        [
          "2 · SPAWN & ISOLATE",
          "Desktop Code runs Codex (JSON-RPC) or Claude Code (streaming JSON) with per-session gateway tokens or signed-out personal accounts, isolated via Windows Job Objects or macOS descendant/watchdog tracking.",
        ],
        [
          "3 · ADMIT",
          "CLI and browser chat traffic checks both per-member and DB-backed workspace-wide one-minute rate limits—consuming both counters only when both allow—before reserving budget.",
        ],
        [
          "4 · STREAM & REVOKE",
          "Outbound calls validate resolved destination IPs at send time (SSRF defense), while five-second periodic and chunk checks abort upstreams and persist failed browser replies on revocation.",
        ],
        [
          "5 · SETTLE",
          "Streams settle against shared AI usage events, estimating interrupted output from delivered deltas with incomplete-usage provenance.",
        ],
      ],
    },
    {
      kind: "cols",
      title: "What I built",
      intro:
        "TaskSip is a three-person team codebase. ZidongLiu authored the original gateway, pooled routing, protocol translation, hosted setup, and legacy Python desktop; xiaxin authored major parts of the React workspace, document ingestion, team conversations, browser agent workspaces, analytics, and cloud/provider cost reporting. Listed below is my own contribution window (Nov 2 – Nov 20, 2026).",
      groups: [
        {
          title: "Desktop & process isolation (mine)",
          items: [
            "Tauri 2 / Rust desktop app (0.3.1) wrapping the React workspace, OS credential store pairing, device/session revocation on password reset, and Code UI/floating routing widget",
            "Rust local Code runner unifying Codex JSON-RPC and Claude Code streaming JSON with per-session gateway tokens and signed-out personal Code mode",
            "Windows per-session Job Objects with atomic process-to-job assignment, kill-on-close, restricted inherited handles, and orphan-grandchild regression tests",
            "macOS descendant process tracking, leaderless group handling, bounded output buffers, app-exit watchdog, and restricted inherited credentials",
            "Opt-in routing switch for Claude Code, Codex, and Claude Desktop with configuration previews and selective key-level Undo",
          ],
        },
        {
          title: "Gateway governance & security (mine)",
          items: [
            "Workspace ownership transfer with locking, conditional owner update, audited mutation, and member confirmation",
            "Database-backed workspace-wide one-minute rate limit alongside per-member limits (migration 0022)",
            "In-flight stream revocation across CLI proxy and browser SSE streams with upstream shutdown and failed-reply persistence",
            "Pilot fixes: heuristic interrupted-stream metering with provenance, aligned platform/workspace usage totals, and actionable denial messages",
            "Send-time IP validation SSRF defense preserving the original TLS/HTTP host, atomic pairing-code consumption, and GCS generation preconditions",
          ],
        },
        {
          title: "Migrations, testing & teammates' core",
          items: [
            "Reconciled divergent Alembic migration lineages sharing revision numbers across SQLite and disposable PostgreSQL fixtures",
            "CLI contract tests for installed binaries against a scripted model, separated into pinned compatibility checks and a scheduled latest-version canary",
            "Teammates (ZidongLiu, xiaxin): core proxy/translation gateway, pooled routing, browser chat, GCS document ingestion, Cloud Run agent jobs, and cost reporting",
          ],
        },
      ],
    },
    {
      kind: "decisions",
      title: "Decisions and trade-offs",
      items: [
        {
          title: "Windows Job Objects and OS-level process tracking",
          why: "Coding CLIs spawn compiler, test, and tool subprocesses that survive a simple child-process kill; per-session Job Objects with kill-on-close and macOS descendant tracking prevent orphaned tools after Stop or exit.",
          tradeoff: "Requires separate native Windows and macOS process backends and platform-specific lifecycle regression tests.",
        },
        {
          title: "Selective key-level Undo for developer-tool configs",
          why: "Users edit their Claude Code and Codex settings outside TaskSip; Undo restores byte-identical originals when files are untouched and reverts only TaskSip-managed keys when external edits exist.",
          tradeoff: "Maintains schema-aware config patching and Rust/Python parity fixtures rather than simple file overwrite.",
        },
        {
          title: "Send-time IP validation with preserved TLS host",
          why: "Validating a URL once before HTTPX connects leaves a DNS-rebinding window; resolving and checking destination IPs at send time while keeping the original host header preserves TLS verification.",
          tradeoff: "Requires custom transport wiring instead of default HTTP client connection handling.",
        },
        {
          title: "Schema-inspecting migration reconciliation",
          why: "Parallel desktop and analytics branches reused Alembic revision numbers with different schemas; inspecting live table state and adding missing objects preserves existing records without resetting databases.",
          tradeoff: "Adds migration compatibility logic that must be tested across both SQLite and disposable PostgreSQL.",
        },
      ],
    },
  ],
  results: [
    {
      scope: "measured",
      claim:
        "Focused local test run at commit fcc4df7 passed 95 backend tests (ownership transfer, workspace AI policy, in-flight cutoff, stream metering, device auth, SSRF safety, storage, merged migrations) plus frontend typecheck and 253 frontend unit tests.",
    },
    {
      scope: "measured",
      claim:
        "Prior preflight and macOS desktop review recorded 47 passing deployment-file tests (including a local production-image build) and a macOS self-test with installed CLIs against a scripted model.",
    },
    {
      scope: "reported",
      claim: "Exercised in a two-student pilot (referenced in merge fcc4df7).",
    },
    {
      scope: "not measured",
      claim:
        "Adoption, latency improvement, cost savings, and signed public desktop distribution are not measured.",
    },
  ],
  limits: [
    "Evidenced contribution window spans Nov 2 – Nov 20, 2026 in a private RIT Computer Science PhD lab repository (not employment).",
    "Test counts (95 backend, 253 frontend, 47 deployment-file) come from local fixture and preflight runs rather than production telemetry; pilot evidence covers two students with no measured adoption, latency, or cost-savings metrics.",
    "Tauri desktop app is version 0.3.1; native macOS/Windows code signing, installed-app validation on both platforms, paid-account session validation, and production backup/restore rehearsal remain open gates.",
    "Interrupted-stream output metering is heuristic while budget reservations stay conservative; unified billing HUD and cross-device Sessions Everywhere remain roadmap specifications.",
  ],
};
