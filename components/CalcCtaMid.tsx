import { ArticleCta } from "./ArticleCta";

// CTA verso il calcolatore del fabbisogno, per la POSIZIONE CENTRALE degli
// articoli a intento calorico (dimagrimento, metabolismo, digiuno).
//
// È un lead magnet a pieno titolo, non un semplice strumento: il calcolatore
// dà prima i numeri e poi propone l'app Conta Calorie già impostata su quei
// valori in cambio dell'email (dgclub/calcolatore-fabbisogno.html).
// Per l'intento numerico batte il quiz proprio per questo: consegna il valore
// prima di chiedere qualcosa.
//
// Va messo solo dove l'articolo arriva alla conclusione "conta il deficit":
// altrove è un non-sequitur. Il quiz resta in fondo per chi non morde qui.
// Non è `compact` perché la descrizione deve dire cosa si ottiene.
//
// NOTA: 5 articoli più vecchi (calcolo-fabbisogno-calorico, deficit-calorico,
// dimagrire-dopo-i-40-uomo, grasso-addominale-uomo, perche-non-dimagrisco)
// hanno ancora un <ArticleCta> scritto a mano con copy su misura. Funziona,
// quindi non l'ho toccato — ma se un giorno vuoi una copy sola ovunque,
// quelli sono i file da migrare a questo componente.
export function CalcCtaMid() {
  return (
    <ArticleCta
      kicker="Strumento Gratuito · 1 Minuto"
      title="Quante Calorie Ti Servono Davvero?"
      description="Senza il tuo numero stai tirando a indovinare. Calcolalo gratis in meno di un minuto — poi ti mando l'app Conta Calorie già impostata su quei valori, così devi solo segnare cosa mangi."
      href="https://club.davegamba.com/calcolatore-fabbisogno.html"
      cta="Calcola il tuo fabbisogno"
    />
  );
}
