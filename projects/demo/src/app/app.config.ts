import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxLinkifyjsService, NgxLinkifyjsConfigToken, DEFAULT_CONFIG } from 'ngx-linkifyjs-v2';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    NgxLinkifyjsService,
    {
      provide: NgxLinkifyjsConfigToken,
      useValue: { ...DEFAULT_CONFIG, enableHash: true, enableMention: true }
    }
  ]
};
