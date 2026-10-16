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
            "DG Athletic Club — abbonamento mensile o annuale all'app con allenamenti, video e strumenti",
            "Coaching personale — percorsi individuali concordati direttamente con il cliente",
            "Contenuti gratuiti — quiz, calcolatori e guide accessibili previa registrazione",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-[#888888]">
              <span className="text-[#00CBDB] mt-0.5 flex-shrink-0">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">I programmi a durata definita valgono per il periodo indicato nella pagina di vendita. Tutti i prodotti digitali sono erogati esclusivamente in formato online. Non sono previste consegne fisiche.</p>
      </>
    ),
  },
  {
    title: "3. Prezzi e pagamenti",
    content: (
      <>
        <p>I prezzi indicati sono in euro (€) e comprensivi di IVA ove applicabile. I pagamenti vengono elaborati in modo sicuro tramite <strong className="text-[#F0F0F0]">Stripe</strong>. Accettiamo carte di credito/debito e altri metodi disponibili su Stripe. L&apos;accesso al prodotto acquistato viene attivato immediatamente dopo la conferma del pagamento.</p>
        <p><strong className="text-[#F0F0F0]">Abbonamenti.</strong> Il DG Athletic Club si rinnova automaticamente alla scadenza di ogni periodo (mensile o annuale), al prezzo indicato al momento dell&apos;acquisto, finché non lo disdici. Puoi disdire in qualsiasi momento scrivendo a <a href="mailto:info@davegamba.com" className="text-[#00CBDB] hover:underline">info@davegamba.com</a>. La disdetta ferma i rinnovi successivi e mantieni l&apos;accesso fino alla fine del periodo già pagato.</p>
      </>
    ),
  },
  {
    title: "4. Diritto di recesso",
    content: (
      <>
        <p>Se acquisti come consumatore hai <strong className="text-[#F0F0F0]">14 giorni di tempo per recedere</strong> dal contratto, senza dover spiegare il motivo (artt. 52 e seguenti del D.Lgs. 206/2005, Codice del Consumo). Per farlo scrivi a <a href="mailto:info@davegamba.com" className="text-[#00CBDB] hover:underline">info@davegamba.com</a>.</p>
        <p><strong className="text-[#F0F0F0]">Contenuti digitali.</strong> Il recesso non si applica ai contenuti digitali non forniti su supporto materiale se l&apos;esecuzione è iniziata con il tuo consenso espresso e la tua accettazione di perdere il diritto di recesso, dati prima dell&apos;acquisto (art. 59, lett. o, Codice del Consumo). In mancanza di questo consenso e di questa accettazione, il diritto di recesso resta valido.</p>
        <p><strong className="text-[#F0F0F0]">DG Athletic Club (abbonamento).</strong> Il Club ha un periodo di prova gratuita, pensato per farti valutare il servizio prima del primo pagamento: se disdici durante la prova non paghi nulla. Dopo il primo pagamento non rimborsiamo i periodi già pagati: puoi disdire in qualsiasi momento e mantieni l&apos;accesso fino alla fine del periodo in corso. Restano ferme le tutele che la legge ti riconosce come consumatore.</p>
        <p><strong className="text-[#F0F0F0]">Altri servizi (coaching).</strong> Se chiedi di iniziare subito il servizio e poi recedi entro 14 giorni, ti rimborsiamo quanto hai pagato meno la parte già ricevuta, calcolata in proporzione (art. 57 Codice del Consumo). Il rimborso avviene entro 14 giorni dal recesso, con lo stesso metodo di pagamento usato per l&apos;acquisto.</p>
      </>
    ),
  },
  {
    title: "5. Rimborsi oltre il recesso",
    content: (
      <>
        <p>Oltre ai diritti di legge, valutiamo ogni richiesta di rimborso caso per caso. Se ritieni che il prodotto non corrisponda a quanto descritto, scrivici entro <strong className="text-[#F0F0F0]">7 giorni dall&apos;acquisto</strong> a <a href="mailto:info@davegamba.com" className="text-[#00CBDB] hover:underline">info@davegamba.com</a> con la tua motivazione.</p>
        <p>Non vengono effettuati rimborsi volontari dopo l&apos;accesso ai contenuti per motivazioni come mancanza di tempo o cambio di intenzioni, fermi restando i tuoi diritti di legge.</p>
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
        <p>Dave Gamba non è responsabile per danni fisici derivanti dall&apos;uso improprio dei programmi acquistati. Nessuna clausola di questi Termini esclude o limita i diritti che la legge ti riconosce come consumatore.</p>
        <p><strong className="text-[#F0F0F0]">Garanzia legale.</strong> Per i contenuti e i servizi digitali acquistati come consumatore vale la garanzia legale di conformità (artt. 135-octies e seguenti del Codice del Consumo). Se un contenuto non funziona o non corrisponde a quanto descritto, scrivi a <a href="mailto:info@davegamba.com" className="text-[#00CBDB] hover:underline">info@davegamba.com</a>.</p>
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
  {
    id: "immagini-ia",
    title: "10. Immagini generate con intelligenza artificiale",
    content: (
      <>
        <p>Alcune immagini di copertina degli articoli del blog sono <strong className="text-[#F0F0F0]">generate con strumenti di intelligenza artificiale</strong>. Lo dichiariamo per scelta di trasparenza.</p>
        <p>Due precisazioni importanti:</p>
        <ul className="space-y-2 mt-1">
          {[
            "Le persone raffigurate in queste immagini non esistono: sono soggetti creati artificialmente. Non ritraggono Dave Gamba, né clienti, né alcuna persona reale.",
            "Le immagini hanno funzione puramente illustrativa. Non documentano risultati, trasformazioni fisiche o casi reali.",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-[#888888]">
              <span className="text-[#00CBDB] mt-0.5 flex-shrink-0">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">Quando un&apos;immagine ritrae Dave Gamba o persone reali si tratta di fotografie autentiche, non generate né alterate artificialmente.</p>
        <p>Per quanto riguarda i testi, l&apos;intelligenza artificiale può essere impiegata come supporto nella stesura, ma ogni articolo è sottoposto a revisione umana e pubblicato sotto la responsabilità editoriale di Dave Gamba, che ne verifica contenuti e fonti scientifiche.</p>
      </>
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
          <p className="text-[#444444] text-sm mb-16">Ultimo aggiornamento: 16 ottobre 2026</p>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((s) => (
              <div key={s.title} id={s.id} className="p-6 rounded-2xl border border-[#1e1e2e] bg-[#0d0d14] scroll-mt-28">
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
