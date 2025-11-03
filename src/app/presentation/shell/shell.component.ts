import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ThemeService } from '../../core/theme/theme.service';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: `
    <mat-sidenav-container class="container">
      <mat-sidenav #drawer class="sidenav" mode="over">
        <nav aria-label="Menú lateral">
          <a mat-list-item routerLink="/" (click)="drawer.close()">Inicio</a>
          <a mat-list-item routerLink="/projects" (click)="drawer.close()">Proyectos</a>
          <a mat-list-item routerLink="/about" (click)="drawer.close()">Sobre mí</a>
          <a mat-list-item routerLink="/contact" (click)="drawer.close()">Contacto</a>
        </nav>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary" class="toolbar">
          <button
            mat-icon-button
            (click)="drawer.toggle()"
            aria-label="Abrir menú"
            class="hide-desktop"
          >
            <span class="material-symbols-outlined">menu</span>
          </button>

          <a class="brand" routerLink="/">Mi Portfolio</a>

          <span class="spacer"></span>

          <nav class="hide-mobile" aria-label="Navegación principal">
            <a mat-button routerLink="/projects">Proyectos</a>
            <a mat-button routerLink="/about">Sobre mí</a>
            <a mat-stroked-button routerLink="/contact">Contacto</a>
            <button
              mat-icon-button
              (click)="toggleTheme()"
              [attr.aria-pressed]="dark()"
              aria-label="Cambiar tema (claro/oscuro)"
            >
              <span class="material-symbols-outlined">{{
                dark() ? 'light_mode' : 'dark_mode'
              }}</span>
            </button>
          </nav>
        </mat-toolbar>

        <main class="content" role="main">
          <router-outlet />
        </main>

        <footer class="footer" role="contentinfo">
          <div>
            © {{ year }} · Alejandro Habernaud Mora ·

            <!-- LinkedIn -->
            <a
              class="social-link"
              href="https://www.linkedin.com/in/alejandro-habernaud-mora"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Perfil de LinkedIn de Alejandro Habernaud Mora"
              title="LinkedIn"
            >
              <svg
                class="icon icon-li"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.454C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0zM6.854 20.452H3.816V9h3.038v11.452zM5.337 7.433a2.062 2.062 0 1 1 .001-4.124 2.062 2.062 0 0 1-.001 4.124zM20.447 20.452h-3.554v-5.569c0-1.328-.027-3.039-1.852-3.039-1.853 0-2.136 1.445-2.136 2.939v5.669H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.367-1.852 3.599 0 4.264 2.37 4.264 5.455v6.288z"
                />
              </svg>
              <span class="sr-only">LinkedIn</span>
            </a>

            <!-- GitHub -->
            <a
              class="social-link"
              href="https://github.com/th3l4stl0st"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub de Alejandro Habernaud Mora"
              title="GitHub"
            >
              <!-- Octocat mark (SVG) -->
              <svg
                class="icon icon-gh"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                role="img"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
                    0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52
                    -.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
                    0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27
                    1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
                    0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
                />
              </svg>
              <span class="sr-only">GitHub</span>
            </a>
          </div>
        </footer>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      .container {
        height: 100vh;
      }
      .toolbar {
        position: sticky;
        top: 0;
        z-index: 2;
      }
      .brand {
        color: inherit;
        text-decoration: none;
        font-weight: 600;
        margin-left: 0.25rem;
      }
      .spacer {
        flex: 1;
      }
      .content {
        padding: 1rem;
        max-width: 1100px;
        margin: 0 auto;
      }

      .footer {
        padding: 1rem;
        text-align: center;
        opacity: 0.8;
        .social-link {
    text-decoration: none;
    margin-left: .5rem;

    .icon {
      width: 1.1em;   // mismo alto que el texto
      height: 1.1em;
      display: inline-block;
      vertical-align: -0.2em;
      fill: currentColor;
      max-width: none;
      max-height: none;
    }

    &:hover,
    &:focus {
      opacity: .85;
    }
  }
}

      // Accesibilidad: texto solo para lectores de pantalla
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 1px, 1px);
        white-space: nowrap;
        border: 0;
      }

      .hide-mobile {
        display: none;
      }
      @media (min-width: 900px) {
        .hide-desktop {
          display: none;
        }
        .hide-mobile {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
      }
    `,
  ],
})
export class ShellComponent {
  private theme = inject(ThemeService);
  year = new Date().getFullYear();
  dark = signal(this.theme.isDark());

  toggleTheme() {
    this.theme.toggle();
    this.dark.set(this.theme.isDark());
  }
}
