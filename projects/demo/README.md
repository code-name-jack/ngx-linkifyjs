# ngx-linkifyjs Demo Application

This is a comprehensive demo application showcasing the features of the ngx-linkifyjs library for Angular 20.

## Features Demonstrated

- **Pipe Usage**: Using the `linkify` pipe to transform text in templates
- **Service Usage**: Using `NgxLinkifyjsService` to find, test, and linkify text programmatically
- **URL Detection**: Automatically detect and linkify URLs
- **Email Detection**: Convert email addresses to mailto links
- **Hashtag Support**: Linkify hashtags (configurable)
- **Mention Support**: Linkify @mentions (configurable)
- **Custom Options**: Configure link behavior, styling, and targets

## Running the Demo

### Development Server

To run the demo application locally:

```bash
npm run demo
```

This will:
1. Build the ngx-linkifyjs library
2. Start the development server
3. Open the demo at `http://localhost:4200`

### Build the Demo

To build the demo application:

```bash
# Development build
npm run demo:build

# Production build
npm run demo:build:prod
```

The built files will be output to `dist/demo/`.

## Project Structure

```
projects/demo/
├── src/
│   ├── app/
│   │   ├── app.ts              # Main component with examples
│   │   ├── app.html            # Template with demos
│   │   ├── app.css             # Styles
│   │   ├── app.config.ts       # Application configuration
│   │   └── app.routes.ts       # Routes (if any)
│   ├── main.ts                 # Bootstrap file
│   ├── index.html              # HTML entry point
│   └── styles.css              # Global styles
└── README.md                   # This file
```

## Code Examples

### Using the Pipe

```typescript
import { NgxLinkifyjsPipe } from 'ngx-linkifyjs-v2';

@Component({
  selector: 'app-example',
  imports: [NgxLinkifyjsPipe],
  template: `
    <div [innerHTML]="text | linkify"></div>
    
    <!-- With options -->
    <div [innerHTML]="text | linkify:options"></div>
  `
})
export class ExampleComponent {
  text = 'Visit https://example.com or email info@example.com';
  options = {
    className: 'custom-link',
    target: { url: '_blank' }
  };
}
```

### Using the Service

```typescript
import { NgxLinkifyjsService, Link } from 'ngx-linkifyjs-v2';

@Component({
  selector: 'app-example',
  // ...
})
export class ExampleComponent {
  constructor(private linkifyService: NgxLinkifyjsService) {}

  findLinks(text: string): Link[] {
    return this.linkifyService.find(text);
  }

  testIfLink(text: string): boolean {
    return this.linkifyService.test(text);
  }

  convertToHtml(text: string): string {
    return this.linkifyService.linkify(text, {
      target: { url: '_blank' }
    });
  }
}
```

### Configuration

Configure hashtag and mention support in your application config:

```typescript
import { ApplicationConfig } from '@angular/core';
import { 
  NgxLinkifyjsService, 
  NgxLinkifyjsConfigToken, 
  DEFAULT_CONFIG 
} from 'ngx-linkifyjs-v2';

export const appConfig: ApplicationConfig = {
  providers: [
    NgxLinkifyjsService,
    {
      provide: NgxLinkifyjsConfigToken,
      useValue: { 
        enableHash: true,      // Enable hashtag support
        enableMention: true    // Enable mention support
      }
    }
  ]
};
```

## Key Features in the Demo

1. **Interactive Testing**: Try different text inputs and see real-time linkification
2. **Service API Demo**: See how to use the service methods programmatically
3. **Multiple Link Types**: Examples of URLs, emails, hashtags, and mentions
4. **Custom Styling**: Demonstrates how to apply custom classes to linkified text
5. **Configuration Options**: Shows various configuration options available

## Technologies Used

- Angular 20
- ngx-linkifyjs-v2
- TypeScript
- CSS3 with modern features
- Standalone Components

## Contributing

If you find any issues or have suggestions for improvements to the demo, please open an issue or submit a pull request on GitHub.

## License

MIT

