"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AdminRole } from "@/lib/admin-auth";

const items = [
  { href: "/admin", label: "Overview", key: "overview", glyph: "⌂" },
  { href: "/admin/content", label: "Content", key: "content", glyph: "✦" },
  { href: "/admin/community", label: "Community", key: "community", glyph: "◎" },
  { href: "/admin/programs", label: "Programs", key: "programs", glyph: "◇" },
  { href: "/admin/events", label: "Events", key: "events", glyph: "◫" },
  { href: "/admin/reports", label: "Reports", key: "reports", glyph: "▥" },
  { href: "/admin/settings", label: "Settings", key: "settings", glyph: "⚙" },
] as const;

const visibility: Record<string, AdminRole[]> = {
  overview: ["super_admin", "admin", "editor", "membership_manager", "event_manager", "program_manager", "finance", "contributor"],
  content: ["super_admin", "admin", "editor", "contributor"],
  community: ["super_admin", "admin", "membership_manager"],
  programs: ["super_admin", "admin", "program_manager"],
  events: ["super_admin", "admin", "event_manager"],
  reports: ["super_admin", "admin", "finance"],
  settings: ["super_admin", "admin"],
};

export function AdminNav({ role }: { role: AdminRole }) {
  const pathname = usePathname();

  const links = items.filter((item) => visibility[item.key].includes(role));

  return (
    <nav className="admin-nav" aria-label="Admin navigation">
      {links.map((item) => {
        const active = item.href === "/admin"
          ? pathname === "/admin"
          : pathname.startsWith(item.href);

        return (
          <Link className={active ? "is-active" : undefined} href={item.href} key={item.href}>
            <span className="admin-nav-glyph" aria-hidden="true">{item.glyph}</span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
