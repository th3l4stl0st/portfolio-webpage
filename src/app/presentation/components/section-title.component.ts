import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  standalone: true,
  styles: [
    `
      :host {
        display: block;
      }
      section.section {
        padding-block: clamp(3rem, 10vh, 8rem);
      }

      /* Grid: izquierda título, derecha contenido */
      .section-grid {
        display: grid;
        grid-template-columns: minmax(220px, 1fr) minmax(0, 2fr);
        gap: clamp(24px, 5vw, 64px);
        align-items: start;
      }

      /* Título grande */
      .title {
        margin: 0;
        color: var(--color-text);
        font-family: var(--font-heading);
        font-weight: 1000;
        letter-spacing: -0.04em;
        line-height: 1.05;
        font-size: clamp(2.25rem, 8vw, 4.5rem);
      }

      /* Subrayado/rectángulo en color de acento */
      .underline {
        display: block;
        width: clamp(56px, 6vw, 96px);
        height: 4px;
        background: var(--color-accent);
        border-radius: 999px;
        margin-top: var(--space-3);
      }

      /* Contenido por defecto: tipografía amplia tipo “About” */
      .content {
        margin: 0 16px 0 0;
        color: var(--color-text);
        font-size: clamp(1.05rem, 1.8vw, 1.35rem);
        line-height: 1.9;
        letter-spacing: 0.015em;
      }

      /* Responsive: una sola columna */
      @media (max-width: 900px) {
        .section-grid {
          grid-template-columns: 1fr;
        }
        .title {
          font-size: clamp(2rem, 10vw, 3rem);
        }
        .content {
          font-size: clamp(1rem, 2.8vw, 2rem);
        }
      }
    `,
  ],
  template: `
    <section class="section container" [attr.aria-labelledby]="headingId" [attr.id]="sectionId">
      <div class="section-grid">
        <div>
          <h2 class="title" [id]="headingId">{{ title }}</h2>
          <span class="underline" aria-hidden="true"></span>
        </div>

        <div class="content">
          <ng-content></ng-content>
        </div>
      </div>
    </section>
  `,
})
export class SectionTitleComponent {
  @Input({ required: true }) title!: string;
  @Input() sectionId?: string;

  // id accesible para aria-labelledby
  headingId = `h-${Math.random().toString(36).slice(2, 8)}`;
}
