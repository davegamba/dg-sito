import Link from "next/link";
import { LEZIONI, hrefLezione } from "@/lib/lezioni";

// Contenitore bianco come l'elenco di Hormozi. Sempre aperto: su desktop sta nella
// colonna a sinistra, su telefono compare dentro ProssimaConElenco.
export default function ElencoLezioni({ corrente }: { corrente: number }) {
  return (
    <nav
      aria-label="Lezioni del corso"
      style={{ background: "#fff", borderRadius: 24, boxShadow: "0 10px 40px rgba(8,12,15,0.12)", border: "1px solid rgba(8,12,15,0.06)", padding: "20px 14px 14px" }}
    >
      <div style={{ padding: "0 8px" }}>
        <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#0099a8" }}>Il Protocollo</span>
      </div>

      <ol className="flex flex-col gap-1 mt-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {LEZIONI.map((l) => {
          const attiva = l.numero === corrente;
          return (
            <li key={l.slug}>
              <Link
                href={hrefLezione(l)}
                aria-current={attiva ? "page" : undefined}
                className="flex items-center gap-3 px-2.5 py-2.5 transition-colors"
                style={{
                  background: attiva ? "rgba(0,203,219,0.12)" : "transparent",
                  borderLeft: `3px solid ${attiva ? "#00CBDB" : "transparent"}`,
                  borderRadius: 12,
                  textDecoration: "none",
                }}
              >
                <span
                  className="shrink-0 flex items-center justify-center rounded-full text-xs font-bold"
                  style={{ width: 32, height: 32, background: attiva ? "#00CBDB" : "#eef0f1", color: attiva ? "#000" : "#5f666b" }}
                >
                  {l.numero}
                </span>
                <span className="text-sm leading-snug" style={{ color: "#0a0a0a", fontWeight: attiva ? 700 : 500 }}>
                  {l.titolo}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
