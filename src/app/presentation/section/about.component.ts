import { Component } from '@angular/core';
import { GetPortfolioUseCase } from '../../usecase/get-portfolio.usecase';
import { SectionTitleComponent } from '../components/section-title.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SectionTitleComponent],
  template: `
    <section id="about" class="container" style="padding-block: clamp(3rem, 8vw, 6rem);">
      <ui-section-title title="Sobre mí"></ui-section-title>
      <p style="max-width: 75ch; margin:0;">
        {{ summary }}
      </p>
      @if (location) {
      <p style="color:var(--color-muted); margin-top: var(--space-3);">📍 {{ location }}</p>
      } @if (email) {
      <p style="margin-top: var(--space-2);">
        <a [href]="'mailto:' + email">✉️ {{ email }}</a>
      </p>
      } @if (socials.length) {
      <p style="margin-top: var(--space-3);">
        @for (s of socials; track s.url) {
        <a [href]="s.url" target="_blank" rel="noopener" style="margin-right:12px;">{{ s.name }}</a>
        }
      </p>
      }
    </section>
  `,
})
export class AboutComponent {
  summary = '';
  location?: string;
  email?: string;
  socials: { name: string; url: string }[] = [];

  constructor(getPortfolio: GetPortfolioUseCase) {
    getPortfolio.execute().then((p) => {
      this.summary = p.profile.summary;
      this.location = p.profile.location;
      this.email = p.profile.email;
      this.socials = p.profile.socials as any;
    });
  }
}
