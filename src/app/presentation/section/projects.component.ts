import { Component } from '@angular/core';
import { GetProjectsUseCase } from '../../usecase/get-projects.usecase';
import { SectionTitleComponent } from '../components/section-title.component';
import { CardComponent } from '../components/card.component';
import { ChipComponent } from '../components/chip.component';
import { Project } from '../../domain/entity/project';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [SectionTitleComponent, CardComponent, ChipComponent],
  template: `
    <section id="projects" class="container" style="padding-block: clamp(3rem, 8vw, 6rem);">
      <ui-section-title title="Proyectos"></ui-section-title>

      <div
        style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-5);"
      >
        @for (p of projects; track p.id) {
        <ui-card>
          <h3 style="margin: 0 0 var(--space-2) 0;">{{ p.name }}</h3>
          <p style="margin: 0 0 var(--space-3) 0; color: var(--color-muted);">
            {{ p.description }}
          </p>

          @if (p.technologies.length) {
          <div style="margin-bottom: var(--space-3);">
            @for (t of p.technologies; track t) {
            <ui-chip [label]="t"></ui-chip>
            }
          </div>
          }

          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            @if (p.url) {
            <a [href]="p.url" target="_blank" rel="noopener">Demo</a>
            }
          </div>
        </ui-card>
        }
      </div>
    </section>
  `,
})
export class ProjectsComponent {
  projects: Project[] = [];
  constructor(getProjects: GetProjectsUseCase) {
    getProjects.execute().then((p) => (this.projects = p as Project[]));
  }
}
