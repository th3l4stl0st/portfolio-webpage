import { Inject, Injectable } from '@angular/core';
import { PORTFOLIO_REPOSITORY } from '../repository/portfolio.token';
import { PortfolioRepository } from '../repository/portfolio.repository';
import { Portfolio } from '../entity/portfolio';

@Injectable({ providedIn: 'root' })
export class GetPortfolioUseCase {
  constructor(@Inject(PORTFOLIO_REPOSITORY) private repo: PortfolioRepository) {}

  execute(): Promise<Portfolio> {
    return this.repo.getPortfolio();
  }
}
