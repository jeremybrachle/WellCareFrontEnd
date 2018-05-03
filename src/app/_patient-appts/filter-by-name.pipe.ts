import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filterByName'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
       return [];
    }
    console.log(items);
    console.log(items[0].email);
    console.log(searchText);

    // if (!searchText) {
    //   return items;
    // }
    let toBeRet = [];
    searchText = searchText.toLowerCase();
    // items.filter( it => {
    //   console.log(firstName);
    //   console.log(it.firstName.includes(searchText));
    //   if (it.firstName.toLowerCase().includes(searchText) || it.lastName.toLowerCase().includes(searchText)){
    //     toBeRet.push(it);
    //   }
    // });
    for (let k = 0; k < items.length; k++) {
      if (items[k].firstName.toLowerCase().includes(searchText)) {
        console.log(items[k].firstName);
        toBeRet.push(items[k]);
      }
    }
    console.log(toBeRet);
    return toBeRet;
  }
}

