import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { VideoYoutube } from "@/components/VideoYoutube";
import ClubCard from "@/app/links/ClubCard";
import CardStyles from "@/app/links/CardStyles";
import ElencoLezioni from "./ElencoLezioni";
import ProssimaConElenco from "./ProssimaConElenco";
import RichiestaCoaching from "./RichiestaCoaching";
import { DESTINAZIONE_FINALE, type Lezione } from "@/lib/lezioni";

export default function LezioneView({ lezione }: { lezione: Lezione }) {
  return (
    <>
      <CardStyles />
      <Header />
      <main className="flex-1" style={{ background: "#F5F1EB" }}>
        <style>{`.corso-club .card{margin-bottom:0;} .corso-club .card-desc{color:rgba(255,255,255,0.78);}`}</style>

        {/* Testata scura */}
        <div className="text-center px-4 sm:px-6 pb-[30px] lg:pb-[64px]" style={{ background: "#080C0F", paddingTop: 92 }}>
          <span className="text-[#00CBDB] text-xs font-semibold tracking-[0.2em] uppercase block mb-3">#{lezione.numero} {lezione.nomeBreve}</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white" style={{ lineHeight: 1.1 }}>Protocollo Dimagrimento con Dave Gamba</h1>
          <p className="text-white/60 mt-3 text-base sm:text-lg">La mappa completa in 7 step per un fisico atletico, asciutto e scolpito</p>
        </div>

        <div className="mx-auto px-4 sm:px-6" style={{ maxWidth: 1180, paddingTop: 40, paddingBottom: 56 }}>

          <div className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)_340px] lg:items-start">

            {/* Centro: video */}
            <section className="order-1 lg:order-2 min-w-0">
              {lezione.youtubeId ? (
                <VideoYoutube
                  id={lezione.youtubeId}
                  titolo={lezione.titolo}
                  ctaSopra="Vuoi provare il metodo?"
                  ctaTesto="Prova la settimana gratis"
                  ctaLink={DESTINAZIONE_FINALE}
                />
              ) : (
                <div
                  className="flex flex-col items-center justify-center rounded-2xl"
                  style={{ aspectRatio: "16 / 9", background: "radial-gradient(ellipse at 50% 40%, #1a2428 0%, #0a0e10 75%)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="flex items-center justify-center rounded-full" style={{ width: 72, height: 72, background: "rgba(0,203,219,0.14)", border: "1.5px solid rgba(0,203,219,0.55)" }}>
                    <span style={{ width: 0, height: 0, borderStyle: "solid", borderWidth: "11px 0 11px 18px", borderColor: "transparent transparent transparent #00CBDB", marginLeft: 4 }} />
                  </div>
                  <span className="mt-4 text-sm font-semibold tracking-wide text-white/70">Video in arrivo</span>
                </div>
              )}

              <div style={{ marginTop: 22 }}>
                <div className="text-xs font-semibold tracking-[0.18em] uppercase mb-2" style={{ color: "#0099a8" }}>
                  {lezione.numero === 0 ? "Presentazione" : `Lezione ${lezione.numero} di 7`}
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl" style={{ lineHeight: 1.2, color: "#0a0a0a" }}>{lezione.titolo}</h2>
                <p className="mt-2 text-base leading-relaxed" style={{ color: "#4a4a45" }}>{lezione.descrizione}</p>

                <ProssimaConElenco corrente={lezione.numero} />
              </div>
            </section>

            {/* Destra: Club (principale) e coaching (secondario) */}
            <aside className="order-2 lg:order-3 lg:sticky lg:top-24 flex flex-col gap-4">
              <div className="corso-club" style={{ background: "#080C0F", borderRadius: 20 }}><ClubCard
                  aperto
                  testoBottone="Ricevi la tua scheda gratuita →"
                  etichetta="Hai la mappa. Ora passa alla pratica"
                  descrizione="Nel Club mettiamo in pratica i passi visti nel protocollo. Prova il mio sistema Breve-Intenso-Mirato. Prova gli allenamenti guidati da meno di mezz'ora al giorno."
                  punti={["Prova una scheda del club gratis", "Allenamenti guidati da seguire con me", "A casa o in palestra"]}
                /></div>
              <RichiestaCoaching />
            </aside>

            {/* Sinistra: elenco */}
            <div className="hidden lg:block lg:order-1 lg:sticky lg:top-24 lg:-mt-[84px] relative z-10">
              <ElencoLezioni corrente={lezione.numero} />
            </div>
          </div>

          <p className="mx-auto text-center" style={{ maxWidth: 720, marginTop: 56, fontSize: "0.75rem", lineHeight: 1.6, color: "#7a7468" }}>
            I risultati mostrati non sono tipici e non sono una garanzia: dipendono dal punto di partenza, dall&apos;impegno e dalla costanza di ciascuno. I contenuti hanno scopo informativo e non sostituiscono il parere del medico.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
