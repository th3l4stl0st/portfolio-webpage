export interface Experience {
  company: string;
  role: string;
  start: string; // ISO-YYYY-MM
  end?: string | null;
  location?: string;
  achievements?: string[];
  tech?: string[];
}
