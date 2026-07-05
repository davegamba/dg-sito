export default function ClubPrestoPage() {
  return (
    <div
      style={{
        background: "#0A0A0A",
        color: "#ECEEF0",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 22px",
        fontFamily: "var(--font-dm-sans), sans-serif",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 480, width: "100%" }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: ".2em",
            color: "#00C8DB",
            textTransform: "uppercase",
            marginBottom: 18,
          }}
        >
          Sta per aprire
        </div>

        <h1
          style={{
            fontFamily: "var(--font-dm-serif), sans-serif",
            fontWeight: 700,
            fontSize: "clamp(34px, 9vw, 48px)",
            lineHeight: 1.05,
            letterSpacing: ".02em",
            marginBottom: 20,
          }}
        >
          DG Athletic Club
        </h1>

        <p style={{ fontSize: 18, lineHeight: 1.6, color: "#ECEEF0", marginBottom: 24 }}>
          Manca pochissimo.
        </p>

        <p style={{ fontSize: 15, lineHeight: 1.7, color: "#9AA0A6", marginBottom: 30 }}>
          Un percorso di 12 mesi per un corpo atletico — asciutto, scolpito, funzionale.
          <br />
          Con il metodo Breve-Intenso-Mirato.
          <br />
          Per casa e palestra.
        </p>

        <div
          style={{
            marginTop: 4,
            fontSize: 13,
            color: "#5F6469",
            lineHeight: 1.5,
          }}
        >
          Sali di livello,
          <br />
          <span style={{ color: "#9AA0A6", fontWeight: 600 }}>Dave</span>
        </div>
      </div>
    </div>
  );
}
