import type { Study } from "@/types/content";

export const hybridMlScheduler: Study = {
  slug: "hybrid-ml-scheduler",
  name: "Hybrid ML Scheduler",
  status: "simulator",
  areas: "Backend · Full-stack · AI Systems",
  lede: "A heterogeneous GPU/CPU task-scheduling simulator that runs six policies—from Round Robin and Greedy to a Random Forest regressor and a DQN agent—on identical synthetic task streams and scores each against a brute-force Oracle on time, energy, and dollar cost.",
  context:
    "Parallel Computing coursework at RIT (beyond typical assignment scope). Everything here is simulated: tasks are synthesized by WorkloadGenerator, and execution time, energy (50 W GPU / 30 W CPU), and dollar cost ($0.15/kWh) come from a fixed cost model rather than physical hardware.",
  glance: {
    role: "Sole author (26 commits, 100%)",
    period: "Nov 2025 – Feb 2026 (code Nov – Dec 2025; docs Feb 2026)",
    team: "Solo",
    context: "Parallel Computing coursework, RIT",
    stack: "Python · FastAPI · PostgreSQL · Redis · WebSocket · React",
    links: [{ label: "Repository", url: "https://github.com/anurag2796/hybrid-ml-scheduler" }],
    status: "Simulator · cost-modeled time, energy, and cost · no CI",
  },
  image: "hybrid",
  caption: "Figure 0. One synthetic task stream, six scheduling policies, scored on time, energy, and cost.",
  repo: "https://github.com/anurag2796/hybrid-ml-scheduler",
  blocks: [
    {
      kind: "prose",
      title: "Problem",
      paras: [
        "Given a task with a known size, compute intensity, and memory requirement, what fraction of it should run on a GPU versus a CPU once data-transfer overhead is counted? Answering that consistently requires comparing policies under identical conditions.",
        "This simulator evaluates six scheduling strategies simultaneously on the same synthetic workload stream across wall-clock time, modeled energy, and modeled dollar cost, using an exhaustive Oracle baseline to make every learned policy's gap from optimality measurable.",
      ],
    },
    {
      kind: "prose",
      title: "How it works",
      paras: [
        "Every synthetic task passes through all six policies concurrently—accounting for GPU/CPU data-transfer overhead—so learned schedulers are scored against the brute-force Oracle on identical work within a fixed cost model.",
        "Oracle results persist to a ground-truth history CSV that retrains the Random Forest every 50 tasks, while the DQN agent runs its own real-time learning loop and the layered FastAPI backend broadcasts live metrics over WebSocket.",
      ],
    },
    {
      kind: "figure",
      src: "images/diagrams/hybrid-ml-scheduler-hld.svg",
      alt: "Hybrid ML Scheduler architecture diagram: WorkloadGenerator feeds identical synthetic tasks concurrently into six schedulers (Round Robin, Random, Greedy, Hybrid ML Random Forest, RL Agent DQN, and brute-force Oracle). A fixed cost model scores time, energy (50 W GPU / 30 W CPU), and cost ($0.15/kWh). Oracle ground truth writes to a history CSV that retrains the Random Forest every 50 tasks. A layered FastAPI backend backed by PostgreSQL and Redis streams global, detail, and historical views over WebSocket to a React dashboard.",
      caption: "Figure 1. Concurrent six-scheduler simulation, Oracle retrain loop, and WebSocket backend.",
      width: 1200,
      height: 580,
    },
    {
      kind: "table",
      title: "The six policies",
      caption: "Table 1. Six strategies evaluated simultaneously on each synthetic task.",
      columns: ["POLICY", "TYPE", "MECHANISM"],
      rows: [
        ["Round Robin", "Baseline", "Baseline rotation across resources"],
        ["Random", "Baseline", "Baseline random control"],
        ["Greedy", "Heuristic", "Always-fastest-resource heuristic"],
        ["Hybrid ML", "Supervised", "Random Forest regressor predicting optimal GPU fraction; retrains every 50 tasks on Oracle history"],
        ["RL Agent", "Reinforcement learning", "Deep Q-Network learning the assignment policy in a real-time loop"],
        ["Oracle", "Ground truth", "Brute-force grid search over GPU fraction establishing optimality within the cost model"],
      ],
    },
    {
      kind: "cols",
      title: "What I built",
      intro:
        "Built in six planned phases—Database, Persistence, Modular API, Performance, Observability, and Security—with a written completion report at each boundary, closing in a v2.0.0 release.",
      groups: [
        {
          title: "Simulation & Learning",
          items: [
            "Continuous simulation engine and WorkloadGenerator across 8,310 lines of Python (77 files)",
            "Brute-force Oracle baseline persisted to CSV as ground-truth training data",
            "Random Forest regressor (50-task online retrain loop) and upgraded real-time DQN agent",
          ],
        },
        {
          title: "Layered FastAPI Backend",
          items: [
            "Separated api/, core/, middleware/, models/, repositories/, and services/ packages",
            "Repository pattern over PostgreSQL and Redis caching",
            "Rate-limiting and security middleware alongside health, metrics, and observability routes",
          ],
        },
        {
          title: "Dashboard & Verification",
          items: [
            "React dashboard (2,162 JSX lines / 17 files) connected via WebSocket for live and historical analysis",
            "Visualization fixes for container sizing, chart overlaps, radar-chart scaling, and refresh behavior",
            "16 pytest test files and 3,667 lines of documentation across 26 markdown files",
          ],
        },
      ],
    },
    {
      kind: "decisions",
      title: "Decisions and trade-offs",
      items: [
        {
          title: "Brute-force Oracle as ground truth and training set",
          why: "Exhaustive search over GPU fraction gives a true optimum on every task, so learned schedulers are scored against optimality rather than only heuristics, and the Random Forest trains on ground truth instead of its own past decisions.",
          tradeoff: "Optimal only up to the grid search's resolution and within the assumed cost model; brute force would not transfer to physical hardware scheduling.",
        },
        {
          title: "Multi-objective scoring (time, energy, cost)",
          why: "Evaluating wall-clock time alongside energy (50 W GPU / 30 W CPU) and dollar cost ($0.15/kWh) prevents latency-only wins from hiding high power draw.",
          tradeoff: "Energy and cost are derived from fixed constants rather than measured hardware power draw, so rankings inherit those assumptions.",
        },
        {
          title: "Six-phase layered FastAPI architecture",
          why: "Structuring routes, services, repositories, rate limiting, security, and observability cleanly separates simulation logic from persistence and real-time WebSocket transport.",
          tradeoff: "Adds significant service surface area for coursework software that lacks automated CI execution.",
        },
      ],
    },
  ],
  results: [
    {
      scope: "measured",
      claim:
        "Codebase scope computed from git history and tree (26 commits, 100% this author): 8,310 lines of Python (77 files), 2,162 lines of React JSX (17 files), 3,667 lines of documentation (26 files), and 16 test files across 6 planned phases ending in v2.0.0.",
    },
    {
      scope: "reported",
      claim:
        "All six scheduling policies (Round Robin, Random, Greedy, Hybrid ML Random Forest, DQN RL Agent, and brute-force Oracle) execute concurrently on identical synthetic workloads and stream live metrics over WebSocket.",
    },
    {
      scope: "not measured",
      claim:
        "Physical hardware latency and real GPU/CPU power draw are not measured: tasks are synthetic, no CUDA kernel is dispatched, and time, energy (50 W / 30 W), and cost ($0.15/kWh) come from a cost model.",
    },
    {
      scope: "not measured",
      claim:
        "Held-out win-rate tables across fixed seeds and automated CI test runs are not recorded (pytest exists with 16 test files, but no CI gate runs them).",
    },
  ],
  limits: [
    "Simulator, not a physical scheduler: tasks are synthesized by WorkloadGenerator and timings come from a cost model; no physical GPU is scheduled and no CUDA kernel is dispatched.",
    "Energy and cost rely on fixed constants (50 W GPU, 30 W CPU, $0.15/kWh), not measured hardware power draw.",
    "The brute-force Oracle is optimal only up to the grid resolution and within the assumed cost model.",
    "The 50-task online retraining loop applies to the Random Forest model, not the DQN agent (which uses its own real-time learning loop).",
    "No CI runs the 16 pytest test files, a 253,966-line log file is committed in the repo, and code development stopped in December 2025 (February 2026 commits are documentation and .gitignore only).",
  ],
};
