import { useSearchParams } from "react-router";
import { Go } from "@/components/links";
import { Shot, STATUS_LABEL, Status } from "@/components/ui-bits";
import { AREAS, PROJECTS, type Area, type Project } from "@/content/projects";
import { usePageTitle } from "@/lib/nav";

const FILTERS: (Area | "All")[] = ["All", ...AREAS];

const WORK_GROUPS: { title: string; slugs: string[] }[] = [
  { title: "Industry", slugs: ["financial-services"] },
  { title: "Research", slugs: ["fedlearn", "executorch"] },
  { title: "AI products and platforms", slugs: ["nexus", "tigerresearchbuddy", "tasksip"] },
  {
    title: "Applied ML",
    slugs: ["leafmd", "faminesight", "hybrid-ml-scheduler", "image-similarity", "smart-betting-system"],
  },
  { title: "Data", slugs: ["crimecastnyc"] },
];

const GROUPED_SLUGS = new Set(WORK_GROUPS.flatMap((g) => g.slugs));

function isArea(v: string | null): v is Area {
  return !!v && (AREAS as readonly string[]).includes(v);
}

export function WorkPage() {
  usePageTitle("Work");
  const [params, setParams] = useSearchParams();
  const raw = params.get("area");
  const current: Area | "All" = isArea(raw) ? raw : "All";

  const pick = (f: Area | "All") => {
    const next = new URLSearchParams(params);
    if (f === "All") next.delete("area");
    else next.set("area", f);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  const shown = PROJECTS.filter((p) => current === "All" || p.areas.includes(current));
  const bySlug = new Map(shown.map((p) => [p.slug, p]));
  const grouped = WORK_GROUPS.map((g) => ({
    title: g.title,
    items: g.slugs.map((s) => bySlug.get(s)).filter((p): p is Project => !!p),
  })).filter((g) => g.items.length > 0);
  const archive = shown.filter((p) => !GROUPED_SLUGS.has(p.slug));
  const count = `${current === "All" ? "All areas" : current} · ${shown.length} ${shown.length === 1 ? "entry" : "entries"}`;

  return (
    <>
      <section aria-labelledby="w-h" className="wrap page-intro">
        <div className="enter">
          <p className="kicker">WORK</p>
          <h1 id="w-h">What was built, what was measured, what is still open.</h1>
        </div>
        <div className="intro-aside enter-late">
          <p>
            Work grouped across industry, research, AI products, applied ML, and data. Every entry states its status and
            my ownership.
          </p>
        </div>
      </section>

      <section aria-label="Projects" className="wrap work-end">
        <div className="filter-bar">
          <div className="chips" role="group" aria-label="Filter projects by area">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className="chip"
                aria-pressed={f === current}
                onClick={() => pick(f)}
              >
                {f === "All" ? "All work" : f}
              </button>
            ))}
          </div>
          <p className="count" role="status">
            {count}
          </p>
        </div>

        {grouped.map((g) => (
          <div key={g.title}>
            <h2 className="tier-head">{g.title}</h2>
            <ol className="proj-list">
              {g.items.map((p) => (
                <li className="proj reveal" key={p.slug}>
                  <div className="proj-name">
                    <h3>
                      {p.href ? (
                        <Go to={p.href} className="proj-link">
                          {p.name}
                        </Go>
                      ) : (
                        p.name
                      )}
                    </h3>
                    <Status kind={p.status} />
                    {p.owner && <span className="owner">{p.owner}</span>}
                  </div>
                  <div className="proj-body">
                    <p className="desc">{p.desc}</p>
                    {p.why && (
                      <p className="evidence">
                        <span className="label-accent">WHY</span> {p.why}
                      </p>
                    )}
                    {p.evidence && <p className="evidence">{p.evidence}</p>}
                    <div className="proj-foot">
                      {p.tech && <span className="tech">{p.tech}</span>}
                      {p.href && (
                        <Go className="link" to={p.href}>
                          {p.cta ?? "Read the project page →"}
                        </Go>
                      )}
                      {p.repo && (
                        <a className="link" href={p.repo}>
                          Repository ↗
                        </a>
                      )}
                    </div>
                  </div>
                  {p.image && (
                    <figure className="proj-thumb">
                      <Shot image={p.image} small to={p.href} decorative={!!p.href} />
                    </figure>
                  )}
                </li>
              ))}
            </ol>
          </div>
        ))}

        {archive.length > 0 && (
          <>
            <h2 className="tier-head">Archive</h2>
            <ul className="archive">
              {archive.map((p) => (
                <li key={p.slug}>
                  <span className="name">
                    {p.href ? (
                      <Go to={p.href} className="proj-link">
                        {p.name}
                      </Go>
                    ) : (
                      p.name
                    )}
                  </span>
                  <span className="desc">
                    {p.desc} <span className="mono" style={{ fontSize: 12.5 }}>· {STATUS_LABEL[p.status]}</span>
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}

        {shown.length === 0 && (
          <p className="empty">
            No projects in this area yet.
            <button type="button" className="chip" onClick={() => pick("All")}>
              Show all work
            </button>
          </p>
        )}
      </section>
    </>
  );
}
