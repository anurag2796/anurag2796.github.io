import type { Study } from "@/types/content";

export const faminesight: Study = {
  slug: "faminesight",
  name: "FamineSight",
  status: "prototype",
  areas: "AI Systems · Data",
  lede: "A Somalia hunger-mortality and crisis early-warning pipeline combining seven humanitarian data sources into a district-month panel for clustering, anomaly detection, rare-event classification, and LLM situation summaries.",
  context:
    "Solo CSCI.720 Big Data Analytics course project at RIT (May 2026). The final run used real data, but no valid performance scores are committed on record, and pre-publication audit defects have not been verified as fixed.",
  glance: {
    role: "Sole author",
    period: "May 2026",
    team: "Solo",
    context: "CSCI.720 Big Data Analytics course project, RIT",
    stack: "Python · scikit-learn · XGBoost · HDBSCAN · FastAPI · Streamlit · Ollama · Groq · Docker",
    links: [{ label: "Repository", url: "https://github.com/anurag2796/famineSight" }],
    status: "Course project · real data used · no valid scores committed",
  },
  repo: "https://github.com/anurag2796/famineSight",
  blocks: [
    {
      kind: "prose",
      title: "Problem",
      paras: [
        "Early-warning signals for hunger-related mortality live across separate organizations, reporting cadences, and formats: conflict events, market prices, rainfall, vegetation, displacement, food-security phases, and mortality estimates.",
        "FamineSight integrates seven sources into one Somalia district-month spatio-temporal panel to test district profiling, anomaly detection, and crisis classification without leaking future observations across splits.",
      ],
    },
    {
      kind: "prose",
      title: "How it works",
      paras: [
        "Ingestion scripts support synthetic fallback when credentials are missing, though the final run used real data aligned to a Somalia district-month panel with chronological train/test splits to prevent temporal leakage.",
        "Classifiers (Naive Bayes, SVM, MLP, Random Forest, XGBoost) train with SMOTE and target average precision and recall, though no valid scores are committed and May 1 audit defects remain unverified.",
      ],
    },
    {
      kind: "figure",
      src: "images/diagrams/faminesight-pipeline.svg",
      alt: "FamineSight pipeline diagram: seven sources (ACLED, WFP, CHIRPS, NDVI, UNHCR, IPC, FSNAU) join into a Somalia district-month spatio-temporal panel with KNN imputation, Z-score outliers, 1–3 month lags, rolling windows, PCA, and a chronological split. It branches into clustering (K-Means, DBSCAN/HDBSCAN), anomaly detection, association rules, and a five-classifier comparison (NB, SVM, MLP, RF, XGBoost with SMOTE) with no valid scores committed, feeding FastAPI, Streamlit, and Groq or Ollama LLM narratives.",
      caption: "Figure 1. FamineSight seven-source panel, analytics tracks, and serving stack.",
      width: 1200,
      height: 580,
    },
    {
      kind: "cols",
      title: "What I built",
      groups: [
        {
          title: "Data and preprocessing",
          items: [
            "Multi-source ingestion into a Somalia district-month panel (~8,600 lines of Python across 55 files)",
            "KNN imputation, interpolation, Z-score outlier analysis, 1–3 month lags, rolling windows, and PCA",
            "5 exploratory and training notebooks plus a LaTeX technical report",
          ],
        },
        {
          title: "Analytics and modeling",
          items: [
            "K-Means and DBSCAN/HDBSCAN district profiling, anomaly detection, and association-rule mining",
            "Chronological train/test split with SMOTE and five classifiers (Naive Bayes, SVM, MLP, Random Forest, XGBoost)",
            "LLM situation-report generation via Groq or local Ollama",
          ],
        },
        {
          title: "Serving and tests",
          items: [
            "FastAPI service with API-key authentication, Pydantic v2 schemas, and a model registry",
            "Streamlit dashboard and Docker / Docker Compose packaging",
            "Unit and integration tests for the backend API, inference service, model registry, and frontend helpers",
          ],
        },
      ],
    },
    {
      kind: "decisions",
      title: "Decisions and trade-offs",
      items: [
        {
          title: "Chronological split over random k-fold",
          why: "District-month panels carry temporal autocorrelation and lagged features; a random split would leak future crisis states into training.",
          tradeoff: "Fewer training windows are available for later test horizons, and shifting conditions across years are harder to fit.",
        },
        {
          title: "Average precision and recall over accuracy",
          why: "Severe crisis and mortality events are sparse; overall accuracy looks high even if a model misses rare emergencies.",
          tradeoff: "Applying SMOTE to handle imbalance alters base rates and requires separate threshold calibration before any operational use.",
        },
        {
          title: "Real-data pipeline with synthetic fallback",
          why: "Allowing scripts to fall back when API credentials are absent keeps development unblocked while the final run used real data.",
          tradeoff: "Fallback paths can mask integration or schema mismatches unless real-data runs and scores are explicitly logged and committed.",
        },
      ],
    },
  ],
  results: [
    {
      scope: "not measured",
      claim:
        "Classifier comparison across Naive Bayes, SVM, MLP, Random Forest, and XGBoost: the final run used real data, but no recall, average-precision, or calibration scores are committed (the report's comparison figure has empty bars).",
    },
    {
      scope: "not measured",
      claim:
        "Pre-publication audit remediation: tests, Dockerfiles, and a training script were added after a May 1 audit rated production readiness at 35%, but fixes for its startup bugs have not been verified.",
    },
  ],
  limits: [
    "No measured classification scores on record: the report's comparison figure (algorithm_comparison.png) contains empty bars and the report text provides no numeric metrics, so report claims of superior recall or calibrated alerts are unsupported.",
    "The final run used real data (with synthetic fallback available when credentials are missing), but real-data evaluation scores are not committed anywhere in the repository.",
    "A May 1 pre-publication audit flagged startup-breaking defects (model-path mismatch, missing XGBoost artifact, and a 7-feature request against a 33-feature scaler); subsequent commits added tests, Dockerfiles, and a training script, but whether every listed bug was fixed has not been verified.",
    "Scope is Somalia district-month hunger-mortality and crisis classification, not operational early warning or Africa-wide crop-yield forecasting.",
  ],
};
