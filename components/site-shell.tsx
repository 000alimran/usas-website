"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
};

export function SiteShell({ children, header, footer }: Props) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <main id="main">{children}</main>;
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      {header}
      <main id="main">{children}</main>
      {footer}
    </>
  );
}
