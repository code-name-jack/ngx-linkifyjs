import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { NgxLinkifyjsService } from '../service/ngx-linkifyjs.service';
import { NgxLinkifyjsConfig } from '../interfaces/ngx-linkifyjs.interface';
import { NgxLinkifyjsConfigToken, DEFAULT_CONFIG } from '../constants/ngx-linkifyjs.constants';

// Conditionally import plugins based on configuration
let pluginsLoaded = false;

function loadPlugins(config: NgxLinkifyjsConfig): void {
  if (pluginsLoaded) {
    return;
  }
  
  const pluginPromises: Promise<unknown>[] = [];

  if (config?.enableHash) {
    pluginPromises.push(
      import('linkify-plugin-hashtag').catch(err => {
        console.error('Failed to load hashtag plugin:', err);
        return null;
      })
    );
  }

  if (config?.enableMention) {
    pluginPromises.push(
      import('linkify-plugin-mention').catch(err => {
        console.error('Failed to load mention plugin:', err);
        return null;
      })
    );
  }

  if (pluginPromises.length > 0) {
    Promise.all(pluginPromises).finally(() => {
      pluginsLoaded = true;
    });
  } else {
    pluginsLoaded = true;
  }
}

/**
 * Provides NgxLinkifyjs services and configuration.
 * Works with both standalone and NgModule-based applications.
 * 
 * @param config - Configuration options for enabling hashtag and mention plugins
 * @returns EnvironmentProviders array that can be used in app.config.ts
 * 
 * @example
 * ```typescript
 * import { provideNgxLinkifyjs } from 'ngx-linkifyjs';
 * 
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideNgxLinkifyjs({
 *       enableHash: true,
 *       enableMention: true
 *     })
 *   ]
 * };
 * ```
 */
export function provideNgxLinkifyjs(
  config: NgxLinkifyjsConfig = DEFAULT_CONFIG
): EnvironmentProviders {
  loadPlugins(config);
  
  return makeEnvironmentProviders([
    NgxLinkifyjsService,
    {
      provide: NgxLinkifyjsConfigToken,
      useValue: { ...DEFAULT_CONFIG, ...config }
    }
  ]);
}

