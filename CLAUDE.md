# CLAUDE.md — alexcinisi-photography (SPOSTARE questo file nel repo come CLAUDE.md e committare)

Sito luxury wedding photography, pubblico USA/UK/AU. Stack: Next.js 15.x + Sanity 3.x + Vercel (iad1) + Custom CSS (NO Tailwind). Studio su /studio. Il contesto strategico vive nel vault Obsidian (`../vault/Home.md`).

## Regole non negoziabili
1. Task atomici: un concern, `npm run build` verde, un commit. Git di Alex salvo delega esplicita.
2. Mai upgrade major automatici (next, sanity, @sanity/client, @next/third-parties): task dedicato.
3. GTM (GTM-TF7NV8F) unico entry point tag terzi — nessun pacchetto npm analytics.
4. Canonical footgun: root layout → homepage. Ogni nuova route indicizzabile dichiara canonical esplicito in generateMetadata().
5. JSON-LD con <script> nativo, mai <Script> Next.
6. Redirect in next.config.ts, NON in vercel.json (vercel.json = headers + cron).
7. Env var Vercel senza virgolette (UrlError).
8. Contact form 5 livelli (CSRF → Upstash 3/h/IP → Zod → honeypot → Turnstile): non toccare senza task dedicato.
9. Prima di cambi slug: audit href raw in seoContent + redirect 301 nello stesso commit.
10. Check NEXT_PUBLIC_VERCEL_ENV === 'production' per non caricare GTM su preview.

## Design system
Palette: white, pearl, smoke, ink. Font: Red Hat Display 300 (heading), Bodoni Moda italic 300 (em), Jost (.f-label). Mai aspect ratio forzato; hover solo opacity 0.3s; 3:4 dominante; focalpoint via .fit('crop').crop('focalpoint'); .floating-frame --light/--dark; heroTextDark per hero chiari; hero 65vh solo con immagine Sanity reale. Titoli sezione: SectionHead/.sec-title (ads-* e svc-h2 DEPRECATE — ripulire ogni file toccato).

## Copy
Silent luxury: specificità, non aggettivi. Bandite: beautiful, stunning, gorgeous, lovely, perfect, breathtaking, amazing. Bride-first; ads gender-inclusive. Alt text: EN, 120–150 char (hero 100–130), no "A photo of", zero duplicati, mai speculativi.
