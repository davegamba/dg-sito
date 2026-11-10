"use client";

// Video YouTube "a guscio": il video gira sul player ufficiale (le
// visualizzazioni arrivano su YouTube), ma chi guarda non vede né può cliccare
// logo, titolo o video correlati, quindi non esce dal sito.
//
// Come funziona (non rifare i tentativi già scartati):
// 1. Copertina leggera: finché nessuno preme play non si carica niente di
//    YouTube (pagina veloce, nessun cookie di terzi prima del clic).
// 2. Ritaglio: l'iframe è alto il TRIPLO del riquadro e spostato in su di un
//    terzo. Il video, proporzionato sulla larghezza, finisce esattamente nella
//    parte visibile; la barra del titolo (in cima all'iframe) e il logo / il
//    pannello "Altri video" (in fondo) restano fuori. Funziona perché il
//    riquadro ha le stesse proporzioni del video: per gli Shorts usa
//    formato="verticale".
// 3. Un livello trasparente copre tutto: i clic arrivano a noi, mai a YouTube.
//    Controlli nostri (play, barra, volume, schermo intero) via IFrame API.
// 4. Fine video: schermata nostra opaca con "Rivedi" e la CTA, che copre la
//    griglia dei correlati.
// `modestbranding` è disattivato da YouTube dal 2023 e `rel=0` non toglie i
// correlati (mostra solo quelli del canale): per questo servono 2-3-4.
//
// Nota iPhone: Safari può rifiutare l'avvio con audio dal nostro bottone. Se
// dopo il clic il video non parte, lasciamo passare il tocco al player al
// centro (vedi `serveTocco`), tenendo coperte le fasce alta e bassa.
//
// Uso in MDX:  <VideoYoutube id="hGA0z6hRihk" titolo="..." />
// Opzioni: formato="verticale", copertina="/images/...", data="2026-05-01"
// (attiva i dati strutturati VideoObject), ctaTesto, ctaLink, ctaSopra.

import { useCallback, useEffect, useRef, useState } from "react";

// ── Tipi minimi dell'IFrame API (niente pacchetto @types) ─────────────────
interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(s: number, allowSeekAhead: boolean): void;
  mute(): void;
  unMute(): void;
  isMuted(): boolean;
  getCurrentTime(): number;
  getDuration(): number;
  getPlayerState(): number;
  getIframe(): HTMLIFrameElement;
  destroy(): void;
}
interface YTNamespace {
  Player: new (el: HTMLElement, opts: Record<string, unknown>) => YTPlayer;
}
declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const STATO = { FINITO: 0, IN_CORSO: 1, PAUSA: 2, BUFFER: 3 } as const;

let apiPromise: Promise<YTNamespace> | null = null;
function caricaApi(): Promise<YTNamespace> {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    if (window.YT?.Player) return resolve(window.YT);
    const precedente = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      precedente?.();
      resolve(window.YT as YTNamespace);
    };
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    s.async = true;
    document.head.appendChild(s);
  });
  return apiPromise;
}

// Un solo video alla volta sulla pagina.
const attivi = new Set<YTPlayer>();

function formatTempo(s: number) {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
}

interface Props {
  id: string;
  titolo: string;
  formato?: "orizzontale" | "verticale";
  copertina?: string;
  data?: string;
  ctaSopra?: string;
  ctaTesto?: string;
  ctaLink?: string;
}

export function VideoYoutube({
  id,
  titolo,
  formato = "orizzontale",
  copertina,
  data,
  ctaSopra = "Vuoi allenarti così, con un piano già pronto?",
  ctaTesto = "Scopri il DG Athletic Club",
  ctaLink = "https://club.davegamba.com/entra-nel-club",
}: Props) {
  const verticale = formato === "verticale";
  const wrapRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);

  const [avviato, setAvviato] = useState(false); // l'utente ha premuto play
  const [pronto, setPronto] = useState(false);
  const [inCorso, setInCorso] = useState(false);
  const [finito, setFinito] = useState(false);
  const [serveTocco, setServeTocco] = useState(false);
  const [muto, setMuto] = useState(false);
  const [tempo, setTempo] = useState(0);
  const [durata, setDurata] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [puoFullscreen, setPuoFullscreen] = useState(false);
  const [poster, setPoster] = useState(
    copertina ?? `https://i.ytimg.com/vi/${id}/${verticale ? "hqdefault" : "maxresdefault"}.jpg`,
  );

  useEffect(() => {
    const onFs = () => setFullscreen(document.fullscreenElement === wrapRef.current);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  // Avvio: crea il player solo dopo il clic sulla copertina.
  useEffect(() => {
    if (!avviato || !slotRef.current) return;
    let annullato = false;
    let timerTocco: ReturnType<typeof setTimeout> | undefined;

    caricaApi().then((YT) => {
      if (annullato || !slotRef.current) return;
      const p = new YT.Player(slotRef.current, {
        videoId: id,
        host: "https://www.youtube-nocookie.com",
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          playsinline: 1,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          cc_load_policy: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            if (annullato) return;
            playerRef.current = p;
            attivi.add(p);
            const f = p.getIframe();
            f.setAttribute("tabindex", "-1");
            f.setAttribute("title", titolo);
            setPronto(true);
            setDurata(p.getDuration());
            p.playVideo();
            // Se il browser (di solito iPhone) blocca l'avvio, lasciamo
            // toccare il player al centro.
            timerTocco = setTimeout(() => {
              if (p.getPlayerState() !== STATO.IN_CORSO) setServeTocco(true);
            }, 1500);
          },
          onStateChange: (e: { data: number }) => {
            if (e.data === STATO.IN_CORSO) {
              attivi.forEach((altro) => altro !== p && altro.pauseVideo());
              setServeTocco(false);
              setFinito(false);
              setInCorso(true);
              setDurata(p.getDuration());
            } else if (e.data === STATO.FINITO) {
              setInCorso(false);
              setFinito(true);
            } else if (e.data === STATO.PAUSA) {
              setInCorso(false);
            }
          },
        },
      });
    });

    return () => {
      annullato = true;
      if (timerTocco) clearTimeout(timerTocco);
      const p = playerRef.current;
      if (p) {
        attivi.delete(p);
        p.destroy();
      }
      playerRef.current = null;
    };
  }, [avviato, id, titolo]);

  // Barra di avanzamento.
  useEffect(() => {
    if (!inCorso) return;
    const t = setInterval(() => {
      const p = playerRef.current;
      if (p) setTempo(p.getCurrentTime());
    }, 250);
    return () => clearInterval(t);
  }, [inCorso]);

  const playPausa = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    if (finito) {
      p.seekTo(0, true);
      p.playVideo();
      return;
    }
    if (inCorso) p.pauseVideo();
    else p.playVideo();
  }, [finito, inCorso]);

  const cambiaMuto = () => {
    const p = playerRef.current;
    if (!p) return;
    if (p.isMuted()) p.unMute();
    else p.mute();
    setMuto(!muto);
  };

  const cerca = (valore: number) => {
    const p = playerRef.current;
    if (!p) return;
    p.seekTo(valore, true);
    setTempo(valore);
  };

  const schermoIntero = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  };

  const tasti = (e: React.KeyboardEvent) => {
    if (!pronto) return;
    if (e.key === " " || e.key === "k") {
      e.preventDefault();
      playPausa();
    }
  };

  const percentuale = durata ? Math.min(100, (tempo / durata) * 100) : 0;

  const jsonLd = data
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: titolo,
        description: titolo,
        thumbnailUrl: [`https://i.ytimg.com/vi/${id}/hqdefault.jpg`],
        uploadDate: data,
        embedUrl: `https://www.youtube.com/embed/${id}`,
        contentUrl: `https://www.youtube.com/watch?v=${id}`,
      }
    : null;

  return (
    <figure className={`not-prose my-10 ${verticale ? "mx-auto max-w-[360px]" : ""}`}>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <div
        ref={wrapRef}
        tabIndex={pronto ? 0 : -1}
        onKeyDown={tasti}
        className={`group relative w-full overflow-hidden bg-black outline-none ${
          fullscreen ? "flex items-center justify-center" : "rounded-2xl"
        }`}
        style={fullscreen ? undefined : { aspectRatio: verticale ? "9 / 16" : "16 / 9" }}
      >
        {/* Riquadro con le proporzioni del video: dentro c'è l'iframe ritagliato */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: verticale ? "9 / 16" : "16 / 9",
            ...(fullscreen ? { maxHeight: "100vh", maxWidth: verticale ? "56.25vh" : "177.78vh" } : { height: "100%" }),
          }}
        >
          {avviato && (
            <div
              className={`absolute left-0 w-full ${serveTocco ? "" : "pointer-events-none"}`}
              style={{ top: "-100%", height: "300%" }}
            >
              <div ref={slotRef} className="h-full w-full [&>iframe]:h-full [&>iframe]:w-full" />
            </div>
          )}

          {/* Livello che intercetta i clic. Con `serveTocco` lascia libero
              il centro (fascia 25%-75%) perché il tocco arrivi al player. */}
          {avviato && !finito && (
            serveTocco ? (
              <>
                <div className="absolute inset-x-0 top-0 h-1/4" />
                <div className="absolute inset-x-0 bottom-0 h-1/4" />
                <div className="pointer-events-none absolute inset-x-0 top-3 text-center text-sm font-semibold text-white drop-shadow">
                  Tocca il video per avviarlo
                </div>
              </>
            ) : (
              <button
                type="button"
                aria-label={inCorso ? "Pausa" : "Riproduci"}
                onClick={playPausa}
                className="absolute inset-0 cursor-pointer"
              />
            )
          )}

          {/* In pausa: velo scuro + bottone grande (copre anche eventuali
              pannelli di YouTube al centro) */}
          {avviato && pronto && !inCorso && !finito && !serveTocco && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/55">
              <BottonePlay />
            </div>
          )}

          {/* Copertina prima del primo clic, e durante il caricamento */}
          {(!avviato || !pronto) && (
            <button
              type="button"
              onClick={() => {
                // iPhone non permette lo schermo intero su un div: niente bottone.
                const d = document as Document & { webkitFullscreenEnabled?: boolean };
                setPuoFullscreen(Boolean(d.fullscreenEnabled || d.webkitFullscreenEnabled));
                setAvviato(true);
              }}
              aria-label={`Guarda il video: ${titolo}`}
              className="absolute inset-0 flex cursor-pointer items-center justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={poster}
                alt=""
                loading="lazy"
                onLoad={(e) => {
                  // maxresdefault non esiste per tutti i video: YouTube dà una
                  // miniatura grigia 120x90 invece di un errore.
                  if (e.currentTarget.naturalWidth <= 120 && !copertina) setPoster(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`);
                }}
                onError={() => !copertina && setPoster(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute inset-0 bg-black/25" />
              <span className="relative">{avviato ? <Rotella /> : <BottonePlay />}</span>
            </button>
          )}

          {/* Fine video: schermata nostra al posto dei correlati */}
          {finito && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/90 px-6 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={poster} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30" />
              <p className="max-w-md text-base font-semibold text-white sm:text-lg">{ctaSopra}</p>
              <a
                href={ctaLink}
                className="rounded-full bg-[#00C8DB] px-6 py-3 text-sm font-bold text-black transition hover:brightness-110 sm:text-base"
              >
                {ctaTesto}
              </a>
              <button
                type="button"
                onClick={playPausa}
                className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white"
              >
                <IconaRivedi /> Rivedi il video
              </button>
            </div>
          )}

          {/* Barra dei controlli */}
          {avviato && pronto && !finito && !serveTocco && (
            <div
              className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-2 pt-8 transition-opacity duration-200 ${
                inCorso ? "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 max-md:opacity-100" : "opacity-100"
              }`}
            >
              <input
                type="range"
                min={0}
                max={durata || 0}
                step={0.1}
                value={tempo}
                onChange={(e) => cerca(Number(e.target.value))}
                aria-label="Avanzamento del video"
                className="h-1 w-full cursor-pointer appearance-none rounded-full accent-[#00C8DB]"
                style={{ background: `linear-gradient(to right, #00C8DB ${percentuale}%, rgba(255,255,255,.3) ${percentuale}%)` }}
              />
              <div className="mt-1.5 flex items-center gap-3 text-white">
                <button type="button" onClick={playPausa} aria-label={inCorso ? "Pausa" : "Riproduci"} className="p-1">
                  {inCorso ? <IconaPausa /> : <IconaPlay />}
                </button>
                <button type="button" onClick={cambiaMuto} aria-label={muto ? "Attiva audio" : "Disattiva audio"} className="p-1">
                  {muto ? <IconaMuto /> : <IconaAudio />}
                </button>
                <span className="text-xs tabular-nums text-white/85">
                  {formatTempo(tempo)} / {formatTempo(durata)}
                </span>
                {puoFullscreen && (
                  <button
                    type="button"
                    onClick={schermoIntero}
                    aria-label={fullscreen ? "Esci da schermo intero" : "Schermo intero"}
                    className="ml-auto p-1"
                  >
                    <IconaSchermo />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <figcaption className="sr-only">{titolo}</figcaption>
    </figure>
  );
}

// ── Icone ────────────────────────────────────────────────────────────────
function BottonePlay() {
  return (
    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00C8DB] shadow-lg shadow-black/40 transition group-hover:scale-105 sm:h-20 sm:w-20">
      <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-black sm:h-8 sm:w-8" aria-hidden="true">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  );
}
function Rotella() {
  return <span className="block h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-[#00C8DB]" />;
}
const ic = "h-5 w-5 fill-current";
function IconaPlay() {
  return <svg viewBox="0 0 24 24" className={ic} aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>;
}
function IconaPausa() {
  return <svg viewBox="0 0 24 24" className={ic} aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>;
}
function IconaAudio() {
  return <svg viewBox="0 0 24 24" className={ic} aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4z" /></svg>;
}
function IconaMuto() {
  return <svg viewBox="0 0 24 24" className={ic} aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.6 3 2.7-2.7-1.4-1.4-2.7 2.7-2.7-2.7-1.4 1.4 2.7 2.7-2.7 2.7 1.4 1.4 2.7-2.7 2.7 2.7 1.4-1.4z" /></svg>;
}
function IconaSchermo() {
  return <svg viewBox="0 0 24 24" className={ic} aria-hidden="true"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" /></svg>;
}
function IconaRivedi() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true"><path d="M12 5V1L7 6l5 5V7a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8z" /></svg>;
}
