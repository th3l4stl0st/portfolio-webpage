import { inject, Injectable } from '@angular/core';
import { ProjectRepository } from '../../domain/repositories/project.repository';
import { Project } from '../../domain/models/project';

@Injectable({ providedIn: 'root' })
export class ListProjects {
  private repo = inject(ProjectRepository);
  execute(): Promise<Project[]> {
    return this.repo.list();
  }
}
