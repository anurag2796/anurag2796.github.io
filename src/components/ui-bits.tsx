import type { ReactNode } from "react";
import { Go } from "@/components/links";
import { IMAGES, type ImageKey } from "@/site";

export type StatusKind =
  | "production"
  | "active"
  | "demo"
  | "prototype"
  | "simulator"
  | "coursework"
  | "oss"
  | "archived";

/** Status labels always pair a shape glyph with text so color is never the only signal. */
export const STATUS_LABEL: Record<StatusKind, string> = {
  production: "■ Production experience",
  active: "● Active research",
  demo: "◆ Deployed demo",
  prototype: "▲ Research prototype",
  simulator: "◇ Simulator",
  coursework: "○ Coursework",
  oss: "◐ Open-source contribution",
  archived: "□ Archived experiment",
};

export function Status({ kind, plain = false, label }: { kind: StatusKind; plain?: boolean; label?: string }) {
  return (
    <span className={`status status--${kind}${plain ? " status-plain" : ""}`}>{label ?? STATUS_LABEL[kind]}</span>
  );
}

type ShotProps = {
  image: ImageKey;
  /** Internal route to link to. Decorative links are hidden from assistive tech. */
  to?: string;
  decorative?: boolean;
  eager?: boolean;
  small?: boolean;
  label?: string;
};

/** A framed project image. */
export function Shot({ image, to, decorative = false, eager = false, small = false, label }: ShotProps) {
  const img = IMAGES[image];
  const el = (
    <img
      src={img.src}
      alt={decorative ? "" : img.alt}
      width={img.width}
      height={img.height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
  const cls = `shot${small ? " shot--sm" : ""}`;
  if (!to) return <div className={cls}>{el}</div>;
  if (decorative)
    return (
      <Go to={to} className={cls} tabIndex={-1} aria-hidden="true">
        {el}
      </Go>
    );
  return (
    <Go to={to} className={cls} aria-label={label}>
      {el}
    </Go>
  );
}

/** Numbered case-study section heading. */
export function SecHead({ id, n, children }: { id: string; n: string; children: ReactNode }) {
  return (
    <h2 id={id} className="sec-h">
      <span className="sec-n">{n}</span>
      {children}
    </h2>
  );
}

type PagerLink = { to: string; label: string; title: string };

export function Pager({ prev, next }: { prev: PagerLink; next?: PagerLink }) {
  return (
    <nav aria-label="Case studies" className="pager">
      <Go to={prev.to}>
        <span className="label">{prev.label}</span>
        <span className="pager-title">← {prev.title}</span>
      </Go>
      {next && (
        <Go to={next.to} className="next">
          <span className="label">{next.label}</span>
          <span className="pager-title">{next.title} →</span>
        </Go>
      )}
    </nav>
  );
}

/** Simplified FedLearn architecture for narrow screens, where the wide diagram would be unreadable. */
export function FedLearnMiniArch({ className = "" }: { className?: string }) {
  return (
    <figure
      className={`mini-arch ${className}`}
      aria-label="FedLearn, simplified: web, desktop, Docker and mobile clients connect over REST and WebSocket to the Spring Boot control plane, which drives the PyTorch runtime over gRPC."
    >
      <span className="label">ARCHITECTURE · SIMPLIFIED</span>
      <div className="mini-arch-clients">
        <span>Web</span>
        <span>Desktop</span>
        <span>Docker</span>
        <span>Mobile</span>
      </div>
      <span className="mini-arch-wire">REST · WebSocket/STOMP</span>
      <span className="mini-arch-node">Spring Boot control plane</span>
      <span className="mini-arch-wire">gRPC · safetensors</span>
      <span className="mini-arch-node">PyTorch runtime · aggregation</span>
    </figure>
  );
}
