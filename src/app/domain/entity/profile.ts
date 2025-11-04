import { Social } from './social';

export interface Profile {
  fullName: string;
  headline: string;
  email: string;
  socials: Social[];
}
