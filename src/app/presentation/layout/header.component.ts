import { Component, HostListener } from '@angular/core';
import { ThemeToggleComponent } from '../../system/theme/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ThemeToggleComponent],
  styles: [
    `
      header.site-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        width: 100%;
        background: transparent;
        transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease,
          backdrop-filter 0.2s ease;
      }

      header.site-header.scrolled {
        background: var(--header-bg);
        border-bottom-color: var(--header-border);
        backdrop-filter: saturate(180%) blur(10px);
        -webkit-backdrop-filter: saturate(180%) blur(10px);
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
      }

      .header-inner {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        justify-content: center;
        padding-block: var(--space-3);
        padding-inline: clamp(16px, 3.5vw, 128px);
      }

      nav.nav {
        justify-self: center;
        display: flex;
        gap: 24px;
        align-items: center;
      }

      nav.nav a {
        color: var(--header-link);
        padding: var(--space-2) var(--space-3);
        text-decoration: none;
        transition: color 0.2s ease;
        font-size: var(--font-size-md);
        font-weight: var(--fw-medium);
        cursor: pointer;
      }

      nav.nav a:hover {
        color: var(--header-link-hover);
        text-decoration: none;
      }

      .toggle {
        justify-self: end;
      }
    `,
  ],
  template: `
    <header class="site-header" [class.scrolled]="scrolled">
      <div class="header-inner">
        <!-- IZQUIERDA vacía (para centrar el nav correctamente) -->
        <div></div>

        <!-- CENTRO: Navegación -->
        <nav class="nav" aria-label="Navegación principal">
          <a href="#about" (click)="go($event, 'about')">Sobre mí</a>
          <a href="#projects" (click)="go($event, 'projects')">Proyectos</a>
          <a href="#experience" (click)="go($event, 'experience')">Experiencia</a>
          <a href="#education" (click)="go($event, 'education')">Educación</a>
        </nav>

        <!-- DERECHA: Toggle -->
        <div class="toggle"><theme-toggle></theme-toggle></div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  scrolled = false;

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 8; // efecto glass al mover
  }

  go(ev: Event, id: string) {
    ev.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const header = document.querySelector('header.site-header') as HTMLElement | null;
    const offset = (header?.offsetHeight ?? 0) + 8;
    const y = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}
