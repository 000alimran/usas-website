import Link from "next/link";
import { AdminNav } from "@/components/admin-nav";
import { requireAdminProfile, roleLabel } from "@/lib/admin-auth";
import { logout } from "../login/actions";

export const dynamic = "force-dynamic";

export default async function AdminWorkspaceLayout({ children }: { children: React.ReactNode }) {
  const profile = await requireAdminProfile();

  return (
    <div className="admin-workspace">
      <aside className="admin-sidebar">
        <div>
          <Link className="admin-brand" href="/admin">
            <img src="/usas-mark.svg" alt="" width="34" height="46" />
            <span>
              <strong>USAS</strong>
              <small>Administration</small>
            </span>
          </Link>

          <AdminNav role={profile.role} />
        </div>

        <div className="admin-sidebar-footer">
          <div className="admin-user">
            <span className="admin-user-avatar" aria-hidden="true">
              {profile.fullName.slice(0, 1).toUpperCase()}
            </span>
            <span>
              <strong>{profile.fullName}</strong>
              <small>{roleLabel(profile.role)}</small>
            </span>
          </div>
          <form action={logout}>
            <button className="admin-logout" type="submit">Sign out</button>
          </form>
        </div>
      </aside>

      <div className="admin-mobile-bar">
        <Link className="admin-mobile-brand" href="/admin">
          <img src="/usas-mark.svg" alt="" width="25" height="34" />
          <strong>USAS Admin</strong>
        </Link>
        <details className="admin-mobile-menu">
          <summary aria-label="Open admin navigation">
            <span></span><span></span><span></span>
          </summary>
          <div className="admin-mobile-panel">
            <AdminNav role={profile.role} />
            <div className="admin-mobile-account">
              <strong>{profile.fullName}</strong>
              <small>{roleLabel(profile.role)}</small>
              <form action={logout}>
                <button className="admin-logout" type="submit">Sign out</button>
              </form>
            </div>
          </div>
        </details>
      </div>

      <section className="admin-main">{children}</section>
    </div>
  );
}
