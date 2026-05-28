import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Termini e Condizioni — Dave Gamba",
  description: "Termini e condizioni di utilizzo dei servizi e prodotti di Dave Gamba.",
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "1. Informazioni sul venditore",
    content: (
      <>
        <p><strong className="text-[#F0F0F0]">Dave Gamba</strong> (P.IVA 09230900962)<br />
        Via della Moscova 50 – 20100 Milano (MI), Italia<br />
        Email: <a href="mailto:info@davegamba.com" className="text-[#00CBDB] hover:underline">info@davegamba.com</a></p>
      </>
    ),
  },
  {
    title: "2. Prodotti e servizi",
    content: (
      <>
        <ul className="space-y-2">
          {[
            "Programmi di allenamento digitali — contenuti video e PDF accessibili online dopo l'acquisto",
            "Sfide a tempo determinato — programmi con durata definita (es. 21 giorni)",
            "Coaching personale — percorsi individuali concordati direttamente con il cliente",
            "Contenuti gratuiti — quiz, calcolatori e guide accessibili previa registrazione",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-[#888888]">
              <span className="text-[#00CBDB] mt-0.5 flex-shrink-0">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">Tutti i prodotti digitali sono erogati esclusivamente in formato online. Non sono previste consegne fisiche.</p>
      </>
    ),
  },
  {
    title: "3. Prezzi e pagamenti",
    content: (
      <p>I prezzi indicati sono in euro (€) e comprensivi di IVA ove applicabile. I pagamenti vengono elaborati in modo sicuro tramite <strong className="text-[#F0F0F0]">Stripe</strong>. Accettiamo carte di credito/debito e altri metodi disponibili su Stripe. L&apos;accesso al prodotto acquistato viene attivato immediatamente dopo la conferma del pagamento.</p>
    ),
  },
  {
    title: "4. Diritto di recesso",
    content: (
      <>
        <p>Ai sensi dell&apos;art. 59 del D.Lgs. 206/2005 (Codice del Consumo), <strong className="text-[#F0F0F0]">il diritto di recesso non si applica</strong> ai contenuti digitali la cui esecuzione è iniziata con il consenso espresso del consumatore prima della scadenza del periodo di recesso.</p>
        <p>Accedendo al contenuto digitale acquistato, l&apos;utente acconsente espressamente all&apos;esecuzione immediata del contratto e riconosce la perdita del diritto di recesso.</p>
        <p>Per i servizi di coaching personale non ancora avviati, è possibile richiedere il rimborso entro 14 giorni dall&apos;acquisto scrivendo a <a href="mailto:info@davegamba.com" className="text-[#00CBDB] hover:underline">info@davegamba.com</a>.</p>
      </>
    ),
  },
  {
    title: "5. Rimborsi",
    content: (
      <>
        <p>Valutiamo ogni richiesta di rimborso caso per caso. Se ritieni che il prodotto non corrisponda a quanto descritto, scrivici entro <strong className="text-[#F0F0F0]">7 giorni dall&apos;acquisto</strong> a <a href="mailto:info@davegamba.com" className="text-[#00CBDB] hover:underline">info@davegamba.com</a> con la tua motivazione.</p>
        <p>Non vengono effettuati rimborsi dopo l&apos;accesso ai contenuti o per motivazioni quali mancanza di tempo o cambio di intenzioni.</p>
      </>
    ),
  },
  {
    title: "6. Proprietà intellettuale",
    content: (
      <>
        <p>Tutti i contenuti — video, testi, immagini, programmi di allenamento, metodologie — sono di proprietà esclusiva di Dave Gamba e protetti dalla normativa sul diritto d&apos;autore.</p>
        <p>È <strong className="text-[#F0F0F0]">vietato</strong> riprodurre, distribuire, condividere o rivendere i contenuti acquistati senza autorizzazione scritta. L&apos;acquisto dà diritto al solo uso personale.</p>
      </>
    ),
  },
  {
    title: "7. Limitazione di responsabilità",
    content: (
      <>
        <p>I programmi di allenamento e i consigli nutrizionali forniti sono di natura generale e non sostituiscono il parere di un medico o specialista. Prima di iniziare qualsiasi programma di allenamento è consigliabile consultare un medico, specialmente in presenza di condizioni di salute particolari.</p>
        <p>Dave Gamba non è responsabile per danni fisici derivanti dall&apos;uso improprio dei programmi acquistati.</p>
      </>
    ),
  },
  {
    title: "8. Legge applicabile e foro competente",
    content: (
      <p>I presenti Termini e Condizioni sono regolati dalla legge italiana. Per qualsiasi controversia derivante dall&apos;acquisto dei nostri prodotti, il foro competente è quello di <strong className="text-[#F0F0F0]">Milano</strong>, salvo diversa previsione di legge a tutela del consumatore.</p>
    ),
  },
  {
    title: "9. Modifiche ai termini",
    content: (
      <p>Ci riserviamo il diritto di modificare i presenti Termini e Condizioni in qualsiasi momento. Le modifiche sostanziali saranno comunicate con congruo preavviso. L&apos;uso continuato del servizio dopo la notifica delle modifiche costituisce accettazione dei nuovi termini.</p>
    ),
  },
];

export default function TerminiPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#080810] pt-24 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          {/* Back */}
          <Link href="/" className="inline-flex items-center gap-2 text-[#00CBDB] text-xs font-semibold uppercase tracking-widest mb-12 hover:opacity-70 transition-opacity">
            ← Torna alla home
          </Link>

          {/* Header */}
          <p className="text-[#00CBDB] text-xs font-semibold uppercase tracking-widest mb-3">
            Documento legale
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#F0F0F0] mb-3">Termini e Condizioni</h1>
          <p className="text-[#444444] text-sm mb-16">Ultimo aggiornamento: maggio 2025</p>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((s) => (
              <div key={s.title} className="p-6 rounded-2xl border border-[#1e1e2e] bg-[#0d0d14]">
                <h2 className="text-[#00CBDB] text-xs font-semibold uppercase tracking-wider mb-4">{s.title}</h2>
                <div className="text-sm text-[#888888] leading-relaxed space-y-3">
                  {s.content}
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <p className="mt-12 text-center text-xs text-[#444444]">
            Per qualsiasi dubbio: <a href="mailto:info@davegamba.com" className="text-[#00CBDB] hover:underline">info@davegamba.com</a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
