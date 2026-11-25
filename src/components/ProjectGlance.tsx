import type { Glance } from "@/types/content";

/** Compact definition list summarizing role, period, team, context, stack, status, and links. */
export function ProjectGlance({ glance, className }: { glance: Glance; className?: string }) {
  return (
    <dl className={className ? `cs-meta ${className}` : "cs-meta"}>
      <div>
        <dt className="label">ROLE</dt>
        <dd>{glance.role}</dd>
      </div>
      <div>
        <dt className="label">PERIOD</dt>
        <dd>{glance.period}</dd>
      </div>
      <div>
        <dt className="label">TEAM</dt>
        <dd>{glance.team}</dd>
      </div>
      <div>
        <dt className="label">CONTEXT</dt>
        <dd>{glance.context}</dd>
      </div>
      <div>
        <dt className="label">STATUS</dt>
        <dd>{glance.status}</dd>
      </div>
      <div>
        <dt className="label">STACK</dt>
        <dd className="tech" style={{ fontSize: 13 }}>
          {glance.stack}
        </dd>
      </div>
      {glance.links.length > 0 && (
        <div>
          <dt className="label">LINKS</dt>
          <dd>
            {glance.links.map((link, idx) => (
              <span key={link.url}>
                {idx > 0 && <br />}
                <a href={link.url}>{link.label} ↗</a>
              </span>
            ))}
          </dd>
        </div>
      )}
    </dl>
  );
}
