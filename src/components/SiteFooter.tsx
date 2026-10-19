import { GITHUB, LINKEDIN, MAILTO, RESUME } from "@/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <span>Anurag Lnu · Rochester, NY · © {new Date().getFullYear()}</span>
        <span className="footer-links">
          <a href={MAILTO}>Email</a>
          <a href={LINKEDIN}>LinkedIn</a>
          <a href={GITHUB}>GitHub</a>
          <a href={RESUME}>Résumé</a>
        </span>
      </div>
    </footer>
  );
}
