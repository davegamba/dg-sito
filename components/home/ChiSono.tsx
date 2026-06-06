
export default function ChiSono() {
  return (
    <section className="py-10 sm:py-14 bg-black gsap-fade">
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>

        {/* Foto + Testo — 50/50, centrati verticalmente */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", flexWrap: "nowrap" }}>

          {/* Foto */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <img
              src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/img_06.jpeg"
              alt="Dave Gamba"
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                objectPosition: "35% 20%",
                borderRadius: "20px",
                boxShadow: "0 20px 56px rgba(0,0,0,0.45)",
              }}
            />
          </div>

          {/* Testo */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: "block", marginBottom: "10px", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#00CBDB" }}>
              About me
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl" style={{ color: "#fff", marginBottom: "20px", lineHeight: 1.2 }}>
              15 anni di trasformazioni fisiche.<br />
              3.000+ clienti.<br />
              <em style={{ color: "#00CBDB", fontStyle: "normal" }}>Un solo metodo.</em>
            </h2>
            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: 0 }}>
              Da oltre 20 anni atleta fitness ed ex agonista sportivo.<br />
              Personal Trainer internazionale certificato ISSA. Intervistato da Corriere della Sera, La Repubblica, Vanity Fair e molti altri come uno dei primi Personal Trainer online in Italia — creando il proprio metodo{" "}
              <strong style={{ color: "#fff" }}>Breve-Intenso-Mirato.</strong>
            </p>
          </div>
        </div>

        {/* Frase metodo */}
        <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginTop: "24px", marginBottom: "4px", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "24px" }}>
          La maggior parte delle persone si allena tanto, senza struttura reale, e si chiede perché non vede risultati.{" "}
          <strong style={{ color: "#fff" }}>Il Metodo Breve Intenso Mirato funziona al contrario:</strong>{" "}
          <span style={{ color: "#00CBDB" }}>meno ore, più intensità, zero esercizi inutili.</span>
        </p>

        {/* Card BIM */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px", marginTop: "28px" }}>
          {[
            { title: "BREVE", body: "Allenamenti condensati nel minor tempo." },
            { title: "INTENSO", body: "Nel fitness, l'intensità batte la quantità." },
            { title: "MIRATO", body: "Ogni esercizio ha uno scopo preciso. Niente fatica a vuoto." },
          ].map((c) => (
            <div key={c.title} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "12px", padding: "14px 16px" }}>
              <div style={{ fontFamily: "var(--font-dm-serif)", fontSize: "1rem", color: "#00CBDB", letterSpacing: "0.04em", marginBottom: "6px" }}>{c.title}</div>
              <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.75)" }}>{c.body}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
