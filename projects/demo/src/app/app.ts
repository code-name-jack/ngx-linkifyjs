import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxLinkifyjsPipe, NgxLinkifyjsService, NgxLinkifyOptions, Link } from 'ngx-linkifyjs-v2';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, NgxLinkifyjsPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'ngx-linkifyjs Demo';
  
  // Demo text samples
  sampleText = 'Check out https://github.com/code-name-jack/ngx-linkifyjs-v2 and email us at support@example.com. Follow @angular and use #ngx for hashtags!';
  
  customText = 'Visit example.com or contact info@test.com';
  
  // Options
  linkifyOptions: NgxLinkifyOptions = {
    className: 'custom-link',
    target: { url: '_blank' }
  };
  
  // Results from service
  foundLinks: Link[] = [];
  private readonly linkifyService = inject(NgxLinkifyjsService);

  constructor() {
    this.findLinks();
  }
  
  findLinks() {
    this.foundLinks = this.linkifyService.find(this.customText);
  }
  
  testLink(value: string): boolean {
    return this.linkifyService.test(value);
  }
}
