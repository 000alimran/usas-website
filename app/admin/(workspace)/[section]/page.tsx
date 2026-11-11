import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAdminProfile, SECTION_ROLES } from "@/lib/admin-auth";
import {
  saveAnnualReport,
  saveArticle,
  saveCategory,
  saveEvent,
  savePartner,
  saveProgram,
  saveSiteIdentity,
  setArticleStatus,
  updateMemberStatus,
  updateMemberVisibility,
} from "../actions";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ section: string }> };

function formatDate(value: string | null) {
  if (!value) return "Not set";
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}

function localDateTime(value: string | null) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 16);
}

function bodyContent(value: unknown) {
  if (value && typeof value === "object" && "content" in value) {
    return String((value as Record<string, unknown>).content ?? "");
  }
  return "";
}

function settingObject(value: unknown) {
  if (value && typeof value === "object" && !Array.isArray(value)) return value as Record<string, unknown>;
  return {};
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return <label className="admin-field"><span>{label}</span>{children}{hint && <small>{hint}</small>}</label>;
}

function Status({ value }: { value: string }) {
  return <span className={`admin-status is-${value}`}>{value.replaceAll("_", " ")}</span>;
}

export default async function AdminModulePage({ params }: Props) {
  const { section } = await params;
  if (!SECTION_ROLES[section]) notFound();

  await requireAdminProfile(SECTION_ROLES[section]);
  const supabase = await createClient();

  if (section === "content") {
    const [{ data: articles }, { data: categories }] = await Promise.all([
      supabase.from("articles").select("*").order("updated_at", { ascending: false }),
      supabase.from("categories").select("*").order("name"),
    ]);

    return (
      <>
        <header className="admin-main-header">
          <div><span className="admin-kicker">Knowledge system</span><h1>Content</h1><p>Publish articles, manage categories and keep SEO metadata clean from one place.</p></div>
        </header>

        <div className="admin-two-column">
          <section className="admin-panel" id="new-article">
            <div className="admin-panel-head"><div><span className="admin-kicker">Create</span><h2>New article</h2></div></div>
            <form action={saveArticle} className="admin-editor-form">
              <Field label="Title"><input name="title" required placeholder="Scholarship guide for..." /></Field>
              <div className="admin-form-grid">
                <Field label="Slug" hint="Leave blank to generate from title"><input name="slug" placeholder="scholarship-guide" /></Field>
                <Field label="Status"><select name="status" defaultValue="draft"><option value="draft">Draft</option><option value="published">Published</option></select></Field>
              </div>
              <Field label="Excerpt"><textarea name="excerpt" rows={3} placeholder="One-paragraph summary" /></Field>
              <Field label="Article body"><textarea name="body" rows={10} placeholder="Write the article content here..." /></Field>
              <Field label="Featured image URL"><input name="featured_image_url" type="url" placeholder="https://..." /></Field>
              <div className="admin-form-grid">
                <Field label="SEO title"><input name="seo_title" /></Field>
                <Field label="Meta description"><input name="meta_description" /></Field>
              </div>
              <button className="admin-primary" type="submit">Save article</button>
            </form>
          </section>

          <section className="admin-panel">
            <div className="admin-panel-head"><div><span className="admin-kicker">Taxonomy</span><h2>Categories</h2></div></div>
            <form action={saveCategory} className="admin-inline-form">
              <input name="name" required placeholder="Category name" />
              <input name="slug" placeholder="slug" />
              <button className="admin-secondary" type="submit">Add</button>
            </form>
            <div className="admin-chip-list">
              {(categories ?? []).map((category) => <span key={category.id}>{category.name}</span>)}
              {(categories ?? []).length === 0 && <div className="admin-empty">No categories yet.</div>}
            </div>
          </section>
        </div>

        <section className="admin-panel admin-table-panel">
          <div className="admin-panel-head"><div><span className="admin-kicker">Library</span><h2>All articles</h2></div><span>{articles?.length ?? 0} total</span></div>
          <div className="admin-records">
            {(articles ?? []).map((article) => (
              <details className="admin-record" key={article.id}>
                <summary>
                  <div><strong>{article.title}</strong><small>/{article.slug} · Updated {formatDate(article.updated_at)}</small></div>
                  <Status value={article.status} />
                </summary>
                <form action={saveArticle} className="admin-editor-form admin-record-form">
                  <input type="hidden" name="id" value={article.id} />
                  <Field label="Title"><input name="title" required defaultValue={article.title} /></Field>
                  <div className="admin-form-grid">
                    <Field label="Slug"><input name="slug" defaultValue={article.slug} /></Field>
                    <Field label="Status"><select name="status" defaultValue={article.status}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></Field>
                  </div>
                  <Field label="Excerpt"><textarea name="excerpt" rows={3} defaultValue={article.excerpt ?? ""} /></Field>
                  <Field label="Article body"><textarea name="body" rows={10} defaultValue={bodyContent(article.body)} /></Field>
                  <Field label="Featured image URL"><input name="featured_image_url" defaultValue={article.featured_image_url ?? ""} /></Field>
                  <div className="admin-form-grid"><Field label="SEO title"><input name="seo_title" defaultValue={article.seo_title ?? ""} /></Field><Field label="Meta description"><input name="meta_description" defaultValue={article.meta_description ?? ""} /></Field></div>
                  <div className="admin-action-row"><button className="admin-primary" type="submit">Save changes</button></div>
                </form>
                <div className="admin-record-actions">
                  {article.status !== "published" && <form action={setArticleStatus}><input type="hidden" name="id" value={article.id} /><input type="hidden" name="status" value="published" /><button type="submit">Publish</button></form>}
                  {article.status !== "archived" && <form action={setArticleStatus}><input type="hidden" name="id" value={article.id} /><input type="hidden" name="status" value="archived" /><button type="submit">Archive</button></form>}
                </div>
              </details>
            ))}
            {(articles ?? []).length === 0 && <div className="admin-empty">No articles yet. Create the first one above.</div>}
          </div>
        </section>
      </>
    );
  }

  if (section === "community") {
    const { data: members } = await supabase.from("members").select("*").order("created_at", { ascending: false });

    return (
      <>
        <header className="admin-main-header">
          <div><span className="admin-kicker">People network</span><h1>Community</h1><p>Review applications, control profile visibility and maintain a trustworthy member directory.</p></div>
        </header>

        <section className="admin-panel admin-table-panel" id="review-queue">
          <div className="admin-panel-head"><div><span className="admin-kicker">Directory</span><h2>Members</h2></div><span>{members?.length ?? 0} records</span></div>
          <div className="admin-records">
            {(members ?? []).map((member) => (
              <details className="admin-record" key={member.id}>
                <summary>
                  <div><strong>{member.full_name}</strong><small>{member.university || "University not added"} · {member.profession || member.member_type}</small></div>
                  <Status value={member.application_status} />
                </summary>
                <div className="admin-member-detail">
                  <dl>
                    <div><dt>Type</dt><dd>{member.member_type}</dd></div>
                    <div><dt>Department</dt><dd>{member.department || "Not set"}</dd></div>
                    <div><dt>Batch</dt><dd>{member.batch || "Not set"}</dd></div>
                    <div><dt>Location</dt><dd>{member.location || "Not set"}</dd></div>
                    <div><dt>Company</dt><dd>{member.company || "Not set"}</dd></div>
                    <div><dt>Mentor</dt><dd>{member.mentor_available ? "Available" : "No"}</dd></div>
                  </dl>
                  <div className="admin-member-controls">
                    <form action={updateMemberStatus}>
                      <input type="hidden" name="id" value={member.id} />
                      <Field label="Application status"><select name="application_status" defaultValue={member.application_status}><option value="pending">Pending</option><option value="approved">Approved</option><option value="needs_info">Needs info</option><option value="rejected">Rejected</option></select></Field>
                      <button className="admin-primary" type="submit">Update status</button>
                    </form>
                    <form action={updateMemberVisibility}>
                      <input type="hidden" name="id" value={member.id} />
                      <Field label="Profile visibility"><select name="visibility" defaultValue={member.visibility}><option value="public">Public</option><option value="members">Members only</option><option value="private">Private</option></select></Field>
                      <button className="admin-secondary" type="submit">Update visibility</button>
                    </form>
                  </div>
                </div>
              </details>
            ))}
            {(members ?? []).length === 0 && <div className="admin-empty">No member applications yet.</div>}
          </div>
        </section>
      </>
    );
  }

  if (section === "programs") {
    const { data: programs } = await supabase.from("programs").select("*").order("updated_at", { ascending: false });

    return (
      <>
        <header className="admin-main-header"><div><span className="admin-kicker">Repeatable value</span><h1>Programs</h1><p>Create mentorship, career, scholarship and student-support initiatives without touching code.</p></div></header>

        <section className="admin-panel" id="new-program">
          <div className="admin-panel-head"><div><span className="admin-kicker">Create</span><h2>New program</h2></div></div>
          <form action={saveProgram} className="admin-editor-form">
            <div className="admin-form-grid"><Field label="Title"><input name="title" required /></Field><Field label="Slug"><input name="slug" placeholder="auto from title" /></Field></div>
            <Field label="Summary"><textarea name="summary" rows={3} /></Field>
            <Field label="Program details"><textarea name="body" rows={7} /></Field>
            <div className="admin-form-grid"><Field label="Status"><select name="status" defaultValue="draft"><option value="draft">Draft</option><option value="published">Published</option></select></Field><Field label="Application deadline"><input name="application_deadline" type="datetime-local" /></Field></div>
            <label className="admin-check"><input type="checkbox" name="application_open" /> Applications open</label>
            <button className="admin-primary" type="submit">Save program</button>
          </form>
        </section>

        <section className="admin-panel admin-table-panel">
          <div className="admin-panel-head"><div><span className="admin-kicker">Portfolio</span><h2>All programs</h2></div><span>{programs?.length ?? 0} total</span></div>
          <div className="admin-records">
            {(programs ?? []).map((program) => (
              <details className="admin-record" key={program.id}>
                <summary><div><strong>{program.title}</strong><small>/{program.slug} · Applications {program.application_open ? "open" : "closed"}</small></div><Status value={program.status} /></summary>
                <form action={saveProgram} className="admin-editor-form admin-record-form">
                  <input type="hidden" name="id" value={program.id} />
                  <div className="admin-form-grid"><Field label="Title"><input name="title" required defaultValue={program.title} /></Field><Field label="Slug"><input name="slug" defaultValue={program.slug} /></Field></div>
                  <Field label="Summary"><textarea name="summary" rows={3} defaultValue={program.summary ?? ""} /></Field>
                  <Field label="Details"><textarea name="body" rows={7} defaultValue={bodyContent(program.body)} /></Field>
                  <div className="admin-form-grid"><Field label="Status"><select name="status" defaultValue={program.status}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></Field><Field label="Application deadline"><input name="application_deadline" type="datetime-local" defaultValue={localDateTime(program.application_deadline)} /></Field></div>
                  <label className="admin-check"><input type="checkbox" name="application_open" defaultChecked={program.application_open} /> Applications open</label>
                  <button className="admin-primary" type="submit">Save changes</button>
                </form>
              </details>
            ))}
            {(programs ?? []).length === 0 && <div className="admin-empty">No programs yet.</div>}
          </div>
        </section>
      </>
    );
  }

  if (section === "events") {
    const [{ data: events }, { data: registrations }] = await Promise.all([
      supabase.from("events").select("*").order("starts_at", { ascending: false }),
      supabase.from("event_registrations").select("id,event_id,status"),
    ]);

    const registrationCounts = new Map<string, number>();
    (registrations ?? []).forEach((row) => registrationCounts.set(row.event_id, (registrationCounts.get(row.event_id) ?? 0) + 1));

    return (
      <>
        <header className="admin-main-header"><div><span className="admin-kicker">Calendar & participation</span><h1>Events</h1><p>Create events, open registration and monitor participation from the same workspace.</p></div></header>

        <section className="admin-panel" id="new-event">
          <div className="admin-panel-head"><div><span className="admin-kicker">Create</span><h2>New event</h2></div></div>
          <form action={saveEvent} className="admin-editor-form">
            <div className="admin-form-grid"><Field label="Event title"><input name="title" required /></Field><Field label="Slug"><input name="slug" placeholder="auto from title" /></Field></div>
            <Field label="Summary"><textarea name="summary" rows={3} /></Field>
            <Field label="Description"><textarea name="body" rows={6} /></Field>
            <div className="admin-form-grid"><Field label="Starts"><input name="starts_at" type="datetime-local" /></Field><Field label="Ends"><input name="ends_at" type="datetime-local" /></Field></div>
            <div className="admin-form-grid"><Field label="Venue"><input name="venue" /></Field><Field label="Capacity"><input name="capacity" type="number" min="1" /></Field></div>
            <div className="admin-form-grid"><Field label="Registration deadline"><input name="registration_deadline" type="datetime-local" /></Field><Field label="Status"><select name="status" defaultValue="draft"><option value="draft">Draft</option><option value="published">Published</option></select></Field></div>
            <label className="admin-check"><input type="checkbox" name="registration_open" /> Registration open</label>
            <button className="admin-primary" type="submit">Save event</button>
          </form>
        </section>

        <section className="admin-panel admin-table-panel">
          <div className="admin-panel-head"><div><span className="admin-kicker">Event list</span><h2>All events</h2></div><span>{events?.length ?? 0} total</span></div>
          <div className="admin-records">
            {(events ?? []).map((event) => (
              <details className="admin-record" key={event.id}>
                <summary><div><strong>{event.title}</strong><small>{formatDate(event.starts_at)} · {registrationCounts.get(event.id) ?? 0} registrations · {event.venue || "Venue TBD"}</small></div><Status value={event.status} /></summary>
                <form action={saveEvent} className="admin-editor-form admin-record-form">
                  <input type="hidden" name="id" value={event.id} />
                  <div className="admin-form-grid"><Field label="Event title"><input name="title" required defaultValue={event.title} /></Field><Field label="Slug"><input name="slug" defaultValue={event.slug} /></Field></div>
                  <Field label="Summary"><textarea name="summary" rows={3} defaultValue={event.summary ?? ""} /></Field>
                  <Field label="Description"><textarea name="body" rows={6} defaultValue={bodyContent(event.body)} /></Field>
                  <div className="admin-form-grid"><Field label="Starts"><input name="starts_at" type="datetime-local" defaultValue={localDateTime(event.starts_at)} /></Field><Field label="Ends"><input name="ends_at" type="datetime-local" defaultValue={localDateTime(event.ends_at)} /></Field></div>
                  <div className="admin-form-grid"><Field label="Venue"><input name="venue" defaultValue={event.venue ?? ""} /></Field><Field label="Capacity"><input name="capacity" type="number" min="1" defaultValue={event.capacity ?? ""} /></Field></div>
                  <div className="admin-form-grid"><Field label="Registration deadline"><input name="registration_deadline" type="datetime-local" defaultValue={localDateTime(event.registration_deadline)} /></Field><Field label="Status"><select name="status" defaultValue={event.status}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></Field></div>
                  <label className="admin-check"><input type="checkbox" name="registration_open" defaultChecked={event.registration_open} /> Registration open</label>
                  <button className="admin-primary" type="submit">Save changes</button>
                </form>
              </details>
            ))}
            {(events ?? []).length === 0 && <div className="admin-empty">No events yet.</div>}
          </div>
        </section>
      </>
    );
  }

  if (section === "reports") {
    const [{ data: partners }, { data: reports }] = await Promise.all([
      supabase.from("partners").select("*").order("sort_order").order("name"),
      supabase.from("annual_reports").select("*").order("year", { ascending: false }),
    ]);

    return (
      <>
        <header className="admin-main-header"><div><span className="admin-kicker">Trust & transparency</span><h1>Reports</h1><p>Manage partners and publish annual reports so institutional memory stays accessible.</p></div></header>

        <div className="admin-two-column">
          <section className="admin-panel">
            <div className="admin-panel-head"><div><span className="admin-kicker">Partners</span><h2>Add partner</h2></div></div>
            <form action={savePartner} className="admin-editor-form">
              <Field label="Name"><input name="name" required /></Field>
              <div className="admin-form-grid"><Field label="Website"><input name="website_url" type="url" /></Field><Field label="Type"><input name="partner_type" placeholder="Sponsor, partner..." /></Field></div>
              <Field label="Logo URL"><input name="logo_url" type="url" /></Field>
              <label className="admin-check"><input type="checkbox" name="is_active" defaultChecked /> Active</label>
              <button className="admin-primary" type="submit">Save partner</button>
            </form>
          </section>

          <section className="admin-panel">
            <div className="admin-panel-head"><div><span className="admin-kicker">Annual reporting</span><h2>Add report</h2></div></div>
            <form action={saveAnnualReport} className="admin-editor-form">
              <div className="admin-form-grid"><Field label="Year"><input name="year" type="number" min="2000" max="2100" required /></Field><Field label="Status"><select name="status" defaultValue="draft"><option value="draft">Draft</option><option value="published">Published</option></select></Field></div>
              <Field label="Title"><input name="title" required /></Field>
              <Field label="Summary"><textarea name="summary" rows={3} /></Field>
              <Field label="PDF / document URL"><input name="file_url" type="url" /></Field>
              <button className="admin-primary" type="submit">Save report</button>
            </form>
          </section>
        </div>

        <div className="admin-two-column">
          <section className="admin-panel">
            <div className="admin-panel-head"><div><span className="admin-kicker">Current</span><h2>Partners</h2></div></div>
            <div className="admin-list">{(partners ?? []).map((partner) => <div className="admin-list-row" key={partner.id}><div><strong>{partner.name}</strong><small>{partner.partner_type || "Partner"}</small></div><Status value={partner.is_active ? "active" : "archived"} /></div>)}{(partners ?? []).length === 0 && <div className="admin-empty">No partners yet.</div>}</div>
          </section>
          <section className="admin-panel">
            <div className="admin-panel-head"><div><span className="admin-kicker">Archive</span><h2>Annual reports</h2></div></div>
            <div className="admin-list">{(reports ?? []).map((report) => <div className="admin-list-row" key={report.id}><div><strong>{report.year} · {report.title}</strong><small>{report.file_url ? "Document linked" : "No document attached"}</small></div><Status value={report.status} /></div>)}{(reports ?? []).length === 0 && <div className="admin-empty">No annual reports yet.</div>}</div>
          </section>
        </div>
      </>
    );
  }

  if (section === "settings") {
    const { data: setting } = await supabase.from("site_settings").select("value,updated_at").eq("key", "site_identity").maybeSingle();
    const identity = settingObject(setting?.value);

    return (
      <>
        <header className="admin-main-header"><div><span className="admin-kicker">Configuration</span><h1>Settings</h1><p>Control the public identity and core site configuration. Structural design remains protected in code.</p></div></header>
        <section className="admin-panel admin-settings-panel">
          <div className="admin-panel-head"><div><span className="admin-kicker">Site identity</span><h2>Public brand information</h2></div>{setting?.updated_at && <span>Updated {formatDate(setting.updated_at)}</span>}</div>
          <form action={saveSiteIdentity} className="admin-editor-form">
            <div className="admin-form-grid"><Field label="Organisation name"><input name="name" defaultValue={String(identity.name ?? "University Students' Association of Shyamnagar")} /></Field><Field label="Short name"><input name="short_name" defaultValue={String(identity.shortName ?? "USAS")} /></Field></div>
            <div className="admin-form-grid"><Field label="Domain"><input name="domain" defaultValue={String(identity.domain ?? "usasbd.org")} /></Field><Field label="Tagline"><input name="tagline" defaultValue={String(identity.tagline ?? "")} /></Field></div>
            <Field label="Description"><textarea name="description" rows={4} defaultValue={String(identity.description ?? "")} /></Field>
            <button className="admin-primary" type="submit">Save settings</button>
          </form>
        </section>
      </>
    );
  }

  notFound();
}
