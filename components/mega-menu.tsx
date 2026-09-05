"use client";

import Link from "next/link";
import type { NavItem } from "@/lib/site-data";
import { getNavDescription } from "@/lib/nav-descriptions";
import { useState } from "react";

export function MegaMenu({ item }: { item: NavItem }) {
  const [activeHref, setActiveHref] = useState(item.children?.[0]?.href ?? item.href);
  const activeChild = item.children?.find((child) => child.href === activeHref) ?? item.children?.[0];

  if (!item.children) return null;

  return (
    <div className="mega-card">
      <div className="mega-copy">
        <span className="kicker">Explore</span>
        <strong>{item.label}</strong>
        <p className="mega-section-intro">Discover the people, programs and ideas shaping USAS.</p>

        <div className="mega-context" aria-live="polite">
          <span className="mega-context-label">{activeChild?.label}</span>
          <p>{getNavDescription(activeChild?.href ?? item.href)}</p>
        </div>
      </div>

      <div className="mega-links">
        {item.children.map((child) => (
          <Link
            href={child.href}
            key={child.href}
            className={activeHref === child.href ? "is-active" : undefined}
            onMouseEnter={() => setActiveHref(child.href)}
            onFocus={() => setActiveHref(child.href)}
          >
            <span>{child.label}</span>
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
