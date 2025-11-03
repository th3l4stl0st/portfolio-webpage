import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

import { ListProjects } from '../../../application/use-cases/list-projects.usecase';
import {
  FilterProjects,
  ProjectFilter,
} from '../../../application/use-cases/filter-projects.usecase';
import { Project } from '../../../domain/models/project';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatChipsModule, MatButtonModule],
  template: `
    <h2>Proyectos</h2>

    <div class="filters">
      <input
        #q
        type="search"
        placeholder="Buscar por título, tag o stack…"
        [value]="text()"
        (input)="onText(q.value)"
        aria-label="Buscar proyectos"
      />
    </div>

    <section class="grid">
      @for (p of filtered(); track p.slug) {
      <mat-card class="card">
        <mat-card-header>
          <mat-card-title>{{ p.title }}</mat-card-title>
          <mat-card-subtitle>{{ p.short }}</mat-card-subtitle>
        </mat-card-header>

        @if (p.cover) {
        <img [src]="p.cover" alt="" />
        }

        <mat-card-content>
          <mat-chip-set>
            @for (t of p.stack; track t) {
            <mat-chip disabled>{{ t }}</mat-chip>
            }
          </mat-chip-set>
        </mat-card-content>

        <mat-card-actions>
          <a mat-button [routerLink]="['/projects', p.slug]">Ver detalle</a>

          @if (p.links?.github) {
          <a mat-stroked-button [href]="p.links!.github" target="_blank" rel="noopener">GitHub</a>
          } @if (p.links?.demo) {
          <a mat-stroked-button [href]="p.links!.demo" target="_blank" rel="noopener">Demo</a>
          }
        </mat-card-actions>
      </mat-card>
      }
    </section>
  `,
  styles: [
    `
      h2 {
        margin: 0 0 1rem;
      }
      .filters {
        margin: 0.5rem 0 1rem;
      }
      .filters input {
        width: 100%;
        max-width: 420px;
        padding: 0.5rem 0.75rem;
      }
      .grid {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      }
      .card img {
        width: 100%;
        height: auto;
        display: block;
      }
    `,
  ],
})
export class ProjectsListComponent {
  private list = inject(ListProjects);
  private filter = inject(FilterProjects);

  all = signal<Project[]>([]);
  text = signal<string>('');
  filtered = signal<Project[]>([]);

  constructor() {
    this.list.execute().then((ps) => this.all.set(ps));
    effect(() => {
      const f: ProjectFilter = { text: this.text() };
      this.filtered.set(this.filter.execute(this.all(), f));
    });
  }

  onText(v: string) {
    this.text.set(v);
  }
}
