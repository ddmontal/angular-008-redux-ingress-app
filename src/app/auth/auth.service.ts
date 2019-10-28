import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router, private afDB: AngularFirestore) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      console.log(fbUser);
    });
  }

  createUser(name: string, email: string, password: string) {
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
          })
          .catch();
      })
      .catch(err => {
        Swal.fire('Error', err.message, 'error');
      });
  }

  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        this.router.navigate(['/']);
      })
      .catch(err => {
        Swal.fire('Error', err.message, 'error');
      });
  }

  logout() {
    this.afAuth.auth.signOut();
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
}
