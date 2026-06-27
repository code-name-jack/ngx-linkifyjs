# ngx-linkifyjs

[![npm version](https://badge.fury.io/js/ngx-linkifyjs.svg)](https://badge.fury.io/js/ngx-linkifyjs)
[![license](https://img.shields.io/github/license/anthonynahas/ngx-linkifyjs.svg?style=flat-square)](https://github.com/AnthonyNahas/ngx-linkifyjs/blob/master/LICENSE)

> **Angular 22+ wrapper for linkifyjs** - Automatically find and convert URLs, emails, hashtags, and mentions in text to HTML links.

<p align="center">
  <img alt="ngx-linkifyjs demo" width="320px" style="text-align: center;" 
  src="https://cdn.jsdelivr.net/gh/anthonynahas/ngx-linkifyjs@master/assets/demo.gif">
</p>

## ✨ Features

- 🔗 **Auto-detect URLs** - Finds and linkifies URLs (with or without protocol)
- 📧 **Email addresses** - Converts emails to `mailto:` links
- #️⃣ **Hashtags** - Linkify hashtags for social media content
- @ **Mentions** - Convert @mentions to links
- 🎨 **Customizable** - Full control over link styling and behavior
- 🚀 **Angular 22+** - Built for modern Angular with standalone-first architecture
- 📦 **Tree-shakeable** - Optimized bundle size
- 🔧 **TypeScript** - Full type safety

## 🎮 Live Demo

A comprehensive demo application is available in the [repository](https://github.com/code-name-jack/ngx-linkifyjs-v2) showcasing:
- 🎨 Interactive examples with live editing
- 🔧 Service API demonstrations  
- ⚙️ Configuration options showcase
- 📝 Copy-paste code examples

---

## 📦 Installation

### Option 1: Using Angular Schematics (Recommended)

```bash
ng add @code-name-jack/ngx-linkifyjs
```

### Option 2: Using npm

```bash
npm install @code-name-jack/ngx-linkifyjs
```

---

## 🚀 Quick Start

**1. Configure in your app (app.config.ts):**

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideNgxLinkifyjs } from '@code-name-jack/ngx-linkifyjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNgxLinkifyjs({
      enableHash: true,     // Enable hashtag detection
      enableMention: true   // Enable @mention detection
    })
  ]
};
```

**2. Import the pipe in your component:**

```typescript
import { Component } from '@angular/core';
import { NgxLinkifyjsPipe } from '@code-name-jack/ngx-linkifyjs';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [NgxLinkifyjsPipe],
  template: `
    <div [innerHTML]="text | linkify"></div>
  `
})
export class ExampleComponent {
  text = 'Visit https://github.com or email info@example.com';
}
```

**3. Using the service:**

```typescript
import { Component, inject } from '@angular/core';
import { NgxLinkifyjsService } from '@code-name-jack/ngx-linkifyjs';

@Component({
  selector: 'app-example',
  standalone: true
})
export class ExampleComponent {
  private linkifyService = inject(NgxLinkifyjsService);
  
  constructor() {
    // Find all links
    const links = this.linkifyService.find('Visit github.com');
    // Output: [{ type: 'url', value: 'github.com', href: 'http://github.com' }]
    
    // Test if text contains links
    const hasLinks = this.linkifyService.test('example.com'); // true
    
    // Convert text to HTML
    const html = this.linkifyService.linkify('Visit example.com');
  }
}
```

> **Note:** Since `NgxLinkifyjsService` uses `providedIn: 'root'`, it's automatically available once you add `provideNgxLinkifyjs()` to your app config. The `provideNgxLinkifyjs()` function is only needed to configure plugin options (hashtags/mentions).

---

## 📖 Usage Guide

### Using the Pipe

The `linkify` pipe transforms text into linkified HTML:

```html
<!-- Basic usage -->
<p [innerHTML]="'Visit https://example.com' | linkify"></p>

<!-- With custom options -->
<p [innerHTML]="text | linkify:options"></p>
```

```typescript
import { NgxLinkifyOptions } from '@code-name-jack/ngx-linkifyjs';

export class MyComponent {
  text = 'Check out github.com and follow @angular!';
  
  options: NgxLinkifyOptions = {
    className: 'custom-link',
    target: { url: '_blank' },
    defaultProtocol: 'https'
  };
}
```

### Using the Service

The `NgxLinkifyjsService` provides programmatic access to linkify functionality:

#### 1️⃣ `linkify(text: string, options?: NgxLinkifyOptions): string`

Converts text to linkified HTML string.

```typescript
const html = this.linkifyService.linkify(
  'Visit github.com or email support@example.com',
  {
    className: 'my-link',
    target: { url: '_blank' }
  }
);
// Output: 'Visit <a href="http://github.com" class="my-link" target="_blank">github.com</a> or email <a href="mailto:support@example.com" class="my-link">support@example.com</a>'
```

#### 2️⃣ `find(text: string): Link[]`

Finds all links in text and returns an array of link objects.

```typescript
const links = this.linkifyService.find(
  'Visit github.com or email test@example.com #angular'
);
// Output:
// [
//   { type: 'url', value: 'github.com', href: 'http://github.com' },
//   { type: 'email', value: 'test@example.com', href: 'mailto:test@example.com' },
//   { type: 'hashtag', value: '#angular', href: '#angular' }
// ]
```

#### 3️⃣ `test(value: string | string[]): boolean`

Tests if a string (or all strings in an array) contains valid links.

```typescript
this.linkifyService.test('github.com');              // true
this.linkifyService.test('hello world');             // false
this.linkifyService.test(['github.com', 'test.com']); // true
this.linkifyService.test(['github.com', 'hello']);    // false
```

---

## ⚙️ Configuration Options

### Available Options (`NgxLinkifyOptions`)

All options are optional and follow the [linkifyjs options](https://linkify.js.org/docs/options.html):

```typescript
interface NgxLinkifyOptions {
  /**
   * Add custom attributes to links
   */
  attributes?: Record<string, any>;
  
  /**
   * CSS class to add to links (default: 'linkified')
   */
  className?: string;
  
  /**
   * Default protocol for URLs without one (default: 'http')
   */
  defaultProtocol?: string;
  
  /**
   * Event handlers for links
   */
  events?: Record<string, (e: Event) => void>;
  
  /**
   * Format the link text
   */
  format?: (value: string, type: string) => string;
  
  /**
   * Format the href attribute
   */
  formatHref?: (href: string, type: string) => string;
  
  /**
   * HTML tags to ignore when linkifying
   */
  ignoreTags?: string[];
  
  /**
   * Convert newlines to <br> tags
   */
  nl2br?: boolean;
  
  /**
   * HTML tag to use for links (default: 'a')
   */
  tagName?: string;
  
  /**
   * Target attribute for links
   */
  target?: { url: string };
  
  /**
   * Validate links before linkifying
   */
  validate?: boolean;
}
```

### Example: Custom Configuration

```typescript
import { NgxLinkifyOptions } from '@code-name-jack/ngx-linkifyjs';

export class MyComponent {
  options: NgxLinkifyOptions = {
    className: 'fancy-link',
    target: { url: '_blank' },
    defaultProtocol: 'https',
    
    // Customize link text
    format: (value, type) => {
      if (type === 'url' && value.length > 50) {
        return value.slice(0, 50) + '…';
      }
      return value;
    },
    
    // Customize href
    formatHref: (href, type) => {
      if (type === 'hashtag') {
        return 'https://twitter.com/hashtag/' + href.slice(1);
      }
      return href;
    },
    
    // Add custom attributes
    attributes: {
      rel: 'noopener noreferrer'
    }
  };
}
```

### Global Configuration

Configure hashtag and mention support globally:

```typescript
// For standalone apps (in app.config.ts)
import { ApplicationConfig } from '@angular/core';
import { NgxLinkifyjsService, NgxLinkifyjsConfigToken } from '@code-name-jack/ngx-linkifyjs';

export const appConfig: ApplicationConfig = {
  providers: [
    NgxLinkifyjsService,
    {
      provide: NgxLinkifyjsConfigToken,
      useValue: {
        enableHash: true,     // Enable #hashtag detection
        enableMention: true   // Enable @mention detection
      }
    }
  ]
};

// In app.config.ts
import { provideNgxLinkifyjs } from '@code-name-jack/ngx-linkifyjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNgxLinkifyjs({
      enableHash: false,      // Disable hashtags
      enableMention: false    // Disable mentions
    })
  ]
};
```

---

## 🎨 Styling Links

Add custom CSS to style your linkified links:

```css
/* Default linkified class */
.linkified {
  color: #0066cc;
  text-decoration: underline;
}

.linkified:hover {
  color: #0052a3;
}

/* Custom class from options */
.custom-link {
  color: #667eea;
  font-weight: 600;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.custom-link:hover {
  border-bottom-color: #667eea;
}
```

---

## 🔍 Link Types

The library detects four types of links:

| Type | Example | Output |
|------|---------|--------|
| **URL** | `https://example.com` | `<a href="https://example.com">...</a>` |
| **Email** | `user@example.com` | `<a href="mailto:user@example.com">...</a>` |
| **Hashtag** | `#angular` | `<a href="#angular">#angular</a>` |
| **Mention** | `@username` | `<a href="/username">@username</a>` |

> 💡 **Note:** Hashtags and mentions are enabled by default but can be disabled in configuration.

---

## 📱 Real-World Examples

### Social Media Posts

```typescript
@Component({
  template: `
    <div class="post" [innerHTML]="post | linkify:socialOptions"></div>
  `
})
export class PostComponent {
  post = 'Check out the new @angular release! 🚀 #Angular20 https://angular.io';
  
  socialOptions: NgxLinkifyOptions = {
    target: { url: '_blank' },
    formatHref: (href, type) => {
      if (type === 'hashtag') {
        return `https://twitter.com/hashtag/${href.slice(1)}`;
      }
      if (type === 'mention') {
        return `https://twitter.com/${href.slice(1)}`;
      }
      return href;
    }
  };
}
```

### Comment Section

```typescript
@Component({
  template: `
    <div class="comment" 
         *ngFor="let comment of comments"
         [innerHTML]="comment.text | linkify:commentOptions">
    </div>
  `
})
export class CommentsComponent {
  comments = [
    { text: 'Great article! See more at example.com' },
    { text: 'Contact me at john@example.com for details' }
  ];
  
  commentOptions: NgxLinkifyOptions = {
    className: 'comment-link',
    target: { url: '_blank' },
    attributes: {
      rel: 'nofollow noopener'
    }
  };
}
```

### Chat Application

```typescript
@Component({
  selector: 'chat-message',
  template: `
    <div class="message" [innerHTML]="message | linkify"></div>
  `
})
export class ChatMessageComponent {
  @Input() message!: string;
}
```

---

## 🧪 Testing

When testing components that use ngx-linkifyjs:

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxLinkifyjsPipe, NgxLinkifyjsService } from '@code-name-jack/ngx-linkifyjs';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent, NgxLinkifyjsPipe],
      providers: [NgxLinkifyjsService]
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
  });

  it('should linkify URLs', () => {
    component.text = 'Visit example.com';
    fixture.detectChanges();
    
    const element = fixture.nativeElement;
    expect(element.querySelector('a')).toBeTruthy();
    expect(element.querySelector('a').href).toContain('example.com');
  });
});
```

---

## 📚 API Reference

### Exports

```typescript
// Provider function (for both standalone and NgModule apps)
export { provideNgxLinkifyjs }

// Standalone pipe
export { NgxLinkifyjsPipe }

// Service
export { NgxLinkifyjsService }

// Types & Interfaces
export { NgxLinkifyOptions }
export { NgxLinkifyjsConfig }
export { Link }
export { LinkType }

// Tokens
export { NgxLinkifyjsConfigToken }
export { DEFAULT_CONFIG }
```

### Types

```typescript
interface Link {
  type: string;    // 'url' | 'email' | 'hashtag' | 'mention'
  value: string;   // Original text
  href: string;    // Generated href attribute
}

enum LinkType {
  URL = 'url',
  EMAIL = 'email',
  HASHTAG = 'hashtag',
  MENTION = 'mention'
}

interface NgxLinkifyjsConfig {
  enableHash?: boolean;     // Enable hashtag detection (default: true)
  enableMention?: boolean;  // Enable mention detection (default: true)
}
```

---


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

For development setup and publishing instructions, see the [Developer Guide](https://github.com/code-name-jack/ngx-linkifyjs-v2/blob/master/projects/ngx-linkifyjs-v2/README.dev.md).

---

## 🐛 Issues & Support

- 🐛 [Report bugs](https://github.com/code-name-jack/ngx-linkifyjs-v2/issues)
- 💡 [Request features](https://github.com/code-name-jack/ngx-linkifyjs-v2/issues)
- 💬 [Ask questions](https://github.com/code-name-jack/ngx-linkifyjs-v2/discussions)

---

## 📄 License

Copyright (c) 2018 Anthony Nahas  
Copyright (c) 2022 Ethan Gerardot  
Copyright (c) 2025 Code Name Jack

Licensed under the [MIT License](LICENSE)

---

## 🌟 Show Your Support

If this project helped you, please consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting features
- 📢 Sharing with others

---

## 🔗 Related Projects

- [@angular-material-extensions/link-preview](https://github.com/angular-material-extensions/link-preview) - Link preview component using ngx-linkifyjs
- [linkifyjs](https://linkify.js.org/) - The underlying linkify library

---

<p align="center">
  Made with ❤️ for the Angular community
</p>

<p align="center">
  <a href="https://www.jetbrains.com">
    <img src="assets/jetbrains-variant-4_logos/jetbrains-variant-4.png" alt="JetBrains" height="50">
  </a>
  <br>
  <sub>Supported by JetBrains with 1 ALL PRODUCTS PACK OS LICENSE</sub>
</p>
