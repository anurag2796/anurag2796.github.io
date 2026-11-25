import type { Study } from "@/types/content";

export const nexus: Study = {
  slug: "nexus",
  name: "Nexus + Research Circle",
  status: "prototype",
  statusLabel: "▲ Hackathon prototype",
  areas: "AI Systems · Full-stack · Backend",
  lede: "A campus research-collaboration platform built in 10 days for the Meta Global AI Developer Hackathon alongside Research Circle's team continuation of TigerResearchBuddy.",
  context:
    "Meta Global AI Developer Hackathon (Oct 26 – Nov 4, 2026, Indie Developer Track; 5,367 projects submitted globally; did not place). Demo content includes seeded researcher profiles and runs in deterministic fixture mode without an API key.",
  glance: {
    role: "Lead developer (123 of 124 Nexus commits; 75 of 83 Oct–Nov Research Circle commits)",
    period: "Oct 1 – Nov 4, 2026 (hackathon Oct 26 – Nov 4)",
    team: "Team #4966 (with Prakyat on Nexus UI; Prakyat and Isha on Research Circle)",
    context: "Meta Global AI Developer Hackathon (Indie Developer Track) & Research Circle",
    stack: "Python · FastAPI · Next.js 16 · Meta Muse · Docker · nginx",
    links: [
      { label: "Repository", url: "https://github.com/nexus-research-ai/nexus" },
      { label: "Demo video", url: "https://youtu.be/iejjJqIcyqI" },
    ],
    status: "Hackathon prototype · did not place",
  },
  repo: "https://github.com/nexus-research-ai/nexus",
  blocks: [
    {
      kind: "prose",
      title: "Problem",
      paras: [
        "Campus researchers lack a unified way to discover overlapping work across people, labs, pre-prints, and code with opt-in privacy, timestamped priority commitments before disclosure, and source-checked grant drafting.",
        "Built in 10 days for the Meta Global AI Developer Hackathon as a policy-enforced layer on top of Research Circle's continuation of TigerResearchBuddy.",
      ],
    },
    {
      kind: "figure",
      title: "Architecture",
      src: "images/diagrams/nexus-hld.svg",
      alt: "Nexus and Research Circle high-level architecture: Next.js 16 frontend (UI designed by teammate Prakyat, integrated by Anurag) communicates over FastAPI and typed contracts with four Python packages (discovery campus graph and double opt-in matcher, intelligence with Meta Muse and citation auditor, workspace hash-commitment vault, and funding grant studio). All reads pass through a single Policy Enforcement Point using the PUBLIC < SHARED < CONFIDENTIAL lattice and a credential-less Data-Access Broker backed by a hash-chained audit sink and Research Circle's ingested corpus.",
      caption: "Figure 1. Nexus monorepo architecture, lattice enforcement boundary, and Research Circle continuation.",
      width: 1200,
      height: 660,
    },
    {
      kind: "steps",
      title: "How it works",
      intro:
        "Research Circle builds the campus corpus and graph; Nexus routes every workflow through one policy boundary.",
      steps: [
        [
          "1 · INGEST & GRAPH",
          "Research Circle batch-ingests 2,100+ PDF records, links 850+ publications to faculty, and scales the graph to 2,500 nodes with ego-network queries and semantic-zoom clustering.",
        ],
        [
          "2 · POLICY GATE",
          "Feature packages invoke the single PEP and credential-less broker over typed contracts, combining PUBLIC < SHARED < CONFIDENTIAL by the max rule.",
        ],
        [
          "3 · MATCH",
          "Double opt-in matching reveals overlapping campus work only after mutual consent.",
        ],
        [
          "4 · COMMIT",
          "The priority vault records SHA-256 and Merkle-root commit-reveal commitments into a hash-chained audit sink.",
        ],
        [
          "5 · DRAFT & CHECK",
          "The grant studio drafts NSF/NIH/DARPA sections with muse-wonder-1.0 / muse-spark-1.3 and checks citations against source text, alongside grounded chat and Cosmograph/Gephi/VOSviewer export.",
        ],
      ],
    },
    {
      kind: "cols",
      title: "What I built",
      intro:
        "Commit history separates individual work from teammates' contributions: 123 of 124 Nexus commits and 75 of 83 Oct–Nov Research Circle commits are mine, while teammates owned the Nexus UI design and Research Circle's collaborator-matching and member-UI branches.",
      groups: [
        {
          title: "Nexus backend & enforcement (my commits)",
          items: [
            "Python monorepo split into contracts, enforcement, discovery, intelligence, workspace, and funding packages",
            "Single policy-enforcement point, credential-less data-access broker, and PUBLIC < SHARED < CONFIDENTIAL lattice",
            "SHA-256 and Merkle-root hash commit-reveal priority vault with a hash-chained audit sink",
            "FastAPI backend, Next.js 16 integration of Prakyat's UI with force-directed graph, Docker Compose/nginx deployment, and 19 test functions across 5 test files",
          ],
        },
        {
          title: "Research Circle continuation (my commits)",
          items: [
            "Meta model provider and grounded research chat backed by hybrid semantic search",
            "Batch ingestion of 2,100+ PDF paper records linking 850+ publications to faculty",
            "Graph expansion up to 2,500 nodes with ego-network queries, semantic-zoom clustering, and Cosmograph, Gephi, and VOSviewer exporters",
            "Idea synthesizer, proposal editor, and private HTTPS deployment on shared host G14 with restart acceptance recorded",
          ],
        },
        {
          title: "Teammates' scope (separate)",
          items: [
            "Prakyat (Nexus): UI design integrated as the primary frontend (1 of 124 Nexus commits)",
            "Prakyat and Isha (Research Circle): collaborator-matching and member-UI branches (8 of 83 Oct–Nov commits)",
          ],
        },
      ],
    },
    {
      kind: "decisions",
      title: "Decisions and trade-offs",
      items: [
        {
          title: "Central policy-enforcement point and credential-less broker",
          why: "Isolating database credentials behind one broker ensures every discovery, vault, and funding access passes through the three-tier classification lattice.",
          tradeoff: "Every feature package must use broker contracts instead of direct queries, adding boilerplate during a 10-day hackathon build.",
        },
        {
          title: "SHA-256 and Merkle-root hash commit-reveal for priority",
          why: "Hash commitments and Merkle roots establish timestamped priority before disclosure with minimal complexity and an auditable chain.",
          tradeoff: "Verification requires revealing the committed content later; unlike cryptographic proof circuits, it is strictly a hash commit-reveal.",
        },
        {
          title: "Deterministic fixture mode without an API key",
          why: "Allows evaluators and local setups to exercise the graph, matching, and proposal workflows reliably without live Meta Muse credentials.",
          tradeoff: "Offline demos rely on seeded researcher profiles and generated avatars rather than live campus directories or live inference.",
        },
      ],
    },
  ],
  results: [
    {
      scope: "measured",
      claim:
        "Cloned git histories record 123 of 124 commits by Anurag in Nexus (Oct 26 – Nov 4, 2026) with 19 test functions across 5 test files, and 75 of 83 Oct–Nov commits by Anurag in Research Circle (branches anurag/dev and anurag/latest).",
    },
    {
      scope: "reported",
      claim:
        "Submitted to the Meta Global AI Developer Hackathon (Indie Developer Track, 5,367 global submissions); did not place.",
    },
    {
      scope: "reported",
      claim:
        "Research Circle ingested 2,100+ PDF paper records, linked 850+ publications to faculty, scaled the graph up to 2,500 nodes, and recorded restart acceptance on a private HTTPS deployment on shared host G14.",
    },
    {
      scope: "not measured",
      claim:
        "Retrieval precision/recall, citation-check accuracy, latency, and user adoption; model-generated documents under docs/evidence/ are excluded as non-independent.",
    },
  ],
  limits: [
    "Hackathon prototype built in 10 days (Oct 26 – Nov 4, 2026); did not place in the 5,367-submission event.",
    "Demo content includes seeded researcher profiles and generated avatars, and falls back to deterministic fixture mode when no API key is present.",
    "The hypothesis vault uses a SHA-256 and Merkle-root hash commit-reveal scheme; despite wording in the repository README, it is not a cryptographic proof circuit.",
    "Benchmark and audit files in Nexus's docs/evidence/ folder are outputs from Meta model conversations rather than independent measurements, and their numbers are not used.",
    "Research Circle's Oct–Nov code lives on branches anurag/dev and anurag/latest while main ends at an August README/license commit; no retrieval benchmark is recorded.",
  ],
};
