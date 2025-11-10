import { Component } from '@angular/core';
import { GetPortfolioUseCase } from '../../domain/usecase/get-portfolio.usecase';

@Component({
  selector: 'app-hero',
  standalone: true,
  styles: [
    `
      .social-link {
        width: 64px;
        height: 64px;
        display: inline-flex;
        align-items: left;
        color: var(--header-link);
        text-decoration: none;
        transition: color 0.2s ease, background-color 0.2s ease, transform 0.15s ease;
      }

      .social-link:hover {
        color: var(--color-accent);
        transform: translateY(-2px);
      }
    `,
  ],
  template: `
    <section
      id="hero"
      class="container"
      style="min-height: calc(100vh - 72px);
              display:flex;flex-direction:column;justify-content:center;
              gap: var(--space-4);
              padding-block: clamp(3rem, 10vh, 8rem);
              position: relative;"
    >
      <!-- background glow effect -->
      <div
        aria-hidden="true"
        style="
              position:absolute;
              top:-15%; right:0; bottom:0; left:-5%;   /* <- explícito: no crece a la derecha */
              pointer-events:none; z-index:0;
              background: radial-gradient(900px 1600px at 2% 2%, var(--color-accent) 0%, transparent 40%);
              opacity: var(--hero-glow-opacity, .38);
              filter: blur(100px);
              mix-blend-mode: var(--hero-glow-blend, screen);
            "
      ></div>

      <!-- hero content -->
      <p
        style="margin:0;color:var(--color-muted);
                font-size:clamp(3rem,2vw,4rem);
                font-weight:1000;
                font-style:italic;
                font-family:var(--font-body);"
      >
        Hello! 👋
      </p>

      <h1
        style="margin:0;
                font-size:clamp(5rem, 4vw, 6rem);
                font-weight:1000;
                letter-spacing:-3px;
                line-height:1.1;"
      >
        I'm <span style="color:var(--color-accent)">{{ fullName }}</span>
      </h1>

      <p
        style="margin-top:var(--space-2);
                color:var(--color-muted);
                font-size:clamp(1rem, 1vw, 1.25rem);
                font-weight:800;"
      >
        {{ headline }}
      </p>

      <!-- Social links bottom left -->
      <div
        style="position:absolute;
                left: 0px;
                bottom:clamp(16px,4vh,48px);
                display:flex;
                gap:12px;
                z-index:1;"
      >
        @if (email) {
        <a class="social-link" [href]="'mailto:' + email">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"
            ></path>
            <path d="M3 7l9 6l9 -6"></path>
          </svg>
        </a>
        } @if (linkedin) {
        <a class="social-link" [href]="linkedin" target="_blank" rel="noopener noreferrer">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M8 11v5"></path>
            <path d="M8 8v.01"></path>
            <path d="M12 16v-5"></path>
            <path d="M16 16v-3a2 2 0 1 0 -4 0"></path>
            <path
              d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z"
            ></path>
          </svg>
        </a>
        } @if (github) {
        <a class="social-link" [href]="github" target="_blank" rel="noopener noreferrer">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
            />
          </svg>
        </a>
        }
      </div>
    </section>
  `,
})
export class HeroComponent {
  fullName = '';
  headline = '';
  email = '';
  linkedin = '';
  github = '';

  constructor(getPortfolio: GetPortfolioUseCase) {
    getPortfolio.execute().then((p) => {
      this.fullName = p.profile.fullName;
      this.headline = p.profile.headline;
      this.email = p.profile.email;
      const socials = (p.profile.socials ?? []) as Array<{ name: string; url: string }>;
      this.linkedin = socials.find((s) => s.name.toLowerCase() === 'linkedin')?.url || '';
      this.github = socials.find((s) => s.name.toLowerCase() === 'github')?.url || '';
    });
  }
}
