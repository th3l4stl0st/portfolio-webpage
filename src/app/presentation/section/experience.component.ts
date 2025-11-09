import { Component } from '@angular/core';
import { GetExperienceUseCase } from '../../domain/usecase/get-experience.usecase';
import { SectionTitleComponent } from '../components/section-title.component';
import { UiCardComponent } from '../components/card.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [SectionTitleComponent, UiCardComponent],
  template: `
    <app-section-title sectionId="experience" title="Experiencia">

      <div style="display:grid; gap: var(--space-5);">
        @for (e of items; track e.company + e.role + e.start) {
        <ui-card>
          <h3 style="margin:0 0 var(--space-1) 0;">{{ e.role }} · {{ e.company }}</h3>
          <p style="color:var(--color-muted); margin:0 0 var(--space-3) 0;">
            {{ e.start }} – {{ e.end || 'Actual' }} @ {{ e.location || '—' }}
          </p>
          @if (e.achievements?.length) {
          <ul style="margin:0; padding-left: 18px;">
            @for (a of e.achievements; track a) {
            <li>{{ a }}</li>
            }
          </ul>
          }
        </ui-card>
        }
      </div>
    </app-section-title>
  `,
})
export class ExperienceComponent {
  items: any[] = [];
  constructor(getExperience: GetExperienceUseCase) {
    getExperience.execute().then((x) => (this.items = x as any[]));
  }
}
