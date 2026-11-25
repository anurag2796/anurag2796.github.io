import type { Study } from "@/types/content";

export const crimecastnyc: Study = {
  slug: "crimecastnyc",
  name: "CrimeCastNYC",
  status: "coursework",
  areas: "Data · Backend",
  lede: "A compact ETL and analytics pipeline over roughly twenty years of NYPD 911 call data (2004–2024), built around Parquet staging, a year-partitioned PostgreSQL star schema, matrix-vectorized Apriori mining, and classical spatiotemporal models.",
  context:
    "Coursework-scale pipeline (~1,000 lines of Python, 3 commits, 0 tests) built in Feb 2026. Runs on pandas—the PySpark cleaner is written but not wired in.",
  glance: {
    role: "Sole author (3 commits, 100%)",
    period: "Feb 2026 (2 weeks)",
    team: "Solo",
    context: "Coursework, RIT",
    stack: "Python · pandas · Parquet · PostgreSQL · Docker · scikit-learn",
    links: [{ label: "Repository", url: "https://github.com/anurag2796/crimeCastNYC" }],
    status: "Coursework-scale pipeline · pandas path · 0 tests · no committed results",
  },
  image: "crimecast",
  caption: "Figure 0. Year-chunked Socrata ingestion, pandas cleaning to Parquet, partitioned PostgreSQL star schema, and analytics.",
  repo: "https://github.com/anurag2796/crimeCastNYC",
  blocks: [
    {
      kind: "prose",
      title: "Problem",
      paras: [
        "Analyzing twenty years of NYPD 911 call records (2004–2024) requires repeatable ingestion, compact columnar storage, and a relational layout suited to time-bounded queries rather than dumping raw CSVs into a flat table.",
        "The goal was a well-organized, step-wise ETL and analytics pipeline orchestrated from a single CLI entry point, pairing physical data-modeling choices with crime co-occurrence mining and classical prediction.",
      ],
    },
    {
      kind: "prose",
      title: "How it works",
      paras: [
        "Orchestrated from src/main.py (--step all --start_year ... --end_year ...) across 996 lines of Python in 13 files, the executed pipeline runs pandas cleaning (cleaner.py) while cleaner_spark.py remains unwired in-tree.",
        "The repository contains zero test files, no database migrations despite alembic in dependencies, and no committed mined rules, model scores, or report plots.",
      ],
    },
    {
      kind: "figure",
      src: "images/diagrams/crimecastnyc-pipeline.svg",
      alt: "CrimeCastNYC pipeline diagram: Socrata API feeds downloader.py in year chunks to raw CSVs, then the active pandas cleaner (cleaner.py) writes Parquet, which loader.py loads into a year-partitioned PostgreSQL star schema in Docker Compose. An unwired PySpark cleaner (cleaner_spark.py) is shown as a dashed greyed box disconnected from main.py. PostgreSQL feeds matrix-vectorized Apriori mining (mining.py) and Logistic plus Ridge regression (ml.py), ending in static reports (generator.py) with 0 tests and no committed outputs.",
      caption: "Figure 1. Executed pandas-to-PostgreSQL star-schema pipeline and unwired Spark module.",
      width: 1200,
      height: 560,
    },
    {
      kind: "cols",
      title: "What I built",
      groups: [
        {
          title: "ETL & Star Schema",
          items: [
            "Year-chunked Socrata API downloader (100 lines) and pandas-to-Parquet cleaner (103 lines)",
            "Unwired PySpark cleaner module (cleaner_spark.py, 104 lines) committed in-tree",
            "Bulk loader (127 lines) targeting a year-partitioned PostgreSQL star schema in Docker Compose",
          ],
        },
        {
          title: "Mining & ML",
          items: [
            "Matrix-vectorized Apriori co-occurrence mining (134 lines) avoiding nested-loop scans",
            "Logistic Regression priority classifier and Ridge Regression precinct/hour volume model (161 lines)",
            "Step-wise CLI orchestration in main.py (84 lines) supporting full or single-stage runs",
          ],
        },
        {
          title: "Reporting & Docs",
          items: [
            "Static report generator (112 lines) for time series, heatmaps, and prediction scatter plots",
            "Compact codebase: 996 lines of Python across 13 files",
            "9-page wiki documentation (472 lines across 10 markdown files)",
          ],
        },
      ],
    },
    {
      kind: "decisions",
      title: "Decisions and trade-offs",
      items: [
        {
          title: "Year-partitioned PostgreSQL star schema over a flat table",
          why: "Time-bounded queries over a 20-year fact table benefit from year partitioning and dimensional modeling rather than scanning an unpartitioned flat table.",
          tradeoff: "Requires partition management as new years are added and carries more schema structure than a single flat table.",
        },
        {
          title: "Parquet intermediate and matrix-vectorized Apriori",
          why: "Columnar compressed Parquet fits analytical batch reads between cleaning and loading, while matrix operations replace slow nested-iteration candidate checks in Apriori.",
          tradeoff: "Matrix co-occurrence remains memory-bound on a single machine and would not scale to much larger datasets without distributed mining.",
        },
        {
          title: "Executed pandas path despite PySpark dependency",
          why: "Running cleaner.py in pandas executes locally without requiring a Spark cluster.",
          tradeoff: "cleaner_spark.py (104 lines) and pyspark>=3.5.0 remain unwired in main.py, so this is not a Spark pipeline despite the README headline.",
        },
      ],
    },
  ],
  results: [
    {
      scope: "measured",
      claim:
        "Codebase scope computed from git history and tree (3 commits over 2 weeks in Feb 2026): 996 lines of Python across 13 files, 472 lines of documentation (10 markdown files / 9-page wiki), covering NYPD 911 data from 2004–2024.",
    },
    {
      scope: "not measured",
      claim:
        "No mined association rules, Logistic Regression classification accuracy, Ridge Regression R², or generated report plots are committed in the repository.",
    },
    {
      scope: "not measured",
      claim:
        "Automated tests and Spark execution are not present in the executed pipeline: 0 test files exist across 13 modules, and cleaner_spark.py is unwired.",
    },
  ],
  limits: [
    "Pandas executed path, not a Spark pipeline: main.py imports and runs etl/cleaner.py (pandas), while cleaner_spark.py is committed but unwired.",
    "Compact coursework scale (~996 lines of Python across 13 files, 3 commits over two weeks) with no bug-fix or refinement iteration history.",
    "Zero tests (0 test files across 13 modules), no CI, and no database migrations despite alembic being listed in dependencies.",
    "No mined rules, model accuracy/R², or generated visualization outputs are committed on record.",
  ],
};
