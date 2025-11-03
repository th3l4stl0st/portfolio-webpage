import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { ThemeService } from './app/core/theme/theme.service';

import { provideHttpClient } from '@angular/common/http';
import { ProjectRepository } from './app/domain/repositories/project.repository';
import { ProjectFileRepository } from './app/infrastructure/repositories/project-file.repository';

const theme = new ThemeService();
theme.applyTheme();

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),
    provideHttpClient(),
    { provide: ProjectRepository, useClass: ProjectFileRepository },
  ],
}).catch((err) => console.error(err));
