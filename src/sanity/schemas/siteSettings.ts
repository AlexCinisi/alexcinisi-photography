import { defineField, defineType } from 'sanity'

const MESI = [
  { title: 'Gennaio', value: 1 }, { title: 'Febbraio', value: 2 }, { title: 'Marzo', value: 3 },
  { title: 'Aprile', value: 4 }, { title: 'Maggio', value: 5 }, { title: 'Giugno', value: 6 },
  { title: 'Luglio', value: 7 }, { title: 'Agosto', value: 8 }, { title: 'Settembre', value: 9 },
  { title: 'Ottobre', value: 10 }, { title: 'Novembre', value: 11 }, { title: 'Dicembre', value: 12 },
]

export default defineType({
  name: 'siteSettings',
  title: '⚙️ Impostazioni sito',
  type: 'document',

  fieldsets: [
    { name: 'availability', title: '🟢 Disponibilità — un posto solo per tutto il sito', options: { collapsible: true, collapsed: false } },
    { name: 'urgency', title: '🟡 Urgenza dei form ads', options: { collapsible: true, collapsed: true } },
  ],

  fields: [
    defineField({
      name: 'title', title: 'Nome (interno)', type: 'string',
      initialValue: 'Impostazioni sito', validation: (Rule) => Rule.required(),
    }),

    // ──── DISPONIBILITÀ ────
    // Prima del 9/9 questo testo viveva in sei posti: cablato in Availability.tsx
    // per la homepage, più un array per ciascuna delle cinque location page. In
    // meno di un anno le cinque copie erano già divergenti — maiuscole, punti
    // finali, uno spazio di troppo, e un pallino del colore sbagliato.
    defineField({
      name: 'availabilityAutoYear', title: 'Calcola gli anni da solo', type: 'boolean',
      fieldset: 'availability', initialValue: true,
      description: 'Acceso: gli anni si derivano dalla data corrente e non vanno più aggiornati a mano ogni gennaio. Puoi comunque forzarne uno scrivendolo nel campo "Anno" della singola riga. Spento: valgono solo gli anni che scrivi tu.',
    }),
    defineField({
      name: 'availabilityRolloverMonth', title: 'Da che mese il sito parla dell\'anno dopo', type: 'number',
      fieldset: 'availability', initialValue: 11,
      options: { list: MESI, layout: 'dropdown' },
      description: 'Da questo mese in poi la prima riga passa all\'anno successivo. Serve perché a dicembre "anno corrente" è già una data scaduta per chi cerca un fotografo. Novembre è il default: la stagione siciliana arriva a ottobre, e finché dura ha senso parlare ancora dell\'anno in corso.',
      hidden: ({ document }) => document?.availabilityAutoYear === false,
    }),
    defineField({
      name: 'availabilityItems', title: 'Righe di disponibilità',
      type: 'array', fieldset: 'availability',
      description: 'L\'ordine conta: con il calcolo automatico la prima riga è l\'anno di base, la seconda quello dopo, e così via.',
      of: [{
        type: 'object', name: 'availabilityItem',
        fields: [
          defineField({
            name: 'year', title: 'Anno (lascia vuoto per calcolarlo)', type: 'string',
            description: 'Vuoto = calcolato dalla posizione della riga. Scrivi un valore solo per forzare un anno specifico.',
          }),
          defineField({
            name: 'status', title: 'Stato', type: 'string', validation: (Rule) => Rule.required(),
            description: '⚠️ Questo lo scrivi tu e non si aggiorna da solo: è un\'affermazione sul tuo calendario, e nessuna formula sa se hai ancora date libere.',
          }),
          defineField({ name: 'substatus', title: 'Sotto-stato', type: 'string' }),
          defineField({
            name: 'dotClass', title: 'Colore del pallino', type: 'string',
            options: { list: [
              { title: 'Verde — disponibile', value: 'open' },
              { title: 'Ambra — in arrivo', value: 'soon' },
              { title: 'Grigio — chiuso', value: 'closed' },
            ] },
            initialValue: 'open',
          }),
        ],
        preview: {
          select: { year: 'year', status: 'status', substatus: 'substatus' },
          prepare: ({ year, status, substatus }) => ({
            title: `${year || '(anno calcolato)'} — ${status || '(senza stato)'}`,
            subtitle: substatus,
          }),
        },
      }],
      initialValue: [
        { _type: 'availabilityItem', status: 'Select dates still available', substatus: 'Spring & Autumn openings remaining', dotClass: 'open' },
        { _type: 'availabilityItem', status: 'Now accepting enquiries', substatus: 'Secure your date early', dotClass: 'soon' },
      ],
    }),
    defineField({
      name: 'availabilityText', title: 'Paragrafo della sezione', type: 'text', rows: 3, fieldset: 'availability',
      initialValue: 'I accept a limited number of weddings each year to ensure every couple receives my full creative attention and bespoke service. Peak season dates fill 12–18 months in advance.',
    }),

    // ──── URGENZA ADS ────
    defineField({
      name: 'adsFormUrgency', title: 'Urgenza sotto il form delle ads', type: 'string', fieldset: 'urgency',
      description: 'Vale dove la singola pagina ads non ha un testo suo. ⚠️ Non si calcola da solo: "Only 4 dates remaining" è un numero che conosci tu.',
      initialValue: 'Limited dates remaining for the current season.',
    }),
  ],

  preview: {
    prepare: () => ({ title: 'Impostazioni sito', subtitle: 'Disponibilità e urgenza — valgono su tutto il sito' }),
  },
})
