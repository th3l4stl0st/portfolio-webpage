import { Project } from '../models/project';

export abstract class ProjectRepository {
  abstract list(): Promise<Project[]>;
  abstract getBySlug(slug: string): Promise<Project | undefined>;
}
