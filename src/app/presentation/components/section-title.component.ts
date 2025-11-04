import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-section-title',
  standalone: true,
  template: `
    <h2 style="margin:0 0 var(--space-4) 0; font-size:28px;">
      {{ title }}
    </h2>
  `,
})
export class SectionTitleComponent {
  @Input() title = '';
}
