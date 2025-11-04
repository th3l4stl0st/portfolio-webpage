import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-chip',
  standalone: true,
  template: `
    <span
      style="
      display:inline-block;
      padding: 2px 8px;
      border:1px solid var(--color-border);
      border-radius: 999px;
      font-size: 12px;
      margin:2px 6px 2px 0;
      background: var(--color-bg);
    "
      >{{ label }}
    </span>
  `,
})
export class ChipComponent {
  @Input() label = '';
}
