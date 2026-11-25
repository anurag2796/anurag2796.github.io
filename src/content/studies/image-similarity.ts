import type { Study } from "@/types/content";

export const imageSimilarity: Study = {
  slug: "image-similarity",
  name: "imageSimilarity",
  status: "prototype",
  areas: "AI Systems",
  lede: "A modular PyTorch comparison of two pairwise image-similarity pipelines on TinyImageNet: a frozen DINOv2 backbone with a trained similarity head versus a fine-tuned CLIP vision encoder with validation-tuned cosine thresholding.",
  context:
    "Representation learning and similarity (not generative AI). Published Feb 2026 after refactoring an earlier monolithic script; course affiliation is not recorded, and no accuracy or retrieval metrics are committed.",
  glance: {
    role: "Sole author",
    period: "Feb 2026",
    team: "Solo",
    context: "Personal / academic (course affiliation not recorded)",
    stack: "Python · PyTorch · DINOv2 · CLIP · Hugging Face datasets",
    links: [{ label: "Repository", url: "https://github.com/anurag2796/imageSimilarity" }],
    status: "Prototype · representation learning · no committed metrics",
  },
  repo: "https://github.com/anurag2796/imageSimilarity",
  blocks: [
    {
      kind: "prose",
      title: "Problem",
      paras: [
        "Determining whether two images belong to the same category is a representation-learning and metric-calibration problem, not image generation. Different pretrained vision backbones also favor different pairwise scoring setups.",
        "This project places two approaches side by side on the same TinyImageNet dataset behind a shared CLI and modular training pipeline: learning a pairwise classifier over frozen self-supervised features (DINOv2), and fine-tuning a vision encoder whose embeddings are compared directly by cosine distance (CLIP).",
      ],
    },
    {
      kind: "prose",
      title: "How it works",
      paras: [
        "Both pipelines share a modular config/data/models/training/utils codebase (~830 lines, split from an earlier monolithic script) and run via dino, clip, or all CLI modes with automatic MPS → CUDA → CPU selection.",
        "Pair generation requires at least 2 classes with at least 2 instances each (dry runs can unbalance classes), and no accuracy, ROC, or retrieval metrics are committed.",
      ],
    },
    {
      kind: "figure",
      src: "images/diagrams/image-similarity-pipeline.svg",
      alt: "imageSimilarity pipeline diagram: TinyImageNet via Hugging Face datasets generates balanced positive and negative image pairs (num_workers=0 on macOS) into two parallel branches: a frozen DINOv2 backbone feeding a trainable Linear-Dropout-Linear head with BCE loss, and a fine-tuned CLIP vision encoder feeding pairwise cosine distance with a validation-tuned threshold applied to test pairs. Both run via a shared CLI (dino, clip, all) with no committed accuracy or ROC metrics.",
      caption: "Figure 1. Parallel DINOv2 pairwise-head and fine-tuned CLIP cosine-threshold pipelines.",
      width: 1200,
      height: 500,
    },
    {
      kind: "table",
      title: "Two similarity pipelines",
      caption: "Table 1. Backbone adaptation and pairwise decision rule for each mode.",
      columns: ["MODEL", "BACKBONE", "HEAD & OBJECTIVE", "DECISION RULE"],
      rows: [
        ["DINOv2", "Frozen", "Trainable Linear → Dropout → Linear head with BCE loss", "Trained pairwise classifier on balanced pairs"],
        ["CLIP", "Fine-tuned vision encoder", "Classification objective", "Validation-tuned cosine-distance threshold on test pairs"],
      ],
    },
    {
      kind: "cols",
      title: "What I built",
      groups: [
        {
          title: "Data and pairing",
          items: [
            "Hugging Face datasets loader for TinyImageNet",
            "Balanced positive and negative pair generator",
            "macOS-compatible DataLoader configuration (num_workers=0)",
          ],
        },
        {
          title: "Models and training",
          items: [
            "Frozen DINOv2 feature extractor with trainable BCE similarity head",
            "Fine-tuned CLIP vision encoder with validation-tuned cosine thresholding",
            "CLI modes (dino, clip, all) with MPS → CUDA → CPU device fallback and loss/threshold plotting",
          ],
        },
        {
          title: "Structure and tests",
          items: [
            "Refactored an earlier monolithic script into modular config, data, models, training, and utils packages (~830 lines of Python)",
            "Unit tests covering data loading and model modules",
            "7-page project wiki documenting setup and known constraints",
          ],
        },
      ],
    },
    {
      kind: "decisions",
      title: "Decisions and trade-offs",
      items: [
        {
          title: "Frozen DINOv2 head vs fine-tuned CLIP embeddings",
          why: "Keeping DINOv2 frozen isolates how well self-supervised features work with a small pairwise head, whereas fine-tuning CLIP tests task-adapted embeddings under a direct cosine metric.",
          tradeoff: "The two pipelines differ in both backbone mutability and objective (pairwise BCE vs classification + cosine thresholding), so differences reflect the full setup rather than backbone alone.",
        },
        {
          title: "Tune the cosine threshold on validation only",
          why: "Selecting the cosine-distance cutoff on the validation split prevents test-set leakage when evaluating pairwise verification.",
          tradeoff: "Performance depends on validation-split calibration transferring cleanly to held-out pairs.",
        },
        {
          title: "Modular split and single-process loading on macOS",
          why: "Splitting the original monolithic script into config/data/models/training/utils makes both pipelines testable and runnable from one CLI, while num_workers=0 avoids macOS multiprocessing issues.",
          tradeoff: "Single-process data loading trades away worker parallelism during local runs.",
        },
      ],
    },
  ],
  results: [
    {
      scope: "not measured",
      claim:
        "Pairwise same-category accuracy, ROC/PR metrics, and retrieval comparisons between DINOv2 and CLIP on TinyImageNet: unit tests for data and models exist, but no evaluation metrics are committed in the repository.",
    },
  ],
  limits: [
    "No accuracy, ROC, or retrieval metrics are committed in the repository for either the DINOv2 or CLIP pipeline.",
    "Representation learning and pairwise similarity only — not generative AI.",
    "Known data constraints documented in the wiki: pair generation requires at least 2 classes with at least 2 instances each, and dry runs can leave classes unbalanced.",
    "Uses num_workers=0 on macOS; compact ~830-line repository with 2 public commits (after splitting an earlier script) and no recorded course affiliation.",
  ],
};
