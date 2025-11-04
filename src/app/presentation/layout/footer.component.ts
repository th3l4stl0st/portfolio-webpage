import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer
      style="
      border-top: 1px solid var(--color-border);
      background: var(--color-bg);
      padding-block: var(--space-5);
      color: var(--color-muted);
      font-size: 14px;
      text-align:center;
    "
    >
      <div class="container">
        <p>© {{ year }} Alejandro Habernaud Mora. Todos los derechos reservados.</p>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  year = new Date().getFullYear();
}
