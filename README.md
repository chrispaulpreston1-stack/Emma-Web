# Emma Hazeldine — personal brand website

Static HTML and CSS. No build step. Deployed to Vercel at **[emmahazeldine.co.uk](https://emmahazeldine.co.uk)**.

## Pages

| URL | File | Purpose |
| --- | --- | --- |
| `/` | `index.html` | Home — Dartmoor hero, services, latest Mulling |
| `/about` | `about.html` | Emma's story and full credentials grid |
| `/what-i-do` | `what-i-do.html` | Seven treatment modalities with evidence notes |
| `/contact` | `contact.html` | Text/WhatsApp, session details, first-visit steps |
| `/mulling/` | `mulling/index.html` | Blog listing |
| `/mulling/pain-isnt-damage` | `mulling/pain-isnt-damage.html` | Sample article with audio player |

Plus `blog-post-template.md` — the scaffold Emma uses for each new Mulling post.

## Structure

```text
.
├── index.html
├── about.html
├── what-i-do.html
├── contact.html
├── mulling/
│   ├── index.html
│   └── pain-isnt-damage.html
├── audio/                    ElevenLabs MP3s, one per post
│   └── README.md             how the audio generation flow works
├── assets/
│   ├── site.css              everything is in one stylesheet
│   ├── logo-*.png
│   └── photo-*.png
├── sitemap.xml
├── robots.txt
├── vercel.json               caching + URL rules
├── .gitignore
└── blog-post-template.md
```

## Preview locally

Open `index.html` in a browser, or serve with:

```bash
python -m http.server 8080
# visit http://localhost:8080/
```

## Deploy

Auto-deploys from `main` via Vercel whenever this repo updates. Project settings:

- **Framework preset:** Other (static)
- **Build command:** (leave empty)
- **Output directory:** `./`
- **Root directory:** `./`

`vercel.json` sets `cleanUrls: true` so `/about.html` serves at `/about` and so on.

## Tech

No frameworks, no JavaScript bundling, no build step. Fonts from Google Fonts CDN. All CSS in a single `assets/site.css`. Mobile-first. Breakpoints at 768 and 1024 pixels. Respects `prefers-reduced-motion`.

## Still to do before full launch

- Generate ElevenLabs audio for the first Mulling post (see `audio/README.md`)
- Write and publish 2–3 more Mulling posts using `blog-post-template.md`
- Replace the placeholder testimonial on the home page with real quotes
- Drop in a map embed on the Contact page once NLFitness address is confirmed
- Proper multi-size favicon (currently using the wave PNG; fine but not pixel-perfect at tiny sizes)
- Add Plausible analytics snippet in every `<head>`
- Create the two downloadable launch PDFs (*Client Information Sheet* + *When You Go Home*)
- Decide on `.co.uk` vs `.com` primary domain — currently `.com` is live; swap planned later

## Links

- Practitioner: Emma Hazeldine — Specialist Biomechanics and Recovery
- Clinic: NLFitness Tavistock Injury Clinic
- Contact: text or WhatsApp on 07902 081 951 · [biomechanicsandrecovery@outlook.com](mailto:biomechanicsandrecovery@outlook.com)
