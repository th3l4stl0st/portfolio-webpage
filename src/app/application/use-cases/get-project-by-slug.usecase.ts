import { inject, Injectable } from '@angular/core';
import { ProjectRepository } from '../../domain/repositories/project.repository';
import { Project } from '../../domain/models/project';

@Injectable({ providedIn: 'root' })
export class GetProjectBySlug {
  private repo = inject(ProjectRepository);
  execute(slug: string): Promise<Project | undefined> {
    return this.repo.getBySlug(slug);
  }
}
