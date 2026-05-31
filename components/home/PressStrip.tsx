export default function PressStrip() {
  return (
    <section className="w-full bg-white py-3 sm:py-4">
      <div className="w-full px-4 sm:px-8 flex flex-col items-center gap-2">
        <p className="text-[#999] text-[9px] font-semibold tracking-[0.2em] uppercase">
          Come visto su
        </p>
        <img
          src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/loghi-press.png"
          alt="Vanity Fair, Corriere della Sera, la Repubblica, Rai Radio 2"
          className="w-full max-w-2xl h-7 sm:h-9 object-contain"
        />
      </div>
    </section>
  );
}
