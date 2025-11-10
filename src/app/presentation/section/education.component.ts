import { Component, OnInit } from '@angular/core';
import { SectionTitleComponent } from '../components/section-title.component';
import { UiCardComponent } from '../components/card.component';
import { GetEducationUseCase } from '../../domain/usecase/get-education.usecase';
import { Education } from '../../domain/entity/education';

type EducationVM = Education & { id: string };

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [SectionTitleComponent, UiCardComponent],
  styles: [
    `
      :host {
        display: block;
      }

      .edu {
        display: flex;
        flex-direction: column;
        gap: 40px;
        max-width: 1100px;
        margin-inline: auto;
      }

      .degree {
        margin: 0;
        font-weight: 900;
        letter-spacing: -0.02em;
        font-size: clamp(1.05rem, 0.9rem + 0.5vw, 1.25rem);
      }

      .institution {
        font-weight: 600;
        color: var(--color-accent);
        margin: 0 0 var(--space-1) 0;
      }

      .dates {
        opacity: 0.9;
        white-space: nowrap;
      }

      .bullets {
        margin: 0;
        padding-left: 1.2rem;
        display: grid;
        gap: 6px;
        line-height: 1.45;
      }

      .bullets li {
        list-style: disc;
      }

      @media (max-width: 720px) {
        .edu {
          gap: var(--space-5, 24px);
        }
      }
    `,
  ],
  template: `
    <app-section-title sectionId="education" title="Educación">
      <div class="edu">
        @for (ed of education; track ed.id) {
        <ui-card>
          <div card-title class="degree">{{ ed.degree }}</div>
          <div card-subtitle class="institution">{{ ed.institution }}</div>
          <div card-meta-end class="dates">{{ ed.start }} – {{ ed.end || 'Actual' }}</div>

          @if (ed.achievements?.length) {
          <div card-desc>
            <ul class="bullets">
              @for (a of ed.achievements; track $index) {
              <li>{{ a }}</li>
              }
            </ul>
          </div>
          }
        </ui-card>
        }
      </div>
    </app-section-title>
  `,
})
export class EducationComponent implements OnInit {
  education: EducationVM[] = [];

  constructor(private readonly getEducation: GetEducationUseCase) {}

  async ngOnInit() {
    try {
      const data = await this.getEducation.execute();
      this.education = (Array.isArray(data) ? data : []).map((ed, i) => ({
        ...ed,
        id: `${ed.institution}-${ed.degree}-${ed.start}-${i}`,
      }));
    } catch (err) {
      console.error('[Education] Error cargando educación:', err);
    }
  }
}
