import { Component } from '@angular/core';
import { GetPortfolioUseCase } from '../../domain/usecase/get-portfolio.usecase';
import { SectionTitleComponent } from '../components/section-title.component';
import { ChipComponent } from '../components/chip.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SectionTitleComponent, ChipComponent],
  template: `
    <app-section-title sectionId="about" title="About Me">
      <p style="text-align: justify;">{{ about }}</p>

      <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:var(--space-6);">
        @for (s of skills; track s) {
          <ui-chip [label]="s"></ui-chip>
        }
      </div>
    </app-section-title>
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
