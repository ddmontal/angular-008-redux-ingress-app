import { Pipe, PipeTransform } from '@angular/core';
import { Entry } from './entry.model';

@Pipe({
  name: 'sortEntries'
})
export class SortEntriesPipe implements PipeTransform {

  transform(items: Entry[]): Entry[] {
    return items.sort((a, b) => {
      if (a.type === 'ingress') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
