/**
 * Disponibilità — anni calcolati, stato scritto a mano.
 *
 * La regola che governa questo file: l'anno è aritmetica, lo stato è
 * un'affermazione. "2027" si può derivare da un calendario; "Select dates
 * still available" no — è una cosa che solo Alex sa, e una formula che
 * continuasse a dirla nel 2029 mostrerebbe un dato morto con l'aria di
 * essere vivo.
 *
 * Tutte le pagine che consumano questi valori hanno `revalidate = 3600`,
 * quindi il passaggio d'anno si propaga al massimo un'ora dopo.
 */

export interface AvailabilityItemInput {
  year?: string | null
  status?: string | null
  substatus?: string | null
  dotClass?: string | null
}

export interface AvailabilityItem {
  year: string
  status: string
  substatus: string
  dotClass: string
}

/** Usato solo se Sanity non risponde o il documento non esiste ancora. */
export const AVAILABILITY_FALLBACK: AvailabilityItemInput[] = [
  { status: 'Select dates still available', substatus: 'Spring & Autumn openings remaining', dotClass: 'open' },
  { status: 'Now accepting enquiries', substatus: 'Secure your date early', dotClass: 'soon' },
]

export const AVAILABILITY_TEXT_FALLBACK =
  'I accept a limited number of weddings each year to ensure every couple receives my full creative attention and bespoke service. Peak season dates fill 12–18 months in advance.'

export const DEFAULT_ROLLOVER_MONTH = 9

/**
 * L'anno di cui il sito parla per primo.
 *
 * Da `rolloverMonth` in poi si passa all'anno successivo: a dicembre
 * "quest'anno" è già una data scaduta per chi sta cercando un fotografo,
 * ed è il caso che `new Date().getFullYear()` da solo sbaglia.
 */
export function bookingBaseYear(
  rolloverMonth: number = DEFAULT_ROLLOVER_MONTH,
  now: Date = new Date(),
): number {
  const month = now.getMonth() + 1 // getMonth() è 0-based
  const rollover = Number.isFinite(rolloverMonth) ? Math.min(12, Math.max(1, Math.trunc(rolloverMonth))) : DEFAULT_ROLLOVER_MONTH
  return now.getFullYear() + (month >= rollover ? 1 : 0)
}

/**
 * Riempie gli anni mancanti a partire dalla posizione della riga.
 * Un `year` scritto a mano vince sempre: è l'override.
 */
export function resolveAvailability(
  items: AvailabilityItemInput[] | null | undefined,
  opts: { autoYear?: boolean | null; rolloverMonth?: number | null; now?: Date } = {},
): AvailabilityItem[] {
  const source = items && items.length > 0 ? items : AVAILABILITY_FALLBACK
  const auto = opts.autoYear !== false
  const base = bookingBaseYear(opts.rolloverMonth ?? DEFAULT_ROLLOVER_MONTH, opts.now)

  // Gli anni si incatenano invece di derivare ciascuno dalla propria posizione:
  // se la prima riga è forzata a 2026, la seconda deve essere 2027 e non
  // base+1, che salterebbe un anno. Trovato provando l'override, non leggendo.
  let next = base

  return source
    .map((item) => {
      const written = (item.year || '').trim()
      const parsed = Number.parseInt(written, 10)
      let year: string
      if (written) {
        year = written
        if (Number.isFinite(parsed)) next = parsed + 1
      } else if (auto) {
        year = String(next)
        next += 1
      } else {
        // Col calcolo spento non si inventa niente: la riga resta senza anno
        // e viene scartata sotto, perché una card senza anno non è una card.
        year = ''
      }
      return {
        year,
        status: (item.status || '').trim(),
        substatus: (item.substatus || '').trim(),
        dotClass: item.dotClass || 'open',
      }
    })
    .filter((item) => item.year !== '' && item.status !== '')
}

/** Placeholder dei form: sono esempi, non promesse — quindi si derivano. */
export function weddingDatePlaceholder(baseYear: number): string {
  return `June 14, ${baseYear} · or 'TBD'`
}

export function weddingMonthPlaceholder(baseYear: number): string {
  return `Month ${baseYear} · or 'Flexible'`
}
