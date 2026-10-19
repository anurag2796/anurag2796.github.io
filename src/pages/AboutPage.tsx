import { ContactBand } from "@/components/ContactBand";
import { Go } from "@/components/links";
import { usePageTitle } from "@/lib/nav";
import { EMAIL, GITHUB, LINKEDIN, MAILTO, RESUME, ROUTES } from "@/site";

const INTERESTS = [
  "Federated optimization, checked against reference frameworks",
  "Privacy, robust aggregation and threat modeling",
  "On-device and heterogeneous training",
  "Retrieval systems that run locally on constrained hardware",
];

export function AboutPage() {
  usePageTitle("About");

  return (
    <>
      <section className="wrap about">
        <article aria-labelledby="a-h" className="about-main">
          <div className="enter stack-sm">
            <p className="kicker">ABOUT</p>
            <h1 id="a-h">Hi, I'm Anurag.</h1>
            <p className="lede">
              I'm a software engineer who spent five years on backend systems for financial services and now builds AI
              systems at RIT.
            </p>
          </div>

          <h2>Background</h2>
          <p className="p">
            At TCS I built consumer-lending APIs that carried more than a million transactions a day and took my turn
            on call. At EY I owned services in a real-time fraud-screening pipeline and built portfolio services for an
            asset-management client. That work taught me to care about latency budgets, data correctness, and being
            responsible for what I ship.
          </p>

          <h2>Moving into AI systems</h2>
          <p className="p">
            I started an M.S. in Computer Science at RIT to work on machine learning directly. The production habits
            came with me. FedLearn, the federated-learning platform I lead, has a Java control plane, a PyTorch training
            runtime, four kinds of client, and an evaluation record that keeps its negative results.
          </p>

          <section aria-labelledby="dbg-h" className="story">
            <p className="kicker">A BUG I LIKE TO TELL</p>
            <h2 id="dbg-h">A phone that couldn't train a CNN</h2>
            <p className="p">
              On-device training in FedLearn kept producing NaN losses on an Android handset. The application code was
              fine. So was the model. Three layers down, ExecuTorch's max-pool backward kernel was adding gradients into
              recycled memory without clearing it first. A zero-initialization fixed it: 291 NaN steps out of 300
              became none, and five unaffected control models stayed byte-identical.
            </p>
            <p className="p">
              I like problems like this: the symptom is in one place, the cause is somewhere nobody looks, and the fix
              is only trustworthy once the controls agree.
            </p>
            <Go className="link-strong" to={ROUTES.fedlearn}>
              Read the full debugging story →
            </Go>
          </section>

          <h2>Research interests</h2>
          <ul className="interests">
            {INTERESTS.map((t, i) => (
              <li key={t}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </article>

        <aside aria-label="Facts" className="about-aside enter-late">
          <dl>
            <div>
              <dt className="label">TARGET ROLES</dt>
              <dd>
                AI Systems Engineer
                <br />
                Backend Engineer
                <br />
                Full-stack AI Engineer
                <br />
                Applied AI Engineer
                <br />
                Forward-Deployed Engineer
              </dd>
            </div>
            <div>
              <dt className="label">AVAILABILITY</dt>
              <dd>
                <span className="dot-available" aria-hidden="true" />
                Full-time from January 2027
              </dd>
            </div>
            <div>
              <dt className="label">LOCATION</dt>
              <dd>Rochester, NY · open to relocation</dd>
            </div>
            <div>
              <dt className="label">EDUCATION</dt>
              <dd>
                M.S. Computer Science, RIT
                <br />
                <span className="dim">Expected December 2026</span>
                <br />
                B.Tech Computer Science and Engineering, Sikkim Manipal Institute of Technology
                <br />
                <span className="dim">2019</span>
              </dd>
            </div>
            <div>
              <dt className="label">CERTIFICATIONS</dt>
              <dd>
                AWS Certified Cloud Practitioner
                <br />
                Oracle Certified Associate, Java SE 8 Programmer
              </dd>
            </div>
          </dl>
        </aside>
      </section>

      <ContactBand body="Email is the fastest way to reach me. Rochester, NY · open to relocation · available from January 2027.">
        <dl className="contact-dl">
          <div>
            <dt>Email</dt>
            <dd>
              <a href={MAILTO}>{EMAIL}</a>
            </dd>
          </div>
          <div>
            <dt>LinkedIn</dt>
            <dd>
              <a href={LINKEDIN}>linkedin.com/in/anurag2796</a>
            </dd>
          </div>
          <div>
            <dt>GitHub</dt>
            <dd>
              <a href={GITHUB}>github.com/anurag2796</a>
            </dd>
          </div>
          <div>
            <dt>Résumé</dt>
            <dd>
              <a href={RESUME}>Download PDF</a>
            </dd>
          </div>
        </dl>
      </ContactBand>
    </>
  );
}
