"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function activateFirstAdmin(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect("/admin/setup?error=missing");
  }

  const supabase = await createClient();

  let userId: string | null = null;

  const signIn = await supabase.auth.signInWithPassword({ email, password });

  if (!signIn.error && signIn.data.user) {
    userId = signIn.data.user.id;
  } else {
    const signUp = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "/admin/setup",
      },
    });

    if (signUp.error || !signUp.data.user) {
      redirect("/admin/setup?error=auth");
    }

    if (!signUp.data.session) {
      redirect("/admin/setup?status=confirm-email");
    }

    userId = signUp.data.user.id;
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .update({ role: "super_admin" })
    .eq("id", userId)
    .eq("role", "member")
    .select("role")
    .single();

  if (error || profile?.role !== "super_admin") {
    await supabase.auth.signOut();
    redirect("/admin/setup?error=locked");
  }

  redirect("/admin");
}
