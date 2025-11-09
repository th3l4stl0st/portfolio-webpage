import { Component } from '@angular/core';
import { GetProjectsUseCase } from '../../domain/usecase/get-projects.usecase';
import { SectionTitleComponent } from '../components/section-title.component';
import { CardComponent } from '../components/card.component';
import { ChipComponent } from '../components/chip.component';
import { Project } from '../../domain/entity/project';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [SectionTitleComponent, CardComponent, ChipComponent],
  template: `
    <app-section-title sectionId="projects" title="Proyectos">
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:24px;">
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
    </app-section-title>
  `,
})
export class ProjectsComponent {
  projects: Project[] = [];
  constructor(getProjects: GetProjectsUseCase) {
    getProjects.execute().then((p) => (this.projects = p as Project[]));
  }
}
