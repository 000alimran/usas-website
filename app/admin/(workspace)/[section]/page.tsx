import { notFound } from "next/navigation";

const modules: Record<string, { title: string; description: string; items: string[] }> = {
  content: {
    title: "Content",
    description: "Manage the knowledge layer and structured website content.",
    items: ["Pages", "Articles", "Categories", "Resources", "Opportunities"],
  },
  community: {
    title: "Community",
    description: "Review applications and manage the trusted USAS network.",
    items: ["Members", "Alumni", "Mentors", "Universities", "Applications"],
  },
  programs: {
    title: "Programs",
    description: "Publish programs and manage participant applications.",
    items: ["Programs", "Applications", "Mentorship", "Student Support"],
  },
  events: {
    title: "Events",
    description: "Run the event calendar, registration and post-event archive.",
    items: ["Upcoming", "Registrations", "Past Events", "Reunions", "Gallery"],
  },
  reports: {
    title: "Reports",
    description: "Keep impact and transparency information organized and publishable.",
    items: ["Annual Reports", "Impact Metrics", "Partners", "Financial Transparency"],
  },
  settings: {
    title: "Settings",
    description: "Control site-level settings, roles and operational configuration.",
    items: ["Site Identity", "Homepage", "Users & Roles", "Media", "Navigation"],
  },
};

type Props = { params: Promise<{ section: string }> };

export default async function AdminModulePage({ params }: Props) {
  const { section } = await params;
  const module = modules[section];
  if (!module) notFound();

  return (
    <>
      <header className="admin-main-header">
        <div>
          <span className="admin-kicker">USAS Admin</span>
          <h1>{module.title}</h1>
          <p>{module.description}</p>
        </div>
      </header>
      <div className="admin-grid">
        {module.items.map((item) => (
          <article className="admin-card" key={item}>
            <span>Module</span>
            <strong>{item}</strong>
            <p>CRUD workflow will be connected to Supabase in the next implementation sprint.</p>
          </article>
        ))}
      </div>
    </>
  );
}
