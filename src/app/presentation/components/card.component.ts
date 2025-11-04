import { Component } from '@angular/core';

@Component({
  selector: 'ui-card',
  standalone: true,
  template: `
    <div
      style="
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-2);
      padding: var(--space-5);
      box-shadow: var(--shadow-1);
    "
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {}
