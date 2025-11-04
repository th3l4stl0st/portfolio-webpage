export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  repo?: string;
  cover?: string;
  featured?: boolean;
}
