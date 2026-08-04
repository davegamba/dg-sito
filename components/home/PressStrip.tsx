export default function PressStrip() {
  return (
    <section className="w-full py-4 sm:py-5" style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="w-full px-4 sm:px-8 flex flex-col items-center gap-2">
        <p className="text-white/35 text-[9px] font-semibold tracking-[0.2em] uppercase">
          Come visto su
        </p>
        <img
          src="/images/loghi-press-white.png"
          alt="Vanity Fair, Corriere della Sera, la Repubblica, Rai Radio 2"
          className="w-full max-w-2xl h-7 sm:h-9 object-contain"
          style={{ opacity: 0.75 }}
        />
      </div>
    </section>
  );
}
