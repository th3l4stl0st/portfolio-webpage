import { ApplicationConfig } from '@angular/core';
import { PORTFOLIO_REPOSITORY } from './domain/repository/portfolio.token';
import { LocalPortfolioRepository } from './data/local-portfolio.repository';

export const appConfig: ApplicationConfig = {
  providers: [{ provide: PORTFOLIO_REPOSITORY, useFactory: () => new LocalPortfolioRepository() }],
};
