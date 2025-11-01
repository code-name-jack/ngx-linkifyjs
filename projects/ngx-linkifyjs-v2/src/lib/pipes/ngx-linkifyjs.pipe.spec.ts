import { describe, it, expect } from 'vitest';
import { NgxLinkifyjsPipe } from './ngx-linkifyjs.pipe';

describe('NgxLinkifyjsPipe', () => {
  it('should create an instance', () => {
    const pipe = new NgxLinkifyjsPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return empty string for null input', () => {
    const pipe = new NgxLinkifyjsPipe();
    expect(pipe.transform(null)).toBe('');
  });

  it('should return empty string for undefined input', () => {
    const pipe = new NgxLinkifyjsPipe();
    expect(pipe.transform(undefined)).toBe('');
  });

  it('should return empty string for empty string input', () => {
    const pipe = new NgxLinkifyjsPipe();
    expect(pipe.transform('')).toBe('');
  });

  it('should linkify valid text', () => {
    const pipe = new NgxLinkifyjsPipe();
    const result = pipe.transform('Visit github.com');
    expect(result).toContain('<a href');
    expect(result).toContain('github.com');
  });
});
