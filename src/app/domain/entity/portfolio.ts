import { Profile } from './profile';
import { Project } from './project';
import { Experience } from './experience';
import { Education } from './education';
import { About } from './about';

export interface Portfolio {
  profile: Profile;
  about: About;
  projects: Project[];
  experience: Experience[];
  education: Education[];
}
