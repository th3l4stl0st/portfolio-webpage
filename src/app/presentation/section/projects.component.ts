import { Component } from '@angular/core';
import { GetProjectsUseCase } from '../../domain/usecase/get-projects.usecase';
import { SectionTitleComponent } from '../components/section-title.component';
import { UiLinkCardComponent } from '../components/linkcard.component';
import { Project } from '../../domain/entity/project';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [SectionTitleComponent, UiLinkCardComponent],
  styles: [
    `
      .list {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-6);
        max-width: 1100px;
        margin-inline: auto;
      }

      /* índice 01, 02 ... */
      .idx {
        font-family: var(--font-family-mono);
        font-weight: 800;
        letter-spacing: 0.02em;
        color: var(--color-accent);
        opacity: 0.9;
      }

      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 8px;
      }

      /* chips Projects */
      .proj-chip {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 6px 10px;
        border-radius: 5px;
        font-size: clamp(0.8rem, 1.1vw, 0.9rem);
        font-weight: 800;
        line-height: 1;
        letter-spacing: 0.01em;
        background: color-mix(in oklab, var(--color-text) 90%, var(--color-bg));
        color: var(--color-bg);
        transition: background-color 0.35s ease, color 0.35s ease, transform 0.15s ease,
          box-shadow 0.35s ease;
      }
      .proj-chip:hover {
        transform: none;
        box-shadow: none;
      }

      /* Solo animan cuando la link-card es interactiva (tiene href) */
      .interactive:hover .proj-chip {
        transform: translateY(-2px);
        box-shadow: 0 0 0 1px color-mix(in oklab, var(--color-accent) 30%, transparent),
          0 12px 22px -16px color-mix(in oklab, var(--color-accent) 45%, transparent);
      }
    `,
  ],
  template: `
    <app-section-title sectionId="projects" title="Projects">
      <div class="list">
        @for (p of projects; track p.id || p.name; let i = $index) {
        <ui-link-card [href]="p.url" style="--card-meta-size: clamp(1.1rem, 2vw, 1.35rem);">
          <!-- idx  -->
          <small class="idx" card-meta-start>{{ pad2(i + 1) }}</small>

          <!-- Title and description -->
          <span card-title>{{ p.name }}</span>
          <span card-desc>{{ p.description }}</span>

          <!-- Chips Projects -->
          <div class="chips" card-chips>
            @for (t of p.technologies; track t) {
            <span class="proj-chip">{{ t }}</span>
            }
          </div>

          <!-- FAB ↗ -->
          <span card-fab aria-hidden="true">↗</span>
        </ui-link-card>
        }
      </div>
    </app-section-title>
  `,
})
export class ProjectsComponent {
  projects: Project[] = [];

  constructor(getProjects: GetProjectsUseCase) {
    getProjects.execute().then((p) => (this.projects = p as Project[]));
  }

  pad2(n: number): string {
    return n < 10 ? `0${n}` : String(n);
  }
}
