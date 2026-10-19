// Contact details and external links used across the site.

export const EMAIL = "anuragpandey2796@gmail.com";
export const MAILTO = `mailto:${EMAIL}`;
export const GITHUB = "https://github.com/anurag2796";
export const LINKEDIN = "https://linkedin.com/in/anurag2796";
// Relative paths: the site is always served from the root document (hash routing).
export const RESUME = "resume.pdf";

export const FEDLEARN_REPO = "https://github.com/Learning-Optimization-Group/FedLearn-Platform";
export const EXECUTORCH_ISSUE = "https://github.com/pytorch/executorch/issues/21686";

export const ROUTES = {
  home: "/",
  work: "/work",
  fedlearn: "/work/fedlearn",
  trb: "/work/tigerresearchbuddy",
  finserv: "/work/financial-services",
  experience: "/experience",
  about: "/about",
} as const;

export const IMAGES = {
  fedlearn: {
    src: "images/fedlearn.webp",
    width: 1672,
    height: 941,
    alt: "FedLearn overview: a browser dashboard reaches the Spring Boot orchestrator through nginx; the orchestrator drives a custom PyTorch and gRPC federated-learning server, which sends model updates to Apple Silicon, NVIDIA GPU, Jetson ARM64 and Android clients and receives aggregated updates back. Electron, Docker and React Native are the other client surfaces.",
  },
  trb: {
    src: "images/tigerresearchbuddy.webp",
    width: 1672,
    height: 700,
    alt: "TigerResearchBuddy pipeline: RIT web pages and research PDFs go through VLM-validated extraction, then vector retrieval and knowledge-graph traversal, then a combined research context, then Ollama or Gemini, ending in a cited answer. The pipeline runs on a Jetson Orin.",
  },
  hybrid: {
    src: "images/hybrid-ml-scheduler.webp",
    width: 1672,
    height: 941,
    alt: "Hybrid ML Scheduler: a synthetic task stream feeds six scheduling lanes, from round robin to a DQN agent and an Oracle, compared on time, energy and cost. Simulation only.",
  },
  leafmd: {
    src: "images/leafmd.webp",
    width: 1672,
    height: 940,
    alt: "LeafMD pipeline from PlantVillage lab images to PlantDoc field images: curriculum learning, augmentation, pseudo-labeling, YOLO comparison, test-time augmentation and INT8 export.",
  },
  crimecast: {
    src: "images/crimecastnyc.webp",
    width: 1672,
    height: 941,
    alt: "CrimeCastNYC pipeline: Socrata API, year-chunked downloader, pandas cleaning, Parquet and a year-partitioned PostgreSQL star schema, feeding Apriori, priority classification and call-volume regression.",
  },
  smart: {
    src: "images/smart-betting-system.webp",
    width: 1672,
    height: 941,
    alt: "Smart Betting System: XGBoost probabilities compared with market-implied odds, an edge and confidence gate, Kelly sizing, virtual positions, settlement and analytics. Virtual money only.",
  },
} as const;

export type ImageKey = keyof typeof IMAGES;
