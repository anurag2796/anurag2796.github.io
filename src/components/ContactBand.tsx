import type { ReactNode } from "react";
import { EMAIL, GITHUB, LINKEDIN, MAILTO, RESUME } from "@/site";

export const CONTACT_HEADLINE = "Hiring an engineer who can carry AI systems from architecture to deployment?";

/** Dark contact band. `children` replaces the default action column. */
export function ContactBand({ body, children }: { body: string; children?: ReactNode }) {
  return (
    <section id="contact" aria-labelledby="contact-h" className="contact-band">
      <div className="wrap">
        <div className="contact-copy">
          <h2 id="contact-h">{CONTACT_HEADLINE}</h2>
          <p>{body}</p>
        </div>
        {children ?? (
          <div className="contact-actions">
            <a className="btn btn-light" href={MAILTO}>
              {EMAIL}
            </a>
            <div className="contact-links">
              <a href={LINKEDIN}>LinkedIn</a>
              <a href={GITHUB}>GitHub</a>
              <a href={RESUME}>Résumé (PDF)</a>
            </div>
            <p className="contact-note">Rochester, NY · open to relocation · available January 2027</p>
          </div>
        )}
      </div>
    </section>
  );
}
