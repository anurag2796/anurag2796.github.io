import type { Study } from "@/types/content";

export const leafmd: Study = {
  slug: "leafmd",
  name: "LeafMD",
  status: "coursework",
  areas: "AI Systems",
  lede: "An offline, edge-first plant-disease detection pipeline built around one core problem: models trained on clean PlantVillage lab photos degrade on cluttered PlantDoc field images. It implements domain-shift training techniques and a dedicated evaluator to measure the gap.",
  context:
    "Advanced Computer Vision coursework at RIT (Feb – Apr 2026, on branch fix/pipeline-updates). No mAP, accuracy, per-class, or domain-gap numbers are committed; README speed/accuracy figures come from upstream documentation, and iOS is an export target rather than a demonstrated deployment.",
  glance: {
    role: "Sole author",
    period: "Feb – Apr 2026",
    team: "Solo",
    context: "Advanced Computer Vision coursework, RIT",
    stack: "Python · YOLO11n · YOLO26n · PyTorch (MPS) · FastAPI · INT8 quantization",
    links: [
      {
        label: "Repository (fix/pipeline-updates)",
        url: "https://github.com/anurag2796/leafMD/tree/fix/pipeline-updates",
      },
    ],
    status: "Coursework · no committed mAP or gap metrics",
  },
  image: "leafmd",
  caption: "Figure 0. From PlantVillage lab images to PlantDoc field images, evaluated for domain gap and exported for offline inference.",
  repo: "https://github.com/anurag2796/leafMD/tree/fix/pipeline-updates",
  blocks: [
    {
      kind: "prose",
      title: "Problem",
      paras: [
        "PlantVillage images show single leaves against uniform backgrounds under consistent lighting. Real PlantDoc field photographs contain cluttered backgrounds, overlapping foliage, and variable lighting. A detector scored only on lab data hides how badly it degrades in the field.",
        "LeafMD treats that distribution shift as the primary engineering problem — organizing training, preprocessing, evaluation, and on-device export around closing and measuring the lab-to-field gap for offline agricultural diagnostics with no cloud dependency.",
      ],
    },
    {
      kind: "prose",
      title: "How it works",
      paras: [
        "All training, evaluation, and export run from the installable src/leafmd/ CLI on branch fix/pipeline-updates, with a validation-split check that caught and fixed a split defect and grid search for hyperparameter selection.",
        "The FastAPI backend (src/api.py) and web UI expose CLAHE and test-time augmentation (TTA) as runtime latency-versus-robustness toggles, while the exporter targets INT8 on-device iOS use (unverified on hardware).",
      ],
    },
    {
      kind: "figure",
      src: "images/diagrams/leafmd-pipeline.svg",
      alt: "LeafMD pipeline diagram: PlantVillage lab data and PlantDoc field data (with a validation-split check) flow into domain-shift training (curriculum_train.py, pseudo-labeling, CLAHE, augmentations, and M4 Max MPS-to-CPU fallback), then an A/B comparison of YOLO11n versus NMS-free YOLO26n, cross-domain evaluation via evaluate_gap.py and analyze_confusion_matrix.py with zero committed scores, and serving via FastAPI with runtime CLAHE/TTA toggles plus an unverified INT8 iOS export target.",
      caption: "Figure 1. LeafMD domain-shift pipeline from lab and field data through A/B evaluation and export target.",
      width: 1200,
      height: 540,
    },
    {
      kind: "cols",
      title: "What I built",
      groups: [
        {
          title: "Installable package",
          items: [
            "4,699 lines across 35 Python files packaged under src/leafmd/ with a CLI (cli.py)",
            "Core modules: config, dataset, environment, trainer, and exporter",
            "Model registry and A/B comparison tooling (tools/comparison.py, tools/registry.py)",
          ],
        },
        {
          title: "Domain-shift training and safety",
          items: [
            "Dedicated PlantDoc preprocessing, curriculum_train.py, pseudo-labeling, CLAHE, and custom augmentations",
            "evaluate_gap.py for cross-domain measurement, grid search, confusion-matrix analysis, and a validation-split bug fix",
            "MPS safety layer detecting Apple Silicon GPU numerical-corruption bugs on M4 Max with automatic CPU fallback",
          ],
        },
        {
          title: "Serving and export",
          items: [
            "FastAPI inference backend (src/api.py) and web UI exposing CLAHE and TTA as runtime toggles",
            "INT8 quantization and exporter targeting offline iOS deployment",
            "12-page wiki (14 markdown files) and 5 test files",
          ],
        },
      ],
    },
    {
      kind: "decisions",
      title: "Decisions and trade-offs",
      items: [
        {
          title: "Dedicated cross-domain gap evaluator over lab accuracy",
          why: "Reporting only in-domain PlantVillage accuracy hides field failure; evaluate_gap.py and per-class confusion-matrix analysis isolate where field degradation occurs.",
          tradeoff: "Without committed evaluation outputs on record, the magnitude of improvement from curriculum learning, CLAHE, and pseudo-labeling remains unverified.",
        },
        {
          title: "A/B testing YOLO11n against NMS-free YOLO26n",
          why: "Evaluating a newer NMS-free architecture directly against the incumbent under shared config and registry tracking avoids adopting a new detector on faith.",
          tradeoff: "Maintaining both variants across training, comparison, and export adds pipeline complexity.",
        },
        {
          title: "Defensive MPS corruption detection with CPU fallback",
          why: "Apple Silicon MPS can silently corrupt PyTorch tensor numerics; detecting corruption and falling back to CPU protects training and validation integrity.",
          tradeoff: "Falling back to CPU slows runs on the M4 Max compared with uninterrupted GPU execution.",
        },
        {
          title: "Runtime CLAHE/TTA toggles and INT8 export target",
          why: "Surfacing CLAHE and test-time augmentation in the web UI lets a user trade inference latency for lighting robustness at run time, while INT8 quantization targets offline edge size limits.",
          tradeoff: "The exporter is built, but on-device iOS execution and quantized accuracy retention are not demonstrated on hardware.",
        },
      ],
    },
  ],
  results: [
    {
      scope: "not measured",
      claim:
        "PlantVillage vs. PlantDoc mAP, per-class accuracy, and cross-domain gap: evaluate_gap.py and analyze_confusion_matrix.py are implemented, but no evaluation outputs are committed in the repository.",
    },
    {
      scope: "not measured",
      claim:
        "On-device iOS inference and quantized INT8 speed/accuracy trade-offs: the exporter targets iOS, but no model has been demonstrated running on a phone and no local benchmark output exists.",
    },
  ],
  limits: [
    "No measured accuracy, mAP, per-class metric, or cross-domain gap number is committed (evaluate_gap.py exists without committed output), so the central claim of improved field resilience is not demonstrated on record.",
    "Speed and accuracy figures cited in the repository README come from upstream model documentation, not benchmark measurements from this project.",
    "iOS deployment is an export target only: an exporter and INT8 quantization exist, but no committed evidence shows a model running on an iOS device.",
    "Almost all engineering sits on the unmerged fix/pipeline-updates branch (9 commits, 78 files; main has 1 commit and 39 files), with 5 test files across 35 Python files and no CI.",
  ],
};
