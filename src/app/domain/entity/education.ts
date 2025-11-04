export interface Education {
  institution: string;
  degree: string;
  start: string; // ISO-YYYY-MM
  end?: string | null;
}
