# Threat Intel Report Dashboard

An interactive, single-page dashboard for presenting cyber threat intelligence findings — built with vanilla HTML/CSS/JS. Designed to mimic the structure a real analyst-grade intelligence report would use: sectioned navigation, a searchable/filterable observables (IOC) table, a filterable collection log, category taxonomy filtering, and a screenshot lightbox.

> ⚠️ **All data in this project is fictional.** Threat actor names referenced for educational/illustrative context (e.g. publicly reported ransomware group names) are used only to demonstrate realistic report structure — all specific "observations," IOCs, dates, wallet addresses, and individuals in the sample dataset are made up and do not represent real collected intelligence.

## Live demo

Open `index.html` in a browser, or serve the folder with any static file server:

```bash
python3 -m http.server 8000
```

## Features

- **Section-based navigation** (`script.js`) — sidebar links swap visible report sections without a page reload and keep the URL hash in sync (`#taxonomy`, `#observables`, etc.)
- **Taxonomy filtering** — category buttons filter a card grid of "threat category" entries (initial access, malware, infostealer logs, leaked databases, hosting, laundering)
- **Collection log search + filter** — free-text search combined with a source-type dropdown (primary vs. secondary) filters a timeline of entries
- **Observables (IOC) table** — searchable table of defanged sample indicators (onion URLs, handles, IPs, wallet addresses) with one-click "copy defanged observable" buttons and a toast confirmation
- **Screenshot lightbox** — click-to-enlarge modal for report screenshots, closable via click-outside or `Escape`
- **Print/export styling** — a dedicated print button and print stylesheet for generating a clean PDF export of the report

## Why this project

This started as a practice exercise in presenting security research the way a real threat-intel team would: taxonomy of underground marketplace activity, a RaaS/Initial-Access-Broker ecosystem breakdown, a Russian- vs. English-language forum culture comparison, and analyst judgments with confidence levels. The goal was to practice both the **information architecture of an intelligence report** and the **frontend interactivity** (filtering, search, state-driven UI) needed to make a large report navigable.

## Tech stack

- Plain HTML5 / CSS3 (no build step, no frameworks)
- Vanilla JavaScript (DOM APIs, `classList`, Clipboard API)
- No external dependencies

## Project structure

```
.
├── index.html                    # Report markup & sample content
├── style.css                     # All styling (dark theme, cards, tables, modal)
├── script.js                     # Navigation, filtering, search, lightbox, clipboard
├── dark_web_listing_mockup.png   # Illustrative mockup screenshot (labeled as mockup)
└── threat_economy_hero.png       # Hero/banner illustration
```

## Notes on realism vs. fiction

The report format (taxonomy tables, RaaS/IAB pipeline diagrams, forum-culture comparison matrix, confidence-rated analytic judgments, a defanged-IOC appendix, and a UTC-timestamped collection log) mirrors how professional threat-intel teams structure real deliverables. The *content* populating that format in this repo is entirely a fictional sample dataset, built to exercise the UI rather than to report on any real, current threat activity.

## License

MIT — feel free to fork and adapt the report template for your own (clearly-labeled) sample projects.
