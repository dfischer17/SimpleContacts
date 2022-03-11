import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'theme'
})
export class ThemePipe implements PipeTransform {

  transform(value: boolean): string {
    return value === true ? 'Ja' : 'Nein';
  }
}
