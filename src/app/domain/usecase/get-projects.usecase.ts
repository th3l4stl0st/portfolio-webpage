import { Inject, Injectable } from '@angular/core';
import { PORTFOLIO_REPOSITORY } from '../repository/portfolio.token';
import { PortfolioRepository } from '../repository/portfolio.repository';
import { Project } from '../entity/project';

@Injectable({ providedIn: 'root' })
export class GetProjectsUseCase {
  constructor(@Inject(PORTFOLIO_REPOSITORY) private repo: PortfolioRepository) {}

  async execute(): Promise<Project[]> {
    const p = await this.repo.getPortfolio();
    return p.projects;
  }
}
