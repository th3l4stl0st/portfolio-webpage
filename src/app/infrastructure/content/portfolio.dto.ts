// Forma exacta del JSON de /assets/content/portfolio.json
export namespace PortfolioDtoNS {
  export interface Social {
    name: string;
    url: string;
    icon?: string;
  }
  export interface Profile {
    fullName: string;
    headline: string;
    summary: string;
    location?: string;
    email?: string;
    avatar?: string;
    socials: Social[];
  }
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
  export interface Experience {
    company: string;
    role: string;
    start: string;
    end?: string | null;
    location?: string;
    achievements?: string[];
    tech?: string[];
  }
  export interface Education {
    institution: string;
    degree: string;
    start: string;
    end?: string | null;
  }
  export interface Root {
    profile: Profile;
    skills: string[]; // en JSON son strings…
    projects: Project[];
    experience: Experience[];
    education: Education[];
    contact?: { email?: string };
  }
}
