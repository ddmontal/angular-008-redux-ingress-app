import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Entry } from '../entry.model';
import { Subscription } from 'rxjs';
import { EntryService } from '../entry.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit, OnDestroy {
  itemsSub = new Subscription();
  items: Entry[];

  constructor(private entryService: EntryService, private store: Store<AppState>) {}

  ngOnInit() {
    this.itemsSub = this.store.select('entry').subscribe(entry => {
      this.items = entry.items;
    });
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }

  deleteItem(item: Entry) {
    this.entryService
      .destroy(item.uid)
      .then(() => {
        Swal.fire('Eliminado', item.description, 'success');
      })
      .catch()
      .finally();
  }
}
