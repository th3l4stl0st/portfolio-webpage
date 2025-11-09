export namespace PortfolioDtoNS {
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
  }
  export interface Experience {
    role: string;
    company: string;
    start: string;
    end?: string | null;
    achievements: string[];
  }
  export interface Education {
    degree: string;
    institution: string;
    start: string;
    end?: string | null;
    achievements?: string[];
  }
  export interface Root {
    profile: Profile;
    about: About;
    projects: Project[];
    experience: Experience[];
    education: Education[];
  }
}
