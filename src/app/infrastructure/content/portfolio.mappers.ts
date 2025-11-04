import { Portfolio } from '../../domain/entity/portfolio';
import { PortfolioDtoNS } from './portfolio.dto';

export function mapDtoToDomain(dto: PortfolioDtoNS.Root): Portfolio {
  return {
    profile: dto.profile,
    projects: dto.projects,
    experience: dto.experience,
    education: dto.education,
    contact: dto.contact,
  };
}
