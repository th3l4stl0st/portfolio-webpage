import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly key = 'preferred-theme';
  private current: 'light' | 'dark' = 'light';

  constructor() {
    const saved = localStorage.getItem(this.key) as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.current = saved ?? (prefersDark ? 'dark' : 'light');
    this.apply();
  }

  toggle(): void {
    this.current = this.current === 'light' ? 'dark' : 'light';
    this.apply();
    localStorage.setItem(this.key, this.current);
  }

  getTheme(): 'light' | 'dark' {
    return this.current;
  }

  private apply(): void {
    const root = document.documentElement;
    root.setAttribute('data-theme', this.current);
    root.setAttribute('data-theme-change', ''); // dispara la transición
    setTimeout(() => root.removeAttribute('data-theme-change'), 400);
  }
}
