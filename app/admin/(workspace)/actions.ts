"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdminProfile, SECTION_ROLES } from "@/lib/admin-auth";

function textValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function optionalText(formData: FormData, key: string) {
  const value = textValue(formData, key);
  return value || null;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function logAction(
  actorId: string,
  action: string,
  entityType: string,
  entityId?: string | null,
  metadata: Record<string, unknown> = {},
) {
  const supabase = await createClient();
  await supabase.from("audit_logs").insert({
    actor_id: actorId,
    action,
    entity_type: entityType,
    entity_id: entityId ?? null,
    metadata,
  });
}

export async function saveArticle(formData: FormData) {
  const admin = await requireAdminProfile(SECTION_ROLES.content);
  const supabase = await createClient();
  const id = optionalText(formData, "id");
  const title = textValue(formData, "title");
  const slug = slugify(textValue(formData, "slug") || title);
  const status = textValue(formData, "status") || "draft";
  const bodyText = textValue(formData, "body");

  if (!title || !slug) return;

  const payload = {
    title,
    slug,
    excerpt: optionalText(formData, "excerpt"),
    body: { content: bodyText },
    featured_image_url: optionalText(formData, "featured_image_url"),
    seo_title: optionalText(formData, "seo_title"),
    meta_description: optionalText(formData, "meta_description"),
    status,
    published_at: status === "published" ? new Date().toISOString() : null,
  };

  let entityId = id;
  if (id) {
    await supabase.from("articles").update(payload).eq("id", id);
  } else {
    const { data } = await supabase
      .from("articles")
      .insert({ ...payload, author_id: admin.id })
      .select("id")
      .single();
    entityId = data?.id ?? null;
  }

  await logAction(admin.id, id ? "article.updated" : "article.created", "article", entityId, { title, status });
  revalidatePath("/admin");
  revalidatePath("/admin/content");
}

export async function setArticleStatus(formData: FormData) {
  const admin = await requireAdminProfile(SECTION_ROLES.content);
  const supabase = await createClient();
  const id = textValue(formData, "id");
  const status = textValue(formData, "status");

  if (!id || !["draft", "published", "archived"].includes(status)) return;

  await supabase.from("articles").update({
    status,
    published_at: status === "published" ? new Date().toISOString() : null,
  }).eq("id", id);

  await logAction(admin.id, "article.status_changed", "article", id, { status });
  revalidatePath("/admin");
  revalidatePath("/admin/content");
}

export async function saveCategory(formData: FormData) {
  const admin = await requireAdminProfile(SECTION_ROLES.content);
  const supabase = await createClient();
  const name = textValue(formData, "name");
  const slug = slugify(textValue(formData, "slug") || name);
  if (!name || !slug) return;

  const { data } = await supabase
    .from("categories")
    .upsert({ name, slug, description: optionalText(formData, "description") }, { onConflict: "slug" })
    .select("id")
    .single();

  await logAction(admin.id, "category.saved", "category", data?.id, { name });
  revalidatePath("/admin/content");
}

export async function updateMemberStatus(formData: FormData) {
  const admin = await requireAdminProfile(SECTION_ROLES.community);
  const supabase = await createClient();
  const id = textValue(formData, "id");
  const applicationStatus = textValue(formData, "application_status");

  if (!id || !["pending", "approved", "rejected", "needs_info"].includes(applicationStatus)) return;

  await supabase.from("members").update({
    application_status: applicationStatus,
    approved_at: applicationStatus === "approved" ? new Date().toISOString() : null,
  }).eq("id", id);

  await logAction(admin.id, "member.application_status_changed", "member", id, { applicationStatus });
  revalidatePath("/admin");
  revalidatePath("/admin/community");
}

export async function updateMemberVisibility(formData: FormData) {
  const admin = await requireAdminProfile(SECTION_ROLES.community);
  const supabase = await createClient();
  const id = textValue(formData, "id");
  const visibility = textValue(formData, "visibility");
  if (!id || !["public", "members", "private"].includes(visibility)) return;

  await supabase.from("members").update({ visibility }).eq("id", id);
  await logAction(admin.id, "member.visibility_changed", "member", id, { visibility });
  revalidatePath("/admin/community");
}

export async function saveProgram(formData: FormData) {
  const admin = await requireAdminProfile(SECTION_ROLES.programs);
  const supabase = await createClient();
  const id = optionalText(formData, "id");
  const title = textValue(formData, "title");
  const slug = slugify(textValue(formData, "slug") || title);
  const status = textValue(formData, "status") || "draft";
  if (!title || !slug) return;

  const payload = {
    title,
    slug,
    summary: optionalText(formData, "summary"),
    body: { content: textValue(formData, "body") },
    featured_image_url: optionalText(formData, "featured_image_url"),
    status,
    application_open: formData.get("application_open") === "on",
    application_deadline: optionalText(formData, "application_deadline"),
  };

  let entityId = id;
  if (id) {
    await supabase.from("programs").update(payload).eq("id", id);
  } else {
    const { data } = await supabase.from("programs").insert(payload).select("id").single();
    entityId = data?.id ?? null;
  }

  await logAction(admin.id, id ? "program.updated" : "program.created", "program", entityId, { title, status });
  revalidatePath("/admin");
  revalidatePath("/admin/programs");
}

export async function saveEvent(formData: FormData) {
  const admin = await requireAdminProfile(SECTION_ROLES.events);
  const supabase = await createClient();
  const id = optionalText(formData, "id");
  const title = textValue(formData, "title");
  const slug = slugify(textValue(formData, "slug") || title);
  const status = textValue(formData, "status") || "draft";
  if (!title || !slug) return;

  const capacityRaw = textValue(formData, "capacity");
  const capacity = capacityRaw ? Number(capacityRaw) : null;

  const payload = {
    title,
    slug,
    summary: optionalText(formData, "summary"),
    body: { content: textValue(formData, "body") },
    banner_url: optionalText(formData, "banner_url"),
    venue: optionalText(formData, "venue"),
    starts_at: optionalText(formData, "starts_at"),
    ends_at: optionalText(formData, "ends_at"),
    registration_deadline: optionalText(formData, "registration_deadline"),
    capacity: Number.isFinite(capacity) ? capacity : null,
    registration_open: formData.get("registration_open") === "on",
    status,
  };

  let entityId = id;
  if (id) {
    await supabase.from("events").update(payload).eq("id", id);
  } else {
    const { data } = await supabase.from("events").insert(payload).select("id").single();
    entityId = data?.id ?? null;
  }

  await logAction(admin.id, id ? "event.updated" : "event.created", "event", entityId, { title, status });
  revalidatePath("/admin");
  revalidatePath("/admin/events");
}

export async function savePartner(formData: FormData) {
  const admin = await requireAdminProfile(SECTION_ROLES.reports);
  const supabase = await createClient();
  const id = optionalText(formData, "id");
  const name = textValue(formData, "name");
  if (!name) return;

  const payload = {
    name,
    website_url: optionalText(formData, "website_url"),
    logo_url: optionalText(formData, "logo_url"),
    partner_type: optionalText(formData, "partner_type"),
    is_active: formData.get("is_active") === "on",
  };

  let entityId = id;
  if (id) {
    await supabase.from("partners").update(payload).eq("id", id);
  } else {
    const { data } = await supabase.from("partners").insert(payload).select("id").single();
    entityId = data?.id ?? null;
  }

  await logAction(admin.id, id ? "partner.updated" : "partner.created", "partner", entityId, { name });
  revalidatePath("/admin/reports");
}

export async function saveAnnualReport(formData: FormData) {
  const admin = await requireAdminProfile(SECTION_ROLES.reports);
  const supabase = await createClient();
  const year = Number(textValue(formData, "year"));
  const title = textValue(formData, "title");
  const status = textValue(formData, "status") || "draft";
  if (!year || !title) return;

  const { data } = await supabase
    .from("annual_reports")
    .upsert({
      year,
      title,
      summary: optionalText(formData, "summary"),
      file_url: optionalText(formData, "file_url"),
      status,
      published_at: status === "published" ? new Date().toISOString() : null,
    }, { onConflict: "year" })
    .select("id")
    .single();

  await logAction(admin.id, "annual_report.saved", "annual_report", data?.id, { year, title, status });
  revalidatePath("/admin/reports");
}

export async function saveSiteIdentity(formData: FormData) {
  const admin = await requireAdminProfile(SECTION_ROLES.settings);
  const supabase = await createClient();

  const value = {
    name: textValue(formData, "name"),
    shortName: textValue(formData, "short_name"),
    domain: textValue(formData, "domain"),
    tagline: textValue(formData, "tagline"),
    description: textValue(formData, "description"),
  };

  await supabase
    .from("site_settings")
    .upsert({ key: "site_identity", value, updated_by: admin.id }, { onConflict: "key" });

  await logAction(admin.id, "settings.site_identity_updated", "site_settings", "site_identity");
  revalidatePath("/admin/settings");
}
