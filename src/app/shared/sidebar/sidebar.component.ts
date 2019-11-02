import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  userName: string;
  userSub: Subscription = new Subscription();

  constructor(private store: Store<AppState>, private authService: AuthService) {}

  ngOnInit() {
    this.userSub = this.store
      .select('auth')
      .pipe(filter(auth => auth.user != null))
      .subscribe(auth => (this.userName = auth.user.name));
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}
