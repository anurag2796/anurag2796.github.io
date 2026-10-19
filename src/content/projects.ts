import type { StatusKind } from "@/components/ui-bits";
import { FEDLEARN_REPO, ROUTES, type ImageKey } from "@/site";

export const AREAS = ["Backend", "Full-stack", "AI Systems", "Data"] as const;
export type Area = (typeof AREAS)[number];

export type Project = {
  tier: "flagship" | "index" | "archive";
  slug: string;
  name: string;
  areas: Area[];
  status: StatusKind;
  owner?: string;
  why?: string;
  desc: string;
  evidence?: string;
  tech?: string;
  href?: string;
  cta?: string;
  repo?: string;
  image?: ImageKey;
};

export const PROJECTS: Project[] = [
  {
    tier: "flagship",
    slug: "fedlearn",
    name: "FedLearn Platform",
    areas: ["Backend", "Full-stack", "AI Systems"],
    status: "active",
    owner: "Primary architect and principal implementer · early-stage contributions by Chinmay Lokare",
    desc: "A custom, full-stack federated-learning platform connecting web, desktop, Docker, and native mobile clients to a PyTorch/gRPC runtime, with reproducible experiments across heterogeneous hardware.",
    evidence:
      "FedAvg within 2.39 × 10⁻⁷ of Flower over 200 aggregations · Rényi DP accountant checked against Opacus over 154 orders · physical runs on Apple Silicon, Jetson, NVIDIA and Android.",
    tech: "Java 21 · Spring Boot 3 · Python · PyTorch · gRPC · React · Electron · React Native · C++",
    href: ROUTES.fedlearn,
    cta: "Read the case study",
    repo: FEDLEARN_REPO,
    image: "fedlearn",
  },
  {
    tier: "flagship",
    slug: "tigerresearchbuddy",
    name: "TigerResearchBuddy",
    areas: ["AI Systems", "Full-stack"],
    status: "demo",
    owner: "Developer · retrieval pipeline, extraction and edge deployment",
    why: "Built to encourage collaboration between students and researchers at RIT and to strengthen research culture on campus: when it is easy to see who works on what, it is easier to reach out.",
    desc: "A local-first RIT research-discovery system combining vector retrieval, knowledge-graph traversal, and VLM-validated document extraction, deployed on NVIDIA Jetson Orin for a public demonstration.",
    evidence:
      "Ran end to end on Jetson Orin for the demo · failed runs documented, classified and pinned with regression tests · formal retrieval benchmark is the next step.",
    tech: "Python · React · TypeScript · Ollama · Gemini · NVIDIA Jetson Orin",
    href: ROUTES.trb,
    cta: "Read the case study",
    image: "trb",
  },
  {
    tier: "flagship",
    slug: "financial-services",
    name: "Financial-services delivery",
    areas: ["Backend", "Data"],
    status: "production",
    owner: "EY Senior Technology Consultant and TCS Software Engineer, inside client engagements",
    desc: "Real-time fraud decisioning, portfolio data and consumer-lending services, built and supported in production for financial-services clients.",
    evidence:
      "Screening SLA cut from 5,000 ms to under 500 ms with Redis-backed caching · 75% lower manual-review time · 1M+ transactions a day at 99.9% uptime.",
    tech: "Java · Scala · Spring Boot · Kafka · Redis · MongoDB · OpenShift",
    href: ROUTES.finserv,
    cta: "Read the case study",
  },
  {
    tier: "index",
    slug: "executorch",
    name: "ExecuTorch kernel fix",
    areas: ["AI Systems"],
    status: "oss",
    owner: "Contribution branch to PyTorch ExecuTorch",
    desc: "Diagnosed and prepared a fix for an ExecuTorch max-pooling backward bug that reused stale gradient memory, then validated the correction on macOS arm64 and a Snapdragon 845 handset with affected and negative-control models.",
    evidence:
      "291 of 300 training steps were NaN before the fix and none after; five unaffected control models kept identical loss curves.",
    tech: "C++ · ExecuTorch",
    href: ROUTES.fedlearn,
    cta: "Read the debugging story →",
  },
  {
    tier: "index",
    slug: "hybrid-ml-scheduler",
    name: "Hybrid ML Scheduler",
    areas: ["Backend", "Full-stack", "AI Systems"],
    status: "simulator",
    owner: "Sole author",
    desc: "A live heterogeneous-compute scheduling simulator comparing heuristics, Random Forest, and DQN policies against a brute-force Oracle, with online retraining and WebSocket observability.",
    evidence: "All policies see identical synthetic task streams; energy and cost are modeled, not measured on hardware.",
    tech: "Python · FastAPI · PostgreSQL · Redis · WebSocket · React",
    image: "hybrid",
  },
  {
    tier: "index",
    slug: "faminesight",
    name: "FamineSight",
    areas: ["AI Systems", "Data"],
    status: "prototype",
    owner: "Sole author",
    desc: "An audited humanitarian-ML research prototype combining conflict, food-price, weather, vegetation, displacement, and food-security data into predictive, clustering, and anomaly-analysis workflows.",
    evidence:
      "Audited · not production-ready. Known integration defects are published with the code, and synthetic development data is kept separate from real conclusions.",
    tech: "Python · XGBoost · HDBSCAN · FastAPI · Streamlit",
  },
  {
    tier: "index",
    slug: "leafmd",
    name: "LeafMD",
    areas: ["AI Systems"],
    status: "coursework",
    owner: "Developer · Advanced Computer Vision",
    desc: "An offline plant-disease detection pipeline investigating the gap between controlled PlantVillage images and real PlantDoc field conditions through curriculum learning, augmentation, pseudo-labeling, and edge-oriented export.",
    evidence: "Built a dedicated lab-to-field evaluator; comparison results are not yet published.",
    tech: "Python · YOLO11n · YOLO26n · FastAPI",
    image: "leafmd",
  },
  {
    tier: "index",
    slug: "smart-betting-system",
    name: "Smart Betting System",
    areas: ["Backend", "AI Systems", "Data"],
    status: "simulator",
    owner: "Developer",
    desc: "A virtual-money football forecasting pipeline that converts XGBoost probabilities into market-relative edge, risk-controlled Kelly positions, settlement, and portfolio analytics.",
    evidence: "Virtual money only · no real wagering · no profitability claim. A walk-forward backtest is future work.",
    tech: "Python · XGBoost · FastAPI · SQLAlchemy · React",
    image: "smart",
  },
  {
    tier: "index",
    slug: "crimecastnyc",
    name: "CrimeCastNYC",
    areas: ["Data", "Backend"],
    status: "coursework",
    owner: "Sole author",
    desc: "A compact ETL and analytics pipeline for two decades of NYPD 911 data, using Parquet, a partitioned PostgreSQL star schema, vectorized Apriori, and classical predictive models.",
    evidence: "The pipeline runs on pandas; the star schema and year partitioning are the main engineering work.",
    tech: "Python · pandas · Parquet · PostgreSQL · Docker",
    image: "crimecast",
  },
  {
    tier: "archive",
    slug: "heatwaves",
    name: "Heatwaves Reproduction",
    areas: ["Data"],
    status: "archived",
    desc: "R reproduction of a 42-year heatwave and viticulture study; 33 of 35 automated checks pass and the divergences are reported.",
  },
  {
    tier: "archive",
    slug: "dart",
    name: "dART",
    areas: ["AI Systems"],
    status: "archived",
    desc: "An ART-1 neural network modeled as Scala/Akka actors, exploring asynchronous message passing.",
  },
];
