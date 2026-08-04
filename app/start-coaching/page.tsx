export const metadata = {
  title: "Start Coaching — Dave Gamba",
  robots: { index: false, follow: false },
};

export default function StartCoachingPage() {
  return (
    <div style={{ background: "#F5F1EB", minHeight: "100vh", padding: "56px 20px 80px" }}>
      <div
        style={{
          maxWidth: 640,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 20,
          padding: "40px 32px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}
      >
        <h1
          className="font-serif"
          style={{ fontSize: "clamp(28px,5vw,36px)", color: "#0a0a0a", marginBottom: 6, lineHeight: 1.2 }}
        >
          Iniziamo il Coaching!
        </h1>
        <p style={{ fontSize: 20, fontWeight: 700, color: "#555", marginBottom: 28 }}>Da sapere prima di cominciare</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, fontSize: 16, lineHeight: 1.7, color: "#222" }}>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16, padding: 0, margin: 0 }}>
            <li style={{ display: "flex", gap: 12 }}>
              <span style={{ flexShrink: 0, width: 8, height: 8, marginTop: 8, background: "#00CBDB", borderRadius: 2 }} />
              <span><strong>Le giornate A e B</strong> sono da alternare ogni giorno per adesso.</span>
            </li>
            <li style={{ display: "flex", gap: 12 }}>
              <span style={{ flexShrink: 0, width: 8, height: 8, marginTop: 8, background: "#00CBDB", borderRadius: 2 }} />
              <span>Puoi <strong>invertire i Pranzi con le Cene</strong> per tua comodità se vuoi.</span>
            </li>
            <li style={{ display: "flex", gap: 12 }}>
              <span style={{ flexShrink: 0, width: 8, height: 8, marginTop: 8, background: "#00CBDB", borderRadius: 2 }} />
              <span>Avrai <strong>un pasto libero a settimana</strong>, di solito il sabato sera (ma puoi invertirlo con altre giornate del planning se vuoi). Potrai mangiare carboidrati a piacere come pasta, pane, pizza, riso, risotto, ecc.</span>
            </li>
            <li style={{ display: "flex", gap: 12 }}>
              <span style={{ flexShrink: 0, width: 8, height: 8, marginTop: 8, background: "#00CBDB", borderRadius: 2 }} />
              <span><strong>Fare il CHECK</strong> ogni sabato mattina appena sveglio, prima di colazione (e prima dello sgarro, mi raccomando). Prenderai misure, peso e se riesci foto a figura intera.</span>
            </li>
            <li style={{ display: "flex", gap: 12 }}>
              <span style={{ flexShrink: 0, width: 8, height: 8, marginTop: 8, background: "#00CBDB", borderRadius: 2 }} />
              <span>Clicca ogni giorno sul tasto <strong>Aggiorna</strong> dell&apos;app in alto nella tua home, per avere i piani e l&apos;app sempre aggiornati in caso di cambiamenti.</span>
            </li>
            <li style={{ display: "flex", gap: 12 }}>
              <span style={{ flexShrink: 0, width: 8, height: 8, marginTop: 8, background: "#00CBDB", borderRadius: 2 }} />
              <span>Accedi sempre qui ai tuoi piani coaching: <a href="https://piano.davegamba.com" style={{ color: "#00CBDB", fontWeight: 700, textDecoration: "underline" }}>piano.davegamba.com</a>, usando il codice personale che ti ho dato (DG-XXX).</span>
            </li>
          </ul>

          <img
            src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/aggiorna-app-coach.jpg"
            alt="Aggiorna l'app per avere i piani sempre aggiornati"
            style={{ width: "100%", height: "auto", borderRadius: 14 }}
          />

          <div>
            <p style={{ marginBottom: 12 }}>Una volta dentro, crea l&apos;icona dell&apos;app seguendo così:</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, padding: 0, margin: "0 0 20px" }}>
              <li style={{ display: "flex", gap: 12 }}>
                <span style={{ flexShrink: 0, width: 8, height: 8, marginTop: 8, background: "#00CBDB", borderRadius: 2 }} />
                <span>Clicca sul tasto <strong>condividi</strong> accanto al link nel browser.</span>
              </li>
              <li style={{ display: "flex", gap: 12 }}>
                <span style={{ flexShrink: 0, width: 8, height: 8, marginTop: 8, background: "#00CBDB", borderRadius: 2 }} />
                <span>Clicca su <strong>&ldquo;Aggiungi a Home&rdquo;</strong>.</span>
              </li>
              <li style={{ display: "flex", gap: 12 }}>
                <span style={{ flexShrink: 0, width: 8, height: 8, marginTop: 8, background: "#00CBDB", borderRadius: 2 }} />
                <span>Clicca <strong>Aggiungi</strong>.</span>
              </li>
            </ul>

            <img
              src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/icona-coaching.jpg"
              alt="Come creare l'icona dell'app"
              style={{ width: "100%", height: "auto", borderRadius: 14 }}
            />
          </div>

          <a
            href="https://piano.davegamba.com"
            style={{
              display: "block",
              textAlign: "center",
              background: "#00CBDB",
              color: "#0a0a0a",
              fontWeight: 800,
              fontSize: 20,
              padding: "22px 24px",
              borderRadius: 16,
              textDecoration: "none",
            }}
          >
            Al tuo Piano →
          </a>
        </div>
      </div>
    </div>
  );
}
