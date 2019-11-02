import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
  loading: boolean;
  loadingSubscription: Subscription = new Subscription();

  constructor(public authService: AuthService, public store: Store<AppState>) {}

  ngOnInit() {
    this.loadingSubscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  onSubmit(data: any) {
    console.log(data);
    this.authService.createUser(data.name, data.email, data.password);
  }
}
