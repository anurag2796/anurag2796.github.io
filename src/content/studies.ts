import type { StatusKind } from "@/components/ui-bits";
import type { ImageKey } from "@/site";

// Content for the project pages under /work/<slug>.
// Every statement here is backed by the project's repository or by Anurag's own confirmation.
// Do not add results, metrics or claims that are not in the repo.

type Item = string;

export type Block =
  | { kind: "prose"; title: string; paras: string[] }
  | { kind: "steps"; title: string; intro?: string; steps: [string, string][] }
  | { kind: "table"; title: string; intro?: string; caption: string; columns: string[]; rows: string[][] }
  | { kind: "cols"; title: string; intro?: string; groups: { title: string; items: Item[] }[] }
  | { kind: "defs"; title: string; intro?: string; items: [string, string][] }
  | { kind: "decisions"; title: string; items: { title: string; why: string; tradeoff: string }[] }
  | { kind: "limits"; limits: Item[]; next?: Item[] };

export type Study = {
  slug: string;
  name: string;
  status: StatusKind;
  statusLabel?: string;
  areas: string;
  lede: string;
  context?: string;
  meta: { label: string; value: string; mono?: boolean }[];
  image?: ImageKey;
  caption?: string;
  repo: string;
  blocks: Block[];
};

export const STUDIES: Study[] = [
  {
    slug: "hybrid-ml-scheduler",
    name: "Hybrid ML Scheduler",
    status: "simulator",
    areas: "Backend · Full-stack · AI Systems",
    lede: "A live heterogeneous-compute scheduling simulator that runs six policies, from round robin to a DQN agent, on identical task streams and scores each against a brute-force Oracle on time, energy and cost.",
    context:
      "Everything here is simulated: the cluster is a virtual model of four GPUs and a CPU, and energy and cost come from a fixed power model rather than hardware measurements.",
    meta: [
      { label: "ROLE", value: "Sole author" },
      { label: "TYPE", value: "Simulation framework with a live dashboard" },
      { label: "STATUS", value: "Simulator; energy and cost are modeled" },
      { label: "STACK", value: "Python · PyTorch · scikit-learn · FastAPI · PostgreSQL · Redis · React", mono: true },
    ],
    image: "hybrid",
    caption: "Figure 0. One task stream, six scheduling lanes, scored on time, energy and cost.",
    repo: "https://github.com/anurag2796/hybrid-ml-scheduler",
    blocks: [
      {
        kind: "prose",
        title: "Problem",
        paras: [
          "Splitting work between fast, power-hungry GPUs and a slow, cheap CPU depends on the task. Moving data to a GPU costs time, so a small task can finish sooner on the CPU, while a compute-heavy one needs the GPU.",
          "The question was whether learned policies make that split better than fixed rules, and how far each one sits from the best possible decision for the same task.",
        ],
      },
      {
        kind: "steps",
        title: "How a task flows",
        steps: [
          ["1 · GENERATE", "A workload generator creates tasks with a size, a compute intensity and a memory requirement."],
          ["2 · SCHEDULE", "Every task runs through all six schedulers, each on its own identical virtual cluster."],
          ["3 · ORACLE", "A grid search over 11 GPU fractions (0 to 1.0) finds the best split, the ground truth for that task."],
          ["4 · SCORE", "Time, energy (GPU 50 W, CPU 30 W) and cost ($0.15 per kWh) are computed for every policy."],
          ["5 · RETRAIN", "Every 50 tasks the Random Forest retrains on the accumulated Oracle results."],
          ["6 · STREAM", "Results are broadcast over WebSocket to a React dashboard in real time."],
        ],
      },
      {
        kind: "table",
        title: "The six policies",
        caption: "Table 1. How each scheduler picks the share of a task that runs on the GPU.",
        columns: ["POLICY", "TYPE", "HOW IT CHOOSES THE GPU SHARE"],
        rows: [
          ["Round Robin", "Rule", "Alternates between 0.5 and 0.0"],
          ["Random", "Rule", "Uniform random value between 0 and 1"],
          ["Greedy", "Heuristic", "Uses the task's compute intensity directly"],
          ["Hybrid ML", "Supervised", "Random Forest predicts the best split from size and intensity"],
          ["RL agent", "Reinforcement learning", "DQN picks one of six discrete shares (0 to 1.0 in steps of 0.2)"],
          ["Oracle", "Ground truth", "Brute-force grid search over 11 shares"],
        ],
      },
      {
        kind: "cols",
        title: "What I built",
        groups: [
          {
            title: "Simulation",
            items: [
              "Continuous simulation engine and workload generator",
              "Virtual multi-GPU execution model with CPU fallback",
              "Oracle baseline that makes every policy's gap measurable",
            ],
          },
          {
            title: "Learning",
            items: [
              "Random Forest and XGBoost predictors with online retraining",
              "DQN with experience replay and a target network",
              "Heuristic pre-training to seed the replay buffer",
            ],
          },
          {
            title: "Backend and dashboard",
            items: [
              "Layered FastAPI service: API, services, repositories",
              "Async PostgreSQL, Redis caching and token-bucket rate limiting",
              "Structured logs with correlation IDs, Prometheus metrics, live React dashboard",
            ],
          },
        ],
      },
      {
        kind: "decisions",
        title: "Decisions and trade-offs",
        items: [
          {
            title: "Discrete actions for a continuous split",
            why: "A DQN needs a discrete action space; six GPU shares keep the problem learnable.",
            tradeoff: "The agent cannot pick shares between its bins, such as 0.1 or 0.3, which the Oracle can.",
          },
          {
            title: "An Oracle on every task",
            why: "Scoring each policy against the best possible split shows how far from optimal it is, not just which policy wins.",
            tradeoff: "Brute force only works because the simulator is cheap; it would not transfer to real hardware.",
          },
          {
            title: "Reward on time and energy only",
            why: "The DQN reward is a weighted sum of normalized time and energy, so the agent does not chase the price gap between GPU and CPU.",
            tradeoff: "Dollar cost is reported but not optimized by the agent.",
          },
        ],
      },
      {
        kind: "limits",
        limits: [
          "Energy and cost come from a fixed power model, not hardware measurements.",
          "The DQN makes poor choices early in exploration; heuristic pre-training only partly hides this.",
          "The cost weighting pushes the learned policies toward the CPU, which hurts makespan.",
          "Tasks are independent; there are no dependency graphs between them.",
          "Large WebSocket payloads slow the dashboard on long runs.",
        ],
        next: [
          "Expose the reward and cost weights as settings instead of hard-coded values.",
          "Model task dependencies as a DAG with topological scheduling.",
          "Shrink the dashboard payloads for long continuous runs.",
        ],
      },
    ],
  },
  {
    slug: "faminesight",
    name: "FamineSight",
    status: "prototype",
    areas: "AI Systems · Data",
    lede: "An audited humanitarian-ML research prototype for Somalia that combines conflict, food-price, rainfall, vegetation, displacement and food-security data into prediction, clustering, anomaly detection and guarded LLM narratives.",
    context:
      "It is a research prototype, not an operational warning system. Known integration defects are published with the code, and synthetic development data is kept separate from conclusions drawn on real data.",
    meta: [
      { label: "ROLE", value: "Sole author" },
      { label: "DOMAIN", value: "Famine early warning, Somalia, district level" },
      { label: "STATUS", value: "Research prototype · audited · not production-ready" },
      { label: "STACK", value: "Python · scikit-learn · XGBoost · HDBSCAN · FastAPI · Streamlit · Ollama", mono: true },
    ],
    repo: "https://github.com/anurag2796/famineSight",
    blocks: [
      {
        kind: "prose",
        title: "Problem",
        paras: [
          "The signals behind a hunger crisis live in different places: conflict events, market prices, rainfall, vegetation, displacement and food-security phases. Each is published by a different organization, on a different schedule and at a different granularity.",
          "FamineSight joins them into one district-level panel and asks two questions: can the combined data flag deteriorating districts earlier, and how do you describe a model's output in plain language without overstating it?",
        ],
      },
      {
        kind: "table",
        title: "Data sources",
        intro:
          "Each source has its own fetcher. When credentials are missing, the pipeline falls back to clearly separated synthetic data so development can continue.",
        caption: "Table 1. Inputs joined into the district panel.",
        columns: ["SOURCE", "SIGNAL"],
        rows: [
          ["ACLED", "Conflict events"],
          ["WFP", "Food prices"],
          ["CHIRPS", "Rainfall"],
          ["NDVI", "Vegetation condition"],
          ["UNHCR", "Displacement"],
          ["IPC", "Food-security phases"],
          ["FSNAU", "Mortality estimates"],
          ["Shapefiles", "Somalia district boundaries"],
        ],
      },
      {
        kind: "cols",
        title: "Analytics",
        groups: [
          { title: "Prediction", items: ["Random Forest and XGBoost crisis classifiers", "Model registry and inference service behind the API"] },
          {
            title: "Patterns",
            items: [
              "K-Means and HDBSCAN district vulnerability profiles",
              "Association rules with FP-Growth and Apriori, plus sequential patterns",
            ],
          },
          {
            title: "Anomalies",
            items: ["Isolation Forest and Local Outlier Factor", "Per-district z-score spikes that feed alerts"],
          },
        ],
      },
      {
        kind: "defs",
        title: "Guarded narratives",
        intro:
          "A hybrid LLM client writes situation summaries, using a local Ollama model first and a Groq cloud model as fallback. Every narrative is checked against the prediction before it is shown.",
        items: [
          ["Low-risk check", "A low-risk prediction cannot be described with words like famine, catastrophe or emergency"],
          ["Probability check", "A low predicted probability cannot be described as high risk or very likely"],
          ["Failure path", "A narrative that fails a check is rejected, not softened"],
        ],
      },
      {
        kind: "defs",
        title: "Serving and operations",
        items: [
          ["API", "FastAPI with Pydantic v2 schemas; every endpoint requires an API key"],
          ["Dashboard", "Streamlit front end"],
          ["Packaging", "Docker Compose with a local Ollama sidecar for development"],
          ["Edge target", "Configuration for NVIDIA Jetson AGX Orin, including capped parallelism and CPU-only XGBoost on ARM64"],
          ["Audit", "A script that checks each pipeline phase end to end"],
        ],
      },
      {
        kind: "limits",
        limits: [
          "Not production-ready; known integration defects are documented with the code.",
          "Real conflict data needs ACLED credentials; without them the pipeline runs on synthetic data.",
          "Outputs are research results, not operational warnings.",
        ],
        next: ["Fix the published integration defects.", "Re-run the full pipeline on real data only and report it separately from synthetic runs."],
      },
    ],
  },
  {
    slug: "leafmd",
    name: "LeafMD",
    status: "coursework",
    areas: "AI Systems",
    lede: "An offline plant-disease detection pipeline that studies why models trained on clean lab photos struggle on real field images, and which training changes narrow that gap.",
    context:
      "Built for Advanced Computer Vision at RIT. The pipeline and evaluator are in the repository; cross-domain comparison results are not yet published.",
    meta: [
      { label: "ROLE", value: "Developer" },
      { label: "CONTEXT", value: "Advanced Computer Vision, RIT" },
      { label: "STATUS", value: "Coursework; results not yet published" },
      { label: "STACK", value: "Python · Ultralytics YOLO11n / YOLO26n · Albumentations · CoreML · ONNX · FastAPI", mono: true },
    ],
    image: "leafmd",
    caption: "Figure 0. From PlantVillage lab images to PlantDoc field images, then export for offline use.",
    repo: "https://github.com/anurag2796/leafMD",
    blocks: [
      {
        kind: "prose",
        title: "Problem",
        paras: [
          "PlantVillage photographs single leaves on plain backgrounds under even light. Real field photos have clutter, overlapping leaves, shadows and glare. A detector that looks excellent on lab data can fail badly in a field.",
          "LeafMD measures that lab-to-field gap directly and tests ways to close it, while keeping the model small enough to run offline on a laptop or phone.",
        ],
      },
      {
        kind: "steps",
        title: "Pipeline",
        steps: [
          ["1 · DATA", "Mix PlantVillage lab images with PlantDoc field images, with sanitization and split checks."],
          ["2 · CURRICULUM", "Learn disease features on clean data first, then fine-tune on mixed data with field images oversampled and the backbone frozen for the first half."],
          ["3 · AUGMENT", "Field-style augmentations applied only to lab images, plus mosaic, HSV and MixUp."],
          ["4 · PSEUDO-LABEL", "Run the model on unlabeled field images and keep high-confidence detections for the next training cycle."],
          ["5 · COMPARE", "A/B test YOLO11n against YOLO26n under the same settings."],
          ["6 · EVALUATE", "A dedicated evaluator reports lab mAP@50, field mAP@50 and the gap between them."],
          ["7 · EXPORT", "CoreML with INT8 quantization and ONNX, with accuracy re-checked after quantization."],
        ],
      },
      {
        kind: "defs",
        title: "Making it run on Apple Silicon",
        intro: "Training ran on an M4 Max with PyTorch's MPS backend, which needed specific workarounds.",
        items: [
          ["Corrupted boxes", "MPS occasionally corrupted bounding boxes during validation, so validation runs on the CPU"],
          ["Memory crashes", "Multiprocess data loading exhausted MPS memory, so loading is single-threaded with smaller batches"],
          ["Safety checks", "Environment verification, MPS corruption detection with CPU fallback, and checkpoints every five epochs"],
        ],
      },
      {
        kind: "decisions",
        title: "Decisions and trade-offs",
        items: [
          {
            title: "Measure the gap, not just accuracy",
            why: "A single lab score hides the failure that matters; reporting lab and field side by side makes it visible.",
            tradeoff: "Field labels are scarcer and noisier, so field scores move more between runs.",
          },
          {
            title: "Small models and INT8 export",
            why: "The target is offline use on ordinary devices, so nano models and quantization come first.",
            tradeoff: "Some accuracy is traded for size and speed, so every export is re-validated.",
          },
        ],
      },
      {
        kind: "limits",
        limits: [
          "Cross-domain comparison results are not yet published.",
          "Augmentations are static; there is no dynamic lighting or shadow synthesis yet.",
          "The MPS workarounds slow training and validation.",
        ],
        next: [
          "Publish the lab-versus-field comparison across model and training variants.",
          "Move to an NMS-free YOLO26 head, which removes the MPS validation workaround.",
          "Pick batch size automatically from available memory.",
        ],
      },
    ],
  },
  {
    slug: "smart-betting-system",
    name: "Smart Betting System",
    status: "simulator",
    statusLabel: "◇ Simulator · virtual money",
    areas: "Backend · AI Systems · Data",
    lede: "A virtual-money football forecasting pipeline: XGBoost match probabilities are compared with market odds, gated by edge and confidence, sized with fractional Kelly, then settled and tracked.",
    context:
      "Virtual money only. It does not connect to bookmakers, takes no deposits and places no real bets. There is no profitability claim; a walk-forward backtest is future work.",
    meta: [
      { label: "ROLE", value: "Developer" },
      { label: "TYPE", value: "Forecasting and risk-management simulator" },
      { label: "STATUS", value: "Simulator · virtual money only" },
      { label: "STACK", value: "Python · XGBoost · FastAPI · SQLAlchemy · Alembic · React", mono: true },
    ],
    image: "smart",
    caption: "Figure 0. From match data to a sized virtual position, with a skip path when the gate fails.",
    repo: "https://github.com/anurag2796/smart-betting-system",
    blocks: [
      {
        kind: "prose",
        title: "Problem",
        paras: [
          "Sports markets are a clean test of two hard problems: producing calibrated probabilities, and turning them into decisions under risk. A model can be right more often than not and still lose if it sizes positions badly.",
          "The system treats each match as a decision: estimate the probability, compare it with what the market implies, act only when the gap is large enough, and size the position so that one bad run cannot wipe out the bankroll.",
        ],
      },
      {
        kind: "steps",
        title: "Pipeline",
        steps: [
          ["1 · DATA", "16,000+ historical Premier League matches from Football-Data.co.uk, plus odds and team features."],
          ["2 · PREDICT", "XGBoost estimates outcome probabilities."],
          ["3 · COMPARE", "Market odds are converted to implied probabilities to measure the model's edge."],
          ["4 · GATE", "Act only when edge is at least 2% and confidence at least 55%; otherwise skip."],
          ["5 · SIZE", "Fractional Kelly sets the stake for each virtual position."],
          ["6 · SETTLE", "Results resolve positions and update the virtual ledger and analytics."],
        ],
      },
      {
        kind: "defs",
        title: "Risk controls",
        items: [
          ["Fractional Kelly", "Quarter Kelly by default, trading some growth for much lower variance"],
          ["Exposure caps", "At most 25% of the bankroll across open positions and 10% on any single one"],
          ["Joint sizing", "A simultaneous Kelly solver sizes open positions together using Monte Carlo scenarios"],
          ["Stop rules", "Betting stops when the bankroll falls below a threshold; the dashboard has a kill switch"],
        ],
      },
      {
        kind: "cols",
        title: "What I built",
        groups: [
          { title: "Modeling", items: ["XGBoost training on historical matches", "Edge and confidence gating against market-implied odds"] },
          { title: "Backend", items: ["FastAPI service with live odds over WebSocket", "Scheduled evaluation runs, settlement and SQLAlchemy models with Alembic migrations"] },
          { title: "Dashboard", items: ["React views for live odds, bet slip, history and performance", "Latency indicator and kill switch"] },
        ],
      },
      {
        kind: "limits",
        limits: [
          "Virtual money only; no real wagering.",
          "No committed backtest or calibration record, so no profitability claim.",
          "Live odds use a placeholder provider.",
        ],
        next: ["Run a walk-forward backtest and publish calibration curves.", "Add player-level features such as injuries and squad value."],
      },
    ],
  },
  {
    slug: "crimecastnyc",
    name: "CrimeCastNYC",
    status: "coursework",
    areas: "Data · Backend",
    lede: "An ETL and analytics pipeline for two decades of NYPD 911 calls-for-service data, built around a year-partitioned PostgreSQL schema.",
    context:
      "Version 2.0 is my restructuring of a course project first built with Atharva Rajan Kale, Kirubhakaran Meenakshi Sundaram and Kushagra Gupta.",
    meta: [
      { label: "ROLE", value: "Project lead; rebuilt the pipeline as version 2.0" },
      { label: "DATA", value: "NYPD 911 calls for service, 2004 onward" },
      { label: "STATUS", value: "Coursework" },
      { label: "STACK", value: "Python · pandas · Parquet · PostgreSQL · Docker · scikit-learn", mono: true },
    ],
    image: "crimecast",
    caption: "Figure 0. From the Socrata API to a partitioned PostgreSQL schema, then mining and models.",
    repo: "https://github.com/anurag2796/crimeCastNYC",
    blocks: [
      {
        kind: "prose",
        title: "Problem",
        paras: [
          "Twenty years of 911 call records are too large to explore comfortably in memory, and most questions are scoped to a time range. The goal was a pipeline that ingests the full history reproducibly and keeps time-bounded queries fast.",
        ],
      },
      {
        kind: "steps",
        title: "Pipeline",
        steps: [
          ["1 · INGEST", "A downloader pulls records from the Socrata Open Data API in yearly chunks."],
          ["2 · CLEAN", "pandas cleans and normalizes the raw CSVs into Parquet."],
          ["3 · LOAD", "Bulk load into a PostgreSQL table range-partitioned by incident date, one partition per year."],
          ["4 · MINE", "Vectorized co-occurrence mining finds association rules between call types."],
          ["5 · MODEL", "Logistic regression classifies call priority; ridge regression predicts call volume per precinct and hour."],
          ["6 · REPORT", "Time series, heatmaps and prediction plots are generated as static reports."],
        ],
      },
      {
        kind: "decisions",
        title: "Decisions and trade-offs",
        items: [
          {
            title: "Partition by year",
            why: "Most queries cover a time range, so the planner only scans the partitions that range touches.",
            tradeoff: "Partitions are declared ahead of time and need maintenance as new years arrive.",
          },
          {
            title: "Matrix co-occurrence instead of iterative Apriori",
            why: "A single matrix product counts every pair of call types at once, which is far faster than candidate generation.",
            tradeoff: "It holds the whole item matrix in memory, which limits scale.",
          },
          {
            title: "pandas over Spark",
            why: "The full pipeline runs on one machine without a cluster.",
            tradeoff: "Scaling beyond city-level data would need a distributed engine.",
          },
        ],
      },
      {
        kind: "limits",
        limits: [
          "Rule mining is memory-bound and would not scale to state-level data as written.",
          "The downloader does not resume after an API timeout.",
          "The record-limit flag is not passed through every stage.",
          "Some older timestamps fail to parse and are left empty.",
        ],
        next: ["Move rule mining to a distributed FP-Growth.", "Make downloads resumable."],
      },
    ],
  },
];

export function findStudy(slug: string | undefined): Study | undefined {
  return STUDIES.find((s) => s.slug === slug);
}
