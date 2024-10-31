import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { UserInterface } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);

  // Subscribing to user data stream and get them on every single update
  user$ = user(this.firebaseAuth); // logged in ? user data : null

  // To avoid getting a cluster of data, we make a signal to contain certain needed data
  // Undefined by default instead of null to avoid imperfections when it takes time to fetch the user
  currentUserSig = signal<UserInterface | null | undefined>(undefined);

  constructor() {}

  register(
    email: string,
    username: string,
    password: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((response) =>
      updateProfile(response.user, { displayName: username })
    );

    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {}); //Just to silence TypeScript

    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);

    return from(promise);
  }
}
