import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [articles, events, members, programs, pendingMembers, registrations] = await Promise.all([
    supabase.from("articles").select("id", { count: "exact", head: true }),
    supabase.from("events").select("id", { count: "exact", head: true }),
    supabase.from("members").select("id", { count: "exact", head: true }),
    supabase.from("programs").select("id", { count: "exact", head: true }),
    supabase.from("members").select("id", { count: "exact", head: true }).eq("application_status", "pending"),
    supabase.from("event_registrations").select("id", { count: "exact", head: true }),
  ]);

  const cards = [
    ["Content", articles.count ?? 0, "Articles in the knowledge system"],
    ["Events", events.count ?? 0, "Events across the USAS calendar"],
    ["Community", members.count ?? 0, "Member records in the network"],
    ["Programs", programs.count ?? 0, "Programs managed by USAS"],
    ["Review queue", pendingMembers.count ?? 0, "Membership applications awaiting review"],
    ["Registrations", registrations.count ?? 0, "Event registrations collected"],
  ] as const;

  return (
    <>
      <header className="admin-main-header">
        <div>
          <span className="admin-kicker">Dynamic V1</span>
          <h1>Overview</h1>
        </div>
        <a href="/" target="_blank" rel="noreferrer">View public site ↗</a>
      </header>

      <div className="admin-grid">
        {cards.map(([label, count, description]) => (
          <article className="admin-card" key={label}>
            <span>{label}</span>
            <strong>{count}</strong>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </>
  );
}
