import { Inject, Injectable } from '@angular/core';
import { PORTFOLIO_REPOSITORY } from '../domain/repository/portfolio.token';
import { PortfolioRepository } from '../domain/repository/portfolio.repository';
import { Project } from '../domain/entity/project';

@Injectable({ providedIn: 'root' })
export class GetProjectsUseCase {
  constructor(@Inject(PORTFOLIO_REPOSITORY) private repo: PortfolioRepository) {}

  async execute(): Promise<Project[]> {
    const p = await this.repo.getPortfolio();
    return p.projects;
  }
}
