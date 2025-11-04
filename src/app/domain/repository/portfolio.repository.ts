import { Portfolio } from '../entity/portfolio';

export abstract class PortfolioRepository {
  abstract getPortfolio(): Promise<Portfolio>;
}
