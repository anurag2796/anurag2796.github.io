import { Go } from "@/components/links";
import { usePageTitle } from "@/lib/nav";
import { ROUTES } from "@/site";

export function NotFoundPage() {
  usePageTitle("Page not found");
  return (
    <section aria-labelledby="nf-h" className="wrap not-found enter">
      <p className="kicker">404</p>
      <h1 id="nf-h">That page doesn't exist.</h1>
      <p className="p muted">The link may be from the previous version of this site.</p>
      <div className="cta-row">
        <Go className="btn btn-primary" to={ROUTES.home}>
          Go to the home page
        </Go>
        <Go className="link" to={ROUTES.work}>
          See all work →
        </Go>
      </div>
    </section>
  );
}
