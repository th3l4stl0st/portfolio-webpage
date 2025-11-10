# Portfolio Webpage Template (Angular)

[![Deploy to GitHub Pages](https://github.com/th3l4stl0st/portfolio-webpage/actions/workflows/deploy.yml/badge.svg)](https://github.com/th3l4stl0st/portfolio-webpage/actions/workflows/deploy.yml)
[![CI (Angular)](https://github.com/th3l4stl0st/portfolio-webpage/actions/workflows/ci.yml/badge.svg)](https://github.com/th3l4stl0st/portfolio-webpage/actions/workflows/ci.yml)

**Languages / Idiomas:** [English](#english-us) • [Español](#espanol)

---

## 🇺🇸 English <a id="english-us"></a>

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
```

* Pages is configured under **Settings → Pages → Source: GitHub Actions**. The final URL appears in **Environments → github-pages** after deployment.

### Local development

```bash
# 1) Install dependencies
npm ci

# 2) Serve locally (Angular CLI)
npm start

# 3) Dev build (optional)
npm run build -- --configuration=development
```

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

---

## 🇪🇸 Español <a id="espanol"></a>

Sitio personal de **portfolio** construido con **Angular** y desplegado automáticamente en **GitHub Pages** mediante **GitHub Actions**. El objetivo es demostrar **buenas prácticas de CI/CD**, reproducibilidad y un despliegue estático listo para producción.

**Demo:** [https://th3l4stl0st.github.io/portfolio-webpage/](https://th3l4stl0st.github.io/portfolio-webpage/)

> Inspirado en [**devportfolio** de Ryan Fitzgerald](https://github.com/RyanFitzgerald/devportfolio) —un template moderno minimalista— pero **migrado a Angular** y con pipeline propio para Pages.

### Stack

* **Frontend:** Angular (SPA)
* **Alojamiento:** GitHub Pages
* **CI/CD:** GitHub Actions (workflows separados para *CI* y *Deploy*)
* **Acción reutilizable:** `.github/actions/angular-pages` para compilar Angular, crear *fallback* SPA y publicar el artefacto de Pages.

### Estructura relevante

```
.github/
├─ actions/
│  └─ angular-pages/
│     └─ action.yml
└─ workflows/
   ├─ ci.yml
   └─ deploy.yml
```

* El repositorio publica en: **Settings → Pages → Source: GitHub Actions**. La URL final aparece en **Environments → github-pages** tras el deploy.

### Desarrollo local

```bash
# 1) Instalar dependencias
npm ci

# 2) Servir en local (Angular CLI)
npm start

# 3) Build de desarrollo (opcional)
npm run build -- --configuration=development
```

> Nota: el pipeline asume una salida tipo `dist/<repo>/browser`. Si tu `angular.json` genera otra ruta, ajusta el `dist-path` en la acción reutilizable.

### CI/CD

#### CI – `ci.yml`

Se ejecuta en *push* y *pull request*:

* `npm ci`
* Lint y tests en headless
* **Build** ligero para detectar errores de compilación

#### Deploy – `deploy.yml`

En *push* a `main` (o manual con `workflow_dispatch`):

1. Instala dependencias y **compila Angular**
2. Ajusta automáticamente **`--base-href`** a `/<repo>/` (o a `/` si es *User/Org Page*)
3. Crea el **SPA fallback** copiando `index.html` → `404.html`
4. Sube artefacto con `actions/upload-pages-artifact`
5. Publica al entorno **github-pages** con `actions/deploy-pages@v4`

Ambos workflows están visibles en **Actions** como **“CI (Angular)”** y **“Deploy to GitHub Pages.”**

### Configuración de Pages

* **Source:** GitHub Actions (no se usa la rama `gh-pages`, se publica desde el artefacto del workflow).
* **Base href:**

  * Repositorio de proyecto (este caso): `--base-href="/portfolio-webpage/"`
  * User/Org Page (`<usuario>.github.io`): `--base-href="/"` (forzar vía input de la acción)
* **SPA fallback:** `404.html` para evitar 404 al recargar rutas internas.

### Despliegue manual

* Lanza el workflow **“Deploy to GitHub Pages”** desde la pestaña **Actions** (*workflow_dispatch*), o
* Haz **push** a la rama configurada para despliegue (por defecto, `main`).

### Créditos

* **Template original:** [RyanFitzgerald/devportfolio](https://github.com/RyanFitzgerald/devportfolio) (Astro + Tailwind).
  Este repositorio **reinterpreta** el diseño en **Angular** y lo integra con **GitHub Pages + Actions**.

### Licencia

**MIT**. Ver [`LICENSE`](./LICENSE).

> Si quieres reaprovechar la **acción reutilizable** de despliegue Angular a Pages para otros proyectos, revisa `.github/actions/angular-pages/action.yml` y los workflows `ci.yml` / `deploy.yml` como referencia.
