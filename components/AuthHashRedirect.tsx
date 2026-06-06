"use client";

import { useEffect } from "react";

/**
 * Intercetta i link di recovery/magic link di Supabase che atterrano
 * sulla homepage (hash fragment) e li redirige a /auth/confirm.
 * Supabase invia sempre i token all'hash del Site URL — noi li catturiamo qui.
 */
export default function AuthHashRedirect() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (!hash) return;

    const params = new URLSearchParams(hash.replace("#", ""));
    const type = params.get("type");
    const accessToken = params.get("access_token");

    if (accessToken && (type === "recovery" || type === "magiclink" || type === "signup")) {
      window.location.replace("/auth/confirm" + hash);
    }
  }, []);

  return null;
}
