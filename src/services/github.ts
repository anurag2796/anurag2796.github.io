export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  size: number;
  open_issues_count: number;
  default_branch: string;
}

const USERNAME = "anurag2796";
const BASE = "https://api.github.com";

export async function fetchRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `${BASE}/users/${USERNAME}/repos?sort=updated&per_page=30&type=public`
    );
    if (!res.ok) throw new Error("Failed");
    const data: GitHubRepo[] = await res.json();
    return data.filter((r) => !r.fork);
  } catch {
    return [];
  }
}

export async function fetchRepo(repoName: string): Promise<GitHubRepo | null> {
  try {
    const res = await fetch(`${BASE}/repos/${USERNAME}/${repoName}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchReadme(repoName: string): Promise<string | null> {
  try {
    const res = await fetch(`${BASE}/repos/${USERNAME}/${repoName}/readme`);
    if (!res.ok) return null;
    const data = await res.json();
    // base64 decode, handle line breaks in the encoded string
    const cleaned = data.content.replace(/\s/g, "");
    return decodeURIComponent(
      atob(cleaned)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch {
    return null;
  }
}

export function getLanguageColor(language: string | null): string {
  const map: Record<string, string> = {
    JavaScript: "#F7DF1E",
    TypeScript: "#3178C6",
    Python: "#3776AB",
    HTML: "#E34F26",
    CSS: "#1572B6",
    Java: "#ED8B00",
    "C++": "#00599C",
    C: "#A8B9CC",
    Go: "#00ADD8",
    Rust: "#CE422B",
    Ruby: "#CC342D",
    PHP: "#777BB4",
    Swift: "#FA7343",
    Kotlin: "#7F52FF",
    Shell: "#89E051",
    Jupyter: "#DA5B0B",
    Dockerfile: "#384D54",
    Vue: "#42B883",
    Svelte: "#FF3E00",
  };
  return language ? map[language] ?? "#00C8FF" : "#00C8FF";
}

export const USERNAME_LABEL = USERNAME;

export interface GitHubLanguages {
  [key: string]: number;
}

export async function fetchLanguages(repoName: string): Promise<GitHubLanguages> {
  try {
    const res = await fetch(`${BASE}/repos/${USERNAME}/${repoName}/languages`);
    if (!res.ok) return {};
    return res.json();
  } catch {
    return {};
  }
}

// ─── README → short description fallback ─────────────────────────────────────
export function extractDescriptionFromReadme(markdown: string): string {
  const lines = markdown.split("\n");
  const textLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (textLines.length > 0) break; // end of first paragraph
      continue;
    }
    // Skip headings, badge lines, images, HTML, tables, code fences
    if (
      trimmed.startsWith("#") ||
      trimmed.startsWith("!") ||
      trimmed.startsWith("<") ||
      trimmed.startsWith("|") ||
      trimmed.startsWith("```") ||
      trimmed.startsWith("[!") ||
      trimmed.startsWith("[![") ||
      /^\[.*\]\(https?:\/\//.test(trimmed)
    ) {
      continue;
    }
    // Strip common markdown formatting
    const cleaned = trimmed
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[_~>#]/g, "")
      .trim();

    if (cleaned.length > 15) {
      textLines.push(cleaned);
    }
    if (textLines.join(" ").length >= 100) break;
  }

  return textLines.join(" ").slice(0, 120).trim();
}

export async function fetchRepoDescription(repoName: string): Promise<string> {
  const readme = await fetchReadme(repoName);
  if (!readme) return "";
  return extractDescriptionFromReadme(readme);
}