import { Component } from '@angular/core';
import { GetPortfolioUseCase } from '../../domain/usecase/get-portfolio.usecase';

@Component({
  selector: 'app-footer',
  standalone: true,
  styles: [
    `
      footer {
        border-top: 1px solid var(--color-border);
        background: var(--color-bg);
        color: var(--color-muted);
        font-size: 14px;
        padding-block: var(--space-6);
      }

      .footer-container {
        max-width: 1100px;
        margin-inline: auto;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 24px;
        padding-inline: var(--space-4);
      }

      .left {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
        align-items: flex-start; /* izquierda por defecto */
      }

      .name {
        font-weight: 900;
        font-size: 1.1rem;
        letter-spacing: -0.01em;
        margin: 0;
      }

      .headline {
        color: var(--color-muted);
        margin: 0 0 var(--space-1) 0;
        font-weight: 500;
      }

      .socials {
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: flex-start;
      }

      .social-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        color: var(--color-muted);
        transition: color 0.25s ease, transform 0.15s ease;
      }
      .social-link:hover {
        color: var(--color-accent);
        transform: translateY(-2px);
      }

      .right {
        text-align: right;
      }

      @media (max-width: 770px) {
        .footer-container {
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: var(--space-4);
        }
        .left {
          align-items: center;
        }
        .socials {
          justify-content: center;
        }
        .right {
          text-align: center;
        }
      }
    `,
  ],
  template: `
    <footer>
      <div class="footer-container">
        <div class="left">
          <p class="name">{{ fullName }}</p>
          <p class="headline">{{ headline }}</p>

          <div class="socials">
            @if (email) {
            <a class="social-link" [href]="'mailto:' + email" aria-label="Email">
              <svg
                width="20"
                height="20"
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
            <a
              class="social-link"
              [href]="linkedin"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg
                width="20"
                height="20"
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
            <a
              class="social-link"
              [href]="github"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
                ></path>
              </svg>
            </a>
            }
          </div>
        </div>

        <div class="right">
          <p>© {{ year }} {{ fullName }}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  fullName = '';
  headline = '';
  email = '';
  linkedin = '';
  github = '';
  year = new Date().getFullYear();

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
