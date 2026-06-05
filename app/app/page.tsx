import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import AppDashboard from "./AppDashboard";

export default async function AppPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Recupera gli acquisti dell'utente dalla tabella purchases
  const { data: purchases } = await supabase
    .from("purchases")
    .select("product")
    .eq("email", user.email ?? "");

  const unlockedProducts = new Set((purchases ?? []).map((p: { product: string }) => p.product));

  return (
    <AppDashboard
      userEmail={user.email ?? ""}
      unlockedProducts={Array.from(unlockedProducts)}
    />
  );
}
