import type { Study } from "@/types/content";
import { crimecastnyc } from "./crimecastnyc";
import { faminesight } from "./faminesight";
import { hybridMlScheduler } from "./hybrid-ml-scheduler";
import { imageSimilarity } from "./image-similarity";
import { leafmd } from "./leafmd";
import { nexus } from "./nexus";
import { smartBettingSystem } from "./smart-betting-system";
import { tasksip } from "./tasksip";

export type { Block, Glance, GlanceLink, ResultItem, ResultScope, Study } from "@/types/content";

export const STUDIES: Study[] = [
  hybridMlScheduler,
  faminesight,
  leafmd,
  smartBettingSystem,
  crimecastnyc,
  nexus,
  tasksip,
  imageSimilarity,
];

export function findStudy(slug: string | undefined): Study | undefined {
  return STUDIES.find((s) => s.slug === slug);
}
