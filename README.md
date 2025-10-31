# Portfolio Webpage (Angular)

[![Deploy to GitHub Pages](https://github.com/th3l4stl0st/portfolio-webpage/actions/workflows/deploy.yml/badge.svg)](https://github.com/th3l4stl0st/portfolio-webpage/actions/workflows/deploy.yml)
[![CI (Angular)](https://github.com/th3l4stl0st/portfolio-webpage/actions/workflows/ci.yml/badge.svg)](https://github.com/th3l4stl0st/portfolio-webpage/actions/workflows/ci.yml)

Sitio personal de portfolio construido con Angular y desplegado automáticamente en GitHub Pages mediante GitHub Actions. El objetivo es demostrar dominio de CI/CD, reproducibilidad y buenas prácticas de despliegue en entornos estáticos.

## URL: [https://th3l4stl0st.github.io/portfolio-webpage/](https://th3l4stl0st.github.io/portfolio-webpage/)

## Stack

* Frontend: Angular
* Infra de despliegue: GitHub Pages
* CI/CD: GitHub Actions (workflows separados para CI y Deploy)
* Acción reutilizable propia: `.github/actions/angular-pages` (compila Angular, crea fallback SPA y sube artifact para Pages)

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

## Flujo de CI/CD

1. CI (`ci.yml`): en cada push y pull request se ejecutan `npm ci`, `lint`, tests en headless y un build ligero para detectar errores de compilación.
2. Deploy (`deploy.yml`): al hacer push a `main` (o manual con `workflow_dispatch`), se invoca la acción reutilizable que:

   * Instala dependencias y compila Angular.
   * Ajusta `--base-href` automáticamente a `/<repo>/` (o a `/` si se fuerza para User Page).
   * Crea fallback SPA copiando `index.html` → `404.html` para evitar 404 en rutas internas.
   * Sube el resultado con `actions/upload-pages-artifact`.
   * Publica con `actions/deploy-pages@v4` al entorno `github-pages`.

## Configuración de Pages

En el repositorio: Settings → Pages → Build and deployment → Source: GitHub Actions.
La URL de publicación aparece en Environments → github-pages al finalizar el job de deploy.

## Desarrollo local

```
npm ci
npm start
```

Build de desarrollo:

```
npm run build -- --configuration=development
```

## Despliegue manual

Lanzar el workflow “Deploy to GitHub Pages” desde la pestaña Actions (evento `workflow_dispatch`) o hacer push a la rama configurada para despliegue (por defecto, `main`).

## Notas técnicas

* `base-href`

  * Project Page (este repositorio): `--base-href="/portfolio-webpage/"` (se infiere automáticamente).
  * User/Org Page (si el repositorio se llama `th3l4stl0st.github.io`): `--base-href="/"` (forzar en el input `base-href` de la acción).
* Directorio de salida

  * Por defecto se asume `dist/<repo>/browser`. Si `angular.json` genera otra ruta, ajuste `dist-path` en la acción.
* SPA fallback

  * Duplicar `index.html` como `404.html` permite refrescar rutas internas sin 404 en GitHub Pages.

## Buenas prácticas incluidas

* Permisos mínimos en workflows (`contents: read`, `pages: write`, `id-token: write`).
* Concurrencia para evitar despliegues solapados.
* Cache de npm para acelerar pipelines.
* Workflows separados (calidad antes de despliegue).

## Licencia

MIT

