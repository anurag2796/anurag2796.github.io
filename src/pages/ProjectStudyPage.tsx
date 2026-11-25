import { useParams } from "react-router";
import { Figure } from "@/components/Figure";
import { Go } from "@/components/links";
import { ProjectGlance } from "@/components/ProjectGlance";
import { Pager, SecHead, Shot, Status } from "@/components/ui-bits";
import { STUDIES, findStudy } from "@/content/studies";
import { usePageTitle } from "@/lib/nav";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ROUTES } from "@/site";
import type { Block, ResultScope } from "@/types/content";

function scopeClass(scope: ResultScope): string {
  switch (scope) {
    case "measured":
      return "status status--active";
    case "reported":
      return "status status--demo";
    case "not measured":
      return "status status--prototype";
  }
}

function BlockView({ block, n }: { block: Block; n: number }) {
  const num = String(n).padStart(2, "0");
  const id = `p${n}`;

  switch (block.kind) {
    case "prose":
      return (
        <section aria-labelledby={id} className="wrap sec reveal">
          <div className="read stack">
            <SecHead id={id} n={num}>
              {block.title}
            </SecHead>
            {block.paras.map((p) => (
              <p className="p" key={p}>
                {p}
              </p>
            ))}
          </div>
        </section>
      );

    case "steps":
      return (
        <section aria-labelledby={id} className="wrap sec reveal">
          <div className="read stack-sm">
            <SecHead id={id} n={num}>
              {block.title}
            </SecHead>
            {block.intro && <p className="p">{block.intro}</p>}
          </div>
          <ol className="steps mt-24">
            {block.steps.map(([k, v]) => (
              <li key={k}>
                <span className="label-accent">{k}</span>
                <span>{v}</span>
              </li>
            ))}
          </ol>
        </section>
      );

    case "table":
      return (
        <section aria-labelledby={id} className="wrap sec reveal">
          <div className="read stack-sm">
            <SecHead id={id} n={num}>
              {block.title}
            </SecHead>
            {block.intro && <p className="p">{block.intro}</p>}
          </div>
          <div className="table-scroll ruled stack-mobile">
            <table className="table">
              <caption>{block.caption}</caption>
              <thead>
                <tr>
                  {block.columns.map((c) => (
                    <th scope="col" key={c}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map(([head, ...cells]) => (
                  <tr key={head}>
                    <th scope="row">{head}</th>
                    {cells.map((c, i) => (
                      <td key={i} data-label={block.columns[i + 1]} className={i === 0 && cells.length > 1 ? "dim" : undefined}>
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      );

    case "cols":
      return (
        <section aria-labelledby={id} className="wrap sec reveal">
          <SecHead id={id} n={num}>
            {block.title}
          </SecHead>
          {block.intro && (
            <p className="p read" style={{ marginTop: 16 }}>
              {block.intro}
            </p>
          )}
          <div className="cols">
            {block.groups.map((g) => (
              <div key={g.title}>
                <h3>{g.title}</h3>
                <ul>
                  {g.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      );

    case "defs":
      return (
        <section aria-labelledby={id} className="wrap sec reveal">
          <div className="split split-wide">
            <div className="stack-sm">
              <SecHead id={id} n={num}>
                {block.title}
              </SecHead>
              {block.intro && <p className="p">{block.intro}</p>}
            </div>
            <ul className="defs">
              {block.items.map(([k, v]) => (
                <li key={k}>
                  <span>{k}</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      );

    case "decisions":
      return (
        <section aria-labelledby={id} className="wrap sec reveal">
          <SecHead id={id} n={num}>
            {block.title}
          </SecHead>
          <div className="decisions">
            {block.items.map((d) => (
              <article className="decision" key={d.title}>
                <h3>{d.title}</h3>
                <p>
                  <span className="why-l">WHY</span>
                  {d.why}
                </p>
                <p className="tradeoff">
                  <span className="to-l">TRADE-OFF</span>
                  {d.tradeoff}
                </p>
              </article>
            ))}
          </div>
        </section>
      );

    case "limits":
      return (
        <section className="wrap sec reveal">
          <div className="split">
            <div className="stack-sm" aria-labelledby={id}>
              <SecHead id={id} n={num}>
                Known limitations
              </SecHead>
              <ul className="marked warn">
                {block.limits.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
            {block.next && (
              <div className="stack-sm" aria-labelledby={`${id}-next`}>
                <SecHead id={`${id}-next`} n={String(n + 1).padStart(2, "0")}>
                  Next steps
                </SecHead>
                <ul className="marked next">
                  {block.next.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      );

    case "figure":
      return (
        <section aria-labelledby={block.title ? id : undefined} className="wrap sec reveal">
          {block.title && (
            <div className="read stack-sm">
              <SecHead id={id} n={num}>
                {block.title}
              </SecHead>
            </div>
          )}
          <Figure
            src={block.src}
            alt={block.alt}
            caption={block.caption}
            width={block.width}
            height={block.height}
            className={block.title ? "mt-24" : undefined}
          />
        </section>
      );
  }
}

export function ProjectStudyPage() {
  const { slug } = useParams();
  const study = findStudy(slug);
  usePageTitle(study?.name ?? "Page not found");
  if (!study) return <NotFoundPage />;

  const index = STUDIES.indexOf(study);
  const prev = STUDIES[index - 1];
  const next = STUDIES[index + 1];

  // Section numbers: limits with next steps takes two numbers; untitled figures do not take a number.
  let counter = 0;
  const numbered = study.blocks.map((b) => {
    if (b.kind === "figure" && !b.title) {
      return { b, n: 0 };
    }
    counter += 1;
    const n = counter;
    if (b.kind === "limits" && b.next) counter += 1;
    return { b, n };
  });
  const resultsN = study.results?.length ? String(++counter).padStart(2, "0") : undefined;
  const limitsN = study.limits?.length ? String(++counter).padStart(2, "0") : undefined;
  const linksN = String(counter + 1).padStart(2, "0");

  const linkItems =
    study.glance.links.length > 0
      ? study.glance.links
      : study.repo
        ? [{ label: "Repository", url: study.repo }]
        : [];

  return (
    <>
      <section aria-labelledby="t-h" className="wrap cs-intro">
        <Go to={ROUTES.work} className="back-link">
          ← All work
        </Go>
        <div className="read enter">
          <p className="meta-line">
            <span className="accent">PROJECT</span>
            <Status kind={study.status} label={study.statusLabel} />
            <span>{study.areas}</span>
          </p>
          <h1 id="t-h">{study.name}</h1>
          <p className="cs-lede">{study.lede}</p>
          {study.context && <p className="p muted">{study.context}</p>}
        </div>
        <ProjectGlance glance={study.glance} />
        {study.image && (
          <figure className="stack-sm" style={{ marginTop: 48 }}>
            <Shot image={study.image} eager />
            {study.caption && <figcaption style={{ fontSize: 14 }}>{study.caption}</figcaption>}
          </figure>
        )}
      </section>

      {numbered.map(({ b, n }, i) => (
        <BlockView key={`${b.kind}-${i}`} block={b} n={n} />
      ))}

      {study.results && study.results.length > 0 && resultsN && (
        <section aria-labelledby="results-h" className="wrap sec reveal">
          <SecHead id="results-h" n={resultsN}>
            Results
          </SecHead>
          <ul className="defs mt-24">
            {study.results.map((r) => (
              <li key={r.claim}>
                <span>
                  <span className={scopeClass(r.scope)}>{r.scope}</span>
                </span>
                <span>{r.claim}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {study.limits && study.limits.length > 0 && limitsN && (
        <section aria-labelledby="limits-h" className="wrap sec reveal">
          <div className="read stack-sm">
            <SecHead id="limits-h" n={limitsN}>
              Limits
            </SecHead>
            <ul className="marked warn">
              {study.limits.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby={linkItems.length > 0 ? "links-h" : undefined} className="wrap sec sec-last">
        {linkItems.length > 0 && (
          <>
            <SecHead id="links-h" n={linksN}>
              Links
            </SecHead>
            <div className="link-buttons">
              {linkItems.map((item) => (
                <a className="btn btn-secondary" key={item.url} href={item.url}>
                  {item.label} ↗
                </a>
              ))}
            </div>
          </>
        )}
        <Pager
          prev={
            prev
              ? { to: `${ROUTES.work}/${prev.slug}`, label: "PREVIOUS PROJECT", title: prev.name }
              : { to: ROUTES.work, label: "BACK", title: "All work" }
          }
          next={
            next
              ? { to: `${ROUTES.work}/${next.slug}`, label: "NEXT PROJECT", title: next.name }
              : { to: ROUTES.work, label: "BACK", title: "All work" }
          }
        />
      </section>
    </>
  );
}
