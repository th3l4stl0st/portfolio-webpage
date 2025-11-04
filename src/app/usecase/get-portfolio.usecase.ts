import { Inject, Injectable } from '@angular/core';
import { PORTFOLIO_REPOSITORY } from '../domain/repository/portfolio.token';
import { PortfolioRepository } from '../domain/repository/portfolio.repository';
import { Portfolio } from '../domain/entity/portfolio';

@Injectable({ providedIn: 'root' })
export class GetPortfolioUseCase {
  constructor(@Inject(PORTFOLIO_REPOSITORY) private repo: PortfolioRepository) {}

  execute(): Promise<Portfolio> {
    return this.repo.getPortfolio();
  }
}
