import { Component } from '@angular/core';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';
import { HeroComponent } from '../section/hero.component';
import { AboutComponent } from '../section/about.component';
import { ProjectsComponent } from '../section/projects.component';
import { ExperienceComponent } from '../section/experience.component';
import { EducationComponent } from '../section/education.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    AboutComponent,
    ProjectsComponent,
    ExperienceComponent,
    EducationComponent,
  ],
  template: `
    <a class="visually-hidden" href="#hero">Saltar al contenido</a>
    <app-header></app-header>

    <app-hero></app-hero>
    <app-about></app-about>
    <app-projects></app-projects>
    <app-experience></app-experience>
    <app-education></app-education>

    <app-footer></app-footer>
  `,
})
export class AppComponent {}
