export type ProjectStatus = 'released' | 'wip';

export interface ProjectLink {
  github?: string;
  demo?: string;
  video?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  short: string;
  cover?: string;
  stack: string[];
  roles: string[];
  dates: { start: string; end?: string };
  highlights: string[];
  metrics?: ProjectMetric[];
  tags: string[];
  links?: ProjectLink;
  status: ProjectStatus;
}
