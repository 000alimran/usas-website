import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/lib/site-data";
import "./globals.css";
import "./brand.css";
import "./seo-structure.css";
import "./mega-menu.css";
import "./admin/admin.css";

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
        <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
