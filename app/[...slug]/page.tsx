import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allRoutes, getPageCopy } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return allRoutes.map((route) => ({ slug: route.split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join("/");
  if (!allRoutes.includes(`/${path}`)) return {};
  const page = getPageCopy(path);
  return { title: page.title, description: page.intro };
}

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  const path = slug.join("/");
  if (!allRoutes.includes(`/${path}`)) notFound();
  const page = getPageCopy(path);

  return (
    <>
      <section className="subpage-hero section-dark">
        <div className="shell subpage-hero-grid">
          <div>
            <span className="eyebrow">{page.eyebrow}</span>
            <h1>{page.title}</h1>
          </div>
          <p>{page.intro}</p>
        </div>
      </section>

      <section className="section subpage-body">
        <div className="shell content-grid">
          <aside>
            <span className="kicker">USAS / {page.eyebrow}</span>
            <p>Community × Opportunity × Knowledge × Impact</p>
          </aside>
          <div className="content-sections">
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
