import { Inject, Injectable } from '@angular/core';
import { PORTFOLIO_REPOSITORY } from '../domain/repository/portfolio.token';
import { PortfolioRepository } from '../domain/repository/portfolio.repository';
import { Education } from '../domain/entity/education';

@Injectable({ providedIn: 'root' })
export class GetEducationUseCase {
  constructor(@Inject(PORTFOLIO_REPOSITORY) private repo: PortfolioRepository) {}

  async execute(): Promise<Education[]> {
    const p = await this.repo.getPortfolio();
    return p.education;
  }
}
