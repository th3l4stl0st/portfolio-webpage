import { Inject, Injectable } from '@angular/core';
import { PORTFOLIO_REPOSITORY } from '../repository/portfolio.token';
import { PortfolioRepository } from '../repository/portfolio.repository';
import { Education } from '../entity/education';

@Injectable({ providedIn: 'root' })
export class GetEducationUseCase {
  constructor(@Inject(PORTFOLIO_REPOSITORY) private repo: PortfolioRepository) {}

  async execute(): Promise<Education[]> {
    const p = await this.repo.getPortfolio();
    return p.education;
  }
}
