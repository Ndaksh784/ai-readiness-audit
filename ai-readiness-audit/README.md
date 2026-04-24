# SignalStack — AI Readiness Audit

> How ready is your website for AI? Find out in seconds.

**Live demo:** https://ai-readiness-audit-kappa.vercel.app/ &nbsp;·&nbsp; **GitHub:** https://github.com/Ndaksh784/ai-readiness-audit

---

## What is this?

Most websites are optimized for humans and traditional SEO. But as LLMs, AI search copilots, and retrieval agents increasingly consume web content, a new question matters: **can an AI actually understand your page?**

SignalStack is a prototype audit tool that scores a website's AI readiness — surfacing gaps in structured data, content depth, heading clarity, and citability signals that affect how AI systems parse and prioritize your content.

---

## Features

- **AI Readiness Score** — a 0–100 composite score across five categories
- **Issue breakdown** — 4–5 specific issues with severity levels and actionable fixes
- **Positive signals** — what the site is already doing right
- **Score interpretation** — a short plain-English summary of the result
- **Deterministic output** — the same URL always produces the same result (no randomness)

---

## Score Categories

| Category | What it checks |
|---|---|
| Structured data | JSON-LD, schema.org, Open Graph, machine-readable markup |
| FAQ / Q&A content | FAQ sections, question-formatted headings, conversational content |
| Heading hierarchy | Logical H1/H2/H3 structure, descriptive and scannable headings |
| Content depth | Specificity, factual density, comprehensiveness vs. thin copy |
| LLM citability | Author attribution, dates, cited sources, quotable claims |

---

## Tech stack

- **React** + **Vite**
- **JavaScript (ES6+)**
- **Lucide React** — icons
- **Vercel** — deployment

---

## Project structure

```
ai-readiness-audit/
├── src/
│   ├── components/
│   │   ├── IssueCard.jsx       # Individual issue display with severity badge
│   │   └── ScoreRing.jsx       # Circular score visualization
│   ├── lib/
│   │   └── audit.js            # Scoring logic and issue generation
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── public/
├── index.html
├── package.json
└── vite.config.js
```

---

## Run locally

```bash
git clone https://github.com/Ndaksh784/ai-readiness-audit
cd ai-readiness-audit
npm install
npm run dev
```

Then open `http://localhost:5173`.

```bash
npm run build    # production build → /dist
```

---

## Deploy to Vercel

1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Set framework preset to **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy

---

## Design decisions

**Deterministic mocking over randomness** — scores and issues are derived from URL-based logic so results are consistent and feel credible. A tool that gives different results on refresh isn't trustworthy.

**No live crawling (by design)** — this prototype focuses on product clarity and UI rather than crawling infrastructure. The scoring logic is a simplified ruleset that mirrors what a real audit engine would surface.

**Product-first** — the emphasis is on the quality of feedback: are the issues specific? Are the fixes actionable? Does the UI communicate confidence without being noisy?

---

## What this version doesn't do

This is a prototype. It does not:

- Fetch or parse live HTML
- Detect real schema markup or metadata
- Perform NLP or semantic analysis
- Crawl multiple pages

These would be the next steps in a production version.

---

## About

Built as part of a technical assignment to demonstrate product thinking around AI content discoverability.

**Daksh** · [GitHub](https://github.com/Ndaksh784)