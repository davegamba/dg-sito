import { createServerSupabaseClient } from "@/lib/supabase-server";
import AppDashboard from "./AppDashboard";

export default async function AppPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  let unlockedProducts: string[] = [];

  if (user) {
    const { data: purchases } = await supabase
      .from("purchases")
      .select("product")
      .eq("email", user.email ?? "");

    unlockedProducts = (purchases ?? []).map((p: { product: string }) => p.product);
  }

  return (
    <AppDashboard
      userEmail={user?.email ?? ""}
      unlockedProducts={unlockedProducts}
    />
  );
}
