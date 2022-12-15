import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim'
})
export class TrimPipe implements PipeTransform {

  transform(value: string): string | undefined {
    if (value) return value.trim();
    else return '';
  }

}
