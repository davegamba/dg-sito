"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";

// Gestisce il caso in cui Supabase invia il token come hash fragment (#access_token=...)
// Il server non può leggere i hash, quindi lo gestiamo lato client
export default function AuthConfirmPage() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    // Supabase processa automaticamente il hash fragment alla creazione del client
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/club");
      } else {
        // Ascolta il cambio di stato auth (hash processato in modo asincrono)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          if (session) {
            subscription.unsubscribe();
            router.replace("/club");
          }
        });

        // Timeout di sicurezza — se dopo 5s non c'è sessione, torna al login
        setTimeout(() => {
          subscription.unsubscribe();
          router.replace("/login?error=expired");
        }, 5000);
      }
    });
  }, [router]);

  return (
    <div style={{
      minHeight: "100dvh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#080810",
      fontFamily: "'DM Sans', sans-serif",
      color: "#888",
      fontSize: "15px",
    }}>
      Accesso in corso...
    </div>
  );
}
