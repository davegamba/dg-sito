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
            "Dati di navigazione — indirizzo IP, tipo di browser, pagine visitate, durata della sessione. Quelli raccolti tramite Google Analytics e Meta Pixel vengono trattati solo se accetti i cookie dal banner",
            "Risposte al Quiz Fisico — obiettivo, abitudini e tempo a disposizione, che ci servono per mostrarti il tuo profilo e collegarlo alla tua email",
            "Dati del coaching — se avvii un percorso di coaching 1-1: data di nascita, telefono o WhatsApp, peso e misure, foto, obiettivi e, se decidi di scriverli, informazioni sulla tua salute (infortuni, patologie, farmaci, intolleranze). Vedi la sezione 5",
            "Dati di acquisto — gestiti direttamente da Stripe; non conserviamo dati di pagamento sui nostri server",
            "Log di sistema — file tecnici registrati durante la navigazione per finalità di manutenzione e sicurezza",
            "Dati da interazioni su Instagram — se commenti un nostro post o ci scrivi un messaggio diretto, conserviamo il tuo nome utente Instagram, il nome del profilo, il testo dell'interazione e la data, per poterti rispondere",
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
          "Calcolo e invio del profilo del Quiz Fisico",
          "Preparazione del piano personalizzato per chi acquista il coaching",
          "Statistiche di navigazione e misurazione delle campagne pubblicitarie (solo con il tuo consenso ai cookie)",
          "Adempimento di obblighi di legge e difesa in giudizio",
          "Risposta automatica a commenti e messaggi ricevuti sui nostri profili social",
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
    title: "4. Interazioni sui social",
    content: (
      <>
        <p>Se commenti un nostro post su Instagram o ci scrivi un messaggio diretto, riceverai una risposta automatica. Per fornirla conserviamo il tuo nome utente, il nome del profilo, il testo del messaggio e la data.</p>
        <p className="mt-3">La base giuridica è il legittimo interesse a rispondere a chi ci contatta. Non usiamo questi dati per finalità diverse dalla risposta e non li cediamo a terzi. Non ti aggiungiamo a liste email: per quello serve la tua iscrizione esplicita.</p>
        <p className="mt-3">Puoi chiedere la cancellazione di questi dati in qualsiasi momento scrivendo a <a href="mailto:info@davegamba.com" className="text-[#00CBDB] hover:underline">info@davegamba.com</a>. Il trattamento avviene esclusivamente sui nostri sistemi; Instagram tratta i tuoi dati secondo la propria informativa, su cui non abbiamo controllo.</p>
      </>
    ),
  },
  {
    title: "5. Dati sulla salute e foto (coaching)",
    content: (
      <>
        <p>Quando compili il questionario del coaching puoi indicarci infortuni, patologie, limitazioni fisiche, intolleranze e farmaci, e caricare una foto del tuo fisico. Sono dati sulla salute: una categoria particolare di dati personali (art. 9 GDPR).</p>
        <p className="mt-3">Li usiamo solo per costruire il tuo piano di allenamento e alimentazione. Il trattamento si basa sul tuo <strong className="text-[#F0F0F0]">consenso esplicito</strong> (art. 9.2.a GDPR), che puoi revocare in qualsiasi momento scrivendo a <a href="mailto:info@davegamba.com" className="text-[#00CBDB] hover:underline">info@davegamba.com</a>. Se non vuoi indicare questi dati, puoi lasciare vuoti i campi relativi: il piano sarà costruito con le informazioni che ci dai.</p>
        <p className="mt-3">Le foto sono conservate in un archivio privato, non accessibile dal pubblico. Non pubblichiamo né cediamo a terzi le foto e i dati sulla salute; sono trattati solo dai fornitori tecnici indicati nella sezione 7.</p>
        <p className="mt-3">Il coaching non è un servizio medico e non sostituisce il parere del tuo medico.</p>
      </>
    ),
  },
  {
    title: "6. Base giuridica",
    content: (
      <ul className="space-y-2">
        {[
          "Consenso (art. 6.1.a GDPR) — per l'invio di comunicazioni email di marketing e per i cookie di statistica e di marketing (Google Analytics, Meta Pixel)",
          "Consenso esplicito (art. 9.2.a GDPR) — per i dati sulla salute forniti nel questionario di coaching",
          "Esecuzione del contratto (art. 6.1.b GDPR) — per l'erogazione dei servizi acquistati e per gestire la tua richiesta di coaching o il profilo del Quiz Fisico",
          "Obbligo legale (art. 6.1.c GDPR) — per adempimenti fiscali e normativi",
          "Legittimo interesse (art. 6.1.f GDPR) — per la sicurezza del sito, la risposta a chi ci contatta sui social e la difesa in giudizio",
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
    title: "7. Terze parti e responsabili del trattamento",
    content: (
      <>
        <p>I tuoi dati possono essere condivisi con i seguenti servizi terzi:</p>
        <ul className="mt-3 space-y-2">
          {[
            { name: "Supabase", desc: "database per la gestione dei lead, delle candidature, dei questionari e degli acquisti, server UE", href: "https://supabase.com/privacy" },
            { name: "Vercel", desc: "hosting di questo sito", href: "https://vercel.com/legal/privacy-policy" },
            { name: "Systeme.io", desc: "gestione dell'elenco contatti e invio delle email", href: "https://systeme.io/privacy-policy" },
            { name: "Resend", desc: "invio delle email di servizio, come la conferma di accesso dopo l'acquisto", href: "https://resend.com/legal/privacy-policy" },
            { name: "Stripe", desc: "elaborazione dei pagamenti", href: "https://stripe.com/it/privacy" },
            { name: "Google Analytics", desc: "analisi del traffico web, solo con il tuo consenso ai cookie", href: "https://policies.google.com/privacy" },
            { name: "YouTube (Google)", desc: "le anteprime dei video mostrate in alcune pagine vengono caricate dai server di YouTube, che può così ricevere il tuo indirizzo IP", href: "https://policies.google.com/privacy" },
            { name: "Meta (Facebook)", desc: "pixel di monitoraggio per campagne pubblicitarie, solo con il tuo consenso ai cookie; Instagram e ManyChat per le risposte automatiche a commenti e messaggi", href: "https://www.facebook.com/privacy/policy/" },
            { name: "Netlify", desc: "hosting dell'area Club (club.davegamba.com)", href: "https://www.netlify.com/privacy/" },
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
    title: "8. Trasferimento dati extra-UE",
    content: (
      <>
        <p>Alcuni fornitori terzi (es. Stripe, Google, Meta) potrebbero trasferire dati verso Paesi extra-UE. In tali casi il trasferimento avviene in conformità agli artt. 44 e seguenti del GDPR, sulla base di decisioni di adeguatezza della Commissione Europea o clausole contrattuali standard approvate.</p>
        <p>Puoi richiedere informazioni sulle garanzie adottate contattando il Titolare.</p>
      </>
    ),
  },
  {
    title: "9. Conservazione dei dati",
    content: (
      <ul className="space-y-2">
        {[
          "Dati forniti per newsletter, Quiz Fisico e contenuti gratuiti: conservati fino alla tua richiesta di cancellazione o alla revoca del consenso",
          "Candidature e questionari di coaching, foto e dati sulla salute: conservati per la durata del percorso e, dopo, fino alla tua richiesta di cancellazione",
          "Dati relativi agli acquisti: conservati per il periodo previsto dalla normativa fiscale italiana (10 anni)",
          "Dati di navigazione (Google Analytics): conservati per il periodo impostato nel nostro account Google Analytics, che non supera i 14 mesi",
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
    title: "10. I tuoi diritti (GDPR)",
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
            "Opposizione — opporti in qualsiasi momento al marketing diretto e ai trattamenti basati sul legittimo interesse",
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
    title: "11. Cookie e tecnologie di tracciamento",
    content: (
      <>
        <ul className="space-y-2">
          {[
            "Cookie tecnici e dati locali — necessari al funzionamento del sito: la tua scelta sui cookie, la sessione di accesso all'area riservata, il pagamento tramite Stripe. Non richiedono consenso",
            "Google Analytics — cookie di statistica, installati solo dopo che hai cliccato \"Accetta tutti\" nel banner",
            "Meta Pixel — cookie di marketing per misurare e ottimizzare le campagne pubblicitarie, installati solo dopo che hai cliccato \"Accetta tutti\" nel banner",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-[#888888]">
              <span className="text-[#00CBDB] mt-0.5 flex-shrink-0">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">Se scegli &quot;Solo essenziali&quot;, o non scegli, Google Analytics e Meta Pixel non vengono caricati. Puoi cambiare o revocare la scelta in qualsiasi momento dal link &quot;Preferenze cookie&quot; in fondo a ogni pagina. La scelta viene riproposta dopo circa 6 mesi.</p>
        <p className="mt-3">Puoi anche disabilitare i cookie analitici nelle impostazioni del tuo browser o tramite <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#00CBDB] hover:underline">Google Analytics Opt-out</a>.</p>
      </>
    ),
  },
  {
    title: "12. Difesa in giudizio",
    content: (
      <p>I dati personali dell&apos;utente possono essere utilizzati dal Titolare in giudizio o nelle fasi preparatorie per la difesa da abusi nell&apos;utilizzo dei servizi. Il Titolare potrebbe essere obbligato a rivelare dati su ordine delle autorità pubbliche competenti.</p>
    ),
  },
  {
    title: "13. Modifiche alla presente informativa",
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
          <p className="text-[#444444] text-sm mb-16">Ultimo aggiornamento: 16 ottobre 2026</p>

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
