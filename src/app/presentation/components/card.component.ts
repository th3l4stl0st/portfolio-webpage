import { Component } from '@angular/core';

@Component({
  selector: 'ui-card',
  standalone: true,
  styles: [
    `
      :host {
        display: block;
      }

      .card {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 14px;
        padding: clamp(16px, 2.5vw, 24px);
        border-radius: 16px;
        background: color-mix(in oklab, var(--color-text) 6%, transparent);
        box-shadow: 0 1px 0 color-mix(in oklab, var(--color-text) 14%, transparent);
        transition: background-color 0.35s ease, box-shadow 0.35s ease, color 0.35s ease;
        color: var(--color-text);
        overflow: hidden;
      }

      /* Cabecera: bloque de título/subtítulo + fechas */
      .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
      }

      /* Columna izquierda: título + subtítulo */
      .title-block {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .title {
        margin: 0;
        font-weight: 900;
        letter-spacing: -0.02em;
        font-size: clamp(1.05rem, 2.2vw, 1.35rem);
      }

      .subtitle {
        margin: 0;
        font-weight: 600;
        color: var(--color-accent);
        font-size: 1rem;
      }

      .dates {
        margin: 0;
        font-size: 0.95rem;
        color: var(--color-muted);
        white-space: nowrap;
      }

      .desc {
        color: var(--color-muted);
        line-height: 1.7;
        font-size: 0.98rem;
      }

      @media (max-width: 640px) {
        .header {
          flex-direction: column;
          align-items: flex-start;
        }

        .dates {
          order: 2;
        }

        .title-block {
          order: 1;
        }
      }

      .chips:empty,
      .actions:empty {
        display: none;
      }
    `,
  ],
  template: `
    <article class="card">
      <!-- Cabecera: título/subtítulo + fecha -->
      <div class="header">
        <div class="title-block">
          <div class="title">
            <ng-content select="[card-title]"></ng-content>
          </div>
          <div class="subtitle">
            <ng-content select="[card-subtitle]"></ng-content>
          </div>
        </div>

        <div class="dates">
          <ng-content select="[card-meta-end]"></ng-content>
        </div>
      </div>

      <!-- Descripción -->
      <div class="desc">
        <ng-content select="[card-desc]"></ng-content>
      </div>

      <div class="chips">
        <ng-content select="[card-chips]"></ng-content>
      </div>

      <div class="actions">
        <ng-content select="[card-actions]"></ng-content>
      </div>
    </article>
  `,
})
export class UiCardComponent {}
