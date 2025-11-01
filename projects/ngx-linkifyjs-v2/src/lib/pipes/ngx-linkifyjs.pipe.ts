import { Pipe, PipeTransform } from '@angular/core';
import { NgxLinkifyOptions } from '../interfaces/ngx-linkifyjs.interface';
import linkifyStr from 'linkify-string';

@Pipe({
  name: 'linkify',
  standalone: true
})
export class NgxLinkifyjsPipe implements PipeTransform {
  transform(value: string | null | undefined, options?: NgxLinkifyOptions): string {
    if (!value) {
      return '';
    }
    return linkifyStr(value, options);
  }
}
