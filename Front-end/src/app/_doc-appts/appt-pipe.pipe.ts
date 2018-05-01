import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'apptPipe'
})
export class ApptPipe implements PipeTransform {

  transform(value: any, args: string[]): any {
    let res = [];
    for (let i = 0; i < value; i++) {
        res.push(i + 1);
      }
    return res;
  }

}
