import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Entry } from './entry.model';
import { EntryService } from './entry.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { ActivateLoadingAction, DeactivateLoadingAction } from '../shared/ui.actions';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styles: []
})
export class EntryComponent implements OnInit, OnDestroy {
  form: FormGroup;
  typeOfEntry = 'ingress';
  loadingSub: Subscription = new Subscription();
  loading: boolean;

  constructor(public entryService: EntryService, private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading;
    });

    this.form = new FormGroup({
      description: new FormControl('', Validators.required),
      quantity: new FormControl(0, Validators.min(1))
    });
  }

  ngOnDestroy(): void {
    this.loadingSub.unsubscribe();
  }

  createEntry() {
    this.store.dispatch(new ActivateLoadingAction());

    const entry: Entry = new Entry({
      ...this.form.value,
      type: this.typeOfEntry
    });

    this.entryService
      .create(entry)
      .then(res => {
        this.form.reset();
        Swal.fire('Creado', entry.description, 'success');
      })
      .catch(err => {
        Swal.fire('Error', err, 'error');
        console.error(err);
      })
      .finally(() => {
        this.store.dispatch(new DeactivateLoadingAction());
      });
  }
}
