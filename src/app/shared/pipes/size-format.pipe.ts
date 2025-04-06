import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sizeFormat'
})
export class SizeFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (value === "") {
      return '';
    } else {
      return `${value}` + " cm";
    }
  }

}
