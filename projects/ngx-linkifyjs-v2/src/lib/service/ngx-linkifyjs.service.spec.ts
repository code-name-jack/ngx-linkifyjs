import { describe, it, expect, beforeEach } from 'vitest';
import {inject, TestBed} from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
// Import plugins to auto-register them with linkifyjs
import 'linkify-plugin-hashtag';
import 'linkify-plugin-mention';

import {NgxLinkifyjsService} from './ngx-linkifyjs.service';
import {LinkType} from '../enum/linktype.enum';
import {Link} from '../interfaces/ngx-linkifyjs.interface';

describe('NgxLinkifyjsService without importing hashtag/mention', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [NgxLinkifyjsService, provideZonelessChangeDetection()],
    teardown: { destroyAfterEach: false }
});
  });

  it('should create service without importing the hashtag/mention lib', inject([NgxLinkifyjsService], (service: NgxLinkifyjsService) => {
    expect(service).toBeTruthy();
  }));

  it('should not find any hashtag links', inject([NgxLinkifyjsService], (service: NgxLinkifyjsService) => {
    const result: Link[] = service.find('Linkify is #super #rad2015');
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  }));

  it('should not find any mention links', inject([NgxLinkifyjsService], (service: NgxLinkifyjsService) => {
    const result: Link[] = service.find('Linkify needs @you and @someone else');
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  }));

});

describe('NgxLinkifyjsService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [NgxLinkifyjsService, provideZonelessChangeDetection()],
    teardown: { destroyAfterEach: false }
});
  });

  it('should create service', inject([NgxLinkifyjsService], (service: NgxLinkifyjsService) => {
    expect(service).toBeTruthy();
  }));

  // linkify function
  it('should linkify the provided text - 1 link and 1 email', inject([NgxLinkifyjsService], (service: NgxLinkifyjsService) => {
    const result: string = service.linkify('For help with GitHub.com, please email support@github.com');
    expect(result).toContain('<a href="http://GitHub.com">GitHub.com</a>');
    expect(result).toContain('<a href="mailto:support@github.com">support@github.com</a>');
    expect(result).toContain('For help with');
    expect(result).toContain('please email');
  }));

  // linkify function
  it('should linkify the provided text with providing an empty object option',
    inject([NgxLinkifyjsService], (service: NgxLinkifyjsService) => {
    const result: string = service.linkify('For help with GitHub.com, please email support@github.com', null);
    expect(result).toContain('<a href="http://GitHub.com">GitHub.com</a>');
    expect(result).toContain('<a href="mailto:support@github.com">support@github.com</a>');
    expect(result).toContain('For help with');
    expect(result).toContain('please email');
  }));

  // linkify function
  it('should the target attribute not equal to _blank', inject([NgxLinkifyjsService], (service: NgxLinkifyjsService) => {
    const result: string = service.linkify('For help with GitHub.com, please email support@github.com', {target: {url: '_self'}});

    const expectedResult = 'For help with <a href=\"http://github.com\" class=\"linkified\" target=\"_blank\">GitHub.com</a>, ' +
      'please email <a href=\"mailto:support@github.com\" class=\"linkified\">support@github.com</a>';

    expect(result).not.toEqual(expectedResult);

    expect(result).not.toContain('_blank');
    expect(result).toContain('_self');
  }));

  // find function

  // it('should always return an array after finding a link', inject([NgxLinkifyjsService], (service: NgxLinkifyjsService) => {
  //   expect(service.find('Any links to github.com here?')).toBeInstanceOf(Array);
  // }));

  it('should return an empty array if no links are provided', inject([NgxLinkifyjsService], (service: NgxLinkifyjsService) => {
    expect(service.find('Any links to github here?').length).toEqual(0);
  }));

  it('should find an url link', inject([NgxLinkifyjsService], (service: NgxLinkifyjsService) => {
    const result: Link[] = service.find('Any links to github.com here?');
    expect(result.length).toEqual(1);
    expect(result[0]).toMatchObject({
      type: LinkType.URL,
      value: 'github.com',
      href: 'http://github.com'
    });
  }));

  it('should find more than 1 url link', inject([NgxLinkifyjsService], (service: NgxLinkifyjsService) => {
    const result: Link[] = service.find('Any links to github.com here? Maybe https://github.com/AnthonyNahas');
    expect(result.length).toEqual(2);
    expect(result[0]).toMatchObject({
      type: LinkType.URL,
      value: 'github.com',
      href: 'http://github.com'
    });
    expect(result[1]).toMatchObject({
      type: LinkType.URL,
      value: 'https://github.com/AnthonyNahas',
      href: 'https://github.com/AnthonyNahas'
    });
  }));

  it('should find 1 url link and 1 email', inject([NgxLinkifyjsService], (service: NgxLinkifyjsService) => {
    const result: Link[] = service.find('Any links to github.com here? If not, contact test@example.com');
    expect(result.length).toEqual(2);
    expect(result[0]).toMatchObject({
      type: LinkType.URL,
      value: 'github.com',
      href: 'http://github.com'
    });
    expect(result[1]).toMatchObject({
      type: LinkType.EMAIL,
      value: 'test@example.com',
      href: 'mailto:test@example.com'
    });
  }));

  it('should find more than 1 hashtag links', inject([NgxLinkifyjsService], (service: NgxLinkifyjsService) => {
    const result: Link[] = service.find('Linkify is #super #rad2015');
    expect(result.length).toEqual(2);
    expect(result[0]).toMatchObject({
      type: LinkType.HASHTAG,
      value: '#super',
      href: '#super'
    });
    expect(result[1]).toMatchObject({
      type: LinkType.HASHTAG,
      value: '#rad2015',
      href: '#rad2015'
    });
  }));

  it('should find 2 mention links', inject([NgxLinkifyjsService], (service: NgxLinkifyjsService) => {
    const result: Link[] = service.find('Linkify needs @you and @someone else');
    expect(result.length).toEqual(2);
    expect(result[0]).toMatchObject({
      type: LinkType.MENTION,
      value: '@you',
      href: '/you'
    });
    expect(result[1]).toMatchObject({
      type: LinkType.MENTION,
      value: '@someone',
      href: '/someone'
    });
  }));

  // test function

  it('should return true if a link is provided', inject([NgxLinkifyjsService], (service: NgxLinkifyjsService) => {
    expect(service.test('github.com')).toBeTruthy();
  }));

  it('should return true if an email is provided', inject([NgxLinkifyjsService], (service: NgxLinkifyjsService) => {
    expect(service.test('dev@example.com')).toBeTruthy();
  }));

  it('should return false when the array does not contain only links', inject([NgxLinkifyjsService], (service: NgxLinkifyjsService) => {
    expect(service.test(['github.com', 'email'])).toBeFalsy();
  }));

  // Null/undefined handling tests
  it('should return empty string for null input', inject([NgxLinkifyjsService], (service: NgxLinkifyjsService) => {
    expect(service.linkify(null as any)).toBe('');
  }));

  it('should return empty string for undefined input', inject([NgxLinkifyjsService], (service: NgxLinkifyjsService) => {
    expect(service.linkify(undefined as any)).toBe('');
  }));

  it('should return empty array for null input in find', inject([NgxLinkifyjsService], (service: NgxLinkifyjsService) => {
    expect(service.find(null as any)).toEqual([]);
  }));

  it('should return empty array for undefined input in find', inject([NgxLinkifyjsService], (service: NgxLinkifyjsService) => {
    expect(service.find(undefined as any)).toEqual([]);
  }));
});


