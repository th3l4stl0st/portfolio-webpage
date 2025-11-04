import { Component } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'theme-toggle',
  standalone: true,
  template: `
    <button
      (click)="toggle()"
      [attr.aria-label]="theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'"
      title="Cambiar tema"
      style="
        display:inline-flex;align-items:center;justify-content:center;
        width:32px;height:32px;border:none;outline:none;
        background:transparent;cursor:pointer;border-radius:8px;
        color: var(--header-link);
        transition: color .2s ease, background-color .2s ease;
      "
      onmouseover="this.style.color='var(--header-link-hover)'"
      onmouseout="this.style.color='var(--header-link)'"
    >
      @if (theme === 'light') {
      <!-- Luna minimal -->
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      } @else {
      <!-- Sol minimal -->
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path
          d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l-1.5-1.5M20.5 20.5L19 19M5 19l-1.5 1.5M20.5 3.5L19 5"
        />
      </svg>
      }
    </button>
  `,
})
export class ThemeToggleComponent {
  theme: 'light' | 'dark';
  constructor(private themeService: ThemeService) {
    this.theme = this.themeService.getTheme();
  }
  toggle() {
    this.themeService.toggle();
    this.theme = this.themeService.getTheme();
  }
}
