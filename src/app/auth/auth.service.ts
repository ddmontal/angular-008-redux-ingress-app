import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivateLoadingAction, DeactivateLoadingAction } from '../shared/ui.actions';
import { SetUSerAction, UnsetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUserSubscription: Subscription = new Subscription();
  private user: User;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      if (fbUser) {
        this.authUserSubscription = this.afDB
          .doc<User>(`${fbUser.uid}/user`)
          .valueChanges()
          .subscribe((userObj: any) => {
            const user = new User(userObj);
            this.store.dispatch(new SetUSerAction(user));
            this.user = user;
          });
      } else {
        this.user = null;
        this.authUserSubscription.unsubscribe();
      }
    });
  }

  createUser(name: string, email: string, password: string) {
    this.store.dispatch(new ActivateLoadingAction());

    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        console.log(data);
        const user: User = {
          uid: data.user.uid,
          name: name,
          email: data.user.email
        };

        this.afDB
          .doc<User>(`${user.uid}/user`)
          .set(user)
          .then(() => {
            this.router.navigate(['/']);
            this.store.dispatch(new DeactivateLoadingAction());
          })
          .catch(() => {
            this.store.dispatch(new DeactivateLoadingAction());
          });
      })
      .catch(err => {
        this.store.dispatch(new DeactivateLoadingAction());
        Swal.fire('Error', err.message, 'error');
      });
  }

  login(email: string, password: string) {
    this.store.dispatch(new ActivateLoadingAction());

    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.store.dispatch(new DeactivateLoadingAction());
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.store.dispatch(new DeactivateLoadingAction());
        Swal.fire('Error', err.message, 'error');
      });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.store.dispatch(new UnsetUserAction());
    this.router.navigate(['/', 'login']);
  }

  isAuthenticated() {
    return this.afAuth.authState.pipe(
      map(fbUser => {
        if (fbUser === null) {
          this.router.navigate(['/', 'login']);
        }
        return fbUser != null;
      })
    );
  }

  getUser() {
    return { ...this.user };
  }
}
