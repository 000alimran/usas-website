import Link from "next/link";
import { footerGroups, site } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <div className="brand brand-inverse">
            <img
              src="/usas-mark.svg"
              alt=""
              aria-hidden="true"
              width="38"
              height="52"
              style={{ objectFit: "contain", flex: "0 0 auto" }}
            />
            <span>
              <strong>{site.shortName}</strong>
              <small>Shyamnagar</small>
            </span>
          </div>
          <h2>{site.tagline}</h2>
          <p>{site.description}</p>
        </div>

        {footerGroups.map((group) => (
          <div className="footer-links" key={group.title}>
            <span className="kicker">{group.title}</span>
            {group.links.map(([label, href]) => (
              <Link href={href} key={href}>{label}</Link>
            ))}
          </div>
        ))}
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>{site.domain}</span>
      </div>
    </footer>
  );
}
