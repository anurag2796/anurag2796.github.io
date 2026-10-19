import { useSearchParams } from "react-router";
import { Go } from "@/components/links";
import { Shot, Status } from "@/components/ui-bits";
import { AREAS, PROJECTS, type Area } from "@/content/projects";
import { usePageTitle } from "@/lib/nav";

const FILTERS: (Area | "All")[] = ["All", ...AREAS];

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
  const flagship = shown.filter((p) => p.tier === "flagship");
  const index = shown.filter((p) => p.tier === "index");
  const archive = shown.filter((p) => p.tier === "archive");
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
            Three flagship stories, then smaller projects and archived experiments. Every entry states its status and
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

        {flagship.length > 0 && (
          <>
            <h2 className="tier-head">FLAGSHIP STORIES</h2>
            <ol className="flag-list">
              {flagship.map((p) => (
                <li className="flag-item reveal" key={p.slug}>
                  <div className="flag-copy">
                    <Status kind={p.status} />
                    <h3>{p.name}</h3>
                    <p className="owner">{p.owner}</p>
                    <p className="desc">{p.desc}</p>
                    {p.why && (
                      <p className="labeled">
                        <span className="label-accent">WHY</span>
                        <span>{p.why}</span>
                      </p>
                    )}
                    <p className="labeled">
                      <span className="label-accent">EVIDENCE</span>
                      <span>{p.evidence}</span>
                    </p>
                    <p className="tech">{p.tech}</p>
                    <div className="cta-row">
                      {p.href && (
                        <Go className="btn btn-primary" to={p.href}>
                          {p.cta}
                        </Go>
                      )}
                      {p.repo && (
                        <a className="link" href={p.repo}>
                          Repository ↗
                        </a>
                      )}
                    </div>
                  </div>
                  {p.image && p.href && (
                    <figure className="flag-figure">
                      <Shot image={p.image} to={p.href} decorative />
                    </figure>
                  )}
                </li>
              ))}
            </ol>
          </>
        )}

        {index.length > 0 && (
          <>
            <h2 className="tier-head">PROJECT INDEX</h2>
            <ol className="proj-list">
              {index.map((p) => (
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
                    <span className="owner">{p.owner}</span>
                  </div>
                  <div className="proj-body">
                    <p className="desc">{p.desc}</p>
                    <p className="evidence">{p.evidence}</p>
                    <div className="proj-foot">
                      <span className="tech">{p.tech}</span>
                      {p.href && (
                        <Go className="link" to={p.href}>
                          {p.cta}
                        </Go>
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
          </>
        )}

        {archive.length > 0 && (
          <>
            <h2 className="tier-head">ARCHIVE</h2>
            <ul className="archive">
              {archive.map((p) => (
                <li key={p.slug}>
                  <span className="name">{p.name}</span>
                  <span className="desc">
                    {p.desc} <span className="mono" style={{ fontSize: 12.5 }}>· □ Archived experiment</span>
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
