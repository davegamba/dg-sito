import Link from "next/link";

// Banner quiz per la POSIZIONE IN CIMA all'articolo, subito dopo il Succo
// della Guida. Creato il 2026-09-22.
//
// PERCHE' NON USA ArticleCta: in cima e a meta' articolo il lettore vedrebbe
// due card identiche con la stessa foto, e ne salterebbe una. Qui serve una
// striscia orizzontale bassa e senza foto, che si legge come una riga di
// servizio e non come un secondo banner pubblicitario.
//
// PERCHE' DOPO IL SUCCO E NON PRIMA: prima del Succo il lettore non ha ancora
// ricevuto niente e la posizione coincide con lo slot in cui i siti mettono
// le ads (banner blindness). Dopo il Succo la fiducia c'e' gia' ed e' appena
// nata la domanda "ok, ma io?" — che e' esattamente cio' a cui il quiz
// risponde.
//
// Per aggiornare il messaggio ovunque, modifica solo questo file.
export function QuizCtaTop() {
  return (
    <Link
      href="/quiz-fisico"
      className="quiz-cta-top not-prose group my-8 flex flex-col gap-4 rounded-[16px] px-5 py-4 no-underline sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6"
      // Fondo SCURO, non ciano: il Succo della Guida sopra e' gia' un blocco
      // ciano pieno, e due ciani impilati si leggono come un unico blocco —
      // il banner sparisce dentro il Succo. Il nero stacca da entrambi
      // (Succo ciano sopra, sfondo sabbia sotto).
      style={{
        background: "linear-gradient(135deg, #14181a 0%, #0a0d0e 100%)",
        border: "1px solid rgba(0,203,219,0.35)",
      }}
    >
      <div>
        <p
          style={{
            color: "#00CBDB",
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            margin: "0 0 4px",
          }}
        >
          Quiz Gratuito · 2 Minuti
        </p>
        <p
          style={{
            color: "#ffffff",
            fontSize: "1.05rem",
            fontWeight: 800,
            lineHeight: 1.25,
            margin: 0,
          }}
        >
          Questa è la regola generale. Ma qual è la tua?
        </p>
        <p
          style={{
            color: "#c9d1d3",
            fontSize: "0.82rem",
            lineHeight: 1.4,
            margin: "6px 0 0",
          }}
        >
          Sette domande e scopri il tuo profilo, cosa ti sta bloccando e da dove
          ripartire.
        </p>
      </div>

      <span
        style={{ color: "#111111" }}
        className="shrink-0 self-start rounded-[12px] bg-gradient-to-r from-[#FFD84D] to-[#FFA71A] px-6 py-3 text-sm font-extrabold shadow-md transition-colors duration-200 group-hover:from-[#FFE066] group-hover:to-[#FFB733] sm:self-auto"
      >
        Fai il Quiz →
      </span>
    </Link>
  );
}
