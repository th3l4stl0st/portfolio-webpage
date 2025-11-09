import { Portfolio } from '../domain/entity/portfolio';
import { PortfolioDtoNS } from './portfolio.dto';

export function mapDtoToDomain(dto: PortfolioDtoNS.Root): Portfolio {
  return {
    title: dto.title,
    profile: dto.profile,
    about: dto.about,
    projects: dto.projects,
    experience: dto.experience,
    education: dto.education,
  };
}
