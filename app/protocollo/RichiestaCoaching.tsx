import Link from "next/link";

// Porta secondaria verso il coaching: piu' piccola e sobria del riquadro del Club.
export default function RichiestaCoaching() {
  return (
    <div
      className="rounded-2xl"
      style={{ border: "1.5px solid #F0C040", background: "#080C0F", padding: "18px 20px" }}
    >
      <div className="card-title" style={{ fontSize: "1.45rem" }}>
        Vuoi essere seguito/a personalmente da Dave?
      </div>
      <p style={{ fontSize: "0.85rem", lineHeight: 1.5, color: "rgba(255,255,255,0.65)", margin: "0 0 14px" }}>
        Compila il questionario per avere un&apos;analisi e parlarne con Dave.
      </p>
      <Link
        href="/coaching/candidati"
        className="block text-center rounded-xl"
        style={{ border: "1.5px solid #F0C040", color: "#F0C040", fontWeight: 600, fontSize: "0.85rem", padding: "11px 14px", textDecoration: "none" }}
      >
        Richiedi l&apos;analisi →
      </Link>
    </div>
  );
}
