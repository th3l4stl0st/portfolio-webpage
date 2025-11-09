import { Component, OnInit } from '@angular/core';
import { SectionTitleComponent } from '../components/section-title.component';
import { UiCardComponent } from '../components/card.component';
import { GetExperienceUseCase } from '../../domain/usecase/get-experience.usecase';
import { Experience } from '../../domain/entity/experience';

type ExperienceVM = Experience & { id: string };

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [SectionTitleComponent, UiCardComponent],
  styles: [
    `
      :host {
        display: block;
      }

      .exp {
        --row-gap: 48px;
        --dot: 12px;
        --line-w: 2px;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: var(--row-gap);
        max-width: 1100px;
        margin-inline: auto;
      }
      .row {
        position: relative;
      }

      .row:not(:last-child)::after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 100%;
        height: calc(var(--row-gap) + (var(--dot) / 2));
        width: var(--line-w);
        background: color-mix(in oklab, var(--color-accent) 30%, transparent);
        pointer-events: none;
        transition: background-color 0.3s ease;
        z-index: 0;
      }

      .exp-card {
        position: relative;
        z-index: 1;
      }

      .exp-card::before {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: calc(-1 * var(--dot) / 2);
        width: var(--dot);
        height: var(--dot);
        border-radius: 50%;
        background: var(--color-accent);
        box-shadow: 0 0 0 4px color-mix(in oklab, var(--color-accent) 22%, transparent),
          0 0 18px 0 color-mix(in oklab, var(--color-accent) 45%, transparent);
        transition: background-color 0.3s ease, box-shadow 0.3s ease;
        z-index: 1;
      }

      .role {
        margin: 0 0 var(--space-1) 0;
        font-size: clamp(1.05rem, 0.9rem + 0.5vw, 1.25rem);
      }
      .company {
        font-weight: 600;
        margin-bottom: var(--space-2);
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
        .exp {
          --row-gap: var(--space-5, 22px);
          --dot: 10px;
        }
      }
    `,
  ],
  template: `
    <app-section-title sectionId="experience" title="Experiencia">
      <div class="exp">
        @for (e of experience; track e.id; let i = $index) {
        <div class="row">
          <ui-card class="exp-card">
            <div card-meta-end class="dates">{{ e.start }} – {{ e.end || 'Actual' }}</div>
            <h3 card-title class="role">{{ e.role }}</h3>
            <div card-subtitle class="company">{{ e.company }}</div>

            <div card-desc>
              <ul class="bullets">
                @for (a of e.achievements; track $index) {
                <li>{{ a }}</li>
                }
              </ul>
            </div>
          </ui-card>
        </div>
        }
      </div>
    </app-section-title>
  `,
})
export class ExperienceComponent implements OnInit {
  experience: ExperienceVM[] = [];

  constructor(private readonly getExperience: GetExperienceUseCase) {
    console.log('[Experience] constructor');
  }

  async ngOnInit() {
    console.log('[Experience] ngOnInit: fetching…');
    try {
      const data = await this.getExperience.execute();
      console.log('[Experience] usecase result:', data);

      this.experience = (Array.isArray(data) ? data : []).map((e, i) => ({
        ...e,
        id: `${e.company}-${e.role}-${e.start}-${i}`, // id estable y único
      }));

      console.log('[Experience] items length:', this.experience.length);
      if (this.experience.length) {
        console.log('[Experience] first item:', this.experience[0]);
        console.log('[Experience] first item achievements:', this.experience[0]?.achievements);
      } else {
        console.warn('[Experience] items vacío. Revisa /assets/content/*.json -> experience[]');
      }
      queueMicrotask(() =>
        console.log('[Experience] after set items, length:', this.experience.length)
      );
    } catch (err) {
      console.error('[Experience] error cargando experiencia:', err);
    }
  }
}
