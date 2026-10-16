"use client";

import { CONSENT_REOPEN_EVENT } from "@/lib/consent";

// Riapre il banner cookie per cambiare o revocare la scelta.
export default function CookiePrefsLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(CONSENT_REOPEN_EVENT))}
    >
      Preferenze cookie
    </button>
  );
}
