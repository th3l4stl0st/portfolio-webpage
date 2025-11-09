import { Component, Input } from '@angular/core';

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
        gap: 12px;
        padding: clamp(16px, 2.5vw, 24px);
        border-radius: 16px;
        background: color-mix(in oklab, var(--color-text) 6%, transparent);
        box-shadow: 0 1px 0 color-mix(in oklab, var(--color-text) 14%, transparent);
        transition: background-color 0.35s ease, box-shadow 0.35s ease, transform 0.15s ease,
          color 0.35s ease;
        color: var(--color-text);
        text-decoration: none;
        overflow: hidden;
      }

      /* variante interactive (Projects) */
      .interactive:hover {
        background: color-mix(in oklab, var(--color-accent) 14%, transparent);
        box-shadow: 0 0 0 1px color-mix(in oklab, var(--color-accent) 30%, transparent),
          0 16px 34px -22px color-mix(in oklab, var(--color-accent) 45%, transparent);
      }

      /* variante quiet/timeline (sin levantar) */
      .quiet:hover,
      .timeline:hover {
        background: color-mix(in oklab, var(--color-text) 8%, transparent);
      }

      /* slots “manuales” con ng-content */
      .meta {
        display: flex;
        gap: 10px;
        align-items: center;
        font-size: var(--card-meta-size, 1rem);
        color: var(--color-muted);
      }
      .meta-end {
        margin-left: auto;
      }
      .title {
        margin: 0;
        font-weight: 900;
        letter-spacing: -0.02em;
        font-size: clamp(1.05rem, 2.2vw, 1.35rem);
      }
      .desc {
        margin: 0;
        color: var(--color-muted);
        line-height: 1.7;
        font-size: 0.98rem;
      }

      /* burbuja de acción (Projects) */
      .fab {
        position: absolute;
        right: 16px;
        top: 16px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 999px;
        background: color-mix(in oklab, var(--color-text) 90%, var(--color-bg));
        color: var(--color-bg);
        box-shadow: 0 2px 8px color-mix(in oklab, var(--color-text) 20%, transparent);
        transition: transform 0.15s ease, background-color 0.35s ease, color 0.35s ease,
          box-shadow 0.35s ease;
      }
      /* si no proyectas contenido, no se muestra */
      .fab:empty {
        display: none;
      }

      /* animación solo cuando la card es interactiva */
      .interactive:hover .fab {
        transform: translateY(-2px);
        box-shadow: 0 0 0 1px color-mix(in oklab, var(--color-accent) 30%, transparent),
          0 12px 22px -16px color-mix(in oklab, var(--color-accent) 45%, transparent);
      }

      @media (prefers-reduced-motion: reduce) {
        .card,
        .fab {
          transition: none;
        }
      }
    `,
  ],
  template: `
    @if (href) {
    <a
      [href]="href!"
      [attr.target]="target || '_blank'"
      rel="noopener noreferrer"
      class="card"
      [class.interactive]="variant === 'interactive'"
      [class.quiet]="variant === 'quiet'"
      [class.timeline]="variant === 'timeline'"
    >
      <div class="meta">
        <ng-content select="[card-meta-start]"></ng-content>
        <span class="meta-end"><ng-content select="[card-meta-end]"></ng-content></span>
      </div>

      <h3 class="title"><ng-content select="[card-title]"></ng-content></h3>
      <p class="desc"><ng-content select="[card-desc]"></ng-content></p>

      <div><ng-content select="[card-chips]"></ng-content></div>
      <div><ng-content select="[card-actions]"></ng-content></div>

      <span class="fab">
        <ng-content select="[card-fab]"></ng-content>
      </span>
    </a>
    } @else {
    <article
      class="card"
      [class.interactive]="variant === 'interactive'"
      [class.quiet]="variant === 'quiet'"
      [class.timeline]="variant === 'timeline'"
    >
      <div class="meta">
        <ng-content select="[card-meta-start]"></ng-content>
        <span class="meta-end"><ng-content select="[card-meta-end]"></ng-content></span>
      </div>

      <h3 class="title"><ng-content select="[card-title]"></ng-content></h3>
      <p class="desc"><ng-content select="[card-desc]"></ng-content></p>

      <div><ng-content select="[card-chips]"></ng-content></div>
      <div><ng-content select="[card-actions]"></ng-content></div>

      <span class="fab">
        <ng-content select="[card-fab]"></ng-content>
      </span>
    </article>
    }
  `,
})
export class UiCardComponent {
  @Input() variant: 'interactive' | 'quiet' | 'timeline' = 'quiet';
  @Input() href?: string;
  @Input() target?: '_blank' | '_self' | '_parent' | '_top';
}
