export default function PressStrip() {
  return (
    <section className="border-b border-[#1a1a1a] bg-[#080808] py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-4">
        <p className="text-[#444] text-[10px] font-semibold tracking-[0.2em] uppercase">
          Come visto su
        </p>
        <img
          src="https://pub-7d3698aed8524dc8aa7cc9808575f501.r2.dev/loghi-press.png"
          alt="Vanity Fair, Corriere della Sera, la Repubblica, Rai Radio 2"
          className="h-8 sm:h-10 w-auto object-contain opacity-60 hover:opacity-90 transition-opacity duration-300"
        />
      </div>
    </section>
  );
}
