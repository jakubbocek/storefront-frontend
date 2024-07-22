import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  currentUser$ = this.currentUserSubject.asObservable();
  constructor() {}

  login(username: string, password: string): boolean {
    if (username === 'user' && password === 'password') {
      localStorage.setItem('currentUser', JSON.stringify({ username }));
      this.currentUserSubject.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(false);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }
}
