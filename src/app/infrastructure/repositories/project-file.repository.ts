import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ProjectRepository } from '../../domain/repositories/project.repository';
import { Project } from '../../domain/models/project';

@Injectable({ providedIn: 'root' })
export class ProjectFileRepository extends ProjectRepository {
  private url = 'content/projects.json';
  constructor(private http: HttpClient) {
    super();
  }

  async list(): Promise<Project[]> {
    const data = await firstValueFrom(this.http.get<Project[]>(this.url));
    // Orden: más recientes primero por end/start
    return data.sort((a, b) =>
      (b.dates.end ?? b.dates.start).localeCompare(a.dates.end ?? a.dates.start)
    );
  }

  async getBySlug(slug: string): Promise<Project | undefined> {
    const projects = await this.list();
    return projects.find((p) => p.slug === slug);
  }
}
