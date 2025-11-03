import { Injectable } from '@angular/core';

const KEY = 'prefers-dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDark(): boolean {
    const stored = localStorage.getItem(KEY);
    if (stored !== null) return stored === 'true';
    // Si no hay preferencia guardada, respeta prefers-color-scheme
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  }

  applyTheme(): void {
    const dark = this.isDark();
    document.documentElement.classList.toggle('dark-theme', dark);
  }

  toggle(): void {
    const next = !this.isDark();
    localStorage.setItem(KEY, String(next));
    this.applyTheme();
  }
}
