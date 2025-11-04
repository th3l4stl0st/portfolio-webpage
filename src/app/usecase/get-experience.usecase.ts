import { Inject, Injectable } from '@angular/core';
import { PORTFOLIO_REPOSITORY } from '../domain/repository/portfolio.token';
import { PortfolioRepository } from '../domain/repository/portfolio.repository';
import { Experience } from '../domain/entity/experience';

@Injectable({ providedIn: 'root' })
export class GetExperienceUseCase {
  constructor(@Inject(PORTFOLIO_REPOSITORY) private repo: PortfolioRepository) {}

  async execute(): Promise<Experience[]> {
    const p = await this.repo.getPortfolio();
    return p.experience;
  }
}
