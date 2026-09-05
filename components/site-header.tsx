import Link from "next/link";
import { MegaMenu } from "@/components/mega-menu";
import { getNavDescription } from "@/lib/nav-descriptions";
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
          <summary aria-label="Open navigation">Menu</summary>
          <div className="mobile-panel">
            {mainNav.map((item) => (
              <div key={item.href} className="mobile-group">
                <Link href={item.href}><strong>{item.label}</strong></Link>
                {item.children?.slice(0, 5).map((child) => (
                  <Link href={child.href} key={child.href} className="mobile-context-link">
                    <span>{child.label}</span>
                    <small>{getNavDescription(child.href)}</small>
                  </Link>
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
