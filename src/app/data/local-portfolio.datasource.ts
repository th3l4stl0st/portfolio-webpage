import { PortfolioDtoNS } from './portfolio.dto';

export class LocalPortfolioDataSource {
  private readonly url = 'assets/content/portfolio.json';

  async load(): Promise<PortfolioDtoNS.Root> {
    const res = await fetch(this.url, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`No se pudo cargar ${this.url}: ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as PortfolioDtoNS.Root;
  }
}
