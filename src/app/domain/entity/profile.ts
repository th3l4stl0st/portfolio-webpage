import { Social } from './social';

export interface Profile {
  fullName: string;
  headline: string;
  summary: string;
  location?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  socials: Social[];
}
