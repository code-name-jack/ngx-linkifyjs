import { InjectionToken } from '@angular/core';
import { NgxLinkifyjsConfig } from '../interfaces/ngx-linkifyjs.interface';

/**
 * Injection token for NgxLinkifyjs configuration
 */
export const NgxLinkifyjsConfigToken = new InjectionToken<NgxLinkifyjsConfig>('NgxLinkifyjsConfig');

/**
 * Default configuration for NgxLinkifyjs
 */
export const DEFAULT_CONFIG: NgxLinkifyjsConfig = { enableHash: true, enableMention: true };

