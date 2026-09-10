/**
 * Le tre CTA delle landing — barra, hero, chiusura — non spediscono niente:
 * portano al form. La regola del funnel ([[funnel-mappa]] §7) è che devono
 * anche mettere il cursore nel primo campo, così l'etichetta non promette
 * un'azione che non compie.
 *
 * Il fuoco si dà solo dove esiste un puntatore fisico. Su touch, dare fuoco a
 * un input apre la tastiera: il viewport si ridimensiona mentre lo scorrimento
 * morbido è ancora in corso, e si atterra da un'altra parte con la tastiera
 * aperta senza averla chiesta. Il bersaglio reale di questa landing è Safari
 * dentro Instagram, cioè un telefono: lì lo scorrimento da solo è il
 * comportamento giusto, e la CTA mantiene comunque la sua promessa.
 */

const CAMPI = 'input:not([type="hidden"]), select, textarea'

export function goToForm(anchorId: string) {
  const target = document.getElementById(anchorId)
  if (!target) return

  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    target.scrollIntoView({ behavior: 'smooth' })
    return
  }

  const campo = Array.from(target.querySelectorAll<HTMLElement>(CAMPI)).find((el) => {
    // Il honeypot si chiama "website" ed è nascosto: dargli il fuoco
    // significherebbe puntare il cursore in una trappola per bot.
    if (el.getAttribute('name') === 'website') return false
    if ((el as HTMLInputElement).disabled) return false
    // offsetParent nullo = l'elemento non è renderizzato (display:none o
    // un antenato nascosto): copre l'honeypot anche se un giorno cambia nome.
    return el.offsetParent !== null
  })

  // L'ordine e' deliberato: prima il fuoco, poi lo scorrimento. Se lo
  // scorrimento partisse per primo, il focus() successivo rischierebbe di
  // interromperlo a meta' — un rischio noto, che qui e' semplicemente reso
  // impossibile: dopo scrollIntoView non facciamo piu' niente. preventScroll
  // impedisce al fuoco di saltare a destinazione da solo, lasciando allo
  // scorrimento il compito di portarci.
  //
  // NON verificato a schermo che l'animazione arrivi fino in fondo: la scheda
  // dell'automazione riporta visibilityState "hidden" e Chrome non anima gli
  // scorrimenti morbidi programmatici in una scheda nascosta — lo stesso
  // artefatto che il 9/9 aveva sospeso IntersectionObserver. Provato che e' un
  // artefatto e non una regressione: anche scrollIntoView da solo, senza alcun
  // fuoco, resta a scrollY 0 in quella scheda, mentre 'instant' arriva a
  // destinazione.
  campo?.focus({ preventScroll: true })
  target.scrollIntoView({ behavior: 'smooth' })
}
