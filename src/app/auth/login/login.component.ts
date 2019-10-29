import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  loading: boolean;
  loadingSubscription: Subscription;

  constructor(public authService: AuthService, public store: Store<AppState>) {}

  ngOnInit() {
    this.loadingSubscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  login(data: any) {
    this.authService.login(data.email, data.password);
  }
}
