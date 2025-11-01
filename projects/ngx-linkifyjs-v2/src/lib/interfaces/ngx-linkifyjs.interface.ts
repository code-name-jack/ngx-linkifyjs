export interface Link {
  type: string;
  value: string;
  href: string;
}

export interface NgxLinkifyjsConfig {
  enableHash?: boolean;
  enableMention?: boolean;
}

export interface NgxLinkifyOptions {
  attributes?: Record<string, string | number | boolean>;
  className?: string;
  defaultProtocol?: string;
  events?: Record<string, (event: Event) => void>;
  ignoreTags?: string[];
  nl2br?: boolean;
  tagName?: string;
  target?: { url: string };
  validate?: boolean;

  format?: (value: string, type: string) => string;

  formatHref?: (href: string, type: string) => string;
}
