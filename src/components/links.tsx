import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { Link, useLocation, type LinkProps } from "react-router";
import { jumpTo } from "@/lib/nav";

/** Internal link with a cross-fade view transition where the browser supports it. */
export function Go(props: LinkProps) {
  return <Link viewTransition {...props} />;
}

type JumpProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
  children: ReactNode;
};

/** In-page link to an element id. Keeps the router's hash intact. */
export function JumpLink({ to, children, onClick, ...rest }: JumpProps) {
  const { pathname } = useLocation();
  return (
    <a
      href={`#${pathname}`}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        e.preventDefault();
        jumpTo(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

type ExtProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: ReactNode };

/** External link. Opens in the same tab; the ↗ in the label signals it leaves the site. */
export function Ext({ children, ...rest }: ExtProps) {
  return (
    <a rel="noopener" {...rest}>
      {children}
    </a>
  );
}
