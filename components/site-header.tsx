import Link from "next/link";
import { MegaMenu } from "@/components/mega-menu";
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
              <MegaMenu item={item} />
            </div>
          ))}
        </nav>

        <Link className="button button-small header-cta" href="/get-involved/member">Join USAS</Link>

        <details className="mobile-menu">
          <summary className="mobile-menu-toggle" aria-label="Open navigation">
            <span className="hamburger" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="sr-only">Menu</span>
          </summary>

          <nav className="mobile-panel" aria-label="Mobile navigation">
            <div className="mobile-panel-head">
              <span className="kicker">Explore USAS</span>
              <p>Community, opportunity, knowledge and impact in one place.</p>
            </div>

            <div className="mobile-nav-list">
              {mainNav.map((item) => (
                <details className="mobile-nav-group" key={item.href}>
                  <summary>
                    <span>{item.label}</span>
                    <span className="mobile-chevron" aria-hidden="true">+</span>
                  </summary>
                  <div className="mobile-nav-children">
                    <Link className="mobile-all-link" href={item.href}>Explore all {item.label} <span>↗</span></Link>
                    {item.children?.map((child) => (
                      <Link href={child.href} key={child.href}>
                        <span>{child.label}</span>
                        <span aria-hidden="true">↗</span>
                      </Link>
                    ))}
                  </div>
                </details>
              ))}
            </div>

            <div className="mobile-panel-footer">
              <Link className="button button-dark" href="/get-involved/member">Join USAS <span>↗</span></Link>
            </div>
          </nav>
        </details>
      </div>
    </header>
  );
}
