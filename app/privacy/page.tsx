import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Dave Gamba",
  description: "Informativa sulla privacy ai sensi dell'art. 13 Reg. UE n. 679/2016.",
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "1. Titolare del trattamento",
    content: (
      <>
        <p><strong className="text-[#F0F0F0]">Dave Gamba</strong> (P.IVA 09230900962)<br />
        Via della Moscova 50 – 20100 Milano (MI), Italia</p>
        <p>Email: <a href="mailto:info@davegamba.com" className="text-[#00CBDB] hover:underline">info@davegamba.com</a><br />
        Sito: <a href="https://davegamba.com" className="text-[#00CBDB] hover:underline">davegamba.com</a></p>
      </>
    ),
  },
  {
    title: "2. Dati raccolti",
    content: (
      <>
        <p>Quando utilizzi i nostri servizi raccogliamo i seguenti dati personali:</p>
        <ul className="mt-3 space-y-2">
          {[
            "Nome e indirizzo email — forniti volontariamente tramite i moduli di iscrizione, acquisto o richiesta di coaching",
            "Dati di navigazione — indirizzo IP, tipo di browser, pagine visitate, durata della sessione (raccolti automaticamente tramite Google Analytics)",
            "Dati di acquisto — gestiti direttamente da Stripe; non conserviamo dati di pagamento sui nostri server",
            "Log di sistema — file tecnici registrati durante la navigazione per finalità di manutenzione e sicurezza",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-[#888888]">
              <span className="text-[#00CBDB] mt-0.5 flex-shrink-0">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">Tutti i dati richiesti sono necessari per erogare il servizio. Il rifiuto a fornirli potrebbe rendere impossibile l&apos;accesso ai contenuti richiesti.</p>
      </>
    ),
  },
  {
    title: "3. Finalità del trattamento",
    content: (
      <ul className="space-y-2">
        {[
          "Invio di comunicazioni email con contenuti formativi, offerte e aggiornamenti (con tuo consenso)",
          "Erogazione dei servizi acquistati e gestione dell'accesso ai contenuti",
          "Gestione di richieste di informazioni e candidature al coaching",
          "Analisi statistica anonima per migliorare l'esperienza del sito",
          "Adempimento di obblighi di legge e difesa in giudizio",
        ].map((item, i) => (
          <li key={i} className="flex gap-2 text-sm text-[#888888]">
            <span className="text-[#00CBDB] mt-0.5 flex-shrink-0">▸</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "4. Base giuridica",
    content: (
      <ul className="space-y-2">
        {[
          "Consenso (art. 6.1.a GDPR) — per l'invio di comunicazioni email di marketing",
          "Esecuzione del contratto (art. 6.1.b GDPR) — per l'erogazione dei servizi acquistati",
          "Obbligo legale (art. 6.1.c GDPR) — per adempimenti fiscali e normativi",
          "Legittimo interesse (art. 6.1.f GDPR) — per analisi statistiche anonime, sicurezza del sito e difesa in giudizio",
        ].map((item, i) => (
          <li key={i} className="flex gap-2 text-sm text-[#888888]">
            <span className="text-[#00CBDB] mt-0.5 flex-shrink-0">▸</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "5. Terze parti e responsabili del trattamento",
    content: (
      <>
        <p>I tuoi dati possono essere condivisi con i seguenti servizi terzi:</p>
        <ul className="mt-3 space-y-2">
          {[
            { name: "Supabase", desc: "database per la gestione dei lead e degli acquisti, server UE", href: "https://supabase.com/privacy" },
            { name: "Stripe", desc: "elaborazione dei pagamenti", href: "https://stripe.com/it/privacy" },
            { name: "Google Analytics", desc: "analisi del traffico web", href: "https://policies.google.com/privacy" },
            { name: "Meta (Facebook)", desc: "pixel di monitoraggio per campagne pubblicitarie", href: "https://www.facebook.com/privacy/policy/" },
            { name: "Netlify", desc: "hosting di alcune pagine del sito", href: "https://www.netlify.com/privacy/" },
          ].map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-[#888888]">
              <span className="text-[#00CBDB] mt-0.5 flex-shrink-0">▸</span>
              <span><strong className="text-[#F0F0F0]">{item.name}</strong> — {item.desc} (<a href={item.href} target="_blank" rel="noopener noreferrer" className="text-[#00CBDB] hover:underline">privacy policy</a>)</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">Nessun dato viene venduto a terzi.</p>
      </>
    ),
  },
  {
    title: "6. Trasferimento dati extra-UE",
    content: (
      <>
        <p>Alcuni fornitori terzi (es. Stripe, Google, Meta) potrebbero trasferire dati verso Paesi extra-UE. In tali casi il trasferimento avviene in conformità agli artt. 44 e seguenti del GDPR, sulla base di decisioni di adeguatezza della Commissione Europea o clausole contrattuali standard approvate.</p>
        <p>Puoi richiedere informazioni sulle garanzie adottate contattando il Titolare.</p>
      </>
    ),
  },
  {
    title: "7. Conservazione dei dati",
    content: (
      <ul className="space-y-2">
        {[
          "Dati forniti per newsletter e contenuti gratuiti: conservati fino alla tua richiesta di cancellazione",
          "Dati relativi agli acquisti: conservati per il periodo previsto dalla normativa fiscale italiana (10 anni)",
          "Dati di navigazione (Google Analytics): anonimizzati, conservati per 14 mesi",
        ].map((item, i) => (
          <li key={i} className="flex gap-2 text-sm text-[#888888]">
            <span className="text-[#00CBDB] mt-0.5 flex-shrink-0">▸</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "8. I tuoi diritti (GDPR)",
    content: (
      <>
        <p>Puoi esercitare i seguenti diritti in qualsiasi momento scrivendo a <a href="mailto:info@davegamba.com" className="text-[#00CBDB] hover:underline">info@davegamba.com</a>. Risponderemo entro <strong className="text-[#F0F0F0]">30 giorni</strong>, gratuitamente:</p>
        <ul className="mt-3 space-y-2">
          {[
            "Accesso — ricevere copia dei tuoi dati personali trattati",
            "Rettifica — correggere dati inesatti o incompleti",
            "Cancellazione — richiedere la rimozione dei tuoi dati (\"diritto all'oblio\")",
            "Limitazione — limitare il trattamento in determinate circostanze",
            "Portabilità — ricevere i tuoi dati in formato strutturato e leggibile da macchina",
            "Opposizione — opporti al trattamento per finalità di marketing diretto in qualsiasi momento",
            "Revoca del consenso — senza pregiudicare la liceità del trattamento precedente",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-[#888888]">
              <span className="text-[#00CBDB] mt-0.5 flex-shrink-0">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">Hai il diritto di proporre reclamo al <strong className="text-[#F0F0F0]">Garante per la Protezione dei Dati Personali</strong> (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-[#00CBDB] hover:underline">garanteprivacy.it</a>).</p>
      </>
    ),
  },
  {
    title: "9. Cookie e tecnologie di tracciamento",
    content: (
      <>
        <ul className="space-y-2">
          {[
            "Cookie tecnici — necessari al funzionamento del sito (localStorage per la sessione utente). Non richiedono consenso",
            "Google Analytics — cookie analitici per statistiche di navigazione anonime",
            "Facebook Pixel — cookie di marketing per ottimizzare le campagne pubblicitarie",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-[#888888]">
              <span className="text-[#00CBDB] mt-0.5 flex-shrink-0">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">Puoi disabilitare i cookie analitici nelle impostazioni del tuo browser o tramite <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#00CBDB] hover:underline">Google Analytics Opt-out</a>.</p>
      </>
    ),
  },
  {
    title: "10. Difesa in giudizio",
    content: (
      <p>I dati personali dell&apos;utente possono essere utilizzati dal Titolare in giudizio o nelle fasi preparatorie per la difesa da abusi nell&apos;utilizzo dei servizi. Il Titolare potrebbe essere obbligato a rivelare dati su ordine delle autorità pubbliche competenti.</p>
    ),
  },
  {
    title: "11. Modifiche alla presente informativa",
    content: (
      <p>Ci riserviamo il diritto di aggiornare questa informativa in qualsiasi momento. Le modifiche sostanziali saranno comunicate via email agli iscritti. La data di ultimo aggiornamento è sempre indicata in cima al documento.</p>
    ),
  },
];

export default function PrivacyPage() {
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
            Ai sensi dell&apos;art. 13 Reg. UE n. 679/2016
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#F0F0F0] mb-3">Privacy Policy</h1>
          <p className="text-[#444444] text-sm mb-16">Ultimo aggiornamento: maggio 2026</p>

          {/* Warning sanitaria */}
          <div className="mb-8 p-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5">
            <h2 className="text-yellow-400 text-sm font-semibold uppercase tracking-wider mb-3">⚠️ Avvertenza sanitaria</h2>
            <p className="text-sm text-[#888888] leading-relaxed">
              I contenuti, i consigli e i programmi forniti su questo sito hanno finalità esclusivamente informative e divulgative.{" "}
              <strong className="text-[#F0F0F0]">Non costituiscono prescrizioni mediche, diagnosi o terapie.</strong>{" "}
              Prima di iniziare qualsiasi programma di allenamento o modificare la propria alimentazione, consulta il tuo medico — specialmente in presenza di patologie o condizioni particolari.
            </p>
          </div>

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
        </div>
      </main>
      <Footer />
    </>
  );
}
