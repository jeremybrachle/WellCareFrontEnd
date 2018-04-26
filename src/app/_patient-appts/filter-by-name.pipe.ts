import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filterByName'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
       return [];
    }
    // if (!searchText) {
    //   return items;
    // }
    let toBeRet = [];
    searchText = searchText.toLowerCase();
    items.filter( it => {
      if (it.firstName.toLowerCase().includes(searchText) || it.lastName.toLowerCase().includes(searchText)){
        toBeRet.push(it);
      }
    });
    console.log(toBeRet);
    return toBeRet;
  }
}

