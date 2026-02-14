# FORM BEHAVIOR RULES — Alex Cinisi Photography

## Principio Generale

Il form di contatto cambia complessità in base al contesto. La homepage ha un form leggero per massimizzare le conversioni (meno campi = meno attrito). Le landing page di location e la pagina Contact dedicata hanno il form completo per pre-qualificare i lead.

---

## FORM HOMEPAGE (Leggero — Lead Capture)

**Obiettivo:** Massimizzare le conversioni. Meno campi possibile, nessun attrito.

**Campi:**
| Campo | Tipo | Required | Placeholder |
|-------|------|----------|-------------|
| First Name | text | ✅ | Your Name |
| Partner's Name | text | ✅ | Partner's Name |
| Email Address | email | ✅ | best.email@example.com |
| Phone Number | tel | ❌ | +1 (555) 000-0000 |
| Instagram Handle | text | ❌ | @yourhandle |
| Wedding Date | date | ✅ | DD/MM/YYYY |
| Venue / Location | text | ✅ | e.g. Tonnara di Scopello, or 'Undecided' |
| Tell Me About Your Story | textarea | ✅ | How did you meet? What is the vibe of your day? |
| Service Type | checkboxes | ❌ | Wedding Photography, Elopement, Couple Session |
| Privacy Checkbox | checkbox | ✅ | GDPR consent |

**Campi ESCLUSI dalla homepage:**
- ❌ Guest Count
- ❌ How Did You Find Us
- ❌ Estimated Photography Investment
- ❌ Wedding Planner

**Note:**
- Nessun asterisco rosso sui campi opzionali
- Il form deve essere snello, invitante, non intimidatorio
- Copy del submit button: "Tell Me About Your Wedding →"

---

## FORM LANDING PAGE LOCATION (Completo — Lead Qualification)

**Obiettivo:** Pre-qualificare il lead. Raccogliere info sufficienti per preparare una proposta personalizzata.

**Campi:**
| Campo | Tipo | Required | Placeholder |
|-------|------|----------|-------------|
| First Name | text | ✅ | Your Name |
| Partner's Name | text | ✅ | Partner's Name |
| Email Address | email | ✅ | best.email@example.com |
| Phone Number | tel | ❌ | +1 (555) 000-0000 |
| Instagram Handle | text | ❌ | @yourhandle |
| Wedding Planner | text | ❌ | Name of your planner, or 'Not yet' |
| Wedding Date | date | ✅ | DD/MM/YYYY |
| Guest Count | select | ✅ | Elopement / Intimate <50 / Medium 50-100 / Grand 100+ |
| How Did You Find Us | select | ✅ | Google / Instagram / Wedding Planner / Friend / Blog / Other |
| Venue / Location | text | ✅ | Pre-filled con il nome della venue della landing page |
| Estimated Photography Investment | select | ✅ | €2,500–€3,500 / €3,500–€5,000 / €5,000+ / Flexible |
| Tell Me About Your Story | textarea | ✅ | How did you meet? What is the vibe of your day? |
| Service Type | checkboxes | ❌ | Wedding Photography, Elopement, Couple Session |
| Privacy Checkbox | checkbox | ✅ | GDPR consent |

**Note:**
- Il campo Venue/Location è pre-compilato con il nome della venue della landing page
- Copy del submit button: "Request Your Bespoke Proposal →"

---

## FORM PAGINA CONTACT (Completo — Come Landing Page)

Identico al form delle landing page, ma:
- Il campo Venue/Location NON è pre-compilato
- Il campo Venue/Location diventa un select con le opzioni: Palermo, Taormina, Cefalù, Noto, Ragusa/Ibla, Trapani/Scopello, Agrigento, Messina area, Not sure yet, Outside Sicily
- Copy del submit button: "Start The Conversation →"

---

## REGOLE GENERALI (Tutti i form)

1. **Styling:** Coerente con il design system (var(--off-white) background, var(--rule) border, var(--ink) focus)
2. **Privacy:** Checkbox GDPR obbligatorio su tutti i form con link alla Privacy Policy
3. **Feedback:** Messaggio di conferma dopo invio, NO redirect a nuova pagina
4. **Validazione:** Inline, in tempo reale, messaggio di errore sotto il campo
5. **Mobile:** Form a colonna singola su schermi ≤960px
6. **Anti-spam:** Honeypot field nascosto (no reCAPTCHA visibile per non rovinare il design)
7. **Backend:** Da definire (Formspree, Resend, o API custom) — tutti i form puntano allo stesso endpoint
8. **Email di conferma:** Il cliente riceve un'email automatica di conferma dopo l'invio
9. **Lingua:** Tutti i form in inglese (target internazionale)
