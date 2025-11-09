import { Component } from '@angular/core';
import { GetEducationUseCase } from '../../domain/usecase/get-education.usecase';
import { SectionTitleComponent } from '../components/section-title.component';
import { UiCardComponent } from '../components/card.component';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [SectionTitleComponent, UiCardComponent],
  template: `
    <app-section-title sectionId="education" title="Educación">
      <div style="display:grid; gap: var(--space-5);">
        @for (ed of items; track ed.institution + ed.degree + ed.start) {
        <ui-card>
          <h3 style="margin:0 0 var(--space-1) 0;">{{ ed.degree }}</h3>
          <p style="color:var(--color-muted); margin:0 0 var(--space-2) 0;">{{ ed.institution }}</p>
          <p style="margin:0;">{{ ed.start }} – {{ ed.end || 'Actual' }}</p>
        </ui-card>
        }
      </div>
    </app-section-title>
  `,
})
export class EducationComponent {
  items: any[] = [];
  constructor(getEducation: GetEducationUseCase) {
    getEducation.execute().then((x) => (this.items = x as any[]));
  }
}
