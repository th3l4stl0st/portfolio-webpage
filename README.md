# Portfolio Webpage Template (Angular)
---
[![Deploy to GitHub Pages](https://github.com/th3l4stl0st/portfolio-webpage/actions/workflows/deploy.yml/badge.svg)](https://github.com/th3l4stl0st/portfolio-webpage/actions/workflows/deploy.yml)
[![CI (Angular)](https://github.com/th3l4stl0st/portfolio-webpage/actions/workflows/ci.yml/badge.svg)](https://github.com/th3l4stl0st/portfolio-webpage/actions/workflows/ci.yml)
---
![Portfolio Cover](./img/portfolio-hero.png)
---

Personal **portfolio** site built with **Angular** and automatically deployed to **GitHub Pages** via **GitHub Actions**. The goal is to showcase **CI/CD best practices**, reproducibility, and a production-ready static deployment.

**Demo:** [https://th3l4stl0st.github.io/portfolio-webpage/](https://th3l4stl0st.github.io/portfolio-webpage/)

> Inspired by [**devportfolio** by Ryan Fitzgerald](https://github.com/RyanFitzgerald/devportfolio) — a minimalist modern template — but **migrated to Angular** and integrated with a custom Pages pipeline.

### Stack

* **Frontend:** Angular (SPA)
* **Hosting:** GitHub Pages
* **CI/CD:** GitHub Actions (separate workflows for *CI* and *Deploy*)
* **Reusable action:** `.github/actions/angular-pages` to build Angular, create an SPA fallback, and publish the Pages artifact.

### Relevant structure

```

.github/
├─ actions/
│  └─ angular-pages/
│     └─ action.yml
└─ workflows/
├─ ci.yml
└─ deploy.yml

````

* Pages is configured under **Settings → Pages → Source: GitHub Actions**. The final URL appears in **Environments → github-pages** after deployment.

### Local development

```bash
# 1) Install dependencies
npm ci

# 2) Serve locally (Angular CLI)
npm start

# 3) Dev build (optional)
npm run build -- --configuration=development
````

> Note: the pipeline assumes a `dist/<repo>/browser` output. If your `angular.json` produces a different path, adjust the `dist-path` in the reusable action.

### CI/CD

#### CI – `ci.yml`

Runs on *push* and *pull_request*:

* `npm ci`
* Lint and headless tests
* Light **build** to catch compilation errors

#### Deploy – `deploy.yml`

On *push* to `main` (or manual `workflow_dispatch`):

1. Install deps and **build Angular**
2. Auto-set **`--base-href`** to `/<repo>/` (or `/` for User/Org Pages)
3. Create the **SPA fallback** by copying `index.html` → `404.html`
4. Upload artifact with `actions/upload-pages-artifact`
5. Publish to **github-pages** with `actions/deploy-pages@v4`

Both workflows appear in **Actions** as **“CI (Angular)”** and **“Deploy to GitHub Pages.”**

### Pages configuration

* **Source:** GitHub Actions (no `gh-pages` branch; deployment from the workflow artifact).
* **Base href:**

  * Project Page (this repo): `--base-href="/portfolio-webpage/"`
  * User/Org Page (`<user>.github.io`): `--base-href="/"` (set via action input)
* **SPA fallback:** `404.html` to avoid 404s when reloading deep links.

### Manual deploy

* Trigger **“Deploy to GitHub Pages”** from **Actions** (`workflow_dispatch`), or
* Push to the configured deploy branch (default: `main`).

### Credits

* **Original template:** [RyanFitzgerald/devportfolio](https://github.com/RyanFitzgerald/devportfolio) (Astro + Tailwind).
  This repo **reinterprets** the design in **Angular** and integrates it with **GitHub Pages + Actions**.

### License

**MIT**. See [`LICENSE`](./LICENSE).

> If you want to reuse the **Angular-to-Pages reusable action** elsewhere, check `.github/actions/angular-pages/action.yml` and the `ci.yml` / `deploy.yml` workflows.
