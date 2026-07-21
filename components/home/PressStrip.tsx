export default function PressStrip() {
  return (
    <section className="w-full py-4 sm:py-5" style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="w-full px-4 sm:px-8 flex flex-col items-center gap-2">
        <p className="text-white/35 text-[9px] font-semibold tracking-[0.2em] uppercase">
          Come visto su
        </p>
        <img
          src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/loghi-press.png"
          alt="Vanity Fair, Corriere della Sera, la Repubblica, Rai Radio 2"
          className="w-full max-w-2xl h-7 sm:h-9 object-contain"
          style={{ filter: "brightness(0) invert(0.7)" }}
        />
      </div>
    </section>
  );
}
