import { Component } from '@angular/core';
import { GetProjectsUseCase } from '../../domain/usecase/get-projects.usecase';
import { SectionTitleComponent } from '../components/section-title.component';
import { UiCardComponent } from '../components/card.component';
import { Project } from '../../domain/entity/project';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [SectionTitleComponent, UiCardComponent],
  styles: [
    `
      .list {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-6);
        max-width: 1100px;
        margin-inline: auto;
      }

      /* índice 01, 02... más grande */
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

      /* 🔹 Chips específicas de Projects */
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

        /* mismos colores que el FAB */
        background: color-mix(in oklab, var(--color-text) 90%, var(--color-bg));
        color: var(--color-bg);

        /* transición por tema; nada en :hover propio */
        transition: background-color 0.35s ease, color 0.35s ease, transform 0.15s ease,
          box-shadow 0.35s ease;
      }
      .proj-chip:hover {
        transform: none;
        box-shadow: none;
      }

      /* cuando la card interactiva hace hover, animan como la FAB */
      .interactive:hover .proj-chip {
        transform: translateY(-2px);
        box-shadow: 0 0 0 1px color-mix(in oklab, var(--color-accent) 30%, transparent),
          0 12px 22px -16px color-mix(in oklab, var(--color-accent) 45%, transparent);
      }
    `,
  ],
  template: `
    <app-section-title sectionId="projects" title="Proyectos">
      <div class="list">
        @for (p of projects; track p.id; let i = $index) {
        <ui-card
          variant="interactive"
          [href]="p.url"
          style="--card-meta-size: clamp(1.1rem, 2vw, 1.35rem);"
        >
          <!-- 01 / 02 … -->
          <small class="idx" card-meta-start>{{ pad2(i + 1) }}</small>

          <!-- Título y descripción -->
          <span card-title>{{ p.name }}</span>
          <span card-desc>{{ p.description }}</span>

          <!-- Chips Projects -->
          @if (p.technologies.length) {
          <div class="chips" card-chips>
            @for (t of p.technologies; track t) {
            <span class="proj-chip">{{ t }}</span>
            }
          </div>
          }

          <!-- FAB ↗ -->
          @if (p.url) {
          <span card-fab aria-hidden="true">↗</span>
          }
        </ui-card>
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
