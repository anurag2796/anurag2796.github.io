export type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  className?: string;
};

/** Responsive figure frame for SVG diagrams and charts. */
export function Figure({ src, alt, caption, width, height, className }: FigureProps) {
  return (
    <figure className={className ? `diagram-figure ${className}` : "diagram-figure"}>
      <div className="diagram-frame">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
