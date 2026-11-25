import type { StatusKind } from "@/components/ui-bits";
import type { ImageKey } from "@/site";

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

export type GlanceLink = {
  label: string;
  url: string;
};

export type Glance = {
  role: string;
  period: string;
  team: string;
  context: string;
  stack: string;
  links: GlanceLink[];
  status: string;
};

export type ResultScope = "measured" | "reported" | "not measured";

export type ResultItem = {
  claim: string;
  scope: ResultScope;
};

type Item = string;

export type Block =
  | { kind: "prose"; title: string; paras: string[] }
  | { kind: "steps"; title: string; intro?: string; steps: [string, string][] }
  | { kind: "table"; title: string; intro?: string; caption: string; columns: string[]; rows: string[][] }
  | { kind: "cols"; title: string; intro?: string; groups: { title: string; items: Item[] }[] }
  | { kind: "defs"; title: string; intro?: string; items: [string, string][] }
  | { kind: "decisions"; title: string; items: { title: string; why: string; tradeoff: string }[] }
  | { kind: "limits"; limits: Item[]; next?: Item[] }
  | { kind: "figure"; title?: string; src: string; alt: string; caption: string; width?: number; height?: number };

export type Study = {
  slug: string;
  name: string;
  status: StatusKind;
  statusLabel?: string;
  areas: string;
  lede: string;
  context?: string;
  glance: Glance;
  meta?: { label: string; value: string; mono?: boolean }[];
  image?: ImageKey;
  caption?: string;
  repo?: string;
  blocks: Block[];
  results?: ResultItem[];
  limits?: string[];
};
