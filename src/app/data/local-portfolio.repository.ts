import { PortfolioRepository } from '../domain/repository/portfolio.repository';
import { Portfolio } from '../domain/entity/portfolio';
import { LocalPortfolioDataSource } from './local-portfolio.datasource';
import { mapDtoToDomain } from './portfolio.mappers';

export class LocalPortfolioRepository implements PortfolioRepository {
  constructor(private readonly ds = new LocalPortfolioDataSource()) {}

  async getPortfolio(): Promise<Portfolio> {
    const dto = await this.ds.load();
    return mapDtoToDomain(dto);
  }
}
