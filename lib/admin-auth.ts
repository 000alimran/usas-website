import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AdminRole =
  | "super_admin"
  | "admin"
  | "editor"
  | "membership_manager"
  | "event_manager"
  | "program_manager"
  | "finance"
  | "contributor";

export const STAFF_ROLES: AdminRole[] = [
  "super_admin",
  "admin",
  "editor",
  "membership_manager",
  "event_manager",
  "program_manager",
  "finance",
  "contributor",
];

export const SECTION_ROLES: Record<string, AdminRole[]> = {
  content: ["super_admin", "admin", "editor", "contributor"],
  community: ["super_admin", "admin", "membership_manager"],
  programs: ["super_admin", "admin", "program_manager"],
  events: ["super_admin", "admin", "event_manager"],
  reports: ["super_admin", "admin", "finance"],
  settings: ["super_admin", "admin"],
};

export async function getAdminProfile() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, avatar_url, role")
    .eq("id", user.id)
    .single();

  if (!profile || !STAFF_ROLES.includes(profile.role as AdminRole)) return null;

  return {
    id: profile.id as string,
    fullName: (profile.full_name as string | null) || user.email || "USAS Team",
    avatarUrl: profile.avatar_url as string | null,
    role: profile.role as AdminRole,
    email: user.email || "",
  };
}

export async function requireAdminProfile(roles?: AdminRole[]) {
  const profile = await getAdminProfile();

  if (!profile) redirect("/admin/login?error=unauthorized");
  if (roles && !roles.includes(profile.role)) redirect("/admin?error=forbidden");

  return profile;
}

export function roleLabel(role: AdminRole) {
  return role.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}
