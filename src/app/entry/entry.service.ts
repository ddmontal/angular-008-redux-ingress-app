import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Entry } from './entry.model';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './entry.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private entryListenerSub: Subscription = new Subscription();
  private entryItemsSub: Subscription = new Subscription();

  constructor(private afDB: AngularFirestore, private authService: AuthService, private store: Store<AppState>) {}

  initEntriesListener() {
    this.entryListenerSub = this.store
      .select('auth')
      .pipe(filter(auth => auth.user != null))
      .subscribe(auth => {
        console.log(auth.user);
        this.entryItems(auth.user.uid);
      });
  }

  cancelSubscriptions() {
    this.entryListenerSub.unsubscribe();
    this.entryItemsSub.unsubscribe();
    this.store.dispatch(new UnsetItemsAction());
  }

  create(entry: Entry) {
    const user = this.authService.getUser();
    return this.afDB
      .doc(`${user.uid}/entries`)
      .collection('items')
      .add(JSON.parse(JSON.stringify(entry)));
  }

  destroy(uid: string) {
    const user = this.authService.getUser();
    return this.afDB.doc(`${user.uid}/entries/items/${uid}`).delete();
  }

  private entryItems(uid: string) {
    this.entryItemsSub = this.afDB
      .collection(`${uid}/entries/items`)
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data()
            };
          });
        })
      )
      .subscribe((items: Entry[]) => {
        this.store.dispatch(new SetItemsAction(items));
      });
  }
}
