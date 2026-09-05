import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allRoutes, getPageCopy, mainNav, site } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string[] }> };

type BreadcrumbItem = {
  label: string;
  href: string;
};

export const dynamicParams = false;

const routeLabels = new Map<string, string>([
  ["/", "Home"],
  ...mainNav.flatMap((item) => [
    [item.href, item.label] as [string, string],
    ...(item.children?.map((child) => [child.href, child.label] as [string, string]) ?? []),
  ]),
  ["/get-involved", "Get Involved"],
  ["/get-involved/member", "Become a Member"],
  ["/get-involved/volunteer", "Volunteer"],
  ["/get-involved/mentor", "Become a Mentor"],
  ["/get-involved/ambassador", "University Ambassador"],
  ["/get-involved/partner", "Partner with USAS"],
  ["/get-involved/support", "Support USAS"],
  ["/contact", "Contact"],
  ["/feedback", "Feedback"],
  ["/media", "Media"],
]);

function humanize(segment: string) {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function labelForRoute(href: string) {
  return routeLabels.get(href) ?? humanize(href.split("/").filter(Boolean).at(-1) ?? "Page");
}

function buildBreadcrumbs(slug: string[]): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [{ label: "Home", href: "/" }];
  let current = "";

  slug.forEach((segment) => {
    current += `/${segment}`;
    items.push({ label: labelForRoute(current), href: current });
  });

  return items;
}

function getImmediateChildren(path: string) {
  const normalized = `/${path}`;
  const parentDepth = normalized.split("/").filter(Boolean).length;

  return allRoutes
    .filter((route) => route.startsWith(`${normalized}/`))
    .filter((route) => route.split("/").filter(Boolean).length === parentDepth + 1)
    .map((href) => ({ href, label: labelForRoute(href) }));
}

export function generateStaticParams() {
  return allRoutes.map((route) => ({ slug: route.split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join("/");
  if (!allRoutes.includes(`/${path}`)) return {};
  const page = getPageCopy(path);

  return {
    title: page.title,
    description: page.intro,
    alternates: {
      canonical: `/${path}`,
    },
    openGraph: {
      title: page.title,
      description: page.intro,
      url: `https://${site.domain}/${path}`,
      siteName: site.shortName,
      type: "website",
    },
  };
}

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  const path = slug.join("/");
  if (!allRoutes.includes(`/${path}`)) notFound();

  const page = getPageCopy(path);
  const breadcrumbs = buildBreadcrumbs(slug);
  const childPages = getImmediateChildren(path);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `https://${site.domain}${item.href === "/" ? "" : item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="subpage-hero section-dark">
        <div className="shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            {breadcrumbs.map((item, index) => (
              <span key={item.href}>
                {index < breadcrumbs.length - 1 ? (
                  <Link href={item.href}>{item.label}</Link>
                ) : (
                  <span aria-current="page">{item.label}</span>
                )}
                {index < breadcrumbs.length - 1 && <span className="breadcrumb-separator">/</span>}
              </span>
            ))}
          </nav>

          <div className="subpage-hero-grid">
            <div>
              <span className="eyebrow">{page.eyebrow}</span>
              <h1>{page.title}</h1>
            </div>
            <p>{page.intro}</p>
          </div>
        </div>
      </section>

      <section className="section subpage-body">
        <div className="shell content-grid">
          <aside>
            <span className="kicker">USAS / {page.eyebrow}</span>
            <p>Community × Opportunity × Knowledge × Impact</p>
          </aside>
          <div className="content-sections">
            {childPages.length > 0 && (
              <article className="content-section hub-section">
                <span className="content-index">00</span>
                <div>
                  <h2>Explore this section</h2>
                  <p>Browse the key pages in this section.</p>
                  <div className="hub-links">
                    {childPages.map((child) => (
                      <Link key={child.href} href={child.href}>
                        <span>{child.label}</span>
                        <span aria-hidden="true">↗</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            )}

            {page.sections.map((section, index) => (
              <article className="content-section" key={`${section.heading}-${index}`}>
                <span className="content-index">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{section.heading}</h2>
                  {section.body && <p>{section.body}</p>}
                  {section.items && (
                    <ul>
                      {section.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  )}
                </div>
              </article>
            ))}
            {page.cta && <Link className="button button-dark" href={page.cta.href}>{page.cta.label} <span>↗</span></Link>}
          </div>
        </div>
      </section>

      <section className="section subpage-cta section-muted">
        <div className="shell join-grid">
          <div><span className="eyebrow eyebrow-dark">Build with us</span><h2>A useful community is built <em>by participation.</em></h2></div>
          <div><p>Join the network, volunteer your skills, mentor someone or help USAS build the next layer of community infrastructure.</p><Link className="button button-dark" href="/get-involved/member">Join USAS <span>↗</span></Link></div>
        </div>
      </section>
    </>
  );
}
