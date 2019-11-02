import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {
  name: string;
  userSub: Subscription = new Subscription();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.userSub = this.store
      .select('auth')
      .pipe(filter(auth => auth.user != null))
      .subscribe(auth => (this.name = auth.user.name));
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
