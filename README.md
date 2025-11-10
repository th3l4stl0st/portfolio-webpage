# Portfolio Webpage Template(Angular)

[![Deploy to GitHub Pages](https://github.com/th3l4stl0st/portfolio-webpage/actions/workflows/deploy.yml/badge.svg)](https://github.com/th3l4stl0st/portfolio-webpage/actions/workflows/deploy.yml)
[![CI (Angular)](https://github.com/th3l4stl0st/portfolio-webpage/actions/workflows/ci.yml/badge.svg)](https://github.com/th3l4stl0st/portfolio-webpage/actions/workflows/ci.yml)

Sitio personal de **portfolio** construido con **Angular** y desplegado automáticamente en **GitHub Pages** mediante **GitHub Actions**. El objetivo es demostrar **buenas prácticas de CI/CD**, reproducibilidad y despliegue estático listo para producción. ([GitHub][1])

**Demo:** [https://th3l4stl0st.github.io/portfolio-webpage/](https://th3l4stl0st.github.io/portfolio-webpage/) ([GitHub][1])

> 👇 Este proyecto está **inspirado en** [**devportfolio** de Ryan Fitzgerald](https://github.com/RyanFitzgerald/devportfolio) —un template moderno minimalista— pero **migrado a Angular** y con pipeline propio para Pages. ([GitHub][2])

---

## Stack

* **Frontend:** Angular (SPA)
* **Alojamiento:** GitHub Pages
* **CI/CD:** GitHub Actions (workflows separados para *CI* y *Deploy*)
* **Acción reutilizable propia:** `.github/actions/angular-pages` para compilar Angular, crear *fallback* SPA y publicar el artefacto de Pages. ([GitHub][1])

---

## Estructura relevante

```
.github/
├─ actions/
│  └─ angular-pages/
│     └─ action.yml
└─ workflows/
   ├─ ci.yml
   └─ deploy.yml
```

* El repositorio publica en: **Settings → Pages → Source: GitHub Actions**. La URL final aparece en **Environments → github-pages** tras el deploy. ([GitHub][1])

---

## Desarrollo local

```bash
# 1) Instalar dependencias
npm ci

# 2) Servir en local (Angular CLI)
npm start

# 3) Build de desarrollo (opcional)
npm run build -- --configuration=development
```

> Nota: el pipeline asume una salida tipo `dist/<repo>/browser`. Si tu `angular.json` genera otra ruta, ajusta el `dist-path` en la acción reutilizable. ([GitHub][1])

---

## CI/CD

### CI – `ci.yml`

Se ejecuta en *push* y *pull request* para validar calidad:

* `npm ci`
* *Lint* y tests en headless
* **Build** ligero para detectar errores de compilación

### Deploy – `deploy.yml`

En *push* a `main` (o manual con `workflow_dispatch`):

1. Instala dependencias y **compila Angular**
2. Ajusta automáticamente **`--base-href`** a `/<repo>/` (o a `/` si es *User/Org Page*)
3. Crea el **SPA fallback** copiando `index.html` → `404.html`
4. Sube artefacto con `actions/upload-pages-artifact`
5. Publica al entorno **github-pages** con `actions/deploy-pages@v4`

Ambos workflows están visibles en **Actions** como **“CI (Angular)”** y **“Deploy to GitHub Pages”**. ([GitHub][1])

---

## Configuración de Pages

* **Source:** GitHub Actions (no se usa la rama `gh-pages`, se publica desde el artefacto del workflow).
* **Base href:**

  * Repositorio de proyecto (este caso): `--base-href="/portfolio-webpage/"`
  * User/Org Page (`<usuario>.github.io`): `--base-href="/"` (forzar vía input de la acción)
* **SPA fallback:** `404.html` para evitar 404 al recargar rutas internas. ([GitHub][1])

---

## Despliegue manual

* Lanza el workflow **“Deploy to GitHub Pages”** desde la pestaña **Actions** (*workflow_dispatch*), o
* Haz **push** a la rama configurada para despliegue (por defecto, `main`). ([GitHub][1])

---

## Créditos

* **Template original:** [RyanFitzgerald/devportfolio](https://github.com/RyanFitzgerald/devportfolio) (Astro + Tailwind). Este repositorio **reinterpreta** el diseño en **Angular** y lo integra con **GitHub Pages** + **Actions**. ([GitHub][2])

---

## Licencia

**MIT**. Ver [`LICENSE`](./LICENSE). ([GitHub][1])

---

> Si quieres reaprovechar la **acción reutilizable** de despliegue Angular a Pages para otros proyectos, revisa `.github/actions/angular-pages/action.yml` y los workflows `ci.yml` / `deploy.yml` como referencia. ([GitHub][1])

[1]: https://github.com/th3l4stl0st/portfolio-webpage "GitHub - th3l4stl0st/portfolio-webpage: My portfolio in github pages"
[2]: https://github.com/RyanFitzgerald/devportfolio?utm_source=chatgpt.com "RyanFitzgerald/devportfolio"
