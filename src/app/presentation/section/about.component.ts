import { Component } from '@angular/core';
import { GetPortfolioUseCase } from '../../domain/usecase/get-portfolio.usecase';
import { SectionTitleComponent } from '../components/section-title.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SectionTitleComponent],
  template: `
    <section id="about" class="container" style="padding-block: clamp(3rem, 8vw, 6rem);">
      <ui-section-title title="Sobre mí"></ui-section-title>
      <p style="max-width: 75ch; margin:0;">
        {{ about }}
      </p>
    </section>
  `,
})
export class AboutComponent {
  about = '';
  skills: string[] = [];

  constructor(getPortfolio: GetPortfolioUseCase) {
    getPortfolio.execute().then((p) => {
      this.about = p.about.about;
      this.skills = p.about.skills;
    });
  }
}
