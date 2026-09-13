// Crea (o ritrova) un contatto su Systeme.io e gli assegna un tag.
//
// Due cose imparate a caro prezzo, non "semplificare":
// 1. Il nome va dentro `fields` con slug `first_name`. Un `firstName` al primo
//    livello viene ignorato in silenzio, senza errore.
// 2. Qui NON si assegna mai `nurture-attivo`. Quel tag accende il Funnel SOS,
//    che vende il Club a €19: non ha senso per chi si candida a un coaching da
//    €920 o l'ha gia' comprato.

const API = "https://api.systeme.io/api";

export const TAG_LEAD_COACHING = 2176329;
export const TAG_COACHING_ACQUIRENTE = 2064450;

export async function aggiungiASysteme(email: string, nome: string, tagId: number) {
  const key = process.env.SYSTEME_API_KEY;
  if (!key) {
    console.error("[systeme] SYSTEME_API_KEY mancante");
    return;
  }

  const headers = {
    "X-API-Key": key,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // "Mario Rossi" → first_name "Mario", surname "Rossi"
  const pulito = (nome || "").trim().replace(/\s+/g, " ");
  const [primo, ...resto] = pulito ? pulito.split(" ") : [];
  const fields: { slug: string; value: string }[] = [];
  if (primo) fields.push({ slug: "first_name", value: primo });
  if (resto.length) fields.push({ slug: "surname", value: resto.join(" ") });

  try {
    let contactId: number | null = null;
    let nuovo = false;

    const createRes = await fetch(`${API}/contacts`, {
      method: "POST",
      headers,
      body: JSON.stringify(fields.length ? { email, locale: "it", fields } : { email, locale: "it" }),
    });
    if (createRes.ok) {
      try {
        contactId = (await createRes.json()).id;
        nuovo = true;
      } catch { /* corpo non parsabile: lo ritroviamo per email sotto */ }
    }

    // 422/409 = contatto gia' esistente, non e' un errore
    if (!contactId) {
      const findRes = await fetch(`${API}/contacts?email=${encodeURIComponent(email)}`, { headers });
      if (findRes.ok) contactId = ((await findRes.json()).items || [])[0]?.id ?? null;
    }
    if (!contactId) throw new Error("contactId non trovato");

    // Esisteva gia': la POST non ha scritto il nome, serve una PATCH
    if (!nuovo && fields.length) {
      await fetch(`${API}/contacts/${contactId}`, {
        method: "PATCH",
        headers: { ...headers, "Content-Type": "application/merge-patch+json" },
        body: JSON.stringify({ fields }),
      });
    }

    await fetch(`${API}/contacts/${contactId}/tags`, {
      method: "POST",
      headers,
      body: JSON.stringify({ tagId }),
    });
  } catch (e) {
    // Best-effort: se Systeme non risponde, la candidatura su Supabase resta valida
    console.error("[systeme] errore:", e);
  }
}
