import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timeline',
  standalone: true,
  styles: [
    `
      :host {
        display: block;
      }
      .tl {
        position: relative;
        display: grid;
        grid-template-columns: 1fr minmax(680px, 860px); /* línea centrada + cards a la derecha */
        gap: clamp(16px, 3vw, 24px);
        align-items: start;
      }
      .line {
        position: absolute;
        inset: 0;
        width: 2px;
        margin: 0 auto;
        background: color-mix(in oklab, var(--color-accent) 30%, transparent);
        opacity: 0.35;
        pointer-events: none;
      }
      .item {
        position: relative;
        grid-column: 2; /* cards a la derecha de la línea */
      }
      .dot {
        position: absolute;
        left: calc(50% - 6px); /* centro del contenedor */
        top: 28px;
        width: 12px;
        height: 12px;
        border-radius: 999px;
        background: var(--color-accent);
        box-shadow: 0 0 0 4px color-mix(in oklab, var(--color-accent) 30%, transparent);
      }

      @media (max-width: 980px) {
        .tl {
          grid-template-columns: 1fr;
        }
        .line {
          left: 8px;
          margin: 0;
        }
        .item {
          grid-column: 1;
          padding-left: 24px;
        }
        .dot {
          left: 2px;
        }
      }
    `,
  ],
  template: `
    <div class="tl">
      <div class="line" aria-hidden="true"></div>

      @for (item of items; track item) {
      <div class="item">
        <span class="dot" aria-hidden="true"></span>
        <!-- El contenido lo proyectas desde el padre uno por cada item -->
        <ng-content select="[tl-item]"></ng-content>
      </div>
      }
    </div>
  `,
})
export class TimelineComponent {
  /** Número de elementos; el contenido se proyecta con atributos index="0"... */
  @Input({ required: true }) items!: number[];
}
