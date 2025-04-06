import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: number): string {
    if (!value && value !== 0) {
      return '';
    } else {
      return `${value}` + " Ft";
    }
  }

}
