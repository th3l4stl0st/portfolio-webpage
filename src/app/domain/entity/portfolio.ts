import { Profile } from './profile';
import { Project } from './project';
import { Experience } from './experience';
import { Education } from './education';

export interface Portfolio {
  profile: Profile;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  contact?: { email?: string };
}
