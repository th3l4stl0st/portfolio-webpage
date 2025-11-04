import { Component } from '@angular/core';
import { GetPortfolioUseCase } from '../../usecase/get-portfolio.usecase';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section
      id="hero"
      class="container"
      style="min-height: calc(100vh - 72px);
                  display:flex;flex-direction:column;justify-content:center;
                  gap: var(--space-4);
                  padding-block: clamp(3rem, 10vh, 8rem);"
    >
      <p
        style="margin:0;color:var(--color-muted);font-size:clamp(3rem,2vw,4rem);
                font-weight:1000; font-style:italic; font-family:var(--font-family-mono);"
      >
        ¡Hola! 👋
      </p>

      <h1
        style="margin:0; font-size:clamp(5rem, 4vw, 6rem);
                font-weight:1000; letter-spacing:-3px; line-height:1.1;"
      >
        Soy <span style="color:var(--color-accent)">{{ fullName }}</span>
      </h1>

      <p
        style="margin-top:var(--space-2);color:var(--color-muted);
              font-size:clamp(1rem, 1vw, 1.25rem); font-weight:800;"
      >
        {{ headline }}
      </p>
    </section>
  `,
})
export class HeroComponent {
  fullName = '';
  headline = '';
  summary = '';
  topSkills: string[] = [];

  constructor(getPortfolio: GetPortfolioUseCase) {
    getPortfolio.execute().then((p) => {
      this.fullName = p.profile.fullName;
      this.headline = p.profile.headline;
      this.summary = p.profile.summary;
    });
  }
}
