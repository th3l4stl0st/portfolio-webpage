import { Component } from '@angular/core';
import { GetProjectsUseCase } from '../../usecase/get-projects.usecase';
import { SectionTitleComponent } from '../components/section-title.component';
import { CardComponent } from '../components/card.component';
import { ChipComponent } from '../components/chip.component';

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
          @if (p.cover) {
          <img
            [src]="p.cover"
            alt=""
            loading="lazy"
            style="width:100%; height:auto; border-radius: var(--radius-1); margin-bottom: var(--space-3);"
          />
          }
          <h3 style="margin: 0 0 var(--space-2) 0;">{{ p.name }}</h3>
          <p style="margin: 0 0 var(--space-3) 0; color: var(--color-muted);">
            {{ p.description }}
          </p>

          @if (p.technologies?.length) {
          <div style="margin-bottom: var(--space-3);">
            @for (t of p.technologies; track t) {
            <ui-chip [label]="t"></ui-chip>
            }
          </div>
          }

          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            @if (p.url) {
            <a [href]="p.url" target="_blank" rel="noopener">Demo</a>
            } @if (p.repo) {
            <a [href]="p.repo" target="_blank" rel="noopener">Código</a>
            }
          </div>
        </ui-card>
        }
      </div>
    </section>
  `,
})
export class ProjectsComponent {
  projects: any[] = [];
  constructor(getProjects: GetProjectsUseCase) {
    getProjects.execute().then((p) => (this.projects = p as any[]));
  }
}
