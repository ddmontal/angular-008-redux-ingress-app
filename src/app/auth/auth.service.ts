import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  createUser(name: string, email: string, password: string) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        console.log(data);
        this.router.navigate(['/']);
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
}