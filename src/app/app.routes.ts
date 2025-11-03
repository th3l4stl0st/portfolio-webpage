import { Routes } from '@angular/router';
import { ShellComponent } from './presentation/shell/shell.component';

const Home = () => import('./presentation/home/home.component').then(m => m.HomeComponent);
const Projects = () =>
  import('./presentation/projects/list/projects-list.component').then(
    m => m.ProjectsListComponent
  );
const About = () => import('./presentation/about/about.component').then(m => m.AboutComponent);
const Contact = () =>
  import('./presentation/contact/contact.component').then(m => m.ContactComponent);

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', loadComponent: Home },
      { path: 'projects', loadComponent: Projects },
      { path: 'about', loadComponent: About },
      { path: 'contact', loadComponent: Contact },
    ],
  },
  { path: '**', redirectTo: '' },
];
