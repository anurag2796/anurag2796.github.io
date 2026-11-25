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
              I'm a software engineer who spent five years on backend systems for financial services and now builds ML
              systems at RIT.
            </p>
          </div>

          <h2>Background</h2>
          <p className="p">
            At TCS I worked across USAA's six-service consumer-lending pipeline (personal and auto loans) and took my
            turn on call. At EY I owned three production services in Morgan Stanley's real-time fraud-screening pipeline
            and validated a re-architected portfolio platform (Java on Spark) for BlackRock. That work taught me to care
            about latency budgets, data correctness, and being responsible for what I ship.
          </p>

          <h2>Moving into ML systems</h2>
          <p className="p">
            My AI and ML work began at RIT when I started an M.S. in Computer Science in August 2024. The production
            habits came with me. On FedLearn, the federated-learning platform I lead development on in RIT's Learning
            Optimization Group (as primary implementation contributor, building on early contributions from Chinmay
            Lokare), a Java control plane and a PyTorch gRPC runtime pair with desktop, Docker, and Android clients,
            with negative results kept in the evaluation record.
          </p>

          <section aria-labelledby="dbg-h" className="story">
            <p className="kicker">A BUG I LIKE TO TELL</p>
            <h2 id="dbg-h">A phone that couldn't train a CNN</h2>
            <p className="p">
              On-device CNN training in FedLearn was blocked on an Android handset (reported). Three layers down,
              ExecuTorch's max_pool2d backward kernel was accumulating gradients into grad_input without zero-initializing
              it first. Diagnosing and fixing that initialization unblocked on-device CNN training on the handset, and
              subsequent Android qualification confirmed live receipts for 21 of 24 declared FULL-arm plans.
            </p>
            <p className="p">
              I like problems like this: the symptom shows up in the training run, the cause sits in a lower-level
              runtime, and you verify the fix on physical hardware.
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
              <dd>Sunnyvale, CA · open to relocation</dd>
            </div>
            <div>
              <dt className="label">EDUCATION</dt>
              <dd>
                M.S. Computer Science, RIT
                <br />
                <span className="dim">Aug 2024 – Dec 2026 (expected)</span>
                <br />
                B.Tech Computer Science and Engineering, Sikkim Manipal Institute of Technology
                <br />
                <span className="dim">Jun 2015 – Jul 2019</span>
              </dd>
            </div>
            <div>
              <dt className="label">CERTIFICATIONS</dt>
              <dd>
                AWS Certified Cloud Practitioner
                <br />
                Oracle Certified Associate, Java Programmer
              </dd>
            </div>
          </dl>
        </aside>
      </section>

      <ContactBand body="Email is the fastest way to reach me. Sunnyvale, CA · open to relocation · available from January 2027.">
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
