import { Pipe, PipeTransform } from '@angular/core';
import { Appointment} from '../_models/appt';
import { from } from 'rxjs/observable/from';

@Pipe({
  name: 'filterByAvailable'
})
export class FilterByAvailablePipe implements PipeTransform {
  transform(allApptTimes: string[], booked: Appointment[]): any[] {
    if (!booked) {
      return allApptTimes;
    }
    let available = [];
    for (let j = 0; j < booked.length; j++) {
      if (j >= allApptTimes.length) {
        return available;
      } else {
        if (booked[j].time !== allApptTimes[j]) {
          available.push(allApptTimes[j]);
        }
      }
    }
    console.log('my range: ' + allApptTimes);
    console.log('booked for this doc: ' + booked);
    console.log(available);
    return available;
  }
}
