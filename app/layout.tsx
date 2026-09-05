import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site-data";
import "./globals.css";
import "./brand.css";
import "./seo-structure.css";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.shortName} | ${site.tagline}`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  icons: {
    icon: "/usas-mark.svg",
    shortcut: "/usas-mark.svg",
  },
  openGraph: {
    title: `${site.shortName} | ${site.tagline}`,
    description: site.description,
    url: `https://${site.domain}`,
    siteName: site.shortName,
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
