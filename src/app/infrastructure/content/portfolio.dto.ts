export namespace PortfolioDtoNS {
  export interface Title {
    text: string;
  }
  export interface Profile {
    fullName: string;
    headline: string;
    email: string;
    socials: Social[];
  }
  export interface Social {
    name: string;
    url: string;
    icon?: string;
  }
  export interface About {
    about: string;
    skills: string[];
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
    title: Title;
    profile: Profile;
    about: About;
    projects: Project[];
    experience: Experience[];
    education: Education[];
  }
}
