/**
 * La riga di copyright — un anno fisso, un anno che corre.
 *
 * 2026 non è "l'anno corrente": è l'anno in cui questo sito è stato rifatto,
 * design e funzionamento. È un ancoraggio, e non cambia mai più. Il secondo
 * numero è l'anno in corso, e compare solo quando c'è davvero un intervallo da
 * mostrare: nel 2026 la riga dice `© 2026`, dal 1° gennaio 2027 `© 2026–2027`.
 *
 * Prima del 10/9 questa riga viveva in tre posti con tre comportamenti diversi:
 * due copie con "2026" scritto a mano — che nel 2027 avrebbero continuato a
 * dire 2026 — e una calcolata sull'anno corrente, che nel 2027 avrebbe detto
 * solo "© 2027", perdendo proprio l'anno che qui si vuole tenere. Il sito
 * avrebbe mostrato tre anni diversi in tre pagine senza che nessuno lo toccasse.
 * Stessa forma del debito della disponibilità, chiuso il 9/9.
 *
 * L'anno si legge sul fuso di Roma, non su quello del server. Vercel esegue in
 * UTC: alla mezzanotte del 1° gennaio in Sicilia sono ancora le 23:00 del 31
 * dicembre a Londra, e per un'ora il footer mostrerebbe l'anno appena finito.
 * È un dettaglio di un'ora l'anno, ma è l'unica ora che conta per questa riga.
 *
 * Tutte le pagine che la mostrano hanno `revalidate = 3600`: il passaggio
 * d'anno si propaga al massimo un'ora dopo.
 */

/** L'anno in cui il sito è stato rifatto. Non si tocca. */
export const SITE_START_YEAR = 2026

/** Il testo dopo gli anni. Identico su ogni pagina, per scelta di Alex. */
export const COPYRIGHT_NAME =
  'Alex Cinisi Photography · Luxury Wedding Photographer · Sicily, Italy'

/** L'anno corrente in Sicilia, non sul fuso del server. */
export function currentYearInSicily(now: Date = new Date()): number {
  return Number(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Rome',
      year: 'numeric',
    }).format(now),
  )
}

/**
 * `2026` finché siamo nel 2026, `2026–2027` dal 1° gennaio 2027 in poi.
 * La lineetta è una en dash (U+2013) senza spazi: è la convenzione per gli
 * intervalli, e non va sostituita con un trattino.
 */
export function copyrightYears(now: Date = new Date()): string {
  const year = currentYearInSicily(now)
  // Il `>` copre anche l'orologio indietro: un anno precedente al 2026 non
  // produce un intervallo al contrario, mostra solo l'anno di partenza.
  return year > SITE_START_YEAR ? `${SITE_START_YEAR}–${year}` : String(SITE_START_YEAR)
}

/** La riga intera, come va scritta ovunque. */
export function copyrightLine(now: Date = new Date()): string {
  return `© ${copyrightYears(now)} ${COPYRIGHT_NAME}`
}
