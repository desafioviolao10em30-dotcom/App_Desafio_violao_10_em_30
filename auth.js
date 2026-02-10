import { supabase } from "./supabase.js";

export async function requireAdmin() {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    throw new Error("Usuário não autenticado");
  }

  const user = data.user;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || profile.role !== "admin") {
    throw new Error("Acesso negado");
  }

  return user;
}
