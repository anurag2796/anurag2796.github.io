import type { Study } from "@/types/content";

export const smartBettingSystem: Study = {
  slug: "smart-betting-system",
  name: "Smart Betting System",
  status: "simulator",
  statusLabel: "◇ Simulator · virtual money",
  areas: "Backend · AI Systems · Data",
  lede: "A closed-loop virtual-money football prediction and betting pipeline: XGBoost match probabilities are compared with bookmaker implied odds, gated by edge and confidence by design, sized via the Kelly Criterion, placed on a schedule, and settled against outcomes.",
  context:
    "Virtual-money simulation and ML engineering exercise only. It connects to no bookmaker, accepts no deposits, and places no real bets; all balances and wagers exist solely in a local database. No backtest, calibration, or ROI results are committed.",
  glance: {
    role: "Sole author (17 commits on dev/automated-betting-system)",
    period: "Dec 2025 – Jan 2026 (~5 weeks; 16 of 17 commits in Jan)",
    team: "Solo",
    context: "Personal project",
    stack: "Python · XGBoost · FastAPI · SQLAlchemy · Alembic · Docker · React",
    links: [
      {
        label: "Repository (dev/automated-betting-system)",
        url: "https://github.com/anurag2796/smart-betting-system/tree/dev/automated-betting-system",
      },
    ],
    status: "Virtual money only · no committed backtest, calibration, or ROI",
  },
  image: "smart",
  caption: "Figure 0. Closed-loop virtual-betting pipeline from match ingestion and feature engineering to settlement.",
  repo: "https://github.com/anurag2796/smart-betting-system/tree/dev/automated-betting-system",
  blocks: [
    {
      kind: "prose",
      title: "Problem",
      paras: [
        "Sports forecasting pairs probability estimation with sequential capital allocation under uncertainty: raw classification accuracy alone is not enough when market prices reflect bookmaker margins, and flat staking ignores edge magnitude.",
        "This project explores a closed-loop ML system that connects ingestion, feature engineering, XGBoost inference, market-relative gating, Kelly sizing, scheduled virtual execution, settlement, and analytics—explicitly framed as a virtual-money engineering exercise with no real-world wagering.",
      ],
    },
    {
      kind: "prose",
      title: "How it works",
      paras: [
        "Built on branch dev/automated-betting-system with Docker packaging and 60+ operational scripts, all balances, virtual wagers, and risk controls live solely in a local database.",
        "The >=2% market-edge and >=55% confidence filters and Kelly Criterion sizing are system design choices rather than proven profitability, as no backtest ROI, closing-line value, or calibration metrics are committed.",
      ],
    },
    {
      kind: "figure",
      src: "images/diagrams/smart-betting-system-pipeline.svg",
      alt: "Smart Betting System virtual-money pipeline diagram: ingestion of 16,000+ Premier League matches and fotmob_scraper feeds feature engineering (advanced_features, player_ratings, team_value) and XGBoost match probabilities. value_scorer gates bets at edge >= 2% versus implied odds and confidence >= 55% by design, feeding Kelly Criterion sizing with a bankroll circuit breaker, scheduled virtual bets every 6 hours in a local SQLAlchemy/Alembic database, and settlement via settle_bets.py into a React dashboard. Labeled VIRTUAL MONEY ONLY with no committed backtest, ROI, or calibration.",
      caption: "Figure 1. Virtual-money prediction, edge gating, Kelly sizing, and settlement loop.",
      width: 1200,
      height: 540,
    },
    {
      kind: "cols",
      title: "What I built",
      groups: [
        {
          title: "Modeling & Features",
          items: [
            "XGBoost pipeline trained on 16,000+ Premier League matches",
            "Feature package (advanced_features, player_ratings, team_value) plus fotmob_scraper",
            "Separated value_scorer enforcing >=2% market edge and >=55% confidence filters",
          ],
        },
        {
          title: "Backend & Settlement",
          items: [
            "Modular FastAPI service (auto_betting/routes.py) across 14,616 lines of Python (112 files)",
            "Kelly Criterion position sizing, six-hour scheduling, and bankroll circuit breaker",
            "Separate settlement module (settle_bets.py) resolving virtual bets against match outcomes",
          ],
        },
        {
          title: "Persistence, Ops & UI",
          items: [
            "SQLAlchemy models with 5 versioned Alembic migrations and Docker / docker-compose packaging",
            "60+ operational scripts organized across ingestion, training, enrichment, maintenance, and analysis",
            "React dashboard (1,644 JSX + 1,799 CSS lines) and 2,382 lines of documentation (15 files)",
          ],
        },
      ],
    },
    {
      kind: "decisions",
      title: "Decisions and trade-offs",
      items: [
        {
          title: "Target market-relative edge (>=2% edge, >=55% confidence) over raw accuracy",
          why: "Evaluating edge against bookmaker implied probability frames the problem around market mispricing rather than unweighted accuracy.",
          tradeoff: "The filters are a design rule rather than proven profit; without held-out backtests or closing-line value checks, beating the market is unestablished.",
        },
        {
          title: "Kelly Criterion sizing with an independent bankroll circuit breaker",
          why: "Kelly sizing scales virtual stakes with perceived edge instead of flat amounts, while a hard balance floor halts wagering regardless of model recommendations.",
          tradeoff: "Kelly sizing assumes well-calibrated probabilities; without committed reliability curves or Brier scores, uncalibrated outputs risk systematically over-betting.",
        },
        {
          title: "Closed-loop FastAPI service with separate settlement over a notebook",
          why: "Wiring Alembic migrations, modular routers, operational scripts, and settle_bets.py exercises full system lifecycle engineering beyond model training.",
          tradeoff: "Built in a five-week burst (16 of 17 commits in January 2026) with thin test coverage (9 test files against 112 Python files), no CI, and legacy code retained in-tree.",
        },
      ],
    },
  ],
  results: [
    {
      scope: "measured",
      claim:
        "Codebase scope computed from git history and tree on dev/automated-betting-system (17 commits, Dec 2025 – Jan 2026): 14,616 lines of Python (112 files), 1,644 lines of React JSX, 1,799 lines of CSS, 5 Alembic migrations, 60+ operational scripts, and 9 test files over 16,000+ Premier League matches.",
    },
    {
      scope: "not measured",
      claim:
        "Backtest performance, realized ROI, hit rate, and closing-line value are not measured or committed in the repository; Kelly sizing and edge filters are system design, not proven profit.",
    },
    {
      scope: "not measured",
      claim:
        "Probability calibration (reliability curves, Brier score) and guards against look-ahead feature leakage or odds survivorship bias are not documented or verified on record.",
    },
  ],
  limits: [
    "Virtual money only: connects to no bookmaker, accepts no deposits, and places no real bets; all balances and wagers live in a local database.",
    "No committed backtest, realized ROI, hit rate, closing-line value, or calibration metrics; whether the model beats market closing lines is unestablished.",
    "Kelly sizing requires calibrated probabilities, and no calibration check (reliability curve or Brier score) is committed.",
    "Look-ahead leakage in feature construction and survivorship bias in odds history are not documented or tested as guarded.",
    "Thin test coverage (9 test files across 112 Python files), no CI, 5-week active window, and legacy artifacts (frontend-legacy/, archive/experiments/, .legacy/.backup files) remain in-tree.",
  ],
};
