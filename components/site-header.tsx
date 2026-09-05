import Link from "next/link";
import { mainNav, site } from "@/lib/site-data";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="USAS home">
          <img
            src="/usas-mark.svg"
            alt=""
            aria-hidden="true"
            width="30"
            height="40"
            style={{ objectFit: "contain", flex: "0 0 auto" }}
          />
          <strong>{site.shortName}</strong>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {mainNav.map((item) => (
            <div className="nav-item" key={item.href}>
              <Link href={item.href}>{item.label}</Link>
              {item.children && (
                <div className="mega-card">
                  <div className="mega-copy">
                    <span className="kicker">Explore</span>
                    <strong>{item.label}</strong>
                    <p>Discover the people, programs and ideas shaping USAS.</p>
                  </div>
                  <div className="mega-links">
                    {item.children.map((child) => (
                      <Link href={child.href} key={child.href}>{child.label}<span>↗</span></Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <Link className="button button-small header-cta" href="/get-involved/member">Join USAS</Link>

        <details className="mobile-menu">
          <summary aria-label="Open navigation">Menu</summary>
          <div className="mobile-panel">
            {mainNav.map((item) => (
              <div key={item.href} className="mobile-group">
                <Link href={item.href}><strong>{item.label}</strong></Link>
                {item.children?.slice(0, 5).map((child) => (
                  <Link href={child.href} key={child.href}>{child.label}</Link>
                ))}
              </div>
            ))}
            <Link className="button" href="/get-involved/member">Join USAS</Link>
          </div>
        </details>
      </div>
    </header>
  );
}
