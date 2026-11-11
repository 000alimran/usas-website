import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { requireAdminProfile, SECTION_ROLES } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

function formatDate(value: string | null) {
  if (!value) return "No date";
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}

export default async function AdminDashboardPage() {
  const [profile, supabase] = await Promise.all([requireAdminProfile(), createClient()]);

  const [
    articles,
    events,
    members,
    programs,
    pendingMembers,
    registrations,
    recentArticles,
    recentMembers,
    upcomingEvents,
  ] = await Promise.all([
    supabase.from("articles").select("id", { count: "exact", head: true }),
    supabase.from("events").select("id", { count: "exact", head: true }),
    supabase.from("members").select("id", { count: "exact", head: true }),
    supabase.from("programs").select("id", { count: "exact", head: true }),
    supabase.from("members").select("id", { count: "exact", head: true }).eq("application_status", "pending"),
    supabase.from("event_registrations").select("id", { count: "exact", head: true }),
    supabase.from("articles").select("id,title,status,updated_at").order("updated_at", { ascending: false }).limit(5),
    supabase.from("members").select("id,full_name,member_type,application_status,created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("events").select("id,title,starts_at,status,registration_open").gte("starts_at", new Date().toISOString()).order("starts_at", { ascending: true }).limit(5),
  ]);

  const cards = [
    { label: "Articles", value: articles.count ?? 0, detail: "Knowledge content", href: "/admin/content" },
    { label: "Events", value: events.count ?? 0, detail: "Calendar entries", href: "/admin/events" },
    { label: "Members", value: members.count ?? 0, detail: "Community records", href: "/admin/community" },
    { label: "Programs", value: programs.count ?? 0, detail: "Active and draft programs", href: "/admin/programs" },
    { label: "Review queue", value: pendingMembers.count ?? 0, detail: "Membership applications", href: "/admin/community" },
    { label: "Registrations", value: registrations.count ?? 0, detail: "Event registrations", href: "/admin/events" },
  ];

  const quickActions = [
    SECTION_ROLES.content.includes(profile.role) && { href: "/admin/content#new-article", label: "New article" },
    SECTION_ROLES.events.includes(profile.role) && { href: "/admin/events#new-event", label: "Create event" },
    SECTION_ROLES.programs.includes(profile.role) && { href: "/admin/programs#new-program", label: "Create program" },
    SECTION_ROLES.community.includes(profile.role) && { href: "/admin/community#review-queue", label: "Review members" },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <>
      <header className="admin-main-header">
        <div>
          <span className="admin-kicker">USAS Dynamic V1</span>
          <h1>Good to see you, {profile.fullName.split(" ")[0]}.</h1>
          <p>Manage the community, publish useful knowledge, run programs and keep the institution transparent.</p>
        </div>
        <a className="admin-view-site" href="/" target="_blank" rel="noreferrer">View site ↗</a>
      </header>

      <div className="admin-quick-actions">
        {quickActions.map((action) => <Link href={action.href} key={action.href}>{action.label}<span>↗</span></Link>)}
      </div>

      <div className="admin-stat-grid">
        {cards.map((card) => (
          <Link className="admin-stat-card" href={card.href} key={card.label}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <small>{card.detail}</small>
          </Link>
        ))}
      </div>

      <div className="admin-dashboard-grid">
        <section className="admin-panel">
          <div className="admin-panel-head">
            <div><span className="admin-kicker">Content pulse</span><h2>Recently updated</h2></div>
            <Link href="/admin/content">Manage content</Link>
          </div>
          <div className="admin-list">
            {(recentArticles.data ?? []).length === 0 && <div className="admin-empty">No articles yet. Publish the first knowledge piece from Content.</div>}
            {(recentArticles.data ?? []).map((article) => (
              <div className="admin-list-row" key={article.id}>
                <div><strong>{article.title}</strong><small>Updated {formatDate(article.updated_at)}</small></div>
                <span className={`admin-status is-${article.status}`}>{article.status}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-panel">
          <div className="admin-panel-head">
            <div><span className="admin-kicker">Community</span><h2>Latest members</h2></div>
            <Link href="/admin/community">Open directory</Link>
          </div>
          <div className="admin-list">
            {(recentMembers.data ?? []).length === 0 && <div className="admin-empty">No membership records yet.</div>}
            {(recentMembers.data ?? []).map((member) => (
              <div className="admin-list-row" key={member.id}>
                <div><strong>{member.full_name}</strong><small>{member.member_type} · {formatDate(member.created_at)}</small></div>
                <span className={`admin-status is-${member.application_status}`}>{member.application_status}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-panel admin-panel-wide">
          <div className="admin-panel-head">
            <div><span className="admin-kicker">Calendar</span><h2>Upcoming events</h2></div>
            <Link href="/admin/events">Manage events</Link>
          </div>
          <div className="admin-list">
            {(upcomingEvents.data ?? []).length === 0 && <div className="admin-empty">Nothing scheduled yet. Create the next USAS event.</div>}
            {(upcomingEvents.data ?? []).map((event) => (
              <div className="admin-list-row" key={event.id}>
                <div><strong>{event.title}</strong><small>{formatDate(event.starts_at)} · Registration {event.registration_open ? "open" : "closed"}</small></div>
                <span className={`admin-status is-${event.status}`}>{event.status}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
