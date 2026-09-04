import Link from "next/link";
import { homeStats, site, whatWeDo } from "@/lib/site-data";

const networkNodes = ["DU", "KU", "BUET", "Medical", "NSU", "Global"];

export default function HomePage() {
  return (
    <>
      <section className="hero section-dark">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">University Students&apos; Association of Shyamnagar</span>
            <h1>Connecting Shyamnagar&apos;s <em>brightest minds.</em></h1>
            <p>{site.description}</p>
            <div className="button-row">
              <Link className="button button-accent" href="/get-involved/member">Join USAS <span>↗</span></Link>
              <Link className="button button-ghost" href="/community">Explore the community</Link>
            </div>
            <Link className="text-link" href="/events">See upcoming events <span>→</span></Link>
          </div>

          <div className="network-visual" aria-label="USAS community network illustration">
            <div className="network-orbit orbit-one" />
            <div className="network-orbit orbit-two" />
            <div className="network-core">
              <span>USAS</span>
              <small>Shyamnagar</small>
            </div>
            {networkNodes.map((node, index) => (
              <span className={`network-node node-${index + 1}`} key={node}>{node}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="shell stats-grid">
          {homeStats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-intro">
        <div className="shell split-heading">
          <div>
            <span className="eyebrow eyebrow-dark">Why USAS</span>
            <h2>Different campuses.<br />Shared roots.<br /><em>One community.</em></h2>
          </div>
          <div className="lead-copy">
            <p>Students from Shyamnagar are spread across universities, cities, professions and countries. The opportunity is not just to reconnect them. It is to make that network useful.</p>
            <p>USAS creates the common ground for people to discover one another, exchange knowledge, open doors and contribute back to the community.</p>
            <Link className="text-link dark-link" href="/about">Our story <span>→</span></Link>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow eyebrow-dark">What we do</span>
            <h2>A network designed to create <em>practical value.</em></h2>
          </div>
          <div className="card-grid six-grid">
            {whatWeDo.map(([title, text], index) => (
              <article className="feature-card" key={title}>
                <span className="card-index">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section network-section">
        <div className="shell two-column">
          <div>
            <span className="eyebrow eyebrow-dark">Community network</span>
            <h2>Find people by <em>where they are, what they know and where they&apos;re going.</em></h2>
            <p className="body-large">The long-term directory can connect students and alumni by university, profession, industry, location and graduation year, with privacy controls built in.</p>
            <Link className="button button-dark" href="/community/directory">Explore directory</Link>
          </div>
          <div className="directory-demo">
            <div className="directory-search">Find a USAS member <span>⌘ K</span></div>
            <div className="filter-row">
              <span>University</span><span>Profession</span><span>Location</span>
            </div>
            {["Software Engineering · Canada", "Economics · University of Dhaka", "Medicine · Khulna"].map((item, index) => (
              <div className="person-row" key={item}>
                <span className="avatar-placeholder">{String.fromCharCode(65 + index)}</span>
                <div><strong>Community connection</strong><small>{item}</small></div>
                <span>↗</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark events-preview">
        <div className="shell">
          <div className="section-head section-head-light">
            <span className="eyebrow">Upcoming & recent</span>
            <h2>Where the network <em>becomes real.</em></h2>
          </div>
          <div className="event-grid">
            <article className="event-card event-featured">
              <span className="event-tag">Reunion</span>
              <div>
                <span className="event-date">2026</span>
                <h3>USAS Reunion 2026</h3>
                <p>A dedicated hub for the next major community gathering, its story, people, gallery, sponsors and reporting.</p>
              </div>
              <Link href="/events/reunion/2026">Explore reunion <span>↗</span></Link>
            </article>
            <article className="event-card">
              <span className="event-tag">Webinar</span>
              <div><h3>Career & Skills Sessions</h3><p>Practical sessions led by experienced alumni and professionals.</p></div>
              <Link href="/programs/webinars-workshops">View program <span>↗</span></Link>
            </article>
            <article className="event-card">
              <span className="event-tag">Networking</span>
              <div><h3>Campus & Alumni Meetups</h3><p>Smaller, focused gatherings designed to create stronger connections.</p></div>
              <Link href="/events">See events <span>↗</span></Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section featured-program">
        <div className="shell feature-split">
          <div className="program-number">01</div>
          <div>
            <span className="eyebrow eyebrow-dark">Featured program</span>
            <h2>Mentorship that makes experience <em>transferable.</em></h2>
          </div>
          <div>
            <p>Match senior members and alumni with students navigating admissions, careers, higher study, entrepreneurship, government jobs and corporate life.</p>
            <Link className="text-link dark-link" href="/programs/mentorship">Explore mentorship <span>→</span></Link>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow eyebrow-dark">Member stories</span>
            <h2>Experience becomes powerful <em>when it is shared.</em></h2>
          </div>
          <div className="story-grid">
            {["A senior helping a student choose the right university path.", "An alumnus opening a career conversation across borders.", "A volunteer turning an idea into a useful community program."].map((story, index) => (
              <article className="story-card" key={story}>
                <span>Story 0{index + 1}</span>
                <blockquote>“{story}”</blockquote>
                <Link href="/community/stories">Read community stories <span>↗</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section knowledge-preview">
        <div className="shell">
          <div className="section-head row-head">
            <div><span className="eyebrow eyebrow-dark">Knowledge</span><h2>Useful knowledge should <em>circulate.</em></h2></div>
            <Link className="button button-outline" href="/knowledge">Explore knowledge</Link>
          </div>
          <div className="article-grid">
            {[
              ["Career", "How to turn alumni experience into a practical career advantage"],
              ["Higher Education", "A better starting point for students planning postgraduate study"],
              ["Resources", "Building a shared library of guides, templates and roadmaps"],
            ].map(([category, title]) => (
              <article className="article-card" key={title}>
                <span>{category}</span><h3>{title}</h3><p>USAS Editorial · 5 min read</p><Link href="/knowledge/articles">Read article →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section impact-section">
        <div className="shell">
          <span className="eyebrow eyebrow-dark">USAS Impact</span>
          <div className="impact-heading">
            <h2>What happens when a <em>community connects?</em></h2>
            <p>We want progress to be measurable, transparent and useful to the next generation.</p>
          </div>
          <div className="impact-grid">
            {["Members", "Universities", "Events", "Mentorship hours", "Scholarships", "Volunteers"].map((label) => (
              <div key={label}><strong>↗</strong><span>{label}</span></div>
            ))}
          </div>
          <Link className="text-link dark-link" href="/impact">Explore our impact <span>→</span></Link>
        </div>
      </section>

      <section className="section vision-band section-dark">
        <div className="shell vision-grid">
          <span className="eyebrow">Our direction</span>
          <h2>Build the most connected, resourceful and impactful student and alumni community originating from <em>Shyamnagar.</em></h2>
          <Link className="button button-accent" href="/about/vision-mission">Vision & mission <span>↗</span></Link>
        </div>
      </section>

      <section className="section partners-preview">
        <div className="shell">
          <div className="partners-line">
            <span className="eyebrow eyebrow-dark">Partners & supporters</span>
            <p>Community partnerships, program partners and event sponsors will appear here with clear contribution records.</p>
            <Link href="/get-involved/partner">Partner with USAS →</Link>
          </div>
        </div>
      </section>

      <section className="section join-band">
        <div className="shell join-grid">
          <div><span className="eyebrow eyebrow-dark">Get involved</span><h2>Discover. Connect. Learn. Participate. <em>Contribute.</em></h2></div>
          <div><p>USAS becomes more valuable every time a student, alumnus, mentor, volunteer or partner adds something useful to the network.</p><Link className="button button-dark" href="/get-involved/member">Join USAS <span>↗</span></Link></div>
        </div>
      </section>
    </>
  );
}
