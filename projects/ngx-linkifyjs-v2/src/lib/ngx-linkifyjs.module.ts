import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';

import {NgxLinkifyjsService} from './service/ngx-linkifyjs.service';
import {NgxLinkifyjsPipe} from './pipes/ngx-linkifyjs.pipe';

// Export module's public API
export {Link} from './interfaces/ngx-linkifyjs.interface';
import {NgxLinkifyjsConfig} from './interfaces/ngx-linkifyjs.interface';

export {LinkType} from './enum/linktype.enum';
export {NgxLinkifyOptions} from './interfaces/ngx-linkifyjs.interface';
export {NgxLinkifyjsPipe} from './pipes/ngx-linkifyjs.pipe';
export {NgxLinkifyjsService} from './service/ngx-linkifyjs.service';

export const NgxLinkifyjsConfigToken = new InjectionToken<NgxLinkifyjsConfig>('NgxLinkifyjsConfig');
export const DEFAULT_CONFIG: NgxLinkifyjsConfig = {enableHash: true, enableMention: true};

// Conditionally import plugins based on configuration
let pluginsLoaded = false;

function loadPlugins(config: NgxLinkifyjsConfig) {
  if (pluginsLoaded) return;
  
  if (config?.enableHash) {
    import('linkify-plugin-hashtag').catch(err => console.error('Failed to load hashtag plugin:', err));
  }

  if (config?.enableMention) {
    import('linkify-plugin-mention').catch(err => console.error('Failed to load mention plugin:', err));
  }
  
  pluginsLoaded = true;
}

@NgModule({
  imports: [NgxLinkifyjsPipe],
  exports: [NgxLinkifyjsPipe]
})
export class NgxLinkifyjsModule {

  static forRoot(config: NgxLinkifyjsConfig = DEFAULT_CONFIG): ModuleWithProviders<NgxLinkifyjsModule> {
    loadPlugins(config);
    
    return {
      ngModule: NgxLinkifyjsModule,
      providers: [
        NgxLinkifyjsService,
        {
          provide: NgxLinkifyjsConfigToken,
          useValue: config
        }
      ]
    };
  }

}
