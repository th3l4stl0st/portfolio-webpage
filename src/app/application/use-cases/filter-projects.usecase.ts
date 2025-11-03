import { Injectable } from '@angular/core';
import { Project } from '../../domain/models/project';

export interface ProjectFilter {
  text?: string;
  tags?: string[];
  stack?: string[];
}

@Injectable({ providedIn: 'root' })
export class FilterProjects {
  execute(projects: Project[], f: ProjectFilter): Project[] {
    const text = (f.text ?? '').trim().toLowerCase();

    return projects.filter((p) => {
      const tOk =
        !text ||
        p.title.toLowerCase().includes(text) ||
        p.short.toLowerCase().includes(text) ||
        p.tags.some((t) => t.toLowerCase().includes(text)) ||
        p.stack.some((s) => s.toLowerCase().includes(text));
      const tagsOk = !f.tags?.length || f.tags.every((tag) => p.tags.includes(tag));
      const stackOk = !f.stack?.length || f.stack.every((s) => p.stack.includes(s));
      return tOk && tagsOk && stackOk;
    });
  }
}
