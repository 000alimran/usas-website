import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "../login/actions";

export const dynamic = "force-dynamic";

const allowedRoles = new Set([
  "super_admin",
  "admin",
  "editor",
  "membership_manager",
  "event_manager",
  "program_manager",
  "finance",
  "contributor",
]);

export default async function AdminWorkspaceLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;

  if (!userId) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", userId)
    .single();

  if (!profile || !allowedRoles.has(profile.role)) {
    redirect("/admin/login?error=unauthorized");
  }

  return (
    <div className="admin-workspace">
      <aside className="admin-sidebar">
        <Link className="admin-brand" href="/admin">
          <img src="/usas-mark.svg" alt="" width="32" height="44" />
          <strong>USAS Admin</strong>
        </Link>

        <nav className="admin-nav" aria-label="Admin navigation">
          <Link href="/admin">Overview</Link>
          <Link href="/admin/content">Content</Link>
          <Link href="/admin/community">Community</Link>
          <Link href="/admin/programs">Programs</Link>
          <Link href="/admin/events">Events</Link>
          <Link href="/admin/reports">Reports</Link>
          <Link href="/admin/settings">Settings</Link>
        </nav>

        <div className="admin-sidebar-footer">
          <strong>{profile.full_name || "USAS Team"}</strong>
          <span>{profile.role.replaceAll("_", " ")}</span>
          <form action={logout}>
            <button className="admin-logout" type="submit">Sign out</button>
          </form>
        </div>
      </aside>
      <section className="admin-main">{children}</section>
    </div>
  );
}
