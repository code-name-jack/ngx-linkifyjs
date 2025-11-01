import { Injectable } from '@angular/core';
import * as linkify from 'linkifyjs';
import linkifyStr from 'linkify-string';
import { Link, NgxLinkifyOptions } from '../interfaces/ngx-linkifyjs.interface';

@Injectable({ providedIn: 'root' })
export class NgxLinkifyjsService {
  /**
   * Convert the passed text as a string to an appropriate url
   *
   * @param text - the string to convert
   * @param options - options to pass it to the linkifyjs library
   * @returns HTML string with linkified URLs, emails, hashtags, and mentions
   */
  linkify(text: string, options?: NgxLinkifyOptions): string {
    if (!text) {
      return '';
    }
    return linkifyStr(text, options);
  }

  /**
   * Find any links in a given text as a string
   *
   * @param text - the string to find some links
   * @returns Array of Link objects found in the text
   */
  find(text: string): Link[] {
    if (!text) {
      return [];
    }
    return linkify.find(text);
  }

  /**
   * Test if a given value is a link or an array of all links
   *
   * @param value - the value to test (string or array of strings)
   * @returns true if all values are valid links, false otherwise
   */
  test(value: string | readonly string[]): boolean {
    if (typeof value === 'string') {
      return linkify.test(value);
    }
    return value.every(v => linkify.test(v));
  }
}
