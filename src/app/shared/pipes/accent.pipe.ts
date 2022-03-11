import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accent'
})
export class AccentPipe implements PipeTransform {

  transform(value: string): string {

    const blueHex = '#3880ff';
    const turquoise = '#28AFB0';
    const orangeHex = '#EF8354';
    const pinkHex = '#F487B6';
    const purpleHex = '#CC59D2';

    switch (value) {
      case blueHex: {
        return 'Blau';
      }
      case turquoise: {
        //statements;
        return 'Türkis';
      }
      case orangeHex: {
        return 'Orange';
      }
      case pinkHex: {
        return 'Pink';
      }
      case purpleHex: {
        return 'Lila';
      }
      default: {
        return 'Unknown color';
      }
    }
  }
}
