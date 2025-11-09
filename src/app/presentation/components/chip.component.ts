import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-chip',
  standalone: true,
  styles: [
    `
      .chip {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        border-radius: 999px;
        font-size: clamp(1rem, 1.6vw, 1.125rem);
        line-height: 1;
        letter-spacing: 0.01em;

        /* sin borde */
        border: 0;

        /* colores base dependientes del tema */
        background: var(--chip-bg, color-mix(in oklab, var(--color-text) 10%, transparent));
        color: var(--chip-fg, var(--color-text));

        /* transiciones suaves (sin transform) */
        transition: background-color 0.35s ease, color 0.35s ease, box-shadow 0.35s ease;
      }

      /* ILUMINACIÓN EN HOVER */
      .chip:hover {
        background: color-mix(in oklab, var(--color-accent) 22%, transparent);
        color: var(--chip-fg-hover, var(--color-text));
        /* halo  */
        box-shadow: 0 0 0 1px color-mix(in oklab, var(--color-accent) 35%, transparent),
          0 8px 22px -14px color-mix(in oklab, var(--color-accent) 40%, transparent);
      }

      /* accesibilidad */
      .chip:focus-visible {
        outline: 2px solid color-mix(in oklab, var(--color-accent) 60%, transparent);
        outline-offset: 2px;
        box-shadow: none; /* evita doble halo con el outline */
      }

      /* reduced motion */
      @media (prefers-reduced-motion: reduce) {
        .chip {
          transition: none;
        }
      }
    `,
  ],
  template: ` <span class="chip">{{ label }}</span> `,
})
export class ChipComponent {
  @Input() label = '';
}
